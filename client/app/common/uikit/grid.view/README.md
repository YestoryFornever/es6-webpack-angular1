### 使用方法：
```html
<grid-view fields="fields"
	query="searchQuery"
	items="issue"
	is-loading="is_loading"
	tr-dblclick="toNewDebtin($item.dstrBondId,$item.issuId,$item.roleId,$item.alrdySbrbInd,$item.trm)">
</grid-view>
```
### 在Controller中配置
```js
/**
 * 搜索条件对象
 */
$scope.searchQuery = {
	desc: 0|1, //升序或降序	
	order: 'field_name', //排序的字段名称
	//其它字段……
};
/**
 * 表格字段
 */

$scope.fields = [
{
	label: '截标时间',
	order: false,
	template: '{{$item.clsbidTm | addTwoLine }}',
	
},{
	label: '债券简称',
	order: false,
	template: '{{$item.bondNm  | addTwoLine }}'+'<span>&nbsp;</span><span  class="hhh{{$item.alrdySbrbInd}}">{{$item.alrdySbrbInd | spanfilter}}</span>',
	// templateUrl: 'newdebtin_one.html',
},{
	label: '我的角色',
	order:false,
	template: '{{$item.roleId |rolefilter}}',
},{
	label: '申购利率(%)',
	order: false,
	template: '{{$item.sbrbIntrtLwrLmt | dotFilter}}-{{$item.sbrbIntrtLwrLmt | dotFilter }} ',
	// templateUrl: 'newdebtin_one.html'
	
},{
	label: '发行量(亿)',
	order: false,
	template: '<span ng-If="$item.issuNum>0">{{$item.issuNum  | addTwoLine }}</span><span  ng-If="$item.issuNum<=0">{{$item.issuNumText  | addTwoLine }}</span>',
},{
	label: '主承销商',
	order: false,
	template: '{{	$item.primUdwr  | addTwoLine }}',
},{
	label: '期限',
	order: false,
	template: '{{$item.trm  | addTwoLine }}',
},{
	label: '企业类型',
	order: false,
	template: '{{$item.entpTp |entpTpfilter}}',
},{
	label: '主/债评级',
	order: false,
	template: '<span class="fenxiao">{{$item.sbjRtg  | addTwoLine }}/{{$item.dbtItmRtg | addTwoLine}}</span>',

}];
```