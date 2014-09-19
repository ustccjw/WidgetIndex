/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: hlhome.config.js  2012/08/06 10:25:19Z dingguoliang01 $
 *
 **************************************************************************/


/**
 * src/ad/hlhome.config.js ~ 2012/08/06 12:14:49
 * @author dingguoliang01
 * @version $Revision $
 * @description
 * 演示用的配置项.
 **/

var AD_CONFIG = {
    "title": {
        "rcv_url": "http://hello.com",
        "title": "<em>海澜之家</em>中国官方首页",
        "display_official_site_icon": true
    },

    "video": {
        "player_ver": 7,
        "rcv_url": "http://www.baidu.com",
        "img_url": "http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg",
        "video_url": "http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv",
        "video_url": "http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv",
        "width": 255,
        "height": 144
    },
    "smallhead": {
        "description_rcv_html": "海澜之家一高品质，中低加我为市场定位，款式多，瓶中犬的货品选择，无干扰‘一站式’选购方式被称为‘男人的衣柜。",
        "site": "www.baidu.com",
        "query": [
            {
                "key_word": "海澜之家",
                "rcv_url": "www.baidu.com"
            }
        ]
    },
    "products": {
        'width': 78,
        'height': 59,
        'display_play_button': true,
        'display_video_icon': false,
        'display_playing_tip': false,
        'options': [
            {
                'img_url': "http://dummyimage.com/78x59",
                'text': "乐看群星"
            },
            {
                'img_url': "http://dummyimage.com/78x59",
                'text': "乐看群星"
            },
            {
                'img_url': "http://dummyimage.com/78x59",
                'text': "乐看群星"
            }
        ]
    },
    "tabs": {
        "interval_time": 400000,
        "hover_time": 200,
        "default_index": 1,
        "width": 518,
        "options": [
            {
                "tab_title": "2012款ix35",
                "tab_type": {
                    "image": {
                        "image_url": "http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg",
                        "image_rcv_url": "http://www.baidu.com"
                    }
                }
            },
            {
                "tab_title": "索纳塔八",
                "tab_type": {
                    "image_cartoon": {
                        "disable": false, //有时候需求不需要启用动画
                        "image_width": 122,
                        "image_margin": 10,
                        "options": [
                            {
                                "imgsrc": "http://dummyimage.com/122x103/000/fff&text=1",
                                "imgurl_rcv_url": "http://www.baidu.com"/*,
                             "linktext" : "最新资讯"*/
                            },
                            {
                                "imgsrc": "http://dummyimage.com/122x103/fff/000&text=2",
                                "imgurl_rcv_url": "http://www.baidu.com"/*,
                             "linktext" : "最新动画"*/
                            },
                            {
                                "imgsrc": "http://dummyimage.com/122x103/eee/bbb&text=3",
                                "imgurl_rcv_url": "http://www.baidu.com"/*,
                             "linktext" : "新品上市"*/
                            },
                            {
                                "imgsrc": "http://dummyimage.com/122x103/bbb/eee&text=4",
                                "imgurl_rcv_url": "http://www.baidu.com"/*,
                             "linktext" : "专卖店"*/
                            },
                            {
                                "imgsrc": "http://dummyimage.com/122x103/aaa/bbb&text=5",
                                "imgurl_rcv_url": "http://www.baidu.com"/*,
                             "linktext" : "直击秀场"*/
                            }
                        ],
                        "left_arrow": "//bs.baidu.com/adtest/image_cartoon/left.png",
                        "right_arrow": "//bs.baidu.com/adtest/image_cartoon/right.png"
                    }
                }
            },
            {
                "tab_title": "瑞纳",
                "tab_type": {
                    "select": {
                        "datasource_url": "//bs.baidu.com/adtest/5192734a5289c52f6f413e843d257fda.js"
                    }
                }
            },
            {
                "tab_title": "途胜",
                "tab_type": {
                    "image": {
                        "image_url": "http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg",
                        "image_rcv_url": "http://www.baidu.com"
                    }
                }
            }
        ]
    },
    "fwc": {
        "width": 830,
        "height": 400,
        "float_bg": {
            "src": "http://dummyimage.com/830x400",
            "rcv_url": "http://www.baidu.com"
        },
        options: [
            {
                "player_ver": 7,
                "rcv_url": "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                "img_url": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg",
                "video_url": "//bs.baidu.com/adtest/dfa4e34237dac53296931da8d610347f.flv",
                "ipad_img": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg",
                "width": 424,
                "height": 240,
                "is_play": true,
                "thumbnail_img_url": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_1.jpg",
                "thumbnail_text": "全新A级车"
            },
            {
                "player_ver": 7,
                "rcv_url": "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                "img_url": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp2.jpg",
                "video_url": "//bs.baidu.com/adtest/13991dda3b6f6e29a0a74cd5b48733cc.flv",
                "ipad_img": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp2.jpg",
                "width": 424,
                "height": 240,
                "is_play": true,
                "thumbnail_img_url": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_2.jpg",
                "thumbnail_text": "C级轿车"
            },
            {
                "player_ver": 7,
                "rcv_url": "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                "img_url": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp3.jpg",
                "video_url": "//bs.baidu.com/adtest/bccbf3ecd905b1995a556edc4cf62970.flv",
                "ipad_img": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp3.jpg",
                "width": 424,
                "height": 240,
                "is_play": true,
                "thumbnail_img_url": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_3.jpg",
                "thumbnail_text": "E级轿车广告"
            },
            {
                "player_ver": 7,
                "rcv_url": "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                "img_url": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp4.jpg",
                "video_url": "//bs.baidu.com/adtest/4abddb2f20b255ffad6351cb84854aae.flv",
                "ipad_img": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp4.jpg",
                "width": 424,
                "height": 240,
                "is_play": true,
                "thumbnail_img_url": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_4.jpg",
                "thumbnail_text": "全新奔驰B级"
            },
            {
                "player_ver": 7,
                "rcv_url": "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                "img_url": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp5.jpg",
                "video_url": "//bs.baidu.com/adtest/46a9856a8a3b085856528a4fcbcf690a.flv",
                "ipad_img": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp5.jpg",
                "width": 424,
                "height": 240,
                "is_play": true,
                "thumbnail_img_url": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_5.jpg",
                "thumbnail_text": "M级越野车"
            },
            {
                "player_ver": 7,
                "rcv_url": "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                "img_url": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp6.jpg",
                "video_url": "//bs.baidu.com/adtest/c1fcaf94ed8ac5dab5cce93d639bed4f.flv",
                "ipad_img": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp6.jpg",
                "width": 424,
                "height": 240,
                "is_play": true,
                "thumbnail_img_url": "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_6.jpg",
                "thumbnail_text": "AMG"
            }
        ]
    }
};


/* vim: set ts=4 sw=4 sts=4 tw=100: */
