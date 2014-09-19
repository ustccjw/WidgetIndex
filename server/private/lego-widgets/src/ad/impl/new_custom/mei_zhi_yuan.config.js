/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: guolinaiyou.config.js 150523 2013-06-05 14:06:00Z  fanxueliang$
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/mei_zhi_yuan.config.js ~ 2014/07/21 10:55:52
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * coca2的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-8964",
    "hmjs_id": "1234567",
    "main_url": "http://www.baidu.com",
    "title": {
        "title": "<em>NIKE</em>-活出你的伟大",
        "rcv_url": "http://www.baidu.com",
        "display_official_site_icon": true,
        "logoimg": {
            "logoimg": "http://dummyimage.com/110x15",
            "logo_rcv_url": "http://www.baidu.com"
        }
    },
    "video": {
        "player_ver": 7,
        'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
        'img_url' : 'http://dummyimage.com/254x144',
        'video_url' : 'http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv',
        'ipad_img': 'http://dummyimage.com/254x144',
        'width': 254,
        'height': 143
    },
    'head' : {
        'description_rcv_html' : '可口可乐，全球著名软饮料品牌，目前在206个国家均有销售。传递快乐，分享畅爽时刻始终是可口可乐品牌核心理念。',
        "query": [
            {
                "key_word": "传递快乐",
                "rcv_url": "http://www.baidu.com"
            }
        ],
        'site' : 'http://happy.icoke.cn'
    },
    'products': {
        'width': 78,
        'height': 59,
        'options' : [
            {
                'img_url': 'http://dummyimage.com/78x59',
                'text': '草莓味',
                "click_behavior": {
                    "url": {
                        "rcv_url": "http://www.baidu1111.com"
                    }
                }
            },
            {
                'img_url': 'http://dummyimage.com/78x59',
                'text': '酸奶味',
                "click_behavior": {
                    "layer": {
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
                }
            },
            {
                'img_url': 'http://dummyimage.com/78x59',
                'text': '少女味',
                "click_behavior": {
                    "url": {
                        "rcv_url": "http://www.baidu222.com"
                    }
                }
            }
        ]
    },
    'image': {
        'image_url': 'http://dummyimage.com/528x140'
    },
    'app': {
        is_flashvars: false,
        width: 538,
        height: 337,
        wmode: "transparent",
        src: "//bs.baidu.com/adtest/71a385d27e433e1b7aadaf3396418fc5.swf"
    }
};
