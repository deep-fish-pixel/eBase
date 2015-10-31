var Zepto=function(){function a(a){return null==a?String(a):U[V.call(a)]||"object"}function b(b){return"function"==a(b)}function c(a){return null!=a&&a==a.window}function d(a){return null!=a&&a.nodeType==a.DOCUMENT_NODE}function e(b){return"object"==a(b)}function f(a){return e(a)&&!c(a)&&Object.getPrototypeOf(a)==Object.prototype}function g(a){return"number"==typeof a.length}function h(a){return D.call(a,function(a){return null!=a})}function i(a){return a.length>0?x.fn.concat.apply([],a):a}function j(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function k(a){return a in G?G[a]:G[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function l(a,b){return"number"!=typeof b||H[j(a)]?b:b+"px"}function m(a){var b,c;return F[a]||(b=E.createElement(a),E.body.appendChild(b),c=getComputedStyle(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),"none"==c&&(c="block"),F[a]=c),F[a]}function n(a){return"children"in a?C.call(a.children):x.map(a.childNodes,function(a){return 1==a.nodeType?a:void 0})}function o(a,b,c){for(w in b)c&&(f(b[w])||Z(b[w]))?(f(b[w])&&!f(a[w])&&(a[w]={}),Z(b[w])&&!Z(a[w])&&(a[w]=[]),o(a[w],b[w],c)):b[w]!==v&&(a[w]=b[w])}function p(a,b){return null==b?x(a):x(a).filter(b)}function q(a,c,d,e){return b(c)?c.call(a,d,e):c}function r(a,b,c){null==c?a.removeAttribute(b):a.setAttribute(b,c)}function s(a,b){var c=a.className,d=c&&c.baseVal!==v;return b===v?d?c.baseVal:c:void(d?c.baseVal=b:a.className=b)}function t(a){var b;try{return a?"true"==a||("false"==a?!1:"null"==a?null:/^0/.test(a)||isNaN(b=Number(a))?/^[\[\{]/.test(a)?x.parseJSON(a):a:b):a}catch(c){return a}}function u(a,b){b(a);for(var c=0,d=a.childNodes.length;d>c;c++)u(a.childNodes[c],b)}var v,w,x,y,z,A,B=[],C=B.slice,D=B.filter,E=window.document,F={},G={},H={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},I=/^\s*<(\w+|!)[^>]*>/,J=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,K=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,L=/^(?:body|html)$/i,M=/([A-Z])/g,N=["val","css","html","text","data","width","height","offset"],O=["after","prepend","before","append"],P=E.createElement("table"),Q=E.createElement("tr"),R={tr:E.createElement("tbody"),tbody:P,thead:P,tfoot:P,td:Q,th:Q,"*":E.createElement("div")},S=/complete|loaded|interactive/,T=/^[\w-]*$/,U={},V=U.toString,W={},X=E.createElement("div"),Y={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},Z=Array.isArray||function(a){return a instanceof Array};return W.matches=function(a,b){if(!b||!a||1!==a.nodeType)return!1;var c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=X).appendChild(a),d=~W.qsa(e,b).indexOf(a),f&&X.removeChild(a),d},z=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},A=function(a){return D.call(a,function(b,c){return a.indexOf(b)==c})},W.fragment=function(a,b,c){var d,e,g;return J.test(a)&&(d=x(E.createElement(RegExp.$1))),d||(a.replace&&(a=a.replace(K,"<$1></$2>")),b===v&&(b=I.test(a)&&RegExp.$1),b in R||(b="*"),g=R[b],g.innerHTML=""+a,d=x.each(C.call(g.childNodes),function(){g.removeChild(this)})),f(c)&&(e=x(d),x.each(c,function(a,b){N.indexOf(a)>-1?e[a](b):e.attr(a,b)})),d},W.Z=function(a,b){return a=a||[],a.__proto__=x.fn,a.selector=b||"",a},W.isZ=function(a){return a instanceof W.Z},W.init=function(a,c){var d;if(!a)return W.Z();if("string"==typeof a)if(a=a.trim(),"<"==a[0]&&I.test(a))d=W.fragment(a,RegExp.$1,c),a=null;else{if(c!==v)return x(c).find(a);d=W.qsa(E,a)}else{if(b(a))return x(E).ready(a);if(W.isZ(a))return a;if(Z(a))d=h(a);else if(e(a))d=[a],a=null;else if(I.test(a))d=W.fragment(a.trim(),RegExp.$1,c),a=null;else{if(c!==v)return x(c).find(a);d=W.qsa(E,a)}}return W.Z(d,a)},x=function(a,b){return W.init(a,b)},x.extend=function(a){var b,c=C.call(arguments,1);return"boolean"==typeof a&&(b=a,a=c.shift()),c.forEach(function(c){o(a,c,b)}),a},W.qsa=function(a,b){var c,e="#"==b[0],f=!e&&"."==b[0],g=e||f?b.slice(1):b,h=T.test(g);return d(a)&&h&&e?(c=a.getElementById(g))?[c]:[]:1!==a.nodeType&&9!==a.nodeType?[]:C.call(h&&!e?f?a.getElementsByClassName(g):a.getElementsByTagName(b):a.querySelectorAll(b))},x.contains=E.documentElement.contains?function(a,b){return a!==b&&a.contains(b)}:function(a,b){for(;b&&(b=b.parentNode);)if(b===a)return!0;return!1},x.type=a,x.isFunction=b,x.isWindow=c,x.isArray=Z,x.isPlainObject=f,x.isEmptyObject=function(a){var b;for(b in a)return!1;return!0},x.inArray=function(a,b,c){return B.indexOf.call(b,a,c)},x.camelCase=z,x.trim=function(a){return null==a?"":String.prototype.trim.call(a)},x.uuid=0,x.support={},x.expr={},x.map=function(a,b){var c,d,e,f=[];if(g(a))for(d=0;d<a.length;d++)c=b(a[d],d),null!=c&&f.push(c);else for(e in a)c=b(a[e],e),null!=c&&f.push(c);return i(f)},x.each=function(a,b){var c,d;if(g(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},x.grep=function(a,b){return D.call(a,b)},window.JSON&&(x.parseJSON=JSON.parse),x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){U["[object "+b+"]"]=b.toLowerCase()}),x.fn={forEach:B.forEach,reduce:B.reduce,push:B.push,sort:B.sort,indexOf:B.indexOf,concat:B.concat,map:function(a){return x(x.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return x(C.apply(this,arguments))},ready:function(a){return S.test(E.readyState)&&E.body?a(x):E.addEventListener("DOMContentLoaded",function(){a(x)},!1),this},get:function(a){return a===v?C.call(this):this[a>=0?a:a+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(a){return B.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},filter:function(a){return b(a)?this.not(this.not(a)):x(D.call(this,function(b){return W.matches(b,a)}))},add:function(a,b){return x(A(this.concat(x(a,b))))},is:function(a){return this.length>0&&W.matches(this[0],a)},not:function(a){var c=[];if(b(a)&&a.call!==v)this.each(function(b){a.call(this,b)||c.push(this)});else{var d="string"==typeof a?this.filter(a):g(a)&&b(a.item)?C.call(a):x(a);this.forEach(function(a){d.indexOf(a)<0&&c.push(a)})}return x(c)},has:function(a){return this.filter(function(){return e(a)?x.contains(this,a):x(this).find(a).size()})},eq:function(a){return-1===a?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!e(a)?a:x(a)},last:function(){var a=this[this.length-1];return a&&!e(a)?a:x(a)},find:function(a){var b,c=this;return b=a?"object"==typeof a?x(a).filter(function(){var a=this;return B.some.call(c,function(b){return x.contains(b,a)})}):1==this.length?x(W.qsa(this[0],a)):this.map(function(){return W.qsa(this,a)}):[]},closest:function(a,b){var c=this[0],e=!1;for("object"==typeof a&&(e=x(a));c&&!(e?e.indexOf(c)>=0:W.matches(c,a));)c=c!==b&&!d(c)&&c.parentNode;return x(c)},parents:function(a){for(var b=[],c=this;c.length>0;)c=x.map(c,function(a){return(a=a.parentNode)&&!d(a)&&b.indexOf(a)<0?(b.push(a),a):void 0});return p(b,a)},parent:function(a){return p(A(this.pluck("parentNode")),a)},children:function(a){return p(this.map(function(){return n(this)}),a)},contents:function(){return this.map(function(){return C.call(this.childNodes)})},siblings:function(a){return p(this.map(function(a,b){return D.call(n(b.parentNode),function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return x.map(this,function(b){return b[a]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=m(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){var c=b(a);if(this[0]&&!c)var d=x(a).get(0),e=d.parentNode||this.length>1;return this.each(function(b){x(this).wrapAll(c?a.call(this,b):e?d.cloneNode(!0):d)})},wrapAll:function(a){if(this[0]){x(this[0]).before(a=x(a));for(var b;(b=a.children()).length;)a=b.first();x(a).append(this)}return this},wrapInner:function(a){var c=b(a);return this.each(function(b){var d=x(this),e=d.contents(),f=c?a.call(this,b):a;e.length?e.wrapAll(f):d.append(f)})},unwrap:function(){return this.parent().each(function(){x(this).replaceWith(x(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(a){return this.each(function(){var b=x(this);(a===v?"none"==b.css("display"):a)?b.show():b.hide()})},prev:function(a){return x(this.pluck("previousElementSibling")).filter(a||"*")},next:function(a){return x(this.pluck("nextElementSibling")).filter(a||"*")},html:function(a){return 0 in arguments?this.each(function(b){var c=this.innerHTML;x(this).empty().append(q(this,a,b,c))}):0 in this?this[0].innerHTML:null},text:function(a){return 0 in arguments?this.each(function(b){var c=q(this,a,b,this.textContent);this.textContent=null==c?"":""+c}):0 in this?this[0].textContent:null},attr:function(a,b){var c;return"string"!=typeof a||1 in arguments?this.each(function(c){if(1===this.nodeType)if(e(a))for(w in a)r(this,w,a[w]);else r(this,a,q(this,b,c,this.getAttribute(a)))}):this.length&&1===this[0].nodeType?!(c=this[0].getAttribute(a))&&a in this[0]?this[0][a]:c:v},removeAttr:function(a){return this.each(function(){1===this.nodeType&&r(this,a)})},prop:function(a,b){return a=Y[a]||a,1 in arguments?this.each(function(c){this[a]=q(this,b,c,this[a])}):this[0]&&this[0][a]},data:function(a,b){var c="data-"+a.replace(M,"-$1").toLowerCase(),d=1 in arguments?this.attr(c,b):this.attr(c);return null!==d?t(d):v},val:function(a){return 0 in arguments?this.each(function(b){this.value=q(this,a,b,this.value)}):this[0]&&(this[0].multiple?x(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(a){if(a)return this.each(function(b){var c=x(this),d=q(this,a,b,c.offset()),e=c.offsetParent().offset(),f={top:d.top-e.top,left:d.left-e.left};"static"==c.css("position")&&(f.position="relative"),c.css(f)});if(!this.length)return null;var b=this[0].getBoundingClientRect();return{left:b.left+window.pageXOffset,top:b.top+window.pageYOffset,width:Math.round(b.width),height:Math.round(b.height)}},css:function(b,c){if(arguments.length<2){var d=this[0],e=getComputedStyle(d,"");if(!d)return;if("string"==typeof b)return d.style[z(b)]||e.getPropertyValue(b);if(Z(b)){var f={};return x.each(Z(b)?b:[b],function(a,b){f[b]=d.style[z(b)]||e.getPropertyValue(b)}),f}}var g="";if("string"==a(b))c||0===c?g=j(b)+":"+l(b,c):this.each(function(){this.style.removeProperty(j(b))});else for(w in b)b[w]||0===b[w]?g+=j(w)+":"+l(w,b[w])+";":this.each(function(){this.style.removeProperty(j(w))});return this.each(function(){this.style.cssText+=";"+g})},index:function(a){return a?this.indexOf(x(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return a?B.some.call(this,function(a){return this.test(s(a))},k(a)):!1},addClass:function(a){return a?this.each(function(b){y=[];var c=s(this),d=q(this,a,b,c);d.split(/\s+/g).forEach(function(a){x(this).hasClass(a)||y.push(a)},this),y.length&&s(this,c+(c?" ":"")+y.join(" "))}):this},removeClass:function(a){return this.each(function(b){return a===v?s(this,""):(y=s(this),q(this,a,b,y).split(/\s+/g).forEach(function(a){y=y.replace(k(a)," ")}),void s(this,y.trim()))})},toggleClass:function(a,b){return a?this.each(function(c){var d=x(this),e=q(this,a,c,s(this));e.split(/\s+/g).forEach(function(a){(b===v?!d.hasClass(a):b)?d.addClass(a):d.removeClass(a)})}):this},scrollTop:function(a){if(this.length){var b="scrollTop"in this[0];return a===v?b?this[0].scrollTop:this[0].pageYOffset:this.each(b?function(){this.scrollTop=a}:function(){this.scrollTo(this.scrollX,a)})}},scrollLeft:function(a){if(this.length){var b="scrollLeft"in this[0];return a===v?b?this[0].scrollLeft:this[0].pageXOffset:this.each(b?function(){this.scrollLeft=a}:function(){this.scrollTo(a,this.scrollY)})}},position:function(){if(this.length){var a=this[0],b=this.offsetParent(),c=this.offset(),d=L.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(x(a).css("margin-top"))||0,c.left-=parseFloat(x(a).css("margin-left"))||0,d.top+=parseFloat(x(b[0]).css("border-top-width"))||0,d.left+=parseFloat(x(b[0]).css("border-left-width"))||0,{top:c.top-d.top,left:c.left-d.left}}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||E.body;a&&!L.test(a.nodeName)&&"static"==x(a).css("position");)a=a.offsetParent;return a})}},x.fn.detach=x.fn.remove,["width","height"].forEach(function(a){var b=a.replace(/./,function(a){return a[0].toUpperCase()});x.fn[a]=function(e){var f,g=this[0];return e===v?c(g)?g["inner"+b]:d(g)?g.documentElement["scroll"+b]:(f=this.offset())&&f[a]:this.each(function(b){g=x(this),g.css(a,q(this,e,b,g[a]()))})}}),O.forEach(function(b,c){var d=c%2;x.fn[b]=function(){var b,e,f=x.map(arguments,function(c){return b=a(c),"object"==b||"array"==b||null==c?c:W.fragment(c)}),g=this.length>1;return f.length<1?this:this.each(function(a,b){e=d?b:b.parentNode,b=0==c?b.nextSibling:1==c?b.firstChild:2==c?b:null;var h=x.contains(E.documentElement,e);f.forEach(function(a){if(g)a=a.cloneNode(!0);else if(!e)return x(a).remove();e.insertBefore(a,b),h&&u(a,function(a){null==a.nodeName||"SCRIPT"!==a.nodeName.toUpperCase()||a.type&&"text/javascript"!==a.type||a.src||window.eval.call(window,a.innerHTML)})})})},x.fn[d?b+"To":"insert"+(c?"Before":"After")]=function(a){return x(a)[b](this),this}}),W.Z.prototype=x.fn,W.uniq=A,W.deserializeValue=t,x.zepto=W,x}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(a){function b(a){return a._zid||(a._zid=m++)}function c(a,c,f,g){if(c=d(c),c.ns)var h=e(c.ns);return(q[b(a)]||[]).filter(function(a){return!(!a||c.e&&a.e!=c.e||c.ns&&!h.test(a.ns)||f&&b(a.fn)!==b(f)||g&&a.sel!=g)})}function d(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function e(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function f(a,b){return a.del&&!s&&a.e in t||!!b}function g(a){return u[a]||s&&t[a]||a}function h(c,e,h,i,k,m,n){var o=b(c),p=q[o]||(q[o]=[]);e.split(/\s/).forEach(function(b){if("ready"==b)return a(document).ready(h);var e=d(b);e.fn=h,e.sel=k,e.e in u&&(h=function(b){var c=b.relatedTarget;return!c||c!==this&&!a.contains(this,c)?e.fn.apply(this,arguments):void 0}),e.del=m;var o=m||h;e.proxy=function(a){if(a=j(a),!a.isImmediatePropagationStopped()){a.data=i;var b=o.apply(c,a._args==l?[a]:[a].concat(a._args));return b===!1&&(a.preventDefault(),a.stopPropagation()),b}},e.i=p.length,p.push(e),"addEventListener"in c&&c.addEventListener(g(e.e),e.proxy,f(e,n))})}function i(a,d,e,h,i){var j=b(a);(d||"").split(/\s/).forEach(function(b){c(a,b,e,h).forEach(function(b){delete q[j][b.i],"removeEventListener"in a&&a.removeEventListener(g(b.e),b.proxy,f(b,i))})})}function j(b,c){return(c||!b.isDefaultPrevented)&&(c||(c=b),a.each(y,function(a,d){var e=c[a];b[a]=function(){return this[d]=v,e&&e.apply(c,arguments)},b[d]=w}),(c.defaultPrevented!==l?c.defaultPrevented:"returnValue"in c?c.returnValue===!1:c.getPreventDefault&&c.getPreventDefault())&&(b.isDefaultPrevented=v)),b}function k(a){var b,c={originalEvent:a};for(b in a)x.test(b)||a[b]===l||(c[b]=a[b]);return j(c,a)}var l,m=1,n=Array.prototype.slice,o=a.isFunction,p=function(a){return"string"==typeof a},q={},r={},s="onfocusin"in window,t={focus:"focusin",blur:"focusout"},u={mouseenter:"mouseover",mouseleave:"mouseout"};r.click=r.mousedown=r.mouseup=r.mousemove="MouseEvents",a.event={add:h,remove:i},a.proxy=function(c,d){var e=2 in arguments&&n.call(arguments,2);if(o(c)){var f=function(){return c.apply(d,e?e.concat(n.call(arguments)):arguments)};return f._zid=b(c),f}if(p(d))return e?(e.unshift(c[d],c),a.proxy.apply(null,e)):a.proxy(c[d],c);throw new TypeError("expected function")},a.fn.bind=function(a,b,c){return this.on(a,b,c)},a.fn.unbind=function(a,b){return this.off(a,b)},a.fn.one=function(a,b,c,d){return this.on(a,b,c,d,1)};var v=function(){return!0},w=function(){return!1},x=/^([A-Z]|returnValue$|layer[XY]$)/,y={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(a,b,c){return this.on(b,a,c)},a.fn.undelegate=function(a,b,c){return this.off(b,a,c)},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,d,e,f){var g,j,m=this;return b&&!p(b)?(a.each(b,function(a,b){m.on(a,c,d,b,f)}),m):(p(c)||o(e)||e===!1||(e=d,d=c,c=l),(o(d)||d===!1)&&(e=d,d=l),e===!1&&(e=w),m.each(function(l,m){f&&(g=function(a){return i(m,a.type,e),e.apply(this,arguments)}),c&&(j=function(b){var d,f=a(b.target).closest(c,m).get(0);return f&&f!==m?(d=a.extend(k(b),{currentTarget:f,liveFired:m}),(g||e).apply(f,[d].concat(n.call(arguments,1)))):void 0}),h(m,b,e,d,c,j||g)}))},a.fn.off=function(b,c,d){var e=this;return b&&!p(b)?(a.each(b,function(a,b){e.off(a,c,b)}),e):(p(c)||o(d)||d===!1||(d=c,c=l),d===!1&&(d=w),e.each(function(){i(this,b,d,c)}))},a.fn.trigger=function(b,c){return b=p(b)||a.isPlainObject(b)?a.Event(b):j(b),b._args=c,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(b):a(this).triggerHandler(b,c)})},a.fn.triggerHandler=function(b,d){var e,f;return this.each(function(g,h){e=k(p(b)?a.Event(b):b),e._args=d,e.target=h,a.each(c(h,b.type||b),function(a,b){return f=b.proxy(e),e.isImmediatePropagationStopped()?!1:void 0})}),f},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.trigger(b)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.each(function(){try{this[b]()}catch(a){}}),this}}),a.Event=function(a,b){p(a)||(b=a,a=b.type);var c=document.createEvent(r[a]||"Events"),d=!0;if(b)for(var e in b)"bubbles"==e?d=!!b[e]:c[e]=b[e];return c.initEvent(a,d,!0),j(c)}}(Zepto),function(a){function b(b,c,d){var e=a.Event(c);return a(b).trigger(e,d),!e.isDefaultPrevented()}function c(a,c,d,e){return a.global?b(c||s,d,e):void 0}function d(b){b.global&&0===a.active++&&c(b,null,"ajaxStart")}function e(b){b.global&&!--a.active&&c(b,null,"ajaxStop")}function f(a,b){var d=b.context;return b.beforeSend.call(d,a,b)===!1||c(b,d,"ajaxBeforeSend",[a,b])===!1?!1:void c(b,d,"ajaxSend",[a,b])}function g(a,b,d,e){var f=d.context,g="success";d.success.call(f,a,g,b),e&&e.resolveWith(f,[a,g,b]),c(d,f,"ajaxSuccess",[b,d,a]),i(g,b,d)}function h(a,b,d,e,f){var g=e.context;e.error.call(g,d,b,a),f&&f.rejectWith(g,[d,b,a]),c(e,g,"ajaxError",[d,e,a||b]),i(b,d,e)}function i(a,b,d){var f=d.context;d.complete.call(f,b,a),c(d,f,"ajaxComplete",[b,d]),e(d)}function j(){}function k(a){return a&&(a=a.split(";",2)[0]),a&&(a==x?"html":a==w?"json":u.test(a)?"script":v.test(a)&&"xml")||"text"}function l(a,b){return""==b?a:(a+"&"+b).replace(/[&?]{1,2}/,"?")}function m(b){b.processData&&b.data&&"string"!=a.type(b.data)&&(b.data=a.param(b.data,b.traditional)),!b.data||b.type&&"GET"!=b.type.toUpperCase()||(b.url=l(b.url,b.data),b.data=void 0)}function n(b,c,d,e){return a.isFunction(c)&&(e=d,d=c,c=void 0),a.isFunction(d)||(e=d,d=void 0),{url:b,data:c,success:d,dataType:e}}function o(b,c,d,e){var f,g=a.isArray(c),h=a.isPlainObject(c);a.each(c,function(c,i){f=a.type(i),e&&(c=d?e:e+"["+(h||"object"==f||"array"==f?c:"")+"]"),!e&&g?b.add(i.name,i.value):"array"==f||!d&&"object"==f?o(b,i,d,c):b.add(c,i)})}var p,q,r=0,s=window.document,t=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,u=/^(?:text|application)\/javascript/i,v=/^(?:text|application)\/xml/i,w="application/json",x="text/html",y=/^\s*$/;a.active=0,a.ajaxJSONP=function(b,c){if(!("type"in b))return a.ajax(b);var d,e,i=b.jsonpCallback,j=(a.isFunction(i)?i():i)||"jsonp"+ ++r,k=s.createElement("script"),l=window[j],m=function(b){a(k).triggerHandler("error",b||"abort")},n={abort:m};return c&&c.promise(n),a(k).on("load error",function(f,i){clearTimeout(e),a(k).off().remove(),"error"!=f.type&&d?g(d[0],n,b,c):h(null,i||"error",n,b,c),window[j]=l,d&&a.isFunction(l)&&l(d[0]),l=d=void 0}),f(n,b)===!1?(m("abort"),n):(window[j]=function(){d=arguments},k.src=b.url.replace(/\?(.+)=\?/,"?$1="+j),s.head.appendChild(k),b.timeout>0&&(e=setTimeout(function(){m("timeout")},b.timeout)),n)},a.ajaxSettings={type:"GET",beforeSend:j,success:j,error:j,complete:j,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:w,xml:"application/xml, text/xml",html:x,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},a.ajax=function(b){var c=a.extend({},b||{}),e=a.Deferred&&a.Deferred();for(p in a.ajaxSettings)void 0===c[p]&&(c[p]=a.ajaxSettings[p]);d(c),c.crossDomain||(c.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(c.url)&&RegExp.$2!=window.location.host),c.url||(c.url=window.location.toString()),m(c);var i=c.dataType,n=/\?.+=\?/.test(c.url);if(n&&(i="jsonp"),c.cache!==!1&&(b&&b.cache===!0||"script"!=i&&"jsonp"!=i)||(c.url=l(c.url,"_="+Date.now())),"jsonp"==i)return n||(c.url=l(c.url,c.jsonp?c.jsonp+"=?":c.jsonp===!1?"":"callback=?")),a.ajaxJSONP(c,e);var o,r=c.accepts[i],s={},t=function(a,b){s[a.toLowerCase()]=[a,b]},u=/^([\w-]+:)\/\//.test(c.url)?RegExp.$1:window.location.protocol,v=c.xhr(),w=v.setRequestHeader;if(e&&e.promise(v),c.crossDomain||t("X-Requested-With","XMLHttpRequest"),t("Accept",r||"*/*"),(r=c.mimeType||r)&&(r.indexOf(",")>-1&&(r=r.split(",",2)[0]),v.overrideMimeType&&v.overrideMimeType(r)),(c.contentType||c.contentType!==!1&&c.data&&"GET"!=c.type.toUpperCase())&&t("Content-Type",c.contentType||"application/x-www-form-urlencoded"),c.headers)for(q in c.headers)t(q,c.headers[q]);if(v.setRequestHeader=t,v.onreadystatechange=function(){if(4==v.readyState){v.onreadystatechange=j,clearTimeout(o);var b,d=!1;if(v.status>=200&&v.status<300||304==v.status||0==v.status&&"file:"==u){i=i||k(c.mimeType||v.getResponseHeader("content-type")),b=v.responseText;try{"script"==i?(1,eval)(b):"xml"==i?b=v.responseXML:"json"==i&&(b=y.test(b)?null:a.parseJSON(b))}catch(f){d=f}d?h(d,"parsererror",v,c,e):g(b,v,c,e)}else h(v.statusText||null,v.status?"error":"abort",v,c,e)}},f(v,c)===!1)return v.abort(),h(null,"abort",v,c,e),v;if(c.xhrFields)for(q in c.xhrFields)v[q]=c.xhrFields[q];var x="async"in c?c.async:!0;v.open(c.type,c.url,x,c.username,c.password);for(q in s)w.apply(v,s[q]);return c.timeout>0&&(o=setTimeout(function(){v.onreadystatechange=j,v.abort(),h(null,"timeout",v,c,e)},c.timeout)),v.send(c.data?c.data:null),v},a.get=function(){return a.ajax(n.apply(null,arguments))},a.post=function(){var b=n.apply(null,arguments);return b.type="POST",a.ajax(b)},a.getJSON=function(){var b=n.apply(null,arguments);return b.dataType="json",a.ajax(b)},a.fn.load=function(b,c,d){if(!this.length)return this;var e,f=this,g=b.split(/\s/),h=n(b,c,d),i=h.success;return g.length>1&&(h.url=g[0],e=g[1]),h.success=function(b){f.html(e?a("<div>").html(b.replace(t,"")).find(e):b),i&&i.apply(f,arguments)},a.ajax(h),this};var z=encodeURIComponent;a.param=function(a,b){var c=[];return c.add=function(a,b){this.push(z(a)+"="+z(b))},o(c,a,b),c.join("&").replace(/%20/g,"+")}}(Zepto),function(a){a.fn.serializeArray=function(){var b,c=[];return a([].slice.call(this.get(0).elements)).each(function(){b=a(this);var d=b.attr("type");"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=d&&"reset"!=d&&"button"!=d&&("radio"!=d&&"checkbox"!=d||this.checked)&&c.push({name:b.attr("name"),value:b.val()})}),c},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(b)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(a){"__proto__"in{}||a.extend(a.zepto,{Z:function(b,c){return b=b||[],a.extend(b,a.fn),b.selector=c||"",b.__Z=!0,b},isZ:function(b){return"array"===a.type(b)&&"__Z"in b}});try{getComputedStyle(void 0)}catch(b){var c=getComputedStyle;window.getComputedStyle=function(a){try{return c(a)}catch(b){return null}}}}(Zepto),function(a){function b(c){var d=[["resolve","done",a.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",a.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",a.Callbacks({memory:1})]],e="pending",f={state:function(){return e},always:function(){return g.done(arguments).fail(arguments),this},then:function(){var c=arguments;return b(function(b){a.each(d,function(d,e){var h=a.isFunction(c[d])&&c[d];g[e[1]](function(){var c=h&&h.apply(this,arguments);if(c&&a.isFunction(c.promise))c.promise().done(b.resolve).fail(b.reject).progress(b.notify);else{var d=this===f?b.promise():this,g=h?[c]:arguments;b[e[0]+"With"](d,g)}})}),c=null}).promise()},promise:function(b){return null!=b?a.extend(b,f):f}},g={};return a.each(d,function(a,b){var c=b[2],h=b[3];f[b[1]]=c.add,h&&c.add(function(){e=h},d[1^a][2].disable,d[2][2].lock),g[b[0]]=function(){return g[b[0]+"With"](this===g?f:this,arguments),this},g[b[0]+"With"]=c.fireWith}),f.promise(g),c&&c.call(g,g),g}var c=Array.prototype.slice;a.when=function(d){var e,f,g,h=c.call(arguments),i=h.length,j=0,k=1!==i||d&&a.isFunction(d.promise)?i:0,l=1===k?d:b(),m=function(a,b,d){return function(f){b[a]=this,d[a]=arguments.length>1?c.call(arguments):f,d===e?l.notifyWith(b,d):--k||l.resolveWith(b,d)}};if(i>1)for(e=new Array(i),f=new Array(i),g=new Array(i);i>j;++j)h[j]&&a.isFunction(h[j].promise)?h[j].promise().done(m(j,g,h)).fail(l.reject).progress(m(j,f,e)):--k;return k||l.resolveWith(g,h),l.promise()},a.Deferred=b}(Zepto),function(a){a.Callbacks=function(b){b=a.extend({},b);var c,d,e,f,g,h,i=[],j=!b.once&&[],k=function(a){for(c=b.memory&&a,d=!0,h=f||0,f=0,g=i.length,e=!0;i&&g>h;++h)if(i[h].apply(a[0],a[1])===!1&&b.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i.length=0:l.disable())},l={add:function(){if(i){var d=i.length,h=function(c){a.each(c,function(a,c){"function"==typeof c?b.unique&&l.has(c)||i.push(c):c&&c.length&&"string"!=typeof c&&h(c)})};h(arguments),e?g=i.length:c&&(f=d,k(c))}return this},remove:function(){return i&&a.each(arguments,function(b,c){for(var d;(d=a.inArray(c,i,d))>-1;)i.splice(d,1),e&&(g>=d&&--g,h>=d&&--h)}),this},has:function(b){return!(!i||!(b?a.inArray(b,i)>-1:i.length))},empty:function(){return g=i.length=0,this},disable:function(){return i=j=c=void 0,this},disabled:function(){return!i},lock:function(){return j=void 0,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return!i||d&&!j||(b=b||[],b=[a,b.slice?b.slice():b],e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!d}};return l}}(Zepto),function(a){a.Callbacks=function(b){b=a.extend({},b);var c,d,e,f,g,h,i=[],j=!b.once&&[],k=function(a){for(c=b.memory&&a,d=!0,h=f||0,f=0,g=i.length,e=!0;i&&g>h;++h)if(i[h].apply(a[0],a[1])===!1&&b.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i.length=0:l.disable())},l={add:function(){if(i){var d=i.length,h=function(c){a.each(c,function(a,c){"function"==typeof c?b.unique&&l.has(c)||i.push(c):c&&c.length&&"string"!=typeof c&&h(c)})};h(arguments),e?g=i.length:c&&(f=d,k(c))}return this},remove:function(){return i&&a.each(arguments,function(b,c){for(var d;(d=a.inArray(c,i,d))>-1;)i.splice(d,1),e&&(g>=d&&--g,h>=d&&--h)}),this},has:function(b){return!(!i||!(b?a.inArray(b,i)>-1:i.length))},empty:function(){return g=i.length=0,this},disable:function(){return i=j=c=void 0,this},disabled:function(){return!i},lock:function(){return j=void 0,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return!i||d&&!j||(b=b||[],b=[a,b.slice?b.slice():b],e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!d}};return l}}(Zepto),!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b);
}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;e.openTag="{{",e.closeTag="}}";var z=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a){a=a.replace(/^\s/,"");var b=a.split(" "),c=b.shift(),e=b.join(" ");switch(c){case"if":a="if("+e+"){";break;case"else":b="if"===b.shift()?" if("+b.join(" ")+")":"",a="}else"+b+"{";break;case"/if":a="}";break;case"each":var f=b[0]||"$data",g=b[1]||"as",h=b[2]||"$value",i=b[3]||"$index",j=h+","+i;"as"!==g&&(f="[]"),a="$each("+f+",function("+j+"){";break;case"/each":a="});";break;case"echo":a="print("+e+");";break;case"print":case"include":a=c+"("+b.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(e)){var k=!0;0===a.indexOf("#")&&(a=a.substr(1),k=!1);for(var l=0,m=a.split("|"),n=m.length,o=m[l++];n>l;l++)o=z(o,m[l]);a=(k?"=":"=#")+o}else a=d.helpers[c]?"=#"+c+"("+b.join(",")+");":"="+a}return a},"function"==typeof define?define(function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();
/**
 * v1.0.1
 * mawei(14020803)
 * qq:120290590
 */
;(function(){
	'use strict'
	/**
	 * 属性覆盖
	 */
	function extend(orig, target, deep){
		var toStr = Object.prototype.toString,
			arrayFlag = "[object Array]";
		orig = orig || {};
		for (var i in target) {
			if(deep === true && target.hasOwnProperty(i)) {
				if (typeof target[i] === "object") {
					if(!orig[i]){
						orig[i] = toStr.call(target[i]) === arrayFlag ? [] : {};
					}
					extend(orig[i], target[i]);
				}
				else {
					orig[i] = target[i];
				}
			}
			else orig[i] = target[i];
		}
		return orig;
	}
	/**
	 * 添加script事件
	 */
	function addOnloadEvent(dom, callback, fail){
		if(dom && typeof dom.onload !== 'undefined'){
			dom.onload = function(){
				this.onload = null;
				this.onerror = null;
				callback();
			};
			dom.onerror = function(){
				this.onload = null;
				this.onerror = null;
				fail();
			};
		}
		else if(dom){
			dom.onreadystatechange = function(event){
				if(this.readyState =='complete' || this.readyState =='loaded'){
					this.onreadystatechange = null;
					callback();
				}
			};
		}
	}
	function isArray(object){
		return object && typeof object==='object' &&
			Array == object.constructor;
	}
	function trimUrl(str){
		if(str){
			var ret = str.match(/^\s*(\S*)\s*$/), retS;
			if(ret){
				retS = ret[1].match(/(.*)\?+$/);
				if(retS){
					return retS[1];
				}
				else return ret[1];
			}
		}
		return str;
	}
	var compose = {
		/**
		 * 配置信息
		 */
		_config: {
			basePath:"",//基本路径
			contextPath: false,//上下文路径设置，字符串标示绝对路径，true标示从compose中获取
			paths:{}
		},
		/**
		 * 需求列表状态相关信息
		 */
		_process: [],
		/**
		 * satisfyMap记录
		 */
		_satisfies: [],
		/**
		 * 完成的js文件路径集合
		 */
		_completedPaths: {},
		/**
		 * 发生onload后获取事件源
		 */
		_onLoadEvents: [],
		/**
		 * 延迟执行
		 */
		_delayer: {
			time: 0,
			used: false,
			push: function(callback, time){
				var self = this;
				this.used = true;
				this._callback = function(){
					if(callback){
						callback();
					}
					self._timer = null;
					self._callback = null;
				};
				this.time = time || 0;
				this._timer = setTimeout(this._callback, this.time);
			},
			delay: function(time){
				if(this._timer){
					clearTimeout(this._timer);
				}
				if(this._callback){
					if(time !== undefined) this._timer = time;
					this._timer = setTimeout(this._callback, this.time);
				}
			}
		},
		/**
		 * 添加script属性配置
		 */
		initConfig: function(){
			var _config = this._config,
				scripts = document.getElementsByTagName('script'),
				l = scripts.length, script, contextPath, dependOnload, basePath, param, main;
			for(var i=0; i<l; i++){
				script = scripts[i];
				contextPath = script.getAttribute('data-contextpath') || '';
				dependOnload = script.getAttribute('data-dependonload') || '';
				basePath = script.getAttribute('data-basepath') || '';
				param = script.getAttribute('data-param') || '';
				main = script.getAttribute('data-main') || '';
				if(contextPath || dependOnload || basePath){
					_config.contextPath = contextPath?(contextPath+"/"):"";
					_config.dependOnload = dependOnload;
					_config.basePath = basePath;
					_config.param = param;
					_config.main = main;
					break;
				}
			}
		},
		/*
		 *加载main入口文件
		 * */
		initLoad: function(){
			var _config = this._config,
				main = _config.main,
				path;
			if(main){
				path = this.handlePath(main, _config.contextPath, _config.basePath, _config.param);
				var head = document.head || document.getElementsByTagName('head')[0],
					element = this.createElement('script', path);
				if(element){
					head.appendChild(element);
				}
			}

		},
		/**
		 * 添加javascript配置
		 */
		config: function(opt){
			var _config = this._config;
			extend(_config, opt, true);
			_config.contextPath = _config.contextPath || "";
			_config.dependOnload = _config.dependOnload || "";
			_config.basePath = _config.basePath || "";
			_config.param = _config.param || "";
		},
		/**
		 * 获取项目路径
		 */
		getContext: function(opt){
			return this._config.contextPath;
		},
		/**
		 * 需求

		 * param depend 判断此模块是否有依赖并需要提前获取该资源
		 */
		require: function(pathId, requires, success, fail, existObjectNames){
			this.req(pathId, requires, success, fail, existObjectNames);
		},
		/**
		 * 异步请求资源
		 */
		async: function(pathId, requires, success, fail, existObjectNames){
			this.req(pathId, requires, success, fail, existObjectNames, {method:'async'});
		},
		/**
		 * 并发请求资源,建议加载css资源等
		 */
		paral: function(pathId, requires, success, fail, existObjectNames){
			this.req(pathId, requires, success, fail, existObjectNames, {method:'paral'});
		},

		/**
		 * 需求处理函数
		 *
		 */
		req: function(pathId, requires, callback, fail, existObjectNames, opts){
			this._delayer.delay();
			if(isArray(pathId) || typeof pathId  === 'function'){
				existObjectNames = fail;
				fail = callback;
				callback = requires;
				requires = pathId;
				pathId = null;
			}
			if(typeof requires  === 'function'){
				existObjectNames = fail;
				fail = callback;
				callback = requires;
				requires = [];
			}
			if(!callback || typeof callback === 'string'){
				callback = function(){}
			}
			if(typeof fail  !== 'function'){
				existObjectNames = fail;
				fail = function(){};
			}
			if(existObjectNames === true){
				existObjectNames = null;
			}
			requires._opts = opts = opts || {};
			requires._existObjectNames = existObjectNames || [];
			requires.pathId = pathId;
			requires.callback = callback;
			requires.contextPath = this._config.contextPath;
			requires.param = this._config.param;
			requires.basePath = this._config.basePath;
			requires.fail = fail;
			requires.method = opts.method;
			var handlingRequire = this._handlingRequire;
			if(opts.method === 'paral'){
				requires = this.preHandleRequires(requires);
				return this.handleRequire(requires[0]);
			}
			else if(handlingRequire){
				if(!handlingRequire.completed){
					if(opts.method !== 'async' && handlingRequire.waiting){
						requires.parent = handlingRequire;
					}
					else{
						return this.preHandleRequires(requires);
					}
				}
			}
			requires = this.preHandleRequires(requires);
			this.handleRequire(requires[0]);
		},
		/**
		 * 满足
		 */
		satisfy: function(require){
			if(require){
				if(require.method != 'paral'){
					var loadRequire = this._onLoadEvents.shift(),
						handlingRequire = this._handlingRequire;;
					if(loadRequire !== handlingRequire && (loadRequire && loadRequire._process.length)){
						return;
					}
				}
				if(require.type == 'css'){
					require.completed = true;
				}
				else{
					if(!require.resourceObject){
						this.checkAndSetObjectByName(require);
					}
				}
				if(require.method == 'paral'){
					this.checkComplete(require);
				}
				else{
					this.excCompleteAndExcNext(require);
				}
			}
		},
		/**
		 * 满足
		 */
		unsatisfy: function(require){
			if(require.method != 'paral') {
				this._onLoadEvents.shift();
			}
			var requires = this.getRequires(require);
			if(requires.fail){
				requires.fail();
				requires.failed = true;
				delete require.fail;
			}
			if(this._handlingRequire === require){
				this._handlingRequire = null;
			}
			if(require.element){
				require.element.remove();
			}
			this.deleteRequires(require);
		},
		/**
		 * 预处理
		 */
		preHandleRequires: function(requires){
			var l = requires.length,
				callback = requires.callback,
				pathId = requires.pathId,
				existObjectNames = requires._existObjectNames,
				_process = requires.parent? requires.parent._process: this._process,
				_satisfies = requires.parent? requires.parent._satisfies: this._satisfies,
				i = _process.length,
				jsRegExp = /\.js$|\.js\?/,
				path,
				_requires = [],
				count = 0,
				type,
				_satisfy,
				require,
				resourceObject;
			for(var i=0; i<_process.length; i++){
				count += _process[i].length;
			}
			for(var j=0; j<=requires.length; j++){
				path = requires[j];
				type = path&&path.match(/\.css$/)?'css':'js';
				_satisfy = _satisfies[count+j];
				resourceObject = _satisfy && _satisfy.value;
				require = {
					type: type,
					completed: _satisfy?true:false,
					j: j,
					i: i,
					parent: requires.parent,
					resourceObject: resourceObject,
					resourceObjectPath: existObjectNames[j],
					_process:[],
					_satisfies:[],
					method: requires.method
				};
				if(path){
					var p = this._config.paths[path];
					if(p){
						require.path = p&&p.match(jsRegExp)?p : p+'.js';
						require.resourceObjectPath = path;
					}
					else{
						this.handleRequirePath(require, path, requires);
					}
				}
				if(j == requires.length){
					require.callback = callback;
					if(pathId){
						this.handleRequirePath(require, pathId, requires);
					}
				}
				if(_satisfy){
					this._completedPaths[require.path] = require;
				}
				_requires.push(require);
			}
			if(pathId){
				this.handleRequirePath(_requires, pathId, requires);
			}
			if(requires.fail){
				_requires.fail = requires.fail;
			}
			_process.push(_requires);
			return _requires;
		},
		/**
		 * 处理require path
		 */
		handleRequirePath: function(require, pathId, requires){
			var basePath = requires.basePath,
				contextPath = requires.contextPath,
				param = requires.param;
			require.path = this.handlePath(pathId, contextPath, basePath, param);
		},
		/**
		 * 处理普通的path
		 */
		handlePath: function(pathId, contextPath, basePath, param){
			var path,
				jsRegExp = /\.js$|\.js\?/;
			pathId = trimUrl(pathId);
			if(pathId.match(/\.css$/)){
				path = contextPath ? contextPath + '/' + pathId : pathId;
			}
			else{
				var tpath = contextPath + basePath;
				path = (tpath ? tpath + '/' : '') + (pathId.match(jsRegExp)?pathId : pathId+'.js');
			}
			if(param){
				path += pathId.match(/\.js\?/) ? pathId.match(/\?$/) ? param : '&' + param : '?'+ param;
			}
			return path;
		},
		/**
		 * 处理单个require
		 */
		handleRequire: function(require){
			//对处理过的需求直接返回
			if(!require || !require.parent && require.completed){
				return;
			}
			var paral = require.method == 'paral';
			if(!paral){
				this._handlingRequire = require;
				this.checkAndSetObjectByName(require);
			}
			if(!require.completed && require.callback && !paral){
				this.checkComplete(require);
			}
			else if( !paral && (!require.path || require.resourceObject || (require.completed == true && require.type === 'css'))){
				this.excCompleteAndExcNext(require);
			}
			else{
				if(paral){
					var requires = this.getRequires(require);
					for(var i=0; i<requires.length; i++){
						require = requires[i];
						this.checkAndSetObjectByName(require);
						if(require.completed){
							this.checkComplete(require)
						}
						else{
							this.addEvent(require);
						}
					}
				}
				else{
					require.waiting = false;
					this.addEvent(require);
				}
			}
		},
		/**
		 * 注册回调事件
		 */
		addEvent: function(require){
			var element = this.createElement(require.type, require.path),
				self = this;
			if(!element){
				return;
			}
			if(this._config.dependOnload){
				addOnloadEvent(element, function(){
					require.waiting = false;
					self.satisfy(require);
				}, function(){
					require.waiting = false;
					self.unsatisfy(require);
				});
				require.element = element;
			}
			var head = document.head || document.getElementsByTagName('head')[0];
			if(require.method != 'paral') {
				this._onLoadEvents.push(require);
				setTimeout(function(){
					head.appendChild(element);
					require.waiting = true;
				}, 0);
			}
			else{
				head.appendChild(element);
			}

		},
		/**
		 * 完成当前complete并执行下一个需求
		 */
		createElement: function(type, path){
			if(!path)return;
			var element, config = this._config;
			if(type === 'css'){
				element = document.createElement("link");
				element.setAttribute('type', 'text/css');
				element.setAttribute('rel', 'stylesheet');
				element.setAttribute('href', path);
			}
			else{
				element = document.createElement("script");
				element.setAttribute('type', 'text/javascript');
				element.setAttribute('src', path);
				element.setAttribute('data-basepath', config.basePath);
			}
			element.setAttribute('data-contextpath', config.contextPath);
			element.setAttribute('data-dependonload', config.dependOnload);
			return element;
		},
		/**
		 * 完成当前complete并执行下一个需求
		 */
		excCompleteAndExcNext: function(require){
			require.completed = true;
			var nextRequire = this.excCompleteAnGetNext(require);
			this.handleRequire(nextRequire);
		},
		/**
		 * 获取下一个需求并判断当前是否需要执行回调
		 */
		excCompleteAnGetNext: function(require){
			this.checkComplete(require);
			return this.getNextRequire(require);
		},
		/**
		 * 获取下一个需求
		 */
		getNextRequire: function(require){
			if(!require)return;
			if(require._process && require._process.length){
				var _process = require._process, l = _process.length;
				for(var i=0; i<l; i++){
					if(!_process[i]._called){
						return _process[i][0];
					}
				}
			}
			var i = require.i,
				j = require.j,
				_process = require.parent && require.parent._process?require.parent._process:this._process,
				requires = _process[require.i];
			if(!requires){
				return require;
			}
			else if(j == requires.length - 1 || (j==0 && requires.length == 0)){
				i += 1;
				j = 0;
				requires = _process[i];
				if(!requires){
					if(require.parent){
						this.checkComplete(require.parent);
						return this.getNextRequire(require.parent);
					}
				}
			}
			else{
				j += 1;
			}
			var nextRequire = _process[i] && _process[i][j];
			return nextRequire;
		},
		/**
		 * 是否需要执行回调
		 */
		checkComplete: function(require){
			if(!require)return;
			this._handling = true;
			var j = require.j,
				requires = this.getRequires(require),
				resources = [];
			if(require.method == 'paral'){
				var object;
				for(var i=0; i<requires.length; i++){
					require = requires[i];
					if(!require || !require.completed){
						break;
					}
					else{
						object = require.resourceObject;
						if(!object){
							object = this.checkAndSetObjectByName(requires[i]);
						}
						resources.push(object);
					}
				}
				if(i == requires.length -1){
					require.completed = true;
					require.callback.apply({
						success: true
					}, resources);
					this.handleRequire(this.getNextRequire(require));
				}
			}
			else if(requires && (requires.length == 0 || j == requires.length - 1)){
				if(require._process && require._process.length){
					var _process = require._process, l = _process.length;
					for(var i=0; i<l; i++){
						if(!_process[i]._called){
							return;
						}
					}
				}
				if(!requires._called){
					//先把状态置为true，防止重复
					var l = requires.length, object;
					for(var i=0; i<l-1; i++){
						object = requires[i].resourceObject;
						if(!object){
							object = this.checkAndSetObjectByName(requires[i]);
						}
						resources.push(object);
					}
					var ret = require.callback.apply({
						success: true
					}, resources);
					require.resourceObject = ret;
					require.completed = true;
					if(requires.path){
						this._completedPaths[require.path] = require;
					}
					if(require.parent){
						require.parent.resourceObject = ret;
						require.parent.completed = true;

						(requires || require.parent._process[0])._called = true;
					}
					else{
						this._process[require.i]._called = true;
					}
					if(require !== this._handlingRequire){
						return;
					}
					if(require.parent){
						this.excCompleteAndExcNext(require.parent);
					}
					else{
						this.handleRequire(this.getNextRequire(require));
					}
				}
			}
		},
		/**
		 * 获取requires
		 */
		getRequires: function (require) {
			var i = require.i,
				j = require.j,
				_process = require.parent && require.parent._process ? require.parent._process : this._process,
				requires = _process[require.i];
			return requires;
		},
		/**
		 * 删除requires
		 */
		deleteRequires: function (require) {
			var i = require.i,
				j = require.j,
				parent = require.parent && require.parent._process ? require.parent : this,
				_process = parent._process,
				requires = _process[require.i];
			if(requires){
				parent._process =  _process.slice(0, i).concat( _process.slice(i+1));
			}
		},
		/**
		 * 判断当前对象是否存在，如存在，则不加载对应组的js文件
		 */
		checkAndSetObjectByName: function(require){
			var origRequire = this._completedPaths[require.path],
				resourceObjectPath = require.resourceObjectPath,
				resourceObject = resourceObject;
			if(require.type == 'css'){
				if(origRequire){
					require.completed = true;
					require.resourceObject = true;
					return true;
				}
				else if(require.completed){
					this._completedPaths[require.path] = true;
					return require.resourceObject = true;
				}
				return;
			}
			if(require.resourceObject){return require.resourceObject}
			if(origRequire){
				resourceObject = origRequire.resourceObject;
				if(resourceObject){
					require.resourceObject = resourceObject;
					require.completed = true;
					return resourceObject;
				}
			}
			else if(!origRequire && require.path){
				this._completedPaths[require.path] = require;
			}
			if(!resourceObjectPath){
				return;
			}
			if(require && require.callback){
				return;
			}
			var names = resourceObjectPath.split('.'),
				namesLength = names.length,
				name,
				obj = window;
			for(var j=0; j<namesLength; j++){
				name = names[j];
				if(!(j==0 && name == 'window')){
					obj = obj && obj[name];
				}
			}
			if(!obj){
				return;
			}
			require.resourceObject = obj;
			require.completed = true;
			if(!this._completedPaths[require.path]){
				this._completedPaths[require.path] = require;
			}
			return obj;
		}
	}
	compose.initConfig();
	compose.initLoad();
	window.compose = compose;
})();