app.filter('bondQuotationOfrEStatus',function(){
	/**
	 * /
	 * @param  {[String]} content [需要过滤的数值内容]
	 * @return {[String]}         [description]
	 */
	return function(content ){
		content = content =="1"  ?  "有效" : content =="2"  ?  "撤销" :  content =="3"  ?  "成交" : "未知状态";
		return content ;
	};
});