class TestController {
	constructor($http, $timeout, plus) {
		this.$http = $http;
		this.$timeout = $timeout;
		this.plus = plus;
	}
	$onInit(){
		this.name = 'bondquotation';
		this.orderProp = 'name';
		this.phones = [
			{
				name: '茶花女',
				snippet: '小仲马',
				check:true,
				no:1,
			},
			{
				name: '羊脂球',
				snippet: '莫泊桑',
				check:false,
				no:2,
			},
			{
				name: '杜十娘',
				snippet: '不知道',
				check:false,
				no:3,
			}
		];
		this.updateClock();
	}
	minus(no){
		return this.plus.minus(++no);
	}
	updateClock(){
		this.clock = new Date();
		this.$timeout(()=>{
			this.updateClock();
		},1000);
	}
}
TestController.$inject = ['$http','$timeout','plusService'];
export default TestController;
