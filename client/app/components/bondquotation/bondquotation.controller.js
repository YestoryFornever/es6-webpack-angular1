var echarts = require('echarts');
class BondquotationController {
	constructor() {
		this.name = "债券报价";
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
	}
	$onInit(){
	}
}
BondquotationController.$inject = ['$http'];
export default BondquotationController;
