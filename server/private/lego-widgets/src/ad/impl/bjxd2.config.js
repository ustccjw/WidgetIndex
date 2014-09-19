/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: bjxd2.config.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/bjxd2.config.js ~ 2012/09/27 15:15:12
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * encore的配置数据
 **/

var AD_CONFIG = {
    //左侧视频
    'video_left' : {
        'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
        'video_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.flv',
        'ipad_img': 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg', //在ipad下点击视频替代图片
        'width':220,
        'height':190
    },
    'small_head' : {
        'titletext' : '<em>北京现代</em>汽车',
        'titleurl_rcv_url' : 'http://www.baidu.com',
        'description_rcv_html' : '北京现代成立于2002年，是累计产销400余万辆的主流车企之一。产品有全新胜达,朗动,索纳塔八,ix35,瑞纳,新悦动,途胜等车型。客服：400-800-1100',
        'image_group_head' : {
            'options':[
                {
                    'imgsrc':'http://eiv.baidu.com/mapm2/encore//h1_img1.jpg'
                },{
                    'imgsrc':'http://eiv.baidu.com/mapm2/encore//h1_img1.jpg'
                },{
                    'imgsrc':'http://eiv.baidu.com/mapm2/encore//h1_img1.jpg'
                }
            ]
        },
        'site' : 'www.beijing-hyundai.com.cn'
    },
    //第一个tab
    'tab1' : {
        "width" : 300,
        "height" : 105,
        "src" : "http://eiv.baidu.com/mapm2/beijingxiandai/130321/index.html",//嵌入的捷径表单地址
        "image" : "http://drmcmm.baidu.com/media/id=P1D4nj0dPWD&gp=402&time=nHnYnH64rjRkrf.jpg",
        "image_rcv_url" : "http://www.baidu.com"
    },
    'tab' : {
        'interval_time' : 500000000, //自动切换tab时间间隔
        'hover_time' : 200,
        'default_index' : 0, //默认载入的tab，从0开始
        'options': [
            {
                'tab_title': '品牌故事',
                'tab_cont': {
                    'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
                    'pro_rcv_url' : 'http://www.dell.com.cn',
                    'des_title' : '纵横天地,势不可挡',
                    'des_title_rcv_url' : 'http://www.dell.com.cn',
                    'des_text' : '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
                    'des_text_rcv_url' : 'http://www.dell.com.cn',
                    'type_title' : '可选型号：',
                    'type_links' : [
                        {
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 动感型'
                        },{
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 豪华型'
                        }
                    ]
                }
            },
            {
                'tab_title': '品牌故事',
                'tab_cont': {
                    'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
                    'pro_rcv_url' : 'http://www.dell.com.cn',
                    'des_title' : '纵横天地,势不可挡',
                    'des_title_rcv_url' : 'http://www.dell.com.cn',
                    'des_text' : '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
                    'des_text_rcv_url' : 'http://www.dell.com.cn',
                    'type_title' : '可选型号：',
                    'type_links' : [
                        {
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 动感型'
                        },{
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 豪华型'
                        }
                    ]
                }
            },
            {
                'tab_title': '品牌故事',
                'tab_cont': {
                    'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
                    'pro_rcv_url' : 'http://www.dell.com.cn',
                    'des_title' : '纵横天地,势不可挡',
                    'des_title_rcv_url' : 'http://www.dell.com.cn',
                    'des_text' : '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
                    'des_text_rcv_url' : 'http://www.dell.com.cn',
                    'type_title' : '可选型号：',
                    'type_links' : [
                        {
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 动感型'
                        },{
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 豪华型'
                        }
                    ]
                }
            },
            {
                'tab_title': '品牌故事',
                'tab_cont': {
                    'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
                    'pro_rcv_url' : 'http://www.dell.com.cn',
                    'des_title' : '纵横天地,势不可挡',
                    'des_title_rcv_url' : 'http://www.dell.com.cn',
                    'des_text' : '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
                    'des_text_rcv_url' : 'http://www.dell.com.cn',
                    'type_title' : '可选型号：',
                    'type_links' : [
                        {
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 动感型'
                        },{
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 豪华型'
                        }
                    ]
                }
            },
            {
                'tab_title': '品牌故事',
                'tab_cont': {
                    'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
                    'pro_rcv_url' : 'http://www.dell.com.cn',
                    'des_title' : '纵横天地,势不可挡',
                    'des_title_rcv_url' : 'http://www.dell.com.cn',
                    'des_text' : '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
                    'des_text_rcv_url' : 'http://www.dell.com.cn',
                    'type_title' : '可选型号：',
                    'type_links' : [
                        {
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 动感型'
                        },{
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 豪华型'
                        }
                    ]
                }
            },
            {
                'tab_title': '品牌故事',
                'tab_cont': {
                    'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
                    'pro_rcv_url' : 'http://www.dell.com.cn',
                    'des_title' : '纵横天地,势不可挡',
                    'des_title_rcv_url' : 'http://www.dell.com.cn',
                    'des_text' : '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
                    'des_text_rcv_url' : 'http://www.dell.com.cn',
                    'type_title' : '可选型号：',
                    'type_links' : [
                        {
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 动感型'
                        },{
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 豪华型'
                        }
                    ]
                }
            },
            {
                'tab_title': '品牌故事',
                'tab_cont': {
                    'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
                    'pro_rcv_url' : 'http://www.dell.com.cn',
                    'des_title' : '纵横天地,势不可挡',
                    'des_title_rcv_url' : 'http://www.dell.com.cn',
                    'des_text' : '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
                    'des_text_rcv_url' : 'http://www.dell.com.cn',
                    'type_title' : '可选型号：',
                    'type_links' : [
                        {
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 动感型'
                        },{
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 豪华型'
                        }
                    ]
                }
            },
            {
                'tab_title': '品牌故事',
                'tab_cont': {
                    'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
                    'pro_rcv_url' : 'http://www.dell.com.cn',
                    'des_title' : '纵横天地,势不可挡',
                    'des_title_rcv_url' : 'http://www.dell.com.cn',
                    'des_text' : '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
                    'des_text_rcv_url' : 'http://www.dell.com.cn',
                    'type_title' : '可选型号：',
                    'type_links' : [
                        {
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 动感型'
                        },{
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 豪华型'
                        }
                    ]
                }
            },
            {
                'tab_title': '品牌故事',
                'tab_cont': {
                    'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
                    'pro_rcv_url' : 'http://www.dell.com.cn',
                    'des_title' : '纵横天地,势不可挡',
                    'des_title_rcv_url' : 'http://www.dell.com.cn',
                    'des_text' : '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
                    'des_text_rcv_url' : 'http://www.dell.com.cn',
                    'type_title' : '可选型号：',
                    'type_links' : [
                        {
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 动感型'
                        },{
                            'rcv_url' : 'http://www.baidu.com',
                            'text' : 'ML350 豪华型'
                        }
                    ]
                }
            }
        ]
    },
    'fwc' : {
        'width':720,
        'height':420,
        'display_bg_iframe': true,
        'float_bg':{
            'src':'http://eiv.baidu.com/mapm2/encore/bg.jpg', //浮层背景图
            'rcv_url':'http://www.baidu.com' //浮层背景跳转地址
        },
        'options': [
            {
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg",
                video_url: "//bs.baidu.com/adtest/dfa4e34237dac53296931da8d610347f.flv",
                ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg",
                width: 400,
                height: 250,
                is_play: true,
                thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_1.jpg",
                thumbnail_text: "全新A级车"
            },
            {
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp2.jpg",
                video_url: "//bs.baidu.com/adtest/13991dda3b6f6e29a0a74cd5b48733cc.flv",
                ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp2.jpg",
                width: 400,
                height: 250,
                is_play: true,
                thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_2.jpg",
                thumbnail_text: "C级轿车"
            },
            {
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp3.jpg",
                video_url: "//bs.baidu.com/adtest/bccbf3ecd905b1995a556edc4cf62970.flv",
                ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp3.jpg",
                width: 400,
                height: 250,
                is_play: true,
                thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_3.jpg",
                thumbnail_text: "E级轿车广告"
            },
            {
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp4.jpg",
                video_url: "//bs.baidu.com/adtest/4abddb2f20b255ffad6351cb84854aae.flv",
                ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp4.jpg",
                width: 400,
                height: 250,
                is_play: true,
                thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_4.jpg",
                thumbnail_text: "全新奔驰B级"
            },
            {
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp5.jpg",
                video_url: "//bs.baidu.com/adtest/46a9856a8a3b085856528a4fcbcf690a.flv",
                ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp5.jpg",
                width: 400,
                height: 250,
                is_play: true,
                thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_5.jpg",
                thumbnail_text: "M级越野车"
            },
            {
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp6.jpg",
                video_url: "//bs.baidu.com/adtest/c1fcaf94ed8ac5dab5cce93d639bed4f.flv",
                ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp6.jpg",
                width: 400,
                height: 250,
                is_play: true,
                thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_6.jpg",
                thumbnail_text: "AMG"
            }
        ]
    },
    //底部3个按钮
    'button_group' : {
        'options' : [
            {
                'text' : '奔驰展示厅',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '车型对比',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '奔驰社区',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '星睿二手车',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '预约试驾',
                'rcv_url' : 'http://www.baidu.com'
            }
        ]
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
