(function(AD_CONFIG, LINKS, RT_CONFIG){
/*! Copyright 2013 Baidu Inc. All Rights Reserved. */
var AD_CONFIG = {
    id: "ec-ma-8964",
    main_url: "http://www.baidu.com",
    rank: {
        title: "笔记本电脑风云榜",
        ranks: [{
            text: "苹果macbook15寸",
            text_rcv_url: "http://www.baidu.com/s?ie=utf-8&bs=%E9%80%94%E8%A7%82&f=8&rsv_bp=1&rsv_spt=3&wd=%E9%80%94%E8%A7%82&inputT=0",
            rate: "84973"
        }, {
            text: "苹果macbook13寸",
            text_rcv_url: "http://www.baidu.com/s?ie=utf-8&bs=%E5%AE%9D%E6%9D%A5&f=8&rsv_bp=1&rsv_spt=3&wd=%E5%AE%9D%E6%9D%A5&inputT=0",
            rate: "75921"
        }, {
            text: "戴尔14r",
            text_rcv_url: "http://www.baidu.com/s?ie=utf-8&bs=%E6%8D%B7%E8%BE%BE&f=8&rsv_bp=1&rsv_spt=3&wd=%E6%8D%B7%E8%BE%BE&inputT=0",
            rate: "73129"
        }, {
            text: "联想y400",
            text_rcv_url: "http://www.baidu.com/s?ie=utf-8&bs=%E8%BF%88%E8%85%BE&f=8&rsv_bp=1&rsv_spt=3&wd=%E8%BF%88%E8%85%BE&inputT=0",
            rate: "66673"
        }, {
            text: "联想y470",
            text_rcv_url: "http://www.baidu.com/s?ie=utf-8&bs=%E9%80%9F%E8%85%BE&f=8&rsv_bp=1&rsv_spt=3&wd=%E9%80%9F%E8%85%BE&inputT=0",
            rate: "65360"
        }, {
            text: "联想g480",
            text_rcv_url: "http://www.baidu.com/s?ie=utf-8&bs=%E5%B8%95%E8%90%A8%E7%89%B9&f=8&rsv_bp=1&rsv_spt=3&wd=%E5%B8%95%E8%90%A8%E7%89%B9&inputT=0",
            rate: "59163"
        }, {
            text: "联想y480",
            text_rcv_url: "http://www.baidu.com/s?ie=utf-8&bs=%E5%B8%95%E8%90%A8%E7%89%B9&f=8&rsv_bp=1&rsv_spt=3&wd=%E5%B8%95%E8%90%A8%E7%89%B9&inputT=0",
            rate: "59163"
        }, {
            text: "联想g470",
            text_rcv_url: "http://www.baidu.com/s?ie=utf-8&bs=%E5%B8%95%E8%90%A8%E7%89%B9&f=8&rsv_bp=1&rsv_spt=3&wd=%E5%B8%95%E8%90%A8%E7%89%B9&inputT=0",
            rate: "59163"
        }, {
            text: "戴尔15r",
            text_rcv_url: "http://www.baidu.com/s?ie=utf-8&bs=%E6%9C%97%E9%80%B8&f=8&rsv_bp=1&rsv_spt=3&wd=%E6%9C%97%E9%80%B8&inputT=0",
            rate: "58123"
        }, {
            text: "宏基v5",
            text_rcv_url: "http://www.baidu.com/s?ie=utf-8&bs=%E6%A1%91%E5%A1%94%E7%BA%B3&f=8&rsv_bp=1&rsv_spt=3&wd=%E6%A1%91%E5%A1%94%E7%BA%B3&inputT=0",
            rate: "58089"
        }],
        foot: [{
            text: "百度风云榜",
            text_rcv_url: "http://top.baidu.com/?fr=zx_right"
        }, {
            text: "电脑榜",
            text_rcv_url: "http://top.baidu.com/category?c=18&fr=zx_right"
        }]
    }
};;
var Mustache="undefined"!==typeof module&&module.exports||{};
(function(p){function y(a){return String(a).replace(/&(?!\w+;)|[<>"']/g,function(a){return z[a]||a})}function w(a,b,e){if("."===a)return b[b.length-1];a=a.split(".");for(var c=a.length-1,d=a[c],f,g,s=b.length,n,r;s;){r=b.slice(0);g=b[--s];for(n=0;n<c;){g=g[a[n++]];if(null==g)break;r.push(g)}if(g&&"object"===typeof g&&d in g){f=g[d];break}}"function"===typeof f&&(f=f.call(r[r.length-1]));return null==f?e:f}function A(a,b,e,c){var d="";a=w(a,b);if(c){if(""===a||null==a||!1===a||"[object Array]"==={}.toString.call(a)&&
0===a.length)d+=e()}else if("[object Array]"==={}.toString.call(a)){var f=a.length;B(a,function(a,c){var g={"@index":c,_index:c+1,"@first":0===c,"@size":f,"@last":c===f-1,"@odd":1===(c&1),"@even":0===(c&1)},k;for(k in g)g.hasOwnProperty(k)&&(a[k]=g[k]);b.push(a);d+=e();for(k in g)g.hasOwnProperty(k)&&delete a[k];b.pop()})}else if("object"===typeof a)b.push(a),d+=e(),b.pop();else if("function"===typeof a)var g=b[b.length-1],d=d+(a.call(g,e(),function(a){return q(a,g)})||"");else a&&(d+=e());return d}
function x(a,b){b=b||{};for(var e=b.tags||p.tags,c=e[0],d=e[e.length-1],f=['var buffer = "";',"\nvar line = 1;","\ntry {",'\nbuffer += "'],g=[],s=!1,n=!1,r=function(){if(!s||n||b.space)g=[];else for(;g.length;)f.splice(g.pop(),1);n=s=!1},k=[],u,q,C,w=function(a){e=t(a).split(/\s+/);q=e[0];C=e[e.length-1]},x=function(a){f.push('";',u,'\nvar partial = partials["'+t(a)+'"];',"\nif (partial) {","\n  buffer += render(partial,stack[stack.length - 1],partials);","\n}",'\nbuffer += "')},v=function(a,d){var b=
t(a);if(""===b)throw Error("Section name may not be empty");k.push({name:b,inverted:d});f.push('";',u,'\nvar name = "'+b+'";',"\nvar callback = (function () {","\n  return function () {",'\n    var buffer = "";','\nbuffer += "')},y=function(a){v(a,!0)},z=function(a){a=t(a);var b=0!=k.length&&k[k.length-1].name;if(!b||a!=b)throw Error('Section named "'+a+'" was never opened');a=k.pop();f.push('";',"\n    return buffer;","\n  };","\n})();");a.inverted?f.push("\nbuffer += renderSection(name,stack,callback,true);"):
f.push("\nbuffer += renderSection(name,stack,callback);");f.push('\nbuffer += "')},A=function(a){f.push('";',u,'\nbuffer += lookup("'+t(a)+'",stack,"");','\nbuffer += "')},B=function(a){f.push('";',u,'\nbuffer += escapeHTML(lookup("'+t(a)+'",stack,""));','\nbuffer += "')},D=1,m,l,h=0,E=a.length;h<E;++h)if(a.slice(h,h+c.length)===c){h+=c.length;m=a.substr(h,1);u="\nline = "+D+";";q=c;C=d;s=!0;switch(m){case "!":h++;l=null;break;case "=":h++;d="="+d;l=w;break;case ">":h++;l=x;break;case "#":h++;l=v;
break;case "^":h++;l=y;break;case "/":h++;l=z;break;case "{":d="}"+d;case "&":h++;n=!0;l=A;break;default:n=!0,l=B}m=a.indexOf(d,h);if(-1===m)throw Error('Tag "'+c+'" was not closed properly');c=a.substring(h,m);l&&l(c);for(l=0;~(l=c.indexOf("\n",l));)D++,l++;h=m+d.length-1;c=q;d=C}else switch(m=a.substr(h,1),m){case '"':case "\\":n=!0;f.push("\\"+m);break;case "\r":break;case "\n":g.push(f.length);f.push("\\n");r();D++;break;default:/^\s*$/.test(m)?g.push(f.length):n=!0,f.push(m)}if(0!=k.length)throw Error('Section "'+
k[k.length-1].name+'" was not closed properly');r();f.push('";',"\nreturn buffer;","\n} catch (e) { throw {error: e, line: line}; }");d=f.join("").replace(/buffer \+= "";\n/g,"");b.debug&&("undefined"!=typeof console&&console.log?console.log(d):"function"===typeof print&&print(d));return d}function E(a,b){var e=x(a,b),c=new Function("view,partials,stack,lookup,escapeHTML,renderSection,render",e);return function(a,b){b=b||{};var g=[a];try{return c(a,b,g,w,y,A,q)}catch(e){throw Error(e.error+"\n"+e.line);
}}}function v(a,b){b=b||{};return E(a,b)}function q(a,b,e){return v(a)(b,e)}p.name="mustache.js";p.version="0.5.0-dev";p.tags=["{{","}}"];p.parse=x;p.compile=v;p.render=q;p.to_html=function(a,b,e,c){a=q(a,b,e);if("function"===typeof c)c(a);else return a};var B=function(a,b,e){for(var c=0,d=a.length;c<d;++c)b.call(e,a[c],c,a)},t=function(a){return null==a?"":String(a).replace(/(^[\s\xA0]+)|([\s\xA0]+$)/g,"")},z={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}})(Mustache);
;
var AD_TEMPLATE_CONTENT="<!-- target:AD_ad_widget_zhixin_rank -->\n<div class=\"ad-widget-zhixin ad-widget-zhixin-rank\">\n{{#title}}\n<h2 class=\"ec-rank-head\">\n<span>{{{title}}}</span>\n</h2>\n{{/title}}\n<ul class=\"ec-rank\">\n<li class=\"ec-head\">\n<div class=\"ec-trend\">\u641c\u7d22\u6307\u6570</div>\n<div class=\"ec-name\">\u6392\u540d</div>\n</li>\n{{#ranks}}\n<li>\n<span>{{rate}}</span>\n<strong class=\"ec-rank-no{{_index}}\">{{_index}}</strong>\n<a target=\"_blank\" href=\"{{{text_rcv_url}}}\" title2=\"eczx_rank_{{_index}}\">{{{text}}}</a>\n</li>\n{{/ranks}}\n</ul>\n<div class=\"ec-rank-foot\">\n\u6765\u6e90: \n{{#foot}}\n<a target=\"_blank\" href=\"{{{text_rcv_url}}}\" title2=\"eczx_rank_foot\">{{text}}</a>{{^@last}} - {{/@last}}\n{{/foot}}\n</div>\n</div>\n";;
var AD_STYLE_CONTENT=".ad-widget-zhixin-rank{font:12px/1.5 arial,sans-serif;width:450px}.ad-widget-zhixin-rank em{color:#cb0100;font-style:normal}.ad-widget-zhixin-rank .ec-rank-head{margin:5px 0;padding:0}.ad-widget-zhixin-rank .ec-rank-head span{background:#fff;padding-right:10px;font-size:14px;color:#000;text-decoration:none}.ad-widget-zhixin-rank .ec-head{*zoom:1;background:#fafafa;color:#666;border-bottom:1px solid #f0f0f0;font-size:13px}.ad-widget-zhixin-rank .ec-head:before,.ad-widget-zhixin-rank .ec-head:after{display:table;content:\"\"}.ad-widget-zhixin-rank .ec-head:after{clear:both}.ad-widget-zhixin-rank .ec-name{float:left}.ad-widget-zhixin-rank .ec-trend{float:right}.ad-widget-zhixin-rank .ec-rank{margin:0;padding:0;list-style:none}.ad-widget-zhixin-rank .ec-rank li{padding:0;line-height:30px;border-bottom:#eee 1px solid}\n.ad-widget-zhixin-rank .ec-rank li a{text-decoration:none}.ad-widget-zhixin-rank .ec-rank li span{float:right}.ad-widget-zhixin-rank .ec-rank li strong{display:block;float:left;margin:8px 10px 0 0;width:14px;height:14px;color:#fff;line-height:14px;text-align:center;font-size:11px;font-weight:normal;padding-top:0;background:#8eb9f5;border:#388ade 1px solid}.ad-widget-zhixin-rank .ec-rank li .ec-rank-no1,.ad-widget-zhixin-rank .ec-rank li .ec-rank-no2,.ad-widget-zhixin-rank .ec-rank li .ec-rank-no3{background:#ff6968;border:#f06a69 1px solid}.ad-widget-zhixin-rank .ec-rank li .ec-rank-no2{background:#ff8547}.ad-widget-zhixin-rank .ec-rank li .ec-rank-no3{background:#ffac38}.ad-widget-zhixin-rank .ec-rank .ec-head{line-height:28px}.ad-widget-zhixin-rank .ec-rank-foot{margin-top:10px;text-align:right}\n.ad-widget-zhixin-rank .ec-rank-foot a:link,.ad-widget-zhixin-rank .ec-rank-foot a:visited{display:inline-block;padding-left:5px;color:#666}#canvas .ad-block-0-0{padding-top:4px}#canvas .ad-block-0-0 .ad-widget-zhixin-rank{width:259px}#canvas .ad-block-0-0 .ad-widget-zhixin-rank .ec-head{font-size:13px}#canvas .ad-block-0-0 .ad-widget-zhixin-rank strong{font-size:12px;font-family:arial}#canvas .ad-block-0-0 .ad-widget-zhixin-rank .ec-rank-no1{background-color:#f54545}#canvas .ad-block-0-0 .ad-widget-zhixin-rank .ec-rank-no2{background-color:#ff8547}#canvas .ad-block-0-0 .ad-widget-zhixin-rank .ec-rank-no3{background-color:#ffac38}#canvas .ad-block-0-0 .ad-widget-zhixin-rank li{line-height:32px;border-bottom:1px solid #f5f5f5}#canvas .ad-block-0-0 .ad-widget-zhixin-rank li a{font-family:\"\u5b8b\u4f53\";font-size:13px}\n#canvas .ad-block-0-0 .ad-widget-zhixin-rank li span{font-family:arial;font-size:13px;color:#333}#canvas .ad-block-0-0 .ec-rank-head span{color:#333}";;
var baidu={version:"1.5.0"};baidu.guid="$BAIDU$";window[baidu.guid]=window[baidu.guid]||{};baidu.abstractMethod=function(){throw Error("unimplemented abstract method")};baidu.dom=baidu.dom||{};baidu.dom.g=function(a){if("string"==typeof a||a instanceof String){return document.getElementById(a)}else{if(a&&a.nodeName&&(a.nodeType==1||a.nodeType==9)){return a}}return null};baidu.g=baidu.G=baidu.dom.g;baidu.fn=baidu.fn||{};baidu.fn.blank=function(){};baidu.dom.show=function(a){a=baidu.dom.g(a);a.style.display="";return a};baidu.show=baidu.dom.show;baidu.object=baidu.object||{};baidu.extend=baidu.object.extend=function(c,a){for(var b in a){if(a.hasOwnProperty(b)){c[b]=a[b]}}return c};baidu.lang=baidu.lang||{};baidu.lang.isArray=function(a){return"[object Array]"==Object.prototype.toString.call(a)
};baidu.array=baidu.array||{};baidu.each=baidu.array.forEach=baidu.array.each=function(g,e,b){var d,f,c,a=g.length;if("function"==typeof e){for(c=0;c<a;c++){f=g[c];d=e.call(b||g,f,c);if(d===false){break}}}return g};baidu.lang.isString=function(a){return"[object String]"==Object.prototype.toString.call(a)};baidu.isString=baidu.lang.isString;baidu.string=baidu.string||{};(function(){var a=new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g");baidu.string.trim=function(b){return String(b).replace(a,"")}})();baidu.trim=baidu.string.trim;baidu.string.escapeReg=function(a){return String(a).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])","g"),"\\\x241")};baidu.dom.q=function(h,e,b){var j=[],d=baidu.string.trim,g,f,a,c;if(!(h=d(h))){return j}if("undefined"==typeof e){e=document
}else{e=baidu.dom.g(e);if(!e){return j}}b&&(b=d(b).toUpperCase());if(e.getElementsByClassName){a=e.getElementsByClassName(h);g=a.length;for(f=0;f<g;f++){c=a[f];if(b&&c.tagName!=b){continue}j[j.length]=c}}else{h=new RegExp("(^|\\s)"+baidu.string.escapeReg(h)+"(\\s|\x24)");a=b?e.getElementsByTagName(b):(e.all||e.getElementsByTagName("*"));g=a.length;for(f=0;f<g;f++){c=a[f];h.test(c.className)&&(j[j.length]=c)}}return j};baidu.q=baidu.Q=baidu.dom.q;baidu.dom.hasAttr=function(c,b){c=baidu.g(c);var a=c.attributes.getNamedItem(b);return !!(a&&a.specified)};baidu.lang.inherits=function(g,e,d){var c,f,a=g.prototype,b=new Function();b.prototype=e.prototype;f=g.prototype=new b();for(c in a){f[c]=a[c]}g.prototype.constructor=g;g.superClass=e.prototype;if("string"==typeof d){f._className=d}};baidu.inherits=baidu.lang.inherits;;
var g=g||{};g.global=this;g.A=!0;g.C="en";g.B=!0;g.w=function(a){return void 0!==a};g.v=function(a,b,c){a=a.split(".");c=c||g.global;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&g.w(b)?c[d]=b:c=c[d]?c[d]:c[d]={}};g.I=function(a,b,c){g.v(a,b,c)};g.H=function(a,b,c){a[b]=c};g.M=function(){return!1};g.N=function(){};g.L=function(){};function h(a,b){for(var c=a.split("."),d=b||window,e;e=c.shift();)if(null!=d[e])d=d[e];else return null;return d}function l(a,b){function c(a,e){baidu.lang.isArray(a)?baidu.each(a,function(a,b){c(a,e.concat([b]))}):b(a,e)}c(a,[])};function m(){this.r={}}m.prototype.get=function(a){return this.r[a]||""};
m.prototype.parse=function(a){function b(a){return I.test(a)?b(a.replace(I,function(a,b){return q[b]||B[b]||""})):a}function c(a){a&&p&&C.push(a)}function d(){p&&(p in q?alert("Template: "+p+" is exist"):q[p]=C.join("\n"));p=null}a=a.split(/\r?\n/);for(var e=a.length,f=0,u=/\x3c!--\s*target:\s*([a-zA-Z0-9_]+)\s*--\x3e/,J=/\x3c!--\s*\/target\s*--\x3e/,I=/\x3c!--\s*import:\s*([a-zA-Z0-9_\/]+)\s*--\x3e/,K=/\x3c!--\s*scope:\s*([a-zA-Z0-9_]+)\s*--\x3e/,Q=/\x3c!--\/scope--\x3e/,r,k,n,v,B=this.r,C=[],p,
q={};f<e;f++)k=a[f],0>=k.length||(u.lastIndex=-1,K.lastIndex=-1,(n=K.exec(k))?v=n[1]:(n=Q.exec(k))?v=void 0:(n=u.exec(k))?(n=v?v+"/"+n[1]:n[1],k=k.split(u),c(k[0]),d(),C=[],p=n,c(k[2])):J.test(k)?(k=k.split(J),c(k[0]),d()):c(k));d();for(r in q)B[r]&&alert("Template: "+r+" already exists!"),B[r]=b(q[r])};var s=new m;function t(){};function w(){this.a={}}baidu.inherits(w,t);w.prototype.addListener=function(a,b){this.a[a]||(this.a[a]=[]);this.a[a].push(b)};w.prototype.dispose=function(){this.a={}};w.prototype.trigger=function(a,b){if(!this.a[a])return!0;var c,d=Array.prototype.slice.call(arguments,1),e=!0;for(c=0;c<this.a[a].length;c++){var f=this.a[a][c];f&&!1===f.apply(this,d)&&(e=!1)}return e};var x;function y(a){this.a={};this.h="ad-w-"+Math.floor(2147483648*Math.random()).toString(36);this.setData(a)}baidu.inherits(y,w);x=function(a,b){return Mustache.render(a,b)};y.prototype.trigger=function(a,b){if(!this.a[a])return!0;var c;c=this.a[a].length;var d=Array.prototype.slice.call(arguments,1),e=!0;for(c-=1;0<=c;c--){var f=this.a[a][c];if(f&&!1===f.apply(this,d)){e=!1;break}}return e};
y.prototype.getMainHtml=function(){if(!this.o||!this.f)throw Error("Widget's view and data can not be undefined.");var a=this,b=s.get(this.o),c=baidu.extend(this.f,{_id:function(){return function(b){return a.getId(b)}}});return x(b,c)};y.prototype.render=function(){var a=this.getRoot();if(a){var b=this.getMainHtml();a.innerHTML=b}};y.prototype.init=baidu.fn.blank;y.prototype.k=baidu.fn.blank;y.prototype.j=baidu.fn.blank;y.prototype.setData=function(a){a&&(this.f=baidu.object.extend(this.D||{},a))};
y.prototype.getRoot=function(){return baidu.g(this.getId())};y.prototype.getId=function(a){return a?this.h+"-"+a:this.h};y.prototype.show=function(){var a=this.getRoot();a&&baidu.show(a)};y.prototype.sendLog=function(a,b){baidu.lang.isString(a)?this.trigger("sendlog",{action:a,xp:b||a}):this.trigger("sendlog",a)};y.prototype.dispose=function(){var a=this.getRoot();a&&(a.innerHTML="",a.parentNode.removeChild(a))};function z(a){y.call(this,a);this.o="AD_ad_widget_zhixin_rank"}baidu.inherits(z,y);function D(a){this.s=a}D.prototype.start=function(a,b){!b&&this.m&&this.m.dispose();return this.m=this.s(!!a)};D.prototype.set=function(a,b){"AD_CONFIG"===a?AD_CONFIG=b:"LINKS"===a?LINKS=b:"RT_CONFIG"===a&&(RT_CONFIG=b)};D.prototype.get=function(a){if("AD_CONFIG"===a)return AD_CONFIG;if("LINKS"===a)return LINKS;if("RT_CONFIG"===a)return RT_CONFIG;if("AD_STYLE_CONTENT"===a)return AD_STYLE_CONTENT};function E(){}E.prototype.l=baidu.abstractMethod;E.prototype.p=baidu.abstractMethod;function F(a){this.t=baidu.object.extend({block_class:"ad-layout-block"},a||{})}baidu.inherits(F,E);F.prototype.l=function(a){var b=G(this,a),c={};l(a,function(a,b){var f=a.getMainHtml();c["block-"+b.join("-")+"-id"]=a.getId();c["block_"+b.join("_")]=f});return Mustache.render(b,c)};F.prototype.p=function(a,b){l(a,function(a,d){for(var e=b,f=0;e&&f<d.length;f++)e=e.children[d[f]];if(!e)throw Error("Invalid pre-rendered html formated.");a.h=e.id})};
function G(a,b){var c=[];baidu.each(b,function(b,e){c.push(H(a,b,[e]))});return c.join("\n")}function H(a,b,c){var d=">";baidu.lang.isArray(b)||(d=' id="{{=<% %>=}}{{block-<% indexes %>-id}}">');var e=[Mustache.render('<div class="{{block_class}} {{block_class}}-{{indexes}}"'+d,{block_class:a.t.block_class,indexes:c.join("-")})];baidu.lang.isArray(b)?baidu.each(b,function(b,d){e.push(H(a,b,c.concat([d])))}):e.push("{{{block_"+c.join("_")+"}}}");e.push("</div>");return e.join("\n")};function L(a,b){y.call(this,a);this.d=new F({block_class:"ad-block"});this.c=[];this.u=b||""}baidu.inherits(L,y);L.prototype.setWidgets=function(a){this.c=[].slice.call(arguments)};L.prototype.getWidget=function(a){var b=Array.prototype.slice.call(arguments);if(!b.length)return null;var c=this.c[b[0]];if(!c)return null;for(var d=1;d<b.length;d++)if(c=c[b[d]],null==c)return null;return c};L.prototype.getMainHtml=function(){this.f._content=this.d.l(this.c);return L.superClass.getMainHtml.call(this)};
L.prototype.forEach=function(a){l(this.c,a)};function M(a,b){b.addListener("sendlog",function(b){b.action=(a.u||"")+b.action;a.sendLog(b)})}L.prototype.init=function(){this.forEach(function(a){a.init()})};L.prototype.k=function(){this.forEach(function(a){a.k()})};L.prototype.j=function(){this.forEach(function(a){a.j()});var a=this;this.forEach(function(b){M(a,b)})};L.prototype.dispose=function(){this.forEach(function(a){a.dispose()})};function N(){}N.prototype.attachTo=function(){};function O(a){RT_CONFIG.__plugins||(RT_CONFIG.__plugins=[]);RT_CONFIG.__plugins.push(a)};var P={getContext:function(a){return h("ECOM_MA_LEGO.materials."+a)},J:function(a){a=a||P.getId();return(a=P.getContext(a))?a.material||null:null},getId:function(){var a="canvas";"undefined"!=typeof RT_CONFIG&&RT_CONFIG.id?a=RT_CONFIG.id:"undefined"!=typeof AD_CONFIG&&AD_CONFIG.id&&(a=AD_CONFIG.id);return a},F:function(a){var b=("ECOM_MA_LEGO.materials."+a.material.getId()).split("."),c=window;b[0]in c||!c.execScript||c.execScript("var "+b[0]);for(var d;b.length&&(d=b.shift());)b.length||void 0===
a?c=c[d]?c[d]:c[d]={}:c[d]=a},K:function(a){var b=a.getRoot();for(a=document;b&&b!=a;){if(baidu.dom.hasAttr(b,"data-rendered"))return b.id;b=b.parentNode}return null}};function R(){}baidu.inherits(R,N);O(new R);R.prototype.attachTo=function(a){a.addListener("aftermaterialshow",function(){var a=P.getId()+";"+(window.bdQuery||"");if(a=/m(\d+)_canvas/.exec(a)){var a=a[1],c="m"+a+"_BEGIN",d="m"+a+"_END";"number"===typeof window[c]&&"number"===typeof window[d]&&((new Image).src="http://www.baidu.com/nocache/fesplg/s.gif?product_id=45&page_id=901&adv_id="+encodeURIComponent(a)+"&time="+(window[d]-window[c])+"&_t="+Math.random())}})};function S(){}baidu.inherits(S,N);O(new S);S.prototype.attachTo=function(a){a.addListener("aftermaterialshow",function(){var b=h("global.background",AD_CONFIG);if(b){var c=baidu.q("ad-material-inside",a.getRoot());c&&c.length?c[0].style.backgroundImage="url("+b+")":a.getRoot().style.backgroundImage="url("+b+")"}})};function U(a){L.call(this,{});this.d=new F({block_class:"ad-block"});this.b=a||P.getId();this.n="ad-style-"+this.b;if("undefined"!==typeof RT_CONFIG&&(a=RT_CONFIG.__plugins)&&a.length)for(var b=0;b<a.length;b++)a[b].attachTo(this)}baidu.inherits(U,L);U.prototype.getRoot=function(){baidu.g(this.b)||document.write('<div id="'+this.b+'"></div>');return baidu.g(this.b)};U.prototype.getId=function(){return this.b};U.prototype.getMainHtml=function(){return'<div class="layout">'+this.d.l(this.c)+"</div>"};
U.prototype.init=function(){var a=this.getRoot();if(a){if("string"===typeof AD_TEMPLATE_CONTENT&&/AD_ad_widget_siva_/.test(AD_TEMPLATE_CONTENT))try{this.d.p(this.c,a.children[0])}catch(b){a.innerHTML=this.getMainHtml()}else a.innerHTML=this.getMainHtml();a.setAttribute("data-rendered","true")}U.superClass.init.call(this)};
U.prototype.show=function(){try{this.trigger("beforematerialshow")}catch(a){}if("undefined"!==typeof AD_STYLE_CONTENT&&!baidu.g(this.n)){var b=AD_STYLE_CONTENT.replace(/#canvas/g,"#"+this.b),c=this.n,d=this.getRoot(),e=d.parentNode;if(e){var f=document.createElement("style");f.type="text/css";f.media="screen";c&&(f.id=c);e.insertBefore(f,d);f.styleSheet?f.styleSheet.cssText=b:f.appendChild(document.createTextNode(b))}}this.init();this.k();this.j();baidu.show(this.getId());try{this.trigger("aftermaterialshow")}catch(u){}};
U.prototype.dispose=function(){U.superClass.dispose.call(this);var a=this.getRoot();a&&(a.innerHTML="")};(function(a){s.parse(AD_TEMPLATE_CONTENT);"function"===typeof ECMA_define?ECMA_define(function(){return new D(a)}):a()})(function(a){var b=new z(AD_CONFIG.rank),c=new U;c.setWidgets([b]);if(!0===a)return c;c.show()});

})(/** AD_CONFIG */{}, /** LINKS */[], /** RT_CONFIG */{});