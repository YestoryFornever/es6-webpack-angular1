class PagenavController {
	constructor(pagetabService,bondquotationService, netUserService) {
		"ngInject";
		this.pagetabService = pagetabService;
		this.bondquotationService = bondquotationService;
		this.name = 'pagenav';
		this.navs = [
			{
				routeState:"",
				routeLabel:"债券报价",
				routeClass:"",
				children:[
					{
						tabKey: 'home.bondquotation',
						routeState:"home.bondquotation",
						routeLabel:"债券报价",
						routeClass:"",
						onClick: function()
						{
							pagetabService.activeTab({
								tabKey: this.tabKey,
								routeState: this.routeState,
								routeLabel: this.routeLabel
							});
						}
					},
					{
						tabKey: 'home.chatroom',
						routeState:"home.chatroom",
						routeLabel:"消息中心",
						routeClass:"",
						onClick: function()
						{
							pagetabService.activeTab({
								tabKey: this.tabKey,
								routeState: this.routeState,
								routeLabel: this.routeLabel
							});
						}
					},
					{
						tabKey: 'home',
						routeState:"home",
						routeLabel:"计算器",
						routeClass:"",
						onClick: function()
						{
							bondquotationService.openCalculator();
						}
					},
					{
						tabKey: 'home.message',
						routeState:'home.message',
						routeLabel:'资讯',
						routeClass:'',
						onClick: function()
						{
							pagetabService.activeTab({
								tabKey: this.tabKey,
								routeState: this.routeState,
								routeLabel: this.routeLabel
							});
						}
					},
					// {
					// 	tabKey: 'home.capitalQuotation',
					// 	routeState:'home.capitalQuotation',
					// 	routeLabel:'资金报价',
					// 	routeClass:'',
					// 	onClick: function()
					// 	{
					// 		pagetabService.activeTab({
					// 			tabKey: this.tabKey,
					// 			routeState: this.routeState,
					// 			routeLabel: this.routeLabel,
					// 		});
					// 	}
					// },
					// {
					// 	tabKey: 'home.messagedetail',
					// 	routeState:'home.messagedetail',
					// 	routeLabel:'资讯详情',
					// 	routeClass:'',
					// 	onClick: function()
					// 	{
					// 		pagetabService.activeTab({
					// 			tabKey: this.tabKey,
					// 			routeState: this.routeState,
					// 			routeLabel: this.routeLabel
					// 		});
					// 	}
					// },
					// {
					// 	tabKey: 'home.cast',
					// 	routeState:'home.cast',
					// 	routeLabel:'直播',
					// 	routeClass:'',
					// 	onClick: function()
					// 	{
					// 		pagetabService.activeTab({
					// 			tabKey: this.tabKey,
					// 			routeState: this.routeState,
					// 			routeLabel: this.routeLabel
					// 		});
					// 	}
					// }
				]
			}
		];

		// netUserService.getMenuList().then(function(data){
		// 	console.log('getMenuList',data);
		// }).catch((error)=>{
		// 	console.log('fail',error);
		// });
	}
}
