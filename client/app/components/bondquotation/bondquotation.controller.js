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
		this.minus = function(no){
			return plus.minus(++no);
		}
	}
}
BondquotationController.$inject = ['$http','plusService'];
export default BondquotationController;
