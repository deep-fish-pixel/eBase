//loading请求svg的bug，只能在body.onload时生效

compose.config({basePath:"scripts"});
compose.require([
	"app/lib/exp",
	"app/lib/eBase",
	"app/config",
	"app/lib/layout",
	"app/lib/extend",
	"app/lib/util"], function(exp, eBase, Config, Layout, PageRouter, util){
	var app = new eBase.PageView({
		tagName:'section',
		className:'page-app',
		background:false
	}, {
		onInstance: function(){
			$(".header-common").removeClass('hide');
			this.el.appendTo($(document.body));
			var pageLoading = $(".page-loading-box");
			eBase.PageRouter.setPageLoading(pageLoading);
			eBase.util.setPageLoadingbar();
		}
	});
	eBase.modules.put('app', app);
	PageRouter.start();
	PageRouter.setRoot(app.el);
},['Exp', 'eBase', 'eBase.Config', 'eBase.Layout' ,'eBase.PageRouter','eBase.util']);