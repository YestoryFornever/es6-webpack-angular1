class warnModelController {
    constructor() {
        console.log(this.resolve);
        this.msg = this.resolve.params.err.msg;
        this.status = this.resolve.params.err.status;
        // 关闭弹出
        this.close = function () {
            this.modalInstance.close();
        };
    }
}