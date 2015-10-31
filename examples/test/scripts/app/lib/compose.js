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