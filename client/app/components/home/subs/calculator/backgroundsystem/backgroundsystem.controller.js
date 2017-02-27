
class BackgroundsystemController {
	// var data;
	constructor() {
		this.name = 'Backgroundsystem';
		
	}
	$onInit(){
		this.target = false;
	
		//好友
		this.tag==false;
		// 群主
		this.gruop==false;
	}
	
// 弹窗功能
// 1.我的好友
	checked(){
		$(".checkAll").click(function(){
	           var isChecked=$(this).prop("checked");
	          $('.checkBody').find('input').prop("checked",isChecked) ;
	        });
			$(".checkBody input").click(function(){
			            var all=$(".checkBody input").length;
			            var num=$(".checkBody input:checked").length;
			            if(num===all){
			                $(".checkAll").prop("checked",true);
			            }else{
			                $(".checkAll ").prop("checked",false);
			            }
			        });
	}

	// 好友展开
	fridentShow(){
		this.tag=!this.tag;
		console.log(this.tag)

	}



	// 2.我的群主
			// 2.1
			// 群主展开
	groupShow(){
		this.group=!this.group;
		console.log(this.tag)

	}
	

}

export default BackgroundsystemController;