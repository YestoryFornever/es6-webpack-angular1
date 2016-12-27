class PagetabController {
	constructor() {
		this.name = 'pagetab';
		this.navs = [
			{
				routeState:'home',
				routeLabel:'Home',
				routeClass:'active'
			},
			{
				routeState:'home.bondquotation',
				routeLabel:'债券报价',
				routeClass:''
			},
			{
				routeState:'home.chatroom',
				routeLabel:'聊天室',
				routeClass:''
			},
			{
				routeState:'home.calculator',
				routeLabel:'计算器',
				routeClass:''
			}
		];
	}
}

export default PagetabController;
