/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/site_simple_header.config.js ~ 2013/04/19 15:38:32
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 150523 $
 * @description
 * site_simple_header相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    "skin": {
        "top_url": "//bs.baidu.com/adtest/d35fff90c23383754ee6e369fd10f979.jpg",
        "bottom_url": "//bs.baidu.com/adtest/5ca71736064f19cd7b12165ac0c22716.jpg",
        "color": "#40070e"
    },
    "logo_url": "//bs.baidu.com/adtest/df1680a2f097e97e65588dbb09685a2a.jpg",
    "frs_rcv_url": "%%TIEBA_FRS_URL%%",
    "name": "可口可乐吧",
    "action": {
        "text": "点击进入活动页面",
        "rcv_url": "%%TIEBA_SPECIAL_URL:game%%"
    },
    "gallery": [
        {
            "image_url": "http://baidu.com/img/baidu_sylogo1.gif",
            "alt": "图片贴",
            "rcv_url": "%%TIEBA_PHOTO_URL%%"
        },
        {
            "image_url": "http://baidu.com/img/baidu_sylogo1.gif",
            "alt": "视频贴",
            "rcv_url": "%%TIEBA_VIDEO_URL%%"
        },
        {
            "image_url": "http://baidu.com/img/baidu_sylogo1.gif",
            "alt": "精品贴",
            "rcv_url": "%%TIEBA_GOOD_URL%%"
        },
        {
            "image_url": "http://baidu.com/img/baidu_sylogo1.gif",
            "alt": "本吧首页",
            "rcv_url": "%%TIEBA_FRS_URL%%"
        }
    ],
    "good_number": "%%GOOD_NUM%%",
    "good_frs_url": "%%TIEBA_GOOD_URL%%"
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
