/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/bentley.config.js ~ 2014/03/26 10:57:27
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * bentley的配置数据
 **/

var AD_CONFIG = {
    'main_url': 'http://www.baidu.com',
    'title': {
        'rcv_url': 'http://hello.com',
        'title': '<em>Test</em>中国官方首页',
        'display_official_site_icon': true
    },
    'left_video_img': {
        'options': {
            // 'image': {
            //     'image_url': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
            //     'image_rcv_url': 'http://www.baidu.com/'
            // }
            'video': {
                'rcv_url': 'http://baidu-left-video.com',
                'img_url': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
                'video_url': 'http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv',
                'ipad_img': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
                'player_ver': 7,
                'width': 254,
                'is_play': false,
                'height': 143
            }
        }
    },
    'right_description': {
        'description_rcv_html': '宾利汽车公司（Bentley Motors Limited）是举世闻名的豪华汽车制造商，总部位于英国<a target="_blank" href="/view/3418849.htm">克鲁</a>。1919年1月18日',
        'site': 'www.bentley.com.cn'
    },
    'right_video_thunb': {
        'options': [{
            'display_playing_tip': true,
            'img_url': 'http://eiv.baidu.com/mapm2/benchi/130507_pl_01/1.jpg',
            'text': 'C 260时尚型',
            'display_play_button': true,
            'play_btn_text': '播放'
        }, {
            'display_playing_tip': true,
            'img_url': 'http://eiv.baidu.com/mapm2/benchi/130507_pl_01/2.jpg',
            'text': 'C 280时尚型',
            'display_play_button': true,
            'play_btn_text': '播放'
        }, {
            'display_playing_tip': true,
            'img_url': 'http://eiv.baidu.com/mapm2/benchi/130507_pl_01/3.jpg',
            'text': 'E 260时尚型',
            'display_play_button': true,
            'play_btn_text': '播放'
        }]
    },
    'first_tab': {
        'tab_title': '预约试驾',
        'picture': {
            'options': [{
                'img_url': 'http://dummyimage.com/255x96',
                'text': '查看经销商地址',
                'display_play_button': true,
                'play_btn_text': '查看地图',
                'display_playing_tip': false
            }]
        },
        'iframe': {
            'src': 'http://eiv.baidu.com/mapm2/jiejing/bentley/index.html',
            'transparent': true,
            'width': 250,
            'height': 96
        },
        'buttons': {
            'options': [{
                'rcv_url': 'http://baidu-test-1.com',
                'text': '驾驶培训'
            }, {
                'rcv_url': 'http://baidu-test-2.com',
                'text': '经销商查询'
            }, {
                'rcv_url': 'http://baidu-test-3.com',
                'text': 'xxxxxxxxx'
            }, {
                'rcv_url': 'http://baidu-test-4.com',
                'text': 'aaaaaaaaaa'
            }, {
                'rcv_url': 'http://baidu-test-5.com',
                'text': 'DDDDDDDDDDD'
            }]
        }
    },
    'tab': {
        'interval_time': 500000000,
        'hover_time': 200,
        'width': 524,
        'li_margin': 0,
        'default_index': 0,
        'options': [{
            'tab_title': "奔驰A级水电费地方水电费",
            'img_rcv_url': 'http://baidu33.com',
            'img_src': 'http://dummyimage.com/255x96',
            'description': "2017款C级轿车，更耀眼的外观，更澎湃的动力，令你尽情挥洒驾驭激情。",
            'desc_rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
            'options': [{
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 180经典型"
            }, {
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 260优雅型"
            }, {
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 26s0时尚型"
            }, {
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 300时尚型"
            }],
            'buttons': {
                'options': [{
                    'rcv_url': 'http://baidu-test-1.com',
                    'text': '驾驶培训'
                }, {
                    'rcv_url': 'http://baidu-test-2.com',
                    'text': '经销商查询'
                }, {
                    'rcv_url': 'http://baidu-test-3.com',
                    'text': 'xxxxxxxxxx'
                }, {
                    'rcv_url': 'http://baidu-test-4.com',
                    'text': 'aaaa'
                }, {
                    'rcv_url': 'http://baidu-test-5.com',
                    'text': 'DDDDDDDD'
                }]
            }
        }, {
            'tab_title': "A级水电费地方水电费",
            'img_rcv_url': 'http://baidu33.com',
            'img_src': 'http://dummyimage.com/255x96',
            'description': "2017款C级轿车，更耀眼的外观，更澎湃的动力，令你尽情挥洒驾驭激情。",
            'desc_rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
            'options': [{
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 180经典型"
            }, {
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 260优雅型"
            }, {
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 26s0时尚型"
            }, {
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 300时尚型"
            }],
            'buttons': {
                'options': [{
                    'rcv_url': 'http://baidu-test-1.com',
                    'text': '驾驶培训'
                }, {
                    'rcv_url': 'http://baidu-test-2.com',
                    'text': '经销商查询'
                }, {
                    'rcv_url': 'http://baidu-test-3.com',
                    'text': 'xxxxxxxx'
                }, {
                    'rcv_url': 'http://baidu-test-4.com',
                    'text': 'aaaaaaaaaa'
                }, {
                    'rcv_url': 'http://baidu-test-5.com',
                    'text': 'DDDDDDDDDDD'
                }]
            }
        }, {
            'tab_title': "奔驰A级水电费地方水",
            'img_rcv_url': 'http://baidu33.com',
            'img_src': 'http://dummyimage.com/255x96',
            'description': "2017款C级轿车，更耀眼的外观，更澎湃的动力，令你尽情挥洒驾驭激情。",
            'desc_rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
            'options': [{
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 180经典型"
            }, {
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 260优雅型"
            }, {
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 26s0时尚型"
            }, {
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 300时尚型"
            }],
            'buttons': {
                'options': [{
                    'rcv_url': 'http://baidu-test-1.com',
                    'text': '驾驶培训'
                }, {
                    'rcv_url': 'http://baidu-test-2.com',
                    'text': '经销商查询'
                }, {
                    'rcv_url': 'http://baidu-test-3.com',
                    'text': 'xxxxxxxxx'
                }, {
                    'rcv_url': 'http://baidu-test-4.com',
                    'text': 'aaaaaaaaaa'
                }, {
                    'rcv_url': 'http://baidu-test-5.com',
                    'text': 'DDDDDDDDDDD'
                }]
            }
        }, {
            'tab_title': "奔驰A级水电费",
            'img_rcv_url': 'http://baidu33.com',
            'img_src': 'http://dummyimage.com/255x96',
            'description': "2017款C级轿车，更耀眼的外观，更澎湃的动力，令你尽情挥洒驾驭激情。",
            'desc_rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
            'options': [{
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 180经典型"
            }, {
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 260优雅型"
            }, {
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 26s0时尚型"
            }, {
                'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                'text': "C 300时尚型"
            }],
            'buttons': {
                'options': [{
                    'rcv_url': 'http://baidu-test-1.com',
                    'text': '驾驶培训'
                }, {
                    'rcv_url': 'http://baidu-test-2.com',
                    'text': '经销商查询'
                }, {
                    'rcv_url': 'http://baidu-test-3.com',
                    'text': 'xxxxxxxxxxxxxxx'
                }, {
                    'rcv_url': 'http://baidu-test-4.com',
                    'text': 'aaaaaaaaaa'
                }, {
                    'rcv_url': 'http://baidu-test-5.com',
                    'text': 'DDDDDDDDDDD'
                }]
            }
        }]
    },
    'fwc': [{
        'width': 830,
        'height': 400,
        'display_bg_iframe': true,
        'float_bg': {
            'src': "http://eiv.baidu.com/mapm2/benchi/130520_pl_01/bg.jpg",
            'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAN0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html"
        },
        'video': {
            'rcv_url': "http://baidu111.com",
            'img_url': "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg",
            'video_url': "//bs.baidu.com/adtest/dfa4e34237dac53296931da8d610347f.flv",
            'ipad_img': "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg",
            'width': 540,
            'height': 304,
            'is_play': true,
            'player_ver': 7,
            'thumbnail_img_url': "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_1.jpg",
            'thumbnail_text': "全新A级车"
        }
    }, {
        'width': 830,
        'height': 400,
        'display_bg_iframe': true,
        'float_bg': {
            'src': "http://eiv.baidu.com/mapm2/benchi/130520_pl_01/bg.jpg",
            'rcv_url': "http://hahah.com"
        },
        'video': {
            'rcv_url': "http://gggg.com",
            'img_url': "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp2.jpg",
            'video_url': "//bs.baidu.com/adtest/13991dda3b6f6e29a0a74cd5b48733cc.flv",
            'ipad_img': "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp2.jpg",
            'width': 540,
            'height': 304,
            'is_play': false,
            'player_ver': 7,
            'thumbnail_img_url': "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_2.jpg",
            'thumbnail_text': "C级轿车"
        }
    }, {
        'width': 830,
        'height': 400,
        'display_bg_iframe': true,
        'float_bg': {
            'src': "http://eiv.baidu.com/mapm2/benchi/130520_pl_01/bg.jpg",
            'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAN0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html"
        },
        'video': {
            'rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            'img_url': "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp6.jpg",
            'video_url': "//bs.baidu.com/adtest/c1fcaf94ed8ac5dab5cce93d639bed4f.flv",
            'ipad_img': "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp6.jpg",
            'width': 540,
            'height': 304,
            'is_play': true,
            'player_ver': 7,
            'thumbnail_img_url': "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_6.jpg",
            'thumbnail_text': "AMG"
        }
    }],
    'fwc_map': {
        'is_display': true,
        'display_bg_iframe': true,
        'width': 580,
        'height': 400
    },
    'baidu_map': {
        'province_city': {
            "datasource_url": '//bs.baidu.com/adtest/13490017039f27dcee5104c6ba82a9eb.js',
            'dependency': [{
                'name': "province"
            }, {
                'name': "city"
            }]
        },
        'map': {
            'icon': {
                'url': "//bs.baidu.com/adtest/da794cb8f157ea06bd9cef9f083e76d6.png",
                'width': 46,
                'height': 45
            },
            'datasource_url': '//bs.baidu.com/adtest/99f56eed09f2dfa98f794e2b2e93267b.js'
        }
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */