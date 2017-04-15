app.filter("emoji",()=>{
	"use strict";
	let emojis = [
		{
			"emojiKey": "[可爱]",
			"emojiImg": "emoji_1"
		},
		{
			"emojiKey": "[笑脸]",
			"emojiImg": "emoji_2"
		},
		{
			"emojiKey": "[囧]",
			"emojiImg": "emoji_3"
		},
		{
			"emojiKey": "[生气]",
			"emojiImg": "emoji_4"
		},
		{
			"emojiKey": "[鬼脸]",
			"emojiImg": "emoji_5"
		},
		{
			"emojiKey": "[花心]",
			"emojiImg": "emoji_6"
		},
		{
			"emojiKey": "[害怕]",
			"emojiImg": "emoji_7"
		},
		{
			"emojiKey": "[我汗]",
			"emojiImg": "emoji_8"
		},
		{
			"emojiKey": "[尴尬]",
			"emojiImg": "emoji_9"
		},
		{
			"emojiKey": "[哼哼]",
			"emojiImg": "emoji_10"
		},
		{
			"emojiKey": "[忧郁]",
			"emojiImg": "emoji_11"
		},
		{
			"emojiKey": "[呲牙]",
			"emojiImg": "emoji_12"
		},
		{
			"emojiKey": "[媚眼]",
			"emojiImg": "emoji_13"
		},
		{
			"emojiKey": "[累]",
			"emojiImg": "emoji_14"
		},
		{
			"emojiKey": "[苦逼]",
			"emojiImg": "emoji_15"
		},
		{
			"emojiKey": "[瞌睡]",
			"emojiImg": "emoji_16"
		},
		{
			"emojiKey": "[哎呀]",
			"emojiImg": "emoji_17"
		},
		{
			"emojiKey": "[刺瞎]",
			"emojiImg": "emoji_18"
		},
		{
			"emojiKey": "[哭]",
			"emojiImg": "emoji_19"
		},
		{
			"emojiKey": "[激动]",
			"emojiImg": "emoji_20"
		},
		{
			"emojiKey": "[难过]",
			"emojiImg": "emoji_21"
		},
		{
			"emojiKey": "[害羞]",
			"emojiImg": "emoji_22"
		},
		{
			"emojiKey": "[高兴]",
			"emojiImg": "emoji_23"
		},
		{
			"emojiKey": "[愤怒]",
			"emojiImg": "emoji_24"
		},
		{
			"emojiKey": "[亲]",
			"emojiImg": "emoji_25"
		},
		{
			"emojiKey": "[飞吻]",
			"emojiImg": "emoji_26"
		},
		{
			"emojiKey": "[得意]",
			"emojiImg": "emoji_27"
		},
		{
			"emojiKey": "[惊恐]",
			"emojiImg": "emoji_28"
		},
		{
			"emojiKey": "[口罩]",
			"emojiImg": "emoji_29"
		},
		{
			"emojiKey": "[惊讶]",
			"emojiImg": "emoji_30"
		},
		{
			"emojiKey": "[委屈]",
			"emojiImg": "emoji_31"
		},
		{
			"emojiKey": "[生病]",
			"emojiImg": "emoji_32"
		},
		{
			"emojiKey": "[红心]",
			"emojiImg": "emoji_33"
		},
		{
			"emojiKey": "[心碎]",
			"emojiImg": "emoji_34"
		},
		{
			"emojiKey": "[玫瑰]",
			"emojiImg": "emoji_35"
		},
		{
			"emojiKey": "[花]",
			"emojiImg": "emoji_36"
		},
		{
			"emojiKey": "[外星人]",
			"emojiImg": "emoji_37"
		},
		{
			"emojiKey": "[金牛座]",
			"emojiImg": "emoji_38"
		},
		{
			"emojiKey": "[双子座]",
			"emojiImg": "emoji_39"
		},
		{
			"emojiKey": "[巨蟹座]",
			"emojiImg": "emoji_40"
		},
		{
			"emojiKey": "[狮子座]",
			"emojiImg": "emoji_41"
		},
		{
			"emojiKey": "[处女座]",
			"emojiImg": "emoji_42"
		},
		{
			"emojiKey": "[天平座]",
			"emojiImg": "emoji_43"
		},
		{
			"emojiKey": "[天蝎座]",
			"emojiImg": "emoji_44"
		},
		{
			"emojiKey": "[射手座]",
			"emojiImg": "emoji_45"
		},
		{
			"emojiKey": "[摩羯座]",
			"emojiImg": "emoji_46"
		},
		{
			"emojiKey": "[水瓶座]",
			"emojiImg": "emoji_47"
		},
		{
			"emojiKey": "[白羊座]",
			"emojiImg": "emoji_48"
		},
		{
			"emojiKey": "[双鱼座]",
			"emojiImg": "emoji_49"
		},
		{
			"emojiKey": "[星座]",
			"emojiImg": "emoji_50"
		},
		{
			"emojiKey": "[男孩]",
			"emojiImg": "emoji_51"
		},
		{
			"emojiKey": "[女孩]",
			"emojiImg": "emoji_52"
		},
		{
			"emojiKey": "[嘴唇]",
			"emojiImg": "emoji_53"
		},
		{
			"emojiKey": "[爸爸]",
			"emojiImg": "emoji_54"
		},
		{
			"emojiKey": "[妈妈]",
			"emojiImg": "emoji_55"
		},
		{
			"emojiKey": "[衣服]",
			"emojiImg": "emoji_56"
		},
		{
			"emojiKey": "[皮鞋]",
			"emojiImg": "emoji_57"
		},
		{
			"emojiKey": "[照相]",
			"emojiImg": "emoji_58"
		},
		{
			"emojiKey": "[电话]",
			"emojiImg": "emoji_59"
		},
		{
			"emojiKey": "[石头]",
			"emojiImg": "emoji_60"
		},
		{
			"emojiKey": "[胜利]",
			"emojiImg": "emoji_61"
		},
		{
			"emojiKey": "[禁止]",
			"emojiImg": "emoji_62"
		},
		{
			"emojiKey": "[滑雪]",
			"emojiImg": "emoji_63"
		},
		{
			"emojiKey": "[高尔夫]",
			"emojiImg": "emoji_64"
		},
		{
			"emojiKey": "[网球]",
			"emojiImg": "emoji_65"
		},
		{
			"emojiKey": "[棒球]",
			"emojiImg": "emoji_66"
		},
		{
			"emojiKey": "[冲浪]",
			"emojiImg": "emoji_67"
		},
		{
			"emojiKey": "[足球]",
			"emojiImg": "emoji_68"
		},
		{
			"emojiKey": "[小鱼]",
			"emojiImg": "emoji_69"
		}
	];
	function findElemAttr(arr,iattr,val,oattr){
		for (var i=0;i<arr.length;i++){
			if(arr[i][iattr]==val){
				return arr[i][oattr];
			}
		}
		return false;
	};
	return function (str) {
		if (str) {// let str = "a[e]s[y][哼哼]d[忧郁]f[呲牙]";
			return str.replace(/\[[\u4e00-\u9eff]+\]/g,item=>{
				let emojiImg = findElemAttr(emojis,'emojiKey',item,'emojiImg');
				return emojiImg?`<img src="./resource/images/emoji/${emojiImg}.png" />`:item;
			});
		}else{
			return str;
		}
	}
});