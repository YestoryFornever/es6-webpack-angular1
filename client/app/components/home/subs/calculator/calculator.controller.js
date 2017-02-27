class CalculatorController {
	constructor() {
		this.name = 'calculator';
		this.info='';
		this.value1 = '';
	}
	$onInit(){
	}
	//获取input 值
	getValue(value,fff){
		console.log(fff)//input value 值
	}
	ourStopPropagation(ev){
		this.info = 123;
		ev.stopPropagation()
		console.log(123)
	}

}

export default CalculatorController;
