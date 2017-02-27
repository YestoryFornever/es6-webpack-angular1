class InputNumController {
	constructor() {
		this.name = 'inputNum';
		this.aaa = '';
		this.xxx = '请输入内容';
	}
	$onInit(){

		if(this.place){
			// console.log($('input'))
			this.xxx = this.place;
		}
	}
	// input 内容变化
	contChange(){
		// let value = this.trim( $('.ourInputNum').find('input').val() )*1;
		// if(!value&&value!=0){
		// 	$('.ourInputNum').find('input').val('');
		// 	value = '';
		// }
		this.getValue();
	}
	// 点击上下箭头
	numChange(ev,ele){
		this.aaa *= 1 ;
		if(!this.aaa){
			this.aaa = 0;
		}
		let up =$(ele).hasClass('up');
		let down =$(ele).hasClass('down');
		console.log($(ele))
		if(up){
			this.aaa+=1;
		}else{
			this.aaa = parseFloat( (this.aaa - 1).toFixed(10));
			this.aaa<=0 && (this.aaa = 0.01);
		}

	}
	//向上传value 值
	getValue(){
		// console.log(this.aaa)
		this.onGetValue({value:this.aaa})
	}


}
InputNumController.$inject = [];
export default InputNumController;
