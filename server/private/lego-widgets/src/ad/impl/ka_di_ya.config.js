/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/ka_di_ya.config.js ~ 2013/07/31 16:24:47
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * ka_di_ya的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-kadiya", 
    "main_url": "http://www.baidu.com",
    "hmjs_id": "123123123123",
    'left_video': {
        'rcv_url': 'http://www.baidu.com/',
        'player_ver': 1,
        'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
        'video_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.flv',
        'ipad_img': 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg', //在ipad下点击视频替代图片
        'width': 220,
        'height': 190
    },
    'small_head': {
        'logoimg': {
            'logoimg': '//bs.baidu.com/adtest/066b6c44c2d693055ef0607fa0de5314.gif',
            'logourl_rcv_url': 'http://www.baidu.com'
        },
        'titletext': '<em>北京现代</em>汽车',
        'titleurl_rcv_url': 'http://www.baidu.com',
        'description_rcv_html': '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四',
        'query': [
            {
                'key_word': "北京现代",
                'rcv_url': "http://www.baidu.com"
            },
            {
                'key_word': "全新胜达",
                'rcv_url': "http://www.baidu.com"
            }
        ],
        'site': 'www.beijing-hyundai.com.cn'
    },
    'link_table': {
        'head': [{}, {}],
        'body': [{
            'tr': [{
                'text': "一二三四五",
                'rcv_url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000139&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000139,,901vmy6776&ST=NEWBBZbundle1&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle1"
            }, {
                'text': "一二三四五",
                'rcv_url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000141&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000141,,901vmy6776&ST=NEWBBZbundle3&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle3"
            }]
        }, {
            'tr': [{
                'text': "一二三四五",
                'rcv_url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000140&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000140,,901vmy6776&ST=NEWBBZbundle2&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle2"
            }, {
                'text': "一二三四五",
                'rcv_url': "http://tracker.marinsm.com/rd?cid=9017g66775&mid=901vmy6776&mkwid=bl_hsb:000142&lp=http://altfarm.mediaplex.com/ad/ck/10592-63165-23473-1?VEN1=bl_hsb:000142,,901vmy6776&ST=NEWBBZbundle4&DURL=http%3A%2F%2Fwww.dell.com.cn%2FNEWBBZbundle4"
            }]
        }]
    },
    'image_cartoon': {
        'image_width': 90,
        'image_margin': 6,
        'options' : [{
            'imgsrc' : 'http://eiv.baidu.com/mapm2/kadiya/130925_pl_01/1.jpg'
        },{
            'imgsrc' : 'http://eiv.baidu.com/mapm2/kadiya/130925_pl_01/2.jpg'
        },{
            'imgsrc' : 'http://eiv.baidu.com/mapm2/kadiya/130925_pl_01/3.jpg'
        },{
            'imgsrc' : 'http://eiv.baidu.com/mapm2/kadiya/130925_pl_01/4.jpg'
        },{
            'imgsrc' : 'http://eiv.baidu.com/mapm2/kadiya/130925_pl_01/5.jpg'
        }],
        'left_arrow' : '//bs.baidu.com/adtest/a5698b3bc25522a2aeb17486df3f7d18.jpg',
        'right_arrow' : '//bs.baidu.com/adtest/d24d2a7c642245f942cad518d26e97c6.jpg'
    },
    'small_weibo': {
        'id' : '1870458911',
        'name' : '卡地亚',
        'weibo_context_length' : '80',
        'follow_imgsrc' : '//bs.baidu.com/adtest/30a4d34bc5cdb7238b21d20b8365622e.gif',
        'verify_img' : 'http://eiv.baidu.com/mapm2/duqusheng/ceshi/weibo/identificationImg.png',
        'is_display_icon': false
    },
    'button_group': {
        'options' : [
            {
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu.com'
            }
        ]
    },
    'fwc': {
        'width': 720,
        'height': 420
    },
    'fwc_flash_bg': {
        'width':720,
        'height':420,
        'is_flashvars': true,
        //'link_rcv_url' : 'http://www.baidu.com/',//点击flash的跳转链接
        'src':'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/float2.swf',
        'ipad_img':'//bs.baidu.com/adtest/317ceac0d9ce830363f5ab25030a01a7.jpg',
        'ipad_link_rcv_url':'http://clkmk.baidu.com/clkmk-rcv/lnk?id=2950&x=6f17f0689aca0f40998aeb134de81265c9e456d0a48d15e2bee62a82777d7c7d61453cedbb022778d1343a3e37e94bf88d67e1e746591162717c2e05c36739e50ca308cb881be6049e896c4047b15b9e784bc33cfb869478e39d0cbbe76aef5bd97884ab8448a662c0a5164e883a408b4e56177f94d06c5a'
    },
    'fwc_videos': {
        'options': [
            {
                'player_ver': 1,
                'rcv_url' : 'http://www.163.com', 
                'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
                'video_url' : 'http://eiv.baidu.com/mapm2/benchi/130131_pl_01/sp1.flv',
                'ipad_img': 'http://eiv.baidu.com/mapm2/benchi/130131_pl_01/sp3.jpg',
                'width':400,
                'height':250,
                'is_play':true 
            },
            {
                'player_ver': 1,
                'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
                'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
                'video_url' : 'http://eiv.baidu.com/mapm2/benchi/130131_pl_01/sp2.flv',
                'ipad_img': 'http://eiv.baidu.com/mapm2/benchi/130131_pl_01/sp3.jpg',
                'width':400,
                'height':250,
                'is_play':true
            },
            {
                'player_ver': 1,
                'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
                'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
                'video_url' : 'http://eiv.baidu.com/mapm2/benchi/130131_pl_01/sp3.flv',
                'ipad_img': 'http://eiv.baidu.com/mapm2/benchi/130131_pl_01/sp3.jpg',
                'width':400,
                'height':250,
                'is_play':true
            },
            {
                'player_ver': 1,
                'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
                'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
                'video_url' : 'http://eiv.baidu.com/mapm2/benchi/130131_pl_01/sp1.flv',
                'ipad_img': 'http://eiv.baidu.com/mapm2/benchi/130131_pl_01/sp3.jpg',
                'width':400,
                'height':250,
                'is_play':true
            },
            {
                'player_ver': 1,
                'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
                'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
                'video_url' : 'http://eiv.baidu.com/mapm2/benchi/130131_pl_01/sp2.flv',
                'ipad_img': 'http://eiv.baidu.com/mapm2/benchi/130131_pl_01/sp3.jpg',
                'width':400,
                'height':250,
                'is_play':true
            },
            {
                'player_ver': 1,
                'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
                'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
                'video_url' : 'http://eiv.baidu.com/mapm2/benchi/130131_pl_01/sp3.flv',
                'ipad_img': 'http://eiv.baidu.com/mapm2/benchi/130131_pl_01/sp3.jpg',
                'width':400,
                'height':250,
                'is_play':true
            }
        ]
    },
    'fwc_image_cartoon': {
        'image_width': 101,
        'image_margin': 5,
        'options' : [{
            'imgsrc' : 'http://eiv.baidu.com/mapm2/kadiya/130925_pl_01/1.jpg'
        },{
            'imgsrc' : 'http://eiv.baidu.com/mapm2/kadiya/130925_pl_01/2.jpg'
        },{
            'imgsrc' : 'http://eiv.baidu.com/mapm2/kadiya/130925_pl_01/3.jpg'
        },{
            'imgsrc' : 'http://eiv.baidu.com/mapm2/kadiya/130925_pl_01/4.jpg'
        },{
            'imgsrc' : 'http://eiv.baidu.com/mapm2/kadiya/130925_pl_01/5.jpg'
        }],
        'left_arrow' : '//bs.baidu.com/adtest/d98b6751aff6af5d0c16a6233cabd29c.gif',
        'right_arrow' : '//bs.baidu.com/adtest/f2e89d1246c41aa5aa455e625c96fa63.gif'
    }
};