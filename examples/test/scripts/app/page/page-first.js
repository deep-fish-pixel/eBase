(function(eBase){
	var pageConfig = pageConfig = {
			route:{'': 'launch'},
			templateName: 'page-first',
			pageDataUrl: appConfig.pageFirstDataUrl
		},
		viewConfig = eBase.Config.view;
	var view = new eBase.PageView({
		tagName:'div',
		className: 'page'
	}, {
		requires:[{
			property:'templateHtml',
			times: viewConfig.requireTimes.once
		},{
			getter: 'getPageData',
			setter: 'setPageData',
			times: viewConfig.requireTimes.always
		}],
		getPageData: function(){
			this.service.getPageData();
		},
		setPageData: function(data){
			this.pageData = data;
		},
		onInstance: function(){
		},
		render: function(params, status){
			if(status.operate == 'add'){
				//第一次进入该页面
				var app = eBase.modules.get('app');
				this.addLoadingTo(app.el);

			}else{

			}
			//eBase.PageRouter.prefetch('manage-more');
		}
	});

	var service = new eBase.PageService({
		view: view
	}, {
		onInstance: function(){
		},
		getTemplateHtml: function(){
			this._getTemplateHtml({
				name: pageConfig.templateName
			});
		},
		getPageData: function(data){
			this._getPageData({
				url: pageConfig.pageDataUrl,
				data: data
			});
		}
	});

	var router = new eBase.PageRouter({
		view: view
	}, {
		route: pageConfig.route,
		onInstance: function(){
		},
		launch: function(){
			this.view.render();
		}
	});
	//register mod
	(function (name) {
		eBase.modules.put('view.'+name, view);
		eBase.modules.put('service.'+name, service);
		eBase.modules.put('router.'+name, router);
	})(pageConfig.templateName)
})(eBase);

