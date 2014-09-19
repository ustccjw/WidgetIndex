/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/olay.config.js ~ 2014/08/11 15:09:31
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * olay的配置数据
 **/

var AD_CONFIG = {
    'title': {
        'title': 'kafellon<em>凯芙兰</em>官方网站',
        'rcv_url': 'http://kafellon.com',
        'display_official_site_icon': true
    },
    'slider' : {
        'width':254, //图片宽度
        'height':143, //图片高度
        'delay':200, //切换选择时的延时响应时间
        'interval_time':6000, //自动切换时间间隔 =0表示不自动切换
        'mode':'horizontal', //'mode':'vertical'|'horizontal'|'normal' 图片展示模式：垂直滚动、水平滚动、无动画效果
        'first_show_index':0, //首次载入的图片索引
        'options':[
            {
                'img_url':'http://eiv.baidu.com/mapm2/bjgov/120627_pl_01/11.jpg',
                'rcv_url':'www.baidu1.com'
            },
            {
                'img_url':'http://eiv.baidu.com/mapm2/bjgov/120627_pl_01/12.jpg',
                'rcv_url':'www.baidu2.com'
            },
            {
                'img_url':'http://eiv.baidu.com/mapm2/bjgov/120627_pl_01/13.jpg',
                'rcv_url':'www.baidu3.com'
            },
            {
                'img_url':'http://eiv.baidu.com/mapm2/bjgov/120627_pl_01/14.jpg',
                'rcv_url':'www.baidu4.com'
            }
        ]
    },
    "image_slide_show": {
        "img_src": "http://dummyimage.com/254x143/f0f0f0/0f0f0f",
        "options": [
            {"img_src": "http://dummyimage.com/254x143/f0f0f0/0f0f0f", "img_rcv_url": "http://t.baidu.com"},
            {"img_src": "http://dummyimage.com/254x143/e101f1/1f1f1f"},
            {"img_src": "http://dummyimage.com/254x143/a2b2f2/2f2f2f"},
            {"img_src": "http://dummyimage.com/254x143/c3d3f3/3f3f3f"},
            {"img_src": "http://dummyimage.com/254x143/d4e4f4/4f4f4f"}
        ]
    },
    'small_head': {
        'description_rcv_html': '<a href="http://baidu.com">凯芙兰</a>(kafellon)源自欧洲吧、啦吧啦吧吧啦,吧啦<a href="http://bai333du.com">吧啦吧</a>吧啦、吧啦吧吧啦吧啦吧，吧吧啦吧啦吧啦吧!',
        'site': 'www.dumex.com.cn/'
    },
    'right_buttons': {
        'options': [
            {
                'rcv_url': 'http://www.baigo.com/',
                'text': '按钮1'
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
        'width': 518,
        'li_margin': 0,
        'li_border_width': 0,
        'default_index': 0,
        'options': [
            {
                'tab_title': '“聚”天猫',
                'image': {
                    image_url: "//bs.baidu.com/adtest/9f79fe5b4b83bcf8aa455a60bf04888e.jpg",
                    image_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html"
                },
                'color_list': {
                    'color_names': ['dodgerblue', 'orange'],
                    'options': [
                        {
                            'type': 'sina',
                            'text': 'TiffanyAndCo蒂芙尼',
                            'rcv_url': '//www.baidu2.com'
                        },
                        {
                            'type': 'douban',
                            'text': 'Tiffany蒂芙尼',
                            'rcv_url': '//www.baidu2.com',
                            'desc': '蒂芙尼豆瓣小站'
                        }
                    ]
                }
            },
            {
                'tab_title': '唯品会',
                'image': {
                    image_url: "http://ww3.sinaimg.cn/bmiddle/69683730gw1ej8q1j0aivj20qo0f041p.jpg",
                    image_rcv_url: "http://guruguru.com"
                },
                'color_list': {
                    'color_names': ['dodgerblue', 'orange'],
                    'options': [
                        {
                            'text': 'OLAY新一代全能透白小滴管 超值折扣',
                            'rcv_url': '//www.baidu.com',
                            'desc': '送152刀超值礼品'
                        },
                        {
                            'text': '今夏散步，瞬间恢复水润白皙 惊喜优惠',
                            'rcv_url': '//www.baidu.gov.cn',
                            'desc': '规模投资进行优惠折扣'
                        }
                    ]
                }
            },
            {
                'tab_title': '乐峰',
                'image': {
                    image_url: "http://ww1.sinaimg.cn/bmiddle/bd9d4219jw1ej8mtj4q0bj20h809pt8o.jpg",
                    image_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html"
                },
                'color_list': {
                    'color_names': ['dodgerblue', 'orange'],
                    'options': [
                        {
                            'type': 'sina',
                            'text': '大傻瓜的是佛挡杀佛大蛇丸',
                            'rcv_url': '//www.baidu2.com',
                            'desc': '蒂芙尼官方新浪微博'
                        },
                        {
                            'type': 'douban',
                            'text': '剖婆婆你吃V之U而为',
                            'rcv_url': '//www.baidu2.com',
                            'desc': '蒂芙尼豆瓣小站'
                        }
                    ]
                }
            },
            {
                'tab_title': '聚美优品',
                'image': {
                    image_url: "http://ww3.sinaimg.cn/bmiddle/799a3a88jw1ej8obuwbv3j20go0chgn6.jpg",
                    image_rcv_url: "http://guruguru.com"
                },
                'color_list': {
                    'color_names': ['dodgerblue', 'orange'],
                    'options': [
                        {
                            'text': 'OLAY新一代全能透白小滴管 超值折扣',
                            'rcv_url': '//www.baidu.com',
                            'desc': '送152刀超值礼品'
                        },
                        {
                            'text': '今夏散步，瞬间恢复水润白皙 惊喜优惠',
                            'rcv_url': '//www.baidu.gov.cn',
                            'desc': '规模投资进行优惠折扣'
                        }
                    ]
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
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
