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
						rstate:'home.acoupondetails',
						rlabel:'个券详情',
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
