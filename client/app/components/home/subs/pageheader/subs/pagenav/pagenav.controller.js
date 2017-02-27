class PagenavController {
	constructor() {
		this.name = 'pagenav';
		this.navs = [
			{
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
			},
			{
				rstate:"",
				rlabel:"债券报价",
				rclass:"",
				children:[
					{
						rstate:"home.bondquotation",
						rlabel:"债券报价",
						rclass:"",
					},
					{
						rstate:"home.chatroom",
						rlabel:"消息中心",
						rclass:"",
					},
					{
						rstate:"home.calculator",
						rlabel:"计算器",
						rclass:"",
					},
					{
						rstate:'home.minebond',
						rlabel:'我的报价',
						rclass:''
					},
					{
						rstate:'home.acoupondetails',
						rlabel:'个券详情',
						rclass:''
					},
					{
						rstate:'home.cashoffer',
						rlabel:'现券报价弹窗',
						rclass:''
					},
					{
						rstate:'home.backgroundsystem',
						rlabel:'后台管理查询报价',
						rclass:''
					},
					{
						rstate:'home.backsystem',
						rlabel:'后台管理_债券报价',
						rclass:''
					}
				]
			}
		];
	}
	addtab(nav){
		this.onAddTab({nav:nav});
	}
}

export default PagenavController;
