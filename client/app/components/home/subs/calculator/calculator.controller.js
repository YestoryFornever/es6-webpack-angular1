class CalculatorController {
	constructor($uibModal) {
		this.name = 'calculator';
		this.info='';
		this.value1 = '';
		this.value = '';
		this.$uibModal = $uibModal;
		this.data = {
		    "data":[
		        {
		            "label": "中国",
		            'checked':false,
		            'id':'1',
		            "children": [
			            	{
			                    "label": "北京",
			                    'checked':false,
			                    'id':'1',
			                    "children": [
				                    	{
				                    		"label": "朝阳",
				                    		'checked':true,
				                    		'id':'1',
				                    	 },
				                    	{
				                    		"label": "海淀",
				                    		'checked':true,
				                    		'id':'1'
				                    	}
			                    	]
			                },
		                ]
		        },
		        {
		            "label": "美国",
		            'checked':true,
		            'id':'1',
		            "children": [
			            	{
			                    "label": "纽约",
			                    'checked':true,
			                    'id':'1',
			                    "data": "Work Folder",
			                    "children": [

			                    	]
			                },
			                {
			                    "label": "纽约",
			                    'checked':true,
			                    'id':'1',
			                    "data": "Work Folder",
			                    "children": [
			                    	]
			                },
		                ]
		        },
		    ]
		};
	}
	$onInit(){
		this.animationsEnabled =true;
		this.dataCalculatorModal={
			itemInfo:{},
		}
		this.openCalculator();
	}
	openCalculator(item){//计算器 弹窗
		let that =this;
		that.$uibModal.open({
			animation: that.animationsEnabled,
			component:'bondTrial',
			windowClass:'my-bond-trial',
			size: 'xs',//'lg',//'sm',
			resolve: {
				modalData:function(){
					if(item){
						that.dataCalculatorModal.itemInfo = item;
					}
					return that.dataCalculatorModal;
				}
			}
		}).result.then(function (selectedItem) {},that);
	}

}
CalculatorController.$inject = ['$uibModal'];
export default CalculatorController;
