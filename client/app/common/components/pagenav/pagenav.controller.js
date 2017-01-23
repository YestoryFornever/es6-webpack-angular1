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
				rlabel:"ծȯ����",
				rclass:"",
				children:[
					{
						rstate:"home.bondquotation",
						rlabel:"ծȯ����",
						rclass:"",
					},
					{
						rstate:"home.chatroom",
						rlabel:"��Ϣ����",
						rclass:"",
					},
					{
						rstate:"home.calculator",
						rlabel:"������",
						rclass:"",
					},
					{
						rstate:'home.acoupondetails',
						rlabel:'��ȯ����',
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
