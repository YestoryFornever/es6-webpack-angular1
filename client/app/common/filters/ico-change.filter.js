app.filter("icochange", function () {
    "use strict";
    return function (data) {
        if (data) {
            console.log(data);
            var arr = data.split(/【(.*?)】/);
            var contentString = "";
            for (var j = 0; j < arr.length; j++) {
                if (arr[j] == "礼物") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/chat.gift.png' />"
                }
                if (arr[j] == "愤怒") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.angerly.gif' />"
                }
                if (arr[j] == "鄙视") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.bs.gif' />"
                }
                if (arr[j] == "伤心") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.cry.gif' />"
                }
                if (arr[j] == "再见") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.goodbye.gif' />"
                }
                if (arr[j] == "高兴") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.laugh.gif' />"
                }
                if (arr[j] == "流汗") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.lh.gif' />"
                }
                if (arr[j] == "无聊") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.nod.gif' />"
                }
                if (arr[j] == "疑问") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.question.gif' />"
                }
                if (arr[j] == "你好") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.smile.gif' />"
                }
                if (arr[j] == "反对") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/feedback.against.gif' />"
                }
                if (arr[j] == "赞同") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/feedback.agreed.png' />"
                }
                if (arr[j] == "鼓掌") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/feedback.applaud.png' />"
                }
                if (arr[j] == "太快了") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/feedback.quickly.png' />"
                }
                if (arr[j] == "太慢了") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/feedback.slowly.png' />"
                }
                if (arr[j] == "值得思考") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/feedback.think.png' />"
                }
                if (arr[j] == "凋谢") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/rose.down.png' />"
                }
                if (arr[j] == "鲜花") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/rose.up.png' />"
                }
                if (arr[j] == "闭嘴") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.bz.gif' />"
                }
                if (arr[j] == "奋斗") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.fd.gif' />"
                }
                if (arr[j] == "尴尬") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.gg.gif' />"
                }
                if (arr[j] == "鼓掌") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.gz.gif' />"
                }
                if (arr[j] == "害羞") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.hx.gif' />"
                }
                if (arr[j] == "惊恐") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.jk.gif' />"
                }
                if (arr[j] == "惊讶") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.jy.gif' />"
                }
                if (arr[j] == "抠鼻") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.kb.gif' />"
                }
                if (arr[j] == "可怜") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.kl.gif' />"
                }
                if (arr[j] == "流泪") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.ll.gif' />"
                }
                if (arr[j] == "敲打") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.qd.gif' />"
                }
                if (arr[j] == "强悍") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.qh.gif' />"
                }
                if (arr[j] == "亲亲") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.qq.gif' />"
                }
                if (arr[j] == "弱爆") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.rb.gif' />"
                }
                if (arr[j] == "色") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.se.gif' />"
                }
                if (arr[j] == "偷笑") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.tx.gif' />"
                }
                if (arr[j] == "嘘") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.xu.gif' />"
                }
                if (arr[j] == "晕") {
                    arr[j] = "<img src='http://static.gensee.com/webcast/static/emotion/emotion.yun.gif' />"
                }
                contentString += arr[j];
            }
            return contentString;
        }
        else {
            return data;
        }
    }
});