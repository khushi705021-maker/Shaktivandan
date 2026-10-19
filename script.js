var $=function(i){return document.getElementById(i)};
/* ---------- music (uploaded bhajan) ---------- */
var au=$("song"),on=false,started=false;
function ui(){$("pl").textContent=on?"⏸ भजन रोकें":"▶ भजन चलाएँ";$("mute").style.opacity=on?1:.5}
function startMusic(){var p=au.play();if(p&&p.then)p.then(function(){on=true;ui()}).catch(function(){on=false;ui()});else{on=true;ui()}}
function stopMusic(){au.pause();on=false;ui()}
function tog(){on?stopMusic():startMusic()}
$("mute").onclick=tog;$("pl").onclick=function(){started=true;tog()};
au.addEventListener("pause",function(){on=false;ui()});au.addEventListener("play",function(){on=true;ui()});
ui();

/* ---------- page songs: scenes (song2) and pandal view (song3) ---------- */
var AU={ps:"song2",pc:"song2",pp:"song3"},cur=null,resume=false,sm=$("sm");
function smUi(){sm.textContent=cur&&$(cur).paused?"▶ गाना":"⏸ गाना"}
function smPos(pp){sm.style.top=pp?"auto":"calc(12px + env(safe-area-inset-top,0px))";sm.style.left=pp?"auto":"12px";sm.style.bottom=pp?"calc(14px + env(safe-area-inset-bottom,0px))":"auto";sm.style.right=pp?"12px":"auto"}
function sceneAudio(c){var id=AU[c]||null;if(id===cur)return;
 if(cur)$(cur).pause();
 if(id){if(!cur){resume=on;if(on)au.pause()}var a=$(id);a.currentTime=0;var p=a.play();if(p&&p.catch)p.catch(function(){});smPos(c=="pp");sm.style.display="block"}
 else{sm.style.display="none";if(resume)startMusic();resume=false}
 cur=id;smUi()}
sm.onclick=function(){if(!cur)return;var a=$(cur);a.paused?a.play():a.pause()};
["song2","song3"].forEach(function(i){$(i).addEventListener("play",smUi);$(i).addEventListener("pause",smUi)});

/* ---------- flower offering ---------- */
var F=["🌺","🌸","🌼","🏵️","🌹"],n=0,msgs=["जय माता दी 🙏","माँ आपका कल्याण करें","श्रद्धा स्वीकार हुई 🌸"];
function drop(){var s=document.createElement("span");s.className="fl";s.textContent=F[Math.random()*F.length|0];
 s.style.left=Math.random()*94+"%";s.style.fontSize=(22+Math.random()*22)+"px";s.style.animationDuration=(3+Math.random()*3)+"s";
 document.body.appendChild(s);setTimeout(function(){s.remove()},6500)}
$("offer").onclick=function(){
  if(!started){started=true;startMusic()}
  for(var i=0;i<16;i++)setTimeout(drop,i*90);
  n+=16;$("count").textContent=msgs[(n/16-1)%3|0]+" · "+n+" पुष्प अर्पित";$("next").style.display="inline-block"};
var NM=["पहली बेटी","दूसरी बेटी","आज की बेटी","माँ दुर्गा","हम सब बेटियाँ"],T=[];
var D=[[0,"माँ, आपने असुरों का संहार किया। फिर बेटियों की रक्षा के समय आपकी शक्ति कहाँ थी?"],
[1,"माँ, हम पढ़ने और काम करने निकली थीं। क्या सुरक्षित घर लौटना हर बेटी का हक नहीं?"],
[2,"माँ, आपकी पूजा पंडाल में होती है। सड़क, दफ्तर और घर में बेटी की सुरक्षा कौन करेगा?"],
[3,"बेटियों, तुम्हारा हर सवाल मेरा सवाल है। मेरी शक्ति उस हर इंसान में है जो अन्याय देखकर चुप नहीं रहता। अब समाज को जागना होगा।"],[4,"हम कमज़ोर नहीं हैं। अपनी रक्षा के लिए हमें किसी की ज़रूरत नहीं। हम खुद शक्ति हैं, हम खुद दुर्गा हैं। हमें दया नहीं, बराबरी चाहिए।"]];
var gs=$("girls");NM.slice(0,3).forEach(function(n){var d=document.createElement("div");d.className="g";
 d.innerHTML=''+AN()+'<span>'+n+'</span>';gs.appendChild(d)});
function scene(){T.forEach(clearTimeout);T=[];$("go").style.display="block";$("go").textContent="छोड़ें ›";$("bub").style.opacity=0;$("ps").classList.remove("maa");
 document.querySelector("#ps .bgi").style.backgroundImage=getComputedStyle($("p1")).backgroundImage;
 D.forEach(function(d,i){T.push(setTimeout(function(){var b=$("bub");b.style.opacity=0;
  T.push(setTimeout(function(){b.innerHTML="<b>"+NM[d[0]]+"</b>"+d[1];b.className=d[0]==3?"m":d[0]==4?"w":"";b.style.opacity=1},400));
  $("ps").classList.toggle("maa",d[0]>2);
  document.querySelectorAll(".g").forEach(function(g,j){g.classList.toggle("sp",j==d[0]||d[0]==4)});
  if(i==D.length-1)T.push(setTimeout(function(){$("go").textContent="आगे: आज़ादी की पुकार"},3500))},i*7000+400))})}
$("next").onclick=function(){$("p1").classList.remove("on");$("ps").classList.add("on");scrollTo(0,0);scene()};
function ANG(m){return '<circle class="halo'+(m?' fh':'')+'" cx="50" cy="38" r="28"/><path class="hr" d="M26 38c-2-28 48-28 48 0 2 22 4 40-2 60-6-12-8-26-10-38H38c-2 12-4 26-10 38-6-20-4-38-2-60z"/><path class="bd" d="M50 56c-14 0-20 12-24 36l-8 58h64l-8-58c-4-24-10-36-24-36z"/><path class="dp" d="M34 58c10 12 24 18 36 30"/>'
 +(m?'<path class="ar" d="M38 64c-10 6-18 16-22 26M62 64c10 6 18 16 22 26"/><circle class="au" cx="14" cy="90" r="4"/><circle class="au" cx="86" cy="90" r="4"/>':'<path class="ar" d="M62 66c10-2 17-8 18-20"/><path class="au" d="M71 46h18c0 7-4 10-9 10s-9-3-9-10z"/><path class="fk" d="M80 44c-7-9 7-13 0-24 10 7 12 15 0 24z"/>')
 +'<ellipse class="hd2" cx="50" cy="42" rx="15" ry="16"/>'
 +[43,57].map(function(x){return '<ellipse cx="'+x+'" cy="44" rx="4.2" ry="5.6" fill="#fff"/><ellipse cx="'+x+'" cy="45" rx="3.3" ry="4.7" fill="#c46a2a"/><circle cx="'+x+'" cy="45.5" r="1.8" fill="#1a0a0a"/><circle cx="'+(x-1.3)+'" cy="43" r="1.3" fill="#fff"/><path d="M'+(x-5)+' 40q5-4 10 0" stroke="#1b0a0a" stroke-width="1.6" fill="none"/>'}).join('')
 +'<path d="M47 53q3 '+(m?'-2':'2')+' 6 0" stroke="#b4454a" stroke-width="1.4" fill="none"/><circle cx="38" cy="50" r="2.6" fill="#ff7a96" opacity=".4"/><circle cx="62" cy="50" r="2.6" fill="#ff7a96" opacity=".4"/><path class="hr" d="M33 38c3-14 31-14 34 0-6-3-10-9-17-10-7 1-12 7-17 10z"/><circle cx="50" cy="32" r="1.6" fill="#d6162a"/>'
 +(m?'<ellipse class="tr" cx="40" cy="52" rx="1.6" ry="2.4" fill="#8fd3ff"/>':'')}
function AN(){return '<svg viewBox="0 0 100 150" aria-hidden="true">'+ANG(0)+'</svg>'}

/* chained girl scene */
var L=[[53,141,96,"दहेज प्रथा"],[245,141,106,"बलात्कार का डर"],[50,313,84,"भ्रूण हत्या"],[251,313,92,"अदृश्य बेड़ियाँ"]];
$("fig").innerHTML='<svg viewBox="0 0 300 330" aria-hidden="true"><g transform="translate(75,40) scale(1.5)"><g class="gg">'+ANG(1)+'</g></g><line class="ch" x1="96" y1="172" x2="8" y2="150"/><line class="ch" x1="204" y1="172" x2="292" y2="150"/><line class="ch" x1="135" y1="262" x2="58" y2="322"/><line class="ch" x1="165" y1="262" x2="242" y2="322"/>'+L.map(function(l){return '<g class="lb"><rect x="'+(l[0]-l[2]/2)+'" y="'+(l[1]-17)+'" width="'+l[2]+'" height="24" rx="12"/><text x="'+l[0]+'" y="'+l[1]+'" text-anchor="middle" font-size="13">'+l[3]+'</text></g>'}).join('')+'</svg>';
for(var q=0;q<14;q++){var td=document.createElement("span");td.className="td";td.style.left=(4+q*7)+"%";td.style.animationDuration=(3+q%4)+"s";td.style.animationDelay=(q%5*.7)+"s";$("pc").appendChild(td)}
var N2=["एक बेटी","माँ दुर्गा (दुखी)"],T2=[];
var D2=[[0,"मैं अदृश्य बेड़ियों में जकड़ी हूँ। दहेज, डर और चुप्पी की जंजीरें मुझे आगे नहीं बढ़ने देतीं। मुझे आज़ादी चाहिए।"],[0,"आप नौ दिन माँ दुर्गा की पूजा और भक्ति करते हैं। फिर ये क्यों भूल जाते हैं कि हर बेटी भी माँ का ही रूप है?"],[1,"बलात्कार, दहेज का दबाव और भ्रूण हत्या देखकर मेरा हृदय रो रहा है। जिन बेटियों में मैं बसती हूँ, उन्हीं को तुम दुख देते हो।"],[1,"बेटी, तुम्हारी बेड़ियाँ मेरी बेड़ियाँ हैं। उठो और इन्हें तोड़ दो।"],[0,"आज़ादी किसी की मेहरबानी नहीं, मेरा हक़ है। मैं अपनी बेड़ियाँ खुद तोड़ती हूँ।"]];
function scene2(){T2.forEach(clearTimeout);T2=[];$("go2").style.display="block";$("go2").textContent="छोड़ें ›";$("bub2").style.opacity=0;$("pc").classList.remove("free");
 document.querySelector("#pc .bgi").style.backgroundImage=getComputedStyle($("p1")).backgroundImage;
 D2.forEach(function(d,i){T2.push(setTimeout(function(){var b=$("bub2");b.style.opacity=0;
  T2.push(setTimeout(function(){b.innerHTML="<b>"+N2[d[0]]+"</b>"+d[1];b.className=d[0]?"m":"";b.style.opacity=1},400));
  if(i==4)$("pc").classList.add("free");
  if(i==4)T2.push(setTimeout(function(){$("go2").textContent="आगे बढ़ें ›"},4000))},i*7500+400))})}
$("go").onclick=function(){T.forEach(clearTimeout);$("ps").classList.remove("on");$("pc").classList.add("on");scrollTo(0,0);scene2()};
$("go2").onclick=function(){T2.forEach(clearTimeout);$("pc").classList.remove("on");$("p2").classList.add("on");scrollTo(0,0);watch()};
$("back").onclick=function(){$("p2").classList.remove("on");$("p1").classList.add("on")};

/* ---------- social evils: animated cards ---------- */
var E=[["🎁","दहेज प्रथा","बेटी वरदान है, सौदा नहीं। शादी में लेन-देन की माँग समाज पर बोझ है।","मैं ना दहेज लूँगा/लूँगी, ना दूँगा/दूँगी।"],
["🧒","बाल विवाह","कम उम्र की शादी बच्चों का बचपन, पढ़ाई और सेहत छीन लेती है।","18 से पहले शादी नहीं, पहले पढ़ाई।"],
["🚬","नशा","शराब, गुटखा और तंबाकू परिवार तोड़ते हैं। बिहार में नशा-मुक्ति सबकी जिम्मेदारी है।","मैं खुद नशा नहीं करूँगा/करूँगी, दूसरों को भी रोकूँगा/रोकूँगी।"],
["📚","बेटियों से भेदभाव","बेटी को कम पढ़ाना या घर तक सीमित रखना माँ दुर्गा की शक्ति का अपमान है।","बेटा-बेटी को बराबर मौका।"],
["🌊","नदी और मिट्टी का प्रदूषण","रसायन वाली मूर्तियाँ और प्लास्टिक विसर्जन से जल गंदा होता है।","मिट्टी की मूर्ति, कपड़े की सजावट, साफ विसर्जन।"]];
var gr=$("grid");
E.forEach(function(e){var d=document.createElement("div");d.className="c";
 d.innerHTML='<svg viewBox="0 0 120 120" aria-hidden="true"><circle class="ring" cx="60" cy="60" r="55"/><text class="em" x="60" y="62">'+e[0]+'</text><line class="x" x1="26" y1="94" x2="94" y2="26"/></svg><h3>'+e[1]+'</h3><p>'+e[2]+'</p><p class="s">'+e[3]+'</p>';gr.appendChild(d)});
function watch(){var io=new IntersectionObserver(function(a){a.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.4});
 document.querySelectorAll(".c").forEach(function(c){io.observe(c)})}

/* ---------- रावण दहन ---------- */
function hd(x,y,r){var p=function(a,b){return (x+a*r).toFixed(1)+" "+(y+b*r).toFixed(1)};
 return '<polygon fill="#f6c453" points="'+p(-.8,-.6)+" "+p(-.5,-1.5)+" "+p(0,-.9)+" "+p(.5,-1.5)+" "+p(.8,-.6)+'"/><circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#3f8f6b" stroke="#1b3a2c" stroke-width="1.5"/>'
 +[-.4,.4].map(function(a){return '<circle cx="'+(x+a*r)+'" cy="'+(y-.15*r)+'" r="'+.24*r+'" fill="#fff"/><circle cx="'+(x+a*r)+'" cy="'+(y-.15*r)+'" r="'+.11*r+'" fill="#c8182a"/>'}).join("")
 +'<path d="M'+p(-.55,.4)+" Q"+p(0,.1)+" "+p(.55,.4)+'" stroke="#1b0a0a" stroke-width="2" fill="none"/><ellipse cx="'+x+'" cy="'+(y+.62*r)+'" rx="'+.22*r+'" ry="'+.09*r+'" fill="#b4454a"/>'}
$("hds").innerHTML=[[56,46,13],[88,46,13],[120,46,13],[152,46,13],[184,46,13],[48,94,16],[84,94,16],[120,94,21],[156,94,16],[192,94,16]].map(function(h){return hd(h[0],h[1],h[2])}).join("");
var fr=$("fire"),rv=document.querySelector(".rv"),sin=$("sin"),tag=$("tag"),st=0,k,o;
for(k=0;k<18;k++){o=document.createElement("span");o.className="fm";var bt=k/18*78;o.style.cssText="left:"+(4+Math.random()*68)+"%;bottom:"+bt+"%;animation-delay:"+Math.random()*.6+"s;transition-delay:"+(bt/78*2.2)+"s";fr.appendChild(o)}
for(k=0;k<24;k++){o=document.createElement("span");o.className="sk";o.style.cssText="left:"+(10+Math.random()*75)+"%;bottom:"+(10+Math.random()*50)+"%;--dx:"+(Math.random()*80-40)+"px;animation-delay:"+Math.random()*2+"s";fr.appendChild(o)}
sin.oninput=function(){var v=sin.value.trim();tag.textContent=v.length>20?v.slice(0,19)+"…":v;
 if(v){tag.setAttribute("textLength",Math.min(100,tag.textContent.length*8.5));tag.setAttribute("lengthAdjust","spacingAndGlyphs")}else tag.removeAttribute("textLength")};
$("burn").onclick=function(){
 if(st==1)return;
 if(st==2){st=0;rv.classList.remove("burn","done");sin.value="";tag.textContent="";$("burn").textContent="रावण जलाएँ 🔥";$("scw").style.display="none";$("plc").textContent="";return}
 if(!sin.value.trim()){$("plc").textContent="पहले अपनी एक बुराई लिखें।";sin.focus();return}
 st=1;$("plc").textContent="";rv.classList.add("burn");
 setTimeout(function(){rv.classList.add("done");st=2;$("plc").textContent="आपकी बुराई जलकर राख हो गई। आज से उसे अपने अंदर जगह मत देना। जय माता दी 🙏";$("burn").textContent="एक और बुराई जलाएँ";$("scw").style.display="block";for(var i=0;i<14;i++)setTimeout(drop,i*90)},5600)};
/* ---------- नारी के रूप ---------- */
(function(){var ex='<g class="ex"><path class="ar" d="M38 66c-12-4-22-14-26-30"/><path d="M12 44V-4M5 8c0-8 4-10 7-10s7 2 7 10" stroke="#f6c453" stroke-width="2.5" fill="none"/><path class="ar" d="M36 74c-14 2-26 0-34-10"/><path d="M2 66L-30 24" stroke="#dfe6f0" stroke-width="3" stroke-linecap="round"/><path class="ar" d="M64 74c14 2 26 0 34-10"/><circle class="spn" cx="100" cy="62" r="9" fill="none" stroke="#f6c453" stroke-width="2.5" stroke-dasharray="4 3"/></g>';
 var rg='<g><circle class="rg" cx="50" cy="60" r="45"/><circle class="rg" cx="50" cy="60" r="65" style="animation-delay:1s"/><circle class="rg" cx="50" cy="60" r="85" style="animation-delay:2s"/></g>';
 $("nsv").innerHTML=rg+ex+ANG(0)+'<path class="tg" d="M47 52q3 11 6 0" fill="#e0182a"/><path class="gl" d="M34 62q16 24 32 0" stroke="#e0182a" stroke-width="5" stroke-dasharray="1 6" stroke-linecap="round" fill="none"/>';
 var P=[["मैं नारी हूँ","अबला नहीं, सबला हूँ",""],["मैं दुर्गा हूँ","अन्याय का संहार करने वाली शक्ति","dur"],["मैं काली हूँ","बुराई के लिए प्रलय","kal"],["मैं जगत जननी हूँ","पूरी सृष्टि को जन्म देने वाली","jan"]],n=0;
 function show(){var p=P[n++%4],t=$("ntx"),u=$("nsub");t.style.opacity=u.style.opacity=0;
  setTimeout(function(){t.textContent=p[0];u.textContent=p[1];$("nsv").setAttribute("class",p[2]);t.style.opacity=u.style.opacity=1},350)}
 show();setInterval(show,3800)})();
/* ---------- nav, pandals, countdown ---------- */
/* PANDALS: apne shehar ke asli pandal yahan likhein (n=naam, a=mohalla, t=khasiyat, r=aarti ka samay) */
var IMG1="pandal-1.jpg";
var IMG2="pandal-2.jpg";
var IMG3="pandal-3.jpg";
var IMG4="pandal-4.jpg";
var IMG5="pandal-5.jpg";
var IMG6="pandal-6.jpg",IMG7="pandal-7.jpg";
var PANDALS=[
 {n:"माँ काली पंडाल",a:"भैंसासुर, बिहार शरीफ",t:"माँ काली और भगवान शिव की भव्य प्रतिमा",r:"शाम 7:30 बजे",i:IMG1},
 {n:"माँ दुर्गा पंडाल",a:"खंदक, बिहार शरीफ",t:"माँ दुर्गा की भव्य प्रतिमा, महिषासुर मर्दन के रूप में",r:"शाम 7:30 बजे",i:IMG2},
 {n:"माँ दुर्गा और काली पंडाल",a:"नालंदा रोड, बिहार शरीफ",t:"माँ दुर्गा और माँ काली की भव्य प्रतिमा",r:"शाम 7:30 बजे",i:IMG3},
 {n:"हरियाली दुर्गा पंडाल",a:"बड़ी पहाड़ी, बिहार शरीफ",t:"हरे पत्तों से सजी माँ दुर्गा और परिवार की अनोखी प्रतिमाएँ",r:"शाम 7:30 बजे",i:IMG4},
 {n:"मोहद्दी नगर दुर्गा पंडाल",a:"मोहद्दी नगर, बिहार शरीफ",t:"माँ दुर्गा, उनके परिवार और महिषासुर मर्दन की रंगीन अनोखी प्रतिमाएँ",r:"शाम 7:30 बजे",i:IMG5},
 {n:"भूत पंडाल",a:"जलालपुर, बिहार शरीफ",t:"डरावनी थीम: खोपड़ियों वाला प्रवेश-द्वार और अंदर माँ दुर्गा की सुनहरी प्रतिमा",r:"शाम 7:30 बजे",i:[IMG6,IMG7]}];
function rp(l){$("pandals").innerHTML=l.map(function(p){return '<div class="pd">'+'<div class="ims">'+[].concat(p.i||[]).map(function(u){return '<img src="'+u+'" alt="'+p.n+'">'}).join("")+'</div>'+'<h3>'+p.n+'</h3><p>📍 '+p.a+'</p><p>'+p.t+'</p><a class="b o" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.n+" "+p.a+" बिहार शरीफ")+'">रास्ता देखें</a></div>'}).join("")||'<p style="color:var(--mut)">कोई पंडाल नहीं मिला।</p>'}
rp(PANDALS);
$("shr").href="https://wa.me/?text="+encodeURIComponent("दुर्गा पूजा 2026 बिहार शरीफ: माँ के दर्शन, पंडाल और एक खास संदेश। "+location.href);
function view(id,tg){T.forEach(clearTimeout);T2.forEach(clearTimeout);document.querySelectorAll(".page").forEach(function(p){p.classList.toggle("on",p.id==id)});scrollTo(0,0);
 if(id=="p2")watch();if(tg)setTimeout(function(){var e=$(tg);if(e)e.scrollIntoView({behavior:"smooth"})},80)}
[["p1","🏠 दर्शन",1],["pp","🛕 पंडाल",1],["p2","✨ नारी शक्ति",1],["p2","🔥 रावण दहन",0,"rvm"]].forEach(function(x){
 var b=document.createElement("button");b.className="nb";b.textContent=x[1];b.dataset.v=x[0];if(x[2])b.dataset.h=1;b.onclick=function(){view(x[0],x[3])};$("nv").insertBefore(b,$("mute"))});
function sync(){var c=document.querySelector(".page.on").id;sceneAudio(c);$("nv").style.display=(c=="ps"||c=="pc")?"none":"flex";
 document.querySelectorAll(".nb").forEach(function(b){b.classList.toggle("on",!!b.dataset.h&&b.dataset.v==c)})}
var mo=new MutationObserver(sync);document.querySelectorAll(".page").forEach(function(p){mo.observe(p,{attributes:true,attributeFilter:["class"]})});sync();
/* ---------- diya vachan + print ---------- */
$("vow").onclick=function(){var l=$("lt");if(l.classList.contains("lit"))return;l.classList.add("lit");this.textContent="दीया जल गया 🙏";
 $("vch").textContent="मैंने वचन दिया है। किसी भी बेटी को मदद की ज़रूरत होगी तो मैं पीछे नहीं हटूँगा/हटूँगी। मैं खुद उजाला बनूँगा/बनूँगी।";for(var i=0;i<12;i++)setTimeout(drop,i*90)};
$("prt").onclick=function(){try{window.print()}catch(e){}};
/* ---------- share card ---------- */
var DL=null;try{if(window.claude&&claude.use)claude.use("downloads").then(function(d){DL=d})}catch(e){}
function mkCard(nm,cb){var c=document.createElement("canvas");c.width=1080;c.height=1350;var x=c.getContext("2d"),g=x.createLinearGradient(0,0,0,1350);
 g.addColorStop(0,"#6e0a14");g.addColorStop(1,"#12060a");x.fillStyle=g;x.fillRect(0,0,1080,1350);
 x.strokeStyle="#f6c453";x.lineWidth=6;x.strokeRect(40,40,1000,1270);x.lineWidth=2;x.strokeRect(58,58,964,1234);
 var r=x.createRadialGradient(540,520,10,540,520,270);r.addColorStop(0,"#fff3b0");r.addColorStop(.5,"#ffb52e55");r.addColorStop(1,"rgba(232,50,26,0)");x.fillStyle=r;x.beginPath();x.arc(540,520,270,0,7);x.fill();
 x.fillStyle="#ffb52e";x.beginPath();x.moveTo(540,330);x.bezierCurveTo(420,470,470,610,540,650);x.bezierCurveTo(610,610,660,470,540,330);x.fill();
 x.fillStyle="#fff3b0";x.beginPath();x.moveTo(540,460);x.bezierCurveTo(500,540,515,600,540,625);x.bezierCurveTo(565,600,580,540,540,460);x.fill();
 x.fillStyle="#c47a2a";x.beginPath();x.moveTo(390,665);x.lineTo(690,665);x.bezierCurveTo(690,760,620,800,540,800);x.bezierCurveTo(460,800,390,760,390,665);x.fill();x.strokeStyle="#f6c453";x.lineWidth=4;x.stroke();
 x.textAlign="center";x.fillStyle="#f6c453";x.font='84px "Tiro Devanagari Hindi",serif';x.fillText("मैंने अपनी एक बुराई",540,950);x.fillText("जला दी 🔥",540,1050);
 x.fillStyle="#fbefe0";x.font='44px "Mukta",sans-serif';x.fillText("इस विजयदशमी अपने अंदर का रावण जलाया",540,1130);
 if(nm){x.fillStyle="#f6c453";x.font='48px "Tiro Devanagari Hindi",serif';x.fillText("— "+nm,540,1196)}
 x.fillStyle="#d9b9a8";x.font='38px "Mukta",sans-serif';x.fillText("दुर्गा पूजा 2026 · बिहार शरीफ",540,1262);
 c.toBlob(cb,"image/png")}
$("snm").oninput=function(){var v=this.value.trim();$("scn").textContent=v?"— "+v:""};
$("swa").href="https://wa.me/?text="+encodeURIComponent("मैंने इस विजयदशमी अपनी एक बुराई जला दी 🔥 आप भी अपने अंदर का रावण जलाइए: "+location.href);
$("svc").onclick=function(){var nm=$("snm").value.trim(),fn="meri-burai-jala-di.png";
 (document.fonts?document.fonts.load('84px "Tiro Devanagari Hindi"'):Promise.resolve()).catch(function(){}).then(function(){mkCard(nm,function(b){
  if(DL){DL.save({filename:fn,data:b}).catch(function(){})}
  else{var a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=fn;document.body.appendChild(a);a.click();a.remove()}})})};
/* ---------- pandal slide gallery ---------- */
var GAL=[["gallery-01.jpg", "रोशनी से सजा पंडाल का प्रवेश मार्ग"], ["gallery-02.jpg", "अनेक मुख और भुजाओं वाली माँ दुर्गा"], ["gallery-03.jpg", "राष्ट्रीय नवयुवक संघ, रामचन्द्रपुर"], ["gallery-04.jpg", "माँ काली और मंत्रों से सजी छत"], ["gallery-05.jpg", "महिषासुर मर्दन की भव्य झाँकी"]];
GAL.push.apply(GAL,[["gallery-06.jpg", "जंगल की थीम में माँ दुर्गा और सिंह"], ["gallery-07.jpg", "माँ काली और भगवान शिव की रंगीन प्रतिमा"], ["gallery-08.jpg", "नीले-बैंगनी रंग का भव्य पंडाल"], ["gallery-09.jpg", "माँ काली का रौद्र रूप"]]);
var gt=$("gt"),gd=$("gd"),gi=0,gtm;
GAL.forEach(function(g){var f=document.createElement("figure");f.innerHTML='<img alt=""><figcaption></figcaption>';f.firstChild.src=g[0];f.firstChild.alt=g[1];f.lastChild.textContent=g[1];gt.appendChild(f);gd.appendChild(document.createElement("i"))});
function dots(){[].forEach.call(gd.children,function(d,k){d.className=k==gi?"on":""})}
function gGo(i){gi=(i+GAL.length)%GAL.length;gt.scrollTo({left:gi*gt.clientWidth,behavior:"smooth"});dots()}
gt.addEventListener("scroll",function(){if(!gt.clientWidth)return;var k=Math.round(gt.scrollLeft/gt.clientWidth);if(k!=gi){gi=k;dots()}});
function rst(){clearInterval(gtm);gtm=setInterval(function(){if($("pp").classList.contains("on")&&$("lb").style.display!="flex")gGo(gi+1)},4500)}
$("gl").onclick=function(){gGo(gi-1);rst()};$("gr").onclick=function(){gGo(gi+1);rst()};
gt.addEventListener("pointerdown",rst);rst();dots();
/* ---------- photo lightbox (zoom in/out) ---------- */
var Z={s:1,x:0,y:0},pts={},d0=1,s0=1,lbs=$("lbs");
function ap(){$("lbi").style.transform="translate("+Z.x+"px,"+Z.y+"px) scale("+Z.s+")"}
function zoom(k){Z.s=Math.min(6,Math.max(1,Z.s*k));if(Z.s==1){Z.x=Z.y=0}ap()}
function openLb(src){$("lbi").src=src;Z={s:1,x:0,y:0};ap();$("lb").style.display="flex"}
function closeLb(){$("lb").style.display="none";pts={}}
function dist(){var k=Object.keys(pts),a=pts[k[0]],b=pts[k[1]];return Math.hypot(a.x-b.x,a.y-b.y)||1}
document.addEventListener("click",function(e){var t=e.target;if(t.tagName=="IMG"&&t.id!="lbi"&&(t.closest(".pd")||t.closest(".ph")||t.closest(".gt")))openLb(t.src)});
lbs.addEventListener("pointerdown",function(e){try{lbs.setPointerCapture(e.pointerId)}catch(x){}pts[e.pointerId]={x:e.clientX,y:e.clientY};if(Object.keys(pts).length==2){d0=dist();s0=Z.s}});
lbs.addEventListener("pointermove",function(e){var p=pts[e.pointerId];if(!p)return;
 if(Object.keys(pts).length==2){pts[e.pointerId]={x:e.clientX,y:e.clientY};Z.s=Math.min(6,Math.max(1,s0*dist()/d0));ap()}
 else{if(Z.s>1){Z.x+=e.clientX-p.x;Z.y+=e.clientY-p.y;ap()}pts[e.pointerId]={x:e.clientX,y:e.clientY}}});
function up(e){delete pts[e.pointerId];if(Z.s<=1){Z.s=1;Z.x=Z.y=0;ap()}}
lbs.addEventListener("pointerup",up);lbs.addEventListener("pointercancel",up);
lbs.addEventListener("dblclick",function(){if(Z.s>1){Z={s:1,x:0,y:0}}else Z.s=2.5;ap()});
lbs.addEventListener("wheel",function(e){e.preventDefault();zoom(e.deltaY<0?1.2:.83)},{passive:false});
lbs.addEventListener("click",function(e){if(e.target==lbs&&Z.s==1)closeLb()});
$("lbx").onclick=closeLb;$("lbp").onclick=function(){zoom(1.4)};$("lbm").onclick=function(){zoom(1/1.4)};$("lbr").onclick=function(){Z={s:1,x:0,y:0};ap()};
document.addEventListener("keydown",function(e){if(e.key=="Escape")closeLb()});
