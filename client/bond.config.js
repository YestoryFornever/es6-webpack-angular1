const PRIVATECONFIG = {
	proIP:'';
	devIP:'',
}
module.exports = {
	isPro:false,
	getIP(){
		return this.isPro?PRIVATECONFIG.proIP,PRIVATECONFIG.devIP;
	}
};