/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/site/site_simple_header.config.js ~ 2013/04/19 15:38:32
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 150523 $
 * @description
 * site_simple_header相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    "skin": {
        "top_url": "//bs.baidu.com/adtest/35b244782111920b46332ce8fcd1e6db.jpg",
        // "bottom_url": "//bs.baidu.com/adtest/d597621b87d34bd2231937a954e55577.jpg",
        "bottom_repeat": {
            // "true": {
            //     "bottom_url": "//bs.baidu.com/adtest/d597621b87d34bd2231937a954e55577.jpg"
            // }
            "false": {
                "bottom_url": "//bs.baidu.com/adtest/d597621b87d34bd2231937a954e55577.jpg"
            }
        },
        "color": "#E5E5E5"
    },
    "banner": {
        "image_url": "//bs.baidu.com/adtest/f0af096345df30eff70acb78880a0d8e.jpg",
        "height": "260"
        ,"rcv_url": "http://a751.oadz.com/link/C/751/771355/-erjFzGLtTfSsKobnLu6BX5-CSU_/p00b/0/xd.xoyo.com"
    },
    "logo_url": "//bs.baidu.com/adtest/36cd68c808b8ef5990af9de2c7c09eff.jpg",
    "frs_rcv_url": "%%TIEBA_FRS_URL%%",
    "name": "反恐行动吧",
    // "action": {
    //     "text": "点击进入活动页",
    //     "rcv_url": "%%TIEBA_SPECIAL_URL:game%%"
    // },
    // "intro_mockup": "昨日排名1，周排名1，月排名1，会员数12345。粉丝名毅丝，一级目录体育，二级目录足球明星。主题123456个、贴子数234567、图片3456张、视频456和精品贴56个。",
    "nav_json_mockup": "[{\"text\":\"全部贴子\",\"url\":\"http://baidu.com/\"},{\"text\":\"咨询贴\",\"url\":\"http://baidu.com/\"},{\"text\":\"晒经验\",\"url\":\"http://baidu.com/\"},{\"text\":\"活动贴\",\"url\":\"http://baidu.com/\"}]",
    "nav_json": "%%GOOD_CATEGORY_JSON%%"
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
