app.component('essentialInformationyes', {
    restrict: 'E',
    bindings: {},
    templateUrl: './essential-information-yes.html',
    controller: function($scope, $location, $timeout, $interval, netPersonalCenterService, $sce, $http, alertTip) {
        'ngInject';
        //列表框的显示和隐藏
        $scope.isName = false;
        $scope.isOrganization = false;
        $scope.nameDisabled = false;
        $scope.orgDisabled = false;
        $scope.imgtrue = false;
        $scope.amendNameBtn = '申请修改';
        $scope.amendOrgBtn = "申请修改";
        $scope._images = [];
        $scope.headerimg = "";
        $scope.uploadfiles = [];
        $scope.fieldType = ''; //权限的参数 
        $scope.isDisabled = false; //按钮禁用
        $scope.orgInput = false; //机构待审核禁用
        $scope.nameInput = false; //用户名待审核禁用
        $scope.org_org = 1;
        $scope.us_name = 1;
        $scope.dep_name = 1;
        $scope.pos_name = 1;
        $scope.con_ph = 1;
        $scope.wo_ph = 1;
        $scope.org_email = 1;
        $scope.org_ad = 1;
        $scope.data = {};
        //正则判断修改所有元素
        $scope.$broadcast('account:error', '出错信息');
        $scope.valid_name = function(val, form) {
            if (val == "") {
                $scope.nameDisabled = true;
                return '姓名不能为空';
            } else {
                if ($scope.nameInput == true) {
                    $scope.nameDisabled = true;
                } else {
                    $scope.nameDisabled = false;
                }

            }
        };
        $scope.valid_org = function(val, form) {
            if (val == "") {
                $scope.orgDisabled = true;
                return '机构名称不能为空';
            } else {
                if ($scope.orgInput == true) {
                    $scope.orgDisabled = true;
                } else {
                    $scope.orgDisabled = false;
                }
            }
        };
        $scope.valid_dept = function(val, form) {
            if (val == "") {
                return '部门名称不能为空';
            }
        };
        $scope.valid_pos = function(val, form) {
            if (val == "") {
                return '职位不能为空';
            }
        };
        $scope.valid_cont = function(val, form) {
            if (!val.match(/(^1[3|5|7|8|4][0-9]{9}$)/)) {
                return '联系电话格式不对';
            }
        };
        $scope.valid_wop = function(val, form) {
            if (val.length == "") {
                return '办公电话格式不对';
            }
        };
        $scope.valid_email = function(val, form) {
            if (!val.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)) {
                return '邮箱格式不对';
            }
        };
        $scope.valid_addr = function(val, form) {
            if (val == "") {
                return '机构地址不能为空';
            }
        };
        //获取用户信息
        function essentialService() {
            netPersonalCenterService.essentialService().then(function(result) {
                $scope.essentialInform = result.data.data;
                $scope.headerimg = $scope.essentialInform.iconUrl;
            });
        }
        essentialService();
        //更新用户信息//更新用户信息接口
        $scope.defult = {
            userName: '',
            organizationShortName: '',
            department: '',
            position: '',
            contactPhone: '',
            workPhone: '',
            companyMail: '',
            workAddress: '',
        };
        //查看机构和用户名的修改权限 
        $scope.getWebFieldSta = function() {
            netPersonalCenterService.getWebFieldStatus({
                'fieldType': $scope.fieldType
            }).then(function(result) {
                if ($scope.fieldType == 1) {
                    if (result.data.data.status == 1) { //之前修改的信息审核中，这次不可修改
                        $scope.defult.userName = result.data.data.name;
                        $scope.nameDisabled = true;
                        $scope.amendNameBtn = "等待审核";
                        $scope.nameInput = true;
                    } else {
                        $scope.nameInput = false;
                    }
                } else if ($scope.fieldType == 2) {
                    if (result.data.data.status == 1) { //之前修改的信息审核中，这次不可修改
                        $scope.defult.organizationShortName = result.data.data.name;
                        $scope.amendOrgBtn = "等待审核";
                        $scope.orgDisabled = true;
                        $scope.orgInput = true;
                    } else {
                        $scope.orgInput = false;
                    }
                }
            });
        };
        //机构模糊查询
        $scope.orgInputChange = function(val) {
            return netPersonalCenterService.getOrganizationList({
                'organizationName': val
            }).then(function(result) {
                if (result.data.data.length > 0) {
                    return result.data.data;
                }
            });
        };
        //部门模糊查询
        $scope.DepartInputChange = function(val) {
            return netPersonalCenterService.getDepartmentList({
                'departmentName': val
            }).then(function(result) {
                if (result.data.data.length > 0) {
                    return result.data.data;
                }
            });
        };
        //修改姓名
        $scope.NameStatue = function() {
            $scope.isName = !$scope.isName;
            $scope.fieldType = '1';
            $scope.us_name = 2;
            $scope.getWebFieldSta()
        };
        $scope.amendName = function() {
            netPersonalCenterService.updateUserRealInfo({
                'userName': $scope.defult.userName
            }).then(function(result) {

                essentialService();
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
            $scope.us_name = 1;
            //等待后台审核名称
            $scope.amendNameBtn = "等待审核";
            $scope.nameDisabled = true;
            $scope.isName = false;
        };
        //取消修改姓名
        $scope.uNameRemove = function() {
            $scope.us_name = 1;
            $scope.isName = false;
            $scope.defult.userName = "";
        };
        //修改机构
        $scope.OrgStatue = function() {
            $scope.isOrganization = !$scope.isOrganization;
            $scope.fieldType = '2';
            $scope.getWebFieldSta()
            $scope.org_org = 2;
        };
        $scope.amendOrg = function() {
            netPersonalCenterService.updateUserRealInfo({
                'organizationShortName': $scope.defult.organizationShortName
            }).then(function(result) {
                essentialService();
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
            $scope.org_org = 1;
            //等待后台审核机构
            $scope.amendOrgBtn = "等待审核";
            $scope.orgDisabled = true;
            $scope.isOrganization = false;
        };
        //取消修改机构
        $scope.OrgRemove = function() {
            $scope.org_org = 1;
            $scope.defult.organizationShortName = '';
            $scope.isOrganization = false;
        };
        //修改部门
        $scope.amendDepartment = function() {
            $scope.dep_name = 1;
            $scope.isDepartment = false;
            netPersonalCenterService.updateUserRealInfo({
                'department': $scope.defult.department
            }).then(function(result) {
                essentialService();
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
        };
        //取消修改部门
        $scope.depRemove = function() {
                $scope.dep_name = 1;
                $scope.defult.department = '';
                $scope.isDepartment = false;
            }
            //修改职位
        $scope.amendPosition = function() {
            $scope.pos_name = 1;
            $scope.isPosition = false;
            netPersonalCenterService.updateUserRealInfo({
                'position': $scope.defult.position
            }).then(function(result) {
                essentialService();
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
        };
        //取消修改职位
        $scope.posRemove = function(form) {
                $scope.pos_name = 1;
                $scope.defult.position = '';
                $scope.isPosition = false;
            }
            //修改联系电话 
        $scope.amendContactPhone = function() {
            $scope.con_ph = 1;
            $scope.isContactNum = false;
            netPersonalCenterService.updateUserRealInfo({
                'contactPhone': $scope.defult.contactPhone
            }).then(function(result) {
                essentialService();
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
        };
        //取消修改联系电话
        $scope.conPhRemove = function() {
            $scope.con_ph = 1;
            $scope.defult.contactPhone = '';
            $scope.isContactNum = false;
        };
        //修改工作电话
        $scope.amendWorkPhone = function() {
            $scope.wo_ph = 1;
            $scope.isWorkNum = false;
            netPersonalCenterService.updateUserRealInfo({
                'workPhone': $scope.defult.workPhone
            }).then(function(result) {
                essentialService();
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
        };
        //取消修改工作电话
        $scope.woPhRemove = function() {
            $scope.wo_ph = 1;
            $scope.defult.workPhone = '';
            $scope.isWorkNum = false;
        };
        //修改机构邮箱
        $scope.amendCompanyMail = function() {
            $scope.org_email = 1;
            $scope.isOrgEmail = false;
            netPersonalCenterService.updateUserRealInfo({
                'companyMail': $scope.defult.companyMail
            }).then(function(result) {
                essentialService();
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
        };
        //取消修改机构邮箱
        $scope.orgEmailRemove = function() {
            $scope.org_email = 1;
            $scope.defult.companyMail = '';
            $scope.isOrgEmail = false;
        };
        //修改机构地址
        $scope.amendWorkAddress = function() {
            $scope.org_ad = 1;
            $scope.isOrgAddress = false;
            netPersonalCenterService.updateUserRealInfo({
                'workAddress': $scope.defult.workAddress
            }).then(function(result) {
                essentialService();
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
        };
        //取消修改机构地址
        $scope.orgAdRemove = function() {
            $scope.org_ad = 1;
            $scope.defult.workAddress = '';
            $scope.isOrgAddress = false;
        };
        //图片上传组件 获取到的fun ,返回需要的值
        $scope.changFun = function(files, img) {
            $scope.uploadfiles = files;
            var fIarr = $scope.uploadfiles[0];
            $scope.fileNameHeader = fIarr.name;
            console.log($scope.fileNameHeader);
            $scope._images = img;
            if ($scope._images.length > 0) {
                $scope.headerimg = $scope._images[0];
                $scope.imgtrue = true;
            } else {
                $scope.headerimg = $scope.essentialInform.iconUrl;
            }
        };
        //删除图片
        $scope.delImage = function() {
            $scope._images = [];
            $scope.uploadfiles = [];
            $scope.headerimg = $scope.essentialInform.iconUrl;
            $scope.imgtrue = false;
        };
        //取消图片上传
        $scope.cannelFlies = function() {
            $scope.uploadfiles = [];
            $scope._images = [];
            $scope.fileNameHeader = '';
            $scope.headerimg = $scope.essentialInform.iconUrl;
            $scope.isHeaderImg = false;
            $scope.imgtrue = false;
        }
        $scope.uoloadHeaderImg = function() {
            if ($scope.uploadfiles.length == 0) {
                alertTip.success("您没有选任何新头像");
                return false;
            }
            $scope.isDisabled = true;
            var dd = $scope.uploadfiles[0];
            var data = new FormData();
            data.append('icon', dd);
            netPersonalCenterService.updateUserIcon(data).then(function(result) {
                alertTip.success('上传头像成功');
                $scope.isHeaderImg = false;
                $scope.isDisabled = false;
                $scope.imgtrue = false;
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err);
            });;
        };
    }
});