import angular from 'angular';
/**
 * 用户相关接口 DEMO
 * @type {[type]}
 */
let netUserService = angular.module('netUserService', [])
.factory('netUserService',['$http','$q',function($http,$q){
	return {
		/**
		 * 生成UUID
		 */
		generateUuid: function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		},
		/**
		 * 用户登录
		 * @param  {[type]}
		 * @param  {[type]}
		 * @param  {[type]}
		 * @return {[type]}
		 */
		login: function(account, password, ifSecond){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: "/E_project_base/authority/login/loginValidate",
				data: {
					loginName:account,
					loginPassword:password,
					// pictureAuthkey:"",
					loginWay:"4",
					loginTerminalType:"2",
					equipmentNumber:"WEB-EBASE",
					numberOfLanding:this.generateUuid(),
					// auroraID:"",
					isCarryOn:ifSecond?"1":""
				},
				headers: {}
			}).then((response)=>{
				if(response.data.status==="0"){
					BONDCONFIG.setUSERINFO(response.data.data);
					deferred.resolve(response);
				}else{
					deferred.reject(response);
				}
			},(responseError)=>{
				deferred.reject(responseError);
			});
			return deferred.promise;
		},
	}
}]);

export default netUserService.name;
