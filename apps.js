(function(){
var LS=localStorage;
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function toast(m){var t=document.getElementById('T');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show');},2000);}
function cp(t){try{navigator.clipboard.writeText(t);}catch(x){var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();document.execCommand('copy');document.body.removeChild(a);}}

window.init_settings=function(){
var body=document.getElementById('settingsBody');
var presets=['#c8c0b2','#b49b8c','#91a59b','#b4a58c','#919bb3','#9b96aa','#96aab3','#aa9f9b','#a59b91','#788c78','#be827d','#829abe','#a591b9','#c8b491','#91b4aa','#b28c8c'];
var cc=LS.getItem('wre_color')||'#c8c0b2';
var cf=parseInt(LS.getItem('wre_fs')||'14');
var phColor=LS.getItem('wre_ph_color')||'rgba(255,255,255,.9)';
var phColors=[
{c:'rgba(255,255,255,.95)',n:'纯白'},
{c:'rgba(240,235,222,.9)',n:'暖白'},
{c:'rgba(245,240,230,.9)',n:'象牙'},
{c:'rgba(220,215,200,.85)',n:'宣纸'},
{c:'rgba(210,182,128,.9)',n:'金'},
{c:'rgba(195,180,145,.85)',n:'琥珀'},
{c:'rgba(180,140,210,.9)',n:'紫'},
{c:'rgba(128,195,165,.9)',n:'青'},
{c:'rgba(210,145,138,.9)',n:'粉'},
{c:'rgba(130,170,220,.9)',n:'蓝'},
{c:'rgba(180,175,165,.8)',n:'烟灰'},
{c:'rgba(140,138,135,.75)',n:'深灰'},
{c:'rgba(100,98,95,.85)',n:'炭灰'},
{c:'rgba(60,58,55,.9)',n:'墨'},
{c:'rgba(30,28,25,.95)',n:'黑'}
];
var phInnerColors=[
{c:'rgba(255,255,255,.95)',n:'纯白'},
{c:'rgba(240,235,222,.91)',n:'暖白'},
{c:'rgba(245,240,230,.9)',n:'象牙'},
{c:'rgba(220,215,200,.85)',n:'宣纸'},
{c:'rgba(200,195,180,.8)',n:'麻色'},
{c:'rgba(210,182,128,.85)',n:'金'},
{c:'rgba(180,140,210,.85)',n:'紫'},
{c:'rgba(128,195,165,.85)',n:'青'},
{c:'rgba(210,145,138,.85)',n:'粉'},
{c:'rgba(130,170,220,.85)',n:'蓝'},
{c:'rgba(180,175,165,.75)',n:'烟灰'},
{c:'rgba(140,138,135,.7)',n:'深灰'},
{c:'rgba(100,98,95,.85)',n:'炭灰'},
{c:'rgba(60,58,55,.9)',n:'墨'},
{c:'rgba(30,28,25,.95)',n:'黑'}
];
var phInnerColor=LS.getItem('wre_ph_inner_color')||'rgba(240,235,222,.91)';
body.innerHTML=''
+'<div style="font-size:11px;color:rgba(160,152,140,.6);letter-spacing:2px;margin-bottom:5px">状态栏颜色</div>'
+'<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;margin-bottom:8px">'
+'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
+'<input type="color" id="cpick" value="'+cc+'" style="width:30px;height:30px;border-radius:6px;border:1px solid rgba(255,255,255,.1);cursor:pointer;background:transparent;padding:0">'
+'<span id="chex" style="font-family:var(--ffm);font-size:11px;color:rgba(195,185,168,.68)">'+cc+'</span></div>'
+'<div id="presetRow" style="display:flex;gap:4px;overflow-x:auto;padding:2px 0;-webkit-overflow-scrolling:touch"></div></div>'
+'<div style="font-size:11px;color:rgba(160,152,140,.6);letter-spacing:2px;margin-bottom:5px">字体颜色</div>'
+'<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;margin-bottom:8px;overflow:hidden">'
+'<div id="fcRow" style="display:flex;gap:6px;overflow-x:auto;padding:2px 0;-webkit-overflow-scrolling:touch;min-height:26px;scrollbar-width:none;flex-wrap:nowrap;-ms-overflow-style:none"></div></div>'
+'<div style="font-size:11px;color:rgba(160,152,140,.6);letter-spacing:2px;margin-bottom:5px">字号</div>'
+'<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;margin-bottom:8px">'
+'<div style="display:flex;align-items:center;gap:8px">'
+'<button onclick="chgFs(-1)" style="width:28px;height:28px;border-radius:6px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);color:rgba(238,232,218,.9);cursor:pointer;font-size:14px;line-height:1">−</button>'
+'<span id="fsV" style="font-family:var(--ffm);font-size:13px;color:rgba(238,232,218,.9);min-width:40px;text-align:center">'+cf+'px</span>'
+'<button onclick="chgFs(1)" style="width:28px;height:28px;border-radius:6px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);color:rgba(238,232,218,.9);cursor:pointer;font-size:14px;line-height:1">+</button>'
+'</div></div>'
+'<div style="font-size:11px;color:rgba(160,152,140,.6);letter-spacing:2px;margin-bottom:5px">手机主题</div>'
+'<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;margin-bottom:8px">'
+'<div style="font-size:10px;color:rgba(160,152,140,.5);margin-bottom:5px">封面字体颜色</div>'
+'<div id="phColorRow" style="display:flex;gap:6px;overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:8px;scrollbar-width:none"></div>'
+'<div style="font-size:10px;color:rgba(160,152,140,.5);margin:5px 0 5px">内页字体颜色</div>'
+'<div id="phInnerColorRow" style="display:flex;gap:6px;overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:8px;scrollbar-width:none"></div>'
+'<div style="font-size:10px;color:rgba(160,152,140,.5);margin-bottom:5px">封面壁纸</div>'
+'<div id="wpPrev" onclick="document.getElementById(\'wpInp\').click()" style="width:100%;height:45px;border-radius:6px;border:1px dashed rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative"><span style="font-size:10px;color:rgba(160,152,140,.5)">点击导入</span></div>'
+'<input type="file" accept="image/*" id="wpInp" style="display:none" onchange="loadWp(this)">'
+'<div style="font-size:10px;color:rgba(160,152,140,.5);margin:8px 0 5px">内页背景壁纸</div>'
+'<div id="wpPrev2" onclick="document.getElementById(\'wpInp2\').click()" style="width:100%;height:45px;border-radius:6px;border:1px dashed rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative"><span style="font-size:10px;color:rgba(160,152,140,.5)">点击导入</span></div>'
+'<input type="file" accept="image/*" id="wpInp2" style="display:none" onchange="loadWp2(this)">'
+'<div style="margin-top:8px;padding:6px;border-radius:6px;border:1px solid rgba(190,130,125,.25);background:rgba(190,130,125,.05);font-size:11px;color:rgba(190,130,125,.8);cursor:pointer;text-align:center" onclick="resetWallpapers()">恢复默认壁纸</div>'
+'</div>'
+'<div style="text-align:center;padding:12px 0 4px;font-size:9px;color:rgba(160,152,140,.4);letter-spacing:.5px">作者：vv白榴莲</div>';

var pr=document.getElementById('presetRow');
presets.forEach(function(c){
var d=document.createElement('div');
d.style.cssText='width:20px;height:20px;border-radius:50%;cursor:pointer;flex-shrink:0;border:2px solid '+(c===cc?'rgba(255,255,255,.6)':'transparent')+';background:'+c;
d.onclick=function(){document.getElementById('cpick').value=c;applyC(c);pr.querySelectorAll('div').forEach(function(x){x.style.borderColor='transparent';});d.style.borderColor='rgba(255,255,255,.6)';};
pr.appendChild(d);
});
document.getElementById('cpick').oninput=function(){applyC(this.value);};

var fcPresets=[
{c:'rgba(240,235,222,.91)',n:'暖白'},
{c:'rgba(255,255,255,.92)',n:'纯白'},
{c:'rgba(245,240,230,.9)',n:'象牙'},
{c:'rgba(220,215,200,.85)',n:'宣纸'},
{c:'rgba(200,195,180,.8)',n:'麻色'},
{c:'rgba(180,175,165,.75)',n:'烟灰'},
{c:'rgba(140,138,135,.7)',n:'深灰'},
{c:'rgba(100,98,95,.85)',n:'炭灰'},
{c:'rgba(60,58,55,.9)',n:'墨'},
{c:'rgba(30,28,25,.95)',n:'纯黑'},
{c:'rgba(210,200,180,.85)',n:'古卷'},
{c:'rgba(195,185,168,.8)',n:'旧纸'},
{c:'rgba(225,220,210,.88)',n:'月白'},
{c:'rgba(175,168,155,.78)',n:'青灰'},
{c:'rgba(160,155,145,.72)',n:'石灰'}
];
var curFc=LS.getItem('wre_fc')||'rgba(240,235,222,.91)';
var fcRow=document.getElementById('fcRow');
fcPresets.forEach(function(f){
var d=document.createElement('div');
d.style.cssText='width:20px;height:20px;border-radius:50%;cursor:pointer;flex-shrink:0;border:2px solid '+(f.c===curFc?'rgba(255,255,255,.6)':'transparent')+';background:'+f.c;
d.title=f.n;
d.onclick=function(){
LS.setItem('wre_fc',f.c);
document.documentElement.style.setProperty('--fc',f.c);
fcRow.querySelectorAll('div').forEach(function(x){x.style.borderColor='transparent';});
d.style.borderColor='rgba(255,255,255,.6)';
};
fcRow.appendChild(d);
});

var phcRow=document.getElementById('phColorRow');
phColors.forEach(function(f){
var d=document.createElement('div');
d.style.cssText='width:20px;height:20px;border-radius:50%;cursor:pointer;flex-shrink:0;border:2px solid '+(f.c===phColor?'rgba(255,255,255,.6)':'transparent')+';background:'+f.c;
d.title=f.n;
d.onclick=function(){
LS.setItem('wre_ph_color',f.c);
phcRow.querySelectorAll('div').forEach(function(x){x.style.borderColor='transparent';});
d.style.borderColor='rgba(255,255,255,.6)';
applyPhColor(f.c);
};
phcRow.appendChild(d);
});
var phicRow=document.getElementById('phInnerColorRow');
phInnerColors.forEach(function(f){
var d=document.createElement('div');
d.style.cssText='width:20px;height:20px;border-radius:50%;cursor:pointer;flex-shrink:0;border:2px solid '+(f.c===phInnerColor?'rgba(255,255,255,.6)':'transparent')+';background:'+f.c;
d.title=f.n;
d.onclick=function(){
LS.setItem('wre_ph_inner_color',f.c);
phicRow.querySelectorAll('div').forEach(function(x){x.style.borderColor='transparent';});
d.style.borderColor='rgba(255,255,255,.6)';
applyPhInnerColor(f.c);
};
phicRow.appendChild(d);
});

var wp=LS.getItem('wre_wp');
if(wp) document.getElementById('wpPrev').innerHTML='<img src="'+wp+'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">';
var wp2=LS.getItem('wre_wp2');
if(wp2) document.getElementById('wpPrev2').innerHTML='<img src="'+wp2+'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">';
};

function applyPhColor(c){
var ht=document.getElementById('homeT');
var hd=document.getElementById('homeD');
var hl=document.querySelector('.ph-home-logo');
if(ht) ht.style.color=c;
if(hd) hd.style.color=c;
if(hl) hl.style.color=c;
var labels=document.querySelectorAll('.app-i-label');
for(var i=0;i<labels.length;i++) labels[i].style.color=c;
}
function applyPhInnerColor(c){
document.documentElement.style.setProperty('--pic',c);
}

window.applyC=function(c){
LS.setItem('wre_color',c);
document.getElementById('chex').textContent=c;
var r=parseInt(c.slice(1,3),16),g=parseInt(c.slice(3,5),16),b=parseInt(c.slice(5,7),16);
document.documentElement.style.setProperty('--go','rgba('+r+','+g+','+b+',.88)');
document.documentElement.style.setProperty('--gd','rgba('+r+','+g+','+b+',.35)');
};

window.chgFs=function(d){
var f=parseInt(LS.getItem('wre_fs')||'14');
f=Math.max(11,Math.min(18,f+d));
LS.setItem('wre_fs',String(f));
document.getElementById('fsV').textContent=f+'px';
document.documentElement.style.fontSize=f+'px';
var r=document.getElementById('R');
if(r) r.style.fontSize=f+'px';
};

window.loadWp=function(inp){
var f=inp.files[0];if(!f)return;
var r=new FileReader();
r.onload=function(e){
try{LS.setItem('wre_wp',e.target.result);}catch(x){}
document.getElementById('wpPrev').innerHTML='<img src="'+e.target.result+'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">';
var hs=document.getElementById('homeScreen');
if(hs){hs.style.backgroundImage='url('+e.target.result+')';hs.style.backgroundSize='cover';hs.style.backgroundPosition='center';}
};
r.readAsDataURL(f);
};

window.loadWp2=function(inp){
var f=inp.files[0];if(!f)return;
var r=new FileReader();
r.onload=function(e){
try{LS.setItem('wre_wp2',e.target.result);}catch(x){}
document.getElementById('wpPrev2').innerHTML='<img src="'+e.target.result+'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">';
applyWp2(e.target.result);
};
r.readAsDataURL(f);
};

window.resetWallpapers=function(){
LS.removeItem('wre_wp');
LS.removeItem('wre_wp2');
var hs=document.getElementById('homeScreen');
if(hs){hs.style.backgroundImage='none';hs.style.background='rgba(14,12,20,.97)';}
var pages=document.querySelectorAll('.app-body');
pages.forEach(function(p){p.style.backgroundImage='none';});
document.getElementById('wpPrev').innerHTML='<span style="font-size:10px;color:rgba(160,152,140,.5)">点击导入</span>';
document.getElementById('wpPrev2').innerHTML='<span style="font-size:10px;color:rgba(160,152,140,.5)">点击导入</span>';
toast('已恢复默认');
};

function applyWp2(url){
var pages=document.querySelectorAll('.app-page .app-body');
pages.forEach(function(p){
p.style.backgroundImage='url('+url+')';
p.style.backgroundSize='cover';
p.style.backgroundPosition='center';
});
}

window.init_wardrobe=function(){
var body=document.getElementById('wardrobeBody');
var WD=window.WD_DATA;
if(!WD){body.innerHTML='加载中...';return;}
var allCats=Object.keys(WD);
var topCat=LS.getItem('wre_wdtop')||allCats[0];
if(!WD[topCat]){body.innerHTML='无数据';return;}
var subCats=Object.keys(WD[topCat]||{});
var tab=LS.getItem('wre_wdtab')||subCats[0]||'';
var sel=JSON.parse(LS.getItem('wre_wdsel')||'{}');
var col=JSON.parse(LS.getItem('wre_wdcol')||'{}');
var slots=WD[topCat][tab];
var scrollBefore=body.scrollTop;
var isDungeon=(topCat==='副本');
var isPlot=(topCat==='剧情');
var isSinglePage=isDungeon||isPlot;
var needColor=!!window.WD_COLORS&&(topCat.indexOf('衣橱')>=0);

var h='<div style="display:flex;gap:3px;overflow-x:auto;margin-bottom:6px;padding-bottom:2px;-webkit-overflow-scrolling:touch;flex-wrap:nowrap">';
allCats.forEach(function(c){
h+='<div style="font-size:10px;padding:3px 8px;border-radius:12px;border:1px solid '+(c===topCat?'rgba(200,192,178,.35)':'rgba(255,255,255,.07)')+';color:'+(c===topCat?'var(--go)':'rgba(160,152,140,.5)')+';cursor:pointer;white-space:nowrap;flex-shrink:0" onclick="swWdTop(\''+esc(c)+'\')">'+esc(c)+'</div>';
});
h+='</div>';

if(isSinglePage){
var allSlots=slots||WD[topCat][subCats[0]]||{};
h+='<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:6px 10px">';
Object.keys(allSlots).forEach(function(slot){
var sv=sel[slot]||'';
h+='<div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04)">';
h+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">';
h+='<span style="font-size:10px;color:rgba(160,152,140,.6)">'+esc(slot)+'</span>';
h+='<span style="font-size:12px;cursor:pointer" onclick="rollWdName(\''+esc(slot)+'\')">🎲</span>';
h+='</div>';
if(sv){
h+='<div style="padding:5px 8px;border-radius:6px;border:1px solid rgba(255,255,255,.08);font-size:11px;color:rgba(238,232,218,.9);line-height:1.6;word-break:break-all">'+esc(sv)+'</div>';
}else{
h+='<div style="padding:5px 8px;font-size:10px;color:rgba(160,152,140,.4)">点击🎲随机</div>';
}
h+='</div>';
});
h+='</div>';

if(isDungeon){
var curDiff=sel['__diff__']||'';
var curReward=sel['__reward__']||'';
var curPenalty=sel['__penalty__']||'';
h+='<div style="margin-top:6px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:8px 10px">';
h+='<div style="padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04)">';
h+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px"><span style="font-size:10px;color:rgba(160,152,140,.6)">难度</span><span style="font-size:12px;cursor:pointer" onclick="rollDungeonMeta(\'diff\')">🎲</span></div>';
h+='<div style="padding:5px 8px;border-radius:6px;border:1px solid rgba(255,255,255,.08);font-size:11px;color:'+(curDiff?'rgba(238,232,218,.9)':'rgba(160,152,140,.4)')+';line-height:1.6">'+esc(curDiff||'点击🎲')+'</div></div>';
h+='<div style="padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04)">';
h+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px"><span style="font-size:10px;color:rgba(160,152,140,.6)">奖励</span><span style="font-size:12px;cursor:pointer" onclick="rollDungeonMeta(\'reward\')">🎲</span></div>';
h+='<div style="padding:5px 8px;border-radius:6px;border:1px solid rgba(255,255,255,.08);font-size:11px;color:'+(curReward?'rgba(180,220,160,.95)':'rgba(160,152,140,.4)')+';line-height:1.6">'+esc(curReward||'点击🎲')+'</div></div>';
h+='<div style="padding:5px 0">';
h+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px"><span style="font-size:10px;color:rgba(160,152,140,.6)">惩罚</span><span style="font-size:12px;cursor:pointer" onclick="rollDungeonMeta(\'penalty\')">🎲</span></div>';
h+='<div style="padding:5px 8px;border-radius:6px;border:1px solid rgba(255,255,255,.08);font-size:11px;color:'+(curPenalty?'rgba(225,150,140,.95)':'rgba(160,152,140,.4)')+';line-height:1.6">'+esc(curPenalty||'点击🎲')+'</div></div>';
h+='</div>';
}

var previewParts=[];
Object.keys(sel).forEach(function(k){if(sel[k]&&k.indexOf('__')!==0)previewParts.push(k+'：'+sel[k]);});
if(sel['__diff__']) previewParts.push('难度：'+sel['__diff__']);
if(sel['__reward__']) previewParts.push('奖励：'+sel['__reward__']);
if(sel['__penalty__']) previewParts.push('惩罚：'+sel['__penalty__']);
if(previewParts.length){
h+='<div style="margin-top:8px;font-size:11px;color:rgba(195,185,168,.68);line-height:1.8">';
h+=previewParts.map(function(p){return esc(p);}).join('<br>');
h+='</div>';
}

h+='<div style="display:flex;gap:5px;margin-top:6px">';
h+='<div style="flex:1;padding:7px;background:rgba(200,192,178,.08);border:1px solid rgba(200,192,178,.3);border-radius:8px;font-size:11px;color:var(--go);cursor:pointer;text-align:center" onclick="rollWdAllKeepScroll()">全部随机</div>';
h+='<div style="flex:1;padding:7px;background:rgba(200,192,178,.08);border:1px solid rgba(200,192,178,.3);border-radius:8px;font-size:11px;color:var(--go);cursor:pointer;text-align:center" onclick="copyWd()">一键复制</div>';
h+='<div style="flex:1;padding:7px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:8px;font-size:11px;color:rgba(160,152,140,.6);cursor:pointer;text-align:center" onclick="clearWd()">清空</div>';
h+='</div>';

}else{
if(subCats.length>1){
h+='<div style="display:flex;gap:3px;overflow-x:auto;margin-bottom:6px;padding-bottom:2px;-webkit-overflow-scrolling:touch;flex-wrap:nowrap">';
subCats.forEach(function(t){
h+='<div style="font-size:10px;padding:2px 6px;border-radius:6px;border:1px solid '+(t===tab?'rgba(200,192,178,.25)':'rgba(255,255,255,.05)')+';color:'+(t===tab?'rgba(238,232,218,.9)':'rgba(160,152,140,.4)')+';cursor:pointer;white-space:nowrap;flex-shrink:0" onclick="swWdTab(\''+esc(t)+'\')">'+esc(t)+'</div>';
});
h+='</div>';
}
if(slots){
h+='<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:6px 10px">';
Object.keys(slots).forEach(function(slot){
var sv=sel[slot]||'';
var cv=col[slot]||'';
h+='<div style="display:flex;align-items:center;gap:4px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04)">';
h+='<span style="font-size:10px;color:rgba(160,152,140,.6);width:30px;flex-shrink:0;text-align:right">'+esc(slot)+'</span>';
if(needColor){
h+='<span style="padding:2px 5px;border-radius:4px;border:1px solid rgba(255,255,255,.08);font-size:10px;color:rgba(195,185,168,.68);min-width:28px;text-align:center">'+esc(cv||'色')+'</span>';
h+='<span style="font-size:12px;cursor:pointer" onclick="rollWdCol(\''+esc(slot)+'\')">🎲</span>';
}
h+='<span style="padding:2px 5px;border-radius:4px;border:1px solid rgba(255,255,255,.08);font-size:10px;color:'+(sv?'rgba(238,232,218,.9)':'rgba(160,152,140,.5)')+';flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(sv||'点击🎲随机')+'</span>';
h+='<span style="font-size:12px;cursor:pointer" onclick="rollWdName(\''+esc(slot)+'\')">🎲</span>';
h+='</div>';
});
h+='</div>';
}
var previewParts2=[];
Object.keys(sel).forEach(function(k){if(sel[k]){var c=col[k];previewParts2.push(k+'：'+(c?c:'')+sel[k]);}});
if(previewParts2.length){
h+='<div style="margin-top:8px;font-size:11px;color:rgba(195,185,168,.68);line-height:1.8">';
h+=previewParts2.map(function(p){return esc(p);}).join('<br>');
h+='</div>';
}
h+='<div style="display:flex;gap:5px;margin-top:6px">';
h+='<div style="flex:1;padding:7px;background:rgba(200,192,178,.08);border:1px solid rgba(200,192,178,.3);border-radius:8px;font-size:11px;color:var(--go);cursor:pointer;text-align:center" onclick="rollWdAllKeepScroll()">全部随机</div>';
h+='<div style="flex:1;padding:7px;background:rgba(200,192,178,.08);border:1px solid rgba(200,192,178,.3);border-radius:8px;font-size:11px;color:var(--go);cursor:pointer;text-align:center" onclick="copyWd()">一键复制</div>';
h+='<div style="flex:1;padding:7px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:8px;font-size:11px;color:rgba(160,152,140,.6);cursor:pointer;text-align:center" onclick="clearWd()">清空</div>';
h+='</div>';
}

body.innerHTML=h;
body.scrollTop=scrollBefore;
var rows=body.querySelectorAll('div[style*="overflow-x"]');
for(var ri=0;ri<rows.length;ri++){
var active=rows[ri].querySelector('[style*=".35)"]');
if(!active) active=rows[ri].querySelector('[style*=".25)"]');
if(active) active.scrollIntoView({inline:'center',block:'nearest',behavior:'instant'});
}
};

window.swWdTop=function(c){
LS.setItem('wre_wdtop',c);
var WD=window.WD_DATA;
var subs=Object.keys(WD[c]||{});
LS.setItem('wre_wdtab',subs[0]||'');
LS.setItem('wre_wdsel','{}');
LS.setItem('wre_wdcol','{}');
init_wardrobe();
};
window.swWdTab=function(t){
LS.setItem('wre_wdtab',t);
LS.setItem('wre_wdsel','{}');
LS.setItem('wre_wdcol','{}');
init_wardrobe();
};
window.rollWdCol=function(slot){var colors=window.WD_COLORS||['白','黑'];var c=colors[Math.floor(Math.random()*colors.length)];var col=JSON.parse(LS.getItem('wre_wdcol')||'{}');col[slot]=c;LS.setItem('wre_wdcol',JSON.stringify(col));init_wardrobe();};

window.rollWdName=function(slot){
var body=document.getElementById('wardrobeBody');
var sb=body?body.scrollTop:0;
var topCat=LS.getItem('wre_wdtop')||Object.keys(window.WD_DATA||{})[0];
var tab=LS.getItem('wre_wdtab')||'';
var WD=window.WD_DATA;
if(!WD||!WD[topCat])return;
var isSP=(topCat==='副本'||topCat==='剧情');
var slots;
if(isSP){var sc=Object.keys(WD[topCat]);slots=WD[topCat][sc[0]];}
else{if(!WD[topCat][tab])return;slots=WD[topCat][tab];}
var items=slots[slot];if(!items)return;
var sel=JSON.parse(LS.getItem('wre_wdsel')||'{}');
sel[slot]=items[Math.floor(Math.random()*items.length)];
LS.setItem('wre_wdsel',JSON.stringify(sel));
init_wardrobe();
if(body) body.scrollTop=sb;
};

window.rollWdAllKeepScroll=function(){
var body=document.getElementById('wardrobeBody');
var sb=body?body.scrollTop:0;
rollWdAll();
if(body) setTimeout(function(){body.scrollTop=sb;},0);
};

window.rollWdAll=function(){
var topCat=LS.getItem('wre_wdtop')||Object.keys(window.WD_DATA||{})[0];
var tab=LS.getItem('wre_wdtab')||'';
var WD=window.WD_DATA;
if(!WD||!WD[topCat])return;
var isDungeon=(topCat==='副本');
var isSP=(isDungeon||topCat==='剧情');
var slots;
if(isSP){var sc=Object.keys(WD[topCat]);slots=WD[topCat][sc[0]];}
else{if(!WD[topCat][tab])return;slots=WD[topCat][tab];}
var sel={},col={};
var needColor=!!window.WD_COLORS&&(topCat.indexOf('衣橱')>=0);
var colors=window.WD_COLORS||['白'];
Object.keys(slots).forEach(function(slot){
var items=slots[slot];
sel[slot]=items[Math.floor(Math.random()*items.length)];
if(needColor)col[slot]=colors[Math.floor(Math.random()*colors.length)];
});
if(isDungeon){
var difficulties=['E','D','C','B','A','S','SS','SSS'];
var rewards=['积分×200','积分×500','积分×1000','稀有道具×1','属性点×3','属性点×5','限定称号','SSR装备抽取券','好感度道具×2','随机技能书','变装卡×1','复活币×1','积分×300+随机道具','幸运星×5','全属性+1药水','指定角色好感+10','隐藏剧情解锁券','限时双倍积分卡','传送符×3','金色宝箱钥匙','神秘礼包·不知道开出什么','角色专属语音·限定','ta的贴身物品·用途不明','对方的一个秘密','强制告白卡·对方必须回应','红线检测器·查看隐藏好感','月光宝盒·回溯一轮剧情','剧本修改权×1','NPC临时雇佣券','全服广播权×1'];
var penalties=['积分-100','随机属性-2','好感度随机-5','装备耐久归零','强制触发尴尬事件','被NPC目击社死现场','随机一位角色生气三轮','丢失一件背包道具','被迫穿奇怪衣服一轮','强制告白随机角色','下一轮开局被误会','随机获得一个debuff','被贴标签·全服可见','被迫说出一个秘密','下轮行动选项-1','临时失忆忘掉一个人名','被NPC强制带走逛街两小时','获得称号·倒霉蛋','下轮所有骰子-1','被反派注意到了'];
sel['__diff__']=difficulties[Math.floor(Math.random()*difficulties.length)];
sel['__reward__']=rewards[Math.floor(Math.random()*rewards.length)];
sel['__penalty__']=penalties[Math.floor(Math.random()*penalties.length)];
}
LS.setItem('wre_wdsel',JSON.stringify(sel));
LS.setItem('wre_wdcol',JSON.stringify(col));
init_wardrobe();
};

window.rollDungeonMeta=function(type){
var body=document.getElementById('wardrobeBody');
var sb=body?body.scrollTop:0;
var sel=JSON.parse(LS.getItem('wre_wdsel')||'{}');
var difficulties=['E','D','C','B','A','S','SS','SSS'];
var rewards=['积分×200','积分×500','积分×1000','稀有道具×1','属性点×3','属性点×5','限定称号','SSR装备抽取券','好感度道具×2','随机技能书','变装卡×1','复活币×1','积分×300+随机道具','幸运星×5','全属性+1药水','指定角色好感+10','隐藏剧情解锁券','限时双倍积分卡','传送符×3','金色宝箱钥匙','神秘礼包·不知道开出什么','角色专属语音·限定','ta的贴身物品·用途不明','对方的一个秘密','强制告白卡·对方必须回应','红线检测器·查看隐藏好感','月光宝盒·回溯一轮剧情','剧本修改权×1','NPC临时雇佣券','全服广播权×1'];
var penalties=['积分-100','随机属性-2','好感度随机-5','装备耐久归零','强制触发尴尬事件','被NPC目击社死现场','随机一位角色生气三轮','丢失一件背包道具','被迫穿奇怪衣服一轮','强制告白随机角色','下一轮开局被误会','随机获得一个debuff','被贴标签·全服可见','被迫说出一个秘密','下轮行动选项-1','临时失忆忘掉一个人名','被NPC强制带走逛街两小时','获得称号·倒霉蛋','下轮所有骰子-1','被反派注意到了'];
if(type==='diff') sel['__diff__']=difficulties[Math.floor(Math.random()*difficulties.length)];
if(type==='reward') sel['__reward__']=rewards[Math.floor(Math.random()*rewards.length)];
if(type==='penalty') sel['__penalty__']=penalties[Math.floor(Math.random()*penalties.length)];
LS.setItem('wre_wdsel',JSON.stringify(sel));
init_wardrobe();
if(body) body.scrollTop=sb;
};

window.copyWd=function(){
var sel=JSON.parse(LS.getItem('wre_wdsel')||'{}');
var col=JSON.parse(LS.getItem('wre_wdcol')||'{}');
var keys=Object.keys(sel).filter(function(k){return k.indexOf('__')!==0&&sel[k];});
if(!keys.length)return;
var parts=keys.map(function(k){var c=col[k];return k+'：'+(c?c:'')+sel[k];});
if(sel['__diff__']) parts.push('难度：'+sel['__diff__']);
if(sel['__reward__']) parts.push('奖励：'+sel['__reward__']);
if(sel['__penalty__']) parts.push('失败惩罚：'+sel['__penalty__']);
cp(parts.join('\n'));
toast('已复制');
};

window.clearWd=function(){
LS.setItem('wre_wdsel','{}');
LS.setItem('wre_wdcol','{}');
init_wardrobe();
};

window.init_contacts=function(){
var data=JSON.parse(LS.getItem('wre_contacts')||'{"groups":{"默认":[]}}');
var body=document.getElementById('contactsBody');
var h='<input style="width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:7px;padding:5px 9px;font-size:11px;color:rgba(238,232,218,.9);outline:none;margin-bottom:6px" placeholder="搜索..." id="ctSch" oninput="init_contacts()">';
var q='';try{q=(document.getElementById('ctSch')||{}).value||'';}catch(x){}q=q.toLowerCase();
Object.keys(data.groups).forEach(function(g){
var items=data.groups[g].filter(function(c){return!q||c.name.toLowerCase().includes(q);});
if(!items.length&&q)return;
h+='<div style="font-size:10px;color:rgba(160,152,140,.6);letter-spacing:1.5px;margin:8px 0 4px">'+esc(g)+'</div>';
(q?items:data.groups[g]).forEach(function(c){
var idx=data.groups[g].indexOf(c);
h+='<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px;margin-bottom:3px;cursor:pointer" onclick="showCt(\''+g+'\','+idx+')">';
h+='<div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:12px;color:rgba(195,185,168,.68)">'+esc(c.name.charAt(0))+'</div>';
h+='<div style="flex:1;min-width:0"><div style="font-size:12px;color:rgba(238,232,218,.9)">'+esc(c.name)+'</div><div style="font-size:10px;color:rgba(160,152,140,.5);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(c.desc)+'</div></div>';
h+='<div style="font-size:11px;color:rgba(160,152,140,.5);padding:4px;cursor:pointer" onclick="event.stopPropagation();confirmDelCt(\''+g+'\','+idx+')">×</div></div>';
});
});
body.innerHTML=h;
};
window.showCt=function(g,i){var data=JSON.parse(LS.getItem('wre_contacts')||'{"groups":{"默认":[]}}');var c=data.groups[g][i];if(!c)return;var w=document.getElementById('ctDetailWrap');w.innerHTML='<div style="position:absolute;inset:0;background:rgba(14,12,20,.97);display:flex;flex-direction:column;z-index:10;overflow-y:auto"><div class="app-nav"><div class="app-back" onclick="closeCt()"><svg viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="rgba(255,255,255,.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="nav-title">'+esc(c.name)+'</div></div><div style="text-align:center;padding:14px"><div style="width:48px;height:48px;border-radius:50%;margin:0 auto 8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:16px;color:rgba(195,185,168,.68)">'+esc(c.name.charAt(0))+'</div><div style="font-size:14px;color:rgba(238,232,218,.9)">'+esc(c.name)+'</div><div style="font-size:11px;color:rgba(160,152,140,.5);margin-top:2px">'+esc(c.desc)+'</div></div><div style="padding:0 14px 14px"><div style="font-size:10px;color:rgba(160,152,140,.6);letter-spacing:1.5px;margin-bottom:5px">人设档案</div><textarea id="ctYamlEdit" style="width:100%;min-height:120px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:9px;font-family:var(--ffm);font-size:10px;color:rgba(195,185,168,.68);line-height:1.7;resize:vertical;outline:none">'+esc(c.yaml||'暂无')+'</textarea><div style="display:flex;gap:6px;margin-top:6px"><div style="flex:1;padding:7px;background:rgba(140,180,140,.06);border:1px solid rgba(140,180,140,.3);border-radius:7px;font-size:12px;color:rgba(140,180,140,.9);cursor:pointer;text-align:center" onclick="saveYaml(\''+g+'\','+i+')">保存</div><div style="flex:1;padding:7px;background:rgba(200,192,178,.08);border:1px solid rgba(200,192,178,.3);border-radius:7px;font-size:12px;color:var(--go);cursor:pointer;text-align:center" onclick="cpYaml()">复制</div></div></div></div>';};
window.closeCt=function(){document.getElementById('ctDetailWrap').innerHTML='';};
window.cpYaml=function(){var el=document.getElementById('ctYamlEdit');cp(el?el.value:'');toast('已复制');};
window.saveYaml=function(g,i){var el=document.getElementById('ctYamlEdit');if(!el)return;var data=JSON.parse(LS.getItem('wre_contacts')||'{"groups":{"默认":[]}}');if(data.groups[g]&&data.groups[g][i]){data.groups[g][i].yaml=el.value;LS.setItem('wre_contacts',JSON.stringify(data));toast('已保存');}};
window.openAddContact=function(){var w=document.getElementById('ctModalWrap');w.innerHTML='<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;z-index:20"><div style="width:100%;background:rgba(16,14,26,.96);border-radius:14px 14px 0 0;padding:14px"><div style="font-size:13px;color:rgba(238,232,218,.9);margin-bottom:8px">添加联系人</div><input style="width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:5px 9px;font-size:11px;color:rgba(238,232,218,.9);outline:none;margin-bottom:4px" placeholder="姓名*" id="ctNN"><input style="width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:5px 9px;font-size:11px;color:rgba(238,232,218,.9);outline:none;margin-bottom:4px" placeholder="描述" id="ctND"><input style="width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:5px 9px;font-size:11px;color:rgba(238,232,218,.9);outline:none;margin-bottom:6px" placeholder="分组(留空放默认)" id="ctNG"><div style="display:flex;gap:6px"><div style="flex:1;padding:6px;border-radius:6px;font-size:11px;text-align:center;cursor:pointer;border:1px solid rgba(255,255,255,.08);color:rgba(160,152,140,.6)" onclick="closeCtM()">取消</div><div style="flex:1;padding:6px;border-radius:6px;font-size:11px;text-align:center;cursor:pointer;border:1px solid rgba(140,180,140,.3);background:rgba(140,180,140,.06);color:rgba(140,180,140,.9)" onclick="saveCt()">添加</div></div></div></div>';};
window.closeCtM=function(){document.getElementById('ctModalWrap').innerHTML='';};
window.saveCt=function(){var nm=(document.getElementById('ctNN')||{}).value||'';nm=nm.trim();if(!nm)return;var desc=((document.getElementById('ctND')||{}).value||'').trim();var grp=((document.getElementById('ctNG')||{}).value||'').trim()||'默认';var data=JSON.parse(LS.getItem('wre_contacts')||'{"groups":{"默认":[]}}');if(!data.groups[grp])data.groups[grp]=[];data.groups[grp].push({name:nm,desc:desc,yaml:'name: '+nm+'\ndesc: '+desc});LS.setItem('wre_contacts',JSON.stringify(data));closeCtM();init_contacts();};
window.confirmDelCt=function(g,i){if(!confirm('确定删除？'))return;var data=JSON.parse(LS.getItem('wre_contacts')||'{"groups":{"默认":[]}}');data.groups[g].splice(i,1);LS.setItem('wre_contacts',JSON.stringify(data));init_contacts();};

window.init_food=function(){
var body=document.getElementById('foodBody');
var FD=window.FOOD_DATA;if(!FD){body.innerHTML='加载中...';return;}
var tab=LS.getItem('wre_foodtab')||'全部';
var h='<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:12px;text-align:center;margin-bottom:8px">';
h+='<div id="fRC" style="font-size:10px;color:rgba(160,152,140,.6);letter-spacing:1.5px;margin-bottom:3px">点击随机</div>';
h+='<div id="fRN" style="font-size:16px;color:rgba(238,232,218,.9);min-height:22px;margin-bottom:8px">—</div>';
h+='<div style="display:inline-block;padding:5px 14px;border-radius:14px;border:1px solid rgba(180,165,140,.3);background:rgba(180,165,140,.06);font-size:11px;color:rgba(195,180,145,.9);cursor:pointer" onclick="rollFd()">🎲 随机一道</div></div>';
var tabs=['全部'].concat(Object.keys(FD));
h+='<div style="display:flex;gap:3px;overflow-x:auto;padding-bottom:4px;margin-bottom:6px;-webkit-overflow-scrolling:touch">';
tabs.forEach(function(t){
h+='<div style="font-size:10px;padding:3px 7px;border-radius:8px;border:1px solid '+(t===tab?'rgba(180,165,140,.35)':'rgba(255,255,255,.07)')+';color:'+(t===tab?'rgba(195,180,145,.9)':'rgba(160,152,140,.5)')+';cursor:pointer;white-space:nowrap;flex-shrink:0" onclick="swFdTab(\''+t+'\')">'+t+'</div>';
});
h+='</div><div id="fList"></div>';
body.innerHTML=h;
renderFdList();
};
function renderFdList(){var el=document.getElementById('fList');if(!el)return;var FD=window.FOOD_DATA||{};var tab=LS.getItem('wre_foodtab')||'全部';var h='';if(tab==='全部'){Object.keys(FD).forEach(function(c){h+='<div style="font-size:10px;color:rgba(160,152,140,.5);letter-spacing:1px;margin:5px 0 2px">'+c+'</div><div style="display:flex;flex-wrap:wrap;gap:2px">';FD[c].slice(0,10).forEach(function(d){h+='<span style="font-size:10px;padding:2px 5px;border-radius:3px;border:1px solid rgba(255,255,255,.06);color:rgba(195,185,168,.68)">'+d+'</span>';});h+='</div>';});}else{var items=FD[tab]||[];h+='<div style="display:flex;flex-wrap:wrap;gap:2px">';items.forEach(function(d){h+='<span style="font-size:10px;padding:2px 5px;border-radius:3px;border:1px solid rgba(255,255,255,.06);color:rgba(195,185,168,.68)">'+d+'</span>';});h+='</div>';}el.innerHTML=h;}
window.swFdTab=function(t){LS.setItem('wre_foodtab',t);init_food();};
window.rollFd=function(){var FD=window.FOOD_DATA||{};var tab=LS.getItem('wre_foodtab')||'全部';var all=[];if(tab==='全部'){Object.keys(FD).forEach(function(c){FD[c].forEach(function(d){all.push({cuisine:c,dish:d});});});}else{(FD[tab]||[]).forEach(function(d){all.push({cuisine:tab,dish:d});});}if(!all.length)return;var pick=all[Math.floor(Math.random()*all.length)];document.getElementById('fRC').textContent=pick.cuisine;document.getElementById('fRN').textContent=pick.dish;};

window.init_cmd=function(){
var cmds=[
{cmd:'【朋友圈】',name:'朋友圈',desc:'查看角色动态，点赞评论互动'},
{cmd:'【论坛】',name:'论坛',desc:'快穿者论坛/AO3/微博 角色帖子'},
{cmd:'【商城】',name:'商城',desc:'查看并购买道具'},
{cmd:'【地图】',name:'地图',desc:'当前世界区域一览'},
{cmd:'【查询xx】',name:'NPC档案',desc:'查看角色信息摘要'},
{cmd:'【虚拟触摸】',name:'虚拟触摸',desc:'选择部位触发角色反应'},
{cmd:'【文风更换】',name:'更换文风',desc:'【文风更换为：文风名】'},
{cmd:'【私聊/群聊】',name:'私聊/群聊',desc:'古代自动变为书信/灵玉传音'},
{cmd:'【招募同伴】',name:'招募同伴',desc:'邀请NPC成为快穿者'},
{cmd:'【组队】',name:'组队申请',desc:'与其他快穿者一起进入世界'},
{cmd:'【退出世界】',name:'退出世界',desc:'结算任务并回到管理局'},
{cmd:'【背包回收】',name:'背包回收',desc:'贱卖道具换积分'},
{cmd:'【实力榜】',name:'榜单',desc:'实力榜/颜值榜'},
{cmd:'【...】',name:'无限指令',desc:'任何【】格式均为指令'}
];
var slashes=[
{cmd:'/rnd',desc:'随机触发恋爱/日常/脑洞事件'},
{cmd:'/drama',desc:'狗血剧本，身份错位反转剧情'},
{cmd:'/cmd',desc:'调教模型使其听话'},
{cmd:'/fix',desc:'修复UI错位与角色OOC'},
{cmd:'/update',desc:'强制同步最新协议'},
{cmd:'/sum',desc:'总结剧情，用于换挡'},
{cmd:'/auto',desc:'自动推进，/auto_no关闭'}
];
document.getElementById('cmdBody').innerHTML='<div style="font-size:11px;color:rgba(195,185,168,.68);line-height:1.6;margin-bottom:8px;padding:8px 10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px">使用 <span style="color:var(--go)">【任意内容】</span> 均为指令触发<br><span style="color:var(--go)">/斜线</span> 指令直接在聊天框输入</div><div style="font-size:10px;color:rgba(160,152,140,.6);letter-spacing:1.5px;margin:6px 0 4px">【】指令</div>'+cmds.map(function(c){return'<div style="display:flex;align-items:flex-start;gap:6px;padding:6px 8px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:7px;margin-bottom:3px"><span style="font-family:var(--ffm);font-size:10px;padding:2px 5px;border-radius:3px;background:rgba(200,192,178,.6);color:rgba(12,10,18,.85);flex-shrink:0;margin-top:1px">'+c.cmd+'</span><div style="flex:1"><div style="font-size:12px;color:rgba(238,232,218,.9)">'+c.name+'</div><div style="font-size:10px;color:rgba(160,152,140,.5)">'+c.desc+'</div></div></div>';}).join('')+'<div style="font-size:10px;color:rgba(160,152,140,.6);letter-spacing:1.5px;margin:10px 0 4px">/斜线指令</div>'+slashes.map(function(s){return'<div style="display:flex;align-items:center;gap:6px;padding:6px 8px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:7px;margin-bottom:3px"><span style="font-family:var(--ffm);font-size:10px;padding:2px 5px;border-radius:3px;background:rgba(128,195,165,.55);color:rgba(12,10,18,.85);flex-shrink:0">'+s.cmd+'</span><div style="flex:1;font-size:10px;color:rgba(195,185,168,.68)">'+s.desc+'</div></div>';}).join('');
};

window.init_bag=function(){
var bag=JSON.parse(LS.getItem('wre_bag')||'[{"name":"积分","amt":"170"},{"name":"属性点","amt":"0"}]');
var ledger=JSON.parse(LS.getItem('wre_ledger')||'[]');
var body=document.getElementById('bagBody');
var tab=LS.getItem('wre_bagtab')||'bag';
var h='<div style="display:flex;gap:4px;margin-bottom:8px">';
h+='<div style="flex:1;padding:4px;text-align:center;font-size:11px;border-radius:6px;border:1px solid '+(tab==='bag'?'rgba(155,150,170,.3)':'rgba(255,255,255,.07)')+';color:'+(tab==='bag'?'rgba(155,150,170,.9)':'rgba(160,152,140,.5)')+';cursor:pointer" onclick="swBagTab(\'bag\')">背包</div>';
h+='<div style="flex:1;padding:4px;text-align:center;font-size:11px;border-radius:6px;border:1px solid '+(tab==='ledger'?'rgba(155,150,170,.3)':'rgba(255,255,255,.07)')+';color:'+(tab==='ledger'?'rgba(155,150,170,.9)':'rgba(160,152,140,.5)')+';cursor:pointer" onclick="swBagTab(\'ledger\')">记账</div></div>';
if(tab==='bag'){
bag.forEach(function(b){
h+='<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:7px;margin-bottom:3px">';
h+='<span style="font-size:12px;color:rgba(238,232,218,.9)">'+esc(b.name)+'</span>';
h+='<span style="font-family:var(--ffm);font-size:12px;color:var(--go)">'+esc(b.amt)+'</span></div>';
});
}else{
// 按纪年分组
var groups={};
ledger.forEach(function(l){
var era=l.era||'未知纪年';
if(!groups[era]) groups[era]={items:[],inc:0,exp:0};
groups[era].items.push(l);
var n=parseInt(l.amt)||0;
if(l.type==='inc') groups[era].inc+=Math.abs(n);
else groups[era].exp+=Math.abs(n);
});
var eras=Object.keys(groups);
if(!eras.length){
h+='<div style="text-align:center;padding:20px;font-size:11px;color:rgba(160,152,140,.5)">暂无记录</div>';
}else{
eras.forEach(function(era){
var g=groups[era];
h+='<div style="margin-bottom:10px">';
h+='<div style="font-size:10px;color:rgba(160,152,140,.6);letter-spacing:1.5px;margin-bottom:4px;padding-bottom:3px;border-bottom:1px solid rgba(255,255,255,.05)">'+esc(era)+'</div>';
h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:6px">';
h+='<div style="padding:5px;border-radius:5px;text-align:center;background:rgba(140,180,140,.05);border:1px solid rgba(140,180,140,.12)">';
h+='<div style="font-size:9px;color:rgba(160,152,140,.5)">收入</div>';
h+='<div style="font-size:12px;color:rgba(140,180,140,.9)">+'+g.inc+'</div></div>';
h+='<div style="padding:5px;border-radius:5px;text-align:center;background:rgba(190,130,125,.05);border:1px solid rgba(190,130,125,.12)">';
h+='<div style="font-size:9px;color:rgba(160,152,140,.5)">支出</div>';
h+='<div style="font-size:12px;color:rgba(190,130,125,.9)">-'+g.exp+'</div></div></div>';
g.items.forEach(function(l){
h+='<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);border-radius:5px;margin-bottom:2px">';
h+='<div style="width:4px;height:4px;border-radius:50%;background:'+(l.type==='inc'?'rgba(140,180,140,.9)':'rgba(190,130,125,.9)')+'"></div>';
h+='<div style="flex:1;font-size:11px;color:rgba(238,232,218,.9)">'+esc(l.name)+'</div>';
h+='<div style="font-family:var(--ffm);font-size:10px;color:'+(l.type==='inc'?'rgba(140,180,140,.9)':'rgba(190,130,125,.9)')+'">'+esc(l.amt)+'</div>';
h+='<div style="font-size:9px;color:rgba(160,152,140,.4)">'+esc(l.time)+'</div></div>';
});
h+='</div>';
});
}
}
body.innerHTML=h;
};
window.swBagTab=function(t){LS.setItem('wre_bagtab',t);init_bag();};

window.init_style=function(){
var styles=[{n:'古风古韵',d:'古典白话为底，辞藻华丽对仗意境'},{n:'快意江湖',d:'刀光剑影写儿女情长'},{n:'仙道长歌',d:'仙气飘渺道法自然'},{n:'淡水幸福',d:'平实语言写最深感情'},{n:'酸涩虐恋',d:'刀子嵌在甜里'},{n:'晋江言情',d:'丰盛细腻节奏张弛有度'},{n:'潮湿岛屿',d:'黏腻温热暧昧欲望'},{n:'县城文学',d:'小镇青年困顿与挣扎'},{n:'霓虹冷硬',d:'都市丛林孤独猎人'},{n:'艳尸美学',d:'死亡与爱欲交缠'},{n:'颓靡华丽',d:'腐烂的玫瑰也是玫瑰'},{n:'地下独白',d:'密集撕裂的内心独白'},{n:'电影镜头',d:'长镜头特写切换'},{n:'荒诞现实',d:'人物在现实重压下变形'},{n:'失败哲人',d:'西伯利亚冻土疲惫观察者'},{n:'痞子浪漫',d:'语言调皮诗意与流氓并存'},{n:'忠诚狗狗',d:'像小狗一样友好忠诚超爱你'},{n:'物质崇拜',d:'剧情浮夸详标品牌质感'},{n:'轻松网文',d:'配角有脑爽但不无聊'},{n:'无脑爽文',d:'主角开挂装逼打脸'},{n:'日系轻小说',d:'中二病日常擅吐槽'}];
var cur=LS.getItem('wre_style_active')||'尚未设定';
document.getElementById('styleBody').innerHTML='<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px;text-align:center;margin-bottom:6px"><div style="font-size:10px;color:rgba(160,152,140,.6);letter-spacing:2px;margin-bottom:3px">当前文风</div><div style="font-size:14px;color:rgba(238,232,218,.9);font-weight:500">'+esc(cur)+'</div></div><div style="font-size:10px;color:rgba(210,145,138,.75);text-align:center;margin-bottom:8px;line-height:1.5;padding:6px 8px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:7px">更换文风请在聊天框输入<br><span style="color:var(--go)">【文风更换为：文风名】</span></div><div style="display:flex;flex-direction:column;gap:3px">'+styles.map(function(s){var isCur=cur===s.n;return'<div style="padding:7px 9px;background:'+(isCur?'rgba(200,192,178,.06)':'rgba(255,255,255,.03)')+';border:1px solid '+(isCur?'rgba(200,192,178,.25)':'rgba(255,255,255,.07)')+';border-radius:7px"><div style="font-size:12px;color:rgba(238,232,218,.9)">'+s.n+(isCur?' ← 当前':'')+'</div><div style="font-size:10px;color:rgba(160,152,140,.5);margin-top:1px">'+s.d+'</div></div>';}).join('')+'</div>';
};

window.init_icon=function(){
var icons=[
{id:'apple',label:'Apple',svg:'<path d="M15.5 8.5c0-1.5-1.2-2.5-2.5-2.5-.8 0-1.5.3-2 .8-.5-.5-1.2-.8-2-.8-1.3 0-2.5 1-2.5 2.5 0 3.5 4.5 7 4.5 7s4.5-3.5 4.5-7z" stroke="ST" stroke-width="1.2" fill="none" stroke-linejoin="round"/>'},
{id:'huawei',label:'华为',svg:'<ellipse cx="12" cy="12" rx="7" ry="7" stroke="ST" stroke-width="1.2" fill="none"/><path d="M12 5v4M9 7l1.5 3.5M15 7l-1.5 3.5M7 11l3.5 1.5M17 11l-3.5 1.5M9 17l1.5-3.5M15 17l-1.5-3.5M12 19v-4" stroke="ST" stroke-width=".8" stroke-linecap="round"/>'},
{id:'xiaomi',label:'小米',svg:'<rect x="6" y="6" width="12" height="12" rx="3" stroke="ST" stroke-width="1.2" fill="none"/><path d="M9 10v4M12 8v6M15 10v4" stroke="ST" stroke-width="1.2" stroke-linecap="round"/>'},
{id:'oppo',label:'OPPO',svg:'<circle cx="12" cy="12" r="7" stroke="ST" stroke-width="1.2" fill="none"/><circle cx="12" cy="12" r="3" stroke="ST" stroke-width="1" fill="none"/>'},
{id:'vivo',label:'vivo',svg:'<path d="M6 10l6 7 6-7" stroke="ST" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 8l3 3.5L15 8" stroke="ST" stroke-width="1" fill="none" stroke-linecap="round"/>'},
{id:'samsung',label:'三星',svg:'<ellipse cx="12" cy="12" rx="8" ry="4" stroke="ST" stroke-width="1.2" fill="none" transform="rotate(-30 12 12)"/><ellipse cx="12" cy="12" rx="8" ry="4" stroke="ST" stroke-width="1.2" fill="none" transform="rotate(30 12 12)"/><circle cx="12" cy="12" r="1.5" fill="ST"/>'},
{id:'sony',label:'索尼',svg:'<rect x="5" y="7" width="14" height="10" rx="2" stroke="ST" stroke-width="1.2" fill="none"/><circle cx="12" cy="12" r="3.5" stroke="ST" stroke-width="1" fill="none"/><circle cx="12" cy="12" r="1.2" fill="ST"/>'},
{id:'pixel',label:'Pixel',svg:'<rect x="7" y="4" width="10" height="16" rx="2" stroke="ST" stroke-width="1.2" fill="none"/><line x1="7" y1="8" x2="17" y2="8" stroke="ST" stroke-width="1"/><circle cx="12" cy="14" r="2.5" stroke="ST" stroke-width="1" fill="none"/>'},
{id:'cat',label:'小猫',svg:'<path d="M7 11l1-5h2l2 3 2-3h2l1 5" stroke="ST" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="12" cy="15.5" rx="5" ry="4" stroke="ST" stroke-width="1.2" fill="none"/><circle cx="10" cy="15" r=".7" fill="ST"/><circle cx="14" cy="15" r=".7" fill="ST"/>'},
{id:'dog',label:'小狗',svg:'<path d="M7 11c0-2.5 1.5-4 3-4h1l1 2 1-2h1c1.5 0 3 1.5 3 4" stroke="ST" stroke-width="1.2" fill="none" stroke-linecap="round"/><ellipse cx="12" cy="15.5" rx="5" ry="4" stroke="ST" stroke-width="1.2" fill="none"/><circle cx="10" cy="15" r=".7" fill="ST"/><circle cx="14" cy="15" r=".7" fill="ST"/>'},
{id:'rabbit',label:'小兔',svg:'<ellipse cx="12" cy="16" rx="5" ry="4.5" stroke="ST" stroke-width="1.2" fill="none"/><path d="M10 12V6c0-.8.5-1.5 1-1.5M14 12V6c0-.8-.5-1.5-1-1.5" stroke="ST" stroke-width="1.2" fill="none" stroke-linecap="round"/>'},
{id:'bear',label:'小熊',svg:'<circle cx="8.5" cy="8.5" r="2" stroke="ST" stroke-width="1.2" fill="none"/><circle cx="15.5" cy="8.5" r="2" stroke="ST" stroke-width="1.2" fill="none"/><circle cx="12" cy="14" r="5.5" stroke="ST" stroke-width="1.2" fill="none"/>'},
{id:'star',label:'星星',svg:'<path d="M12 4l2.2 4.5 5 .7-3.6 3.5.85 5L12 15.5 7.55 17.7l.85-5-3.6-3.5 5-.7z" stroke="ST" stroke-width="1.2" fill="none" stroke-linejoin="round"/>'},
{id:'moon',label:'月亮',svg:'<path d="M15 12a6 6 0 11-5-5.9A4.5 4.5 0 0015 12z" stroke="ST" stroke-width="1.2" fill="none"/>'},
{id:'heart',label:'爱心',svg:'<path d="M12 19s-7-4.5-7-8.5c0-2 1.5-3.5 3.5-3.5 1.2 0 2.3.6 3 1.5.7-.9 1.8-1.5 3-1.5 2 0 3.5 1.5 3.5 3.5 0 4-7 8.5-7 8.5z" stroke="ST" stroke-width="1.2" fill="none"/>'},
{id:'diamond',label:'钻石',svg:'<path d="M12 20L3 10l3-5h12l3 5z" stroke="ST" stroke-width="1.2" fill="none" stroke-linejoin="round"/><path d="M3 10h18M9 5l-2 5 5 10 5-10-2-5" stroke="ST" stroke-width=".8" fill="none" stroke-linejoin="round"/>'}
];
var cur=LS.getItem('wre_icon')||'apple';
var sc='rgba(200,192,178,.65)';
var h='<div style="font-size:10px;color:rgba(160,152,140,.6);letter-spacing:2px;margin-bottom:8px">选择悬浮球图标</div>';
h+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">';
for(var i=0;i<icons.length;i++){
var ic=icons[i];
var isCur=ic.id===cur;
h+='<div style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:7px 3px;border-radius:9px;';
h+='border:1px solid '+(isCur?'rgba(200,192,178,.3)':'rgba(255,255,255,.07)')+';';
h+='background:'+(isCur?'rgba(200,192,178,.05)':'transparent')+';';
h+='cursor:pointer" onclick="pickIcon(\''+ic.id+'\')">';
h+='<svg viewBox="0 0 24 24" width="24" height="24">';
h+=ic.svg.replace(/ST/g,sc);
h+='</svg>';
h+='<span style="font-size:9px;color:rgba(195,185,168,.68)">'+ic.label+'</span>';
h+='</div>';
}
h+='</div>';
document.getElementById('iconBody').innerHTML=h;
};

window.pickIcon=function(id){
LS.setItem('wre_icon',id);
var sc2='rgba(200,192,178,.75)';
var allIcons={
apple:'<path d="M15.5 8.5c0-1.5-1.2-2.5-2.5-2.5-.8 0-1.5.3-2 .8-.5-.5-1.2-.8-2-.8-1.3 0-2.5 1-2.5 2.5 0 3.5 4.5 7 4.5 7s4.5-3.5 4.5-7z" stroke="'+sc2+'" stroke-width="1.2" fill="none" stroke-linejoin="round"/>',
huawei:'<ellipse cx="12" cy="12" rx="7" ry="7" stroke="'+sc2+'" stroke-width="1.2" fill="none"/><path d="M12 5v4M9 7l1.5 3.5M15 7l-1.5 3.5M7 11l3.5 1.5M17 11l-3.5 1.5M9 17l1.5-3.5M15 17l-1.5-3.5M12 19v-4" stroke="'+sc2+'" stroke-width=".8" stroke-linecap="round"/>',
xiaomi:'<rect x="6" y="6" width="12" height="12" rx="3" stroke="'+sc2+'" stroke-width="1.2" fill="none"/><path d="M9 10v4M12 8v6M15 10v4" stroke="'+sc2+'" stroke-width="1.2" stroke-linecap="round"/>',
oppo:'<circle cx="12" cy="12" r="7" stroke="'+sc2+'" stroke-width="1.2" fill="none"/><circle cx="12" cy="12" r="3" stroke="'+sc2+'" stroke-width="1" fill="none"/>',
vivo:'<path d="M6 10l6 7 6-7" stroke="'+sc2+'" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 8l3 3.5L15 8" stroke="'+sc2+'" stroke-width="1" fill="none" stroke-linecap="round"/>',
samsung:'<ellipse cx="12" cy="12" rx="8" ry="4" stroke="'+sc2+'" stroke-width="1.2" fill="none" transform="rotate(-30 12 12)"/><ellipse cx="12" cy="12" rx="8" ry="4" stroke="'+sc2+'" stroke-width="1.2" fill="none" transform="rotate(30 12 12)"/><circle cx="12" cy="12" r="1.5" fill="'+sc2+'"/>',
sony:'<rect x="5" y="7" width="14" height="10" rx="2" stroke="'+sc2+'" stroke-width="1.2" fill="none"/><circle cx="12" cy="12" r="3.5" stroke="'+sc2+'" stroke-width="1" fill="none"/><circle cx="12" cy="12" r="1.2" fill="'+sc2+'"/>',
pixel:'<rect x="7" y="4" width="10" height="16" rx="2" stroke="'+sc2+'" stroke-width="1.2" fill="none"/><line x1="7" y1="8" x2="17" y2="8" stroke="'+sc2+'" stroke-width="1"/><circle cx="12" cy="14" r="2.5" stroke="'+sc2+'" stroke-width="1" fill="none"/>',
cat:'<path d="M7 11l1-5h2l2 3 2-3h2l1 5" stroke="'+sc2+'" stroke-width="1.2" fill="none"/><ellipse cx="12" cy="15.5" rx="5" ry="4" stroke="'+sc2+'" stroke-width="1.2" fill="none"/>',
dog:'<path d="M7 11c0-2.5 1.5-4 3-4h1l1 2 1-2h1c1.5 0 3 1.5 3 4" stroke="'+sc2+'" stroke-width="1.2" fill="none"/><ellipse cx="12" cy="15.5" rx="5" ry="4" stroke="'+sc2+'" stroke-width="1.2" fill="none"/>',
rabbit:'<ellipse cx="12" cy="16" rx="5" ry="4.5" stroke="'+sc2+'" stroke-width="1.2" fill="none"/><path d="M10 12V6c0-.8.5-1.5 1-1.5M14 12V6c0-.8-.5-1.5-1-1.5" stroke="'+sc2+'" stroke-width="1.2" fill="none"/>',
bear:'<circle cx="8.5" cy="8.5" r="2" stroke="'+sc2+'" stroke-width="1.2" fill="none"/><circle cx="15.5" cy="8.5" r="2" stroke="'+sc2+'" stroke-width="1.2" fill="none"/><circle cx="12" cy="14" r="5.5" stroke="'+sc2+'" stroke-width="1.2" fill="none"/>',
star:'<path d="M12 4l2.2 4.5 5 .7-3.6 3.5.85 5L12 15.5 7.55 17.7l.85-5-3.6-3.5 5-.7z" stroke="'+sc2+'" stroke-width="1.2" fill="none" stroke-linejoin="round"/>',
moon:'<path d="M15 12a6 6 0 11-5-5.9A4.5 4.5 0 0015 12z" stroke="'+sc2+'" stroke-width="1.2" fill="none"/>',
heart:'<path d="M12 19s-7-4.5-7-8.5c0-2 1.5-3.5 3.5-3.5 1.2 0 2.3.6 3 1.5.7-.9 1.8-1.5 3-1.5 2 0 3.5 1.5 3.5 3.5 0 4-7 8.5-7 8.5z" stroke="'+sc2+'" stroke-width="1.2" fill="none"/>',
diamond:'<path d="M12 20L3 10l3-5h12l3 5z" stroke="'+sc2+'" stroke-width="1.2" fill="none" stroke-linejoin="round"/><path d="M3 10h18M9 5l-2 5 5 10 5-10-2-5" stroke="'+sc2+'" stroke-width=".8" fill="none" stroke-linejoin="round"/>'
};
var svg=allIcons[id]||allIcons.apple;
var orbSvg='<svg viewBox="0 0 24 24" width="22" height="22">'+svg+'</svg>';
document.getElementById('orbBtn').innerHTML=orbSvg;
LS.setItem('wre_icon_svg',JSON.stringify(orbSvg));
init_icon();
toast('图标已更换');
};

window.init_achieve=function(){
var achs=JSON.parse(LS.getItem('wre_achv')||'[]');
var body=document.getElementById('achieveBody');
if(!achs.length){body.innerHTML='<div style="text-align:center;padding:20px;font-size:12px;color:rgba(160,152,140,.5)">尚未解锁任何成就</div>';return;}
// 按纪年分组
var groups={};
achs.forEach(function(a){
var era=a.era||'未知纪年';
if(!groups[era]) groups[era]=[];
groups[era].push(a);
});
var h='';
Object.keys(groups).forEach(function(era){
h+='<div style="font-size:10px;color:rgba(160,152,140,.6);letter-spacing:1.5px;margin:8px 0 4px;padding-bottom:3px;border-bottom:1px solid rgba(255,255,255,.05)">'+esc(era)+'</div>';
groups[era].forEach(function(a){
h+='<div style="padding:7px 9px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px;margin-bottom:4px">';
h+='<div style="display:flex;align-items:center;gap:5px;margin-bottom:2px">';
h+='<span style="font-size:14px">'+esc(a.badge)+'</span>';
h+='<span style="font-size:12px;color:rgba(238,232,218,.9);font-weight:500;flex:1">'+esc(a.name)+'</span>';
h+='<span style="font-family:var(--ffm);font-size:10px;color:rgba(160,152,140,.5)">'+esc(a.time)+'</span></div>';
h+='<div style="font-size:11px;color:rgba(160,152,140,.5);line-height:1.4">'+esc(a.desc)+'</div></div>';
});
});
body.innerHTML=h;
};

})();
