var baiduImg=baiduImg||{version:"1.3.9"};baiduImg.guid="$BAIDU$";window[baiduImg.guid]=window[baiduImg.guid]||{};baiduImg.swf=baiduImg.swf||{};baiduImg.swf.version=(function(){var h=navigator;if(h.plugins&&h.mimeTypes.length){var d=h.plugins["Shockwave Flash"];if(d&&d.description){return d.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s)+r/,".")+".0"}}else{if(window.ActiveXObject&&!window.opera){for(var b=12;b>=2;b--){try{var g=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+b);if(g){var a=g.GetVariable("$version");return a.replace(/WIN/g,"").replace(/,/g,".")}}catch(f){}}}}})();baiduImg.string=baiduImg.string||{};baiduImg.string.encodeHTML=function(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")};baiduImg.encodeHTML=baiduImg.string.encodeHTML;baiduImg.swf.createHTML=function(s){s=s||{};var j=baiduImg.swf.version,g=s.ver||"6.0.0",f,d,e,c,h,r,a={},o=baiduImg.string.encodeHTML;for(c in s){a[c]=s[c]}s=a;if(j){j=j.split(".");g=g.split(".");for(e=0;e<3;e++){f=parseInt(j[e],10);d=parseInt(g[e],10);if(d<f){break}else{if(d>f){return""}}}}else{return""}var m=s.vars,l=["classid","codebase","id","width","height","align"];s.align=s.align||"middle";s.classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";s.codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";s.movie=s.url||"";delete s.vars;delete s.url;if("string"==typeof m){s.flashvars=m}else{var p=[];for(c in m){r=m[c];p.push(c+"="+encodeURIComponent(r))}s.flashvars=p.join("&")}var n=["<object "];for(e=0,h=l.length;e<h;e++){r=l[e];n.push(" ",r,'="',o(s[r]),'"')}n.push(">");var b={wmode:1,scale:1,quality:1,play:1,loop:1,menu:1,salign:1,bgcolor:1,base:1,allowscriptaccess:1,allownetworking:1,allowfullscreen:1,seamlesstabbing:1,devicefont:1,swliveconnect:1,flashvars:1,movie:1};for(c in s){r=s[c];c=c.toLowerCase();if(b[c]&&(r||r===false||r===0)){n.push('<param name="'+c+'" value="'+o(r)+'" />')}}s.src=s.movie;s.name=s.id;delete s.id;delete s.movie;delete s.classid;delete s.codebase;s.type="application/x-shockwave-flash";s.pluginspage="http://www.macromedia.com/go/getflashplayer";n.push("<embed");var q;for(c in s){r=s[c];if(r||r===false||r===0){if((new RegExp("^salign\x24","i")).test(c)){q=r;continue}n.push(" ",c,'="',o(r),'"')}}if(q){n.push(' salign="',o(q),'"')}n.push("></embed></object>");return n.join("")};baiduImg.swf.create=function(a,c){a=a||{};var b=baiduImg.swf.createHTML(a)||a.errorMessage||"";if(c&&"string"==typeof c){c=document.getElementById(c)}if(c){c.innerHTML=b}else{document.write(b)}};baiduImg.browser=baiduImg.browser||{};baiduImg.browser.ie=baiduImg.ie=/msie (\d+\.\d+)/i.test(navigator.userAgent)?(document.documentMode||+RegExp["\x241"]):undefined;baiduImg.array=baiduImg.array||{};baiduImg.array.remove=function(c,b){var a=c.length;while(a--){if(a in c&&c[a]===b){c.splice(a,1)}}return c};baiduImg.lang=baiduImg.lang||{};baiduImg.lang.isArray=function(a){return"[object Array]"==Object.prototype.toString.call(a)};baiduImg.lang.isFunction=function(a){return"[object Function]"==Object.prototype.toString.call(a)};baiduImg.lang.toArray=function(b){if(b===null||b===undefined){return[]}if(baiduImg.lang.isArray(b)){return b}if(typeof b.length!=="number"||typeof b==="string"||baiduImg.lang.isFunction(b)){return[b]}if(b.item){var a=b.length,c=new Array(a);while(a--){c[a]=b[a]}return c}return[].slice.call(b)};baiduImg.swf.getMovie=function(c){var a=document[c],b;return baiduImg.browser.ie==9?a&&a.length?(b=baiduImg.array.remove(baiduImg.lang.toArray(a),function(d){return d.tagName.toLowerCase()!="embed"})).length==1?b[0]:b:a:a||window[c]};baiduImg.swf.create({id:"flashView",url:"/static/searchdetail/flash/ImagePlayerHLT.swf?v=1",width:"45",height:"30",allowFullScreen:"true",wmode:"transparent",errorMessage:"\u9519\u8bef",ver:"10.0.0",vars:{qword:BD.IMG.gconf.qword}},"fullflash");