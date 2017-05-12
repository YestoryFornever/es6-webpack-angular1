app.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $stateProvider
    //已认证
        .state('home.personalcenter', {
            url: '/personal-center', //基本信息
            views: {
                'main@home': {
                    component: 'personalCenter'
                },
            }
        })
        .state('home.personalcenter.essentialInformationYes', {
            url: '/essential-information-yes?:realCertifyState', //基本信息
            views: {
                'person': {
                    component: 'essentialInformationyes'
                },
            }
        })
        .state('home.personalcenter.makeComplaints', {
            url: '/make-complaints', //我要吐槽
            views: {
                'person': {
                    component: 'makeComplaints'
                },
            }
        })
        .state('home.personalcenter.moreSettingsYes', {
            url: '/more-settings-yes', //更多设置
            views: {
                'person': {
                    component: 'moreSettingsYes'
                },
            }
        })
        .state('home.personalcenter.myWealth', {
            url: '/my-wealth', //我的财富
            views: {
                'person': {
                    component: 'myWealth'
                },
            }
        })
        .state('home.personalcenter.serviceTag', {
            url: '/service-tag', //业务标签
            views: {
                'person': {
                    component: 'serviceTag'
                },
            }
        })
        .state('home.personalcenter.spokesMan', {
            url: '/spokes-man', //我的代言人
            views: {
                'person': {
                    component: 'spokesMan'
                },
            }
        })
        .state('home.personalcenter.supplementaryInformation', {
            url: '/supplementary-information?subobj;', //信息补充
            views: {
                'person': {
                    component: 'supplementaryInformation'
                },
            }
        })
        //未认证
        .state('home.personalcenter.essentialInformationNo', {
            url: '/essential-information-no?:realCertifyState', //基本信息
            views: {
                'person': {
                    component: 'essentialInformationNo'
                },
            }
        })
        .state('home.personalcenter.moreSettingsNo', {
            url: '/more-settings-no', //更多设置
            views: {
                'person': {
                    component: 'moreSettingsNo'
                },
            }
        })
});