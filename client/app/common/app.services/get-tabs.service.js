app.service('getTabsService',function(){
	this.tabs = [
		/*{
			routeState:'home',
			routeLabel:'Home',
			routeClass:'active'
		},*/
		{
			routeState:'home.bondquotation',
			routeLabel:'债券报价',
			routeClass:''
		},
		{
			routeState:'home.chatroom',
			routeLabel:'消息中心',
			routeClass:''
		},
		{
			routeState:'home.calculator',
			routeLabel:'计算器',
			routeClass:''
		},
		{
			routeState:'home.minebond',
			routeLabel:'我的报价',
			routeClass:''
		},
		{
			routeState:'home.acoupondetails',
			routeLabel:'个券详情',
			routeClass:''
		},
		{
			routeState:'home.cashoffer',
			routeLabel:'现券报价弹窗',
			routeClass:''
		},
		{
			routeState:'home.backgroundsystem',
			routeLabel:'后台管理',
			routeClass:''
		},
		{
			routeState:'home.backsystem',
			routeLabel:'后台管理_债券报价',
			routeClass:''
		}
	];
	this.getTabs = function() {
		return this.tabs;
	}
});