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
			onTop:'&',
			height: '@',
			width: '@',
			startValue: '='
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
				startY: scope.startValue | 0
				// scrollbars: true,
				// fadeScrollbars: false,
				// hideScrollbar: false,
			});
			var isScoller = false;
			myScroll.on('scrollEnd', function(){

				// console.log(this);
				// console.log('finshed scrolling wrapper', this.x, this.y, this);
				if (this.maxScrollY>=this.y) {
					// console.log('到底部了');
					scope.onBottom.call(this);
				}else if(this.y==0){

					scope.onTop.call(this);
				};
				// isScoller = false
			});
			// myScroll.on('scrollStart', function(){
			// 	console.log(this,',,,');
			// 	isScoller == true;

			// });
			// myScroll.on('scroll', function(){
				// isScoller == true;
			// 	console.log(this);
				
			// });

			scope.$on('iscroll:refresh', function(){
				myScroll.refresh();
			});

			var raw_height = $(element)[0].scrollHeight;
			var timer = $interval(()=>{
				if ($(element)[0].scrollHeight!=raw_height) {
					// console.log('iscroll 内部高度发生变化');
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