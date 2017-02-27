const PRIVATECONFIG = {

	proIP:'http://11.177.15.104/',
	devIP:'http://11.177.15.104/',
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
		this.isPro = false;
		this.JH = {
			'Content-Type'?:?'application/json;charset=utf-8',
			'terminal' : '2'
		};
		this.FH = {
			'Content-Type'?:?'application/json;charset=utf-8',
			'terminal' : '2'
		}
		this.UUID = PRIVATECONFIG.Guid();
		this.USERINFO = {};
	}
	getIP(){
		return this.isPro?PRIVATECONFIG.proIP:PRIVATECONFIG.devIP;
	}
	setUSERINFO(userinfo){
		this.USERINFO = userinfo;
		this.JH["lid"] = this.FH["lid"] = userinfo.lid;//头信息添加lid
	}
};
module.exports = new GLOBAL;