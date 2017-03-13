class PagenavController {
	constructor(pagetabService) {
		this.pagetabService = pagetabService;
		this.name = 'pagenav';
		this.navs = [
			/*{
				rstate:"",
				rlabel:"About",
				rclass:"",
				children:[
					{
						rstate:"",
						rlabel:"About Us",
						rclass:"",
					},
					{
						rstate:"",
						rlabel:"About Team",
						rclass:"",
					},
					{
						rstate:"",
						rlabel:"About You",
						rclass:"",
						children:[
							{
								rstate:"",
								rlabel:"More About Us",
								rclass:"",
							},
							{
								rstate:"",
								rlabel:"More About Team",
								rclass:"",
							},
							{
								rstate:"",
								rlabel:"More About You",
								rclass:"",
								children:[
									{
										rstate:"",
										rlabel:"Article",
										rclass:"",
									},
									{
										rstate:"",
										rlabel:"Pics",
										rclass:"",
									},
									{
										rstate:"",
										rlabel:"Error",
										rclass:"",
									}
								]
							}
						]
					}
				]
			},*/
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
								routeLabel: this.routeLabel,
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
								routeLabel: this.routeLabel,
							});
						}
					},
					{
						tabKey: 'home.calculator',
						routeState:"home.calculator",
						routeLabel:"计算器",
						routeClass:"",
					},
					{
						tabKey: 'home.message',
						routeState:'home.message',
						routeLabel:'质讯',
						routeClass:'',
						onClick: function()
						{
							pagetabService.activeTab({
								tabKey: this.tabKey,
								routeState: this.routeState,
								routeLabel: this.routeLabel,
							});
						}
					},
				]
			}
		];
	}
}
PagenavController.$inject = ['pagetabService'];

export default PagenavController;
