/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/lexus.config.js ~ 2014/07/25 14:40:05
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * lexus的配置数据
 **/

var AD_CONFIG = {
    'title': {
        'title': 'kafellon<em>凯芙兰</em>官方网站',
        'rcv_url': 'http://kafellon.com',
        'display_official_site_icon': true
    },
    'left_video': {
        // 'rcv_url' : 'http://baidu.com',
        'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
        'video_url' : 'http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv',
        'ipad_img': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
        'player_ver': 7,
        'width':254,
        'height':144,
        'is_play': false
    },
    'small_head': {
        'description_rcv_html': '<a href="http://baidu.com">凯芙兰</a>(kafellon)源自欧洲吧、啦吧啦吧吧啦,吧啦<a href="http://bai333du.com">吧啦吧</a>吧啦、吧啦吧吧啦吧啦吧，吧吧啦吧啦吧啦吧啦吧，吧吧啦吧啦！',
        'site': 'www.dumex.com.cn/'
    },
    'right_images': {
        'width': 78,
        'height': 59,
        'options': [
            {
                'img_url': 'http://eiv.baidu.com/mapm2/benchi/130507_pl_01/1.jpg'
            }, {
                'img_url': 'http://eiv.baidu.com/mapm2/benchi/130507_pl_01/2.jpg'
            }, {
                'img_url': 'http://eiv.baidu.com/mapm2/benchi/130507_pl_01/3.jpg'
            }
        ]
    },
    'tab_container': {
        'interval_time': 500000000,
        'hover_time': 200,
        'width': 518,
        'li_margin': 0,
        'li_border_width': 0,
        'default_index': 0,
        'options': [
            {
                'tab_title': '彩妆',
                'image': {
                    'image_url': "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/tab3.jpg",
                    'image_rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/"
                },
                'tab_type': {
                    'form': {
                        width: 255,
                        height: 96,
                        transparent: true,
                        src: "http://bs.baidu.com/adtest/276b77136ebc2b9a13cc5ff1caa66ed7.html"
                    }
                }
            },
            {
                'tab_title': '热销榜单',
                'image': {
                    image_url: "http://eiv.baidu.com/mapm2/benchi/130515_pl_01/tab4.jpg",
                    image_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html"
                },
                'tab_type': {
                    'cont': {
                        'description': {
                            rcv_html: "2013款C级轿车，更耀眼的外观，更澎湃的动力，令你尽情挥洒驾驭激情。",
                            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/"
                        },
                        'type_links': {
                            'options': [{
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 180经典型"
                            }, {
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 260优雅型"
                            }, {
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 260时尚型"
                            }, {
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 300时尚型"
                            }]
                        }
                    }
                }
            },
            {
                'tab_title': '底妆专家',
                'image': {
                    image_url: "http://eiv.baidu.com/mapm2/benchi/130515_pl_01/tab5.jpg",
                    image_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html"
                },
                'tab_type': {
                    'cont': {
                        'description': {
                            rcv_html: "2013款C级轿车，更耀眼的外观，更澎湃的动力，令你尽情挥洒驾驭激情。",
                            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/"
                        },
                        'type_links': {
                            'options': [{
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 180经典型"
                            }, {
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 260优雅型"
                            }, {
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 260时尚型"
                            }, {
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 300时尚型"
                            }]
                        }
                    }
                }
            },
            {
                'tab_title': '热销榜单',
                'image': {
                    image_url: "http://eiv.baidu.com/mapm2/benchi/130515_pl_01/tab4.jpg",
                    image_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html"
                },
                'tab_type': {
                    'cont': {
                        'description': {
                            rcv_html: "2013款C级轿车，更耀眼的外观，更澎湃的动力，令你尽情挥洒驾驭激情。",
                            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/"
                        },
                        'type_links': {
                            'options': [{
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 180经典型"
                            }, {
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 260优雅型"
                            }, {
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 260时尚型"
                            }, {
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 300时尚型"
                            }]
                        }
                    }
                }
            },
            {
                'tab_title': '底妆专家',
                'image': {
                    image_url: "http://eiv.baidu.com/mapm2/benchi/130515_pl_01/tab5.jpg",
                    image_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html"
                },
                'tab_type': {
                    'cont': {
                        'description': {
                            rcv_html: "2013款C级轿车，更耀眼的外观，更澎湃的动力，令你尽情挥洒驾驭激情。",
                            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/"
                        },
                        'type_links': {
                            'options': [{
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 180经典型"
                            }, {
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 260优雅型"
                            }, {
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 260时尚型"
                            }, {
                                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                                title: "C 300时尚型"
                            }]
                        }
                    }
                }
            }
        ]
    },
    'bottom_buttons': {
        'options': [
            {
                'rcv_url': 'http://baidu.cfdom',
                'text': '甜蜜弹润唇'
            },
            {
                'rcv_url': 'http://basafdidu.com',
                'text': '修护BB霜'
            },
            {
                'rcv_url': 'http://baidusafd.com',
                'text': '无瑕BB霜'
            },
            {
                'rcv_url': 'http://baasfidu.com',
                'text': '防护隔离霜'
            },
            {
                'rcv_url': 'http://bdfsaidu.com',
                'text': '天欢迎彩'
            }
        ]
    },
    'float_video': {
        width: 830,
        height: 400,
        display_bg_iframe: true,
        float_bg: {
            src: "//bs.baidu.com/adtest/9f79fe5b4b83bcf8aa455a60bf04888e.jpg",
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAN0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html"
        },
        options: [{
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg",
            video_url: "//bs.baidu.com/adtest/dfa4e34237dac53296931da8d610347f.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg",
            width: 540,
            height: 304,
            is_play: true,
            'player_ver': 7,
            thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_1.jpg",
            thumbnail_text: "全新A级车"
        }, {
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp2.jpg",
            video_url: "//bs.baidu.com/adtest/13991dda3b6f6e29a0a74cd5b48733cc.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp2.jpg",
            width: 540,
            height: 304,
            is_play: true,
            'player_ver': 7,
            thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_2.jpg",
            thumbnail_text: "C级轿车"
        }, {
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp3.jpg",
            video_url: "//bs.baidu.com/adtest/bccbf3ecd905b1995a556edc4cf62970.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp3.jpg",
            width: 540,
            height: 304,
            is_play: true,
            'player_ver': 7,
            thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_3.jpg",
            thumbnail_text: "E级轿车广告"
        }, {
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp4.jpg",
            video_url: "//bs.baidu.com/adtest/4abddb2f20b255ffad6351cb84854aae.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp4.jpg",
            width: 540,
            height: 304,
            is_play: true,
            'player_ver': 7,
            thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_4.jpg",
            thumbnail_text: "全新奔驰B级"
        }, {
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp5.jpg",
            video_url: "//bs.baidu.com/adtest/46a9856a8a3b085856528a4fcbcf690a.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp5.jpg",
            width: 540,
            height: 304,
            is_play: true,
            'player_ver': 7,
            thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_5.jpg",
            thumbnail_text: "M级越野车"
        }, {
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp6.jpg",
            video_url: "//bs.baidu.com/adtest/c1fcaf94ed8ac5dab5cce93d639bed4f.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp6.jpg",
            width: 540,
            height: 304,
            is_play: true,
            'player_ver': 7,
            thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_6.jpg",
            thumbnail_text: "AMG"
        }]
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
