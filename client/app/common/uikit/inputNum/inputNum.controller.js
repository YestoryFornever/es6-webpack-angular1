class InputNumController {
	constructor() {
		this.name = 'inputNum';
		this.value = '';
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
		this.value *= 1 ;
		if(!this.value){
			this.value = 0;
		}
		let up =$(ele).hasClass('up');
		let down =$(ele).hasClass('down');
		console.log($(ele))
		if(up){
			this.value+=1;
		}else{
			this.value = parseFloat( (this.value - 1).toFixed(10));
			this.value<=0 && (this.value = 0);
		}

	}
	//向上传value 值
	getValue(){
		// console.log(this.value)
		this.onGetValue({value:this.value})
	}


}
