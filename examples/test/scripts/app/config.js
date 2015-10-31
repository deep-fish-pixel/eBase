;(function(eBase){
	//模板项目路径
	window.eBase.Config = {
		view:{
			requireTimes:{
				'always': 'always',
				'once': 'once'
			},
			//loading加载显示最小时长
			loadingMinTime: 700,
			prefetch: true
		},
		router:{
			resources:{
				'': ['style/css/page/page-first.css','app/page/page-first'],
				'page-second': ['style/css/page/page-second.css','app/page/page-second'],
				'page-third':['style/css/page/page-third.css','app/page/page-third']
			},
			//根目录,未启动
			closeRoot: true,
			//是否打开目录path
			openPath: true,
			//path参数名称
			pathName: 'path'
		},
		service:{
			urls:{
				templatePath: appConfig.templatePath || 'data/html'
			},
			timeout: 10000
		},
		layout:{
			animateDuration: 600
		},
		//用于模拟配置
		simulate: {
			reqResFail: false,
			timeout: 3000
		},
		//sit、pre、prd可关闭
		debug: true,
		//会员体系，默认epp的会员，过滤认证功能
		member:'epp',
		//部分会员认证，默认全局会员
		partMemberRequire: true
	}


})(eBase);


