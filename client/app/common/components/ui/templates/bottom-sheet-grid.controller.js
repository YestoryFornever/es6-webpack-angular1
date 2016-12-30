class GridBottomSheetCtrl {
	constructor($mdBottomSheet) {
		this.$mdBottomSheet = $mdBottomSheet;
		this.items = [
			{ name: 'Hangout', icon: 'hangout' },
			{ name: 'Mail', icon: 'mail' },
			{ name: 'Message', icon: 'message' },
			{ name: 'Copy', icon: 'copy2' },
			{ name: 'Facebook', icon: 'facebook' },
			{ name: 'Twitter', icon: 'twitter' },
		];
	}
	listItemClick($index) {
		console.log($index);
		var clickedItem = this.items[$index];
		this.$mdBottomSheet.hide(clickedItem);
	}
}
GridBottomSheetCtrl.$inject = ['$mdBottomSheet'];
export default GridBottomSheetCtrl;