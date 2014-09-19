/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: section.config.js 17777 2013-02-22 06:01:04Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/jn/demo/section.config.js ~ 2012/08/08 21:41:35
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 17777 $
 * @description
 * section相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    //是否显示默认栏目色块
    'display_default_icon': true,
    'options' : [
        {
            'icon_url' : 'http://eiv.baidu.com/mapm2/img/icon-green.jpg',
            'text' : '即刻加入1000日计划，领取免费大礼包',
            'text_rcv_url' : 'www.baidu.com',
            'iframe':{
                'height':78,
                'width':499,
                'src':'http://210.51.46.184/apply3/public/html/_5.html'
            }
        },
        {
            'icon_url' : 'http://eiv.baidu.com/mapm2/img/icon-red.jpg',
            'text' : '分阶营养强化',
            'text_rcv_url' : 'www.baidu.com',
            'detail':[
                {
                    'text':'宝宝不同阶段有不同的营养需求，快来一探究竟！',
                    'rcv_url':'http://www.baidu.com'
                },{
                    'text':'宝宝不同阶段有不同的营养需求',
                    'rcv_url':'http://www.baidu.com'
                }
            ]
        },
        {
            'icon_url' : 'http://eiv.baidu.com/mapm2/img/icon-yellow.jpg',
            'text' : '分阶营养强化',
            'text_rcv_url' : 'www.baidu.com'
        },
        {
            'icon_url' : 'http://eiv.baidu.com/mapm2/img/icon-purple.jpg',
            'text' : '分阶营养强化',
            'text_rcv_url' : 'www.baidu.com'
        }
    ]

};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
