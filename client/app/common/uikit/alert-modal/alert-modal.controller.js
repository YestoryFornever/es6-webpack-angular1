class AlertModalController {
	constructor() {
		this.name = 'alertModal';
	}
	$onInit(){
		var info = this.resolve.info;
		info.title = info.title||'';
		info.content = info.content||'操作成功';
		this.info = info;
	}

	ok() {
		this.modalInstance.close();
	}
	cancel() {
		this.modalInstance.dismiss('cancel');

	}
}
