app.component('pageheader', {
	restrict: 'E',
	bindings: {},
	templateUrl: './pageheader.html',
	controller: function($scope, $state,userStatusService,healdCalculatorService, nowBondService, pagetabService, userStatusAuth, netBondTrialService){
		"ngInject";
		this.nowBondService = nowBondService;
		$scope.netBondTrialService = netBondTrialService;
		$scope.healdCalculatorService = healdCalculatorService;
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
