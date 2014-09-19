/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/shandong_tour2.config.js ~ 2013/06/18 14:38:43
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * shandong_tour2的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-shandongtour2",
    "main_url": "http://www.baidu.com",
    "hmjs_id": "12345678",
    "left_video": {
        'rcv_url': 'http://www.baidu1.com/',
        'player_ver': 1,
        'img_url': 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
        'video_url': 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.flv',
        'csttit': 'zhidao.baidu.com',
        'ipad_img': 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg', //在ipad下点击视频替代图片
        'width': 220,
        'height': 190
    },
    "small_head": {
        'titletext': '人人爱果粒<em>山东</em>',
        'titleurl_rcv_url': 'http://www.baidu.com',
        'description_rcv_html': '美汁源人人爱果粒的。美汁源人人爱果粒的。美汁源人人爱果粒的。美汁源人人爱果粒的。美汁源人人爱果粒的。美汁源人人爱果粒的。美汁源人人',
        'site': 'www.minutemaid.com.cn'
    },
    "bar_code": {
        'pro_img_url': '//bs.baidu.com/adtest/7899f875592a06693017e2af745b0f89.jpg',
        'des_title': '必看景点',
        'des_text': '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
        'bar_url': "http://www.baidu.com/?1"
    },

    "tab0": {
        'tab_title': '最新资讯',
        'tab_cont': {
            'pro_img_url': 'http://eiv.baidu.com/mapm2/encore/tab2_img.jpg',
            'pro_rcv_url': 'http://www.dell.com.cn',
            'type_title': '山东旅游最新资讯',
            'type_title_rcv_url': 'http://www.baidu.com/?a',
            'type_links': [{
                'rcv_url': 'http://www.baidu.com',
                'text': '山东曲阜本地人山东曲阜本地人免费游景区'
            }, {
                'rcv_url': 'http://www.baidu.com',
                'text': '山东曲阜本地人山东曲阜本地人免费游景区'
            }, {
                'rcv_url': 'http://www.baidu.com',
                'text': '山东曲阜本地人山东曲阜本地人免费游景区'
            }]
        }
    },

    "tab2": {
        'tab_title': '吃在山东',
        'tab_cont': {
            'pro_img_url': 'http://eiv.baidu.com/mapm2/encore/tab2_img.jpg',
            'pro_rcv_url': 'http://www.dell.com.cn',
            'des_title': '吃在山东',
            'des_title_rcv_url': 'http://www.dell.com.cn',
            'des_text_links': '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
            'query': [{
                'rcv_url': 'http://www.baidu1.com',
                'key_word': '前瞻科技'
            }, {
                'rcv_url': 'http://www.baidu2.com',
                'key_word': '实力座驾'
            }],
            'type_title': '可选型号：',
            'type_links': [{
                'rcv_url': 'http://www.baidu.com',
                'text': '美汁源人人爱果粒的好'
            }, {
                'rcv_url': 'http://www.baidu.com',
                'text': 'ML350 豪华型'
            }, {
                'rcv_url': 'http://www.baidu.com',
                'text': 'ML350 豪华型'
            }, {
                'rcv_url': 'http://www.baidu.com',
                'text': 'ML350 豪华型'
            }]
        }
    },

    "tab": {
        'interval_time': 5000, //自动切换tab时间间隔
        'hover_time': 200,
        'li_border_width': 0,
        'default_index': 0, //默认载入的tab，从0开始
        'options': [{
            'tab_title': '热门景点',
            'tab_cont': {
                'pro_img_url': 'http://eiv.baidu.com/mapm2/encore/tab2_img.jpg',
                'pro_rcv_url': 'http://www.dell.com.cn',
                'des_title': '纵横天地,势不可挡',
                'des_title_rcv_url': 'http://www.dell.com.cn',
                'des_text': '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
                'des_text_rcv_url': 'http://www.dell.com.cn',
                'type_title': '可选型号：',
                'type_links': [{
                    'rcv_url': 'http://www.baidu.com',
                    'text': 'ML350 动感型'
                }, {
                    'rcv_url': 'http://www.baidu.com',
                    'text': 'ML350 豪华型'
                }, {
                    'rcv_url': 'http://www.baidu.com',
                    'text': 'ML350 豪华型'
                }, {
                    'rcv_url': 'http://www.baidu.com',
                    'text': 'ML350 豪华型'
                }]
            }
        }, {
            'tab_title': '专题旅游',
            'tab_cont': {
                'pro_img_url': 'http://eiv.baidu.com/mapm2/encore/tab2_img.jpg',
                'pro_rcv_url': 'http://www.dell.com.cn',
                'des_title': '纵横天地,势不可挡',
                'des_title_rcv_url': 'http://www.dell.com.cn',
                'des_text': '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
                'des_text_rcv_url': 'http://www.dell.com.cn',
                'type_title': '可选型号：',
                'type_links': [{
                    'rcv_url': 'http://www.baidu.com',
                    'text': 'ML350 动感型'
                }, {
                    'rcv_url': 'http://www.baidu.com',
                    'text': 'ML350 豪华型'
                }, {
                    'rcv_url': 'http://www.baidu.com',
                    'text': 'ML350 豪华型'
                }, {
                    'rcv_url': 'http://www.baidu.com',
                    'text': 'ML350 豪华型'
                }]
            }
        }, {
            'tab_title': '旗舰馆',
            'tab_cont': {
                'pro_img_url': 'http://eiv.baidu.com/mapm2/encore/tab2_img.jpg',
                'pro_rcv_url': 'http://www.dell.com.cn',
                'des_title': '纵横天地,势不可挡',
                'des_title_rcv_url': 'http://www.dell.com.cn',
                'des_text': '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
                'des_text_rcv_url': 'http://www.dell.com.cn',
                'type_title': '可选型号：',
                'type_links': [{
                    'rcv_url': 'http://www.baidu.com',
                    'text': 'ML350 动感型'
                }, {
                    'rcv_url': 'http://www.baidu.com',
                    'text': 'ML350 豪华型'
                }, {
                    'rcv_url': 'http://www.baidu.com',
                    'text': 'ML350 豪华型'
                }, {
                    'rcv_url': 'http://www.baidu.com',
                    'text': 'ML350 豪华型'
                }]
            }
        }]
    },

    "button_group": {
        'options': [{
            'text': '山东旅游地图',
            'rcv_url': 'http://www.baidu1.com'
        }, {
            'text': '旅游攻略',
            'rcv_url': 'http://www.baidu2.com'
        }, {
            'text': '旅游攻略',
            'rcv_url': 'http://www.baidu3.com'
        }, {
            'text': '旅游攻略',
            'rcv_url': 'http://www.baidu4.com'
        }, {
            'text': '旅游攻略',
            'rcv_url': 'http://www.baidu5.com'
        }]
    },
    "float_window_container": {
        "width": 545,
        "height": 410
    },
    "map": {
        "width": 545,
        "height": 410,
        'src': '//bs.baidu.com/adtest/1c036846fcff1adcf970c8cdf9fa6496.jpg',
        'options': [{
            'shape': 'rect',
            'coords': '350,224,437,274',
            'href_rcv_url': 'http://www.qdta.cn' //青岛
        }, {
            'shape': 'rect',
            'coords': '390,79,477,129',
            'href_rcv_url': 'http://www.ytta.cn/dtss/city/yantai/menu/index.action' //烟台
        }, {
            'shape': 'rect',
            'coords': '119,130,206,180',
            'href_rcv_url': 'http://www.jnta.gov.cn' //济南
        }, {
            'shape': 'rect',
            'coords': '187,267,274,317',
            'href_rcv_url': 'http://www.zzta.cn/dtsszaozhuang' //枣庄
        }, {
            'shape': 'rect',
            'coords': '240,331,327,381',
            "href_rcv_url": 'http://www.linyitour.gov.cn' //临沂
        }, {
            'shape': 'rect',
            'coords': '327,163,414,213',
            "href_rcv_url": 'http://www.wftour.cn' //潍坊
        }, {
            'shape': 'rect',
            'coords': '99,286,186,336',
            "href_rcv_url": 'http://www.jita.gov.cn' //济宁
        }, {
            'shape': 'rect',
            'coords': '23,154,110,204',
            "href_rcv_url": 'http://www.lcta.gov.cn' //聊城
        }, {
            'shape': 'rect',
            'coords': '99,226,186,276',
            "href_rcv_url": 'http://www.taian.travel/index.shtml' //泰安
        }, {
            'shape': 'rect',
            'coords': '261,91,348,141',
            "href_rcv_url": 'http://www.dyta.gov.cn' //东营
        }, {
            'shape': 'rect',
            'coords': '10,303,97,353',
            "href_rcv_url": 'http://www.hzta.gov.cn' //菏泽
        }, {
            'shape': 'rect',
            'coords': '230,148,317,198',
            "href_rcv_url": 'http://www.zbta.net/?s=y&lang=mult' //淄博
        }, {
            'shape': 'rect',
            'coords': '86,64,173,114',
            "href_rcv_url": 'http://www.dzta.gov.cn' //德州
        }, {
            'shape': 'rect',
            'coords': '213,36,300,86',
            "href_rcv_url": 'http://www.bzta.gov.cn' //滨州
        }, {
            'shape': 'rect',
            'coords': '205,208,292,258',
            "href_rcv_url": 'http://www.lwta.gov.cn' //莱芜
        }, {
            'shape': 'rect',
            'coords': '297,278,384,328',
            "href_rcv_url": 'http://www.rzta.com/' //日照
        }, {
            'shape': 'rect',
            'coords': '452,163,539,213',
            "href_rcv_url": 'http://www.whta.gov.cn' //威海
        }]
    }
};