app.component('supplementaryInformation', {
    restrict: 'E',
    bindings: {},
    templateUrl: './supplementary-information.html',
    controller: function($scope, $location, $timeout, $interval, netPersonalCenterService, $sce, $http, alertTip) {
        'ngInject';
        $scope.isNickName = false;
        $scope.isAutograph = false;
        $scope.isSex = false;
        $scope.isBirthday = false;
        $scope.isHometown = false;
        $scope.isCard = false;
        $scope.isUpCard = false;
        $scope._images = [];
        $scope.qi_m=1;
        $scope.sex_de=1;
        $scope.bir_th=1;
        $scope.home_town=1;
        $scope.uploadfiles = [];
        //省市联动
        $scope.citys = [];
        $scope.districts = [];
        $scope.regionText = {};
        $scope.erji = {
            selectedProvince: '',
            selectedCity: "",
        };
        //文本域定义
        $scope.tta = {
            uploadsignature: '',
        };
        //默认的修改信息
        $scope.defult = {
            gender: '2',  
            birthday: '1990-01-01',
            hometown: '', 
            type: '0'
        };
        //$scope.defult.gender="2";
        //时间戳转换
        function dateFun(today) {
            let nyr, Day, Year, Month, hours, minute;
            var today = new Date(today);
            Day = today.getDate();
            Year = today.getFullYear();
            Month = today.getMonth() + 1;
            hours = today.getHours();
            minute = today.getMinutes();
            if (Day < 10) {
                Day = '0' + Day
            } else {
                Day = '' + Day
            }
            if (Month < 10) {
                Month = '0' + Month
            } else {
                Month = '' + Month
            }
            var start = Year + '.' + Month + '.' + Day;
            return start;
        };
        //获取用户信息
        var aa = function() {
            netPersonalCenterService.essentialService().then(function(result) {
                if (result.data.data.signature || result.data.data.nickname || result.data.data.gender || result.data.data.birthday || result.data.data.hometown) {
                    if (result.data.data.gender == '1') {
                        result.data.data.gender = "男";
                    } else if (result.data.data.gender == '2') {
                        result.data.data.gender = "女";
                    }
                    result.data.data.birthday = dateFun(result.data.data.birthday * 1);
                    $scope.supplementaryInform = result.data.data;
                }
            });
        }
        aa();
        //获取当前用户的名片
        $scope.cardCard=function(){
            netPersonalCenterService.getUserBusinessCard().then(function(result) {
                $scope.BusCard = result.data.data.businessCardAnnexUrl
                $scope.userCardimg = $scope.BusCard;
            }).catch(function(err) { //除去状态0的状态码 
                console.log(err);
            });
        };
       
        $scope.cardCard();
        //修改用户个人签名
        $scope.AutographFun = function() {
            netPersonalCenterService.updateUserSignature({
                "signature": $scope.tta.uploadsignature
            }).then(function(result) {
                $scope.qi_m=2;
                alertTip.success("修改成功");
                aa();
                $scope.isAutograph = false;
            });
        };
        $scope.qiMRemove=function(){
            $scope.qi_m=1;
            $scope.isAutograph=false;
            $scope.tta.uploadsignature="";
        };
        //补充信息的修改
        $scope.updateWebUserExtraFun = function() {
            $scope.data={
                gender: $scope.defult.gender,
                birthday: $scope.defult.birthday,
                hometown: $scope.defult.hometown,
                type: '0'
            }
            $scope.data.birthday=Date.parse($scope.data.birthday);
            netPersonalCenterService.updateWebUserExtraInfo($scope.data).then(function(result) {
                alertTip.success("修改成功");
                $scope.defult.birthday="1990-01-01";
                aa();
            });
        }
        //修改昵称
        /*$scope.amendNickName=function(){
            $scope.defult.type='1';
            $scope.updateWebUserExtraFun();
            $scope.isNickName = false;
        };*/
        //修改性别
        $scope.amendGender = function() {
            $scope.isSex = false;
            $scope.defult.birthday='',  
            $scope.defult.hometown='',
            $scope.sex_de=1;
            $scope.updateWebUserExtraFun();
        };
        $scope.sexRemove=function(){
            $scope.sex_de=1;
            $scope.isSex=false;
            $scope.defult.gender="2";
        };
        //修改生日
        $scope.amendBirthday = function() {
            $scope.isBirthday = false;
            $scope.defult.gender='',
            $scope.defult.hometown='',
            $scope.bir_th=1;
            $scope.updateWebUserExtraFun();
        };
        $scope.birThRemove=function(){
            $scope.bir_th=1;
            $scope.isBirthday=false;
            $scope.defult.birthday="1990-01-01";
        };
        //修改家乡
        $scope.amendHometown = function() {
            $scope.isHometown = false;
            $scope.defult.hometown = $scope.regionText.selectedProvinceText + $scope.regionText.selectedCityText;
            $scope.defult.gender='',
            $scope.defult.birthday='',
            $scope.home_town=1;
            $scope.updateWebUserExtraFun();
        };
        $scope.homeTownRemove=function(){
            $scope.home_town=1;
            $scope.isHometown=false;
            $scope.erji.selectedProvince="";
        };
        $scope.regionData = [
            {
                "text": "北京市",
                "id": '00',
                "children": [
                {
                    "id": "001",
                    "text": "东城区"
                }, {
                    "id": "002",
                    "text": "西城区"
                }, {
                    "id": "003",
                    "text": "海淀区"
                }, {
                    "id": "004",
                    "text": "朝阳区"
                }, {
                    "id": "005",
                    "text": "石景山区"
                }, {
                    "id": "006",
                    "text": "丰台区"
                }, {
                    "id": "007",
                    "text": "通州区"
                }, {
                    "id": "008",
                    "text": "顺义区"
                }, {
                    "id": "009",
                    "text": "大兴区"
                }, {
                    "id": "0010",
                    "text": "昌平区"
                }, {
                    "id": "0011",
                    "text": "房山区"
                }, {
                    "id": "0012",
                    "text": "怀柔区"
                }, {
                    "id": "0013",
                    "text": "平谷区"
                }, {
                    "id": "0014",
                    "text": "顺义区"
                }, {
                    "id": "0015",
                    "text": "密云县"
                }, {
                    "id": "0016",
                    "text": "延庆县"
                }, ]
            }, {
                "text": "上海市",
                "id": '01',
                "children": [{
                    "id": "011",
                    "text": "黄浦区"
                }, {
                    "id": "012",
                    "text": "虹口区"
                }, {
                    "id": "013",
                    "text": "杨浦区"
                }, {
                    "id": "014",
                    "text": "闸北区"
                }, {
                    "id": "015",
                    "text": "普陀区"
                }, {
                    "id": "016",
                    "text": "静安区"
                }, {
                    "id": "017",
                    "text": "浦东新区"
                }, {
                    "id": "018",
                    "text": "闵行区"
                }, {
                    "id": "019",
                    "text": "奉贤区"
                }, {
                    "id": "0110",
                    "text": "金山区"
                }, {
                    "id": "0111",
                    "text": "松江区"
                }, {
                    "id": "0112",
                    "text": "青浦区"
                }, {
                    "id": "0113",
                    "text": "嘉定区"
                }, {
                    "id": "0114",
                    "text": "宝山区"
                }, {
                    "id": "0115",
                    "text": "长宁区"
                }, {
                    "id": "0116",
                    "text": "崇明县"
                }, ]
            }, {
                "text": "天津市",
                "id": '02',
                "children": [{
                    "id": "021",
                    "text": "和平区"
                }, {
                    "id": "022",
                    "text": "河东区"
                }, {
                    "id": "023",
                    "text": "河西区"
                }, {
                    "id": "024",
                    "text": "南开区"
                }, {
                    "id": "025",
                    "text": "河北区"
                }, {
                    "id": "026",
                    "text": "红桥区"
                }, {
                    "id": "027",
                    "text": "东丽区"
                }, {
                    "id": "028",
                    "text": "西青区"
                }, {
                    "id": "029",
                    "text": "津南区"
                }, {
                    "id": "0210",
                    "text": "北辰区"
                }, {
                    "id": "0211",
                    "text": "武清区"
                }, {
                    "id": "0212",
                    "text": "宝坻区"
                }, {
                    "id": "0213",
                    "text": "滨海新区"
                }, {
                    "id": "0214",
                    "text": "宁河区"
                }, {
                    "id": "0215",
                    "text": "静海区"
                }, ]
            }, {
                "text": "重庆市",
                "id": '03',
                "children": [{
                    "id": "031",
                    "text": "万州区"
                }, {
                    "id": "032",
                    "text": "涪陵区"
                }, {
                    "id": "033",
                    "text": "渝中区"
                }, {
                    "id": "034",
                    "text": "大渡口区"
                }, {
                    "id": "035",
                    "text": "江北区"
                }, {
                    "id": "036",
                    "text": "沙坪坝区"
                }, {
                    "id": "037",
                    "text": "九龙坡区"
                }, {
                    "id": "038",
                    "text": "南岸区"
                }, {
                    "id": "039",
                    "text": "北碚区"
                }, {
                    "id": "0310",
                    "text": "綦江区"
                }, {
                    "id": "0311",
                    "text": "大足区"
                }, {
                    "id": "0312",
                    "text": "渝北区"
                }, {
                    "id": "0313",
                    "text": "巴南区"
                }, {
                    "id": "0314",
                    "text": "黔江区"
                }, {
                    "id": "0315",
                    "text": "长寿区"
                }, {
                    "id": "0316",
                    "text": "江津区"
                }, {
                    "id": "0317",
                    "text": "合川区"
                }, {
                    "id": "0318",
                    "text": "永川区"
                }, {
                    "id": "0319",
                    "text": "南川区"
                }, {
                    "id": "0320",
                    "text": "璧山区"
                }, {
                    "id": "0321",
                    "text": "铜梁区"
                }, {
                    "id": "0322",
                    "text": "潼南区"
                }, {
                    "id": "0323",
                    "text": "荣昌区"
                }, ]
            }, {
                "text": "河北省",
                "id": '04',
                "children": [{
                    "id": "041",
                    "text": "石家庄"
                }, {
                    "id": "042",
                    "text": "张家口"
                }, {
                    "id": "043",
                    "text": "承德"
                }, {
                    "id": "044",
                    "text": "秦皇岛"
                }, {
                    "id": "045",
                    "text": "唐山"
                }, {
                    "id": "046",
                    "text": "廊坊"
                }, {
                    "id": "047",
                    "text": "保定"
                }, {
                    "id": "048",
                    "text": "衡水"
                }, {
                    "id": "049",
                    "text": "邢台"
                }, {
                    "id": "0410",
                    "text": "邯郸"
                }, {
                    "id": "0411",
                    "text": "沧州"
                }, ]
            }, {
                "text": "山西省",
                "id": '05',
                "children": [{
                    "id": "051",
                    "text": "太原"
                }, {
                    "id": "052",
                    "text": "大同"
                }, {
                    "id": "053",
                    "text": "朔州"
                }, {
                    "id": "054",
                    "text": "阳泉"
                }, {
                    "id": "055",
                    "text": "长治"
                }, {
                    "id": "056",
                    "text": "晋城"
                }, {
                    "id": "057",
                    "text": "忻州"
                }, {
                    "id": "058",
                    "text": "吕梁"
                }, {
                    "id": "059",
                    "text": "晋中"
                }, {
                    "id": "0510",
                    "text": "临汾"
                }, {
                    "id": "0511",
                    "text": "运城"
                }, ]
            }, {
                "text": "陕西省",
                "id": '06',
                "children": [{
                    "id": "061",
                    "text": "西安"
                }, {
                    "id": "062",
                    "text": "延安"
                }, {
                    "id": "063",
                    "text": "铜川"
                }, {
                    "id": "064",
                    "text": "渭南"
                }, {
                    "id": "065",
                    "text": "咸阳"
                }, {
                    "id": "066",
                    "text": "宝鸡"
                }, {
                    "id": "067",
                    "text": "汉中"
                }, {
                    "id": "068",
                    "text": "榆林"
                }, {
                    "id": "069",
                    "text": "商洛"
                }, {
                    "id": "0610",
                    "text": "安康"
                }, ]
            }, {
                "text": "山东省",
                "id": '07',
                "children": [{
                    "id": "071",
                    "text": "济南"
                }, {
                    "id": "072",
                    "text": "聊城"
                }, {
                    "id": "073",
                    "text": "德州"
                }, {
                    "id": "074",
                    "text": "东营"
                }, {
                    "id": "075",
                    "text": "淄博"
                }, {
                    "id": "076",
                    "text": "潍坊"
                }, {
                    "id": "077",
                    "text": "烟台"
                }, {
                    "id": "078",
                    "text": "威海"
                }, {
                    "id": "079",
                    "text": "青岛"
                }, {
                    "id": "0710",
                    "text": "日照"
                }, {
                    "id": "0711",
                    "text": "临沂"
                }, {
                    "id": "0712",
                    "text": "枣庄"
                }, {
                    "id": "0713",
                    "text": "济宁"
                }, {
                    "id": "0714",
                    "text": "泰安"
                }, {
                    "id": "0715",
                    "text": "莱芜"
                }, {
                    "id": "0716",
                    "text": "滨州"
                }, {
                    "id": "0717",
                    "text": "菏泽"
                }, ]
            }, {
                "text": "河南省",
                "id": '08',
                "children": [{
                    "id": "081",
                    "text": "郑州"
                }, {
                    "id": "082",
                    "text": "三门峡"
                }, {
                    "id": "083",
                    "text": "洛阳"
                }, {
                    "id": "084",
                    "text": "焦作"
                }, {
                    "id": "085",
                    "text": "新乡"
                }, {
                    "id": "086",
                    "text": "鹤壁"
                }, {
                    "id": "087",
                    "text": "安阳"
                }, {
                    "id": "088",
                    "text": "濮阳"
                }, {
                    "id": "089",
                    "text": "开封"
                }, {
                    "id": "0810",
                    "text": "商丘"
                }, {
                    "id": "0811",
                    "text": "许昌"
                }, {
                    "id": "0812",
                    "text": "漯河"
                }, {
                    "id": "0813",
                    "text": "平顶山"
                }, {
                    "id": "0814",
                    "text": "南阳"
                }, {
                    "id": "0815",
                    "text": "信阳"
                }, {
                    "id": "0816",
                    "text": "周口"
                }, {
                    "id": "0817",
                    "text": "驻马店"
                }, ]
            }, {
                "text": "辽宁省",
                "id": '09',
                "children": [{
                    "id": "091",
                    "text": "沈阳"
                }, {
                    "id": "092",
                    "text": "朝阳"
                }, {
                    "id": "093",
                    "text": "阜新"
                }, {
                    "id": "094",
                    "text": "铁岭"
                }, {
                    "id": "095",
                    "text": "抚顺"
                }, {
                    "id": "096",
                    "text": "本溪"
                }, {
                    "id": "097",
                    "text": "辽阳"
                }, {
                    "id": "098",
                    "text": "鞍山"
                }, {
                    "id": "099",
                    "text": "丹东"
                }, {
                    "id": "0910",
                    "text": "大连"
                }, {
                    "id": "0911",
                    "text": "营口"
                }, {
                    "id": "0912",
                    "text": "盘锦"
                }, {
                    "id": "0913",
                    "text": "锦州"
                }, {
                    "id": "0914",
                    "text": "葫芦岛"
                }, ]
            }, {
                "text": "吉林省",
                "id": '10',
                "children": [{
                    "id": "101",
                    "text": "长春"
                }, {
                    "id": "102",
                    "text": "白城"
                }, {
                    "id": "103",
                    "text": "松原"
                }, {
                    "id": "104",
                    "text": "吉林"
                }, {
                    "id": "105",
                    "text": "四平"
                }, {
                    "id": "106",
                    "text": "辽源"
                }, {
                    "id": "107",
                    "text": "通化"
                }, {
                    "id": "108",
                    "text": "白山"
                }, {
                    "id": "109",
                    "text": "延边"
                }, ]
            }, {
                "text": "黑龙江省",
                "id": '11',
                "children": [{
                    "id": "111",
                    "text": "哈尔滨"
                }, {
                    "id": "112",
                    "text": "齐齐哈尔"
                }, {
                    "id": "113",
                    "text": "黑河"
                }, {
                    "id": "114",
                    "text": "大庆"
                }, {
                    "id": "115",
                    "text": "伊春"
                }, {
                    "id": "116",
                    "text": "鹤岗"
                }, {
                    "id": "117",
                    "text": "佳木斯"
                }, {
                    "id": "118",
                    "text": "双鸭山"
                }, {
                    "id": "119",
                    "text": "七台河"
                }, {
                    "id": "1110",
                    "text": "鸡西"
                }, {
                    "id": "1111",
                    "text": "牡丹江"
                }, {
                    "id": "1112",
                    "text": "绥化"
                }, {
                    "id": "1113",
                    "text": "大兴安"
                }, ]
            }, {
                "text": "江苏省",
                "id": '12',
                "children": [{
                    "id": "121",
                    "text": "南京"
                }, {
                    "id": "122",
                    "text": "徐州"
                }, {
                    "id": "123",
                    "text": "连云港"
                }, {
                    "id": "124",
                    "text": "宿迁"
                }, {
                    "id": "125",
                    "text": "淮阴"
                }, {
                    "id": "126",
                    "text": "盐城"
                }, {
                    "id": "127",
                    "text": "扬州"
                }, {
                    "id": "128",
                    "text": "泰州"
                }, {
                    "id": "129",
                    "text": "南通"
                }, {
                    "id": "1210",
                    "text": "镇江"
                }, {
                    "id": "1211",
                    "text": "常州"
                }, {
                    "id": "1212",
                    "text": "无锡"
                }, {
                    "id": "1213",
                    "text": "苏州"
                }, ]
            }, {
                "text": "浙江省",
                "id": '13',
                "children": [{
                    "id": "131",
                    "text": "杭州"
                }, {
                    "id": "132",
                    "text": "湖州"
                }, {
                    "id": "133",
                    "text": "嘉兴"
                }, {
                    "id": "134",
                    "text": "舟山"
                }, {
                    "id": "135",
                    "text": "宁波"
                }, {
                    "id": "136",
                    "text": "绍兴"
                }, {
                    "id": "137",
                    "text": "金华"
                }, {
                    "id": "138",
                    "text": "台州"
                }, {
                    "id": "139",
                    "text": "温州"
                }, {
                    "id": "1310",
                    "text": "丽水"
                }, ]
            }, {
                "text": "安徽省",
                "id": '14',
                "children": [{
                        "id": "141",
                        "text": "合肥"
                    }, {
                        "id": "142",
                        "text": "宿州"
                    }, {
                        "id": "143",
                        "text": "淮北"
                    }, {
                        "id": "144",
                        "text": "阜阳"
                    }, {
                        "id": "145",
                        "text": "蚌埠"
                    }, {
                        "id": "146",
                        "text": "淮南"
                    }, {
                        "id": "147",
                        "text": "滁州"
                    }, {
                        "id": "148",
                        "text": "马鞍山"
                    }, {
                        "id": "149",
                        "text": "芜湖"
                    }, {
                        "id": "1410",
                        "text": "铜陵"
                    }, {
                        "id": "1411",
                        "text": "安庆"
                    }, {
                        "id": "1412",
                        "text": "黄山"
                    }, {
                        "id": "1413",
                        "text": "六安"
                    }, {
                        "id": "1414",
                        "text": "巢湖"
                    }, {
                        "id": "1415",
                        "text": "池州"
                    }, {
                        "id": "1416",
                        "text": "宣城"
                    },

                ]
            }, {
                "text": "江西省",
                "id": '15',
                "children": [{
                    "id": "151",
                    "text": "南昌"
                }, {
                    "id": "152",
                    "text": "九江"
                }, {
                    "id": "153",
                    "text": "景德镇"
                }, {
                    "id": "154",
                    "text": "鹰潭"
                }, {
                    "id": "155",
                    "text": "新余"
                }, {
                    "id": "156",
                    "text": "萍乡"
                }, {
                    "id": "157",
                    "text": "赣州"
                }, {
                    "id": "158",
                    "text": "上饶"
                }, {
                    "id": "159",
                    "text": "抚州"
                }, {
                    "id": "1510",
                    "text": "宜春"
                }, {
                    "id": "1511",
                    "text": "吉安"
                }, ]
            }, {
                "text": "福建省",
                "id": '16',
                "children": [{
                    "id": "161",
                    "text": "福州"
                }, {
                    "id": "162",
                    "text": "南平"
                }, {
                    "id": "163",
                    "text": "三明"
                }, {
                    "id": "164",
                    "text": "莆田"
                }, {
                    "id": "165",
                    "text": "泉州"
                }, {
                    "id": "166",
                    "text": "厦门"
                }, {
                    "id": "167",
                    "text": "漳州"
                }, {
                    "id": "168",
                    "text": "龙岩"
                }, {
                    "id": "169",
                    "text": "宁德"
                }, ]
            }, {
                "text": "湖北省",
                "id": '17',
                "children": [{
                    "id": "171",
                    "text": "武汉"
                }, {
                    "id": "172",
                    "text": "十堰"
                }, {
                    "id": "173",
                    "text": "景德镇"
                }, {
                    "id": "174",
                    "text": "荆门"
                }, {
                    "id": "175",
                    "text": "孝感"
                }, {
                    "id": "176",
                    "text": "黄冈"
                }, {
                    "id": "177",
                    "text": "鄂州"
                }, {
                    "id": "178",
                    "text": "黄石"
                }, {
                    "id": "179",
                    "text": "咸宁"
                }, {
                    "id": "1710",
                    "text": "荆州"
                }, {
                    "id": "1711",
                    "text": "宜昌"
                }, {
                    "id": "1710",
                    "text": "恩施"
                }, {
                    "id": "1711",
                    "text": "襄樊"
                }, ]
            }, {
                "text": "湖南省",
                "id": '18',
                "children": [{
                    "id": "181",
                    "text": "长沙"
                }, {
                    "id": "182",
                    "text": "张家界"
                }, {
                    "id": "183",
                    "text": "常德"
                }, {
                    "id": "184",
                    "text": "益阳"
                }, {
                    "id": "185",
                    "text": "岳阳"
                }, {
                    "id": "186",
                    "text": "株洲"
                }, {
                    "id": "187",
                    "text": "湘潭"
                }, {
                    "id": "188",
                    "text": "郴州"
                }, {
                    "id": "189",
                    "text": "衡阳"
                }, {
                    "id": "1810",
                    "text": "永州"
                }, {
                    "id": "1811",
                    "text": "怀化"
                }, {
                    "id": "1810",
                    "text": "娄底"
                }, {
                    "id": "1811",
                    "text": "湘西"
                }, ]
            }, {
                "text": "四川省",
                "id": '19',
                "children": [{
                    "id": "191",
                    "text": "成都"
                }, {
                    "id": "192",
                    "text": "广元"
                }, {
                    "id": "193",
                    "text": "绵阳"
                }, {
                    "id": "194",
                    "text": "德阳"
                }, {
                    "id": "195",
                    "text": "南充"
                }, {
                    "id": "196",
                    "text": "广安"
                }, {
                    "id": "197",
                    "text": "遂宁"
                }, {
                    "id": "198",
                    "text": "内江"
                }, {
                    "id": "199",
                    "text": "乐山"
                }, {
                    "id": "1910",
                    "text": "自贡"
                }, {
                    "id": "1911",
                    "text": "泸州"
                }, {
                    "id": "1913",
                    "text": "宜宾"
                }, {
                    "id": "1914",
                    "text": "攀枝花"
                }, {
                    "id": "1915",
                    "text": "巴中"
                }, {
                    "id": "1916",
                    "text": "达州"
                }, {
                    "id": "1917",
                    "text": "资阳"
                }, {
                    "id": "1918",
                    "text": "眉山"
                }, {
                    "id": "1919",
                    "text": "雅安"
                }, {
                    "id": "1920",
                    "text": "阿坝"
                }, {
                    "id": "1921",
                    "text": "甘孜"
                }, {
                    "id": "1922",
                    "text": "凉山"
                }, ]
            }, {
                "text": "贵州省",
                "id": '20',
                "children": [{
                    "id": "201",
                    "text": "贵阳"
                }, {
                    "id": "202",
                    "text": "六盘水"
                }, {
                    "id": "203",
                    "text": "遵义"
                }, {
                    "id": "204",
                    "text": "毕节"
                }, {
                    "id": "205",
                    "text": "铜仁"
                }, {
                    "id": "206",
                    "text": "安顺"
                }, {
                    "id": "207",
                    "text": "黔东南"
                }, {
                    "id": "208",
                    "text": "黔南"
                }, {
                    "id": "209",
                    "text": "黔西南"
                }, ]
            }, {
                "text": "云南省",
                "id": '21',
                "children": [{
                    "id": "211",
                    "text": "昆明"
                }, {
                    "id": "212",
                    "text": "曲靖"
                }, {
                    "id": "213",
                    "text": "玉溪"
                }, {
                    "id": "214",
                    "text": "丽江"
                }, {
                    "id": "215",
                    "text": "昭通"
                }, {
                    "id": "216",
                    "text": "思茅"
                }, {
                    "id": "217",
                    "text": "临沧"
                }, {
                    "id": "218",
                    "text": "保山"
                }, {
                    "id": "219",
                    "text": "德宏"
                }, {
                    "id": "2110",
                    "text": "怒江"
                }, {
                    "id": "2111",
                    "text": "迪庆"
                }, {
                    "id": "2112",
                    "text": "大理"
                }, {
                    "id": "2113",
                    "text": "楚雄"
                }, {
                    "id": "2114",
                    "text": "红河"
                }, {
                    "id": "2115",
                    "text": "文山"
                }, {
                    "id": "2116",
                    "text": "西双版纳"
                }, ]
            }, {
                "text": "广东省",
                "id": '22',
                "children": [{
                    "id": "221",
                    "text": "广州"
                }, {
                    "id": "222",
                    "text": "清远"
                }, {
                    "id": "223",
                    "text": "韶关"
                }, {
                    "id": "224",
                    "text": "河源"
                }, {
                    "id": "225",
                    "text": "梅州"
                }, {
                    "id": "226",
                    "text": "潮州"
                }, {
                    "id": "227",
                    "text": "汕头"
                }, {
                    "id": "228",
                    "text": "揭阳"
                }, {
                    "id": "229",
                    "text": "汕尾"
                }, {
                    "id": "2210",
                    "text": "惠州"
                }, {
                    "id": "2211",
                    "text": "东莞"
                }, {
                    "id": "2212",
                    "text": "深圳"
                }, {
                    "id": "2213",
                    "text": "珠海"
                }, {
                    "id": "2214",
                    "text": "江门"
                }, {
                    "id": "2215",
                    "text": "佛山"
                }, {
                    "id": "2216",
                    "text": "肇庆"
                }, {
                    "id": "2217",
                    "text": "云浮"
                }, {
                    "id": "2218",
                    "text": "阳江"
                }, {
                    "id": "2219",
                    "text": "茂名"
                }, {
                    "id": "2220",
                    "text": "湛江"
                }, ]
            }, {
                "text": "海南省",
                "id": '23',
                "children": [{
                        "id": "231",
                        "text": "海口"
                    }, {
                        "id": "232",
                        "text": "三亚"
                    },

                ]
            }, {
                "text": "甘肃省",
                "id": '24',
                "children": [{
                    "id": "241",
                    "text": "兰州"
                }, {
                    "id": "242",
                    "text": "嘉峪关"
                }, {
                    "id": "243",
                    "text": "金昌"
                }, {
                    "id": "244",
                    "text": "白银"
                }, {
                    "id": "245",
                    "text": "天水"
                }, {
                    "id": "246",
                    "text": "酒泉"
                }, {
                    "id": "247",
                    "text": "张掖"
                }, {
                    "id": "248",
                    "text": "武威"
                }, {
                    "id": "249",
                    "text": "庆阳"
                }, {
                    "id": "2410",
                    "text": "平凉"
                }, {
                    "id": "2411",
                    "text": "定西"
                }, {
                    "id": "2412",
                    "text": "陇南"
                }, {
                    "id": "2413",
                    "text": "临夏"
                }, {
                    "id": "2414",
                    "text": "甘南"
                }, ]
            }, {
                "text": "青海省",
                "id": '25',
                "children": [{
                    "id": "251",
                    "text": "西宁"
                }, {
                    "id": "252",
                    "text": "海东"
                }, {
                    "id": "253",
                    "text": "海北"
                }, {
                    "id": "254",
                    "text": "海南"
                }, {
                    "id": "255",
                    "text": "黄南"
                }, {
                    "id": "256",
                    "text": "果洛"
                }, {
                    "id": "257",
                    "text": "玉树"
                }, {
                    "id": "258",
                    "text": "海西"
                }, ]
            }, {
                "text": "台湾省",
                "id": '26',
                "children": [{
                    "id": "261",
                    "text": "台北市"
                }, {
                    "id": "262",
                    "text": "台中市"
                }, {
                    "id": "263",
                    "text": "台南市"
                }, {
                    "id": "264",
                    "text": "高雄市"
                }, {
                    "id": "265",
                    "text": "新北市"
                }, {
                    "id": "266",
                    "text": "基隆市"
                }, {
                    "id": "267",
                    "text": "基隆市"
                }, {
                    "id": "268",
                    "text": "新竹市"
                }, {
                    "id": "269",
                    "text": "其他"
                }, ]
            }, {
                "text": "内蒙古自治区",
                "id": '27',
                "children": [{
                    "id": "271",
                    "text": "呼和浩特"
                }, {
                    "id": "272",
                    "text": "包头"
                }, {
                    "id": "273",
                    "text": "乌海"
                }, {
                    "id": "274",
                    "text": "赤峰"
                }, {
                    "id": "275",
                    "text": "呼伦贝尔盟"
                }, {
                    "id": "276",
                    "text": "兴安盟"
                }, {
                    "id": "277",
                    "text": "哲里木盟"
                }, {
                    "id": "278",
                    "text": "锡林郭勒盟"
                }, {
                    "id": "279",
                    "text": "乌兰察布盟"
                }, {
                    "id": "2710",
                    "text": "鄂尔多斯"
                }, {
                    "id": "2711",
                    "text": "巴彦淖尔盟"
                }, {
                    "id": "2712",
                    "text": "阿拉善盟"
                }, ]
            }, {
                "text": "新疆维吾尔自治区",
                "id": '28',
                "children": [{
                    "id": "281",
                    "text": "乌鲁木齐"
                }, {
                    "id": "282",
                    "text": "克拉玛依"
                }, {
                    "id": "283",
                    "text": "喀什"
                }, {
                    "id": "284",
                    "text": "阿克苏"
                }, {
                    "id": "285",
                    "text": "和田"
                }, {
                    "id": "286",
                    "text": "吐鲁番"
                }, {
                    "id": "287",
                    "text": "哈密"
                }, {
                    "id": "288",
                    "text": "博尔塔拉"
                }, {
                    "id": "289",
                    "text": "昌吉"
                }, {
                    "id": "2810",
                    "text": "巴音郭楞"
                }, {
                    "id": "2811",
                    "text": "伊犁"
                }, {
                    "id": "2812",
                    "text": "塔城"
                }, {
                    "id": "2813",
                    "text": "阿勒泰"
                }, ]
            }, {
                "text": "西藏自治区",
                "id": '29',
                "children": [{
                    "id": "291",
                    "text": "拉萨"
                }, {
                    "id": "292",
                    "text": "那曲"
                }, {
                    "id": "293",
                    "text": "昌都"
                }, {
                    "id": "294",
                    "text": "林芝"
                }, {
                    "id": "295",
                    "text": "山南"
                }, {
                    "id": "296",
                    "text": "日喀则"
                }, {
                    "id": "297",
                    "text": "阿里"
                }, ]
            }, {
                "text": "广西壮族自治区",
                "id": '30',
                "children": [{
                        "id": "301",
                        "text": "南宁"
                    }, {
                        "id": "302",
                        "text": "桂林"
                    }, {
                        "id": "303",
                        "text": "柳州"
                    }, {
                        "id": "304",
                        "text": "梧州"
                    }, {
                        "id": "305",
                        "text": "贵港"
                    }, {
                        "id": "306",
                        "text": "玉林"
                    }, {
                        "id": "307",
                        "text": "钦州"
                    }, {
                        "id": "308",
                        "text": "北海"
                    }, {
                        "id": "309",
                        "text": "防城港"
                    }, {
                        "id": "3010",
                        "text": "南宁"
                    }, {
                        "id": "3011",
                        "text": "百色"
                    }, {
                        "id": "3012",
                        "text": "河池"
                    }, {
                        "id": "3013",
                        "text": "柳州"
                    }, {
                        "id": "3014",
                        "text": "贺州"
                    },

                ]
            }, {
                "text": "宁夏回族自治区",
                "id": '31',
                "children": [{
                    "id": "311",
                    "text": "银川市"
                }, {
                    "id": "312",
                    "text": "石嘴山市"
                }, {
                    "id": "313",
                    "text": "吴忠市"
                }, {
                    "id": "314",
                    "text": "固原市"
                }, {
                    "id": "315",
                    "text": "中卫市"
                }, ]
            }, {
                "text": "香港特别行政区",
                "id": '32',
                "children": [{
                    "id": "321",
                    "text": "香港岛"
                }, {
                    "id": "322",
                    "text": "九龙半岛"
                }, {
                    "id": "323",
                    "text": "新界"
                }, {
                    "id": "324",
                    "text": "离岛"
                }, ]
            }, {
                "text": "澳门特别行政区",
                "id": '33',
                "children": [{
                    "id": "331",
                    "text": "花地玛堂区"
                }, {
                    "id": "332",
                    "text": "圣安多尼堂区"
                }, {
                    "id": "333",
                    "text": "大堂区"
                }, {
                    "id": "334",
                    "text": "望德堂区"
                }, {
                    "id": "335",
                    "text": "风顺堂区"
                }, {
                    "id": "336",
                    "text": "嘉模堂区"
                }, {
                    "id": "337",
                    "text": "圣方济各堂区"
                }, ]
            }, ]
            //省市二级联动
            //省
        $scope.$watch('erji.selectedProvince', function(newValue, oldValue) {
            if (newValue != oldValue) {
                var len = $scope.regionData.length;
                
                if (!newValue) { //判断选择的是否选择省份，如果没有则重置市区
                    $scope.citys = [];
                    $scope.districts = [];
                    return;
                }
                for (var i = 0; i < len; i++) {
                    if ($scope.regionData[i].id == $scope.erji.selectedProvince) {
                        $scope.citys = $scope.regionData[i].children;
                        $scope.regionText.selectedProvinceText = $scope.regionData[i].text;
                    }
                }
                $scope.districts = [];
            }
        });
        //市
        $scope.$watch('erji.selectedCity', function(newValue, oldValue) {
            if (newValue != oldValue) {
                if (!newValue) { //作用同上
                    $scope.districts = [];
                    return;
                }
                var len = $scope.citys.length;
                for (var i = 0; i < len; i++) {
                    if ($scope.citys[i].id == $scope.erji.selectedCity) {
                        $scope.districts = $scope.citys[i].children;
                        $scope.regionText.selectedCityText = $scope.citys[i].text;
                    }
                }
            }
        });
        $scope.districtObj = {};
        //图片上传
        $scope.userCardFun=function(){ 
            $scope.isCard=!$scope.isCard;
            if($scope.isCard==true){
                $timeout(function(){
                    $("#personal_sup_html").scrollTop(99999);
                },100)
            }   
        }; 
        //图片上传组件 获取到的fun ,返回需要的值 
        $scope.changFun = function(files, img) { 
            $scope.uploadfiles = files;
            var arr=$scope.uploadfiles[0];
            $scope.fileName=arr.name;
            console.log($scope.fileName); 
            $scope._images = img;
            if ($scope._images.length > 0) {
                $scope.userCardimg = $scope._images[0];
                $scope.isUpCard = true;
            } else {
                $scope.userCardimg = $scope.BusCard;
            }
        };
        //删除图片
        $scope.delImage = function() {
            $scope._images = [];
            $scope.uploadfiles = [];
            $scope.userCardimg = $scope.BusCard;
            $scope.isUpCard = false;
        };
        //取消图片上传
        $scope.cannelFlies = function() {
            $scope.uploadfiles = [];
            $scope._images = [];
            $scope.fileName='';
            $scope.userCardimg = $scope.BusCard;
            $scope.isCard = false;
            $scope.isUpCard = false;
        }
        $scope.uoloadCardImg = function() {
            if ($scope.uploadfiles.length == 0) {
                alertTip.warning("您没有选任何新名片");
                return false;
            }
            $scope.isCard = false;
            var cardURl = $scope.uploadfiles[0];
            var data = new FormData();
            data.append('businessCardPicture', cardURl);
            netPersonalCenterService.addUserBusinessCard(data).then(function(result) {
                $scope.cardCard();
                alertTip.success('更新名片成功');
                $scope.isUpCard = false;
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.warning(err.data.msg);
            });
        }
        $scope.giftFun = function() {
            var oDiv = document.getElementById("duihuan");
            oDiv.scrollIntoView(true);
            $scope.active = 1; //切换到兑换记录tab
        };
    }

});