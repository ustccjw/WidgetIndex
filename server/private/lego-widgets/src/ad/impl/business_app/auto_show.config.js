/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/business_app/auto_show.config.js ~ 2013/03/13 14:14:29
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * auto_show的配置数据
 **/

var AD_CONFIG = {
    "id": "pl-business-app-auto-show-",
    "main_url": "http://www.baidu.com",
    'tab': {
        'interval_time' : 9999999999,
        'hover_time' : 9999999999,
        'li_width': 250,
        'default_index': 0,
        'options': [{
            'tab_title': '网上展厅'
        },{
            'tab_title': '品牌信息'
        }]
    },
    'select_label': '请选择参展车型：',
    'video': {
        // 'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
        // 'video_url' : 'http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv',
        // 'ipad_img': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
        'width': 370,
        'height': 240
    },
    'proxyUrl': "http://eiv.baidu.com/mapm2/zhouminming01/business_app/cars/auto_show_proxy.final.html"
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */
