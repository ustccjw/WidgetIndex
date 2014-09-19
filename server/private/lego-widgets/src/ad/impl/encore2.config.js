/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: encore2.config.js 11222 2013-05-27 11:15:12Z DestinyXie $
 *
 **************************************************************************/



/**
 * src/ad/impl/encore2.config.js ~ 2013/05/27 11:15:12
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 11222 $
 * @description
 * encore2的配置数据
 **/

var AD_CONFIG = {
    'id' : 'ec-ma-8964',
    'main_url' : 'http://www.baidu.com',
    'hmjs_id' : '1234567890',
    'tab' : {
        'interval_time' : 50000000, //自动切换tab时间间隔
        'hover_time' : 200,
        'width': 515,
        'li_margin': 8,
        'default_index': 0,
        'li_border_width': 0,
        'options': [{
                'tab_title': "1.4T发动机"
            }, {
                'tab_title': "18\"铝合金轮毂"
            }, {
                'tab_title': "AWD智能四驱"
            }, {
                'tab_title': "ESC控制系统"
            }, {
                'tab_title': "车载交互系统"
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
        },
        {
            'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
            'pro_rcv_url' : 'http://www.dell.com.cn',
            'des_title' : '途胜途胜途胜途胜途胜3',
            'des_title_rcv_url' : 'http://www.dell.com.cn',
            'des_text' : '搭载DOHC CVVT发动机动力澎湃。城市多功能车设计轻松应对各种复杂路况。',
            'des_text_rcv_url' : 'http://www.dell.com.cn'
        },
        {
            'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
            'pro_rcv_url' : 'http://www.dell.com.cn',
            'des_title' : '途胜途胜途胜途胜途胜4',
            'des_title_rcv_url' : 'http://www.dell.com.cn',
            'des_text' : '搭载DOHC CVVT发动机动力澎湃。城市多功能车设计轻松应对各种复杂路况。',
            'des_text_rcv_url' : 'http://www.dell.com.cn'
        },
        {
            'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore//tab2_img.jpg',
            'pro_rcv_url' : 'http://www.dell.com.cn',
            'des_title' : '途胜途胜途胜途胜途胜5',
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
            'player_ver': 1,
            'width':400,
            'height':250,
            'is_play':true //自动播放
        },
        {
            'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
            'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
            'video_url' : '//bs.baidu.com/wbapi-baidu-com/sp1.flv',
            'csttit' : 'zhidao.baidu.com',
            'ipad_img': 'http://eiv.baidu.com/mapm2/encore/121009_pl_01/floatsp1.jpg',
            'player_ver': 1,
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
            'player_ver': 1,
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
            'player_ver': 1,
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
            'player_ver': 1,
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
            'player_ver': 1,
            'width':400,
            'height':250,
            'is_play':true
        }

    ],
    //底部3个按钮
    'button_group' : {
        'options' : [
            {'text' : '别克-林荫大道',
              'url' : 'http://www.baidu1.com'
            },{
                'text' : '别克-英朗XT',
                'url' : 'http://www.baidu2.com'
            },{
                'text' : '查询经销商',
                'url' : 'http://www.baidu3.com'
            },{
                'text' : '预约车型',
                'url' : 'http://www.baidu4.com'
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
