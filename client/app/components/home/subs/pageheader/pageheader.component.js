app.component('pageheader', {
	restrict: 'E',
	bindings: {},
	templateUrl: './pageheader.html',
	controller: function($scope, $state,userStatusService, nowBondService, pagetabService, userStatusAuth, NetBondquotationService){
		"ngInject";
		this.nowBondService = nowBondService;
		$scope.NetBondquotationService = NetBondquotationService;
		this.someFunction = function(item, model)
		{
			console.log(item, model);
		}
		this.$onInit = function(){
			this.name = 'pageheader';
		}
		this.logout = function(){
			userStatusAuth.logout();
		}
	}
});
