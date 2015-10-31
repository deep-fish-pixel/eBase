(function(eBase){
	var pageConfig = pageConfig = {
			route:{'page-third': 'launch'},
			templateName: 'page-third'
		},
		viewConfig = eBase.Config.view;
	var view = new eBase.PageView({
		tagName:'div',
		className: 'page'
	}, {
		requires:[{
			property:'templateHtml',
			times: viewConfig.requireTimes.once
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

