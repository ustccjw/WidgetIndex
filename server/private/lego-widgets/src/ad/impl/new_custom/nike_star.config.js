/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/nike_star.config.js ~ 2014/06/10 10:51:15
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * nike_star的配置数据
 **/

var AD_CONFIG = {
    "image_link": {
        // 'src' : '//bs.baidu.com/adtest/5ee2777b7f33bedcf8900207a101e8f9.jpg',
        'src' : '//bs.baidu.com/adtest/0c164c4931ad9bdafe8fd559a4285ae9.jpg',
        'tip': {
            'text': '&nbsp;',
            'rcv_url': 'http://www.baidu.com'
        }
    },
    "tab": {
        "interval_time": 500000000,
        "hover_time": 200,
        "default_index": 0,
        "width": 518,
        "li_margin": -1,
        "tab_con1": {
            'tab_title': '球星简介',
            'video': {
                'img_url': '//bs.baidu.com/adtest/338de575779c303afe8e25fa6440bd43.jpg',
                'video_url': '//bs.baidu.com/adtest/edfa39fb8b051690d3d7aa27fc12cc5a.flv',
                'width': 342,
                'height': 192,
                'is_play': false
            },
            'video_text': '克里斯蒂亚诺·罗纳尔多(简称C·罗纳尔多），葡萄牙足球运动员，现效力于西甲皇家马德里足球俱乐部，兼葡萄牙国家队队长。C罗带球速度极快，善于突破和射门，拥有强悍的身体素质，技术非常全面，是当今世界足坛最杰出球星之一。',
            'video_baike_link': 'http://www.sina.com',
            "baidu_share": {
                "cfg": {
                "true": {
                    "display": true,
                    "type": {
                        "tsina": true,
                        "tqq": true,
                        "weixin": true,
                        "renren": true
                    },
                    "common": {
                        "bdUrl": "http://langdong823.beijing-hyundai.com.cn/",
                        "bdDesc": "自定义分享摘要",
                        "bdText": "自定义分享内容",
                        "bdPic": "http://www.baidu.com/img/baidu_sylogo1.gif"
                    }
                }
                }
            }
        },
        "tab_con2": {
            'tab_title': '精彩瞬间',
            'videos': [
                {
                    'img_url': '//bs.baidu.com/adtest/b1eb1e2d351ef5fd0c49acd8e57e091d.jpg',
                    'video_url': '//bs.baidu.com/adtest/edfa39fb8b051690d3d7aa27fc12cc5a.flv',
                    "button_img_url": "//bs.baidu.com/adtest/c9ca66b083db04850145ede40dc9c73a.jpg",
                    "button_desc": "2010年进球锦集0",
                    'width': 342,
                    'height': 192,
                    'is_play': false
                },
                {
                    'img_url': '//bs.baidu.com/adtest/b1eb1e2d351ef5fd0c49acd8e57e091d.jpg',
                    'video_url': '//bs.baidu.com/lego-mat-offline/52212cca-9ef3-47d3-a50f-afb8c6e2fb04.flv',
                    "button_img_url": "//bs.baidu.com/adtest/c9ca66b083db04850145ede40dc9c73a.jpg",
                    "button_desc": "2010年进球锦集1",
                    'width': 342,
                    'height': 192,
                    'is_play': false
                },
                {
                    'img_url': '//bs.baidu.com/adtest/b1eb1e2d351ef5fd0c49acd8e57e091d.jpg',
                    'video_url': '//bs.baidu.com/lego-mat-offline/64c49039-543a-45b4-ab14-00106b8c0c74.flv',
                    "button_img_url": "//bs.baidu.com/adtest/c9ca66b083db04850145ede40dc9c73a.jpg",
                    "button_desc": "2010年进球锦集2",
                    'width': 342,
                    'height': 192,
                    'is_play': false
                }
            ],
            'roller': {
                "cell_height": 68,
                "cell_span": 4,
                "cell_size": 2,
                "disable": true
            },
            "baidu_share": {
                "cfg": {
                "true": {
                    "display": true,
                    "type": {
                        "tsina": true,
                        "tqq": true,
                        "weixin": true,
                        "renren": true
                    },
                    "common": {
                        "bdUrl": "http://langdong823.beijing-hyundai.com.cn/",
                        "bdDesc": "自定义分享摘要",
                        "bdText": "自定义分享内容",
                        "bdPic": "http://www.baidu.com/img/baidu_sylogo1.gif"
                    }
                }
                }
            }
        },
        "tab_con3": {
            'tab_title': '体育精神',
            'video': {
                'img_url': '//bs.baidu.com/adtest/b1eb1e2d351ef5fd0c49acd8e57e091d.jpg',//video首帧图
                'video_url': '//bs.baidu.com/adtest/edfa39fb8b051690d3d7aa27fc12cc5a.flv',
                'width': 342,
                'height': 192,
                'is_play': false
            },
            //横向活动大图 video首帧图应是包含在横向活动图的左侧内容，两图是完美融合。
            'video_image': {
                'src' : '//bs.baidu.com/adtest/98d536f0f29179141ded658a32fbcc0f.jpg',
                "rcv_url": 'http://www.baidu.com'
            },
            "baidu_share": {
                "cfg": {
                "true": {
                    "display": true,
                    "type": {
                        "tsina": true,
                        "tqq": true,
                        "weixin": true,
                        "renren": true
                    },
                    "common": {
                        "bdUrl": "http://langdong823.beijing-hyundai.com.cn/",
                        "bdDesc": "自定义分享摘要",
                        "bdText": "自定义分享内容",
                        "bdPic": "http://www.baidu.com/img/baidu_sylogo1.gif"
                    }
                }
                }
            }
        },
        "tab_con4": {
            'tab_title': '球星图片',
            'slider': {
                "cell_width": 518,
                "disable": true,
                "circle_width": 20,
                "cell": [
                    {
                        "img_url": "//bs.baidu.com/adtest/6c09ad05f9849faff60b1fec92d4dd28.jpg",
                        "desc": "用视频、照片记录下你#搏上一切#的瞬间，分享到新浪微博、腾讯微博、空间说说， #搏上一切#与NEYMAR一较高下。",
                        "img_rcv_url": 'http://www.baidu.com',
                        "text_rcv_url": 'http://www.sina.com'
                    },
                    {
                        "img_url": "//bs.baidu.com/adtest/6c09ad05f9849faff60b1fec92d4dd28.jpg",
                        "desc": "用视频、照片记录下你#搏上一切#的瞬间，分享到新浪微博、腾讯微博、空间说说， #搏上一切#与NEYMAR一较高下。",
                        "img_rcv_url": 'http://www.baidu.com',
                        "text_rcv_url": 'http://www.sina.com'
                    }
                ]
            },
            "baidu_share": {
                "cfg": {
                "true": {
                    "display": true,
                    "type": {
                        "tsina": true,
                        "tqq": true,
                        "weixin": true,
                        "renren": true
                    },
                    "common": {
                        "bdUrl": "http://langdong823.beijing-hyundai.com.cn/",
                        "bdDesc": "自定义分享摘要",
                        "bdText": "自定义分享内容",
                        "bdPic": "http://www.baidu.com/img/baidu_sylogo1.gif"
                    }
                }
                }
            }
        }
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
