class ChatPopController {
	constructor() {
		"ngInject";
		this.name = 'chat-pop';
	}
	$onInit(){
		(!!BONDCONFIG.USERINFO.iconUrl) && (this.icono = BONDCONFIG.USERINFO.iconUrl);//当前用户头像
	}
}
