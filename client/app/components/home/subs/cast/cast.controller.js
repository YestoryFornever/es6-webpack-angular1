class CastController {
	constructor(netCastService, $interval) {
		"ngInject";

		// 倒计时传递参数
		this.ctrl = {};

		// this.goClassRoom = (ownerid, ownerid, uid, uname) => {
		this.goClassRoom = (lid) => {
			window.location.href="#/home/castroom";
			// 界面必须刷新一下, 要不然<gs:video-live>节点无法解析.
			window.location.reload();

			// 1. 传递参数, 每次单机直播模块更新session数据, 然后在castroom中获取session
			// 2. 通过ui.router params获取id然后在数据库查询传递过来的数据
			sessionStorage.setItem("lid", lid);
		};

		this.data = "";
		var that = this;
		var info = {
			cur_page: 1
		};
		// 获取直播列表
		netCastService.costList(info).then(function(data) {
			console.log(data);
			that.data = data.data;
			that.list = data.data.list;
			that.page = data.data.page;
		});
	}
}