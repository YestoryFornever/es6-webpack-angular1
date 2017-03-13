class MutiSelectController {
	constructor($http) {
		this.name = 'mutiSelect';
		this.info='';
		this.vm = {};
		this.selectComponent = this;
		this.placeholder = '请输入内容';
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
		       
		    ]
		};
		// this.countries = this.data.data;
	}
	xxxx(){
		// console.log(this.isCollapsed)
		this.isCollapsed =false;
	}
	allChecked (list){
		this.getValue();
		// console.log(111)
		// if(list.checked){
		// 	console.log(list.label)
		// }
		// 自动选中所有下级
	    $.each(list.children, function(index,ele) {
	    	// console.log(item)
	    	// console.log(ele)
	      	ele.checked = list.checked;
	      	// if(ele.checked){
	      	// 	console.log(ele.label)
	      	// }
		    $.each(ele.children, function(index,ele2) {
		        ele2.checked = list.checked;
		        // if(ele2.checked){
		        // 	console.log(ele2.label)
		        // }
		    });
	    });
	    this.nameInfo(this.data.data);
	};
	list2Checked(list2, list1){
		this.getValue();
		$.each(list2.children, function(index,ele) {
	      ele.checked = list2.checked;
	    });
	    // console.log(this.data)
	    // 如果有任何一个子节点被选中，则让上级节点也选中
	    // 注意！checkbox的ng-model只能绑定到逻辑型值，所以不能直接把findWhere的结果赋值过去
	    list1.checked = this.findWhere(list1.children);
	    this.nameInfo(this.data.data);

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
		this.getValue();
		this.nameInfo(this.data.data);
		list2.checked = this.findWhere(list2.children);
		list1.checked = this.findWhere(list1.children);
	}
	// isIntermediateList1(list1){
	// 	let hasChecked = $.find(list1.children, function(list2) {
	//       return list2.checked && this.findWhere(list2.children);
	//     });
	//     // 是否有任何没有选中的节点
	//     let hasNoChecked = $.find(list1.children, function(list2) {
	//       return !list2.checked || this.findWhere(list2.children);
	//     });
	//     // 如果同时有选中状态和非选中的节点，则为中间状态
	//     return hasChecked && hasNoChecked;
	// }
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
	nameInfo(arr){
		this.info = '';
		for(let obj of arr){
			// this.name2(obj);
			let list1 = this.name2(obj);
			// this.nameInfo(obj.children)
			for(let obj2 of list1){
				let list2 = this.name2(obj2);
				for(let obj3 of obj2.children){
					let list3 = this.name2(obj3);
				}
			}
		}
		this.info = this.unique(this.info.split(',')).join(',');
	}
	name2(obj){
		if(obj.checked){
			if(!this.info){
				this.info = this.info + obj.label;
			}else{
				this.info = this.info + ',' +  obj.label;
			}
		}else{
			let reg = new RegExp(obj.label);
			if(this.info.match(reg)){
				let arr = this.info.split(',');
				let newArr = this.unique(arr);
				this.info = newArr.join(',');
				// console.log( $.unique(arr) );
			}
		}
		return obj.children;
	}
	// 去重
	unique(res){
		let arr =[];
		var json = {};
	 	for(var i = 0; i < res.length; i++){
	  		if(!json[res[i]]){
	   			arr.push(res[i]);
	   			json[res[i]] = 1;
	  		}
	 	}
		return arr
	}
	$onInit(){
		if(this.place){
			this.placeholder = this.place ;
		}
		if(this.source){
			// console.log(this.source)
			// this.source = JSON.parse(this.source);
			this.data = this.source ;
		}
		this.nameInfo(this.data.data);
	}
	getValue(){
		// console.log(this.data.data)
		this.onGetValue({value:this.data.data})
	}
	ourStopPropagation(ev){
		// console.log(ev)
		ev.stopPropagation()
	}
}
MutiSelectController.$inject = [];
export default MutiSelectController;
