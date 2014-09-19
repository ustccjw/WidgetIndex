/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/tong_yi.config.js ~ 2013/08/28 15:23:22
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * tong_yi的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-tong-yi", //物料id
    "main_url": "http://www.baidu.com",//监控地址
    "hmjs_id": "123456133",//精算代码
    "left_video": [
        {
            'rcv_url': 'http://www.baidu1.com/',//视频点击跳转地址
            'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',//首屏图片
            'video_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.flv',//视频地址
            'ipad_img': 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg', //在ipad下点击视频替代图片
            'width': 220,
            'height': 190
        },
        {
            'rcv_url': 'http://www.baidu2.com/',
            'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
            'video_url' : '//bs.baidu.com/adtest/e8feb869001605ad8f500b1402ac1328.flv',
            'ipad_img': 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg', //在ipad下点击视频替代图片
            'width': 220,
            'height': 190
        },
        {
            'rcv_url': 'http://www.baidu3.com/',
            'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
            'video_url' : 'http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp.flv',
            'ipad_img': 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg', //在ipad下点击视频替代图片
            'width': 220,
            'height': 190
        }
    ],
    "small_head": {
        'titletext' : '<em>一二三四五六</em>七八九十一二三四五',//标题
        'titleurl_rcv_url' : 'http://www.baidu.com',//标题跳转地址
        'description_rcv_html' : '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',//标题描述
        'image_group_head' : {//3小图 图片地址
            'options':[
                {
                    'imgsrc':'http://eiv.baidu.com/mapm2/encore/h1_img1.jpg'
                },{
                    'imgsrc':'http://eiv.baidu.com/mapm2/encore/h1_img1.jpg'
                },{
                    'imgsrc':'http://eiv.baidu.com/mapm2/encore/h1_img1.jpg'
                }
            ]
        },
        'site' : 'www.minutemaid.com.cn'//
    },
    "tab": {
        'interval_time' : 50000000, //自动切换tab时间间隔
        'hover_time' : 200,
        'auto_li_width': true,
        'default_index' : 0, //默认载入的tab，从0开始
        'options': [
            {
                'tab_title': '一二三四五六'
            },
            {
                'tab_title': '一二三四五六七八九十一二'
            },
            {
                'tab_title': '一二三四五六七八九十一二'
            }
        ]
    },
    "small_weibo": {
        'id' : '1924007153',
        'name' : 'Burberry',
        'weibo_context_length' : '180',
        'follow_imgsrc' : '//bs.baidu.com/adtest/2c8c162a5e2d3f6678daa90a13407cdd.jpg',
        'verify_img' : 'http://eiv.baidu.com/mapm2/duqusheng/ceshi/weibo/identificationImg.png',
        'is_display_icon':false
    },
    "tab2": {
        'pro_img_url' : '//bs.baidu.com/adtest/c9991a8e7fb004732a7f66110b08e805.gif',
        'pro_rcv_url' : 'http://www.dell.com.cn',
        'des_title' : '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一',
        'des_title_rcv_url' : 'http://www.baidu.com.cn'
    },
    "tab3": {
        'pro_img_url' : '//bs.baidu.com/adtest/c9991a8e7fb004732a7f66110b08e805.gif',
        'pro_rcv_url' : 'http://www.dell.com.cn',
        'des_title' : '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一',
        'des_title_rcv_url' : 'http://www.baidu.com.cn'
    },
    "button_group": {
        'options' : [
            {
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu1.com'
            },
            {
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu2.com'
            },
            {
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu3.com'
            },
            {
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu4.com'
            }
        ]
    }
};