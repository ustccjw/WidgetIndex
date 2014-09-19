/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/tiffany.config.js ~ 2014/07/30 14:08:40
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * tiffany的配置数据
 **/

var AD_CONFIG = {
    'title': {
        'title': 'kafellon<em>凯芙兰</em>官方网站',
        'rcv_url': 'http://kafellon.com',
        'display_official_site_icon': true
    },
    'slider' : {
        'width':254, //图片宽度
        'height':144, //图片高度
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
    'small_head': {
        'description_rcv_html': '<a href="http://baidu.com">凯芙兰</a>(kafellon)源自欧洲吧、啦吧啦吧吧啦,吧啦<a href="http://bai333du.com">吧啦吧</a>吧啦、吧啦吧吧啦吧啦吧，吧吧啦吧啦吧啦吧啦吧，吧吧啦吧啦！<a href="http://baidu.com">凯芙兰</a>(kafellon)源自欧洲吧、啦吧啦吧吧啦,吧啦<a href="http://bai333du.com">吧啦吧</a>吧啦、吧啦吧吧啦吧啦吧，吧吧啦吧啦吧啦吧啦吧，吧吧啦吧啦！',
        'site': 'www.dumex.com.cn/'
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
                'tab_title': '预约XXX',
                'tab_type': {
                    'form': {
                        width: 255,
                        height: 96,
                        transparent: true,
                        src: "http://bs.baidu.com/adtest/5e1d9c7c61a6abcbb3c983557a0ff90d.html",
                        'image': "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/tab3.jpg",
                        'image_rcv_url': "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/"
                    }
                }
            },
            {
                'tab_title': '订婚钻戒',
                'tab_type': {
                    'tape_images': {
                        'disable': false,
                        'image_width': 132,
                        'image_margin': 0,
                        'options': [
                            {
                                'imgsrc' : 'http://dummyimage.com/132x121/000/fff&text=1',
                                'imgurl_rcv_url' : 'http://www.baidu.com'
                            },
                            {
                                'imgsrc' : 'http://dummyimage.com/132x121/fff/000&text=2',
                                'imgurl_rcv_url' : 'http://www.baidu.com'
                            },
                            {
                                'imgsrc' : 'http://dummyimage.com/132x121/eee/bbb&text=3',
                                'imgurl_rcv_url' : 'http://www.baidu.com'
                            },
                            {
                                'imgsrc' : 'http://dummyimage.com/132x121/bbb/eee&text=4',
                                'imgurl_rcv_url' : 'http://www.baidu.com'
                            },
                            {
                                'imgsrc' : 'http://dummyimage.com/132x121/aaa/bbb&text=5',
                                'imgurl_rcv_url' : 'http://www.baidu.com'
                            },
                            {
                                'imgsrc' : 'http://dummyimage.com/132x121/bbb/ccc&text=6',
                                'imgurl_rcv_url' : 'http://www.baidu.com'
                            },
                            {
                                'imgsrc' : 'http://dummyimage.com/132x121/ccc/ddd&text=7',
                                'imgurl_rcv_url' : 'http://www.baidu.com'
                            },
                            {
                                'imgsrc' : 'http://dummyimage.com/132x121/ddd/eee&text=8',
                                'imgurl_rcv_url' : 'http://www.baidu.com'
                            },
                            {
                                'imgsrc' : 'http://dummyimage.com/132x121/eee/fff&text=9',
                                'imgurl_rcv_url' : 'http://www.baidu.com'
                            },
                            {
                                'imgsrc' : 'http://dummyimage.com/132x121/fff/aaa&text=10',
                                'imgurl_rcv_url' : 'http://www.baidu.com'
                            }
                        ],
                        'left_arrow' : '//bs.baidu.com/adtest/image_cartoon/left.png',
                        'right_arrow' : '//bs.baidu.com/adtest/image_cartoon/right.png'
                    }
                }
            },
            {
                'tab_title': '客服服务',
                'tab_type': {
                    'contact': {
                        'image': {
                            image_url: "http://eiv.baidu.com/mapm2/benchi/130515_pl_01/tab5.jpg",
                            image_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html"
                        },
                        'description': {
                            rcv_html: "2013款C级轿车，更耀眼的外观，更澎湃的动力，令你尽情挥洒驾驭激情。",
                            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/"
                        },
                        'contact': {
                            'separator': '：',
                            'options': [
                                {
                                    'name': '电话',
                                    'text': '4008-123-123',
                                    'link_type': {
                                        'none': {}
                                    }
                                },
                                {
                                    'name': '邮箱',
                                    'text': '132@baidu.com',
                                    'link_type': {
                                        'mail': {
                                            'mail_address': 'hekai02@baidu.com'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            {
                'tab_title': 'SNS',
                'tab_type': {
                    'sns': {
                        'image': {
                            image_url: "//bs.baidu.com/adtest/9f79fe5b4b83bcf8aa455a60bf04888e.jpg",
                            image_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html"
                        },
                        'qrcode': {
                            image_url: "http://ecma.bdimg.com/adtest/ec94c6732612eea45c7b5bb026c30e8c.jpg"
                        },
                        'share': {
                            'color_names': [],
                            'options': [
                                {
                                    'type': 'sina',
                                    'text': 'TiffanyAndCo蒂芙尼',
                                    'rcv_url': '//www.baidu2.com',
                                    'desc': '蒂芙尼官方新浪微博'
                                },
                                {
                                    'type': 'douban',
                                    'text': 'Tiffany蒂芙尼',
                                    'rcv_url': '//www.baidu2.com',
                                    'desc': '蒂芙尼豆瓣小站'
                                }
                            ]
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
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
