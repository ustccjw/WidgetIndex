/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/tian_long_ba_bu.config.js ~ 2013/11/20 10:25:28
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * tian_long_ba_bu的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-8964", 
    "main_url": "http://www.baidu.com",
    "hmjs_id": "123456133",//精算代码
    "left_video": {
        'rcv_url': 'http://www.baidu.com/',//视频点击跳转地址
        'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',//首屏图片
        'video_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.flv',//视频地址
        'ipad_img': 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg', //在ipad下点击视频替代图片
        'width': 220,
        'height': 190
    },
    "small_head": {
        'titletext' : '<em>一二三四五六</em>七八九十一二三四五',//标题
        'titleurl_rcv_url' : 'http://www.baidu.com',//标题跳转地址
        'description_rcv_html' : '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',//标题描述
        'image_group_head' : {//3小图 图片地址
            'options':[
                {
                    'imgsrc':'http://eiv.baidu.com/mapm2/encore/h1_img1.jpg',
                    'img_rcv_url' : 'http://www.baidu.com'
                },{
                    'imgsrc':'http://eiv.baidu.com/mapm2/encore/h1_img1.jpg',
                    'img_rcv_url' : 'http://www.baidu.com'
                },{
                    'imgsrc':'http://eiv.baidu.com/mapm2/encore/h1_img1.jpg',
                    'img_rcv_url' : 'http://www.baidu.com'
                }
            ]
        },
        'site' : 'www.minutemaid.com.cn'
    },
    "button_group": {
        'options' : [
            {
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu.com'
            },
            {
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu.com'
            },
            {
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu.com'
            },
            {
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu.com'
            },
            {
                'text' : '一二三四五',
                'rcv_url' : 'http://www.baidu.com'
            }
        ]
    },
    'img_cartoon': {
        'image_width': 92,
        'image_margin': 4,
        'options' : [{
            'imgsrc' : '//bs.baidu.com/adcoup-mat/66c68da0-54f1-40c7-9c69-7cef862d9da8.jpg',
            'imgurl_rcv_url' : 'http://www.baidu.com'
        },{
            'imgsrc' : '//bs.baidu.com/adcoup-mat/d98a5da5-e6f1-44d2-9f5f-c48d7a31c7ff.jpg',
            'imgurl_rcv_url' : 'http://www.baidu.com'
        },{
            'imgsrc' : '//bs.baidu.com/adcoup-mat/0302d634-b293-478d-8473-370b2863785d.jpg',
            'imgurl_rcv_url' : 'http://www.baidu.com'
        },{
            'imgsrc' : '//bs.baidu.com/adcoup-mat/70144079-0390-4cb7-be74-b2a09ef4ca59.jpg',
            'imgurl_rcv_url' : 'http://www.baidu.com'
        },{
            'imgsrc' : '//bs.baidu.com/adcoup-mat/8a716667-2272-4d8c-8bc7-98b06746cc37.jpg',
            'imgurl_rcv_url' : 'http://www.baidu.com'
        }],
        'left_arrow' : '//bs.baidu.com/adtest/8b1b66be87032cc542c56d66f380e576.jpg',
        'right_arrow' : '//bs.baidu.com/adtest/9f8dbcffdf8268873f2f0180dfb9e082.jpg'
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
