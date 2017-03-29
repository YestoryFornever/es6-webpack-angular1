class countDownController {
	constructor($scope, $interval) {
		this.$interval = $interval;
		this.time = null;
		this.process = null;

		$scope.$on('$destroy', ()=>{
			// console.log('$destroy');
			$interval.cancel(this.process);
		});
		
	}

	$onInit(){
		var ths = this;
		var time = this.ctrl.time||60*5*1000;
		this.time = this.ctrl.time = time;
		this.ctrl.start = function(){
			ths.start();
		};
		this.ctrl.stop = function(){
			ths.stop();
		};
		this.ctrl.reduction = function(stamp){
			ths.reduction(stamp);
		};

		this.start();
	}

	reduction(stamp){
		this.time = stamp||this.ctrl.time;
		this.start();
	}

	start(){
		this.$interval.cancel(this.process);
		this.process = this.$interval(()=>{
			if (this.time>=1000) {
				this.time -= 1000;
				//console.log(this.time, this.ctrl);
			}else{
				if (this.ctrl && this.ctrl.onZero) {
					this.ctrl.onZero();
				};
				this.stop();
			}
		}, 1000);
	}

	stop(){
		this.$interval.cancel(this.process);
		if (this.ctrl && this.ctrl.onStop) {
			this.ctrl.onStop(this.time);
		};
	}
}
