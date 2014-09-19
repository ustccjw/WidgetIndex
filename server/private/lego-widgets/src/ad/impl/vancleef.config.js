/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/vancleef.config.js ~ 2013/03/11 11:40:24
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * vancleef的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-8964",
    "main_url": "http://www.vancleef-arpels.com",

    // 左上角大图
    'image' : {
        'column': 1,        // [可选]每行grid数，如不填则不设置容器宽度（改为由开发自己用CSS调整宽度）
        'grid_width': 220,  // [必填]单个图片宽度(px)
        'grid_height': 190, // [必填]单个图片高度(px)
        'row_gap': 0,       // [必填]每行之间的间隔
        'column_gap': 0,    // [必填]每列之间的间隔
        'grids': [
            {
                // 图片地址
                'img_url' : '//bs.baidu.com/adcoup-mat/9b1377b2-5e0c-4fb5-a222-fdc9f122302d.jpg',
                // 图片链接
                'rcv_url': 'http://baidu.com'
            }
        ]
    },

    // 右上角文字
    'small_head' : {
        'titletext' : 'Van Cleef&Arpels<em>梵克雅宝</em>',
        'titleurl_rcv_url' : 'http://www.vancleef-arpels.com',
        'description_rcv_html' : '法国珠宝世家VanCleef&Arpels梵克雅宝1906年在巴黎创立至今，坚守原创设计风格、坚持选用璀璨宝石、融合独特诗意创作',
        'site' : 'www.vancleef-arpels.com'
    },

    // 右上角图片滚动
    'image_cartoon': {
        'image_width': 80,
        'image_margin': 9,
        // 图片地址和链接地址，有几个填几个
        'options' : [
            {
                'imgsrc' : '//bs.baidu.com/adcoup-mat/ec02052f-03b5-4230-938f-0d801b7c9bb8.jpg',
                'imgurl_rcv_url' : 'http://www.baidu.com'
            },
            {
                'imgsrc' : '//bs.baidu.com/adcoup-mat/ec02052f-03b5-4230-938f-0d801b7c9bb8.jpg',
                'imgurl_rcv_url' : 'http://www.baidu.com'
            },
            {
                'imgsrc' : '//bs.baidu.com/adcoup-mat/5f26dc42-98a2-4c22-bb5e-31401b326c2a.jpg',
                'imgurl_rcv_url' : 'http://www.baidu.com'
            },
            {
                'imgsrc' : '//bs.baidu.com/adcoup-mat/ec02052f-03b5-4230-938f-0d801b7c9bb8.jpg',
                'imgurl_rcv_url' : 'http://www.baidu.com'
            },
            {
                'imgsrc' : '//bs.baidu.com/adcoup-mat/ec02052f-03b5-4230-938f-0d801b7c9bb8.jpg',
                'imgurl_rcv_url' : 'http://www.baidu.com'
            },
            {
                'imgsrc' : '//bs.baidu.com/adcoup-mat/5f26dc42-98a2-4c22-bb5e-31401b326c2a.jpg',
                'imgurl_rcv_url' : 'http://www.baidu.com'
            }
        ],
        'left_arrow' : 'http://eiv.baidu.com/mapm2/zhouminming01/vancleef/arrow_l.png',
        'right_arrow' : 'http://eiv.baidu.com/mapm2/zhouminming01/vancleef/arrow_r.png'
    },

    // 最底下的链接配置
    'button_group_foot' : {
        'options' : [
            {'text' : '在线商店',
              'rcv_url' : 'http://www.baidu1.com'
            },{
                'text' : '店铺分布',
                'rcv_url' : 'http://www.baidu2.com'
            },{
                'text' : 'Acoustic',
                'rcv_url' : 'http://www.baidu3.com'
            },{
                'text' : '优酷空间',
                'rcv_url' : 'http://www.baidu4.com'
            },{
                'text' : '豆瓣小站',
                'rcv_url' : 'http://www.baidu4.com'
            }
        ]
    },

    // tab配置，别动
    'tabs' : {
        'interval_time': 500000000,
        'default_index': 0,
        'li_width': 100,
        'options': [
            {
                'tab_title': '腾讯微博',
                'tab_content': {
                    'qq': {
                        'id' : 'BMWChina2011',
                        'name' : '腾讯薇薇',
                        'verify_img' : 'http://eiv.baidu.com/mapm2/img/qq_verify.png',
                        'follow_imgsrc' : 'http://fanxueliang.fe.baidu.com/lv/follow.png'
                    }
                }
            },
            {
                'tab_title': '新浪微博',
                'tab_content': {
                    'sina': {
                        'id' : '2653491890',
                        'name' : '梵克雅宝',
                        'follow_imgsrc' : 'http://drmcmm.baidu.com/media/id=PWbvPWc1PHm&gp=402&time=nHnYnj6LnHbkPf.png',
                        'verify_img' : 'http://drmcmm.baidu.com/media/id=P10vPjf4rHn&gp=402&time=nHnYnj6LnHbkr0.png'
                    }
                }
            }
        ]
    }

};




/* vim: set ts=4 sw=4 sts=4 tw=100: */
