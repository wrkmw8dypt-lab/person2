(function(){
var LS=localStorage;
var R=document.getElementById('R');
var T=document.getElementById('T');
var _id=0;

function uid(){return'u'+(++_id);}

function esc(s){
return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function toast(m){
T.textContent=m;
T.classList.add('show');
clearTimeout(T._t);
T._t=setTimeout(function(){T.classList.remove('show');},2000);
}

function cp(t){
try{navigator.clipboard.writeText(t);}catch(x){
var a=document.createElement('textarea');
a.value=t;document.body.appendChild(a);
a.select();document.execCommand('copy');
document.body.removeChild(a);
}
}

function hashLikes(s){
var h=0;
for(var i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))|0;
return Math.abs(h)%48+3;
}

function prose(t){
var ps=String(t||'').split('|');
var h='';
for(var i=0;i<ps.length;i++){
var s=ps[i].trim();
if(!s) continue;
s=s.replace(/「([^」]+)」/g,'<span class="say">"$1"</span>');
s=s.replace(/（([^）]+)）/g,'<span class="inner-thought">$1</span>');
s=s.replace(/\(([^)]+)\)/g,'<span class="inner-thought">$1</span>');
h+='<p>'+s+'</p>';
}
return h;
}

function parse(){
var r=location.hash.slice(1);
if(!r) return[];
r=r.replace(/%(?![0-9a-fA-F]{2})/g,'%25');
try{r=decodeURIComponent(r);}catch(x){
r=r.replace(/%[0-9a-fA-F]{2}/g,function(m){
try{return decodeURIComponent(m);}catch(e){return m;}
});
}
return r.split('§').filter(function(b){return b.trim();}).map(function(b){
var i=b.indexOf('=');
return i<0?{t:b.trim(),d:''}:{t:b.slice(0,i).trim(),d:b.slice(i+1).trim()};
});
}

function doTime(bs){
var td=null;
try{td=JSON.parse(LS.getItem('wt')||'null');}catch(x){}
for(var i=0;i<bs.length;i++){
var b=bs[i];
if(b.t==='时间覆盖'){
var p=b.d.split('|');
td={e:p[0]||(td?td.e:'--'),m:p[1]||(td?td.m:'--'),h:p[2]||(td?td.h:'--:--')};
}
if(b.t==='时间流逝'&&td&&td.h&&td.h.indexOf(':')>0){
var n=parseInt(b.d)||0;
var hm=td.h.split(':');
var hh=+hm[0]||0;
var mm=+hm[1]||0;
mm+=n;
while(mm>=60){mm-=60;hh++;}
while(hh>=24) hh-=24;
td.h=('0'+hh).slice(-2)+':'+('0'+mm).slice(-2);
}
}
if(td) LS.setItem('wt',JSON.stringify(td));
return td||{e:'--',m:'--',h:'--:--'};
}

function avBind(el,tx,inp,nm){
var s=LS.getItem('wa_'+nm);
if(s&&el){el.src=s;el.style.display='block';if(tx)tx.style.display='none';}
inp.onchange=function(){
var f=this.files[0];if(!f)return;
var r=new FileReader();
r.onload=function(ev){
var img=new Image();
img.onload=function(){
var c=document.createElement('canvas');
var w=img.width,h=img.height;
if(w>400){h*=400/w;w=400;}
if(h>520){w*=520/h;h=520;}
c.width=w;c.height=h;
var ctx=c.getContext('2d');
ctx.drawImage(img,0,0,w,h);
var d=c.toDataURL('image/jpeg',0.88);
try{LS.setItem('wa_'+nm,d);}catch(e){}
if(el){el.src=d;el.style.display='block';}
if(tx) tx.style.display='none';
};
img.src=ev.target.result;
};
r.readAsDataURL(f);
};
}

function avHTML(nm,cls){
var id=uid();
var h='<div class="'+cls+'"';
h+=' onclick="document.getElementById(\''+id+'\').click()">';
h+='<img id="'+id+'-i" src="" style="display:none">';
h+='<span id="'+id+'-t" class="cavt">'+esc(String(nm).charAt(0))+'</span>';
h+='</div>';
h+='<input type="file" accept="image/*" style="display:none"';
h+=' id="'+id+'" data-av="'+esc(nm)+'">';
return h;
}

function gSB(t,loc){
var l=String(loc||'').split('|');
var h='<div class="sb5">';
h+='<div class="sb5-t">'+esc(t.h)+'</div>';
h+='<div class="sb5-sep"></div>';
h+='<div class="sb5-right">';
h+='<div class="sb5-row">';
h+='<span class="sb5-era">'+esc(t.e)+'</span>';
h+='<span class="sb5-date">'+esc(t.m)+'</span>';
h+='</div>';
h+='<div class="sb5-row">';
h+='<span class="sb5-loc">'+esc(l[0]||'')+'</span>';
h+='</div>';
if(l[1]){
h+='<div class="sb5-row">';
h+='<span class="sb5-wx">'+esc(l[1])+'</span>';
h+='</div>';
}
h+='</div></div>';
return h;
}

function gTK(data){
var p=String(data||'').split('|');
var colors=['red','blue','gold','purple','green'];
var color=colors.indexOf(p[0])>=0?p.shift():colors[Math.floor(Math.random()*colors.length)];
var title=p.shift()||'系统';
if(!p.length){
return'<div class="tkt '+color+'"><div class="tkt-bar"></div>'
+'<div class="tkt-hd"><span class="tkt-title">'+esc(title)+'</span></div>'
+'<div class="tkt-bd"><div class="tkt-plain">'+esc(title)+'</div></div>'
+'<div class="tkt-tear"></div></div>';
}
var hasKey=false;
for(var i=0;i<p.length;i++){
if(p[i].indexOf('◈')===0){hasKey=true;break;}
}
if(!hasKey){
var plainText=p.join(' ');
return'<div class="tkt '+color+'"><div class="tkt-bar"></div>'
+'<div class="tkt-hd"><span class="tkt-title">'+esc(title)+'</span></div>'
+'<div class="tkt-bd"><div class="tkt-plain" style="line-height:2;letter-spacing:.3px">'
+esc(plainText)+'</div></div>'
+'<div class="tkt-tear"></div></div>';
}
var bd='';
for(var i=0;i<p.length;i++){
var row=p[i];
if(row.indexOf('◈')===0){
var idx=row.indexOf(':');
if(idx<0) idx=row.indexOf(':');
if(idx>0){
var key=row.slice(1,idx).trim();
var val=row.slice(idx+1).trim();
var parts=val.split(',');
if(parts.length>1){
bd+='<div style="margin-bottom:6px">';
bd+='<div class="tkt-row" style="margin-bottom:4px">';
bd+='<span class="tkt-diamond">◈</span>';
bd+='<span class="tkt-key">'+esc(key)+'</span></div>';
for(var j=0;j<parts.length;j++){
var sub=parts[j].trim();
var si=sub.indexOf('~');
if(si>0){
bd+='<div style="display:flex;align-items:flex-start;gap:6px;padding:2px 0 2px 20px">';
bd+='<span style="font-size:.65em;color:var(--td)">·</span>';
bd+='<span style="font-size:.78em;font-weight:500;color:var(--fc)">'+esc(sub.slice(0,si).trim())+'</span>';
bd+='<span style="font-size:.75em;color:var(--ts);line-height:1.7;flex:1">'+esc(sub.slice(si+1).trim())+'</span>';
bd+='</div>';
}else{
bd+='<div style="padding:2px 0 2px 20px;font-size:.75em;color:var(--fc);line-height:1.7">';
bd+='<span style="color:var(--td);margin-right:4px">·</span>'+esc(sub)+'</div>';
}
}
bd+='</div>';
}else{
bd+='<div style="margin-bottom:4px"><div class="tkt-row">';
bd+='<span class="tkt-diamond">◈</span>';
bd+='<span class="tkt-key">'+esc(key)+'：</span>';
bd+='<span class="tkt-val">'+esc(val)+'</span>';
bd+='</div></div>';
}
}else{
bd+='<div style="margin-bottom:4px"><div class="tkt-row">';
bd+='<span class="tkt-diamond">◈</span>';
bd+='<span class="tkt-val">'+esc(row.slice(1).trim())+'</span>';
bd+='</div></div>';
}
}else{
bd+='<div class="tkt-plain">'+esc(row)+'</div>';
}
}
return'<div class="tkt '+color+'"><div class="tkt-bar"></div>'
+'<div class="tkt-hd"><span class="tkt-title">'+esc(title)+'</span></div>'
+'<div class="tkt-bd">'+bd+'</div>'
+'<div class="tkt-tear"></div></div>';
}

function gChoices(items){
var h='<div class="act-wrap"><div class="act-t">· 行动参考 ·</div>';
for(var i=0;i<items.length;i++){
h+='<input type="radio" name="act" id="ac'+i+'" class="act-chk">';
h+='<label for="ac'+i+'" class="act-btn" data-copy="'+esc(items[i].tag+': '+items[i].desc)+'">';
h+='<span class="act-bdg">✓ 已复制</span>';
h+='<span class="act-tag">[ '+esc(items[i].tag)+' ]</span>';
h+='<div class="act-desc">'+esc(items[i].desc)+'</div>';
h+='</label>';
}
return h+'</div>';
}

function makeTask(raw,type){
if(!raw) return'';
var q=String(raw).split('~');
var cls=type==='支线'?'s':'';
var pg=q[1]||'';
var pct=0;
if(pg.indexOf('/')>0){
var pp=pg.split('/');
pct=Math.min(100,(parseInt(pp[0])||0)/(parseInt(pp[1])||1)*100);
}else{
pct=parseInt(pg)||0;
}
var h='<div class="ti '+cls+'">';
h+='<div class="tr1"><span class="ttag">'+type+'</span>';
h+='<span class="tnm">'+esc(q[0]||'')+'</span></div>';
h+='<div class="tr2"><div class="tpt">';
h+='<div class="tpf" style="width:'+pct+'%"></div></div>';
h+='<span class="tnum">'+esc(pg)+'</span></div>';
if(q[2]) h+='<div class="trw">▸ '+esc(q[2])+'</div>';
if(q[3]) h+='<div class="trw">▸ '+esc(q[3])+'</div>';
h+='</div>';
return h;
}

function gPanel(data){
var p=String(data||'').split('|');
var rank=p[0]||'未知';
var title=p[1]||'';
var comment=p[2]||'';
var equipsRaw=p[3]||'';
var attrsRaw=p[4]||'';
var allSlots=['发型','饰品','妆容','上衣','下装','连衣裙','袜类','鞋子','特殊'];
var allAttrs=['智力','魅力','体质','力量','敏捷','魔力','意志','幸运'];
var equipMap={};
var attrMap={};
var savedAttrs={};
try{savedAttrs=JSON.parse(LS.getItem('wattr')||'{}');}catch(x){}
var eL=equipsRaw.split(',');
for(var i=0;i<eL.length;i++){
if(!eL[i]) continue;
var s=eL[i].split('~');
if(s[0]) equipMap[s[0]]=s[1]||'无';
}
var aL=attrsRaw.split(',');
for(var i=0;i<aL.length;i++){
if(!aL[i]) continue;
var s=aL[i].split('~');
if(s[0]){
var v=s[1]==='???'?'???':(parseInt(s[1])||0);
attrMap[s[0]]={v:v,d:s[2]||'0'};
if(v!=='???') savedAttrs[s[0]]=v;
}
}
try{LS.setItem('wattr',JSON.stringify(savedAttrs));}catch(x){}
var id=uid();
var equipH='';
var attrH='';
for(var i=0;i<allSlots.length;i++){
var sl=allSlots[i];
var vl=equipMap[sl];
if(!vl) continue;
equipH+='<div class="eq-slot">';
equipH+='<span class="eq-label">'+esc(sl)+'</span>';
equipH+='<span class="eq-val">'+esc(vl)+'</span></div>';
}
for(var i=0;i<allAttrs.length;i++){
var nm=allAttrs[i];
var ad=attrMap[nm];
var v;
var dH='';
if(ad){
v=ad.v;
if(ad.d&&ad.d!=='0'){
var cl=ad.d.charAt(0)==='+'?'plus':'minus';
dH='<span class="av-delta '+cl+'">'+esc(ad.d)+'</span>';
}
}else{
v=savedAttrs[nm]!==undefined?savedAttrs[nm]:'-';
}
var bw=(typeof v==='number')?Math.min(v,100):0;
attrH+='<div class="ai">';
attrH+='<span class="al">'+esc(nm)+'</span>';
attrH+='<div class="ab"><div class="af" style="width:'+bw+'%"></div></div>';
attrH+='<span class="av">'+esc(String(v))+'</span>'+dH;
attrH+='</div>';
}
var h='<div class="rp"><details><summary>';
h+='<div class="rp-h"><div class="rp-hl">';
h+='<div class="dot dg"></div>';
h+='<span class="rp-ttl">个人面板</span>';
h+='</div><span class="rp-arr">▾</span></div>';
h+='</summary><div class="rp-bd">';
h+='<div class="pf-top">';
h+='<div class="pf-img" onclick="document.getElementById(\''+id+'\').click()">';
h+='<img id="'+id+'-i" src="" style="display:none">';
h+='<div id="'+id+'-p" class="pf-ph">';
h+='<span class="pf-pht">点击<br>导入立绘</span></div></div>';
h+='<input type="file" accept="image/*" style="display:none" id="'+id+'" data-av="__USER__">';
h+='<div class="pf-info">';
h+='<div class="attr-rk">[ '+esc(rank)+' ] '+esc(title)+'</div>';
if(comment){
h+='<div class="attr-cm" style="font-size:10px;max-width:140px;line-height:1.4;word-break:break-all">';
h+=esc(comment)+'</div>';
}
h+='</div></div>';
h+='<div style="height:1px;background:rgba(255,255,255,.05);margin:8px 0"></div>';
if(equipH){
h+='<div class="equip-section">';
h+='<div class="pf-section-title">装备</div>';
h+='<div class="equip-zone">'+equipH+'</div></div>';
}
h+='<div class="pf-section-title">属性</div>';
h+='<div class="attr-grid">'+attrH+'</div>';
h+='</div></details></div>';
return h;
}

function gTasks(mQ,sQ){
if(!mQ&&!sQ) return'';
var prevMQ=LS.getItem('wre_mq')||'';
var prevSQ=LS.getItem('wre_sq')||'';
var hasUpdate=(mQ&&mQ!==prevMQ)||(sQ&&sQ!==prevSQ);
if(mQ) LS.setItem('wre_mq',mQ);
if(sQ) LS.setItem('wre_sq',sQ);
var tBadge=hasUpdate?'<span class="sub-badge">✦ 更新</span>':'';
var h='<div class="rp"><details><summary>';
h+='<div class="rp-h"><div class="rp-hl">';
h+='<div class="dot dj"></div>';
h+='<span class="rp-ttl">系统任务</span></div>';
h+='<div class="rp-hr">'+tBadge;
h+='<span class="rp-arr">▾</span></div></div>';
h+='</summary><div class="rp-bd">';
h+=makeTask(mQ,'主线');
h+=makeTask(sQ,'支线');
h+='</div></details></div>';
return h;
}

function gChars(items){
var h='<div class="rp"><details><summary>';
h+='<div class="rp-h"><div class="rp-hl">';
h+='<div class="dot dr"></div>';
h+='<span class="rp-ttl">附近角色</span>';
h+='</div><span class="rp-arr">▾</span></div>';
h+='</summary><div class="rp-bd" style="padding-top:6px">';
for(var i=0;i<items.length;i++){
var c=items[i];
var favNum=parseInt(c.favor)||0;
var favPct=Math.min(favNum,100);
h+='<div class="cc">'+avHTML(c.name,'cav');
h+='<div class="ci"><div class="cnr">';
h+='<span class="cn">'+esc(c.name)+'</span>';
h+='<span class="cs">'+esc(c.state)+'</span></div>';
if(c.favor){
h+='<div class="cfav-bar">';
h+='<span class="cfav-label">好感度</span>';
h+='<div class="cfav-track">';
h+='<div class="cfav-fill" style="width:'+favPct+'%"></div></div>';
h+='<span class="cfav-num">'+favNum+'/100</span></div>';
}
h+='<div class="co">'+esc(c.thought)+'</div>';
h+='</div></div>';
}
h+='</div></details></div>';
return h;
}

function gMsgs(items,nsfw){
var n=items.length;
var titleText=nsfw?'勿扰模式':'消息通知';
var h='<div class="rp"><details><summary>';
h+='<div class="rp-h"><div class="rp-hl">';
h+='<div class="dot dw"></div>';
h+='<span class="rp-ttl">'+titleText+'</span></div>';
h+='<div class="rp-hr">';
if(!nsfw) h+='<span class="mbdg">'+n+'</span>';
h+='<span class="rp-arr">▾</span></div></div>';
h+='</summary><div class="rp-bd">';
if(nsfw){
h+='<div class="msg-nsfw">'+esc(nsfw)+'</div>';
}else if(!n){
h+='<div class="msg-nsfw">暂无新消息</div>';
}else{
for(var i=0;i<items.length;i++){
var sp=items[i].split('~');
h+='<div class="mi"><div class="mh">';
h+='<span class="ms">'+esc(sp[0]||'')+'</span>';
h+='<span class="mt">'+esc(sp[1]||'')+'</span></div>';
h+='<div class="mc">'+esc(sp[2]||'')+'</div></div>';
}
}
h+='</div></details></div>';
return h;
}

function gLive(bar,tip,viewers,off){
var h='<div class="rp"><details><summary>';
h+='<div class="rp-h"><div class="rp-hl">';
h+='<div style="display:flex;align-items:center;gap:6px">';
if(off){
h+='<div class="dot dw"></div>';
h+='<span style="font-size:.78em;color:var(--td);letter-spacing:2px">直播已关闭</span>';
}else{
h+='<div class="ldot"></div>';
h+='<span style="font-size:.78em;color:rgba(192,80,80,.82);letter-spacing:2px">直播中</span>';
}
h+='</div></div><div class="rp-hr">';
if(!off) h+='<span class="lpop">'+esc(viewers)+'</span>';
h+='<span class="rp-arr">▾</span></div></div>';
h+='</summary><div class="rp-bd">';
if(off){
h+='<div class="live-off">直播间当前未开启</div>';
}else{
for(var i=0;i<bar.length;i++){
var sp=bar[i].split('~');
h+='<div class="dm">';
h+='<span class="dmu">@'+esc(sp[0]||'')+'</span>';
h+='<span class="dmt">'+esc(sp[1]||'')+'</span></div>';
}
if(tip){
var tp=tip.split('~');
h+='<div class="don"><div class="dont">· 打赏 ·</div>';
h+='<div class="donc">【'+esc(tp[0]||'')+'】打赏了 ';
h+='<span style="color:var(--go)">'+esc(tp[1]||'')+'</span>';
if(tp[2]) h+='<br>留言："'+esc(tp[2])+'"';
h+='</div></div>';
}
}
h+='</div></details></div>';
return h;
}

function gChat(name,count,msgs){
var t={};
try{t=JSON.parse(LS.getItem('wt')||'{}');}catch(x){}
var ct=t.h||'--:--';
var h='<div class="chat-win">';
h+='<div class="chat-header">';
h+='<div class="chat-title-row">';
h+='<div class="chat-live-dot"></div>';
h+='<div class="chat-title">'+esc(name)+'</div></div>';
h+='<div class="chat-sub">'+esc(count)+'人在线</div></div>';
h+='<div class="chat-body">';
for(var i=0;i<msgs.length;i++){
var m=msgs[i];
if(m.indexOf('---')===0){
h+='<div class="cdiv"><div class="cdiv-l"></div>';
h+='<div class="cdiv-t">'+esc(m.slice(3).trim())+'</div>';
h+='<div class="cdiv-l"></div></div>';
continue;
}
var ci=m.indexOf(':');
if(ci<0) ci=m.indexOf(':');
if(ci<0) continue;
var sp=m.slice(0,ci).trim();
var tx=m.slice(ci+1).trim();
var me=sp==='我';
var dir=me?'r':'l';
h+='<div class="cmsg '+dir+'">';
h+=avHTML(sp,'cav2');
h+='<div class="cbw">';
if(!me) h+='<div class="cname">'+esc(sp)+'</div>';
h+='<div class="cbubble">'+esc(tx)+'</div>';
h+='<div class="ctm">'+ct+'</div>';
h+='</div></div>';
}
h+='</div></div>';
return h;
}

function gForum(data){
var p=String(data||'').split('|');
var au=p[0]||'';
var tag=p[1]||'';
var title=p[2]||'';
var body=p[3]||'';
var stats=p[4]||'0~0~0';
var rawCmts=p.slice(5);
var st=stats.split('~');
var topCmts=[];
var lastTop=null;
for(var i=0;i<rawCmts.length;i++){
var raw=rawCmts[i];
if(raw.charAt(0)==='↳'){
if(lastTop) lastTop.replies.push(raw.slice(1));
}else{
var c={raw:raw,replies:[]};
topCmts.push(c);
lastTop=c;
}
}
var h='<div class="fp">';
h+='<div class="fp-head">'+avHTML(au,'fp-av');
h+='<div class="fp-meta">';
h+='<div class="fp-author">'+esc(au)+'</div>';
h+='<div class="fp-info-row"><span class="fp-tag">'+esc(tag)+'</span></div>';
h+='</div></div>';
h+='<div class="fp-title">'+esc(title)+'</div>';
h+='<div class="fp-body">'+esc(body)+'</div>';
h+='<div class="fp-footer">';
h+='<span class="fp-stat">♡ '+esc(st[0]||'0');
if(st[3]) h+=' <span style="font-size:.85em;color:var(--ts);margin-left:2px">'+esc(st[3])+'</span>';
h+='</span>';
h+='<span class="fp-stat">✦ '+esc(st[2]||'0')+'</span>';
h+='<span class="fp-stat">↻ '+esc(st[1]||'0')+'</span></div>';
if(topCmts.length){
h+='<details class="fp-cmt-details" open>';
h+='<summary>共 '+topCmts.length+' 条评论 ▾</summary>';
h+='<div class="fp-cmt-area">';
for(var i=0;i<topCmts.length;i++){
var tc=topCmts[i];
var ci2=tc.raw.indexOf(':');
if(ci2<0) ci2=tc.raw.indexOf(':');
if(ci2<0) continue;
var ca=tc.raw.slice(0,ci2).trim();
var ctxt=tc.raw.slice(ci2+1).trim();
var likes=hashLikes(tc.raw);
h+='<div class="fp-cmt-block">';
h+='<div class="fp-cmt-i">'+avHTML(ca,'fp-cmt-av');
h+='<div class="fp-cmt-ct">';
h+='<div class="fp-cmt-hr"><span class="fp-cmt-au">'+esc(ca)+'</span></div>';
h+='<div class="fp-cmt-tx">'+esc(ctxt)+'</div>';
h+='<div class="fp-cmt-foot"><span class="cmt-act cmt-like">♡ '+likes+'</span></div>';
h+='</div></div>';
if(tc.replies.length){
h+='<div class="fp-cmt-replies">';
for(var j=0;j<tc.replies.length;j++){
var rr=tc.replies[j];
var ri=rr.indexOf(':');
if(ri<0) ri=rr.indexOf(':');
if(ri<0) continue;
var ra=rr.slice(0,ri).trim();
var rt=rr.slice(ri+1).trim();
var rl=hashLikes(rr);
h+='<div class="fp-cmt-reply">'+avHTML(ra,'fp-cmt-rav');
h+='<div class="fp-cmt-rct">';
h+='<div class="fp-cmt-rhr"><span class="fp-cmt-rau">'+esc(ra)+'</span></div>';
h+='<div class="fp-cmt-rtx">'+esc(rt)+'</div>';
h+='<div class="fp-cmt-rfoot"><span class="cmt-act cmt-like">♡ '+rl+'</span></div>';
h+='</div></div>';
}
h+='</div>';
}
h+='</div>';
}
h+='</div></details>';
}
h+='</div>';
return h;
}

function gTouch(data){
var p=String(data||'').split('|');
var charName=p[0]||'';
var charMood=p[1]||'50';
var charOs=p[2]||'';
var partsRaw=p.slice(3);
var moodNum=parseInt(charMood)||50;
var moodPct=Math.max(0,Math.min(100,moodNum));
var moodCol=moodPct>=70?'rgba(225,160,170,.9)':
moodPct>=50?'rgba(210,145,138,.8)':
moodPct>=35?'rgba(180,160,200,.8)':'rgba(130,170,210,.8)';
var h='<div class="tp">';
h+='<div class="tp-hb"><svg viewBox="0 0 400 80" preserveAspectRatio="none">';
h+='<polyline points="0,40 30,40 42,15 54,65 66,25 78,55 90,35 110,40 140,40 152,12 164,68 176,22 188,58 200,38 220,40 250,40 262,18 274,62 286,28 298,52 310,40 340,40 352,15 364,65 376,30 388,50 400,40"';
h+=' fill="none" stroke="rgba(210,145,138,.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
h+='</svg></div>';
h+='<div class="tp-inner"><div class="tp-top">';
h+='<div class="tp-av">'+esc(charName.charAt(0))+'</div>';
h+='<div class="tp-name">'+esc(charName)+'</div>';
h+='<div class="tp-mood"><div class="tp-mood-bar">';
h+='<span class="tp-mood-label">心情</span>';
h+='<div class="tp-mood-track">';
h+='<div class="tp-mood-fill" style="width:'+moodPct+'%;background:'+moodCol+'"></div></div>';
h+='<span class="tp-mood-num" style="color:'+moodCol+'">'+moodPct+'</span>';
h+='</div></div>';
h+='<div class="tp-os">'+esc(charOs)+'</div></div>';
h+='<div class="tp-grid">';
for(var i=0;i<partsRaw.length;i++){
var sp=partsRaw[i].split('~');
var partName=sp[0]||'';
var partIcon=sp[1]||'◈';
var partReaction=sp[2]||'';
var partInner=sp[3]||'';
var partDelta=sp[4]||'0';
var deltaNum=parseInt(partDelta)||0;
var deltaText=deltaNum>0?'♡ +'+deltaNum:deltaNum<0?'♡ '+deltaNum:'♡ ±0';
var deltaCls=deltaNum>0?'up':deltaNum<0?'down':'zero';
h+='<div class="tp-btn"';
h+=' onclick="tpClick(this,\''+esc(partIcon)+'\',\''+esc(partName)+'\',\''+deltaCls+'\',\''+esc(deltaText)+'\',this.getAttribute(\'data-r\'),this.getAttribute(\'data-i\'))"';
h+=' data-r="'+esc(partReaction)+'"';
h+=' data-i="'+esc(partInner)+'">';
h+='<span class="tp-btn-icon">'+esc(partIcon)+'</span>';
h+='<span class="tp-btn-name">'+esc(partName)+'</span></div>';
}
h+='</div>';
h+='<div class="tp-hint">点击部位查看角色反应 · 每个部位仅可触摸一次</div>';
h+='</div></div>';
return h;
}

function gPyq(data){
var p=String(data||'').split('|');
var author=p[0]||'';
var text=p[1]||'';
var time=p[2]||'';
var likes=p[3]||'';
var cmtsRaw=p.slice(4);
var h='<div class="pyq"><div class="pyq-hd">';
h+='<div class="pyq-av">'+esc(author.charAt(0))+'</div>';
h+='<div class="pyq-meta">';
h+='<div class="pyq-name">'+esc(author)+'</div>';
h+='<div class="pyq-text">'+esc(text)+'</div>';
h+='</div></div>';
h+='<div class="pyq-ft">';
h+='<div class="pyq-time">'+esc(time)+'</div>';
if(likes){
h+='<div class="pyq-likes-area">';
h+='<span class="pyq-likes-icon">♥</span>';
h+='<span class="pyq-likes-names">'+esc(likes)+'</span>';
h+='</div>';
}
h+='</div>';
if(cmtsRaw.length){
h+='<div class="pyq-divider"></div><div class="pyq-cmts">';
for(var i=0;i<cmtsRaw.length;i++){
var c=cmtsRaw[i];
var replyIdx=c.indexOf('→');
if(replyIdx>0){
var ca=c.slice(0,replyIdx).trim();
var rest=c.slice(replyIdx+1).trim();
var ci2=rest.indexOf(':');
if(ci2<0) ci2=rest.indexOf(':');
if(ci2>0){
h+='<div class="pyq-cmt">';
h+='<span class="pyq-cmt-name">'+esc(ca)+'</span>';
h+='<span class="pyq-cmt-reply">回复 '+esc(rest.slice(0,ci2).trim())+'：</span>';
h+='<span class="pyq-cmt-text">'+esc(rest.slice(ci2+1).trim())+'</span></div>';
}else{
h+='<div class="pyq-cmt">';
h+='<span class="pyq-cmt-name">'+esc(ca)+'</span>';
h+='<span class="pyq-cmt-text">'+esc(rest)+'</span></div>';
}
}else{
var ci3=c.indexOf(':');
if(ci3<0) ci3=c.indexOf(':');
if(ci3>0){
h+='<div class="pyq-cmt">';
h+='<span class="pyq-cmt-name">'+esc(c.slice(0,ci3).trim())+'：</span>';
h+='<span class="pyq-cmt-text">'+esc(c.slice(ci3+1).trim())+'</span></div>';
}
}
}
h+='</div>';
}
h+='</div>';
return h;
}

function render(){
var bs=parse();
if(!bs.length){
R.innerHTML='<div style="text-align:center;padding:40px;color:var(--td);font-size:.85em">等待数据接入...</div>';
return;
}
var time=doTime(bs);
var loc='';
var choices=[];
var chars=[];
var msgs=[];
var nsfw='';
var panel='';
var mQ='';
var sQ='';
var lB=[];
var lT='';
var lV='0';
var lOff=false;
for(var i=0;i<bs.length;i++){
if(bs[i].t==='地点') loc=bs[i].d;
}
var html=gSB(time,loc);
for(var i=0;i<bs.length;i++){
var b=bs[i];
if(b.t==='正文'){
html+='<div class="prose">'+prose(b.d)+'</div>';
}else if(b.t==='弹窗'){
html+=gTK(b.d);
}else if(b.t==='选项'){
var sp=b.d.split('|');
for(var j=0;j<sp.length;j++){
var oi=sp[j].indexOf('~');
if(oi<0) oi=sp[j].indexOf(':');
if(oi>0){
choices.push({tag:sp[j].slice(0,oi).trim(),desc:sp[j].slice(oi+1).trim()});
}else{
choices.push({tag:'选项',desc:sp[j].trim()});
}
}
}else if(b.t==='面板'){
panel=b.d;
}else if(b.t==='任务'){
var tparts=b.d.split('|');
mQ=tparts[0]||'';
sQ=tparts[1]||'';
}else if(b.t==='角色'){
var sp2=b.d.split('|');
chars.push({
name:sp2[0]||'',
state:sp2[1]||'',
thought:sp2[2]||'',
favor:sp2[3]||''
});
if(sp2[0]){
var cd=JSON.parse(LS.getItem('wre_contacts')||'{"groups":{"默认":[]}}');
var exists=false;
Object.keys(cd.groups).forEach(function(g){
cd.groups[g].forEach(function(x){
if(x.name===sp2[0]) exists=true;
});
});
if(!exists){
cd.groups['默认'].push({
name:sp2[0],
desc:sp2[1]||'',
yaml:'name: '+sp2[0]+'\ndesc: '+(sp2[1]||'')+'\ninner: '+(sp2[2]||'')+'\nfavor: '+(sp2[3]||'0')
});
LS.setItem('wre_contacts',JSON.stringify(cd));
}
}
}else if(b.t==='消息'){
if(b.d.indexOf('NSFW')===0){
nsfw=b.d.replace(/^NSFW[\|~]/,'');
}else{
var mm=b.d.split(/[|,]/);
for(var mi=0;mi<mm.length;mi++){
if(mm[mi].trim()&&mm[mi].indexOf('~')>0){
msgs.push(mm[mi].trim());
}
}
}
}else if(b.t==='直播'){
if(b.d==='关'){
lOff=true;
}else{
var parts2=b.d.split('|');
for(var j=0;j<parts2.length;j++){
if(parts2[j].indexOf('观众~')===0){
lV=parts2[j].split('~')[1]||'0';
}else if(parts2[j].indexOf('打赏~')===0){
lT=parts2[j].slice(3);
}else{
lB.push(parts2[j]);
}
}
}
}else if(b.t==='群聊'){
var gl=b.d.split('|');
html+=gChat(gl[0]||'群聊',gl[1]||'3',gl.slice(2));
}else if(b.t==='私聊'){
var pl=b.d.split('|');
html+=gChat(pl[0]||'私聊','2',pl.slice(1));
}else if(b.t==='论坛'){
html+=gForum(b.d);
}else if(b.t==='触摸'){
html+=gTouch(b.d);
}else if(b.t==='朋友圈'){
html+=gPyq(b.d);
}else if(b.t==='文风'){
LS.setItem('wre_style_active',b.d);
}else if(b.t==='通讯录'){
var cl=b.d.split('|');
cl.forEach(function(c){
var pp=c.split('~');
if(pp[0]){
var cd2=JSON.parse(LS.getItem('wre_contacts')||'{"groups":{"默认":[]}}');
var exists2=false;
Object.keys(cd2.groups).forEach(function(g){
cd2.groups[g].forEach(function(x){
if(x.name===pp[0]) exists2=true;
});
});
if(!exists2){
cd2.groups['默认'].push({
name:pp[0],
desc:pp[1]||'',
yaml:'name: '+pp[0]+'\ndesc: '+(pp[1]||'')
});
LS.setItem('wre_contacts',JSON.stringify(cd2));
}
}
});
}else if(b.t==='成就'){
var al=b.d.split('|');
al.forEach(function(a){
var pp=a.split('~');
if(pp[0]){
var achs=JSON.parse(LS.getItem('wre_achv')||'[]');
var exists3=achs.some(function(x){return x.name===pp[0];});
if(!exists3){
achs.push({
badge:pp[2]||'🏆',
name:pp[0],
desc:pp[1]||'',
time:time.m+' '+time.h,
era:time.e||'未知纪年'
});
LS.setItem('wre_achv',JSON.stringify(achs));
}
}
});
}else if(b.t==='背包更新'){
try{
var bag=JSON.parse(LS.getItem('wre_bag')||'[{"name":"积分","amt":"170"},{"name":"属性点","amt":"0"}]');
var ops=b.d.split(',');
ops.forEach(function(op){
var pp=op.split('~');
if(pp[0]&&pp[1]){
var found=bag.find(function(x){return x.name===pp[0];});
if(found) found.amt=pp[1];
else bag.push({name:pp[0],amt:pp[1]});
}
});
LS.setItem('wre_bag',JSON.stringify(bag));
}catch(x){}
}else if(b.t==='记账'){
try{
var lg=JSON.parse(LS.getItem('wre_ledger')||'[]');
var ops2=b.d.split(',');
ops2.forEach(function(op){
var pp=op.split('~');
lg.push({
type:pp[0]==='+'?'inc':'exp',
name:pp[1]||'',
time:time.h,
amt:(pp[0]==='+'?'+':'-')+(pp[2]||''),
era:time.e||'未知纪年'
});
});
LS.setItem('wre_ledger',JSON.stringify(lg));
}catch(x){}
}
}
if(choices.length) html+=gChoices(choices);
if(panel) html+=gPanel(panel);
html+=gTasks(mQ,sQ);
if(chars.length) html+=gChars(chars);
html+=gMsgs(msgs,nsfw);
html+=gLive(lB,lT,lV,lOff);
R.innerHTML=html;
var bl=LS.getItem('wre_blur');
if(bl) document.documentElement.style.setProperty('--gb','blur('+bl+'px) saturate(140%)');
var fc=LS.getItem('wre_fc');
if(fc) document.documentElement.style.setProperty('--fc',fc);
var fs=LS.getItem('wre_fs');
if(fs){
document.documentElement.style.fontSize=fs+'px';
R.style.fontSize=fs+'px';
}
var sc=LS.getItem('wre_color');
if(sc){
var r2=parseInt(sc.slice(1,3),16);
var g2=parseInt(sc.slice(3,5),16);
var b2=parseInt(sc.slice(5,7),16);
document.documentElement.style.setProperty('--go','rgba('+r2+','+g2+','+b2+',.88)');
document.documentElement.style.setProperty('--gd','rgba('+r2+','+g2+','+b2+',.35)');
}
var avs=document.querySelectorAll('input[data-av]');
for(var i=0;i<avs.length;i++){
var inp=avs[i];
var nm=inp.getAttribute('data-av');
var img=document.getElementById(inp.id+'-i');
var tx=document.getElementById(inp.id+'-t')||document.getElementById(inp.id+'-p');
if(img) avBind(img,tx,inp,nm);
}
var btns=document.querySelectorAll('.act-btn');
for(var i=0;i<btns.length;i++){
btns[i].onclick=function(){
var t=this.getAttribute('data-copy');
if(t){cp(t);toast('✓ 已复制');}
};
}
window.tpClick=function(btn,icon,part,deltaCls,deltaText,reaction,inner){
btn.classList.add('touched');
btn.style.pointerEvents='none';
btn.style.opacity='.4';
document.getElementById('popIcon').textContent=icon;
document.getElementById('popPart').textContent=part;
var de=document.getElementById('popDelta');
de.textContent=deltaText;
de.className='tp-pop-delta '+deltaCls;
document.getElementById('popReaction').textContent=reaction;
document.getElementById('popInner').textContent=inner;
document.getElementById('tpPopup').classList.add('show');
};
var likes=document.querySelectorAll('.cmt-like');
for(var i=0;i<likes.length;i++){
likes[i].onclick=function(e){
e.stopPropagation();
var was=this.classList.contains('liked');
var m=this.textContent.match(/\d+/);
var n=m?parseInt(m[0]):0;
this.classList.toggle('liked');
this.textContent=was?'♡ '+(n-1):'♡ '+(n+1);
};
}
}

window.addEventListener('hashchange',render);
render();

window.togglePhone=function(){
var pw=document.getElementById('phoneWrap');
pw.classList.toggle('open');
if(pw.classList.contains('open')) posPhone();
};

function posPhone(){
var pw=document.getElementById('phoneWrap');
var orb=document.getElementById('orbWrap');
if(!pw||!orb) return;
var ox=orb.offsetLeft||0;
var oy=orb.offsetTop||0;
if(!orb.style.left){
ox=window.innerWidth-64;
oy=window.innerHeight-116;
}
var pw2=272;
var ph=440;
var left=ox-pw2/2+23;
if(left+pw2>window.innerWidth) left=window.innerWidth-pw2-8;
if(left<4) left=4;
var top=oy-ph-12;
if(top<4) top=oy+56;
pw.style.right='auto';
pw.style.bottom='auto';
pw.style.left=left+'px';
pw.style.top=top+'px';
}

window.goHome=function(){
document.querySelectorAll('.app-page').forEach(function(p){
p.classList.remove('active');
});
};

window.openApp=function(id){
window.goHome();
var el=document.getElementById('pg-'+id);
if(el) el.classList.add('active');
if(window['init_'+id]) window['init_'+id]();
};

function upClock(){
var d=new Date();
var h=d.getHours();
var m=d.getMinutes();
var t=(h<10?'0':'')+h+':'+(m<10?'0':'')+m;
document.getElementById('phTime').textContent=t;
document.getElementById('homeT').textContent=t;
var days=['周日','周一','周二','周三','周四','周五','周六'];
document.getElementById('homeD').textContent=days[d.getDay()]+' · '+(d.getMonth()+1)+'月'+d.getDate()+'日';
}
upClock();
setInterval(upClock,30000);

(function(){
var phc=LS.getItem('wre_ph_color');
if(phc){
var ht=document.getElementById('homeT');
var hd=document.getElementById('homeD');
var hl=document.querySelector('.ph-home-logo');
if(ht) ht.style.color=phc;
if(hd) hd.style.color=phc;
if(hl) hl.style.color=phc;
var labels=document.querySelectorAll('.app-i-label');
for(var i=0;i<labels.length;i++) labels[i].style.color=phc;
}
var pic=LS.getItem('wre_ph_inner_color');
if(pic){
document.documentElement.style.setProperty('--pic',pic);
}
var wp2=LS.getItem('wre_wp2');
if(wp2){
var pages2=document.querySelectorAll('.app-body');
pages2.forEach(function(p){
p.style.backgroundImage='url('+wp2+')';
p.style.backgroundSize='cover';
p.style.backgroundPosition='center';
});
}
})();

(function(){
var wp=LS.getItem('wre_wp');
if(wp){
var hs=document.getElementById('homeScreen');
if(hs){
hs.style.backgroundImage='url('+wp+')';
hs.style.backgroundSize='cover';
hs.style.backgroundPosition='center';
}
}
})();

var appDefs=[
{id:'settings',label:'设置',svg:'<circle cx="13" cy="13" r="4" stroke="CL" stroke-width="1.5" fill="none"/><path d="M13 3v2M13 21v2M3 13h2M21 13h2M5.6 5.6l1.5 1.5M18.9 18.9l1.5 1.5M5.6 20.4l1.5-1.5M18.9 7.1l1.5-1.5" stroke="CL" stroke-width="1.3" stroke-linecap="round"/>',c:'rgba(160,155,150,.5)'},
{id:'wardrobe',label:'生成器',svg:'<path d="M9 4c0 0-4 2-4 6v11h16V10c0-4-4-6-4-6" stroke="CL" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M9 4c1 2 2 3 4 3s3-1 4-3" stroke="CL" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M13 10v11M8 14h10" stroke="CL" stroke-width="1.2" stroke-linecap="round" fill="none"/>',c:'rgba(175,155,140,.5)'},
{id:'contacts',label:'通讯录',svg:'<circle cx="13" cy="10" r="4" stroke="CL" stroke-width="1.5" fill="none"/><path d="M5 22c0-4 3.6-7 8-7s8 3 8 7" stroke="CL" stroke-width="1.5" stroke-linecap="round" fill="none"/>',c:'rgba(145,165,155,.5)'},
{id:'food',label:'吃什么',svg:'<path d="M8 4v6c0 2 2 3.5 4 3.5h2c2 0 4-1.5 4-3.5V4" stroke="CL" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M13 13.5v8M9 21.5h8" stroke="CL" stroke-width="1.5" stroke-linecap="round" fill="none"/>',c:'rgba(180,165,140,.5)'},
{id:'cmd',label:'指令集',svg:'<rect x="4" y="6" width="18" height="14" rx="3" stroke="CL" stroke-width="1.5" fill="none"/><path d="M8 11l3 2.5-3 2.5M14 16h5" stroke="CL" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',c:'rgba(145,155,175,.5)'},
{id:'bag',label:'背包',svg:'<rect x="5" y="10" width="16" height="12" rx="3" stroke="CL" stroke-width="1.5" fill="none"/><path d="M9 10V8a4 4 0 018 0v2" stroke="CL" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M13 14v4M11 16h4" stroke="CL" stroke-width="1.2" stroke-linecap="round" fill="none"/>',c:'rgba(155,150,170,.5)'},
{id:'style',label:'文风',svg:'<path d="M5 19l5-14 3 7 3-4 5 11" stroke="CL" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',c:'rgba(150,170,175,.5)'},
{id:'icon',label:'换图标',svg:'<rect x="5" y="5" width="16" height="16" rx="4" stroke="CL" stroke-width="1.5" fill="none"/><circle cx="10" cy="12" r="2" stroke="CL" stroke-width="1.2" fill="none"/><path d="M14 9h4M14 12h4M14 15h4" stroke="CL" stroke-width="1.2" stroke-linecap="round" fill="none"/>',c:'rgba(170,160,155,.5)'},
{id:'achieve',label:'成就',svg:'<path d="M13 3l2.5 5 5.5.8-4 3.9 1 5.5L13 15.7 7.8 18.2l1-5.5-4-3.9 5.5-.8z" stroke="CL" stroke-width="1.5" fill="none" stroke-linejoin="round"/>',c:'rgba(165,155,145,.5)'}
];

(function(){
var grid=document.getElementById('appGrid');
appDefs.forEach(function(a){
var d=document.createElement('div');
d.className='app-i';
d.onclick=function(){openApp(a.id);};
d.innerHTML='<div class="app-i-icon"><svg viewBox="0 0 26 26" width="24" height="24">'
+a.svg.replace(/CL/g,a.c)
+'</svg></div><div class="app-i-label">'+a.label+'</div>';
grid.appendChild(d);
});
var saved=LS.getItem('wre_icon');
if(saved){
var svgs=JSON.parse(LS.getItem('wre_icon_svg')||'null');
if(svgs) document.getElementById('orbBtn').innerHTML=svgs;
}
})();

(function(){
var orb=document.getElementById('orbWrap');
if(!orb) return;
var ox=0,oy=0,mx=0,my=0,dragging=false;
var sp=LS.getItem('wre_orbpos');
if(sp){
try{
var pp=JSON.parse(sp);
orb.style.right='auto';
orb.style.bottom='auto';
orb.style.left=pp.x+'px';
orb.style.top=pp.y+'px';
}catch(e){}
}
orb.addEventListener('touchstart',function(e){
var t=e.touches[0];
ox=orb.offsetLeft;
oy=orb.offsetTop;
mx=t.clientX;
my=t.clientY;
dragging=false;
},{passive:true});
orb.addEventListener('touchmove',function(e){
dragging=true;
var t=e.touches[0];
var nx=ox+(t.clientX-mx);
var ny=oy+(t.clientY-my);
orb.style.right='auto';
orb.style.bottom='auto';
orb.style.left=Math.max(0,Math.min(window.innerWidth-50,nx))+'px';
orb.style.top=Math.max(0,Math.min(window.innerHeight-50,ny))+'px';
posPhone();
e.preventDefault();
},{passive:false});
orb.addEventListener('touchend',function(){
if(dragging){
LS.setItem('wre_orbpos',JSON.stringify({x:orb.offsetLeft,y:orb.offsetTop}));
dragging=false;
}
});
orb.addEventListener('mousedown',function(e){
ox=orb.offsetLeft;
oy=orb.offsetTop;
mx=e.clientX;
my=e.clientY;
dragging=false;
var onmove=function(ev){
dragging=true;
var nx=ox+(ev.clientX-mx);
var ny=oy+(ev.clientY-my);
orb.style.right='auto';
orb.style.bottom='auto';
orb.style.left=Math.max(0,Math.min(window.innerWidth-50,nx))+'px';
orb.style.top=Math.max(0,Math.min(window.innerHeight-50,ny))+'px';
posPhone();
};
var onup=function(){
document.removeEventListener('mousemove',onmove);
document.removeEventListener('mouseup',onup);
if(dragging){
LS.setItem('wre_orbpos',JSON.stringify({x:orb.offsetLeft,y:orb.offsetTop}));
}
};
document.addEventListener('mousemove',onmove);
document.addEventListener('mouseup',onup);
});
})();

})();
