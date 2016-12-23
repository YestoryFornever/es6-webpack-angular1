class BondquotationController {
	constructor($http,plus) {
		this.name = 'bondquotation';
		this.$http = $http;
		console.log($http);
		this.phones = [
			{
				name: '茶花女',
				snippet: '小仲马',
				check:true,
				no:1,
			}, {
				name: '羊脂球',
				snippet: '莫泊桑',
				check:false,
				no:2,
			}, {
				name: '杜十娘',
				snippet: '不知道',
				check:false,
				no:3,
			}
		];
		this.orderProp = 'name';
		this.p1 = function(no){
			return plus.myFn(++no);
		}
	}
}
BondquotationController.$inject = ['$http','plus'];
export default BondquotationController;
