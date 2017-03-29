app.filter('bondQuotationWthrListg',function(){
	/**
	 * /
	 * @param  {[String]} content [需要过滤的数值内容]
	 * @return {[String]}         [description]
	 */
	return function(content ){
		content =  content =="0"  ?  "定向发送" :  content =="1"  ?  "报价大厅" : "未知位置";
		return content ;
	};
});