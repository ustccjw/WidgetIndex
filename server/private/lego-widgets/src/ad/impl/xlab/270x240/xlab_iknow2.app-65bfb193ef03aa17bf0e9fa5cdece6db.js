(function(){
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
var Mustache=(typeof module!=="undefined"&&module.exports)||{};(function(w){w.name="mustache.js";w.version="0.5.0-dev";w.tags=["{{","}}"];w.parse=m;w.compile=e;w.render=v;w.clearCache=u;w.to_html=function(A,y,z,B){var x=v(A,y,z);if(typeof B==="function"){B(x)}else{return x}};var s=Object.prototype.toString;var f=Array.isArray;var b=Array.prototype.forEach;var g=String.prototype.trim;var i;if(f){i=f}else{i=function(x){return s.call(x)==="[object Array]"}}var r;if(b){r=function(y,z,x){return b.call(y,z,x)}}else{r=function(A,B,z){for(var y=0,x=A.length;y<x;++y){B.call(z,A[y],y,A)}}}var k=/^\s*$/;function c(x){return k.test(x)}var p;if(g){p=function(x){return x==null?"":g.call(x)}}else{var n,h;
if(c("\xA0")){n=/^\s+/;h=/\s+$/}else{n=/^[\s\xA0]+/;h=/[\s\xA0]+$/}p=function(x){return x==null?"":String(x).replace(n,"").replace(h,"")}}var d={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function o(x){return String(x).replace(/&(?!\w+;)|[<>"']/g,function(y){return d[y]||y})}function l(D,F,G,z){z=z||"<template>";var H=F.split("\n"),x=Math.max(G-3,0),A=Math.min(H.length,G+3),y=H.slice(x,A);var E;for(var B=0,C=y.length;B<C;++B){E=B+x+1;y[B]=(E===G?" >> ":"    ")+y[B]}D.template=F;D.line=G;D.file=z;D.message=[z+":"+G,y.join("\n"),"",D.message].join("\n");return D}function t(x,F,E){if(x==="."){return F[F.length-1]}var D=x.split(".");var B=D.length-1;var C=D[B];var G,y,A=F.length,z,H;while(A){H=F.slice(0);y=F[--A];z=0;while(z<B){y=y[D[z++]];if(y==null){break}H.push(y)}if(y&&typeof y==="object"&&C in y){G=y[C];
break}}if(typeof G==="function"){G=G.call(H[H.length-1])}if(G==null){return E}return G}function j(A,x,E,z){var y="";var C=t(A,x);if(z){if(C==null||C===false||(i(C)&&C.length===0)){y+=E()}}else{if(i(C)){r(C,function(F){x.push(F);y+=E();x.pop()})}else{if(typeof C==="object"){x.push(C);y+=E();x.pop()}else{if(typeof C==="function"){var B=x[x.length-1];var D=function(F){return v(F,B)};y+=C.call(B,E(),D)||""}else{if(C){y+=E()}}}}}return y}function m(Z,B){B=B||{};var K=B.tags||w.tags,L=K[0],G=K[K.length-1];var y=['var buffer = "";',"\nvar line = 1;","\ntry {",'\nbuffer += "'];var F=[],aa=false,X=false;var V=function(){if(aa&&!X&&!B.space){while(F.length){y.splice(F.pop(),1)}}else{F=[]}aa=false;X=false};var S=[],P,C,M;var U=function(ab){K=p(ab).split(/\s+/);C=K[0];M=K[K.length-1]};var J=function(ab){y.push('";',P,'\nvar partial = partials["'+p(ab)+'"];',"\nif (partial) {","\n  buffer += render(partial,stack[stack.length - 1],partials);","\n}",'\nbuffer += "')
};var x=function(ad,ab){var ac=p(ad);if(ac===""){throw l(new Error("Section name may not be empty"),Z,I,B.file)}S.push({name:ac,inverted:ab});y.push('";',P,'\nvar name = "'+ac+'";',"\nvar callback = (function () {","\n  return function () {",'\n    var buffer = "";','\nbuffer += "')};var E=function(ab){x(ab,true)};var T=function(ac){var ab=p(ac);var ae=S.length!=0&&S[S.length-1].name;if(!ae||ab!=ae){throw l(new Error('Section named "'+ab+'" was never opened'),Z,I,B.file)}var ad=S.pop();y.push('";',"\n    return buffer;","\n  };","\n})();");if(ad.inverted){y.push("\nbuffer += renderSection(name,stack,callback,true);")}else{y.push("\nbuffer += renderSection(name,stack,callback);")}y.push('\nbuffer += "')};var W=function(ab){y.push('";',P,'\nbuffer += lookup("'+p(ab)+'",stack,"");','\nbuffer += "')
};var z=function(ab){y.push('";',P,'\nbuffer += escapeHTML(lookup("'+p(ab)+'",stack,""));','\nbuffer += "')};var I=1,Y,D;for(var Q=0,R=Z.length;Q<R;++Q){if(Z.slice(Q,Q+L.length)===L){Q+=L.length;Y=Z.substr(Q,1);P="\nline = "+I+";";C=L;M=G;aa=true;switch(Y){case"!":Q++;D=null;break;case"=":Q++;G="="+G;D=U;break;case">":Q++;D=J;break;case"#":Q++;D=x;break;case"^":Q++;D=E;break;case"/":Q++;D=T;break;case"{":G="}"+G;case"&":Q++;X=true;D=W;break;default:X=true;D=z}var A=Z.indexOf(G,Q);if(A===-1){throw l(new Error('Tag "'+L+'" was not closed properly'),Z,I,B.file)}var O=Z.substring(Q,A);if(D){D(O)}var N=0;while(~(N=O.indexOf("\n",N))){I++;N++}Q=A+G.length-1;L=C;G=M}else{Y=Z.substr(Q,1);switch(Y){case'"':case"\\":X=true;y.push("\\"+Y);break;case"\r":break;case"\n":F.push(y.length);y.push("\\n");V();
I++;break;default:if(c(Y)){F.push(y.length)}else{X=true}y.push(Y)}}}if(S.length!=0){throw l(new Error('Section "'+S[S.length-1].name+'" was not closed properly'),Z,I,B.file)}V();y.push('";',"\nreturn buffer;","\n} catch (e) { throw {error: e, line: line}; }");var H=y.join("").replace(/buffer \+= "";\n/g,"");if(B.debug){if(typeof console!="undefined"&&console.log){console.log(H)}else{if(typeof print==="function"){print(H)}}}return H}function q(B,z){var y="view,partials,stack,lookup,escapeHTML,renderSection,render";var x=m(B,z);var A=new Function(y,x);return function(D,E){E=E||{};var C=[D];try{return A(D,E,C,t,o,j,v)}catch(F){throw l(F.error,B,F.line,z.file)}}}var a={};function u(){a={}}function e(y,x){x=x||{};if(x.cache!==false){if(!a[y]){a[y]=q(y,x)}return a[y]}return q(y,x)}function v(z,x,y){return e(z)(x,y)
}})(Mustache);;
var AD_TEMPLATE_CONTENT="<!-- target:AD_ad_widget_xlab_iknow2 -->\n<div class=\"ad-widget ad-widget-xlab-iknow2\">\n    <div class=\"logo\">\n        <a target=\"_blank\" href=\"{{logo_url}}\" style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='{{logo_image_url}}', sizingMethod='scale');\"><img src=\"{{logo_image_url}}\" /></a>\n    </div>\n    {{#products}}\n    <div class=\"figure item-{{_index}}\">\n        <a target=\"_blank\" href=\"{{url}}\" title=\"{{name}}\">&nbsp;</a>\n        <div class=\"image\" style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='{{image_url}}', sizingMethod='scale');\"><img src=\"{{image_url}}\" width=\"138\" height=\"83\"></div><div class=\"figcaption\">{{price}}</div>\n    </div>\n    {{/products}}\n</div>\n";;
var AD_STYLE_CONTENT="/*! Copyright 2012 Baidu Inc. All Rights Reserved. */\n.ad-widget-xlab-iknow2{font-family:arial,sans-serif;background:url(//bs.baidu.com/adtest/e66cd72a18adb4accc82e922d70a9afe.png) no-repeat;width:270px;height:240px;padding:5px;*zoom:1}.ad-widget-xlab-iknow2:before,.ad-widget-xlab-iknow2:after{display:table;content:\"\"}.ad-widget-xlab-iknow2:after{clear:both}.ad-widget-xlab-iknow2 .logo a{display:block;cursor:pointer;width:65px;height:52px}.ad-widget-xlab-iknow2 .logo img{width:65px;height:52px;border:0;display:block}.ie6 .ad-widget-xlab-iknow2 .logo img{display:none}.ad-widget-xlab-iknow2 .figure,.ad-widget-xlab-iknow2 .figcaption{margin:0;padding:0;float:left}.ad-widget-xlab-iknow2 .figure{height:83px;padding-top:5px;padding-left:35px;cursor:pointer;position:relative}.ad-widget-xlab-iknow2 .figure a{text-decoration:none;display:inline-block;zoom:1;z-index:100;position:absolute;width:250px;height:83px;left:0;background:white;opacity:0;filter:alpha(opacity=0)}\n.ad-widget-xlab-iknow2 .image{float:left;width:138px;height:83px;overflow:hidden;text-align:center}.ie6 .ad-widget-xlab-iknow2 .image img{display:none}.ad-widget-xlab-iknow2 .figcaption{padding:2px 0 0 25px;color:white;font-family:arial,'Microsoft YaHei','\u9ed1\u4f53',sans-serif;font-size:16px}.ad-widget-xlab-iknow2 .item-1 .figcaption{padding-top:6px}#canvas{width:270px;height:240px;overflow:hidden}";;
/*! Copyright 2012 Baidu Inc. All Rights Reserved. */
var T,baidu=T=baidu||{version:"1.5.0"};baidu.guid="$BAIDU$";window[baidu.guid]=window[baidu.guid]||{};baidu.abstractMethod=function(){throw Error("unimplemented abstract method")};baidu.dom=baidu.dom||{};baidu.dom.g=function(a){if("string"==typeof a||a instanceof String){return document.getElementById(a)}else{if(a&&a.nodeName&&(a.nodeType==1||a.nodeType==9)){return a}}return null};baidu.g=baidu.G=baidu.dom.g;baidu.fn=baidu.fn||{};baidu.fn.blank=function(){};baidu.dom.show=function(a){a=baidu.dom.g(a);a.style.display="";return a};baidu.show=baidu.dom.show;baidu.object=baidu.object||{};baidu.extend=baidu.object.extend=function(c,a){for(var b in a){if(a.hasOwnProperty(b)){c[b]=a[b]}}return c};baidu.string=baidu.string||{};(function(){var a=new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g");
baidu.string.trim=function(b){return String(b).replace(a,"")}})();baidu.trim=baidu.string.trim;baidu.dom.addClass=function(f,g){f=baidu.dom.g(f);var b=g.split(/\s+/),a=f.className,e=" "+a+" ",d=0,c=b.length;for(;d<c;d++){if(e.indexOf(" "+b[d]+" ")<0){a+=(a?" ":"")+b[d]}}f.className=a;return f};baidu.addClass=baidu.dom.addClass;baidu.lang=baidu.lang||{};baidu.lang.inherits=function(g,e,d){var c,f,a=g.prototype,b=new Function();b.prototype=e.prototype;f=g.prototype=new b();for(c in a){f[c]=a[c]}g.prototype.constructor=g;g.superClass=e.prototype;if("string"==typeof d){f._className=d}};baidu.inherits=baidu.lang.inherits;;
function h() {
  this.k = {}
}
h.prototype.get = function(a) {
  return this.k[a] || ""
};
h.prototype.parse = function(a) {
  function c(a) {
    return u.test(a) ? c(a.replace(u, function(a, b) {
      return l[b] || q[b] || ""
    })) : a
  }
  function b(a) {
    a && k && r.push(a)
  }
  function d() {
    k && (k in l ? alert("Template: " + k + " is exist") : l[k] = r.join("\n"));
    k = null
  }
  for(var a = a.split(/\r?\n/), e = a.length, g = 0, i = /<\!--\s*target:\s*([a-zA-Z0-9_]+)\s*--\>/, v = /<\!--\s*\/target\s*--\>/, u = /<\!--\s*import:\s*([a-zA-Z0-9_\/]+)\s*--\>/, w = /<\!--\s*scope:\s*([a-zA-Z0-9_]+)\s*--\>/, D = /<\!--\/scope--\>/, m, f, j, o, q = this.k, r = [], k, l = {};g < e;g++) {
    f = a[g], 0 >= f.length || (i.lastIndex = -1, w.lastIndex = -1, (j = w.exec(f)) ? o = j[1] : (j = D.exec(f)) ? o = void 0 : (j = i.exec(f)) ? (j = o ? o + "/" + j[1] : j[1], f = f.split(i), b(f[0]), d(), r = [], k = j, b(f[2])) : v.test(f) ? (f = f.split(v), b(f[0]), d()) : b(f))
  }
  d();
  for(m in l) {
    q[m] && alert("Template: " + m + " already exists!"), q[m] = c(l[m])
  }
};
var n = new h;
function p() {
}
;function s() {
  this.m = []
}
baidu.inherits(s, p);
function t(a) {
  this.m = [];
  this.d = a;
  this.f = "ad-w-" + Math.floor(2147483648 * Math.random()).toString(36)
}
baidu.inherits(t, s);
function x(a) {
  if(!a.h) {
    throw Error("Widget's view can not be undefined.");
  }
  var c = n.get(a.h), b = baidu.extend(a.d, {_id:function() {
    return function(b) {
      return a.c(b)
    }
  }});
  return Mustache.render(c, b)
}
t.prototype.render = function() {
  var a = this.a();
  if(a) {
    var c = x(this);
    a.innerHTML = c
  }
};
t.prototype.p = baidu.fn.blank;
t.prototype.o = baidu.fn.blank;
t.prototype.a = function() {
  return baidu.g(this.c())
};
t.prototype.c = function(a) {
  return a ? this.f + "-" + a : this.f
};
t.prototype.show = function() {
  this.a() && baidu.show(this.a())
};
function y(a) {
  t.call(this, a);
  if(a = this.d.products) {
    for(var c = 0;c < a.length;c++) {
      a[c]._index = c
    }
  }
  this.h = "AD_ad_widget_xlab_iknow2"
}
baidu.inherits(y, t);
function z() {
}
z.prototype.l = baidu.abstractMethod;
function A() {
}
baidu.inherits(A, z);
A.prototype.l = function(a) {
  for(var c = ['<div class="layout">'], b = 0;b < a.length;b++) {
    c.push('<div class="ad-layout-row ad-layout-row-' + b + '">');
    for(var d = 0, e = a[b];d < e.length;d++) {
      c.push('<div class="ad-layout-col ad-layout-col-' + d + '" id="{{r' + b + "c" + d + '-id}}">{{{r' + b + "c" + d + "}}}</div>")
    }
    c.push("</div>")
  }
  c.push("</div>");
  c = '<div class="canvas">' + c.join("\n") + "</div>";
  b = {};
  for(d = 0;d < a.length;d++) {
    for(var e = 0, g = a[d], i;e < g.length;e++) {
      i = x(g[e]), b["r" + d + "c" + e + "-id"] = g[e].c(), b["r" + d + "c" + e] = i
    }
  }
  return i = Mustache.render(c, b)
};
function B(a) {
  this.n = new A;
  this.b = a
}
B.prototype.r = function(a) {
  this.j = Array.prototype.slice.call(arguments)
};
B.prototype.a = function() {
  baidu.g(this.b) || document.write('<div id="' + this.b + '"></div>');
  return baidu.g(this.b)
};
B.prototype.c = function() {
  return this.b
};
function C(a, c) {
  for(var b = 0, d = a.j;b < d.length;b++) {
    for(var e = 0, g = d[b];e < g.length;e++) {
      try {
        c(g[e])
      }catch(i) {
      }
    }
  }
}
B.prototype.show = function() {
  var a = AD_STYLE_CONTENT.replace(/#canvas/g, "#" + this.b);
  document.write('<style type="text/css">\n' + a + "\n</style>");
  var a = this.n.l(this.j), c = this.a();
  c && (c.innerHTML = a);
  C(this, function(a) {
    a.p()
  });
  C(this, function(a) {
    a.o()
  });
  baidu.show(this.c())
};
n.parse(AD_TEMPLATE_CONTENT);
var E = new B(AD_CONFIG_270x240.id);
E.r([new y(AD_CONFIG_270x240.iknow)]);
E.show();
-1 != navigator.userAgent.indexOf("MSIE 6") && baidu.addClass(E.a(), "ie6");


})();
