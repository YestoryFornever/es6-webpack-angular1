class PagenavController {
	constructor(pagetabService,NetBondquotationService, userStatusService) {
		"ngInject";
		this.pagetabService = pagetabService;
		this.NetBondquotationService = NetBondquotationService;
		this.name = 'pagenav';
		this.navs = [
			{
				routeLabel:"债券报价",
				children:[
					{
						tabKey: 'home.bondquotation',
						routeState:"home.bondquotation",
						routeLabel:"债券报价",
						ngif: userStatusService.realCertifyState==3,
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
						tabKey: 'home.chatroom.bargainlist',
						routeState:"home.chatroom.bargainlist",
						routeLabel:"消息中心",
						ngif: userStatusService.realCertifyState==3,
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
							NetBondquotationService.openCalculator();
						}
					},

					{
						tabKey: 'home.newdebtinformation',
						routeState:'home.newdebtinformation',
						routeLabel:'新债信息',
						routeClass:'',
						// ngif: false,
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
						tabKey: 'home.newdebtinformationdetails',
						routeState:'home.newdebtinformationdetails',
						routeLabel:'新债详情信息',
						routeClass:'',
						// ngif: false,
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
						tabKey: 'home.newdebtdialog',
						routeState:'home.newdebtdialog',
						routeLabel:'弹窗',
						routeClass:'',
						// ngif: false,
						onClick: function()
						{
							pagetabService.activeTab({
								tabKey: this.tabKey,
								routeState: this.routeState,
								routeLabel: this.routeLabel
							});
						}
					},
				]
			}
		];
	}
}
