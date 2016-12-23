class BondquotationController {
	constructor($http) {
		this.name = 'bondquotation';
		this.$http = $http;
		console.log($http);
		this.phones = [
			{
				name: '茶花女',
				snippet: '小仲马'
			}, {
				name: '羊脂球',
				snippet: '莫泊桑'
			}, {
				name: '杜十娘',
				snippet: '不知道'
			}
		];
		this.orderProp = 'name';
	}
}
BondquotationController.$inject = ['$http'];
export default BondquotationController;
