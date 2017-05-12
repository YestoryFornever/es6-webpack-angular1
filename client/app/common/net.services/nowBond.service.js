app.factory('nowBondService',function($http,$q,$uibModal,ProxyRequestService){
	var resultData = {};
	//用户基本信息
    // resultData.essentialService = function(data) {
    //     var url = "E_project_base/authority/user/getUserInfoPageDetail.json";
    //     return ProxyRequestService.post(url, data);
    // };
	return {
		/**
		 * /
		 * @return {[type]} [description]
		 */
		openNowBondModal(item){
			let that = this;
			let deferred = $q.defer();
			that.dataForModal={
				quoteList:[]
			}
			$uibModal.open({
				animation: true,
				component:'nowBond',
				windowClass:'my-now-bond',
				size: 'wfxl',
				resolve: {
					modalData:function(){
						if(item){
							let obj =angular.extend({}, item);
							that.dataForModal.quoteList.push(obj);
						}
						return that.dataForModal;
					}
				}
			}).result.then(function (selectedItem) {
					deferred.resolve(that.dataForModal);
			});
			return deferred.promise;
		},
		addBatchBondQuote(quoteListChecked){//批量新增报价
			console.log(quoteListChecked)
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
		searchBonds(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/web/queryListForBond",
				data: JSON.stringify({
					creditType:obj.creditType,
					creditSymbol:obj.creditSymbol,
					dealDate:obj.dealDate,
					rateType:obj.rateType,
					termType:obj.termType,
					termStart:obj.termStart,
					termEnd:obj.termEnd,
					pageNum:obj.pageNum,
					pageSize:obj.pageSize,
					orderCol:obj.orderCol,
					orderDirect:obj.orderDirect,
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 债券搜索
		searchBondBreed(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/fuzzyMatchingForBond",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				// console.l og(response)
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 计算净价
		calSettlementAmountYieldForCM(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/calCleanPriceByYieldForCM",
				data: JSON.stringify({
					bondid:obj.bondid,
					dealDate:obj.dealDate,
					clearSpeed:obj.clearSpeed,
					yield:obj.yield,

				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				// console.l og(response)
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 计算收益
		calSettlementAmountCleanPriceForCM(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/calYieldByCleanPriceForCM",
				data: JSON.stringify({

					bondid:obj.bondid,
					dealDate:obj.dealDate,
					clearSpeed:obj.clearSpeed,
					cleanPrice:obj.cleanPrice,

				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				// console.l og(response)
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		bondTp:{
			'data':[
				// {"label": "全部",'checked':true,'id':'', },
				{"label": "利率债",'id':'1', },
				{"label": "国债",'id':'2', },
				{"label": "央票",'id':'3', },
				{"label": "金融债",'id':'4', },
				{"label": "地方债",'id':'5', },
				{"label": "信用债",'id':'6', },
				{"label": "短融",'id':'7', },
				{"label": "中票",'id':'8', },
				{"label": "企业债",'id':'9', },
				{"label": "公司债",'id':'10', },
				{"label": "同业存单",'id':'11', },
				{"label": "其他",'id':'99', },
			]
		},
		face:{
			'data':[
				// {"label": "全部",'checked':true,'id':'', },
				{"label": "浮息",'id':'1', },
				{"label": "固息",'id':'2', },
			]
		},
		sbjRtg:{
			'data':[
				// {"label": "全部",'checked':true,'id':'', },
				{"label": "AAA",'id':'1', },
				{"label": "AA+",'id':'2', },
				{"label": "AA",'id':'3', },
				{"label": "AA-",'id':'4', },
				{"label": "A",'id':'5', },
				{"label": "其他",'id':'6', },
			]
		},
	}

});
