var echarts = require('echarts');
class MinebondController {
	constructor(minebondService) {
		this.name ="我的报价";
		this.minebondService = minebondService;
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('settleChart'));

		// 绘制图表
		myChart.setOption({
			title: { text: '结算行情' },
			tooltip: {},
			xAxis: {
				data: ["债券A","债券Z","债券G","债券H","债券J","债券S"]
			},
			yAxis: {},
			series: [{
				name: '销量',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20]
			}]
		});
		window.onresize = function(){
			myChart.resize();
		};
		this.tableH = '3';
		// 报价列表
		this.sendQueryQuoteListInfo = {
			queryFlag:'B',
			wthrFcs:'',
			bondid:'',
			ofrEStatus:'',
			pageNum:'1',
			pageSize:'10',
			order:'',
			desc:'',

		}
		
	}
	$onInit(){
		this.getQueryQuoteList();
	}
	// 获取列表
	getQueryQuoteList(){
		let promise = this.minebondService.queryQuoteList(this.sendQueryQuoteListInfo);
		promise.then((res)=>{
			console.log(res)
		}, (res)=>{
			console.log(res)
		})
	}
}
MinebondController.$inject = ['minebondService'];
export default MinebondController;
