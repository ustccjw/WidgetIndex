/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/encore.config.js ~ 2012/09/27 15:15:12
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 11222 $
 * @description
 * encore的配置数据
 **/

var AD_CONFIG = {
'id' : 'ec-ma-8964',
'main_url' : 'http://www.baidu.com',
'tab' : {
    'interval_time' : 50000000, //自动切换tab时间间隔
    'hover_time' : 200,
    'li_width':157,
    'default_index' : 0, //默认载入的tab，从0开始
    'options': [{
        'tab_title': '别克新浪微博'
    },{
        'tab_title': 'Encore全城大搜藏'
    },{
        'tab_title': 'Encore全新系列车款'
    }]
},
//第二和第三个tab内容
'tab_cont':[
    {
        'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
        'pro_rcv_url' : 'http://www.dell.com.cn',
        'des_title' : '途胜途胜途胜途胜途胜1',
        'des_title_rcv_url' : 'http://www.dell.com.cn',
        'des_text' : '搭载DOHC CVVT发动机动力澎湃。城市多功能车设计轻松应对各种复杂路况。',
        'des_text_rcv_url' : 'http://www.dell.com.cn'
    },
    {
        'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
        'pro_rcv_url' : 'http://www.dell.com.cn',
        'des_title' : '途胜途胜途胜途胜途胜2',
        'des_title_rcv_url' : 'http://www.dell.com.cn',
        'des_text' : '搭载DOHC CVVT发动机动力澎湃。城市多功能车设计轻松应对各种复杂路况。',
        'des_text_rcv_url' : 'http://www.dell.com.cn'
    }
],
'small_head' : {
    'titletext' : '<em>美汁源</em>人人爱果粒',
    'titleurl_rcv_url' : 'http://www.baidu.com',
    'description_rcv_html' : '美汁源人人爱果粒，全国对对碰隆重登场，支持你的地区，战队表达你的爱，入队抢人，邀请好友参加将有意想不到的大礼！',
    'image_group_head' : {
        'options':[
            {
                'imgsrc':'http://eiv.baidu.com/mapm2/encore//h1_img1.jpg'
            },{
                'imgsrc':'http://eiv.baidu.com/mapm2/encore//h1_img1.jpg'
            },{
                'imgsrc':'http://eiv.baidu.com/mapm2/encore//h1_img1.jpg'
            }
        ]
    },
    'site' : 'www.minutemaid.com.cn'
},
//左侧视频
'video_left' : {
    'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
    'video_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.flv',
    'csttit' : 'zhidao.baidu.com',
    'ipad_img': 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg', //在ipad下点击视频替代图片
    'width':220,
    'height':190
},
//浮层视频
'video_fwc' : [
    {
        'rcv_url' : 'http://www.163.com', //浮层视频跳转地址
        'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
        'video_url' : '//bs.baidu.com/wbapi-baidu-com/sp1.flv',
        'csttit' : 'zhidao.baidu.com',
        'ipad_img': 'http://eiv.baidu.com/mapm2/encore/121009_pl_01/floatsp1.jpg',
        'width':400,
        'height':250,
        'is_play':true //自动播放
    },
    {
        'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
        'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
        'video_url' : '//bs.baidu.com/wbapi-baidu-com/sp2.flv',
        'csttit' : 'zhidao.baidu.com',
        'ipad_img': 'http://eiv.baidu.com/mapm2/encore/121009_pl_01/floatsp1.jpg',
        'width':400,
        'height':250,
        'is_play':true
    },
    {
        'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
        'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
        'video_url' : '//bs.baidu.com/wbapi-baidu-com/sp3.flv',
        'csttit' : 'zhidao.baidu.com',
        'ipad_img': 'http://eiv.baidu.com/mapm2/encore/121009_pl_01/floatsp1.jpg',
        'width':400,
        'height':250,
        'is_play':true
    },
    {
        'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
        'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
        'video_url' : '//bs.baidu.com/wbapi-baidu-com/sp4.flv',
        'csttit' : 'zhidao.baidu.com',
        'ipad_img': 'http://eiv.baidu.com/mapm2/encore/121009_pl_01/floatsp1.jpg',
        'width':400,
        'height':250,
        'is_play':true
    },
    {
        'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
        'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
        'video_url' : '//bs.baidu.com/wbapi-baidu-com/sp5.flv',
        'csttit' : 'zhidao.baidu.com',
        'ipad_img': 'http://eiv.baidu.com/mapm2/encore/121009_pl_01/floatsp1.jpg',
        'width':400,
        'height':250,
        'is_play':true
    },
    {
        'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
        'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
        'video_url' : '//bs.baidu.com/wbapi-baidu-com/sp1.flv',
        'csttit' : 'zhidao.baidu.com',
        'ipad_img': 'http://eiv.baidu.com/mapm2/encore/121009_pl_01/floatsp1.jpg',
        'width':400,
        'height':250,
        'is_play':true
    }

],
//底部3个按钮
'button_group' : {
    'options' : [
        {'text' : '别克-林荫大道',
          'url' : 'www.baidu1.com'
        },{
            'text' : '别克-英朗XT',
            'url' : 'www.baidu2.com'
        },{
            'text' : '查询经销商',
            'url' : 'www.baidu3.com'
        }
    ]
},
'fwc' : {
    'width':720,
    'height':420,
    'float_bg':{
        'src':'http://eiv.baidu.com/mapm2/encore/bg.jpg', //浮层背景图
        'href':'www.baidu.com' //浮层背景跳转地址
    }
},
//微博模块
'small_weibo' : {
    'id' : '1924007153',
    'name' : 'Burberry',
    'follow_imgsrc' : 'http://drmcmm.baidu.com/media/id=PWbvPWc1PHm&gp=402&time=nHnYnj6LnHbkPf.png',
    'verify_img' : 'http://eiv.baidu.com/mapm2/duqusheng/ceshi/weibo/identificationImg.png',
    'is_display_icon':false
},
//浮层右侧6个按钮
'image_normal':{
    'width':100,
    'height':55,
    'options' : [
         {'img_url' : 'http://eiv.baidu.com/mapm2/encore/float_right_img1.jpg',
            'text':'别克全城大'
        },
        {'img_url' : 'http://eiv.baidu.com/mapm2/encore/float_right_img1.jpg',
            'text':'2012全新君越'
        },
        {'img_url' : 'http://eiv.baidu.com/mapm2/encore/float_right_img1.jpg',
            'text':'君越车型亮点'
        },
        {'img_url' : 'http://eiv.baidu.com/mapm2/encore/float_right_img1.jpg',
            'text':'SIDI发动机'
        },
        {'img_url' : 'http://eiv.baidu.com/mapm2/encore/float_right_img1.jpg',
            'text':'别克全城大'
        },
        {'img_url' : 'http://eiv.baidu.com/mapm2/encore/float_right_img1.jpg',
            'text':'别克全城大'
        }
    ]
}
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */
