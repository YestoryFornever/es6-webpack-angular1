const PRIVATECONFIG = {
	// proIP:'http://11.177.15.254/',
	// devIP:'http://11.177.15.104/',
	Host: window.Host,
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
			this.USERINFO = userinfo = JSON.parse(userinfo);
			this.JH["lid"] = this.FH["lid"] = userinfo.lid;
		};
	}
	getIP(){
		let host = PRIVATECONFIG.Host;
		// return host.indexOf('http')==0?host:'/api/';
		return host.indexOf('http')==0?host:'http://11.177.15.104/';
	}
	setUSERINFO(userinfo){
		this.USERINFO = userinfo;
		this.JH["lid"] = this.FH["lid"] = userinfo.lid;//头信息添加lid
	}
};
var BONDCONFIG = new GLOBAL();