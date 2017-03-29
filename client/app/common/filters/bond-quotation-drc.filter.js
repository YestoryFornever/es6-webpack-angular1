app.filter('bondQuotationDrc',function(){
	/**
	 * /
	 * @param  {[String]} content [需要过滤的数值内容]
	 * @return {[String]}         [description]
	 */
	return function(content ){
		content = content =="-1"  ?  "买入" : content =="1"  ?  "卖出" : "未知方向";
		return content ;
	};
});