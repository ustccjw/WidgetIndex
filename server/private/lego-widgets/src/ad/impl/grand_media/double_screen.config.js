/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/grand_media/double_screen.config.js ~ 2014/06/05 15:45:19
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * double_screen的配置数据
 **/

var AD_CONFIG = {
    "config": {
        "mobile_url": "http://0.0.0.0-qingpai.baidu.com.r.bae.baidu.com:8082/"
    },
    "image": {
        'image_url' : '//bs.baidu.com/adtest/12810c75677ac5f77fed180e165c280d.jpg',
        'image_rcv_url': '//bs.baidu.com/lego-mat/qingpai.html',
        'connect_image_url' : '//bs.baidu.com/adtest/ab90cd5e31836d46ee96baed12bf699b.jpg',
        'callback_image_url': '//bs.baidu.com/adtest/d4a09554f2eb8a4898c58f1334d485bc.jpg',
        'use_hover': true,//是否使用隐藏型
        'blink': true,//是否闪啊闪
        'tip_pos': 'right',//二维码在底图上的位置'left':左侧, 'right':右侧
        'tip': {
            'text': '扫描二维码有惊喜'
        },
        'hover_tip': {
            'title': '扫一扫',
            'description': '试驾车，赢奖品，端午保养大礼包'
        }
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
