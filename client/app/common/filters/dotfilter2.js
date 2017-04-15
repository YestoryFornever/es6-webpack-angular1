/*
* @Author: Administrator
* @Date:   2017-04-08 16:13:45
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-08 16:15:45
*/

app.filter('dotFilter',function(){
	return function(dot){
		let reg =/\./;
		if(dot ){//收益率
			if(reg.test(dot)){
				
				dot = dot*100+'';
				let two =dot.split('.')[1]? dot.split('.')[1] :'0';
				two =  two.length>4 ? two :( two + "0000");
				dot = dot.split('.')[0]+ "." + ( two.substr(0,2) );
			}
		}
		return dot ;
	};
});
