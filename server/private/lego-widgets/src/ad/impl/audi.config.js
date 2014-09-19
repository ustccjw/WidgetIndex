/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/audi.config.js ~ 2013/01/18 16:00:10
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * audi的配置数据
 **/

var AD_CONFIG = {
'id' : 'ec-ma-8964',
'main_url' : 'http://www.baidu.com',
'tab_container' : {
    'width': 500,
    'interval_time' : 500000000000,
    'hover_time' : 200,
    'default_index' : 0, //默认载入的tab，从0开始
    'options': [{
        'tab_title': '文化北京'
    },{
        'tab_title': '北京旅游'
    }]
},
'small_head' : {
    'titletext' : '安利<em>纽崔莱</em>网站',
    'titleurl_rcv_url' : 'http://www.baidu.com',
    'logourl_rcv_url' : 'http://www.baidu.com',
    'description' : '自1854年以来,代代相传至今的路易威登,以卓越品质、杰出创意和精湛工艺成为时尚旅行艺术的象征.产品包括...',
    'site' : 'www.minutemaid.com.cn'
},
'video_left' : {
    'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
    'video_url' : 'http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv',
    'ipad_img': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
    'width':220,
    'height':190
},
 'fwc' : {
    'width':720,
    'height':420,
    'float_bg':{
        'src':'http://eiv.baidu.com/mapm2/burberry/130117_pl_01/float_bg.jpg',
        'href':'www.baidu.com'
    }
},
'video_fwc' : {
    'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
    'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
    'video_url' : '//bs.baidu.com/wbapi-baidu-com/sp1.flv',
    'ipad_img': 'http://eiv.baidu.com/mapm2/burberry/121019_pl_01/float_sp.jpg',
    'width':400,
    'height':250,
    'is_play':true
},
'button_group' : {
    'options' : [
        {'text' : '我们的公司',
          'rcv_url' : 'http://www.baidu1.com'
        },{
            'text' : '产品服务',
            'rcv_url' : 'http://www.baidu2.com'
        },{
            'text' : '新闻中心',
            'rcv_url' : 'http://www.baidu3.com'
        },{
            'text' : '人才招聘',
            'rcv_url' : 'http://www.baidu4.com'
        },{
            'text' : '联系方式',
            'rcv_url' : 'http://www.baidu4.com'
        }
    ]
},
'section' : {
    'options' : [
        {
            'text' : '即刻加入1000日计划，领取免费大礼包',
            'text_rcv_url' : 'http://www.baidu.com'
        },
        {
            'text' : '分阶营养强化',
            'text_rcv_url' : 'http://www.baidu.com'
        },
        {
            'text' : '分阶营养强化',
            'text_rcv_url' : 'http://www.baidu.com'
        }
    ]

},
'small_weibo' : {
    'id' : '1866402485',
    'name' : '京东老刘',
    'follow_imgsrc' : 'http://drmcmm.baidu.com/media/id=PWbvPWc1PHm&gp=402&time=nHnYnj6LnHbkPf.png',
    'verify_img' : 'http://drmcmm.baidu.com/media/id=P10vPjf4rHn&gp=402&time=nHnYnj6LnHbkr0.png',
    'is_display_icon':false
},
'qq_weibo' : {
    'id' : 'paff_1983',
    'name' : '路易威登',
    'verify_img' : 'http://eiv.baidu.com/mapm2/img/qq_verify.png',
    'follow_imgsrc' : 'http://fanxueliang.fe.baidu.com/lv/follow.png',
    'no_fieldset': true
}
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */
