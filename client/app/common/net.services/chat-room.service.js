app.factory('chatroomService',['$http','$q',function($http,$q){
	// console.log(BONDCONFIG);
	return {
		addBatchBondQuote(quoteListChecked){//批量新增报价
			// debugger;
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/addBatchBondQuote",
				data: JSON.stringify({
					'drc':'',
					'addList':quoteListChecked
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		queryBargainDetail(obargain){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/queryNegtprcDtlList",
				data: JSON.stringify({
					'bondOfrid':obargain.bondOfrid,
					'bondNegtprcid':obargain.bondNegtprcid,
					'negtprcUserId':obargain.negtprcUserId
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		publishBargain(IBargain,y,p,n,s){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/addNegtprcDetail",
				data: JSON.stringify({
					'bondOfrid':IBargain.bondOfrid,//债券报价id
					'bondNegtprcid':IBargain.bondNegtprcid,//债券议价id
					'negtprcUserId':IBargain.negtprcUserId,//议价用户
					'bondid':IBargain.bondid,//债券id
					'yldrto':y,
					'netprc':p,
					'num':n,
					'setamt':s
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		updateBargainState(IBargain,OBargain,state){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/updateNegtprcState",
				data: JSON.stringify({
					'bondOfrid':IBargain.bondOfrid,//债券报价id
					'bondNegtprcid':IBargain.bondNegtprcid,//债券议价id
					'negtprcUserId':IBargain.userId,//议价用户
					'negtprcEStatus':state
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		sendBondQuote(bondOfrid,negtprcUserId){
			// debugger;
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/sendBondQuote",
				data: JSON.stringify({
					'bondOfrid':bondOfrid,//债券报价id
					'negtprcUserId':negtprcUserId,//议价用户id
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		getBargainHistory(userId){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/queryBondNegtprcDtlList",
				data: JSON.stringify({
					'negtprcUserId':userId,//议价用户
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		_getCurDate(){
			var curDate = new Date(),
				month = '' + (curDate.getMonth() + 1),
				day = '' + curDate.getDate(),
				year = curDate.getFullYear();
			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;
			return [year, month, day].join('-');
		},
		opYield(bondid,num,yld){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/calSettlementAmountYieldForCM",
				data: JSON.stringify({
					'bondid':bondid,
					'dealDate':this._getCurDate(),
					'clearSpeed':"0",
					'dealNum':num,
					'yield':yld,
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		opNetprc(bondid,num,prc){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/calSettlementAmountCleanPriceForCM",
				data: JSON.stringify({
					'bondid':bondid,
					'dealDate':this._getCurDate(),
					'clearSpeed':"0",
					'dealNum':num,
					'cleanPrice':prc,
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		opNum(bondid,num,yld){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/calSettlementAmountYieldForCM",
				data: JSON.stringify({
					'bondid':bondid,
					'dealDate':this._getCurDate(),
					'clearSpeed':"0",
					'dealNum':num,
					'yield':yld,
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		updateMsgNum(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/updateMsgNum",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		}
	}
}]);
