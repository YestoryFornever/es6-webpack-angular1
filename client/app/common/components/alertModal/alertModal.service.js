var BONDCONFIG = require('../../../../bond.config.js');
import angular from 'angular';

let AlertModalServiceModule = angular.module('AlertModalService', [])
.factory('AlertModalService',['$http','$q','$uibModal',function($http,$q,$uibModal){
	return {
		//
		openBox(item){
			this.$uibModal = $uibModal;
			this.dataModal ={
				itemInfo:{},
			}
			let that =this;
			this.$uibModal.open({
				animation: true,
				component:'alertModal',
				windowClass:'my-alert-modal',
				size: 'xxx',//'lg',//'sm',
				resolve: {
					modalData:function(){
						if(item){
							that.dataModal['itemInfo'] = item;
						}
						return that.dataModal;
					}
				}
			}).result.then(function (selectedItem) {},that);
		}
	}
}])
.name;
export default AlertModalServiceModule;