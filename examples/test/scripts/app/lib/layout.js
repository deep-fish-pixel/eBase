;(function(eBase){
	"use strict";
	eBase.Layout = function Layout(options){
		options = options || {};
		this.list = [];
		this.current = {};
		this.instance.apply(this, arguments);
		this.timeCaller = null;
	}
	eBase.extends(eBase.Layout, {
		extend: eBase.extend,
		optionsAdd: 'add',
		optionsDel: 'del',
		optionsAddDel: 'addAndDel',
		optionsNoChange: 'noChange'
	});
	eBase.extends(eBase.Layout.prototype, eBase.Event(), {
		instance: function(){

		}
	});

	eBase.DislocationLayout = eBase.Layout.extend({
		current: {},
		instance: function(options){

		},
		active: function(){

		},
		add: function(router, event){
			/*router.view.el.css({
				'background-color': $(document.body).css('background-color')
			});*/
			var ret = this.handleRoute(router),
				list = this.list,
				current = this.current,
				prouter = current.router;

			if(prouter && prouter.deactive){
				prouter.deactive();
			}

			if(!ret){
				eBase.PageRouter.trigger('deactive');
				list.push(router);
				//第一次不需要动画
				if(prouter){
					this.handleAddRouter(router, prouter, list,
						list.length - 1, current.index, event);
				}
				this.current = {
					index: list.length - 1,
					router: router,
					blankRouter: prouter && prouter.blank && this.current
				};
			}
			else{
				var addIndex = ret.index;
				if(ret.opt === eBase.Layout.optionsNoChange){
					router.blankRouter = prouter && prouter.blank && prouter;
					current.router = router;
					return;
				}
				eBase.PageRouter.trigger('deactive');
				if(ret.opt === eBase.Layout.optionsAddDel){
					router.view.el.addClass('page-add-prev-ani page-hidden');
					router.view.el.insertBefore(ret.nextRouter.view.el);
				}
				this.handleDeleteRouter(router, prouter, list,
					addIndex, current.index, event);
				this.current = {
					index: addIndex,
					router: router
				};
			}
		},
		handleRoute: function(router){
			var list = this.list,
				ret,
				has,
				optType,
				self = this;
			if(list.length){
				list.some(function(item, index){
					if(item.getHash() === router.getHash()){
						//替换真实router
						if(!(item instanceof eBase.Router) || self.current.router === router){
							list[index] = router;
							optType = eBase.Layout.optionsNoChange;
						}

						ret = {
							index: index,
							curRouter: router,
							opt: optType || eBase.Layout.optionsDel
						};
						return true;
					}
				});
				if(!ret){
					var nList, self = this;
					list.some(function (item, index) {
						if(item.getHash().indexOf(router.getHash())>=0){
							has = router,
							nList = list.slice(0, index);
							nList.push(router);
							self.list = list = nList.concat(list.slice(index));
							if(self.current.index >= index){
								self.current.index++;
							}
							ret = {
								index: index,
								curRouter: router,
								nextRouter: list[index+1],
								opt: eBase.Layout.optionsAddDel
							}
							return true;
						}
					})
				}
				return ret;
			}
			else{
				return false;
			}

		},
		addBlankElement: function(el, event){
			function blank(){}
			this.blankRoute = {
				view: {
					el: el,
					render: blank,
					status:{
						init: true,
						destory: false
					},
					getStatus: function(prop){
						if(prop === undefined){
							return this.status;
						}
						return this.status[prop];
					}
				},
				hash: eBase.PageRouter.getHash(),
				getHash: function () {
					return this.hash;
				},
				destroy: function () {
					this.view.status.destory = true;
				},
				blank: true
			}
			this.add(this.blankRoute, event);
		},
		destroy: function(router){
			var list = this.list, l = list.length;
			while(l){
				l--;
				if(list[l] === router){
					this.list = list.slice(0, l).concat(list.slice(l+1));
					break;
				}
			}
		},
		removeBlankElement: function(){
			this.blankRoute = null;
		},
		handleAddRouter: function(current, prev, list, currentIndex, prevIndex, event){
			var cel = current.view.el, pel = prev.view.el;
			if(current){
				cel.removeClass('page-hidden').addClass('page-ani')
					.removeClass('page-add-prev-ani page-del-ani page-del-prev-ani');
				cel.addClass('page-add-ani');
				if(prev){
					pel.removeClass('page-hidden').addClass('page-add-prev-ani')
						.removeClass('page-add-ani page-del-ani page-del-prev-ani');
				}
				if(current.view.render){
					if(event && event.type == 'notrace'){
						update();
					}
					else{
						this.updateTimeCaller(update, cel);
					}
				}
				if(prev.setScrollTop){
					prev.setScrollTop(document.body.scrollTop);
				}
			}
			function update(){
				window.scrollTo(0, 0);
				if(!current.view.getStatus('destory')){
					pel.addClass('page-hidden');
				}
				cel.removeClass('page-ani page-add-ani')/*.css('min-height', document.documentElement.clientHeight || document.body.clientHeight)*/;
			}
		},
		handleDeleteRouter: function(current, prev, list, currentIndex, prevIndex, event){
			var cel = current && current.view.el,
				pel = prev && prev.view.el,
				self = this;
			if(current !== prev){
				if(prev){
					var scroll = document.body.scrollTop,
						clone = pel.clone().css({
							'margin-top': -scroll,
							'position': 'fixed'
						}).appendTo(pel.parent());
					var time = navigator.userAgent.match(/(Android.*MQQBrowser)/)?100:50;
					eBase.delay(function(){
						pel.hide();
						cel.removeClass('page-hidden');
						eBase.delay(function () {
							cel.addClass('page-del-ani').removeClass('page-add-ani page-add-prev-ani page-del-prev-ani');
							if(current.getScrollTop){
								window.scrollTo(0, current.getScrollTop());
							}
							clone.addClass('page-del-prev-ani')
								.removeClass('page-hidden page-add-ani page-add-prev-ani page-del-ani');
							var mids = list.slice(currentIndex+1, prevIndex);
							mids.forEach(function (item, index) {
								self.destroy(item);
								item.destroy();
							});
							if(prev){
								self.destroy(prev);
								prev.destroy({
									remainEl: true
								});
								var blankRouter = prev && prev.blankRouter;
								if(blankRouter){
									delete prev.blankRouter;
									blankRouter.destroy();
								}
							}
							if(current.view.render){
								if(event && event.type == 'notrace'){
									update();
								}
								else{
									self.updateTimeCaller(update, pel);
								}
							}
							function update(){
								pel.remove();
								eBase.off(pel);
								clone.remove();
								cel.removeClass('page-hidden page-ani page-del-ani');
							}
						}, time);
					}, time)
				}
			}

		},
		/*
		* 定时器管理
		* @param {Func} callback 回调方法
		* @param {Zepto|Element} el 元素对象
		* */
		updateTimeCaller: function(callback, el){
			var self = this;
			if(this.timeCaller){
				if(this.timeCaller.el === el){
					clearTimeout(this.timeCaller.timer);
				}
				this.timeCaller = null;
			}
			this.timeCaller = {
				timer: setTimeout(function(){
							if(callback){
								callback();
							}
							self.timeCaller = null;
						}, eBase.Config.layout.animateDuration),
				callback: callback,
				el: el
			};
		},
		hasHistory: function(){
			return !!this.list.length;
		},
		hasRouter: function(fragment){
			var list = this.list;
			return list.some(function (item) {
				if(item.getHash() == fragment || item.getHash() == '#'+fragment){
					return item;
				}
			});
		}
	});
})(eBase);



