/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: yili.config.js 9567 2012-06-06 06:33:00Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/yili.config.js ~ 2012/06/05 12:14:49
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9567 $
 * @description
 * 演示用的配置项.
 **/

var AD_CONFIG = {
    'id' : 'ec-ma-meizy120627',
    'main_url' : 'http://www.minutemaid.com.cn',
    'left_video' : {
        'rcv_url' : 'http://www.baidu.com',
        'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
        'video_url' : 'http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv',
        'ipad_img': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg'
    },
    //1-3小图对应视频配置
    'video' : [
    ],
    'head' : {
        'titletext' : '<em>美汁源</em>人人爱果粒',
        'titleurl_rcv_url' : 'http://www.baidu.com',
        'description_rcv_html' : '美汁源人人爱果粒，全国对对碰隆重登场，支持你的地区，战队表达你的爱，入队抢人，邀请好友参加将有意想不到的大礼！',
        'image_group_head' : {
            'options':[
                {
                    'imgsrc':'http://drmcmm.baidu.com/media/id=P1n1nW0vrHm&gp=402&time=nHnYnWRzn104P0.jpg',
                    'imgurl' : 'http://www.baidu.com'
                },{
                    'imgsrc':'http://drmcmm.baidu.com/media/id=P1n1nW0vrHm&gp=402&time=nHnYnWRzn104P0.jpg',
                    'imgurl' : 'http://www.baidu.com'
                },{
                    'imgsrc':'http://drmcmm.baidu.com/media/id=P1n1nW0vrHm&gp=402&time=nHnYnWRzn104P0.jpg',
                    'imgurl' : 'http://www.baidu.com'
                }
            ]
        },
        'site' : 'www.minutemaid.com.cn'
    },
    'columns' : {
        'options' : [
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/img/icon-red.jpg',
                'text' : '注册金领冠奶粉积分商城—轻松兑换积分，好礼送到家',
                'text_url' : 'http://www.baidu.com',
                'iframe':{
                    'height':65,
                    'width':504,
                    'src':'http://eiv.baidu.com/mapm2/yili/jiejin/130130/index.html'
                }
            },
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/img/icon-yellow.jpg',
                'text' : '全新升级金领冠 黄金蛋白占总蛋白比例提升15%',
                'text_url' : 'http://www.baidu.com',
                'detail':[
                    {
                        'text':'给宝宝加倍保护力，如同妈妈的亲身呵护！',
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
    }
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
