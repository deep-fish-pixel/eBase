;(function(window, eBase){
	"use strict";
	var PageView = window.eBase.PageView =  eBase.View.extend({
		instance: function(options, props){
			eBase.extends(this, props || {}, eBase.Event());
			this.addPageElement(options);
			this.wrapRender();
			this.on('satisfy', 'render');
			this.on('destroy', 'onDestroy');
			this.on('instance', 'onInstance');
			this._super.instance.call(this, options);
			if(!this.el.find('.page-cont').size() && options.background !== false){
				this.el.append('<div class="page-cont"></div>');
			}
			this.setStatus({required: false});
			this._status.required = false;
		},
		addPageElement: function (options) {
			var blanker = PageRouter.getBlankElement(true);
			if(blanker){
				var el = blanker.el;
				if(options){
					options.el = el;
				}
				else{
					this.resetEl(el);
				}
				this.addBlankTime = blanker.time;
			}
			else{
				this.addBlankTime = null;
			}
		},
		onInstance: function(){
		},
		onDestroy: function(){
			var reqs = this.requires;
			reqs.startIndex = 0;
			if(reqs.ajax){
				reqs.ajax.abort();
			}
			if(this.render.timer){
				clearTimeout(this.render.timer);
				delete this.render.timer;
			}
			this.addBlankTime = null;
			this.hideLoadingBar();
			this.setStatus({
				operate: '',
				required: false
			});
		},
		active: function(){
			if(this.getStatus('active'))return;
			this._super.active.apply(this);
			if(!this.getStatus('required') || this.getStatus('destory')){
				this.satisfy();
			}
		},
		resetEl: function(el){
			this.el = el;
			this.setEl();
		},
		render: function(){},
		wrapRender: function(){
			var render = this.render.bind(this);
			this.render = function(opts){
				var complete = this.hasCompleted(),
					self = this;
				if(complete && !this.getStatus('destory')) {
					if(opts && !opts.ajax){
						var router = this.getRouter();
						PageRouter.addBlankPage(router.getFragment());
					}
					var status = this.getStatus(),
						start = this.addBlankTime;
					if(status.required && start){
						self.render.timer = eBase.delay(callback, eBase.Config.view.loadingMinTime, start);
					}
					else{
						callback();
					}
				}
				function callback(){
					var hasAdded = self.getStatus('operate') === 'add' || self.getStatus('operate') === 'valide';
					if(status.required && !hasAdded){
						var loading = PageRouter.pageLoading,
							pLoading = PageRouter.getBlankElement(self.getRouter().getFragment());
						if(loading){
							if(pLoading){
								loading.hide();
							}
						}
						self.setStatus({'operate': 'add'});
					}
					else if(status.required){
						self.setStatus({'operate': 'valide'});
					}
					else{
						self.setStatus({'operate': 'reset'});
					}
					self.resetTemplateTag();
					var renderStatus = eBase.extends({}, status);
					render(self.routeData || [], renderStatus);
					self.el.css('position', '');
					//self.setStatus('required', false);
				}
			}
		},
		setTemplateTag: function(){
			eBase.template.config("openTag", "${");
			eBase.template.config("closeTag", "}");
		},
		resetTemplateTag: function(){
			eBase.template.config("openTag", "{{");
			eBase.template.config("closeTag", "}}");
		},
		requires:[
		],
		/*
		 *对requires多个需求进行请求，成功后返回设置
		 * */
		satisfy: function(){
			var requires = this.requires,
				require,
				self = this;
			if(requires.startFetch)return;
			eBase.extends(requires, {
				startIndex: 0,
				ajaxCount: 0,
				completes: 0,
				startFetch: true
			});
			requires.forEach(function (require, i) {
				var property = require.property,
					getter = require.getter || eBase.getMethod(property, 'get'),
					setter = require.setter || eBase.getMethod(property, 'set');
				if(eBase.isString(getter)){
					getter = require.getter = self[getter].bind(self);
				}
				if(eBase.isString(setter)){
					setter = require.setter = self[setter].bind(self);
				}
				require.invoke = function(data){
					requires.completes++;
					setter(data);
					require.data = data;
					require.required = true;
					if(!self.getStatus('deactive')){
						self.notifyLoadingBar();
					}
					if(requires.completes === requires.length){
						self.setStatus('required', true);
						self.trigger('satisfy',{
							ajax: !!requires.ajaxCount
						});
						requires.startFetch = false;
					}
				}
				require.handle = function(count){
					if(this.required && this.times === eBase.Config.view.requireTimes.once){
						this.invoke(this.data);
					}else{
						requires.ajaxCount++;
						this.getter();
					}
					requires.startIndex++;
				}
				require.handle();
			})
			if(requires.length === 0){
				self.trigger('satisfy');
			}
		},
		resetPageData: function(){
			var requires = this.requires,
				completes = 0;
			requires.some(function (item, index) {
				if(item.times === eBase.Config.view.requireTimes.always){
					requires.startIndex = index;
					requires.completes = completes;
					return true;
				}
				else{
					completes++;
				}
			})
		},
		/*
		 * 刷新页面
		 * @param [Boolean] fetchData 是否重新获取数据
		 * */
		refresh: function(fetchData){
			this.setStatus('operate', 'reset');
			if(fetchData){
				this.resetPageData();
				this.getPageData();
			}
		},
		hasCompleted: function(){
			if(this.requires.completes === this.requires.length || this.requires.length === 0){
				return true
			}
			return false;
		},
		/*
		 * 通知更新任务进度条
		 * */
		notifyLoadingBar: function(){
			var length = this.requires.length,
				index = this.requires.completes,
				process = 0;
			if(length == 0){
				process = 100;
			}
			else{
				process = index*100/length;
			}
			eBase.util.setPageProcess(process, length);
		},
		/*
		 * 隐藏任务进度条
		 * */
		hideLoadingBar: function(){
			var loadingbar = eBase.util.getPageLoadingbar();
			if(loadingbar){
				loadingbar.css('opacity', 0);
			}
		},
		getTemplateHtml: function(require){
			this.service.getTemplateHtml(require);
		},
		setTemplateHtml: function(template){
			this.resetTemplateTag();
			this.templateHtml = template;
			this.template = eBase.template.compile(this.templateHtml);
		},
		template: function(data){
			return '';
		},
		setPageData: function(data){
			this.pageData = data;
		},
		getPageData: function(){
			return this.pageData;
		},
		addLoadingTo: function (parent, handleHtml, manual) {
			var el = this.el;
			if(!el.parent().size()){
				el.appendTo(parent);
			}
			eBase.PageRouter.hidePageLoading();
			var html, cont = el.find('.page-cont');
			if(manual){
				html = manual(this.pageData, this.template);
			}
			else{
				html = this.template(this.pageData || {});
				if(handleHtml){
					html = handleHtml(html);
				}
			}
			cont.show().css('opacity', 0);
			setTimeout(function(){
				cont.hide();
			},300);
			if(this._cont){
				this._cont.remove();
			}
			this._cont = $(html).insertBefore(cont);
		},
		manualLoadingTo: function (parent, handle) {
			if(handle){
				this.addLoadingTo(parent, null, handle);
			}
		},
		compileHtml: function(tpl, obj) {
			this.setTemplateTag();
			var render = template.compile(tpl),
				html = render(obj);
			return html;
		}
	});


	var PageRouter = window.eBase.PageRouter = eBase.Router.extend({
		instance: function(options, props){
			eBase.extends(this, props || {});
			this._super.instance.call(this, options);
			this.register();
			this.onInstance(options);
		},
		onInit: function(){
		},
		onInstance: function(){
		},
		launch: function(){
		},
		setScrollTop: function(scrollTop){
			this.scrollTop = scrollTop;
		},
		getScrollTop: function(){
			return this.scrollTop || 0;
		}
	});
	eBase.extends(PageRouter, {
		events:{
		},
		resources: eBase.extends({}, eBase.Config.router.resources),
		resStatus:{
			init:0,
			start:1,
			success:2,
			fail:3
		},
		_handledRes:{
		},
		onStart: function(){
			this.analyseResource();
			this.setLayout(new eBase.DislocationLayout());
			this.on('execRouter', 'onExecRouter');
		},
		requireResource: function(router, callback, type){
			var resources = this.resources,
				res,
				cb = callback.bind(this, 'reqsuccess'),
				self = this,
				status;
			for(var name in resources){
				res = resources[name];
				if(res && router.match(res.reg)){
					status = res.status;
					res.cb = cb;
					if(status === self.resStatus.success){
						res.cb();
					}
					else{
						if(status === this.resStatus.init || status === this.resStatus.fail){
							this.trigger('requireResource');
							resources = eBase.extends([], res.path);
							res.status = self.resStatus.start;
							eBase.simulate(eBase.Config.simulate.reqResFail, function () {
								fail(res, resources, type);
							}, function () {
								compose.require(resources, function(){
									if(typeof this.success === 'undefined' || this.success){
										eBase.log.success('PageRouter.requireResource: 路由['+router+']-->['+resources.join(',')
											+']资源'+(type==='prefetch'?'预取':'获取')+'成功！');
										res.status = self.resStatus.success;
										res.cb();
									}
									else{
										fail(res, resources, type);
									}
								}, function () {
									res.status = self.resStatus.fail;
									fail(res, resources, type);
								});
							});
						}
					}
					break;
				}
			}
			function fail(res, resources, prefetch){
				res.status = self.resStatus.fail;
				eBase.log.error('PageRouter.requireResource: 路由['+router+']-->['+resources.join(',')
					+']资源获取失败！');
				eBase.util.setPageProcess(100);
				if(!prefetch){
					self.back(true);
				}
			}
		},
		analyseResource: function(){
			var resources = this.resources,
				item;
			for(var name in resources){
				item = resources[name];
				if(eBase.isArray(item)){
					resources[name] = {
						reg: new RegExp((name?'(^'+name+'|#'+name+')[^#]*$':'^$')),
						path: item,
						status: this.resStatus.init
					};
				}
			}
		},
		setLayout: function(layout){
			this.layout =  layout;
		},
		getPreRouter: function(){
			var hash = this.getHash(),
				fragment = '';
			if(hash){
				var mats = hash.match(/\#[\s\S^#]+/);
				if(mats.length>1){
					fragment = mats[mats.length-2];
				}
			}
			return this.getRouter(fragment)
		},
		onExecRouter: function(event){
			if(event.success){
				var router = this.getRouter(event.routerName),
					status = router.view.getStatus();
				if(!status.required){
					this.change(event);
				}
				else{
					this.addLayoutRouter(router, event);
				}
			}
			else{
				//请求资源处理
				this.change(event);
			}
		},
		change: function(event){
			var fragment = this.getFragment(),
				ret = this.checkResource(fragment);
			if(ret){
				if(!this.layout.hasRouter(fragment)){
					if(this.hasRouter()){
						this.addBlankPage(fragment);
					}
					this.forward(fragment, event);
				}
			}
			else{
				this.handleError(this.handleError.noResourceByPageError);
				eBase.log.error('PageRouter.change: hash值['+fragment+']-->eBase.Config.router.resources配置不存在，请检查config.js配置');
			}
		},
		forward: function(fragment, event){
			fragment = fragment || '';
			eBase.util.setPageProcess(40, 4);
			this.requireResource(fragment, function(type){
				if(this.checkRouter(fragment)){
					if(event.type === 'trigger'){
						window.history.pushState('', '', fragment?"#"+fragment:'');
					}
					event.type = 'resource';
					var router = this.checkRouter(fragment);
					var values = fragment.match(router.reg);
					router.callback.apply(router, values.slice(1));
					router = router.router;
					router.active();
					this.addLayoutRouter(router);
				}
				else if(type === 'reqsuccess'){
					eBase.log.error('PageRouter.forward: hash值['+fragment+']-->获取js成功，但还是找不到hash值['+fragment+']对应的路由,请确认该页面的js是否有异常或对应的pageConfig.route配置是否正确');
				}
			});
		},
		checkResource: function(fragment){
			var resources = this.resources,
				item;
			for(var name in resources){
				item = resources[name];
				if(fragment.match(resources[name].reg)){
					return {
						route: resources[name],
						fragment: fragment
					};
				}
			}
		},
		prefetch: function(fragment){
			if(eBase.Config.view.prefetch){
				var ret = this.checkResource(fragment);
				if(ret){
					fragment = fragment || '';
					this.requireResource(fragment, function(){
					}, 'prefetch');
				}
			}
		},
		addLayoutRouter: function(router, event){
			if(this.layout){
				this.layout.add(router, event);
			}
		},
		addBlankPage: function (fragment) {
			var el = this.createBlankElement(fragment);
			this.layout.addBlankElement(el, this.event);
			var router = this.checkRouter(fragment);
			if(router){
				router.router.view.addPageElement();
			}
		},
		createBlankElement: function(fragment){
			var el = $('<div class="page"><div class="page-cont"></div></div>').appendTo(this.rootEl),
				loading = this.getPageLoading();
			if(loading){
				el.append(loading);
				loading.show();
			}
			this.setBlankElement(el, fragment);
			return el;
		},
		setBlankElement: function(el, fragment){
			if(!this.blankElement){
				this.blankElement = {};
			}
			this.blankElement[fragment] = {
				el: el,
				time: new Date()
			};
		},
		getBlankElement: function(clear, frag){
			var fragment = frag || this.getFragment(),
				blank = this.blankElement,
				blanker;
			if(blank && blank[fragment]){
				blanker = blank[fragment];
				if(clear){
					this.blankElement[fragment] = null;
				}
				return blanker;
			}
			return null;
		},
		setPageLoading: function(el){
			this.pageLoading = el;
		},
		hidePageLoading: function(el){
			if(this.pageLoading){
				this.pageLoading.hide();
			}
		},
		hideLoadingBar: PageView.prototype.hideLoadingBar,
		setRoot: function(el){
			this.rootEl = el;
		},
		/*
		 * 获取loading效果
		 * @return {Element}
		 * */
		getPageLoading: function(){
			var loading = this.pageLoading,
				circle = loading.find('.svg-circle');
			circle.children().remove();
			$(document.createElementNS("http://www.w3.org/2000/svg", "animateTransform")).attr({
				attributeName:'transform',
				type:"rotate",
				values:"0 17 17;50 17 17; 360 17 17",
				dur:"1.5s",
				repeatCount:"indefinite",
				calcMode:"spline",
				keySplines:".5 0 .5 1;.5 0 .5 1"
			}).appendTo(circle);
			$(document.createElementNS("http://www.w3.org/2000/svg", "animateTransform")).attr({
				attributeName:'transform',
				type:"rotate",
				values:"0 17 17;360 17 17",
				dur:"2.15s",
				repeatCount:"indefinite",
				additive:"sum"
			}).appendTo(circle);
			$(document.createElementNS("http://www.w3.org/2000/svg", "animate")).attr({
				attributeName:'stroke-dashoffset',
				dur:"1.5s",
				values:"0; 76; 0",
				repeatCount:"indefinite",
				calcMode:"spline",
				keySplines:".5 0 .5 1;.5 0 .5 1"
			}).appendTo(circle);
			return loading;
		},
		removeBlankElement: function(el){
			this.layout.removeBlankElement();
		},
		/*
		 * 错误处理
		 * @param {String} type 错误类型
		 * */
		handleError: (function() {
			var handle = function (type) {
				var self = this;
				switch (type){
					case handle.noResourceError:
						break;
					case handle.noResourceByPageError:
						eBase.tip('您的请求路径不存在', function () {
							self.back();
						});
						break;
					case handle.noHtmlDataError:
						break;
				}
			}
			eBase.extends(handle, {
				noResourceError: 'noRes',
				noResourceByPageError: 'noResByPage',
				noHtmlDataError: 'noHtmlOrData'
			})
			return handle;
		})(),
		back: function(tip){
			if(this.layout && this.layout.hasHistory()){
				if(this.isOnline()){
					eBase.Router.back();
				}
				else{
					setTimeout(function () {
						eBase.Router.back();
					}, 1000);
				}
			}
			if(tip){
				this.showNetworkTip();
			}
		},
		showNetworkTip: function () {
			if(this.isOnline()){
				eBase.tip('网络不稳定，请稍后再试');
			}
			else{
				eBase.tip('未检测到网络');
			}
		}
	});

	var PageService = window.eBase.PageService =  eBase.Service.extend({
		instance: function(options, props){
			this._super.instance.call(this, options);
			eBase.extends(this, props || {});
			this.onInstance(this.options);
		},
		onInit: function(){
		},
		onInstance: function(){
		},
		/*
		 * 获取值
		 * @param {Ojbect} [params] 参数对象
		 * @param {String/Function} success 成功回调
		 * @param {String/Function} [fail] 失败回调
		 * @return undefined
		 * */
		getData: function(url, params, success, fail){
		},
		/*
		 * 获取页面模板
		 * */
		_getTemplateHtml: function(options){
			var name = options.name;
			this.handleRequire({
				dataType: 'text',
				url: eBase.Config.service.urls.templatePath+'/'+(/\.html$/.test(name)?name:name+'.html')
			});
		},
		_getPageData: function(options){
			this.handleRequire({
				dataType: 'json',
				data: options.data || {},
				url: options.url
			});
		},
		handleRequire: function(options){
			var self = this,
				requires = this.view.requires,
				require = requires[requires.startIndex],
				view = this.view,
				config = eBase.Config,
				invoke;
			if(require){
				invoke = require.invoke;
			}
			else{
				return;
			}
			switch (require.times){
				case config.view.requireTimes.once:
					if(require.required){
						require.setter(data);
						return;
					}
				case config.view.requireTimes.every:
				default :
			}
			if(this.counttime === undefined){
				this.counttime = 0;
			}
			var self = this,
				ajaxTime = new Date(),
				data = options.data;
			if(data){
				data.ts = ajaxTime.valueOf();
			}
			require.ajax = eBase.$.ajax({
				url: options.url,
				data:options.data || {},
				type: options.type||"get",
				dataType: options.dataType || 'json',
				timeout: eBase.Config.service.timeout || 0,
				success: function(data){
					require.ajax = 'complete';
					eBase.log.success('PageService.handleRequire:模板数据['+options.url+']数据获取成功！');
					if(view.getStatus('destory')){
						requires.startFetch = false;
						return;
					}
					self.authorFiler(options.dataType || 'json', data, function () {
						/*eBase.delay(function () {
						 invoke(data, {required: require.required});
						 }, 1000)*/
						invoke(data, {required: require.required});
					});
				},
				error: function(){
					requires.startFetch = false;
					eBase.log.error('PageService.handleRequire: '+options.url+'数据获取失败！'
						+((options.url||'').match(/\.html$/)?'请检查模板目录：'+eBase.Config.service.urls.templatePath+'下是否有该文件':'请检查url地址是否正确'));
					require.ajax = 'complete';
					if(!view.getStatus('deactive')){
						eBase.util.setPageProcess(100);
					}
					if(view.getStatus('destory')){
						return;
					}
					if(options.error){
						options.error();
					}
					else{
						eBase.delay(function () {
							eBase.PageRouter.back(true);
						}, 1000, ajaxTime)
					}
				}
			});
		},
		authAjax: function (options) {
			var self = this;
			var opt = $.extend({
					type: "get",
					dataType: "json",
					timeout: eBase.Config.service.timeout || 0,
					data:{}
				}, options),
				startTime = new Date();
			opt.data.ts = startTime.valueOf();
			if(!opt.noloading){
				eBase.util.showLoading();
			}
			opt.success = function(response){
				//eBase.delay(res, 0, startTime);
				res();
				function res(){
					eBase.util.hideLoading();
					self.authorFiler(opt.dataType, response, options.success);
				}
			};
			opt.error = function(response){
				eBase.util.hideLoading();
				if(options.error){
					options.error(response);
				}
				eBase.util.showAlert("网络繁忙，请重试");
			};
			return $.ajax(opt);
		},
		textError: function (){
			eBase.util.hideLoading();
			eBase.util.showAlert("网络繁忙，请重试");
		},
		getContext: function() {
			return (compose&&compose.getContext()?compose.getContext():"");
		},
		getEvn: function() {
			var _hostName = document.location.hostname,
				ego_pre = /^([\w\.]*)(pre)(\w*)(.cnsuning.com)$/,
				ego_sit = /^([\w\.]*)(sit)(\w*)(.cnsuning.com)$/,
				evn = '';
			if(_hostName.match(ego_pre)){
				evn = 'pre';
			}
			else if(_hostName.match(ego_sit)){
				evn = 'sit';
			}
			return evn;
		},
		getPayPassport: function() {
			var evn = this.getEvn();
			return 'https://'+evn+'paypassport.'+(evn?'cn':'')+'suning.com/ids/login?loginTheme=wap&service=';
		},
		getPassport: function() {
			var evn = this.getEvn();
			return 'https://'+evn+'passport.'+(evn?'cn':'')+'suning.com/ids/login?loginTheme=wap&service=';
		},
		authorFiler: function(dataType, response, callback) {
			if(dataType == 'json'){
				var self = this;
				if(response && (response.idsIntercepted || response.responseCode == "0999")){
					if(window.eBase.Config.partMemberRequire){
						self.redirect();
					}
					else{
						eBase.util.showAlert("长时间未操作,请重新登录再试", function(){
							self.redirect();
						});
					}
				}
				else if(response && response.responseCode == "0998"){
					eBase.util.showAlert("账户已冻结", function(){
						window.location.href = pwgCtx + "/accountFreeze.htm";
					});
				}
				else if(callback)callback(response);
			}
			else{
				callback(response);
			}
		},
		redirect: function (){
			var redirectUrl = window.location.href,
				redirectUrl = redirectUrl.replace(/&?ticket=[^&]*/g, '');
			window.location = (window.eBase.Config.member!=='suning'?  this.getPayPassport() : this.getPassport()) + encodeURIComponent(redirectUrl);
		}
	});
})(window, eBase);