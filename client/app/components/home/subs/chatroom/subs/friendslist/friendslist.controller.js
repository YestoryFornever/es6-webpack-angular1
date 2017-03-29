class FriendslistController {
	constructor() {
		"ngInject";
		this.name = 'friendslist';
	}
	$onInit(){
		this.items = [
			{
				name: '茶花女',
				snippet: '小仲马',
				time:"下午 13:02",
				image:"../../../resource/images/afcat.png",
				checked:true,
				no:1,
			},
			{
				name: '羊脂球',
				snippet: '莫泊桑',
				time:"下午 13:02",
				image:"../../../resource/images/afcat.png",
				checked:false,
				no:2,
			},
			{
				name: '杜十娘',
				snippet: '不知道',
				time:"下午 13:02",
				image:"../../../resource/images/afcat.png",
				checked:false,
				no:3,
			}
		];
	}
}
