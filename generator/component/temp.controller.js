class <%= upCaseName %>Controller {
	constructor($scope,$rootScope) {
		"ngInject";
		this.name = '<%= name %>';
		this.$scope = $scope;
		this.$rootScope = $rootScope;
	}
	$onInit(){}
}
