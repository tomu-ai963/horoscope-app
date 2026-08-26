const signs=[
  ['牡羊座','♈','3/21 — 4/19','情熱','直感','行動力','あなたは、思い立った瞬間に世界を動かしはじめる人。まっすぐな情熱と、先頭に立つ勇気があなたの光です。迷ったときは、まず小さく一歩踏み出してみて。'],
  ['牡牛座','♉','4/20 — 5/20','安定','感性','粘り強さ','あなたは、五感で世界を味わいながら、自分のペースで確かなものを育てる人。急がず、心地よさを選ぶことがあなたの才能です。'],
  ['双子座','♊','5/21 — 6/20','好奇心','言葉','柔軟性','あなたは、軽やかに世界を行き来し、新しい視点を運ぶ人。知りたい気持ちと会話のセンスが、日常に風を通します。'],
  ['蟹座','♋','6/21 — 7/22','共感','想像力','思いやり','あなたは、人の心の機微を感じ取れる人。大切なものを守る優しさと、深い記憶があなたの内側を豊かにしています。'],
  ['獅子座','♌','7/23 — 8/22','表現力','誇り','寛大さ','あなたは、自分らしく輝くことで周りにも光を渡す人。創造すること、心から楽しむことが、あなたの運を開きます。'],
  ['乙女座','♍','8/23 — 9/22','洞察力','誠実さ','整える力','あなたは、細やかな観察眼で世界をより良くできる人。役に立ちたいという思いを、自分自身にも向けてあげてください。'],
  ['天秤座','♎','9/23 — 10/22','調和','美意識','対話力','あなたは、異なるものの間に美しいバランスをつくる人。心地よい関係と空間を選ぶことが、あなた本来の輝きを引き出します。'],
  ['蠍座','♏','10/23 — 11/21','集中力','深い愛','変化','あなたは、表面の奥にある本質を見つめる人。ひとつのことを深く愛する力が、静かで強い変化を生みます。'],
  ['射手座','♐','11/22 — 12/21','冒険心','自由','探究心','あなたは、まだ見ぬ景色へ向かうことで生き生きする人。遠くへ行くことも、知らない考えに触れることも、あなたを広げます。'],
  ['山羊座','♑','12/22 — 1/19','責任感','実行力','継続','あなたは、時間を味方につけて大きなものを築く人。自分の歩みを信じ、完成よりも積み重ねを大切にしてください。'],
  ['水瓶座','♒','1/20 — 2/18','独創性','客観性','理想','あなたは、未来の可能性をいち早く感じ取る人。人と違う視点は個性であり、世界に新しい風を呼ぶ力です。'],
  ['魚座','♓','2/19 — 3/20','共感','想像力','優しさ','あなたは、見えないものまで感じ取れる豊かな感性の持ち主。境界線を大切にしながら、夢見る力を守ってください。']
];

const moonReadings=[
  'あなたの感情は、思い立ったら即行動する素直な炎。安心できる居場所は、遠慮せず気持ちをぶつけられる場所です。',
  'あなたの心は、心地よさや五感の満足でじっくり満たされていきます。安定したリズムと美しいものが、内側から支えてくれます。',
  'あなたの感情は、言葉にしたり誰かと話すことで軽くなります。気持ちを変化させながら学ぶことが、心の栄養です。',
  'あなたの心は、身近な人や家庭的な安心感を強く求めます。大切な人を守りたいという気持ちが、感情の中心にあります。',
  'あなたの感情は、認められること・表現することで輝きます。素直に喜び、素直に誇ることが、心を健やかに保ちます。',
  'あなたの心は、整理整頓や役に立つことで落ち着きます。細やかな気配りの裏にある不安に、時には気づいてあげてください。',
  'あなたの感情は、誰かとの関係性の中でバランスを取ろうとします。心地よい対話と美しい環境が、安心の鍵です。',
  'あなたの心は、深く強く、ひとつのものに向かいます。信頼できる相手にだけ見せる本音こそが、あなたの本当の感情です。',
  'あなたの感情は、自由と可能性を感じるほど明るくなります。閉じ込められることより、遠くを見ていたいタイプです。',
  'あなたの心は、感情を表に出すより、静かに積み重ねることで安定します。頑張りを認めてもらえると、深く安心します。',
  'あなたの感情は、少し距離を置いて世界を眺めることで落ち着きます。自分らしくいられる自由が、心の拠り所です。',
  'あなたの心は、境界なく周りの感情まで感じ取ってしまうほど繊細です。ひとりで満たす時間も、大切にしてください。'
];

const ascReadings=[
  '出会った人には、まっすぐでエネルギッシュな印象を与えます。物事に飛び込む勢いの良さが、あなたの第一印象です。',
  '出会った人には、落ち着きと安心感のある印象を与えます。ゆったりとした佇まいが、周りを穏やかにします。',
  '出会った人には、軽やかで話し上手な印象を与えます。好奇心にあふれた表情が、あなたの入り口です。',
  '出会った人には、優しく親しみやすい印象を与えます。面倒見の良さが、自然と伝わっていきます。',
  '出会った人には、堂々として華やかな印象を与えます。存在感のある振る舞いが、人を惹きつけます。',
  '出会った人には、丁寧で誠実な印象を与えます。細やかな気配りが、第一印象から伝わります。',
  '出会った人には、洗練されて感じの良い印象を与えます。バランス感覚のある物腰が魅力です。',
  '出会った人には、静かで芯の強い印象を与えます。目に見えない深みを感じさせる佇まいです。',
  '出会った人には、明るく自由な印象を与えます。屈託のない笑顔が、あなたの第一印象です。',
  '出会った人には、しっかりして頼りになる印象を与えます。落ち着いた立ち振る舞いが信頼を生みます。',
  '出会った人には、個性的でユニークな印象を与えます。人と違う視点が、最初から光ります。',
  '出会った人には、柔らかく夢見がちな印象を与えます。優しい雰囲気が、そっと人を包みます。'
];

// [表示名, 緯度, 経度]（都道府県庁所在地。日本国内のみ対応・タイムゾーンは常にJST+9:00固定）
const PREF=[
  ['北海道',43.06,141.35],['青森県',40.82,140.74],['岩手県',39.70,141.15],['宮城県',38.27,140.87],
  ['秋田県',39.72,140.10],['山形県',38.24,140.36],['福島県',37.75,140.47],['茨城県',36.34,140.45],
  ['栃木県',36.57,139.88],['群馬県',36.39,139.06],['埼玉県',35.86,139.65],['千葉県',35.61,140.12],
  ['東京都',35.68,139.77],['神奈川県',35.45,139.64],['新潟県',37.90,139.02],['富山県',36.70,137.21],
  ['石川県',36.59,136.63],['福井県',36.07,136.22],['山梨県',35.66,138.57],['長野県',36.65,138.18],
  ['岐阜県',35.39,136.72],['静岡県',34.98,138.38],['愛知県',35.18,136.91],['三重県',34.73,136.51],
  ['滋賀県',35.00,135.87],['京都府',35.02,135.76],['大阪府',34.69,135.52],['兵庫県',34.69,135.18],
  ['奈良県',34.69,135.83],['和歌山県',34.23,135.17],['鳥取県',35.50,134.24],['島根県',35.47,133.05],
  ['岡山県',34.66,133.93],['広島県',34.40,132.46],['山口県',34.19,131.47],['徳島県',34.07,134.56],
  ['香川県',34.34,134.05],['愛媛県',33.84,132.77],['高知県',33.56,133.53],['福岡県',33.61,130.42],
  ['佐賀県',33.25,130.30],['長崎県',32.74,129.87],['熊本県',32.79,130.74],['大分県',33.24,131.61],
  ['宮崎県',31.91,131.42],['鹿児島県',31.56,130.56],['沖縄県',26.21,127.68]
];
const TOKYO_INDEX=12;

const BODY_JP={
  Sun:['太陽','☉'],Moon:['月','☽'],Mercury:['水星','☿'],Venus:['金星','♀'],Mars:['火星','♂'],
  Jupiter:['木星','♃'],Saturn:['土星','♄'],Uranus:['天王星','♅'],Neptune:['海王星','♆'],Pluto:['冥王星','♇']
};
const OTHER_PLANETS=['Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
const ASPECTS=[[0,'合','☌'],[60,'セクスタイル','⚹'],[90,'スクエア','□'],[120,'トライン','△'],[180,'オポジション','☍']];

function zodiac(month,day){const d=month*100+day; if(d>=1222||d<=119)return 9;if(d<=218)return 10;if(d<=320)return 11;if(d<=419)return 0;if(d<=520)return 1;if(d<=620)return 2;if(d<=722)return 3;if(d<=822)return 4;if(d<=922)return 5;if(d<=1022)return 6;if(d<=1121)return 7;return 8}
const signOfLongitude=elon=>Math.floor((((elon%360)+360)%360)/30);

function eclipticLongitude(body,date){
  if(body==='Sun')return Astronomy.SunPosition(date).elon;
  if(body==='Moon')return Astronomy.EclipticGeoMoon(date).lon;
  return Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body[body],date,true)).elon;
}

// RAMC/黄道傾斜角からASC・MCを算出（標準的な占星術公式）。
// ASCは atan2 の生値だとディセンダント側になるため+180度している（日の出=ASC=太陽黄経となることで検証済み）。
function ascMc(date,lat,lon){
  const ramc=(Astronomy.SiderealTime(date)*15+lon+360)%360;
  const eps=Astronomy.e_tilt(date).tobl*Math.PI/180;
  const ramcR=ramc*Math.PI/180,latR=lat*Math.PI/180;
  let asc=Math.atan2(-Math.cos(ramcR),Math.sin(eps)*Math.tan(latR)+Math.cos(eps)*Math.sin(ramcR))*180/Math.PI;
  asc=(asc+180+360)%360;
  let mc=Math.atan2(Math.sin(ramcR),Math.cos(ramcR)*Math.cos(eps))*180/Math.PI;
  mc=(mc+360)%360;
  return{asc,mc};
}

const computeHouses=ascDeg=>Array.from({length:12},(_,i)=>(ascDeg+i*30)%360);

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

const $=s=>document.querySelector(s);
const form=$('#birth-form');
const placeSelect=$('#birth-place');
PREF.forEach((p,i)=>{const o=document.createElement('option');o.value=i;o.textContent=p[0];placeSelect.appendChild(o)});
placeSelect.selectedIndex=TOKYO_INDEX;

function drawChart({asc,houses,longitudes}){
  const svg=$('#chart-svg');svg.innerHTML='';
  const ns='http://www.w3.org/2000/svg';const cx=210,cy=210;
  const add=(tag,a)=>{const e=document.createElementNS(ns,tag);Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v));svg.appendChild(e);return e};
  const toXY=(deg,r)=>{const a=(deg-90)*Math.PI/180;return[cx+r*Math.cos(a),cy+r*Math.sin(a)]};

  add('circle',{cx,cy,r:174,fill:'none',stroke:'#a89df3','stroke-opacity':'.6'});
  add('circle',{cx,cy,r:127,fill:'none',stroke:'#a89df3','stroke-opacity':'.35'});
  add('circle',{cx,cy,r:78,fill:'none',stroke:'#a89df3','stroke-opacity':'.25'});

  for(let i=0;i<12;i++){
    const[x1,y1]=toXY(i*30,174),[x2,y2]=toXY(i*30,78);
    add('line',{x1,y1,x2,y2,stroke:'#a89df3','stroke-opacity':'.27'});
    const[tx,ty]=toXY(i*30+15,151);
    const t=add('text',{x:tx,y:ty+4,fill:'#aaa6bd','font-size':'17','text-anchor':'middle'});
    t.textContent=signs[i][1];
  }

  houses.forEach((deg,i)=>{
    const[x1,y1]=toXY(deg,174),[x2,y2]=toXY(deg,60);
    add('line',{x1,y1,x2,y2,stroke:'#f0b66d','stroke-opacity':'.45','stroke-dasharray':'2,3'});
    const[tx,ty]=toXY(deg+15,68);
    const t=add('text',{x:tx,y:ty+3,fill:'#f0b66d','font-size':'10','text-anchor':'middle'});
    t.textContent=i+1;
  });

  const[dx1,dy1]=toXY(asc,174),[dx2,dy2]=toXY(asc+180,174);
  add('line',{x1:dx1,y1:dy1,x2:dx2,y2:dy2,stroke:'#f0b66d','stroke-width':'1.5'});
  const[alx,aly]=toXY(asc,190);
  add('text',{x:alx,y:aly+4,fill:'#f0b66d','font-size':'11','text-anchor':'middle'}).textContent='AS';

  Object.entries(longitudes).forEach(([name,deg],i)=>{
    const r=95+(i%3)*20;
    const[x,y]=toXY(deg,r);
    const isLum=name==='Sun'||name==='Moon';
    add('text',{x,y:y+6,fill:isLum?'#f0b66d':'#f5f1e8','font-size':isLum?'20':'15','text-anchor':'middle'}).textContent=BODY_JP[name][1];
  });
}

form.addEventListener('submit',e=>{
  e.preventDefault();
  const dateVal=$('#birth-date').value; if(!dateVal)return;
  const[y,mo,da]=dateVal.split('-').map(Number);
  const[hh,mm]=($('#birth-time').value||'12:00').split(':').map(Number);
  const[prefName,lat,lon]=PREF[Number(placeSelect.value)];
  const utcDate=new Date(Date.UTC(y,mo-1,da,hh-9,mm));

  const idx=zodiac(mo,da),s=signs[idx];
  $('#sign-symbol').textContent=s[1];$('#sign-name').textContent=s[0];$('#sign-date').textContent=s[2];
  $('#reading-text').textContent=s[6];
  ['trait1','trait2','trait3'].forEach((id,i)=>$('#'+id).textContent=s[3+i]);

  const longitudes={Sun:eclipticLongitude('Sun',utcDate),Moon:eclipticLongitude('Moon',utcDate)};
  OTHER_PLANETS.forEach(b=>longitudes[b]=eclipticLongitude(b,utcDate));

  const moonIdx=signOfLongitude(longitudes.Moon);
  $('#moon-symbol').textContent=signs[moonIdx][1];$('#moon-name').textContent=signs[moonIdx][0];$('#moon-reading').textContent=moonReadings[moonIdx];

  const{asc}=ascMc(utcDate,lat,lon);
  const ascIdx=signOfLongitude(asc);
  $('#asc-symbol').textContent=signs[ascIdx][1];$('#asc-name').textContent=signs[ascIdx][0];$('#asc-reading').textContent=ascReadings[ascIdx];

  const houses=computeHouses(asc);
  const housesBody=$('#houses-body');housesBody.innerHTML='';
  houses.forEach((deg,i)=>{
    const si=signOfLongitude(deg),degIn=(((deg%360)+360)%360)%30;
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${i+1}</td><td>${signs[si][1]} ${signs[si][0]} ${degIn.toFixed(1)}°</td>`;
    housesBody.appendChild(tr);
  });

  const aspects=computeAspects(longitudes);
  const aspectsBody=$('#aspects-body');aspectsBody.innerHTML='';
  if(aspects.length===0){
    const li=document.createElement('li');li.textContent='目立ったアスペクトは見つかりませんでした。';aspectsBody.appendChild(li);
  }else{
    aspects.forEach(asp=>{
      const li=document.createElement('li');
      li.innerHTML=`${BODY_JP[asp.a][1]} ${BODY_JP[asp.a][0]} <span class="aspect-sym">${asp.sym}</span> ${BODY_JP[asp.b][1]} ${BODY_JP[asp.b][0]} <em>${asp.name}・オーブ${asp.orb.toFixed(1)}°</em>`;
      aspectsBody.appendChild(li);
    });
  }

  $('#result-title').textContent=prefName+'生まれの出生図';
  drawChart({asc,houses,longitudes});
  $('#chart').hidden=false;
  $('#chart').scrollIntoView({behavior:'smooth',block:'start'});
});
$('#reset').addEventListener('click',()=>{$('#chart').hidden=true;$('#form').scrollIntoView({behavior:'smooth'})});
