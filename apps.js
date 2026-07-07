(function(){
var LS=localStorage;
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function toast(m){var t=document.getElementById('T');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show')},2000)}
function cp(t){try{navigator.clipboard.writeText(t)}catch(x){var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();document.execCommand('copy');document.body.removeChild(a)}}

window.init_settings=function(){
var body=document.getElementById('settingsBody');
var presets=['#c8c0b2','#b49b8c','#91a59b','#b4a58c','#919bb3','#9b96aa','#96aab3','#aa9f9b','#a59b91','#788c78','#be827d','#829abe','#a591b9','#c8b491','#91b4aa','#b28c8c'];
var cc=LS.getItem('wre_color')||'#c8c0b2';
var cb=parseInt(LS.getItem('wre_blur')||'22');
var cf=parseInt(LS.getItem('wre_fs')||'14');
body.innerHTML='<div style="font-size:.55em;color:var(--td);letter-spacing:2px;margin-bottom:5px">状态栏颜色</div><div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;margin-bottom:8px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><input type="color" id="cpick" value="'+cc+'" style="width:30px;height:30px;border-radius:6px;border:1px solid rgba(255,255,255,.1);cursor:pointer;background:transparent;padding:0"><span id="chex" style="font-family:var(--ffm);font-size:.6em;color:var(--ts)">'+cc+'</span></div><div id="presetRow" style="display:flex;gap:4px;overflow-x:auto;padding:2px 0"></div></div><div style="font-size:.55em;color:var(--td);letter-spacing:2px;margin-bottom:5px">字体颜色</div><div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;margin-bottom:8px"><div id="fcRow" style="display:flex;gap:4px;overflow-x:auto;padding:2px 0"></div></div><div style="font-size:.55em;color:var(--td);letter-spacing:2px;margin-bottom:5px">模糊度</div><div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;margin-bottom:8px"><div style="display:flex;align-items:center;gap:6px"><input type="range" min="0" max="40" value="'+cb+'" id="blurS" oninput="updBlur()" style="-webkit-appearance:none;flex:1;height:2px;border-radius:1px;background:rgba(255,255,255,.12);outline:none"><span id="blurV" style="font-family:var(--ffm);font-size:.55em;color:var(--td)">'+cb+'px</span></div></div><div style="font-size:.55em;color:var(--td);letter-spacing:2px;margin-bottom:5px">字号</div><div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;margin-bottom:8px"><div style="display:flex;align-items:center;gap:8px"><button onclick="chgFs(-1)" style="width:24px;height:24px;border-radius:6px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);color:var(--tp);cursor:pointer;font-size:.8em">-</button><span id="fsV" style="font-family:var(--ffm);font-size:.65em;color:var(--tp);min-width:32px;text-align:center">'+cf+'px</span><button onclick="chgFs(1)" style="width:24px;height:24px;border-radius:6px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);color:var(--tp);cursor:pointer;font-size:.8em">+</button></div></div><div style="font-size:.55em;color:var(--td);letter-spacing:2px;margin-bottom:5px">预览</div><div id="prevBox" style="border-radius:8px;border:1px solid rgba(255,255,255,.08);padding:10px;margin-bottom:8px;position:relative;overflow:hidden;min-height:50px"><div id="prevBg" style="position:absolute;inset:0;background:rgba(16,14,22,.55);backdrop-filter:blur('+cb+'px)"></div><div style="position:relative;z-index:1"><span id="prevT" style="font-size:.78em">正文预览效果</span><br><span id="prevTag" style="font-size:.6em;padding:1px 5px;border-radius:4px;border:1px solid;display:inline-block;margin-top:4px">状态栏标签</span><br><span style="font-size:.55em;color:var(--td);margin-top:2px;display:inline-block">模糊度: '+cb+'px</span></div></div><div style="font-size:.55em;color:var(--td);letter-spacing:2px;margin-bottom:5px">壁纸</div><div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px 12px"><div id="wpPrev" onclick="document.getElementById(\'wpInp\').click()" style="width:100%;height:55px;border-radius:6px;border:1px dashed rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative"><span style="font-size:.58em;color:var(--td)">点击导入壁纸</span></div><input type="file" accept="image/*" id="wpInp" style="display:none" onchange="loadWp(this)"><div style="font-size:.48em;color:var(--td);margin-top:4px;text-align:center;line-height:1.4">请在小懿界面中将不透明度调至100%</div></div>';
var pr=document.getElementById('presetRow');
presets.forEach(function(c){var d=document.createElement('div');d.style.cssText='width:18px;height:18px;border-radius:50%;cursor:pointer;flex-shrink:0;border:2px solid '+(c===cc?'rgba(255,255,255,.6)':'transparent')+';background:'+c;d.onclick=function(){document.getElementById('cpick').value=c;applyC(c);pr.querySelectorAll('div').forEach(function(x){x.style.borderColor='transparent'});d.style.borderColor='rgba(255,255,255,.6)';};pr.appendChild(d);});
document.getElementById('cpick').oninput=function(){applyC(this.value)};
var fcPresets=[{c:'rgba(240,235,222,.91)',n:'暖白'},{c:'rgba(255,255,255,.92)',n:'纯白'},{c:'rgba(245,240,230,.9)',n:'象牙'},{c:'rgba(220,215,200,.85)',n:'宣纸'},{c:'rgba(200,195,180,.8)',n:'麻色'},{c:'rgba(180,175,165,.75)',n:'烟灰'},{c:'rgba(140,138,135,.7)',n:'深灰'},{c:'rgba(100,98,95,.85)',n:'炭灰'},{c:'rgba(60,58,55,.9)',n:'墨色'},{c:'rgba(35,33,30,.92)',n:'近黑'},{c:'rgba(15,13,10,.95)',n:'纯黑'},{c:'rgba(80,70,55,.85)',n:'深棕'},{c:'rgba(55,65,60,.85)',n:'墨绿'},{c:'rgba(50,55,70,.85)',n:'藏蓝'}];
var curFc=LS.getItem('wre_fc')||'rgba(240,235,222,.91)';
var fcRow=document.getElementById('fcRow');
fcPresets.forEach(function(f){var d=document.createElement('div');d.style.cssText='width:18px;height:18px;border-radius:50%;cursor:pointer;flex-shrink:0;border:2px solid '+(f.c===curFc?'rgba(255,255,255,.6)':'transparent')+';background:'+f.c;d.title=f.n;d.onclick=function(){LS.setItem('wre_fc',f.c);document.documentElement.style.setProperty('--fc',f.c);fcRow.querySelectorAll('div').forEach(function(x){x.style.borderColor='transparent'});d.style.borderColor='rgba(255,255,255,.6)';updPreview();};fcRow.appendChild(d);});
var wp=LS.getItem('wre_wp');if(wp)document.getElementById('wpPrev').innerHTML='<img src="'+wp+'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">';
updPreview();
};
function hexToRgba(hex,a){var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return'rgba('+r+','+g+','+b+','+a+')';}
function updPreview(){var c=LS.getItem('wre_color')||'#c8c0b2';var fc=LS.getItem('wre_fc')||'rgba(240,235,222,.91)';var pt=document.getElementById('prevT');var ptag=document.getElementById('prevTag');if(pt){pt.style.color=fc;pt.textContent='正文预览 · 当前字体颜色';}if(ptag){ptag.style.color=c;ptag.style.borderColor=hexToRgba(c,.3);}}
window.applyC=function(c){LS.setItem('wre_color',c);document.getElementById('chex').textContent=c;document.documentElement.style.setProperty('--go',hexToRgba(c,.88));document.documentElement.style.setProperty('--gd',hexToRgba(c,.35));updPreview();};
window.updBlur=function(){var v=document.getElementById('blurS').value;document.getElementById('blurV').textContent=v+'px';LS.setItem('wre_blur',v);var bg=document.getElementById('prevBg');if(bg){bg.style.backdropFilter='blur('+v+'px)';bg.style.webkitBackdropFilter='blur('+v+'px)';}};
window.chgFs=function(d){var f=parseInt(LS.getItem('wre_fs')||'14');f=Math.max(11,Math.min(18,f+d));LS.setItem('wre_fs',String(f));document.getElementById('fsV').textContent=f+'px';document.documentElement.style.fontSize=f+'px';};
window.loadWp=function(inp){var f=inp.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){try{LS.setItem('wre_wp',e.target.result)}catch(x){}document.getElementById('wpPrev').innerHTML='<img src="'+e.target.result+'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">';};r.readAsDataURL(f);};

window.init_wardrobe=function(){
var body=document.getElementById('wardrobeBody');
var tab=LS.getItem('wre_wdtab')||'古风';
var sel=JSON.parse(LS.getItem('wre_wdsel')||'{}');
var col=JSON.parse(LS.getItem('wre_wdcol')||'{}');
var WD=window.WD_DATA;if(!WD){body.innerHTML='加载中...';return;}
var slots=WD[tab];if(!slots){body.innerHTML='无数据';return;}
var h='<div style="display:flex;gap:4px;margin-bottom:8px">';
Object.keys(WD).forEach(function(t){h+='<div style="flex:1;padding:4px;text-align:center;font-size:.58em;border-radius:6px;border:1px solid '+(t===tab?'rgba(200,192,178,.3)':'rgba(255,255,255,.07)')+';color:'+(t===tab?'var(--go)':'var(--td)')+';cursor:pointer" onclick="swWdTab(\''+t+'\')">'+t+'</div>';});
h+='</div><div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:6px 10px">';
Object.keys(slots).forEach(function(slot){
var sv=sel[slot]||'';var cv=col[slot]||'';
h+='<div style="display:flex;align-items:center;gap:4px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04)">';
h+='<span style="font-size:.52em;color:var(--td);width:26px;flex-shrink:0;text-align:right">'+slot+'</span>';
h+='<span style="padding:2px 5px;border-radius:4px;border:1px solid rgba(255,255,255,.08);font-size:.5em;color:var(--ts);min-width:32px;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(cv||'颜色')+'</span>';
h+='<span style="font-size:.65em;cursor:pointer" onclick="rollWdCol(\''+slot+'\')">🎲</span>';
h+='<span style="padding:2px 5px;border-radius:4px;border:1px solid rgba(255,255,255,.08);font-size:.5em;color:'+(sv?'var(--tp)':'var(--td)')+';flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(sv||'款式')+'</span>';
h+='<span style="font-size:.65em;cursor:pointer" onclick="rollWdName(\''+slot+'\')">🎲</span>';
h+='</div>';
});
h+='</div>';
var preview=Object.keys(sel).length?Object.keys(sel).map(function(k){return k+'~'+(col[k]||'')+sel[k];}).join(','):'尚未选择';
h+='<div style="margin-top:8px;font-size:.55em;color:var(--ts);line-height:1.5;min-height:14px">'+esc(preview)+'</div><div style="margin-top:6px;width:100%;padding:7px;background:rgba(200,192,178,.08);border:1px solid rgba(200,192,178,.3);border-radius:8px;font-size:.68em;color:var(--go);cursor:pointer;text-align:center" onclick="copyWd()">一键复制</div>';
body.innerHTML=h;
};
window.swWdTab=function(t){LS.setItem('wre_wdtab',t);LS.setItem('wre_wdsel','{}');LS.setItem('wre_wdcol','{}');init_wardrobe();};
window.rollWdCol=function(slot){var colors=window.WD_COLORS||['白','黑','灰','蓝','红'];var c=colors[Math.floor(Math.random()*colors.length)];var col=JSON.parse(LS.getItem('wre_wdcol')||'{}');col[slot]=c;LS.setItem('wre_wdcol',JSON.stringify(col));init_wardrobe();};
window.rollWdName=function(slot){var tab=LS.getItem('wre_wdtab')||'古风';var WD=window.WD_DATA;if(!WD||!WD[tab])return;var items=WD[tab][slot];if(!items)return;var pick=items[Math.floor(Math.random()*items.length)];var sel=JSON.parse(LS.getItem('wre_wdsel')||'{}');sel[slot]=pick;LS.setItem('wre_wdsel',JSON.stringify(sel));init_wardrobe();};
window.copyWd=function(){var sel=JSON.parse(LS.getItem('wre_wdsel')||'{}');var col=JSON.parse(LS.getItem('wre_wdcol')||'{}');var keys=Object.keys(sel);if(!keys.length)return;cp(keys.map(function(k){return k+'~'+(col[k]||'')+sel[k];}).join(','));toast('已复制');};

window.init_contacts=function(){
var data=JSON.parse(LS.getItem('wre_contacts')||'{"groups":{"默认":[]}}');
var body=document.getElementById('contactsBody');
var h='<input style="width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:7px;padding:5px 9px;font-size:.62em;color:var(--tp);outline:none;margin-bottom:6px" placeholder="搜索..." id="ctSch" oninput="init_contacts()">';
var q='';try{q=(document.getElementById('ctSch')||{}).value||''}catch(x){}q=q.toLowerCase();
Object.keys(data.groups).forEach(function(g){
var items=data.groups[g].filter(function(c){return!q||c.name.toLowerCase().includes(q);});
if(!items.length&&q)return;
h+='<div style="font-size:.5em;color:var(--td);letter-spacing:1.5px;margin:8px 0 4px">'+esc(g)+'</div>';
(q?items:data.groups[g]).forEach(function(c){var idx=data.groups[g].indexOf(c);
h+='<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px;margin-bottom:3px;cursor:pointer" onclick="showCt(\''+g+'\','+idx+')"><div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:.72em;color:var(--ts)">'+esc(c.name.charAt(0))+'</div><div style="flex:1;min-width:0"><div style="font-size:.68em;color:var(--tp)">'+esc(c.name)+'</div><div style="font-size:.5em;color:var(--td);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(c.desc)+'</div></div><div style="font-size:.55em;color:var(--td);padding:4px;cursor:pointer" onclick="event.stopPropagation();confirmDelCt(\''+g+'\','+idx+')">×</div></div>';
});});
body.innerHTML=h;
};
window.showCt=function(g,i){var data=JSON.parse(LS.getItem('wre_contacts')||'{"groups":{"默认":[]}}');var c=data.groups[g][i];if(!c)return;var w=document.getElementById('ctDetailWrap');w.innerHTML='<div style="position:absolute;inset:0;background:rgba(14,12,20,.97);display:flex;flex-direction:column;z-index:10;overflow-y:auto"><div class="app-nav"><div class="app-back" onclick="closeCt()"><svg viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="rgba(255,255,255,.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="nav-title">'+esc(c.name)+'</div></div><div style="text-align:center;padding:14px"><div style="width:48px;height:48px;border-radius:50%;margin:0 auto 8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:1.1em;color:var(--ts)">'+esc(c.name.charAt(0))+'</div><div style="font-size:.85em;color:var(--tp)">'+esc(c.name)+'</div><div style="font-size:.55em;color:var(--td);margin-top:2px">'+esc(c.desc)+'</div></div><div style="padding:0 14px 14px"><div style="font-size:.5em;color:var(--td);letter-spacing:1.5px;margin-bottom:5px">YAML</div><div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:9px;font-family:var(--ffm);font-size:.52em;color:var(--ts);line-height:1.7;white-space:pre-wrap;margin-bottom:8px">'+esc(c.yaml||'暂无')+'</div><div style="width:100%;padding:7px;background:rgba(200,192,178,.08);border:1px solid rgba(200,192,178,.3);border-radius:7px;font-size:.68em;color:var(--go);cursor:pointer;text-align:center" onclick="cpYaml()">复制人设</div></div></div>';window._yaml=c.yaml||'';};
window.closeCt=function(){document.getElementById('ctDetailWrap').innerHTML='';};
window.cpYaml=function(){cp(window._yaml||'');toast('已复制');};
window.openAddContact=function(){var w=document.getElementById('ctModalWrap');w.innerHTML='<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;z-index:20"><div style="width:100%;background:rgba(16,14,26,.96);border-radius:14px 14px 0 0;padding:14px"><div style="font-size:.75em;color:var(--tp);margin-bottom:8px">添加联系人</div><input style="width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:5px 9px;font-size:.62em;color:var(--tp);outline:none;margin-bottom:4px" placeholder="姓名*" id="ctNN"><input style="width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:5px 9px;font-size:.62em;color:var(--tp);outline:none;margin-bottom:4px" placeholder="描述" id="ctND"><input style="width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:5px 9px;font-size:.62em;color:var(--tp);outline:none;margin-bottom:6px" placeholder="分组(留空放默认)" id="ctNG"><div style="display:flex;gap:6px"><div style="flex:1;padding:6px;border-radius:6px;font-size:.62em;text-align:center;cursor:pointer;border:1px solid rgba(255,255,255,.08);color:var(--td)" onclick="closeCtM()">取消</div><div style="flex:1;padding:6px;border-radius:6px;font-size:.62em;text-align:center;cursor:pointer;border:1px solid rgba(140,180,140,.3);background:rgba(140,180,140,.06);color:rgba(140,180,140,.9)" onclick="saveCt()">添加</div></div></div></div>';};
window.closeCtM=function(){document.getElementById('ctModalWrap').innerHTML='';};
window.saveCt=function(){var nm=(document.getElementById('ctNN')||{}).value||'';nm=nm.trim();if(!nm)return;var desc=((document.getElementById('ctND')||{}).value||'').trim();var grp=((document.getElementById('ctNG')||{}).value||'').trim()||'默认';var data=JSON.parse(LS.getItem('wre_contacts')||'{"groups":{"默认":[]}}');if(!data.groups[grp])data.groups[grp]=[];data.groups[grp].push({name:nm,desc:desc,yaml:'name: '+nm+'\ndesc: '+desc});LS.setItem('wre_contacts',JSON.stringify(data));closeCtM();init_contacts();};
window.confirmDelCt=function(g,i){if(!confirm('确定删除？'))return;var data=JSON.parse(LS.getItem('wre_contacts')||'{"groups":{"默认":[]}}');data.groups[g].splice(i,1);LS.setItem('wre_contacts',JSON.stringify(data));init_contacts();};

window.init_food=function(){
var body=document.getElementById('foodBody');
var FD=window.FOOD_DATA;if(!FD){body.innerHTML='加载中...';return;}
var tab=LS.getItem('wre_foodtab')||'全部';
var h='<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:12px;text-align:center;margin-bottom:8px"><div id="fRC" style="font-size:.5em;color:var(--td);letter-spacing:1.5px;margin-bottom:3px">点击随机</div><div id="fRN" style="font-size:1em;color:var(--tp);min-height:22px;margin-bottom:8px">—</div><div style="display:inline-block;padding:5px 14px;border-radius:14px;border:1px solid rgba(180,165,140,.3);background:rgba(180,165,140,.06);font-size:.62em;color:rgba(195,180,145,.9);cursor:pointer" onclick="rollFd()">🎲 随机一道</div></div>';
var tabs=['全部'].concat(Object.keys(FD));
h+='<div style="display:flex;gap:3px;overflow-x:auto;padding-bottom:4px;margin-bottom:6px">';
tabs.forEach(function(t){h+='<div style="font-size:.5em;padding:3px 7px;border-radius:8px;border:1px solid '+(t===tab?'rgba(180,165,140,.35)':'rgba(255,255,255,.07)')+';color:'+(t===tab?'rgba(195,180,145,.9)':'var(--td)')+';cursor:pointer;white-space:nowrap;flex-shrink:0" onclick="swFdTab(\''+t+'\')">'+t+'</div>';});
h+='</div><div id="fList"></div>';
body.innerHTML=h;
renderFdList();
};
function renderFdList(){var el=document.getElementById('fList');if(!el)return;var FD=window.FOOD_DATA||{};var tab=LS.getItem('wre_foodtab')||'全部';var h='';if(tab==='全部'){Object.keys(FD).forEach(function(c){h+='<div style="font-size:.48em;color:var(--td);letter-spacing:1px;margin:5px 0 2px">'+c+'</div><div style="display:flex;flex-wrap:wrap;gap:2px">';FD[c].slice(0,10).forEach(function(d){h+='<span style="font-size:.52em;padding:2px 5px;border-radius:3px;border:1px solid rgba(255,255,255,.06);color:var(--ts)">'+d+'</span>';});h+='</div>';});}else{var items=FD[tab]||[];h+='<div style="display:flex;flex-wrap:wrap;gap:2px">';items.forEach(function(d){h+='<span style="font-size:.52em;padding:2px 5px;border-radius:3px;border:1px solid rgba(255,255,255,.06);color:var(--ts)">'+d+'</span>';});h+='</div>';}el.innerHTML=h;}
window.swFdTab=function(t){LS.setItem('wre_foodtab',t);init_food();};
window.rollFd=function(){var FD=window.FOOD_DATA||{};var all=[];Object.keys(FD).forEach(function(c){FD[c].forEach(function(d){all.push({cuisine:c,dish:d});});});if(!all.length)return;var pick=all[Math.floor(Math.random()*all.length)];document.getElementById('fRC').textContent=pick.cuisine;document.getElementById('fRN').textContent=pick.dish;};

window.init_cmd=function(){
var cmds=[
{cmd:'/rnd',name:'随机事件',desc:'随机触发恋爱/日常/脑洞事件'},
{cmd:'/drama',name:'狗血剧本',desc:'身份错位/记忆错位反转剧情'},
{cmd:'/cmd',name:'调教模型',desc:'自然语言调整AI叙事风格'},
{cmd:'/fix',name:'修复',desc:'修复界面错位或角色出戏'},
{cmd:'/update',name:'同步协议',desc:'自动同步最新系统规则'},
{cmd:'/sum',name:'总结剧情',desc:'生成详细剧情存档用于换挡'},
{cmd:'/auto',name:'自动推进',desc:'AI接管推进 /auto_no关闭'},
{cmd:'【商城】',name:'商城',desc:'查看并购买道具'},
{cmd:'【地图】',name:'地图',desc:'当前世界区域一览'},
{cmd:'【查询xx】',name:'NPC档案',desc:'查看角色信息'},
{cmd:'【朋友圈】',name:'朋友圈',desc:'角色动态与评论'},
{cmd:'【虚拟触摸】',name:'虚拟触摸',desc:'选择部位触发角色反应'},
{cmd:'【文风更换】',name:'更换文风',desc:'【文风更换为：文风名】'},
{cmd:'【退出世界】',name:'退出/进入',desc:'离开或进入世界'}
];
document.getElementById('cmdBody').innerHTML='<div style="font-size:.6em;color:var(--ts);line-height:1.5;margin-bottom:8px;padding:8px 10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px">所有 <span style="color:var(--go)">【】</span> 格式均为指令触发。<span style="color:var(--go)">/斜线</span> 指令直接输入即可。</div>'+cmds.map(function(c){return'<div style="display:flex;align-items:flex-start;gap:6px;padding:6px 8px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:7px;margin-bottom:3px"><span style="font-family:var(--ffm);font-size:.5em;padding:2px 5px;border-radius:3px;background:rgba(200,192,178,.6);color:rgba(12,10,18,.85);flex-shrink:0;margin-top:1px">'+c.cmd+'</span><div style="flex:1"><div style="font-size:.65em;color:var(--tp)">'+c.name+'</div><div style="font-size:.5em;color:var(--td)">'+c.desc+'</div></div></div>';}).join('');
};

window.init_bag=function(){
var bag=JSON.parse(LS.getItem('wre_bag')||'[{"name":"积分","amt":"170"},{"name":"属性点","amt":"0"}]');
var ledger=JSON.parse(LS.getItem('wre_ledger')||'[{"type":"inc","name":"开局初始","time":"09:00","amt":"+170"}]');
var body=document.getElementById('bagBody');
var tab=LS.getItem('wre_bagtab')||'bag';
var h='<div style="display:flex;gap:4px;margin-bottom:8px"><div style="flex:1;padding:4px;text-align:center;font-size:.58em;border-radius:6px;border:1px solid '+(tab==='bag'?'rgba(155,150,170,.3)':'rgba(255,255,255,.07)')+';color:'+(tab==='bag'?'rgba(155,150,170,.9)':'var(--td)')+';cursor:pointer" onclick="swBagTab(\'bag\')">背包</div><div style="flex:1;padding:4px;text-align:center;font-size:.58em;border-radius:6px;border:1px solid '+(tab==='ledger'?'rgba(155,150,170,.3)':'rgba(255,255,255,.07)')+';color:'+(tab==='ledger'?'rgba(155,150,170,.9)':'var(--td)')+';cursor:pointer" onclick="swBagTab(\'ledger\')">记账</div></div>';
if(tab==='bag'){
bag.forEach(function(b){h+='<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:7px;margin-bottom:3px"><span style="font-size:.68em;color:var(--tp)">'+esc(b.name)+'</span><span style="font-family:var(--ffm);font-size:.65em;color:var(--go)">'+esc(b.amt)+'</span></div>';});
}else{
var ti=0,te=0;ledger.forEach(function(l){var n=parseInt(l.amt)||0;if(l.type==='inc')ti+=Math.abs(n);else te+=Math.abs(n);});
h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px"><div style="padding:7px;border-radius:7px;text-align:center;background:rgba(140,180,140,.05);border:1px solid rgba(140,180,140,.15)"><div style="font-size:.48em;color:var(--td)">收入</div><div style="font-size:.78em;color:rgba(140,180,140,.9);margin-top:2px">+'+ti+'</div></div><div style="padding:7px;border-radius:7px;text-align:center;background:rgba(190,130,125,.05);border:1px solid rgba(190,130,125,.15)"><div style="font-size:.48em;color:var(--td)">支出</div><div style="font-size:.78em;color:rgba(190,130,125,.9);margin-top:2px">-'+te+'</div></div></div>';
ledger.forEach(function(l){h+='<div style="display:flex;align-items:center;gap:6px;padding:6px 10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:7px;margin-bottom:3px"><div style="width:5px;height:5px;border-radius:50%;background:'+(l.type==='inc'?'rgba(140,180,140,.9)':'rgba(190,130,125,.9)')+'"></div><div style="flex:1"><div style="font-size:.65em;color:var(--tp)">'+esc(l.name)+'</div><div style="font-size:.48em;color:var(--td)">'+esc(l.time)+'</div></div><div style="font-family:var(--ffm);font-size:.65em;color:'+(l.type==='inc'?'rgba(140,180,140,.9)':'rgba(190,130,125,.9)')+'">'+esc(l.amt)+'</div></div>';});
}
body.innerHTML=h;
};
window.swBagTab=function(t){LS.setItem('wre_bagtab',t);init_bag();};

window.init_style=function(){
var styles=[
{n:'古风古韵',d:'古典白话为底，辞藻华丽对仗意境'},
{n:'快意江湖',d:'刀光剑影写儿女情长，武打劲道对白利落'},
{n:'仙道长歌',d:'仙气飘渺道法自然，文字清冷悠远'},
{n:'淡水幸福',d:'平实语言写最深感情，人间烟火气'},
{n:'酸涩虐恋',d:'刀子嵌在甜里，每句情话像回旋镖'},
{n:'晋江言情',d:'丰盛细腻节奏张弛有度，糖分精准'},
{n:'潮湿岛屿',d:'黏腻温热，暧昧欲望说不清的情感'},
{n:'县城文学',d:'小镇青年困顿与挣扎，方言感粗粝质地'},
{n:'霓虹冷硬',d:'都市丛林孤独猎人，语言干脆场景冷峻'},
{n:'艳尸美学',d:'死亡与爱欲交缠，文字妖冶带鬼气'},
{n:'颓靡华丽',d:'腐烂的玫瑰也是玫瑰，堕落中寻找美感'},
{n:'地下独白',d:'密集撕裂的内心独白，灵魂在纸上痉挛'},
{n:'电影镜头',d:'长镜头特写切换，沉浸式阅读体验'},
{n:'荒诞现实',d:'人物在现实重压下变形'},
{n:'失败哲人',d:'西伯利亚冻土疲惫观察者，旷远内省'},
{n:'痞子浪漫',d:'语言调皮，诗意与流氓并存'},
{n:'忠诚狗狗',d:'像小狗一样友好忠诚超爱你'},
{n:'物质崇拜',d:'剧情浮夸详标品牌质感'},
{n:'轻松网文',d:'配角有脑爽但不无聊'},
{n:'无脑爽文',d:'主角开挂装逼打脸，纯粹多巴胺'},
{n:'日系轻小说',d:'中二病日常擅吐槽，高密度对话'}
];
var cur=LS.getItem('wre_style_active')||'尚未设定';
var body=document.getElementById('styleBody');
body.innerHTML='<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px;text-align:center;margin-bottom:6px"><div style="font-size:.48em;color:var(--td);letter-spacing:2px;margin-bottom:3px">当前文风</div><div style="font-size:.88em;color:var(--tp);font-weight:500">'+esc(cur)+'</div></div><div style="font-size:.5em;color:var(--ro);text-align:center;margin-bottom:8px;line-height:1.5;padding:6px 8px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:7px">更换文风请在聊天框输入<br><span style="color:var(--go)">【文风更换为：文风名】</span></div><div style="display:flex;flex-direction:column;gap:3px">'+styles.map(function(s){var isCur=cur===s.n;return'<div style="padding:7px 9px;background:'+(isCur?'rgba(200,192,178,.06)':'rgba(255,255,255,.03)')+';border:1px solid '+(isCur?'rgba(200,192,178,.25)':'rgba(255,255,255,.07)')+';border-radius:7px"><div style="font-size:.68em;color:var(--tp)">'+s.n+(isCur?' ← 当前':'')+'</div><div style="font-size:.5em;color:var(--td);margin-top:1px">'+s.d+'</div></div>';}).join('')+'</div>';
};

window.init_icon=function(){
var icons=[
{id:'apple',label:'Apple',svg:'<path d="M16 3c0 0 1.5 1.2 1.5 3.5 0 1.5-.8 2.8-.8 2.8M14 11c1.2 1.2 1.5 3 0 4.5l-1 1c-1.5 1.5-3.8 1.5-5.3 0l-.7-.7c-1.5-1.5-1.5-3.8 0-5.3l1-1c1.5-1.5 3.5-1.2 4.5 0" stroke="ST" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="8" cy="5.5" r=".8" fill="ST"/>'},
{id:'huawei',label:'华为',svg:'<path d="M12 4v5M7.5 6l3.5 3.5M16.5 6l-3.5 3.5M12 20v-5M7.5 18l3.5-3.5M16.5 18l-3.5-3.5M4 12h5M20 12h-5" stroke="ST" stroke-width="1.5" fill="none" stroke-linecap="round"/>'},
{id:'samsung',label:'三星',svg:'<circle cx="7" cy="12" r="2" stroke="ST" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="2" stroke="ST" stroke-width="1.5" fill="none"/><circle cx="17" cy="12" r="2" stroke="ST" stroke-width="1.5" fill="none"/>'},
{id:'xiaomi',label:'小米',svg:'<rect x="6" y="6" width="12" height="12" rx="3" stroke="ST" stroke-width="1.5" fill="none"/><text x="12" y="15" text-anchor="middle" font-size="7" font-weight="700" fill="ST">MI</text>'},
{id:'oppo',label:'OPPO',svg:'<circle cx="12" cy="12" r="7" stroke="ST" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="3" stroke="ST" stroke-width="1.2" fill="none"/>'},
{id:'vivo',label:'vivo',svg:'<path d="M6 9l6 8 6-8" stroke="ST" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'},
{id:'oneplus',label:'一加',svg:'<circle cx="12" cy="12" r="7" stroke="ST" stroke-width="1.5" fill="none"/><path d="M12 8v8M8 12h8" stroke="ST" stroke-width="1.5" stroke-linecap="round"/>'},
{id:'cat',label:'小猫',svg:'<path d="M5 10l2-5h2l1 3 1-3h2l2 5" stroke="ST" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="12" cy="15" rx="6" ry="5" stroke="ST" stroke-width="1.5" fill="none"/><circle cx="10" cy="14" r=".8" fill="ST"/><circle cx="14" cy="14" r=".8" fill="ST"/>'},
{id:'dog',label:'小狗',svg:'<path d="M6 10c0-2 1-4 3-4h1l1 2 1-2h1c2 0 3 2 3 4" stroke="ST" stroke-width="1.3" fill="none" stroke-linecap="round"/><ellipse cx="12" cy="15" rx="6" ry="5" stroke="ST" stroke-width="1.5" fill="none"/><circle cx="10" cy="14" r=".8" fill="ST"/><circle cx="14" cy="14" r=".8" fill="ST"/>'},
{id:'rabbit',label:'小兔',svg:'<ellipse cx="12" cy="16" rx="5" ry="4.5" stroke="ST" stroke-width="1.5" fill="none"/><path d="M10 12V5c0-1 .8-2 1.2-2M14 12V5c0-1-.8-2-1.2-2" stroke="ST" stroke-width="1.3" fill="none" stroke-linecap="round"/><circle cx="10.5" cy="15" r=".7" fill="ST"/><circle cx="13.5" cy="15" r=".7" fill="ST"/>'},
{id:'bear',label:'小熊',svg:'<circle cx="8" cy="8" r="2.5" stroke="ST" stroke-width="1.3" fill="none"/><circle cx="16" cy="8" r="2.5" stroke="ST" stroke-width="1.3" fill="none"/><circle cx="12" cy="14" r="6" stroke="ST" stroke-width="1.5" fill="none"/><circle cx="10" cy="13" r=".8" fill="ST"/><circle cx="14" cy="13" r=".8" fill="ST"/>'},
{id:'star',label:'星星',svg:'<path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 15.7 6.8 18.2l1-5.5-4-3.9 5.5-.8z" stroke="ST" stroke-width="1.5" fill="none" stroke-linejoin="round"/>'}
];
var cur=LS.getItem('wre_icon')||'apple';
var sc='rgba(200,192,178,.7)';
document.getElementById('iconBody').innerHTML='<div style="font-size:.52em;color:var(--td);letter-spacing:2px;margin-bottom:8px">选择悬浮球图标</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">'+icons.map(function(ic){return'<div style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:9px 5px;border-radius:9px;border:1px solid '+(ic.id===cur?'rgba(200,192,178,.3)':'rgba(255,255,255,.07)')+';background:'+(ic.id===cur?'rgba(200,192,178,.05)':'transparent')+';cursor:pointer" onclick="pickIcon(\''+ic.id+'\')"><svg viewBox="0 0 24 24" width="28" height="28">'+ic.svg.replace(/ST/g,sc)+'</svg><span style="font-size:.5em;color:var(--ts)">'+ic.label+'</span></div>';}).join('')+'</div>';
};
window.pickIcon=function(id){
LS.setItem('wre_icon',id);
var allIcons={apple:'<path d="M16 3c0 0 1.5 1.2 1.5 3.5 0 1.5-.8 2.8-.8 2.8M14 11c1.2 1.2 1.5 3 0 4.5l-1 1c-1.5 1.5-3.8 1.5-5.3 0l-.7-.7c-1.5-1.5-1.5-3.8 0-5.3l1-1c1.5-1.5 3.5-1.2 4.5 0" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="8" cy="5.5" r=".8" fill="rgba(200,192,178,.55)"/>',huawei:'<path d="M12 4v5M7.5 6l3.5 3.5M16.5 6l-3.5 3.5M12 20v-5M7.5 18l3.5-3.5M16.5 18l-3.5-3.5M4 12h5M20 12h-5" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none" stroke-linecap="round"/>',samsung:'<circle cx="7" cy="12" r="2" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="2" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none"/><circle cx="17" cy="12" r="2" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none"/>',xiaomi:'<rect x="6" y="6" width="12" height="12" rx="3" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none"/><text x="12" y="15" text-anchor="middle" font-size="7" font-weight="700" fill="rgba(200,192,178,.75)">MI</text>',oppo:'<circle cx="12" cy="12" r="7" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="3" stroke="rgba(200,192,178,.75)" stroke-width="1.2" fill="none"/>',vivo:'<path d="M6 9l6 8 6-8" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',oneplus:'<circle cx="12" cy="12" r="7" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none"/><path d="M12 8v8M8 12h8" stroke="rgba(200,192,178,.75)" stroke-width="1.5" stroke-linecap="round"/>',cat:'<path d="M5 10l2-5h2l1 3 1-3h2l2 5" stroke="rgba(200,192,178,.75)" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="12" cy="15" rx="6" ry="5" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none"/><circle cx="10" cy="14" r=".8" fill="rgba(200,192,178,.55)"/><circle cx="14" cy="14" r=".8" fill="rgba(200,192,178,.55)"/>',dog:'<path d="M6 10c0-2 1-4 3-4h1l1 2 1-2h1c2 0 3 2 3 4" stroke="rgba(200,192,178,.75)" stroke-width="1.3" fill="none" stroke-linecap="round"/><ellipse cx="12" cy="15" rx="6" ry="5" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none"/><circle cx="10" cy="14" r=".8" fill="rgba(200,192,178,.55)"/><circle cx="14" cy="14" r=".8" fill="rgba(200,192,178,.55)"/>',rabbit:'<ellipse cx="12" cy="16" rx="5" ry="4.5" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none"/><path d="M10 12V5c0-1 .8-2 1.2-2M14 12V5c0-1-.8-2-1.2-2" stroke="rgba(200,192,178,.75)" stroke-width="1.3" fill="none" stroke-linecap="round"/><circle cx="10.5" cy="15" r=".7" fill="rgba(200,192,178,.55)"/><circle cx="13.5" cy="15" r=".7" fill="rgba(200,192,178,.55)"/>',bear:'<circle cx="8" cy="8" r="2.5" stroke="rgba(200,192,178,.75)" stroke-width="1.3" fill="none"/><circle cx="16" cy="8" r="2.5" stroke="rgba(200,192,178,.75)" stroke-width="1.3" fill="none"/><circle cx="12" cy="14" r="6" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none"/><circle cx="10" cy="13" r=".8" fill="rgba(200,192,178,.55)"/><circle cx="14" cy="13" r=".8" fill="rgba(200,192,178,.55)"/>',star:'<path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 15.7 6.8 18.2l1-5.5-4-3.9 5.5-.8z" stroke="rgba(200,192,178,.75)" stroke-width="1.5" fill="none" stroke-linejoin="round"/>'};
var svg=allIcons[id]||allIcons.apple;
var orbSvg='<svg viewBox="0 0 24 24" width="22" height="22">'+svg+'</svg>';
document.getElementById('orbBtn').innerHTML=orbSvg;
LS.setItem('wre_icon_svg',JSON.stringify(orbSvg));
init_icon();toast('图标已更换');
};

window.init_achieve=function(){
var achs=JSON.parse(LS.getItem('wre_achv')||'[]');
var body=document.getElementById('achieveBody');
if(!achs.length){body.innerHTML='<div style="text-align:center;padding:20px;font-size:.65em;color:var(--td)">尚未解锁任何成就</div>';return;}
body.innerHTML=achs.map(function(a){return'<div style="padding:7px 9px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px;margin-bottom:4px"><div style="display:flex;align-items:center;gap:5px;margin-bottom:2px"><span style="font-size:.8em">'+esc(a.badge)+'</span><span style="font-size:.68em;color:var(--tp);font-weight:500;flex:1">'+esc(a.name)+'</span><span style="font-family:var(--ffm);font-size:.48em;color:var(--td)">'+esc(a.time)+'</span></div><div style="font-size:.55em;color:var(--td);line-height:1.4">'+esc(a.desc)+'</div></div>';}).join('');
};

})();
