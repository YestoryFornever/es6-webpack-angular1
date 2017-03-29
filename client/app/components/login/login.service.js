app.factory('loginService',['$http','$q',function($http,$q){
	return {
		Guid:function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		},
		login:function(account, password, ifSecond){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"E_project_base/authority/login/loginValidate",
				data: {
					loginName:account,
					loginPassword:password,
					// pictureAuthkey:"",
					loginWay:"4",
					loginTerminalType:"2",
					equipmentNumber:"WEB-EBASE",
					numberOfLanding:this.Guid(),
					// auroraID:"",
					isCarryOn:ifSecond?"1":""
				}
			}).then((response)=>{
				if(response.data.status==="0"){
					BONDCONFIG.setUSERINFO(response.data.data);
				}
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		register:function(acc,pas){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"E_project_base/authority/register/registerValidate",
				data: {
					loginName:acc,
					shortMessageAuthkey:"1234",
					loginPassword:pas,
					// referralCode:"",
					loginWay:"4",
					loginTerminalType:"2",
					// auroraID:"",
					equipmentNumber:"WEB-EBASE"
				}
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		generate(acc){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"E_project_base/authority/verification/smsExistGeneration",
				data: {
					phone:acc,
				},
				headers: BONDCONFIG.JH
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		}
	}
}]);
