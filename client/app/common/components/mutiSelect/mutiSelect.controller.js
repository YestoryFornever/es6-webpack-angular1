class MutiSelectController {
	constructor($http) {
		this.name = 'mutiSelect';
		this.info='';
		this.vm = {};
		this.placeholder = '请输入内容';
		
		this.data = {
		    "data":[
		        {
		            "label": "中国",
		            'checked':true,
		            "children": [
			            	{
			                    "label": "北京",
			                    'checked':true,
			                    "children": [
				                    	{"label": "朝阳",'checked':true, },
				                    	{"label": "海淀",'checked':true, }
			                    	]
			                },
		                ]
		        },
		        {
		            "label": "美国",
		            'checked':true,
		            "children": [
			            	{
			                    "label": "纽约",
			                    'checked':true,
			                    "data": "Work Folder",
			                    "children": [

			                    	]
			                },
			                {
			                    "label": "纽约",
			                    'checked':true,
			                    "data": "Work Folder",
			                    "children": [
			                    	]
			                },
		                ]
		        },
		    ]
		};
		// this.countries = this.data.data;
	}
	allChecked (list){
		// 自动选中所有下级
	    $.each(list.children, function(index,ele) {
	    	// console.log(item)
	    	// console.log(ele)
	      	ele.checked = list.checked;
		    $.each(ele.children, function(index,ele2) {
		        ele2.checked = list.checked;
		    });
	    });

	};
	list2Checked(list2, list1){
		$.each(list2.children, function(index,ele) {
	      ele.checked = list2.checked;
	    });
	    console.log(this.data)
	    // 如果有任何一个子节点被选中，则让上级节点也选中
	    // 注意！checkbox的ng-model只能绑定到逻辑型值，所以不能直接把findWhere的结果赋值过去
	    list1.checked = this.findWhere(list1.children);
	}
	findWhere(list){
		for(let item of list){

			if(item.checked){
				return true;
			}else{
				// return false;
				// for(let item2 of item){
				// 	if(item.checked){
				// 		return true;
				// 	}else{
				// 		return false;
				// 	}
				// }
			}
		}
	}
	list3Checked(list3, list2, list1){
		list2.checked = this.findWhere(list2.children);
		list1.checked = this.findWhere(list1.children);
	}
	isIntermediateList1(list1){
		let hasChecked = $.find(list1.children, function(list2) {
	      return list2.checked && this.findWhere(list2.children);
	    });
	    // 是否有任何没有选中的节点
	    let hasNoChecked = $.find(list1.children, function(list2) {
	      return !list2.checked || this.findWhere(list2.children);
	    });
	    // 如果同时有选中状态和非选中的节点，则为中间状态
	    return hasChecked && hasNoChecked;
	}
	// isList1Class(list1){
	// 	let hasChecked = $.each(list1.children,function(index,ele){
	// 		console.log(ele)
	// 	})
	// }
	// isIntermediateList2(list2){
	// 	let hasChecked = this.findWhere(list2.children);
	//     var hasNoChecked = this.findWhere(list2.children);
	//     return hasChecked && hasNoChecked;
	// }
	// isIntermediateCountry(country) {
	//     // 是否有任何被选中的节点
	//     var hasChecked = $.find(country.provinces, function(province) {
	//       return province.checked && $.findWhere(province.cities, {checked: true});
	//     });
	//     // 是否有任何没有选中的节点
	//     var hasNoChecked = $.find(country.provinces, function(province) {
	//       return !province.checked || $.findWhere(province.cities, {checked: false});
	//     });
	//     // 如果同时有选中状态和非选中的节点，则为中间状态
	//     return hasChecked && hasNoChecked;
	// };
	// isIntermediateProvince(province) {
	//     var hasChecked = $.findWhere(province.cities, {checked: true});
	//     var hasNoChecked = $.findWhere(province.cities, {checked: false});
	//     return hasChecked && hasNoChecked;
	// };

	$onInit(){
		if(this.place){
			this.placeholder = this.place ;
		}
		if(this.source){
			this.source = JSON.parse(this.source);
			this.data = this.source ;
		}
	}
	ourStopPropagation(ev){
		// console.log(ev)
		ev.stopPropagation()
	}
}
MutiSelectController.$inject = [];
export default MutiSelectController;
