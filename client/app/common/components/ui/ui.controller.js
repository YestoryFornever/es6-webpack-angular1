import bottomSheetGridTemplate from './templates/bottom-sheet-grid-template.html';
import GridBottomSheetCtrl from './templates/bottom-sheet-grid.controller.js';
var echarts = require('echarts');

class UiController {
	constructor($timeout, $q, $log, $mdBottomSheet, $mdToast, $mdDialog) {
		this.$timeout = $timeout;
		this.$q = $q;
		this.$log = $log;
		this.$mdBottomSheet = $mdBottomSheet;
		this.$mdToast = $mdToast;
		this.$mdDialog = $mdDialog;
		this.name = 'ui';
		this.simulateQuery = false;
		this.noCache = true;
		this.isDisabled = false;
		this.states = this.loadAll();
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));
		// 绘制图表
		myChart.setOption({
		    title: { text: '结算行情' },
		    tooltip: {},
		    xAxis: {
		        data: ["债券A","债券Z","债券G","债券H","债券J","债券S"]
		    },
		    yAxis: {},
		    series: [{
		        name: '销量',
		        type: 'bar',
		        data: [5, 20, 36, 10, 10, 20]
		    }]
		});
	}
	showGridBottomSheet() {
		this.alert = '';
		var $mdBottomSheet = this.$mdBottomSheet;
		$mdBottomSheet.show({
			//template: '<md-bottom-sheet>Hello!</md-bottom-sheet>'
			//parent: angular.element(document.getElementById('xxx')), //定义生效的父节点
			template:bottomSheetGridTemplate,
			controller:[ '$mdBottomSheet', GridBottomSheetCtrl],
			controllerAs:"$bsctrl",
			clickOutsideToClose: true
		}).then((clickedItem) => {
			this.$mdToast.show(
				this.$mdToast.simple()
					.textContent(clickedItem['name'] + ' clicked!')
					.position('top right')
					.hideDelay(30000)
			);
		});
	}
	//md-autocomplete
	newState(state) {
		alert("Sorry! You'll need to create a Constitution for " + state + " first!");
	}
	querySearch (query) {
		var results = query ? this.states.filter( this.createFilterFor(query) ) : this.states, deferred;
		if (this.simulateQuery) {
			deferred = this.$q.defer();
			$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
			return deferred.promise;
		} else {
			return results;
		}
	}
	searchTextChange(text) {
		this.$log.info('Text changed to ' + text);
	}
	selectedItemChange(item) {
		this.$log.info('Item changed to ' + JSON.stringify(item));
	}
	loadAll() {
		var allStates = `Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, 
		Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, 
		Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, 
		Montana,Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, 
		North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, 
		South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming`;

		return allStates.split(/, +/g).map( function (state) {
			return {
				value: state.toLowerCase(),
				display: state
			};
		});
	}
	createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(state) {
			return (state.value.indexOf(lowercaseQuery) === 0);
		};
	}
	showAlert(ev) {
		// Appending dialog to document.body to cover sidenav in docs app
		// Modal dialogs should fully cover application
		// to prevent interaction outside of dialog
		this.$mdDialog.show(
			this.$mdDialog.alert()
				//parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('This is an alert title')
				.textContent('You can specify some description text in here.')
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
				.targetEvent(ev)
		);
	}
}
UiController.$inject = ['$timeout', '$q', '$log', '$mdBottomSheet', '$mdToast', '$mdDialog'];
export default UiController;