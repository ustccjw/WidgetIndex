/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: skoda.config.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/skoda.config.js ~ 2013/10/30 14:23:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * case1179的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-nike131126", 
    "main_url": "http://www.baidu.com",
    "title": {
        "title": "<em>NIKE</em>-活出你的伟大",
        "rcv_url": "http://www.baidu.com",
        "display_official_site_icon": true
    },
    "video": {
        "player_ver": 7,
        "width": 254,
        "height": 143,
        "video_url": "http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv",
        "img_url": "http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg"
    },
    "small_head": {
        "description_rcv_html" : "美汁源人人爱果粒，全国对对碰隆重登场，支持你的地区！全国对对碰隆重登场，支持你的地区！",
        "site" : "www.BAIDU.com.cn"
    },
    "products": {
        'width': 78, 
        'height': 59,
        'display_play_button': true,
        'display_video_icon': false,
        'display_playing_tip': false,
        'options': [
            {
                'img_url': "http://dummyimage.com/78x59"
            },
            {
                'img_url': "http://dummyimage.com/78x59"
            },
            {
                'img_url': "http://dummyimage.com/78x59"
            }
        ]
    },
    "tab": {
        "interval_time": 50000000,
        "hover_time": 200,
        "default_index": 0,
        "width": 530,
        "li_margin": 0,
        "li_border_width": 0,
        "options": [
            {   
                "tab_title": "林肯之道",
                "tab_content": {
                    "tab_cont": {
                        "img_rcv_url": "http://www.baidu.com/?z=img_rcv_url",
                        "img_src": "http://dummyimage.com/255x96/000/ffff00",
                        "desc_rcv_url": "http://www.baidu.com/?z=desc_rcv_url",
                        "description": "新BMW316I，为您全新呈现可望可及的豪华运动型轿车，将活的对应购置税支持。",
                        "options": [
                            {
                                "rcv_url": "http://www.baidu.com/?list=1",
                                "text": "预约试驾"
                            },
                            {
                                "rcv_url": "http://www.baidu.com/?list=2",
                                "text": "宝马金融"
                            },
                            {
                                "rcv_url": "http://www.baidu.com/?list=1",
                                "text": "预约试驾"
                            },
                            {
                                "rcv_url": "http://www.baidu.com/?list=2",
                                "text": "宝马金融"
                            }
                        ]
                    }
                }
            },
            {
                "tab_title": "最新产品",
                "tab_content": {
                    "image_cartoon": {
                        'image_width': 121,
                        'image_margin': 11,
                        'options' : [
                            {
                                'imgsrc' : '//bs.baidu.com/adtest/01e608e3580208d70ca93e62acb9a308.jpg',
                                'imgurl_rcv_url' : 'http://www.baidu.com',
                                "linktext": "时尚配饰"
                            }, {
                                'imgsrc' : '//bs.baidu.com/adtest/81a38d54df8a3f6f38c1cf892be032e3.jpg',
                                'imgurl_rcv_url' : 'http://www.baidu.com',
                                "linktext": "时尚配饰"
                            }, {
                                'imgsrc' : '//bs.baidu.com/adtest/01e608e3580208d70ca93e62acb9a308.jpg',
                                'imgurl_rcv_url' : 'http://www.baidu.com',
                                "linktext": "时尚配饰"
                            }, {
                                'imgsrc' : '//bs.baidu.com/adtest/81a38d54df8a3f6f38c1cf892be032e3.jpg',
                                'imgurl_rcv_url' : 'http://www.baidu.com',
                                "linktext": "时尚配饰"
                            },{
                                'imgsrc' : '//bs.baidu.com/adtest/01e608e3580208d70ca93e62acb9a308.jpg',
                                'imgurl_rcv_url' : 'http://www.baidu.com',
                                "linktext": "时尚配饰"
                            }, {
                                'imgsrc' : '//bs.baidu.com/adtest/81a38d54df8a3f6f38c1cf892be032e3.jpg',
                                'imgurl_rcv_url' : 'http://www.baidu.com',
                                "linktext": "时尚配饰"
                            }
                        ],
                        'left_arrow' : '//bs.baidu.com/adtest/fbc8e6718f410ac84ce37a01e0470f7f.png',
                        'right_arrow' : '//bs.baidu.com/adtest/f5320b7724569a26fb6a7741a931368a.png'
                    }
                }
            },{
                "tab_title": "林肯之道",
                "tab_content": {
                    "tab_form": {
                        "width": 255,
                        "height": 96,
                        "src": "//bs.baidu.com/public01/2014-06-11/skoda/index.html",
                        "image": "http://dummyimage.com/255x96",
                        "image_rcv_url": "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAQ0&ro=sm2&ae=1000440&rt=2&o=https://contact.mercedes-benz.com.cn/testdrive/?lan=zh"
                    }
                }
            }
        ]
    },
    "buttons": {
        'options' : [
            {
                'text' : '优蕴力',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '优化力',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '优抗力',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '优创力',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '优备力',
                'rcv_url' : 'http://www.baidu.com'
            }
        ]
    },
    "fwc": {
        "width": 830,
        "height": 400,
        'float_bg': {
            'src': "http://dummyimage.com/830x400",
            'rcv_url': "http://www.baidu.com"
        },
        options: [
            {
                "player_ver": 7,
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg",
                video_url: "//bs.baidu.com/adtest/dfa4e34237dac53296931da8d610347f.flv",
                ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg",
                width: 540,
                height: 304,
                is_play: true,
                thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_1.jpg",
                thumbnail_text: "全新A级车"
            },
            {
                "player_ver": 7,
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp2.jpg",
                video_url: "//bs.baidu.com/adtest/13991dda3b6f6e29a0a74cd5b48733cc.flv",
                ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp2.jpg",
                width: 540,
                height: 304,
                is_play: true,
                thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_2.jpg",
                thumbnail_text: "C级轿车"
            },
            {
                "player_ver": 7,
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp3.jpg",
                video_url: "//bs.baidu.com/adtest/bccbf3ecd905b1995a556edc4cf62970.flv",
                ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp3.jpg",
                width: 540,
                height: 304,
                is_play: true,
                thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_3.jpg",
                thumbnail_text: "E级轿车广告"
            },
            {
                "player_ver": 7,
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp4.jpg",
                video_url: "//bs.baidu.com/adtest/4abddb2f20b255ffad6351cb84854aae.flv",
                ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp4.jpg",
                width: 540,
                height: 304,
                is_play: true,
                thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_4.jpg",
                thumbnail_text: "全新奔驰B级"
            },
            {
                "player_ver": 7,
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp3.jpg",
                video_url: "//bs.baidu.com/adtest/bccbf3ecd905b1995a556edc4cf62970.flv",
                ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp3.jpg",
                width: 540,
                height: 304,
                is_play: true,
                thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_3.jpg",
                thumbnail_text: "E级轿车广告"
            },
            {
                "player_ver": 7,
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
                img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp4.jpg",
                video_url: "//bs.baidu.com/adtest/4abddb2f20b255ffad6351cb84854aae.flv",
                ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp4.jpg",
                width: 540,
                height: 304,
                is_play: true,
                thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_4.jpg",
                thumbnail_text: "全新奔驰B级"
            }
        ]
    }
};





/* vim: set ts=4 sw=4 sts=4 tw=100: */
