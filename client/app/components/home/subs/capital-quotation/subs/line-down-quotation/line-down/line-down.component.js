app.component('lineDownComponent', {
    restrict: 'E',
    bindings: {},
    templateUrl: './line-down.html',
    controller: function($scope,$state,$stateParams,$rootScope,pagetabService, netCapitalQuoteService,AlertModalService) {
        // body...
        "ngInject";
        $scope.disBtn = false;
        $scope.changeStatus =false;
        pagetabService.activeTab({
            tabKey: 'home.willBond',
            routeState: $state.$current.name,
            routeLabel:"我要报价",
        });
        // 下拉数据
        $scope.drcSelect     = netCapitalQuoteService.drcSelect;
        $scope.trmTpSelect   = netCapitalQuoteService.trmTpSelect;
        $scope.modeSelect    = netCapitalQuoteService.modeSelect;
        $scope.intrtTpSelect = netCapitalQuoteService.intrtTpSelect;
        $scope.txnRstSelect  = netCapitalQuoteService.txnRstSelect;
        $scope.ctlgSelect    = netCapitalQuoteService.ctlgSelect;
        $scope.dayMonSelect    = netCapitalQuoteService.dayMonSelect;

		$scope.templteObj     = netCapitalQuoteService.templte;//模板
		$scope.tempUDFTrm    = {
            uDFTrm:"",
            uDFTrmUnit:"1",
            uDFInRtVal:"",
        };//自定义 期限数组
		$scope.ofrDscListInfo     = "";
        $scope.ofrDscList   = [];
		$scope.templte            = angular.copy($scope.templteObj);
        $scope.templte.uDFTrmList.push($scope.tempUDFTrm)
		/**
         * 重新报价 获取详情
         */
        $scope.getDetailForId =function(){
            netCapitalQuoteService.getOfflineOfrDetails($stateParams.ofrid)
            .then((res) => {
                $scope.ofrDscList = res.data.data.list;
                getListEnd();
            });
        }
        /**
		 *  添加一条 数据
		 */
        $scope.addBondList = function() {
            let templte = angular.copy($scope.templte);
            $scope.ofrDscList.push(templte);
        }
        /**
         * 添加一条自定义数据
         * @return {[type]} [description]
         */
         $scope.adduDFTrmList = function(item) {
            let tempUDFTrm =angular.copy($scope.tempUDFTrm);
         	if(item.uDFTrmList.length && item.uDFTrmList.length<5){
         		item.uDFTrmList.push(tempUDFTrm)
         	}
        }
        $scope.offlineAnalysisOfr = function() { //提取线下报价
            let reg = /\n/g;
            let arr = $scope.ofrDscListInfo ? $scope.ofrDscListInfo.split(reg) : [];
            netCapitalQuoteService.offlineAnalysisOfr({
                ofrDscList:arr
            })
            .then((res) => {
                $scope.ofrDscList = res.data.data;
                getListEnd();
            },(err)=>{
                AlertModalService.open('',err.data.msg);
            });
        }
        function beforeSend(){
            angular.forEach($scope.ofrDscList,(item)=>{
                angular.forEach(item.uDFTrmList,(second,index)=>{
                    var k1 = 'uDFTrm' + (index+1);
                    var k2 = 'uDFTrmUnit' + (index+1);
                    var k3 = 'uDFInRtVal' + (index+1);
                    item[k1] = second.uDFTrm;
                    item[k2] = second.uDFTrmUnit;
                    item[k3] = second.uDFInRtVal;
                })
            })
        }
        var _fields = ['uDFTrm','uDFTrmUnit','uDFInRtVal'];
        var _indexs =['1','2','3','4','5'];
        var _names = ['dy1IntRtVal','dy7IntRtVal','dy14IntRtVal','dy21IntRtVal','mo1IntRtVal','mo2IntRtVal','mo3IntRtVal','mo6IntRtVal','mo9IntRtVal','yr1IntRtVal'];
        function getListEnd(){
            angular.forEach($scope.ofrDscList,(item)=>{
                item.uDFTrmList =  [];
                angular.forEach(_names ,(_name,_nameIndex)=>{
                    if(item[_name]){
                        item[_name] = parseFloat(item[_name]);
                    }
                })
                angular.forEach(_indexs , (val ,index)=>{
                    let obj ={
                        uDFTrm:'',
                        uDFTrmUnit:'',
                        uDFInRtVal:''
                    }
                    var k1 = 'uDFTrm' + (index+1);
                    var k2 = 'uDFTrmUnit' + (index+1);
                    var k3 = 'uDFInRtVal' + (index+1);
                    if(item[k1]){
                        obj[_fields[0]] = parseFloat(item[k1]) ;
                    }
                    if(item[k2]){
                        obj[_fields[1]] = parseFloat(item[k2]);
                    }
                    if(item[k3]){
                        obj[_fields[2]] = parseFloat(item[k3]);
                    }
                    if(item[k1]){
                        item.uDFTrmList.push(obj)
                    }
                })
            })
        }
        /**
         * 发送请求前
         * @return {[type]} [description]
         */
        function beforeSend(){
            angular.forEach($scope.ofrDscList,(item)=>{
                angular.forEach(item.uDFTrmList,(second,index)=>{
                    var k1 = 'uDFTrm' + (index+1);
                    var k2 = 'uDFTrmUnit' + (index+1);
                    var k3 = 'uDFInRtVal' + (index+1);
                    item[k1] = second.uDFTrm;
                    item[k2] = second.uDFTrmUnit;
                    item[k3] = second.uDFInRtVal;
                })
            })
        }
        /**
         * 获取数据后
         * @type {Array}
         */
        var _fields = ['uDFTrm','uDFTrmUnit','uDFInRtVal'];
        var _indexs =['1','2','3','4','5'];
        function getListEnd(){
            angular.forEach($scope.ofrDscList,(item,index)=>{
                item.drc += '';
                item.ctlg += '';
                item.uDFTrmList =  [];
                angular.forEach(_indexs , (val ,index)=>{
                    let obj ={
                        uDFTrm:'',
                        uDFTrmUnit:'',
                        uDFInRtVal:''
                    }
                    var k1 = 'uDFTrm' + (index+1);
                    var k2 = 'uDFTrmUnit' + (index+1);
                    var k3 = 'uDFInRtVal' + (index+1);
                    if(item[k1]){
                        obj[_fields[0]] = item[k1]
                    }
                    if(item[k2]){
                        obj[_fields[1]] = item[k2]
                    }
                    if(item[k3]){
                        obj[_fields[2]] = item[k3]
                    }
                    if(item[k1]){
                        item.uDFTrmList.push(obj)
                    }
                })
                if($scope.ofrDscList[index].uDFTrmList && $scope.ofrDscList[index].uDFTrmList.length==0){
                    $scope.ofrDscList[index].uDFTrmList.push($scope.tempUDFTrm)
                }
            })
        }
        /**
         * 发送请求前
         * @return {[type]} [description]
         */
        function beforeSend(){
            angular.forEach($scope.ofrDscList,(item)=>{
                angular.forEach(item.uDFTrmList,(second,index)=>{
                    var k1 = 'uDFTrm' + (index+1);
                    var k2 = 'uDFTrmUnit' + (index+1);
                    var k3 = 'uDFInRtVal' + (index+1);
                    item[k1] = second.uDFTrm;
                    item[k2] = second.uDFTrmUnit;
                    item[k3] = second.uDFInRtVal;
                })
            })
        }
        /**
         * 获取数据后
         * @type {Array}
         */
        var _fields = ['uDFTrm','uDFTrmUnit','uDFInRtVal'];
        var _indexs =['1','2','3','4','5'];
        function getListEnd(){
            angular.forEach($scope.ofrDscList,(item,index)=>{
                item.drc += '';
                item.ctlg += '';
                item.uDFTrmList =  [];
                angular.forEach(_indexs , (val ,index)=>{
                    let obj ={
                        uDFTrm:'',
                        uDFTrmUnit:'',
                        uDFInRtVal:''
                    }
                    var k1 = 'uDFTrm' + (index+1);
                    var k2 = 'uDFTrmUnit' + (index+1);
                    var k3 = 'uDFInRtVal' + (index+1);
                    if(item[k1]){
                        obj[_fields[0]] = item[k1]
                    }
                    if(item[k2]){
                        obj[_fields[1]] = item[k2]
                    }
                    if(item[k3]){
                        obj[_fields[2]] = item[k3]
                    }
                    if(item[k1]){
                        item.uDFTrmList.push(obj)
                    }
                })
                if($scope.ofrDscList[index].uDFTrmList && $scope.ofrDscList[index].uDFTrmList.length==0){
                    $scope.ofrDscList[index].uDFTrmList.push($scope.tempUDFTrm)
                }
            })
        }
        /**
         * 发布或者 修改
         * @param  {[type]} $stateParams.ofrid [description]
         * @return {[type]}                    [description]
         */
        if($stateParams.ofrid){
            $scope.changeStatus =true;
            $scope.getDetailForId();
        }
        $scope.addOrChange = function(){
            if($scope.changeStatus){
                $scope.update();
            }else{
                $scope.offlineAddOfr();
            }
        }
        /**
         * 更新报价
         */
        $scope.update = function(){
            netCapitalQuoteService.offlineUpdateOfr($scope.ofrDscList[0])
            .then(function(res) {
                $state.go('home.capitalQuotation.lineDownQuotation',{},{reload:true})
            },(err)=>{
                pagetabService.closeByKey('home.willBond');
                AlertModalService.open('',err.data.msg)
            },(err)=>{
                AlertModalService.open(null ,err.data.msg)
            });
        }
        /**
         * /发布报价
         * @return {[type]} [description]
         */
        $scope.offlineAddOfr = function() {
            beforeSend();
            $scope.disBtn = true;
            netCapitalQuoteService.offlineAddOfr( $scope.ofrDscList)
            .then(function(res) {
                $scope.disBtn = false;
                pagetabService.closeByKey('home.willBond');
                $state.go('home.capitalQuotation.lineDownQuotation',{},{reload:true})
            },(err)=>{
                $scope.disBtn = false;
                AlertModalService.open(null ,err.data.msg)
            });
        }
        $scope.cancle = function(){
            AlertModalService.open('取消报价','确定要取消该报价吗 ？',true)
            .then((res)=>{
                pagetabService.closeByKey('home.willBond');
                $state.go($state.$current.parent)
            });
        }
        /**
         * 删除一行数据  提示框
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        $scope.deleteList = function(index){
            AlertModalService.open('删除报价','确定要删除该报价吗 ？',true)
            .then((res)=>{
               $scope.ofrDscList.splice(index, 1);
            });
        }
    }
})