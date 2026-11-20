// 天体計算（DOM に触らない関数だけを置く）。
// ブラウザでは astronomy-engine → calc.js → app.js の順に読む。
// tests/calc.test.mjs も node:vm でこのファイルを読み込んで検証する
const StellaCalc=(()=>{
  const BODIES=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
  const ASPECTS=[[0,'合','☌'],[60,'セクスタイル','⚹'],[90,'スクエア','□'],[120,'トライン','△'],[180,'オポジション','☍']];

  const norm360=deg=>((deg%360)+360)%360;
  const signOfLongitude=elon=>Math.floor(norm360(elon)/30);
  const degreeInSign=elon=>norm360(elon)%30;

  // 入力は日本時間（UTC+9 固定）として UTC の Date にする。
  // Date.UTC は 0〜99 年を 1900 年代に読み替えるので、setUTCFullYear で年月日を入れる
  function jstToUtc(y,mo,da,hh,mm){
    const d=new Date(0);
    d.setUTCFullYear(y,mo-1,da);
    d.setUTCHours(hh-9,mm,0,0);
    return d;
  }

  function eclipticLongitude(body,date){
    if(body==='Sun')return Astronomy.SunPosition(date).elon;
    if(body==='Moon')return Astronomy.EclipticGeoMoon(date).lon;
    return Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body[body],date,true)).elon;
  }

  // 地球から見て黄経が減っていく向きに動いていれば逆行（前後12時間の差で判定）。太陽と月は逆行しない
  function isRetrograde(body,date){
    if(body==='Sun'||body==='Moon')return false;
    const half=12*3600*1000;
    const before=eclipticLongitude(body,new Date(date.getTime()-half));
    const after=eclipticLongitude(body,new Date(date.getTime()+half));
    let delta=norm360(after-before); if(delta>180)delta-=360;
    return delta<0;
  }

  // RAMC/黄道傾斜角からASC・MCを算出（標準的な占星術公式）。
  // ASCは atan2 の生値だとディセンダント側になるため+180度している（日の出=ASC=太陽黄経となることを tests で検証）
  function ascMc(date,lat,lon){
    const ramc=norm360(Astronomy.SiderealTime(date)*15+lon);
    const eps=Astronomy.e_tilt(date).tobl*Math.PI/180;
    const ramcR=ramc*Math.PI/180,latR=lat*Math.PI/180;
    const asc=norm360(Math.atan2(-Math.cos(ramcR),Math.sin(eps)*Math.tan(latR)+Math.cos(eps)*Math.sin(ramcR))*180/Math.PI+180);
    const mc=norm360(Math.atan2(Math.sin(ramcR),Math.cos(ramcR)*Math.cos(eps))*180/Math.PI);
    return{asc,mc};
  }

  // イコールハウス: ASC から30度ずつ
  const computeHouses=ascDeg=>Array.from({length:12},(_,i)=>norm360(ascDeg+i*30));
  const houseOf=(elon,ascDeg)=>Math.floor(norm360(elon-ascDeg)/30)+1;

  function computeAspects(long){
    const names=Object.keys(long),res=[];
    for(let i=0;i<names.length;i++)for(let j=i+1;j<names.length;j++){
      const a=names[i],b=names[j];
      let diff=Math.abs(long[a]-long[b])%360; if(diff>180)diff=360-diff;
      const orbLimit=(a==='Sun'||a==='Moon'||b==='Sun'||b==='Moon')?8:5;
      for(const[angle,name,sym]of ASPECTS){
        const orb=Math.abs(diff-angle);
        if(orb<=orbLimit){res.push({a,b,name,sym,angle,orb});break}
      }
    }
    return res.sort((x,y)=>x.orb-y.orb);
  }

  // 出生図で天体記号が重ならないよう、表示する角度を minSep 度以上ずつ離す。
  // 近い天体をひとかたまりにまとめ、かたまりの中心（実際の黄経の平均）から等間隔に並べる。
  // 並び順は実際の黄経の順のまま。戻り値は {天体名: 表示する角度}
  function spreadGlyphs(longitudes,minSep){
    const pts=Object.entries(longitudes).map(([name,deg])=>({name,deg:norm360(deg)})).sort((a,b)=>a.deg-b.deg);
    const n=pts.length;
    if(n===0)return{};
    // いちばん広い隙間の直後から並べ直し、0度/360度をまたがない一直線の問題にする
    let start=0,maxGap=-1;
    for(let i=0;i<n;i++){
      const gap=i===0?pts[0].deg+360-pts[n-1].deg:pts[i].deg-pts[i-1].deg;
      if(gap>maxGap){maxGap=gap;start=i}
    }
    const line=pts.map((_,k)=>{const p=pts[(start+k)%n];return{name:p.name,x:p.deg+(start+k>=n?360:0)}});
    const clusters=line.map(p=>({members:[p],center:p.x}));
    const lo=c=>c.center-(c.members.length-1)*minSep/2;
    const hi=c=>c.center+(c.members.length-1)*minSep/2;
    for(let merged=true;merged;){
      merged=false;
      for(let i=0;i+1<clusters.length;i++){
        if(lo(clusters[i+1])-hi(clusters[i])<minSep){
          const members=clusters[i].members.concat(clusters[i+1].members);
          clusters.splice(i,2,{members,center:members.reduce((s,p)=>s+p.x,0)/members.length});
          merged=true;break;
        }
      }
    }
    const out={};
    clusters.forEach(c=>c.members.forEach((p,k)=>{out[p.name]=norm360(c.center+(k-(c.members.length-1)/2)*minSep)}));
    return out;
  }

  // 出生図の座標（SVG、中心 210,210）。rot の黄経を左（9 時の位置）に置き、黄経が増える向きに反時計回りで並べる。
  // 時刻が分かれば rot=ASC（一般的な出生図の向き）、分からなければ rot=0（牡羊座 0 度が左）
  function chartPoint(deg,r,rot){
    const a=(180+deg-rot)*Math.PI/180;
    return[210+r*Math.cos(a),210-r*Math.sin(a)];
  }

  // 共有 URL のハッシュ（#d=1990-01-20&t=09:30&p=12）。t がなければ出生時刻不明。
  // ハッシュはサーバーへ送られず Referer にも載らないので、生年月日はブラウザの外に出ない
  function formatShare({date,time,place}){
    const q=new URLSearchParams({d:date});
    if(time)q.set('t',time);
    q.set('p',String(place));
    return q.toString();
  }
  // 手で書き換えられた URL も来るので、形と範囲を確かめて、だめなら null を返す
  function parseShare(str,placeCount){
    const q=new URLSearchParams(str);
    const d=q.get('d'),t=q.get('t'),p=q.get('p');
    if(!/^\d{4}-\d{2}-\d{2}$/.test(d||'')||d<'1900-01-01'||d>'2100-12-31')return null;
    const[y,mo,da]=d.split('-').map(Number);
    const check=new Date(0);check.setUTCFullYear(y,mo-1,da);
    if(check.getUTCMonth()!==mo-1||check.getUTCDate()!==da)return null;
    if(t!==null&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(t))return null;
    if(!/^\d{1,3}$/.test(p||'')||Number(p)>=placeCount)return null;
    return{date:d,time:t,place:Number(p)};
  }

  return{BODIES,ASPECTS,norm360,signOfLongitude,degreeInSign,jstToUtc,eclipticLongitude,isRetrograde,ascMc,computeHouses,houseOf,computeAspects,spreadGlyphs,chartPoint,formatShare,parseShare};
})();
