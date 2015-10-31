;(function(window, eBase){
	eBase.util = {
		showLoading: function () {
			//this.messageAlertBox = Exp.createLoading();
		},
		hideLoading: function() {
			/*if (this.messageAlertBox) {
				this.messageAlertBox.reset();
			}*/
		},
		showAlert: function (message, callback) {
			Exp.showAlert(message, callback);
		},
		removeUndefined: function (data){
			if(data){
				for(var i in data){
					if(data[i] == undefined || data[i] == "undefined"){
						delete data[i];
					}
				}
			}
		},
		/*
		 * 顶部进度条
		 * @param {Element} [el] 进度条元素
		 * */
		setPageLoadingbar: function (el){
			if(el){
				this.loadingbar = el;
			}
			else{
				this.loadingbar = $('<div class="loadingbar"></div>').appendTo(document.body);
			}
		},
		/*
		 * 获取顶部进度条
		 * */
		getPageLoadingbar: function (){
			return this.loadingbar;
		},
		/*
		 * 控制顶部进度条进度
		 * @param {Number} process 进度 0~100
		 * @param {Number} size 总个数
		 * */
		setPageProcess: function (process, size){
			var loading = this.loadingbar,
				size = size || 1,
				max = 140,
				func = arguments.callee,
				lastProcess = func.lastProcess;
			if(loading){
				if(process>=100){
					process = max;
				}
				else{
					process += (150 - process)/size;
					if(process>100){
						process = 100;
					}
				}
				if(func.timer){
					clearTimeout(func.timer);
				}
				if(loading.css('display') == 'none'){
					loading.css({
						width:'0%'
					});
					loading.css('opacity', 1);
					loading.show();
				}
				if(lastProcess > process && lastProcess < max){
					return;
				}
				func.lastProcess = process;

				setTimeout(function () {
					if(loading){
						loading.css({
							width: process+'%'
						});
					}
					if(process > 100){
						func.timer = setTimeout(function(){
							if(loading){
								loading.css('opacity', 0);
								func.timer = setTimeout(function(){
									loading.hide().css('opacity', 1);
								},200);
							}
							func.timer = null;
						}, 500);
					}
				}, 0);
			}
		},
		sessionStorage:{},
		/*
		 * 使用sessionStorage存数据，如果失败放入util.sessionStorage
		 * */
		put: function (key, value){
			if(value && eBase.isObject(value) &&!(eBase.isFunction(value)
				||eBase.isArray(value)
				||eBase.isString(value)
				||eBase.isNumber(value))){
				value = JSON.stringify(value);
			}
			try{
				if(window.sessionStorage){
					window.sessionStorage.setItem(key, value)
				}
				else{
					this.sessionStorage[key] = value;
				}
			}catch(e){
				this.sessionStorage[key] = value;
			}
		},
		/*
		 * 使用sessionStorage取数据，如果失败从util.sessionStorage取
		 * */
		get: function (key){
			var value;
			try{
				if(window.sessionStorage){
					value = window.sessionStorage.getItem(key);
				}
				else{
					value = this.sessionStorage[key];
				}
			}catch(e){
				value = this.sessionStorage[key];
			}
			if(value && /^\{[\s\S]*\}$/.test(value)){
				value = JSON.parse(value);
			}
			return value;
		},
		/*
		 * 无效值跳转到指定hash,否则返回指定值
		 * @param String [redirect] hash
		 * */
		unvalideDirect: function (key, redirect){
			var value = this.get(key);
			if(!value){
				eBase.PageRouter.go('#'+redirect);
			}
			else{
				return value;
			}
		}

	};

})(window, eBase);