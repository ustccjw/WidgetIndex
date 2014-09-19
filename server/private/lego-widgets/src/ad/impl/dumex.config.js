/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: dumex.config.js  2012-08-02 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/dumex.config.js ~ 2012/07/18 12:14:49
 * @author wangdawei
 * @version $Revision $
 * @description
 * 演示用的配置项.
 **/

var AD_CONFIG = {
    'id': 'ec-ma-dumex-1',
    'main_url': 'http://www.baidu.com',
    'head': {
        'titleurl_rcv_url' : 'http://www.baidu.com',
        'titletext' : '<em>多美滋</em>源自欧洲市场领先者',
        'description_rcv_html' : '多美滋源自欧洲市场领先者，母公司旗下多个品牌在欧洲市场处于领先地位，具备国际领先的创新和研发能力。根据中国宝宝不同阶段的成长需求，推出全新 优阶系列产品，采用\"分阶营养强化\"，配方，让宝宝在各阶段展现成长优势。根据中国宝宝。<a href=\"###\">新浪微博入口</a>',
        'site' : '1000day.dumex.com.cn/'
    },
    'section': {
        'display_default_icon': true,
        'options' : [
            {
                'icon_url' : 'http://wangdawei.fe.baidu.com/icon-green.jpg',
                'text' : '即刻加入1000日计划，领取免费大礼包',
                'text_rcv_url' : 'http://www.baidu.com',
                'iframe':{
                    'height':78,
                    'width':499,
                    'src':'http://210.51.46.184/apply3/public/html/_5.html'
                }
            },
            {
                'icon_url' : 'http://wangdawei.fe.baidu.com/icon-red.jpg',
                'text' : '分阶营养强化',
                'text_rcv_url' : 'http://www.baidu.com',
                'detail':[
                    {
                        'text':'宝宝不同阶段有不同的营养需求，快来一探究竟！',
                        'rcv_url':'http://www.baidu.com'
                    }
                ]
            }
        ]
    },
    'button_group': {
        'options' : [
            {
                'text' : '优蕴力',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '优化力',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '优抗力',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '优创力',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '优备力',
                'rcv_url' : 'http://www.baidu.com'
            }
        ]
    },
    'video': {
        'rcv_url' : 'http://www.baidu.com',
        'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
        'video_url' : 'http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv',
        'ipad_Img': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
        'width':220,
        'height':190
    }
};
















/* vim: set ts=4 sw=4 sts=4 tw=100: */
