const PRIVATECONFIG = {
	// proIP:'http://11.177.15.254/',
	// devIP:'http://11.177.15.104/',
	Host: '${serverIp}',
	Guid:function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}
};
class GLOBAL{
	constructor(){
		this.JH = {
			'Content-Type' : 'application/json;charset=utf-8',
			'terminal' : '2'
		};
		this.FH = {
			'Content-Type' : 'application/json;charset=utf-8',
			'terminal' : '2'
		}
		this.USERINFO = {};
		var userinfo = window.localStorage.USERINFO;
		if (userinfo) {
			this.UUID = PRIVATECONFIG.Guid();
			this.USERINFO = userinfo = JSON.parse(userinfo);
			this.JH["lid"] = this.FH["lid"] = userinfo.lid;
		};
	}
	getIP(){
		let host = PRIVATECONFIG.Host;
		return host.indexOf('http')==0?host:'/api/';
	}
	setUSERINFO(userinfo){
		this.USERINFO = userinfo;
		this.JH["lid"] = this.FH["lid"] = userinfo.lid;//头信息添加lid
		window.localStorage.USERINFO = JSON.stringify(userinfo);
	}
};
module.exports = new GLOBAL;