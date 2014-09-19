/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/sprite.config.js ~ 2014/08/18 11:17:20
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * sprite的配置数据
 **/

var AD_CONFIG = {
    'title': {
        'title': 'kafellon<em>凯芙兰</em>官方网站',
        'rcv_url': 'http://kafellon.com',
        'display_official_site_icon': true
    },
    'left_video': {
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
    'right_buttons': {
        'options': [
            {
                'rcv_url': 'http://www.baigo.com/',
                'text': '按钮11111'
            },
            {
                'rcv_url': 'http://www.baigo.com/',
                'text': '按钮2'
            },
            {
                'rcv_url': 'http://www.baigo.com/',
                'text': '按钮3'
            },
            {
                'rcv_url': 'http://www.baigo.com/',
                'text': '按钮4'
            }
        ]
    },
    'tab_container': {
        'interval_time': 500000000,
        'hover_time': 200,
        'width': 528,
        'li_margin': 0,
        'li_border_width': 0,
        'default_index': 0,
        'options': [
            {
                'tab_title': '图片图片',
                'tab_type': {
                    'image': {
                        'image_url': "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/tab3.jpg",
                        'image_rcv_url': "http://weibo.com/"
                    }
                }
            },
            {
                'tab_title': '图片图片2',
                'tab_type': {
                    'image': {
                        'image_url': "http://ww1.sinaimg.cn/mw1024/6c0b2b63jw1ejgjtsgf2lj213c0m80wb.jpg",
                        'image_rcv_url': "http://t.qq.com/"
                    }
                }
            },
            {
                'tab_title': '微博微博',
                'tab_type': {
                    'weibo': {
                        'id': '1913410360',
                        'follow_imgsrc': '//bs.baidu.com/adtest/d29a0e9922c9986e478155ba2fe3a61b.jpg',
                        'verify_img': '//bs.baidu.com/adtest/fc29dbeea7be67da54a68e0f65fb3a50.gif',
                        'is_display_icon': false,
                        'weibo_context_length': 240
                    }
                }
            }
        ]
    },
    'float_layer': {
        "width": 830,
        "height": 400,
        "material_name": "ec-float-video-layer",
        "float_bg": {
            "src": "http://ecma.bdimg.com/adtest/21b1b4f4d9aa06a0af2ebc7a9c1e535e.jpg",
            "rcv_url": "http://www.baidu333.com"
        },
        "float_video": {
            "rcv_url": "http://www.baidu444.com",
            "img_url": "http://dummyimage.com/540x304",
            "video_url": "http://ecmc.bdimg.com/adtest/a86608372883a67cd47c35eb80b2c0b4.flv",
            "ipad_img": "",
            "width": 540,
            "height": 304,
            "is_play": "true",
            'player_ver': 7
        }
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
