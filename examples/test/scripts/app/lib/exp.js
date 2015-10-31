/*
 * 对exp通用的功能封装
 * @author mawei
 */
;if(typeof template == 'undefined'){
	var template = {};
}
var Exp = (function($, template){
	var Exp = {
		position: {
			getHeight: function(){
				var height = document.documentElement.offsetHeight || document.body.offsetHeight;
				return height;
			},
			scrollTop: function(){
				return document.documentElement.scrollTop || document.body.scrollTop;
			},
			scrollHeight: function(){
				return document.body.scrollHeight || document.documentElement.scrollHeight;
			},
			clientHeight: function(){
				return document.documentElement.clientHeight || document.body.clientHeight;
			}
		},
		remove: function(){
			if(this.parentNode){
				this.parentNode.removeChild(this);
				return;
			}
		},
		alertBox: (function(){
			function preventScroller(event) {
				event.preventDefault();
				return false;
			}
			/**
			 * [弹窗]
			 * @return {[type]} [description]
			 * @Author: 12050231
			 * @Date:   2014-03-25 10:20:54
			 * @Last Modified by :   14020803
			 * @Last Modified time:   2014-03-25 14:20:54
			 */
			function AlertBox(opts){
				this.opts = opts || {};
				this.title = this.opts.title || '';
				this.msg = this.opts.msg || '';
				this.type = this.opts.type || 'default';
				this.hasMask = (this.opts.hasMask === false) ? false : true;
				this.confirm = this.opts.confirm || function(){};
				this.cancel = this.opts.cancel || function(){};
				var callBack = this.opts.callBack,self = this;
				this.callBack = function(){
					if(callBack){
						callBack.call(self);
					}

				};

				if(!opts.animate && opts.animate !== false ){
					opts.animate = 'alert-box-anim';
				}
				if(!opts.bgAnimate && opts.bgAnimate !== false ){
					opts.bgAnimate = 'alert-bg-anim';
				}
				this.animate = opts.animate;
				this.bgAnimate = opts.bgAnimate;
				this.scrollerClass = opts.scrollerClass;
				this.survivePeriod = opts.survivePeriod || false;
				this.createTime = new Date();
				this.delayRender = opts.delayRender===false || opts.delayRender? opts.delayRender : true;
				this.upOffset = opts.upOffset || 0;
				this.resetCallback = opts.resetCallback;
				this.asyncResetCallback = opts.asyncResetCallback;
				this.background = opts.background;
				this.bgClickReset = opts.bgClickReset;
			}
			AlertBox.prototype = {
				init: function(){
					var self = this;
					switch(self.type) {
						case "default":
							var html = '<div class="alert-box"><div class="msg">{{msg}}</div><div class="wbox"><div class="wbox-col-a btn-b btn-cancel mr20"><a href="#">取消</a></div><div class="wbox-col-a btn-c btn-confirm"><a href="#">确定</a></div></div></div>';
							break;
						case "alert":
							var html = '<div class="alert-box"><div class="msg">{{msg}}</div><div class="layout wbox"><div class="wbox-col-a btn-c btn-confirm"><a href="#">确定</a></div></div></div>';
							break;
						case "validate":
							var html = '<div class="alert-box alert-box-valide"><div class="msg">{{msg}}</div></div>';
							break;
						case "custom":
							var html = this.opts.html;
							break;
					}
					var tpl = template.compile(html)({
						msg: self.msg
					});
					//解决键盘消失后定位不准
					if(self.delayRender){
						setTimeout(function(){self.render(tpl);}, 50);
					}
					else{
						self.render(tpl);
					}
					if(self.type == "validate" && self.opts.autoCancel){
						setTimeout(function(){
							if(self.cancel){
								self.cancel();
							}
							self.reset();
						},1500);
					}
					return this;
				},
				render: function(_htmlTpl){
					var self = this;
					var body = document.body;
					if(this.opts.contextAnimate){
						var $body = $(body),
							context = $body.find('.alert-context'),
							siblings = $body.children(':not(.alert-context):not(script)');
						if(!context.length){
							context = $('<section class="alert-context"></section>').appendTo($body);
						}
						context.append(siblings);
						this.context = context;
					}
					body.insertAdjacentHTML('beforeend', _htmlTpl);
					var el = self.el = self.get(".alert-box");
					self.hasMask && self.mask(body);
					function setPos(){
						self.setMaskPos();
						if(self.opts.setPos){
							self.opts.setPos.call(self);
						}
						else{
							self.setPos();
						}
					}
					this.setPosProxy = setPos;
					if(self.animate){
						el.setAttribute("class", (el.getAttribute("class")||"") + " "+ self.animate);
					}
					if(self.context){
						self.context.addClass('alert-back-in');
					}
					if(self.opts.renderTime){
						setTimeout(function(){
							(typeof self.callBack == "function") && self.callBack();
							$(window).on("resize",setPos);
							setPos();
						}, self.opts.renderTime);
					}
					else if(typeof self.callBack == "function") {
						self.callBack();
						$(window).on("resize", setPos);
					}
					setPos();
					self.addEvent();
					document.addEventListener('touchmove', preventScroller);
					if(!this.scrollerClass)return;
					var scroller = $("." + this.scrollerClass);
					scroller[0].addEventListener('touchstart', touchstart);
					scroller[0].addEventListener('touchmove', touchmove);

					var startY;
					function touchstart(event) {
						startY = event.touches[0].clientY;
					}
					function touchmove(event) {
						var height = scroller.height(),
							scrollTop = scroller[0].scrollTop,
							scrollHeight = scroller[0].scrollHeight;
						var eventY = event.touches[0].clientY;
						var subY = startY - eventY;
						if(scrollTop >= 0 && scrollTop + height < scrollHeight && subY > 0){
							event.stopPropagation();
						}
						else if(scrollTop > 0 && scrollTop + height <= scrollHeight && subY < 0){
							event.stopPropagation();
						}
						else{
							event.preventDefault();
						}
						return false;
					}
				},
				mask: function(body){
					var self = this;
					var alertBoxBg = document.createElement("div");
					alertBoxBg.setAttribute("class", 'alert-box-bg' + ' alert-box-bg-'+self.type +(this.opts&&this.opts.rootClass?' '+this.opts.rootClass+'-bg':''));
					this.bg = alertBoxBg;
					if(this.background === false)return;
					body.appendChild(alertBoxBg);
					this.setMaskPos();

					if(self.bgAnimate)alertBoxBg.setAttribute("class", (alertBoxBg.getAttribute("class")||"") + " "+ self.bgAnimate);

				},
				setMaskPos: function(){
					var _height = Exp.position.scrollHeight();
					this.bg.style.cssText += ";height:" + _height + "px;width:" + document.documentElement.scrollWidth + "px;";
				},
				setPos: function(){
					var self = this, el = self.el, bg = self.bg;
					var scrollTop = Exp.position.scrollTop();
					el.style.cssText += ";top:" +(scrollTop + window.innerHeight/2 - el.offsetHeight/2 - this.upOffset) + "px;left:" + (document.documentElement.offsetWidth/2 - el.offsetWidth/2) + "px;";
					if(self.type == "mini"){
						bg.style.opacity = 0;
						setTimeout(function(){
							bg.fadeOut(500, function(){
								$(this).remove();
							});
							bg.fadeOut(500, function(){
								$(this).remove();
							});
						},2000);
					}
				},
				addEvent: function(){
					var self = this, el = self.el;
					$(el.querySelector(".btn-confirm")).on(self._event, function(e){
						self.confirm(el);
						self.reset();
						e.preventDefault();
					});
					if(self.type != "alert"){
						$(el.querySelector(".btn-cancel")).on(self._event, function(e){
							self.cancel(el);
							self.reset();
							e.preventDefault();
						});
					}
				},
				reset: function(){
					if(this.survivePeriod && new Date() - this.createTime < this.survivePeriod){
						return;
					}
					var self = this,
						context = self.context;
					self.context = null;
					//解决键盘消失后定位不准
					setTimeout(function(){
						var el = self.el, bg = self.bg,
							$el = $(el), $bg = $(bg), opts = self.opts;
						$el.removeClass(opts.animate).addClass(opts.animateOut || "alert-box-anim-out");
						$bg.removeClass(opts.bgAnimate).addClass(opts.bgAnimateOut || "alert-bg-anim-out");
						if(context){
							context.addClass("alert-front-in").removeClass("alert-back-in");
						}
						setTimeout(function(){
							if(bg){
								Exp.remove.call(bg);
							}
							Exp.remove.call(el);
							if(self.resetCallback){
								self.resetCallback.call(self);
							}
							if(this.type != "mini"){
								self.die(el);
							}
							if(context){
								context.removeClass("alert-back-in alert-front-in");
							}
						},390);
						self.removeScrollerEvent();
						if(self.asyncResetCallback){
							self.asyncResetCallback.call(self);
						}
					},50);

				},
				show: function () {
					this.el.style.display = 'block';
					this.bg.style.display = 'block';
				},
				hide: function () {
					this.el.style.display = 'none';
					this.bg.style.display = 'none';
					this.removeScrollerEvent();
				},
				removeScrollerEvent: function(){
					document.removeEventListener('touchmove', preventScroller);
					$(window).off('resize', this.setPosProxy);
				},
				die: function(){
					var self = this, el = self.el;
					$(el.querySelector(".btn-confirm")).off(self._event);
					if(self.type != "alert"){
						$(el.querySelector(".btn-cancel")).off(self._event);
					}
				},
				get: function(selector){
					var el = document.querySelectorAll(selector);
					return el[el.length - 1];
				}
			};
			return function(opts){
				return new AlertBox(opts).init();
			};
		})(),
		/**
		 *临时小提示
		 */
		showAlert: function(message, callback, time) {
			if(typeof callback == 'number'){
				var temp = time;
				time = callback;
				callback = temp;
			}
			Exp.alertBox({
				type: "validate",
				msg: message,
				callBack: function () {
					var that = this;
					setTimeout(function () {
						that.reset();
						callback && callback();
					}, time||2000);
				}
			});
		}
	}
	return Exp;
})($, template);
