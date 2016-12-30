import bottomSheetGridTemplate from './templates/bottom-sheet-grid-template.html';
import GridBottomSheetCtrl from './templates/bottom-sheet-grid.controller.js';
class UiController {
	constructor($timeout, $q, $log, $mdBottomSheet) {
		this.$timeout = $timeout;
		this.$q = $q;
		this.$log = $log;
		this.$mdBottomSheet = $mdBottomSheet;
		this.name = 'ui';
		this.simulateQuery = false;
		this.noCache = true;
		this.isDisabled = false;
		this.states = this.loadAll();
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
			this.$log.debug( clickedItem.name + ' clicked!');
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
}
UiController.$inject = ['$timeout', '$q', '$log', '$mdBottomSheet'];
export default UiController;