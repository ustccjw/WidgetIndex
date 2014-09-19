/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: qtzflashlink.config.js 11222 2012-08-20 02:53:59Z DestinyXie $
 *
 **************************************************************************/



/**
 * src/ad/impl/qtz/qtzflashlink.config.js ~ 2012/08/27 15:10:44
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 11222 $
 * @description
 * qtzflashlink的配置数据
 **/

var AD_CONFIG = {
    'id' : 'ec-ma-8964',
    'flash' : {
        'width':220,
        'height':164,
        'ipad_link_rcv_url' : 'http://www.baidu.com',
        'ipad_img' : 'http://eiv.baidu.com/mapm2/dazhong/120321_plmain_01/sp.jpg',
        'link_rcv_url' : 'http://www.baidu.com/',
        'src':'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/float2.swf'
    },
    'link_list' : {
        'options' : [
            {
              'url' : 'http://www.baidu.com',
              'title' : '助力全新桑塔纳'
            },
            {
              'url' : 'http://www.baidu.com',
              'title' : '全球首发庆典'
            },
            {
              'url' : 'http://www.baidu.com',
              'title' : '传奇之旅'
            },
            {
              'url' : 'http://www.baidu.com',
              'title' : '传奇微影音'
            }
        ]
    },
    //删除该属性和上面的逗号则不显示分享部分
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

}


/* vim: set ts=4 sw=4 sts=4 tw=100: */
