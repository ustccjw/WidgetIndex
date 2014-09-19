/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: normal_container.config.js 10927 2012-08-05 07:35:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/fanxueliang.config.js ~ 2012/08/27 19:32:08
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * normal_container相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    'image' : {
        'width' : 175,
        'height' : 300,
        'ipad_link_rcv_url' : 'http://www.baidu.com',
        'ipad_img' : 'http://eiv.baidu.com/mapm2/caijingzazhi/121106_pl_01/175.jpg',
        'rcv_url' : 'http://www.baidu.com',
        'src':'http://eiv.baidu.com/mapm2/caijingzazhi/121106_pl_01/175.gif'
    },
    'share' : {
        'options' : [
            {"type" : "sina", "name" : "新浪微博"},
            {"type" : "qqweibo", "name" : "腾讯微博"},
            //{"type" : "renren", "name" : "人人网"},
            {"type" : "sohu", "name" : "搜狐微博"},
            //{"type" : "kaixin", "name" : "开心网"},
            {"type" : "douban", "name" : "豆瓣博"}
        ],
        "config" : {
            "share_link" : "http://langdong823.beijing-hyundai.com.cn/",
            "share_text" : "朗动绝密任务之全民搜索火热进行中！寻找你身边的朗动！发布与朗动有关的图片微博，并@三位好友，同时关注北京现代官方微博，赶快参与赢大奖！",
            "share_pic" : "",
            "share_site" : ""
        }
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
