/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: langdong_ii.config.js 9567 2012-06-06 06:33:00Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/langdong_ii.config.js ~ 2012/06/05 12:14:49
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9567 $
 * @description
 * 演示用的配置项.
 **/

var AD_CONFIG = {
    'id' : 'ec-ma-meizy120627',
    'main_url' : 'http://www.minutemaid.com.cn',
    'logo' : {
        'image_url' : 'http://eiv.baidu.com/mapm2/bmw/live/111212_pl1_01/logo.png'
    },
    'video' : {
        'rcv_url' : 'http://www.baidu.com',
        'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
        'video_url' : 'http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv',
        'ipad_img': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg'
    },
    'head' : {
        'titletext' : '<em>美汁源</em>人人爱果粒',
        'titleurl_rcv_url' : 'http://www.baidu.com',
        'description_rcv_html' : '美汁源人人爱果粒，全国对对碰隆重登场，支持你的地区，战队表达你的爱，入队抢人，邀请好友参加将有意想不到的大礼！',
        'image_group_head' : {
            'options':[
                {
                    'imgsrc':'http://drmcmm.baidu.com/media/id=P1n1nW0vrHm&gp=402&time=nHnYnWRzn104P0.jpg',
                    'imgurl':'http://www.baidu.com'
                },{
                    'imgsrc':'http://drmcmm.baidu.com/media/id=P1n1nW0vrHm&gp=402&time=nHnYnWRzn104P0.jpg',
                    'imgurl':'http://www.baidu.com'
                },{
                    'imgsrc':'http://drmcmm.baidu.com/media/id=P1n1nW0vrHm&gp=402&time=nHnYnWRzn104P0.jpg',
                    'imgurl':'http://www.baidu.com'
                }
            ]
        },
        'site' : 'www.minutemaid.com.cn'
    },
    'colnums' : {
        'options' : [
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/bmw/111209_pl1_01/blueDot.png',
                'text' : '纽崔莱十年结缘奥运，刘翔与体操队强势代言',
                'text_url' : 'http://www.baidu.com',
                'detail':[
                    {
                        'text':'宝宝不同阶段有不同的营养需求，快来一探究竟！',
                        'url':'http://www.baidu.com'
                    },{
                        'text':'宝宝不同阶段有不同的营养需求',
                        'url':'http://www.baidu.com'
                    }
                ]
            },
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/bmw/111209_pl1_01/blueDot.png',
                'text' : '每天加一勺纽崔莱蛋白质粉，补充蛋白质很简单',
                'text_url' : 'http://www.baidu.com',
                'detail':[
                    {
                        'text':'宝宝不同阶段有不同的营养需求，快来一探究竟！',
                        'url':'http://www.baidu.com'
                    },{
                        'text':'宝宝不同阶段有不同的营养需求',
                        'url':'http://www.baidu.com'
                    }
                ]
            }
        ]
    },
    'bottons': {
        'options': [{
            'text' : '全国对对碰',
            'url' : 'http://www.baidu.com'
        },{
            'text' : '人人爱果粒',
            'url' : 'http://www.baidu.com'
        },{
            'text' : '果粒故事',
            'url' : 'http://www.baidu.com'
        },{
            'text' : '支持地区',
            'url' : 'http://www.baidu.com'
        },{
            'text' : '全国对对碰',
            'url' : 'http://www.baidu.com'
        }]
    },
    'float_layer':{
        "is_live" : true,
        "float_bg" : {
            "src" : 'http://hiphotos.baidu.com/baidu/pic/item/2f2eb9384edcf6aed562259d.png',//浮层背景图片地址
            "href" : 'http://www.baidu.com'//浮层背景点击跳转地址
        },
        "float_link" : [
            {
                "url":"http://www.dell.com.cn" //微博官网地址
            }
        ], //查看专题链接
        'swf' : {
            'url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
            'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
            'video_url' : 'http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv',
            'ipad_Img': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
            'width':416,
            'height':234
        },
        "iframe" : {
            'width':416,
            'height':234,
            "src" : 'http://c.youku.com/ld-baidu'
        },
        "weibo_share" : {
            "text" : "康永哥编剧，四大美女出演，这部力士都市秀发态度微电影#爱至毫厘 恋上发梢#真心值得期待！"
        }
    }
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
