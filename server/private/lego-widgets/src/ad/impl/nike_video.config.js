/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/nike_video.config.js ~ 2013/02/26 14:49:57
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * nike_video的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-8964", 
    "main_url": "http://c.admaster.com.cn/c/a12593,b200153688,c1341,i0,k3,m101,h",
    "background": {
        "url": "http://eiv.baidu.com/mapm2/zhouminming01/nike/video/bg.jpg",
        "color": "transparent"
    },
    "thumbnail" : {
        "url" : "javascript:void(0);",
        "image_url" : "http://eiv.baidu.com/mapm2/zhouminming01/nike/video/small.png"
    },
    "share" : {
        "options" : [
            {"type" : "sina", "name" : "新浪微博"},
            {"type" : "qqweibo", "name" : "腾讯微博"},
            {"type" : "renren", "name" : "人人网"},
            {"type" : "sohu", "name" : "搜狐微博"},
            {"type" : "kaixin", "name" : "开心网"},
            {"type" : "qqzone", "name" : "QQ空间"},
            {"type" : "douban", "name" : "豆瓣博"}
        ],
        "config" : {
            "share_link" : "http://c.admaster.com.cn/c/a12593,b200153688,c1341,i0,k3,m101,h",
            "share_text" : "#把球给我#我就能成为闪耀的新星，场下训练我挥汗如雨；到了场上，我更会尽全力封住每一个对手、拼抢每一个篮板。我准备好了，给我挑战我随时应战。来吧，#把球给我#！",
            "share_pic" : "",
            "share_site" : ""
        }
    },
    /*
    "float_image": {
        "url" : "javascript:void(0);",
        "image_url" : "http://eiv.baidu.com/mapm2/0108baoma1/lg.gif"
    },
    */
    "fwc" : {
        /*
        "width":640,
        "height":480
        */
        "width":720,
        "height":420
    },
    "flash": {
        "name" : "Nike",
        "width":720,
        "height":420,
        "src":"//bs.baidu.com/i-m-f-e/Main.swf"
    },
    "video": {
        // "url": '',
        'video_url' : '//bs.baidu.com/adtest/e8feb869001605ad8f500b1402ac1328.flv',
        'ipad_img': 'http://eiv.baidu.com/mapm2/zhouminming01/nike/video/small.png',
        'width': 640,
        'height':480,
        'is_play': true
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */
