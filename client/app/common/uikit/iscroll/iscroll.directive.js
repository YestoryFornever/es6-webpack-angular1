/**
 * 滚动条组件
 * 使用：<iscroll on-bottom='$ctrl.onBottom()' height='100' width='100'><ul style="height:500%"></ul></iscroll>
 * onBottom事件可以调用 this.refresh();来刷新列表
 */
app.directive('iscroll', function($parse, $interval){
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: './iscroll.html',
		transclude: true,
		scope: {
			onBottom: '&',
			height: '@',
			width: '@'
		},
		link: function(scope, element, attrs, ctrl) {
			if (scope.width) {
				$(element).css('width', scope.width);
			};
			if (scope.height) {
				$(element).css('height', scope.height);
			};
			
			var myScroll = new IScroll($(element).get(0), {
			    // snap: false,
				// hScrollbar: true,
				// vScrollbar: false,
				scrollbars: true,
				mouseWheel: true,
				// scrollbars: true,
				// fadeScrollbars: false,
				// hideScrollbar: false,
			});
			myScroll.on('scrollEnd', function(){
				// console.log('finshed scrolling wrapper', this.x, this.y, this);
				if (this.maxScrollY>=this.y) {
					// console.log('到底部了');
					scope.onBottom.call(this);
				};
			});

			scope.$on('iscroll:refresh', function(){
				myScroll.refresh();
			});

			var raw_height = $(element)[0].scrollHeight;
			var timer = $interval(()=>{
				if ($(element)[0].scrollHeight!=raw_height) {
					console.log('iscroll 内部高度发生变化');
					myScroll.refresh();
					raw_height = $(element)[0].scrollHeight;
				};
			}, 200);
			scope.$on('$destroy', ()=>{
				$interval.cancel(timer);
			});
		}
	};
});