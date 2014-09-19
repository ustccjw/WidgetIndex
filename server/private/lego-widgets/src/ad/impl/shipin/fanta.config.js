/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: fanta.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/shipin/fanta.config.js ~ 2013/02/26 14:49:57
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 150523 $
 * @description
 * nike_video的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-fanta130715", 
    "main_url": "http://fanta.qq.com/",
    "background": {
        "url": "//bs.baidu.com/adtest/11e853e3b6deb4741e860291c7eda13c.jpg",
        "color": "transparent"
    },
    "thumbnail" : {
        "url" : "javascript:void(0);",
        "image_url" : "//bs.baidu.com/adtest/4ee68ac4b121ffbce1972bf165008b3a.jpg",
        'tip' : {
            'text' : '集「芬达」密码·拯救玩动力'
        }
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
            "share_link" : "http://fanta.qq.com/",
            "share_text" : "#「芬达」密码，拯救玩动力#是时候，向平庸说不了！王国沦陷，完乐停止，唯有「芬达」密码破译这，才能拯救王国！玩伴们已经整装待发，你呢？立刻出发，开始你的英雄生涯！http://fanta.qq.com",
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
        "src":""
    },
    "video": {
        'rcv_url' : 'http://fanta.qq.com',
        'video_url' : '//bs.baidu.com/adtest/626aedfd35ea524e0bbb69565d314779.flv',
        'img_url': '//bs.baidu.com/adtest/0783907f16a22581b1fdab60e29ec315.jpg',
        'ipad_img': '//bs.baidu.com/adtest/0783907f16a22581b1fdab60e29ec315.jpg',
        'width': 720,
        'height':420,
        'is_play': true
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */
