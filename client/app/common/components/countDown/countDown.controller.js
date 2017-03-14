class countDownController {
	constructor($scope, $interval) {
		this.$interval = $interval;
		this.time = null;
		this.process = null;

		$scope.$on('$destroy', ()=>{
			console.log('$destroy');
			$interval.cancel(this.process);
		});
		
	}

	$onInit(){
		console.log(this.ctrl,',,,,');
		var time = this.ctrl.time||60*5*1000;
		this.time = this.ctrl.time = time;
		this.ctrl.start = this.start;
		this.ctrl.stop = this.stop;
		this.ctrl.reduction = this.reduction;

		this.start();
	}

	reduction(){
		this.time = this.ctrl.time;
		this.start();
	}

	start(){
		this.stop();
		this.process = this.$interval(()=>{
			if (this.time>=1000) {
				this.time -= 1000;
				console.log(this.time, this.ctrl);
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
countDownController.$inject = ['$scope', '$interval'];
export default countDownController;
