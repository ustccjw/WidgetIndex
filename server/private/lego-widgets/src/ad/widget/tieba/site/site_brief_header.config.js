/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.config.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/site/site_brief_header.config.js ~ 2013/04/03 13:46:13
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 10927 $
 * @description
 * site_brief_header相关的实现逻辑
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
    "intro": "作为首款中国制造的FPS网游，《反恐行动》一经推出便迅速占据时尚休闲类FPS细分市场，并融入舞蹈、变身、宠物、装扮、恋爱等休闲娱乐元素；使游戏整体风格时尚靓丽；是全球首款主打互动交友、彰显青春活力的休闲时尚FPS网游产品。",
    "gallery": [
        {
            "image_url": "//bs.baidu.com/adtest/ca10069109e726e27e3be52bf9a1a875.jpg",
            "alt": "《血战到底》MAT首部微电影",
            "rcv_url": "http://xd.xoyo.com"
        },
        {
            "image_url": "//bs.baidu.com/adtest/c49960af8249721f6c6d31be2947a973.jpg",
            "alt": "揭秘MAT十大特色玩法",
            "rcv_url": "http://xd.xoyo.com"
        },
        {
            "image_url": "//bs.baidu.com/adtest/52f35a632d5bba96c84773e23567f681.jpg",
            "alt": "金莎代言劲爆COS照曝光！",
            "rcv_url": "http://xd.xoyo.com"
        },
        {
            "image_url": "//bs.baidu.com/adtest/e82988daed27f5a4ad4e6176e512d351.jpg",
            "alt": "制作人送本兮镶钻大碟",
            "rcv_url": "http://xd.xoyo.com"
        }
    ],
    "nav_json_mockup": "[{\"text\":\"全部贴子\",\"url\":\"http://baidu.com/\"},{\"text\":\"咨询贴\",\"url\":\"http://baidu.com/\"},{\"text\":\"晒经验\",\"url\":\"http://baidu.com/\"},{\"text\":\"活动贴\",\"url\":\"http://baidu.com/\"}]",
    "nav_json": "%%GOOD_CATEGORY_JSON%%",
    // "extra_nav": [
    //     {
    //         "text": "游戏",
    //         "url": "http://tieba.baidu.com/game/index?kw=%E7%AC%91%E5%82%B2%E6%B1%9F%E6%B9%96ol",
    //         "skin": "game",
    //         "is_new": true
    //     }
    // ]
    "has_game_tab": true,
    "game_tab_url": "%%TIEBA_GAME_URL%%"
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
