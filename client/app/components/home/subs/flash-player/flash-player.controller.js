class FlashPlayerController {
    // 构造函数, 大部分的逻辑代码最好写在$onInit中, constructor 初始化一些变量
    constructor($timeout) {

    }

    // 初始化完毕加载
    $onInit($timeout) {
        this.checkFlashPlayer = function () {
            var hasFlashPlayer = 0; //判断是否安装了Flash Player
            var flashPlayerVersion = 0; //Flash Player版本
            if (document.all) {
                var shockWaveFlash = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if (shockWaveFlash) {
                    hasFlashPlayer = 1;
                    flashPlayerVersion = parseInt(shockWaveFlash.GetVariable("$version").split(" ")[1].split(",")[0]);
                }
            } else if (navigator.plugins && navigator.plugins.length > 0) {
                var shockWaveFlash = navigator.plugins["Shockwave Flash"];
                if (shockWaveFlash) {
                    hasFlashPlayer = 1;
                    var descriptionInfo = shockWaveFlash.description.split(" ");
                    for (var i = 0; i < descriptionInfo.length; ++i) {
                        if (isNaN(parseInt(descriptionInfo[i]))) {
                            continue;
                        }
                        flashPlayerVersion = parseInt(descriptionInfo[i]);
                    }
                }
            }
            return {hasFlashPlayer: hasFlashPlayer, flashPlayerVersion: flashPlayerVersion};
        };

        if (this.checkFlashPlayer().hasFlashPlayer) {
            if (this.checkFlashPlayer().flashPlayerVersion <= 10) {
                if (confirm("您的Flash Player版本过低，立即升级Flash Player版本？")) {
                    window.location.href = "http://get.adobe.com/cn/flashplayer/";
                }
            } else {
                // alert("您安装了Flash Player，当前Flash Player版本号为：" + this.checkFlashPlayer().flashPlayerVersion + "。");
            }
        } else {
            if (confirm("您没有安装Flash Player，立即安装？")) {
                window.location.href = "http://get.adobe.com/cn/flashplayer/";
            }
        }
    }
}