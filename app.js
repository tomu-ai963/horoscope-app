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
function zodiac(month,day){const d=month*100+day; if(d>=321&&d<=419)return 0;if(d<=520)return 1;if(d<=620)return 2;if(d<=722)return 3;if(d<=822)return 4;if(d<=922)return 5;if(d<=1022)return 6;if(d<=1121)return 7;if(d<=1221)return 8;if(d>=1222||d<=119)return 9;if(d<=218)return 10;return 11}
const $=s=>document.querySelector(s); const form=$('#birth-form');
function drawChart(seed){const svg=$('#chart-svg');svg.innerHTML='';const ns='http://www.w3.org/2000/svg';const cx=210,cy=210;const add=(tag,a)=>{const e=document.createElementNS(ns,tag);Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v));svg.appendChild(e);return e};
  add('circle',{cx,cy,r:174,fill:'none',stroke:'#a89df3','stroke-opacity':'.6'});add('circle',{cx,cy,r:127,fill:'none',stroke:'#a89df3','stroke-opacity':'.35'});add('circle',{cx,cy,r:78,fill:'none',stroke:'#a89df3','stroke-opacity':'.25'});
  for(let i=0;i<12;i++){let a=(i*30-90)*Math.PI/180,x=210+174*Math.cos(a),y=210+174*Math.sin(a);let x2=210+78*Math.cos(a),y2=210+78*Math.sin(a);add('line',{x1:x,y1:y,x2:x2,y2:y2,stroke:'#a89df3','stroke-opacity':'.27'});let t=add('text',{x:210+151*Math.cos(a+Math.PI/12),y:214+151*Math.sin(a+Math.PI/12),fill:'#aaa6bd','font-size':'17','text-anchor':'middle'});t.textContent=signs[i][1]}
  const planets=['☉','☽','☿','♀','♂','♃','♄']; planets.forEach((p,i)=>{let a=((seed+i*53)%360-90)*Math.PI/180;let r=108+(i%2)*25;let t=add('text',{x:210+r*Math.cos(a),y:216+r*Math.sin(a),fill:i<2?'#f0b66d':'#f5f1e8','font-size':i<2?'20':'16','text-anchor':'middle'});t.textContent=p});
}
form.addEventListener('submit',e=>{e.preventDefault();const date=new Date($('#birth-date').value+'T12:00:00');if(Number.isNaN(date.getTime()))return;const idx=zodiac(date.getMonth()+1,date.getDate()),s=signs[idx];$('#sign-symbol').textContent=s[1];$('#sign-name').textContent=s[0];$('#sign-date').textContent=s[2];$('#reading-text').textContent=s[6];['trait1','trait2','trait3'].forEach((id,i)=>$('#'+id).textContent=s[3+i]);$('#result-title').textContent=($('#birth-place').value||'あなた')+'の出生図';drawChart(date.getFullYear()*7+date.getMonth()*31+date.getDate());$('#chart').hidden=false;$('#chart').scrollIntoView({behavior:'smooth',block:'start'})});
$('#reset').addEventListener('click',()=>{$('#chart').hidden=true;$('#form').scrollIntoView({behavior:'smooth'})});
