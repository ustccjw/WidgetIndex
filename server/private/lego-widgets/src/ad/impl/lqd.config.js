/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lqd.config.js ~ 2012/08/20 13:38:37
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 11222 $
 * @description
 * lqd的配置数据
 **/

var AD_CONFIG = {
    'id' : 'ec-ma-8964',
    'main_url' : 'http://www.baidu.com',
    'small_head' : {
        'titletext' : '<em>刘强东</em>京东商城创始人兼CEO',
        'titleurl_rcv_url' : 'http://www.baidu.com',
        'description_rcv_html' : '刘强东，1973年生，毕业于中国人民大学社会学系，于1998年6月18日在北京中关村创办了京东公司。他个性率直，热衷户外喜欢穿越沙漠。',
        'image_group_head' : {
            'options':[
                {
                    'imgsrc':'http://eiv.baidu.com/mapm2/jijia/120427_pl_01/1.jpg',
                    'img_rcv_url':'www.baidu.com'
                },{
                    'imgsrc':'http://eiv.baidu.com/mapm2/jijia/120427_pl_01/2.jpg',
                    'img_rcv_url':'www.baidu.com'
                },{
                    'imgsrc':'http://eiv.baidu.com/mapm2/jijia/120427_pl_01/3.jpg',
                    'img_rcv_url':'www.baidu.com'
                }
            ]
        },
        'site' : 'www.360buy.com'
    },
    'slider' : {
        'width':220, //图片宽度
        'height':190, //图片高度
        'delay':200, //切换选择时的延时响应时间
        'interval_time':6000, //自动切换时间间隔 =0表示不自动切换
        'mode':'horizontal', //'mode':'vertical'|'horizontal'|'normal' 图片展示模式：垂直滚动、水平滚动、无动画效果
        'first_show_index':0, //首次载入的图片索引
        'options':[
            {
                'img_url':'http://jm.qncye.com/uploads/allimg/120809/211F52V2-0.jpg',
                'rcv_url':'www.baidu1.com'
            },
            {
                'img_url':'http://jm.qncye.com/uploads/allimg/120809/211F52V2-0.jpg',
                'rcv_url':'www.baidu2.com'
            },
            {
                'img_url':'http://jm.qncye.com/uploads/allimg/120809/211F52V2-0.jpg',
                'rcv_url':'www.baidu3.com'
            },
            {
                'img_url':'http://jm.qncye.com/uploads/allimg/120809/211F52V2-0.jpg',
                'rcv_url':'www.baidu4.com'
            }
        ]
    },
    'button_group' : {
        'options' : [
            {'text' : '京东简介',
              'url' : 'www.baidu1.com'
            },{
                'text' : '电脑数码',
                'url' : 'www.baidu2.com'
            },{
                'text' : '家用电器',
                'url' : 'www.baidu3.com'
            },{
                'text' : '手机通讯',
                'url' : 'www.baidu4.com'
            },{
                'text' : '日用百货',
                'url' : 'www.baidu4.com'
            }
        ]
    },
    'tab' : {
        'interval_time' : 5000000, 
        'hover_time' : 200, 
        'is_show_random' : true, //随机载入
        'options': [{
            'tab_title':'京东大事件'
        },{
              'tab_title':'京东促销专区'
          },{
              'tab_title':'微博'
          }]

    },
    'section1' : {
        'options' : [
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/ncl/120726_pl_01/icon-green.jpg',
                'text' : '2012年2月正式启动电子书刊业务，销售平台与智能手机/PC阅读客户端软件上线',
                'text_url' : 'www.baidu.com'
            },
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/ncl/120726_pl_01/icon-red.jpg',
                'text' : '分阶营养强化',
                'text_url' : 'www.baidu.com'
            },
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/ncl/120726_pl_01/icon-orange.jpg',
                'text' : '分阶营养强化',
                'text_url' : 'www.baidu.com'
            }
        ]

    },
    'section2' : {
        'options' : [
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/ncl/120726_pl_01/icon-green.jpg',
                'text' : '即刻加入1000日计划，领取免费大礼包',
                'text_url' : 'www.baidu.com'
            },
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/ncl/120726_pl_01/icon-red.jpg',
                'text' : '分阶营养强化',
                'text_url' : 'www.baidu.com'
            },
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/ncl/120726_pl_01/icon-orange.jpg',
                'text' : '分阶营养强化',
                'text_url' : 'www.baidu.com'
            }
        ]

    },
    'small_weibo' : {
        'id' : '1866402485',
        'name' : '京东老刘',
        'follow_imgsrc' : 'http://drmcmm.baidu.com/media/id=PWbvPWc1PHm&gp=402&time=nHnYnj6LnHbkPf.png',
        'verify_img' : 'http://drmcmm.baidu.com/media/id=P10vPjf4rHn&gp=402&time=nHnYnj6LnHbkr0.png',
        'is_display_icon':false
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */
