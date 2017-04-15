app.factory('nowBondService',['$http','$q',"$uibModal",function($http,$q,$uibModal){
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
				size: 'wfxl',//'lg',//'sm',
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
			console.log(obj)
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/web/queryListForBond",
				data: JSON.stringify(obj),
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
				{"label": "全部",'checked':true,'id':'', "children": false},
				{"label": "利率债",'checked':false,'id':'1', "children": false},
				{"label": "国债",'checked':false,'id':'2', "children": false},
				{"label": "央票",'checked':false,'id':'3', "children": false},
				{"label": "金融债",'checked':false,'id':'4', "children": false},
				{"label": "地方债",'checked':false,'id':'5', "children": false},
				{"label": "信用债",'checked':false,'id':'6', "children": false},
				{"label": "短融",'checked':false,'id':'7', "children": false},
				{"label": "中票",'checked':false,'id':'8', "children": false},
				{"label": "企业债",'checked':false,'id':'9', "children": false},
				{"label": "公司债",'checked':false,'id':'10', "children": false},
				{"label": "同业存单",'checked':false,'id':'11', "children": false},
				{"label": "其他",'checked':false,'id':'99', "children": false},
			]
		},
		face:{
			'data':[
				{"label": "全部",'checked':true,'id':'', "children": false},
				{"label": "浮息",'checked':false,'id':'1', "children": false},
				{"label": "固息",'checked':false,'id':'2', "children": false},
			]
		},
		sbjRtg:{
			'data':[
				{"label": "全部",'checked':true,'id':'', "children": false},
				{"label": "AAA",'checked':false,'id':'1', "children": false},
				{"label": "AA+",'checked':false,'id':'2', "children": false},
				{"label": "AA",'checked':false,'id':'3', "children": false},
				{"label": "AA-",'checked':false,'id':'4', "children": false},
				{"label": "A",'checked':false,'id':'5', "children": false},
				{"label": "其他",'checked':false,'id':'6', "children": false},
			]
		},
	}

}]);
