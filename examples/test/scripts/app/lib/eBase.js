;(function(window, $, template){
	"use strict";
	var eBase = window.eBase = {
		version: '1.0.0',
		$: $,
		template: template,
		templater: function(html, data){
			return template.compile(html)(data);
		},
		isElement: function(obj) {
			return !!(obj && obj.nodeType === 1);
		},
		isArray: function(obj) {
			return toString.call(obj) === '[object Array]';
		},
		isObject: function(obj) {
			var type = typeof obj;
			return type === 'function' || type === 'object' && !!obj;
		},
		/*
		 * 模块注册/获取
		 * 包含set，get接口
		 * */
		modules: (function () {
			var mod = {},
				methods = {
					put:function (id, value) {
						mod[id] = value;
					},
					get:function (id) {
						return mod[id];
					},
					remove:function (id) {
						delete mod[id];
					}
				};
			return methods;
		})(),
		getMethod: function(name, type) {
			return type + name.replace(/^\w/, function(value){
				return value.toUpperCase();
			});
		},
		/*
		* 延迟执行
		* @param {Function} func 回调
		* @param {number} time 延迟时间(ms)
		* @param {Date} start 起始时间
		* */
		delay: function (func, time, start) {
			var list = [];
			function add(func, time, start){
				list.push({
					func: func,
					getTime: function(){
						var cur = new Date();
						start = start || cur;
						return time + (start - cur);
					}
				});
			}
			function exec(){
				var first = list.shift();
				if(first){
					var time = first.getTime();
					time = time<0?0:time;
					setTimeout(function () {
						first.func();
						exec();
					}, time)
				}
			}
			add(func, time, start);
			exec();
			return {
				delay: function(func, time, start){
					add(func, time, start);
				}
			}
		},
		tip: function (msg, callback) {
			Exp.showAlert(msg, callback);
		},
		extends: function(orig, target, noDeep){
			var toStr = Object.prototype.toString,
				arrayFlag = "[object Array]";
			orig = orig || {};
			var targets = arguments,
				target;
			for(var h=1; h<targets.length; h++){
				target = targets[h];
				for (var i in target) {
					if(target.hasOwnProperty(i)) {
						if (toString.call(target[i]) === "[object Object]"
							&& typeof target[i] === "object"
							&& !noDeep) {
							if(!orig[i]){
								orig[i] = toStr.call(target[i]) === arrayFlag ? [] : {};
							}
							eBase.extends(orig[i], target[i]);
						}
						else {
							orig[i] = target[i];
						}
					}
					else orig[i] = target[i];
				}
			}
			return orig;
		},
		simulate: function(value, simulate, real){
			if(value){
				if(eBase.Config.simulate.timeout){
					setTimeout(simulate, eBase.Config.simulate.timeout);
				}
				else{
					simulate();
				}
			}
			else{
				if(real){
					real();
				}
			}
		},
		/*
		 * 继承父类
		 * @param {Function} [parent] 父类
		 * @param {Object} props 对象
		 * @return {Function} 子类
		 * */
		extend: function (parent, props){
			if(!eBase.isFunction(parent)){
				props = parent;
				parent = this;
			}
			function child(){
				this._super = parent.prototype;
				parent.apply(this, arguments);
			}
			eBase.extends(child, parent);
			child.prototype = Object.create( parent.prototype);
			eBase.extends(child.prototype, props);
			child.prototype.constructor = child;
			return child;
		},
		/*
		 * 移除zepto对象
		 * @param {Zepto} el zepto对象
		 * @param {Number} timer 延迟时间, 单位ms，默认1s执行
		 * */
		off: function (el, timer){
			setTimeout(function () {
				var sons = el.find('*');
				el.forEach(function (item) {
					sons.push(item);
				})
				sons.off();
				sons.off('','');
			}, timer||1000);
		},
		/*
		 * 获取/设置参数值
		 * */
		param: function(name, value, href){
			href = href || window.location.href;
			var reg = new RegExp('[\\?&]' + name + '=([^&#]*)'),
				href2;
			var results = href.match(reg);
			if(value === undefined){
				if (!results){
					return '';
				}
				return results[1] || '';
			}
			else{
				if(results){
					href2 = href.replace(reg, function(v1, v2) {
						return v1.replace('='+v2, '='+value);
					});
				}
				else{
					href2= href + (href.indexOf('?')>0?'&':'?')+name+'='+value;
				}
				if(href != href2){
					history.replaceState('', '', href2);
				}
			}
		},
		/*
		 * 获取/设置hash值
		 * */
		hash: function(hash, href){
			var href = href || window.location.href,
				url = href.replace(/#.*/, '');
			history.replaceState('', '', url + hash);
		},
		/*
		 * 转换hash为param
		 * */
		parseToParam: function(){
			var configRouter = eBase.Config.router,
				openPath = configRouter.openPath,
				pathName = configRouter.pathName,
				lastHash = this.parseToParam.hash || '',
				href = window.location.href,
				hash = window.location.hash,
				path = this.param(pathName),
				doubleReg = /##/g,
				reset;
			if(!hash){
				var matches = hash.match(/(#*)$/);
				hash = matches ? matches[0] : window.location.hash;
			}
			if(hash){
				//处理根目录hash
				if(hash.match(/^##/)){
					hash = hash.replace(doubleReg, '#');
					href = href.replace(doubleReg, '#');
					reset = true;
				}
				if(openPath){
					hash = hash.replace(/\#/g, ',').replace(/^,/, '');
					if(!reset){
						if(path){
							hash = path +',' +hash;
						}
					}
					this.param(pathName, hash, href.substring(0, href.indexOf('#')));
					this.hash('');
				}
				else{
					if(lastHash.indexOf(hash)>=0 || hash.indexOf(lastHash)>=0){
						reset = true;
					}
					if(!reset){
						hash = lastHash+hash;
						this.hash(hash);
					}
					else{
						this.hash(hash === '#'?'':hash);
					}
					this.parseToParam.hash = hash;
				}
			}
		},
		/*
		 * 获取fragment
		 * */
		getFragment: function(href){
			var href = href || window.location.href,
				configRouter = eBase.Config.router;
			if(configRouter.openPath){
				var path = this.param(configRouter.pathName) || '';
				return path.replace(/,/g, '#');
			}
			else{
				var minIndex = href.indexOf('#')||0;
				return minIndex<0? '': href.substring(minIndex+1);
			}
		}
	};
	// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function(name) {
		eBase['is' + name] = function(obj) {
			return toString.call(obj) === '[object ' + name + ']';
		};
	});
	/*
	 * 日志系统
	 * @param {String} msg 消息
	 * @param {String} [msg2] 消息2
	 * */
	eBase.log = (function () {
		function log(msgs, css) {
			if(eBase.Config.debug){
				console.log('%c'+Array.prototype.join.call(msgs, ', '), css);
			}
		}
		eBase.extends(log, {
			info: function (msg, msg2) {
				log(arguments, 'color: #ccc;');
			},
			warn: function (msg, msg2) {
				log(arguments, 'color: #8a6d3b;');
			},
			success: function (msg, msg2) {
				log(arguments, 'color: #00A503;');
			},
			except: function (msg, msg2){
				log(arguments, 'color: #a94442;');
			},
			error: function (msg, msg2){
				log(arguments, 'color: #f00;');
			}
		});
		return log;
	})();

	var eventCounter = 0;
	eBase.Event = function(){
		var events = {
			_events:{},
			on: function(name, callback){
				if(name){
					if(!this._events[name]){
						this._events[name] = [];
					}
					if(eBase.isString(callback)){
						callback = this[callback];
					}
					if(!callback)return;
					this._events[name].push({
						name: name,
						callback: callback,
						counter:++eventCounter
					});
				}
			},
			trigger: function(name){
				var eventers = this._events[name] || [],
					eventer,
					callback;
				if(!events)return;
				for(var i=0; i<eventers.length; i++){
					eventer = eventers[i];
					callback = eventer.callback;
					if(callback){
						callback.apply(this, Array.prototype.slice.call(arguments, 1));
					}
				}
			},
			off: function(name, callback){
				if(name){
					var eventers = this._events[name],
						eventer,
						cb;
					if(eventers){
						if(callback){
							for(var i=0; i<eventers.length; i++){
								eventer = eventers[i];
								cb = eventer.callback;
								if(callback && callback === cb){
									this._events[name] = eventers = eventers.slice(0, i).concat(eventers.slice(i));
									i--;
								}
							}
						}
						else if(!callback){
							this._events[name] = [];
						}
					}
				}
			}
		}
		return events;
	}
	eBase.View = function(options){
		this.instance.apply(this, arguments);
	}
	eBase.extends(eBase.View,{
		extend: eBase.extend
	});
	eBase.extends(eBase.View.prototype, eBase.Event(), {
		instance: function(options){
			this.status = {};
			options = options || {};
			this.el = options.el;
			this.tagName = options.tagName || 'div';
			this.attrs = options.attrs || {};
			if(options.className){
				this.attrs.class = options.className;
			}
			this.setEl();
			this._status = eBase.extends({}, this.status);
			this.trigger('instance', options);
		},
		render: function(){
		},
		getStatus: function(prop){
			if(prop === undefined){
				return this.status;
			}
			return this.status[prop];
		},
		setStatus: function(props){
			if(eBase.isString(props)){
				this.status[props] = arguments[1];
			}
			else{
				eBase.extends(this.status, props);
			}
		},
		active: function(){
			this.setStatus({
				active: true,
				deactive: false,
				destory: false
			});
			this.trigger('active', status);
		},
		deactive: function(){
			this.setStatus({
				active: false,
				deactive: true,
				destory: false
			});
			this.trigger('deactive');
		},
		destroy: function(opts){
			var opts = opts || {};
			if(!opts.remainEl){
				this.el.empty().remove();
			}
			this.setStatus({
				active: false,
				deactive: true,
				destory: true
			});
			this.trigger('destroy');
		},
		setRouteData: function(data){
			this.routeData = data;
		},
		setEl: function(){
			if(this.el){
				this.el = $(this.el);
			}
			else{
				this.el = $(document.createElement(this.tagName)).attr(this.attrs);
			}
		},
		setRouter: function(router){
			this.router = router;
		},
		getRouter: function(){
			return this.router;
		},
		setService: function(service){
			this.service = service;
		},
		getService: function(){
			return this.service;
		}
	});
	eBase.Router = function Router(options){
		this.instance.apply(this, arguments);
	}

	eBase.extends(eBase.Router, {
		extend: eBase.extend,
		_routers:{
		},
		register: function(route, router){
			var callback;
			for(var name in route){
				callback = route[name];
				this._routers[name] = {
					callback: callback,
					router: router,
					name:name
				};
				this._analyse(name, this._routers[name]);
			}
		},
		start: function(){
			if(!this.startFlag){
				this.startFlag = true;
				this._analyse();
				this.onStart();
				this.addEvent();
				this.execRouter({type:'refresh'});
			}
			return this;
		},
		onStart: function(){
		},
		forward: function(router, event){
			router = router || '';
			if(this.checkRouter(router)){
				history.pushState('', '', router?"#"+router:'');
				this.execRouter(event || {type:'trigger'});
			}
		},
		change: function(event){
			var fragment = this.getFragment();
			this.forward(fragment, event);
		},
		add: function(name){
			this.go(name);
		},
		/*
		* 页面跳转
		* @param [String|Number] hash值或整数
		*
		* */
		go: function(name, operate){
			var matches = name.match(/([+-]\d+)/);
			if(operate === 'notrace'){
				history.replaceState('', '', window.location.href+'#'+name);
				this.execRouter({type:'notrace'});
			}
			else if(matches){
				if(matches[0]-0>=0){
					window.history.go(matches[0]-0);
				}
				else{
					var configRouter = eBase.Config.router,
						openPath = configRouter.openPath,
						pathName = configRouter.pathName,
						hash = window.location.hash,
						href = window.location.href
					if(openPath){
						hash = '##' + eBase.param(pathName).replace(/,/g, '#');
					}
					var values = hash.split('#');
					hash = values.slice(0, values.length +  (matches[0]-0));
					hash = hash.join('#') || '#';
					window.location.href = hash=='#'?'##':hash;
				}
			}
			else{
				window.location.href = '#' + name;
			}
		},
		back: function(){
			window.history.back();
		},
		getHash: function(){
			return eBase.getFragment();
		},
		getFragment: function(){
			return eBase.getFragment();
		},
		addEvent: function(){
			var addEventListener = window.addEventListener || function (eventName, listener) {
				return attachEvent('on' + eventName, listener);
			};
			addEventListener('popstate', this.execRouter.bind(this, {type:'click'}));
		},
		hasRouter: function(){
			var routers = this._routers,
				hash = this.getHash(),
				hasEqule = false,
				count = 0;
			for(var i in routers){
				if(i === hash || '#' + i === hash){
					hasEqule =  true;
				}
				count++;
				if(count === 2){
					return true;
				}
			}
			return hasEqule || !count?false:true;
		},
		checkRouter: function(fragment){
			var _routers = this._routers,
				item;
			for(var name in _routers){
				item = _routers[name];
				if(item && fragment.match(item.reg)){
					item.name = name;
					item.router.setHash(eBase.Router.getHash());
					return item;
				}
			}
		},
		execRouter: function(event){
			var ret = eBase.parseToParam();
			if(ret)return;
			var fragment = this.getFragment(),
				router = this.checkRouter(fragment),
				flag = false;
			this.event = event;
			if(router){
				var values = fragment.match(router.reg);
				router.callback.apply(router, values.slice(1));
				router.router.active();
				flag = true;
			}
			this.trigger('execRouter', {
				fragment: fragment,
				success: flag,
				routerName: router && router.name,
				type: event.type || 'trigger'
			});
		},
		_analyse: function(path, router){
			var _routers = this._routers,
				item;
			if(arguments.length){
				_routers = {};
				_routers[path] = router.callback;
			}
			for(var name in _routers){
				item = name;
				if(item){
					item = item.replace(/\:(\w+)/g, '(?:(\\w+))?');
				}
				this._routers[name] = {
					reg: new RegExp((item?item:'^$') + '(?:\\?([\\s\\S]*))?$'),
					callback: router.callback,
					router: router.router
				};
			}
		},
		/*
		* fragment或路由名称
		* */
		getRouter: function(name){
			var router = this._routers[name];
			if(!router){
				router = this.checkRouter(name);
			}
			if(router){
				router = router.router;
			}
			return router;
		},
		isOnline: function () {
			return window.navigator.onLine;
		}
	}, eBase.Event());

	eBase.extends(eBase.Router.prototype, eBase.Event(), {
		instance: function(options){
			this.options = options || {};
			this.setView(options.view);
			this.trigger('instance', options);
		},
		setView: function(view){
			this.view = view;
			this.view.setRouter(this);
		},
		getView: function(){
			return this.view;
		},
		setRouteData: function(){
			this.routeData = arguments;
			if(this.view){
				this.view.setRouteData(arguments);
			}
		},
		getRouteData: function(){
			return this.routeData;
		},
		register: function(){
			this.analyse();
			this.constructor.register(this.route, this);
		},
		analyse: function(){
			var route = this.route, callback, router = this;
			for(var name in route){
				callback = route[name];
				if(eBase.isString(callback)){
					callback = this[callback];
				}
				callback = callback.bind(this);
				route[name] = function(){
					var l = arguments.length- 1,
						last = arguments[l];
					var params = Array.prototype.slice.call(arguments, 0, last === undefined? l : l+1);
					router.setRouteData.apply(router, params);
					callback.apply(route, params);
				}
			}
		},
		getViewStatus: function(){
			return this.view && this.view.getStatus();
		},
		active: function(opts){
			if(this.view){
				this.view.active(opts);
			}
			this.trigger('active', opts);
		},
		deactive: function(opts){
			if(this.view){
				this.view.deactive(opts);
			}
			this.trigger('deactive', opts);
		},
		destroy: function(opts){
			if(this.view){
				this.view.destroy(opts);
			}
			this.trigger('destroy', opts);
		},
		setHash: function(hash){
			this.hash = hash;
		},
		getHash: function(opts){
			return this.hash;
		},
		getFragment: function(){
			return eBase.getFragment();
		}
	});

	eBase.Service = function(options){
		this.instance.apply(this, arguments);
	}
	eBase.extends(eBase.Service,{
		extend: eBase.extend
	});
	eBase.extends(eBase.Service.prototype, eBase.Event(), {
		instance: function(options){
			this.options = options || {};
			this.setView(options.view);
			this.trigger('instance', options);
		},
		setView: function(view){
			this.view = view;
			this.view.setService(this);
		},
		getView: function(){
			return this.view;
		}
	});


})(window, $, template);