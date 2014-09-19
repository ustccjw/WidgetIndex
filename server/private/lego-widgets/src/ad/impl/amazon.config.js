/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: amazon.config.js 9567 2012-06-06 06:33:00Z songao $
 *
 **************************************************************************/



/**
 * src/ad/amazon.config.js ~ 2012/06/05 12:14:49
 * @author songao(songao@baidu.com)
 * @version $Revision: 9567 $
 * @description
 * 演示用的配置项.
 **/

var AD_CONFIG = {
    'id': 'ec-ma-amazon120815',
    'main_url': 'http://www.amazon.cn',
    'title': {
        'title': '<em>亚马逊</em>Z.cn，综合网购商城，货到付款！',
        'url': 'http://www.amazon.cn',
        'logoimg': 'http://eiv.baidu.com/mapm2/huacai/amazon_logo.png',
        'logourl': 'http://www.amazon.cn'
    },

    'image_slider': {
        'width':170, //图片宽度
        'height':150, //图片高度
        'delay':200, //切换选择时的延时响应时间
        'interval_time':6000, //自动切换时间间隔 =0表示不自动切换
        'mode':'horizontal', //'mode':'vertical'|'horizontal'|'normal' 图片展示模式：垂直滚动、水平滚动、无动画效果
        'first_show_index':0, //首次载入的图片索引
        'options':[
            {
                'img_url':'http://songao.fe.baidu.com/huacai/amazon_170_150.png',
                'rcv_url':'www.baidu1.com'
            },
            {
                'img_url':'http://songao.fe.baidu.com/huacai/amazon_170_150.png',
                'rcv_url':'www.baidu2.com'
            },
            {
                'img_url':'http://songao.fe.baidu.com/huacai/amazon_170_150.png',
                'rcv_url':'www.baidu3.com'
            },
            {
                'img_url':'http://songao.fe.baidu.com/huacai/amazon_170_150.png',
                'rcv_url':'www.baidu4.com'
            }
        ],
        'custom_title2':'tabpic'
    },

    'head' : {
        'description' : '亚马逊中国，综合性网上购物商城，销售包括<a href="http://www.baidu.com" target="_blank">图书</a>、电脑<a href="http://www.baidu.com" target="_blank">家用电器</a>、服饰箱包、美容化妆等28大类数百万种产品。天天低价，货到付款，满29元免运费！立即访问Z.cn！',
        'site' : 'www.louisvuitton.cn'
    },

    'weibo': {
        'id' : '1732523361',
        'is_display_icon': false,
        'is_display_fans': false,
        'is_display_weibo': false,
        'is_display_foot': false,
        'context': '亚马逊Z.cn，<a href="http://www.baidu.com" target="_blank">时时Z秒杀，天天Z惊喜！</a> 立即关注官方微博！',
        'icon_url' : 'http://www.baidu.com',
        'name' : '亚马逊中国官方微博',
        'follow_imgsrc' : 'http://eiv.baidu.com/mapm2/huacai/amazon_weibo_follow.png',
        'custom_url':'http://www.amazon.cn/gp/redirect.html/ref=cn_sm_baidu_si?location=http://weibo.com/amazonchina&token=BBC21D7CCBF0F5326A488042FF7177894655DB44'
    },

    'search_box' : {
        'url' : 'http://www.suning.com',
        'form' : {
            'action' : 'http://cn.strawberrynet.com/product-search',
            'method' : 'get',
            'charset' : 'gb2312',
            'params' : [
                {'key' : 'trackid', 'value' : 1411300030 },
                {'key' : 'utm_source', 'value' : 'Baidu+Brandzone' },
                {'key' : 'utm_term', 'value' : 'Baidu+Brandzone_search+results' },
                {'key' : 'utm_campaign', 'value' : 'Brandzone' },
                {'key' : 'utm_content', 'value' : 'Adtext' },
                {'key' : 'searchLineId', 'value' : '' },
                {'key' : 'utm_medium', 'value' : 'cpc' }
            ],
            'query_name' : 'searchField'
        },
        'placeholder' : '暑期热卖排行'
    },

    'image_group' : {
        'image_width': 103,
        'image_margin': 3,
        'options' : [{
            'imgsrc' : 'http://fanxueliang.fe.baidu.com/lv/1.png',
            'imgurl' : 'http://www.baidu.com'
        },{
            'imgsrc' : 'http://fanxueliang.fe.baidu.com/lv/2.png',
            'imgurl' : 'http://www.baidu.com'
        },{
            'imgsrc' : 'http://fanxueliang.fe.baidu.com/lv/1.png',
            'imgurl' : 'http://www.baidu.com'
        },{
            'imgsrc' : 'http://fanxueliang.fe.baidu.com/lv/2.png',
            'imgurl' : 'http://www.baidu.com'
        },{
            'imgsrc' : 'http://fanxueliang.fe.baidu.com/lv/1.png',
            'imgurl' : 'http://www.baidu.com'
        },{
            'imgsrc' : 'http://fanxueliang.fe.baidu.com/lv/2.png',
            'imgurl' : 'http://www.baidu.com'
        },{
            'imgsrc' : 'http://fanxueliang.fe.baidu.com/lv/1.png',
            'imgurl' : 'http://www.baidu.com'
        },{
            'imgsrc' : 'http://fanxueliang.fe.baidu.com/lv/2.png',
            'imgurl' : 'http://www.baidu.com'
        },{
            'imgsrc' : 'http://fanxueliang.fe.baidu.com/lv/1.png',
            'imgurl' : 'http://www.baidu.com'
        },{
            'imgsrc' : 'http://fanxueliang.fe.baidu.com/lv/2.png',
            'imgurl' : 'http://www.baidu.com'
        }],
        'left_arrow' : 'http://eiv.baidu.com/mapm2/huacai/amazon_arrow_left.png',
        'right_arrow' : 'http://eiv.baidu.com/mapm2/huacai/amazon_arrow_right.png'
    },

    'table':{
        'head': [{
            'text': "影音娱乐",
            'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000139&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000139,,901vmy6776&ST=NEWBBZbundle1&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle1"
        }, {
            'text': "轻薄便携",
            'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000139&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000139,,901vmy6776&ST=NEWBBZbundle1&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle1"
        }, {
            'text': "强劲游戏",
            'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000139&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000139,,901vmy6776&ST=NEWBBZbundle1&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle1"
        }, {
            'text': "商务办公"
        }, {
            'text': "数据中心"
        }],
        'body': [{
            'tr': [{
                'text': "灵越 Turbo",
                'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000139&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000139,,901vmy6776&ST=NEWBBZbundle1&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle1"
            }, {
                'text': "XPS 13超极本",
                'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000141&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000141,,901vmy6776&ST=NEWBBZbundle3&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle3"
            }, {
                'text': "外星人 M18x",
                'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000143&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000143,,901vmy6776&ST=NEWBBZbundle5&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle5"
            }, {
                'text': "商务台式机",
                'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000145&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000145,,901vmy6776&ST=NEWBBZbundle7&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle7"
            }, {
                'text': "服务器",
                'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000147&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000147,,901vmy6776&ST=NEWBBZbundle9&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle9"
            }]
        }, {
            'tr': [{
                'text': "娱乐一体机",
                'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000140&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000140,,901vmy6776&ST=NEWBBZbundle2&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle2"
            }, {
                'text': "14z 超极本",
                'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000142&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000142,,901vmy6776&ST=NEWBBZbundle4&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle4"
            }, {
                'text': "外星人台式机",
                'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000144&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000144,,901vmy6776&ST=NEWBBZbundle6&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle6"
            }, {
                'text': "商务笔记本",
                'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000146&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000146,,901vmy6776&ST=NEWBBZbundle8&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle8"
            }, {
                'text': "存储设备",
                'url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000148&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000148,,901vmy6776&ST=NEWBBZbundle10&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle10"
            }]
        }]
    }
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
