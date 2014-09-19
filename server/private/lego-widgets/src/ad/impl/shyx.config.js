/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lv2.config.js ~ 2013/03/18 13:45:50
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * lv2的配置数据
 **/

var AD_CONFIG = {
    id: "pl_l_70136",
    global: {
        main_url: "http://www.yestar1992.com"
    },
    video: {
        rcv_url: "http://www.yestar1992.com#baidupinpai",
        img_url: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/sp.jpg",
        video_url: "http://eiv.baidu.com/mapm2/yixing/131015_pl_01/sp.flv",
        ipad_img: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/ipad.jpg"
    },
    video_title: {
        text: "400-060-1992",
        rcv_url: "http://www.yestar1992.com#baidupinpai"
    },
    head: {
        titletext: "<em>艺星整形</em>中国官网",
        titleurl_rcv_url: "http://www.yestar1992.com#baidupinpai",
        logoimg: {
            logoimg: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/logo.jpg",
            logourl_rcv_url: "http://www.yestar1992.com#baidupinpai",
        },
        description_rcv_html: 'Yestar艺星，国际连锁品牌。以卓越品质和先进技术成为国际医美奢侈品牌，在<a target="_blank" href="http://www.yestar1992.com/article/201308-681-11.shtml#baidupinpai" class="">首尔</a>、<a target="_blank" href="http://www.yestar1992.com/article/201308-681-3.shtml#baidupinpai" class="">上海</a>、<a target="_blank" href="http://www.yestar1992.com/article/201308-681-9.shtml#baidupinpai" class="">北京</a>、<a target="_blank" href="http://www.yestar1992.com/article/201308-681-6.shtml#baidupinpai" class="">杭州</a>、<a target="_blank" href="http://www.yestar1992.com/article/201308-681-8.shtml#baidupinpai" class="">大连</a>、<a target="_blank" href="http://www.yestar1992.com/article/201308-681-5.shtml#baidupinpai" class="">长沙</a>、<a target="_blank" href="http://www.yestar1992.com/article/201308-681-4.shtml#baidupinpai" class="">武汉</a>、<a target="_blank" href="http://www.yestar1992.com/article/201308-681-7.shtml#baidupinpai" class="">温州</a>、<a target="_blank" href="http://www.yestar1992.com/article/201308-681-10.shtml#baidupinpai" class="">哈尔滨</a>设有连锁机构，专为爱美女性提供高端定制医美服务。',
        site: "www.yestar1992.com"
    },
    buttons: {
        options: [{
            text: "新闻资讯",
            rcv_url: "http://www.yestar1992.com#baidupinpai"
        }, {
            text: "品牌活动",
            rcv_url: "http://www.yestar1992.com/News/list-8-1.shtml#baidupinpai"
        }, {
            text: "连锁机构",
            rcv_url: "http://www.yestar1992.com/Hospital/list-681-1.shtml#baidupinpai"
        },{
            text: "经典项目",
            rcv_url: "http://www.yestar1992.com/Doctor/list-715-1.shtml#baidupinpai"
        }, {
            text: "成功案例",
            rcv_url: "http://www.yestar1992.com/Anli/list-12-1.shtml#baidupinpai"
        }, {
            text: "在线咨询",
            rcv_url: "http://www.yestar1992.com/zixun/#baidupinpai"
        }]
    },
    tab: {
        interval_time: 500000000,
        hover_time: 200,
        default_index: 0,
        width: 524,
        li_margin: 0,
        options: [{
            tab_title: "品牌故事",
            tab_content: {
                image_cartoon: {
                    disable: true,
                    options: [{
                        imgsrc: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/1-1.jpg",
                        imgurl_rcv_url: "http://www.yestar1992.com/Project/list-705-1.shtml#baidupinpai",
                        linktext: "品牌简介"
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/1-2.jpg",
                        imgurl_rcv_url: "http://www.yestar1992.com/Ppzx/list-707-1.shtml#baidupinpai",
                        linktext: "创始人记"
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/1-3.jpg",
                        imgurl_rcv_url: "http://www.yestar1992.com/Ppzx/list-708-1.shtml#baidupinpai",
                        linktext: "院长寄语"
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/1-4.jpg",
                        imgurl_rcv_url: "http://www.yestar1992.com/Ppzx/list-709-1.shtml#baidupinpai",
                        linktext: "经营理念"
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/1-5.jpg",
                        imgurl_rcv_url: "http://www.yestar1992.com/Project/list-710-1.shtml#baidupinpai",
                        linktext: "品牌使命"
                    }],
                    left_arrow: "http://eiv.baidu.com/mapm2/lv/120630_pl_01/left.png",
                    right_arrow: "http://eiv.baidu.com/mapm2/lv/120630_pl_01/right.png"
                }
            }
        }, {
            tab_title: "医美中心",
            tab_content: {
                image_cartoon: {
                    disable: true,
                    options: [{
                        imgsrc: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/2-1.jpg",
                        imgurl_rcv_url: "http://www.yestar1992.com/Plastic/list-13-1.shtml#baidupinpai",
                        linktext: "整形外科"
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/2-2.jpg",
                        imgurl_rcv_url: "http://www.yestar1992.com/Project/list-527-1.shtml#baidupinpai",
                        linktext: "医疗美容科"
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/2-3.jpg",
                        imgurl_rcv_url: "http://www.yestar1992.com/Project/list-527-1.shtml#baidupinpai",
                        linktext: "美容皮肤科"
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/2-4.jpg",
                        imgurl_rcv_url: "http://www.yestar1992.com/mouth/list-17-1.shtml#baidupinpai",
                        linktext: "美容牙科"
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/yixing/131012_pl_01/2-5.jpg",
                        imgurl_rcv_url: " http://www.yestar1992.com/#baidupinpai",
                        linktext: "官方微信"
                    }],
                    left_arrow: "http://eiv.baidu.com/mapm2/lv/120630_pl_01/left.png",
                    right_arrow: "http://eiv.baidu.com/mapm2/lv/120630_pl_01/right.png"
                }
            }
        }, {
            tab_title: "地址查询",
            tab_content: {
                form: {
                    "head_text": "你好你好你好",
                    "head_text_rcv_url": "http://www.baidu.com/?l=head_text_rcv_url",
                    "datasource_url": "//bs.baidu.com/public03/pl/data/shyx-d30df769.js"
                }
            }
        }, {
            tab_title: "项目中心",
            tab_content: {
                table: {
                    "left_head": "整形",
                    "left_head_rcv_url": "http://www.yestar1992.com/#baidupinpai",
                    "left_body": [
                        [{
                            text: "双眼皮",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-76-1.shtml#baidupinpai"
                        }, {
                            text: "鼻部整形鼻部整形",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-27-1.shtml#baidupinpai"
                        }, {
                            text: "胸部整形",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-28-1.shtml#baidupinpai"
                        }],
                        [{
                            text: "开眼角",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-78-1.shtml#baidupinpai"
                        }, {
                            text: "假体隆鼻",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-83-1.shtml#baidupinpai"
                        }, {
                            text: "假体隆胸",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-92-1.shtml#baidupinpai"
                        }],
                        [{
                            text: "祛眼袋",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-77-1.shtml#baidupinpai"
                        }, {
                            text: "注射隆鼻",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-810-1.shtml#baidupinpai"
                        }, {
                            text: "注射隆胸",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-812-1.shtml#baidupinpai"
                        }],
                        [{
                            text: "重睑修复",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-79-1.shtml#baidupinpai"
                        }, {
                            text: "隆鼻修复",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-91-1.shtml#baidupinpai"
                        }, {
                            text: "胸部整形修复",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-98-1.shtml#baidupinpai"
                        }]
                    ],
                    "right_head": "美容",
                    "right_head_rcv_url": "http://www.yestar1992.com/Injection/list-14-1.shtml#baidupinpai",
                    "right_body": [
                        [{
                            text: "微创美容",
                            rcv_url: "http://www.yestar1992.com/Injection/list-14-1.shtml#baidupinpai"
                        }, {
                            text: "玻尿酸",
                            rcv_url: "http://www.yestar1992.com/Injection/list-37-1.shtml#baidupinpai"
                        }, {
                            text: "胶原蛋白",
                            rcv_url: "http://www.yestar1992.com/Injection/list-38-1.shtml#baidupinpai"
                        }],
                        [{
                            text: "皮肤除皱",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-30-1.shtml#baidupinpai"
                        }, {
                            text: "瑞蓝",
                            rcv_url: "http://www.yestar1992.com/Injection/list-814-1.shtml#baidupinpai"
                        }, {
                            text: "吸脂瘦身",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-29-1.shtml#baidupinpai"
                        }],
                        [{
                            text: "美白嫩肤",
                            rcv_url: "http://www.yestar1992.com/Dermatology/list-736-1.shtml#baidupinpai"
                        }, {
                            text: "爱贝芙",
                            rcv_url: "http://www.yestar1992.com/Injection/list-39-1.shtml#baidupinpai"
                        }, {
                            text: "唇部整形",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-32-1.shtml#baidupinpai"
                        }],
                        [{
                            text: "水润注射",
                            rcv_url: "http://www.yestar1992.com/Dermatology/list-543-1.shtml#baidupinpai"
                        }, {
                            text: "微针塑形",
                            rcv_url: "http://www.yestar1992.com/Dermatology/list-60-1.shtml#baidupinpai"
                        }, {
                            text: "自体脂肪填充鼻部整形",
                            rcv_url: "http://www.yestar1992.com/Plastic/list-813-1.shtml#baidupinpai"
                        }]
                    ]

                }
            }
        }, {
            tab_title: "官方微博",
            tab_content: {
                "weibo": {
                    id: "2816350830",
                    icon: "http://eiv.baidu.com/mapm2/yixing/131015_pl_01/weibo_logo.jpg",
                    icon_url: "http://e.weibo.com/yestarbeauty?ref=http%3A%2F%2Fe.weibo.com%2Fyestarbeauty%3Fref%3Dhttp%253A%252F%252Fweibo.com%252F",
                    follow_imgsrc: "http://eiv.baidu.com/mapm2/lv/120630_pl_01/follow.png"
                }
            }
        }]
    }
};;



/* vim: set ts=4 sw=4 sts=4 tw=100: */
