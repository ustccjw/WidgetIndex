/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/site_header.config.js ~ 2013/04/03 16:47:31
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 11222 $
 * @description
 * site_header的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-8964", 
    "main_url": "http://www.baidu.com",
    "header": {
        "skin": {
            "top_url": "//bs.baidu.com/adtest/3c7a290d209f63a2c9ccb7b47ee8b454.jpg",
            "bottom_url": "//bs.baidu.com/adtest/32f4ba0838df3da94dc902011242bc96.jpg",
            "bottom_repeat": true,
            "color": "#E50011"
        },
        "banner": {
            "image_url": "//bs.baidu.com/adtest/2f4224ab292e4f06a985dd10203df0b2.jpg",
            "height": "260"
            // ,"rcv_url": "http://www.yougou.com/?utm_source=AD_jNdoflCso"
        },
        "logo_url": "//bs.baidu.com/adtest/394a34d885a2a943c8d765bbc4c79feb.jpg",
        "frs_rcv_url": "%%TIEBA_FRS_URL%%",
        "name": "飒漫画官方吧",
        // "action": {
        //     "text": "点击进入活动页",
        //     "rcv_url": "%%TIEBA_SPECIAL_URL:game%%"
        // },
        // "intro_mockup": "昨日排名1，周排名1，月排名1，会员数12345。粉丝名毅丝，一级目录体育，二级目录足球明星。主题123456个、贴子数234567、图片3456张、视频456和精品贴56个。",
        "intro": "总部设在杭州的飒舞天霁动漫有限公司是一家致力于动漫产业的务实开拓与产业链创新发展的动漫原创文化企业。公司目前主要从事原创动漫画及动漫书刊的策划与开发，拥有国内同领域最知名的漫画创作团队。策划制作的原创漫画期刊飒漫画和飒漫乐画在全国青少年读者群中具有广泛影响力。",
        "gallery": [
            {
                "image_url": "//bs.baidu.com/adtest/309c021b46f1c4870629f463b720dfa6.jpg",
                "alt": "赠阅",
                "rcv_url": "http://blog.sina.com.cn/liusamanhua"
            },
            {
                "image_url": "//bs.baidu.com/adtest/c086379bea64df8900fe88977eee4349.jpg",
                "alt": "期刊",
                "rcv_url": "http://www.samanhua.net/shoplist.aspx?type=1"
            },
            {
                "image_url": "//bs.baidu.com/adtest/881d40a0d2c8ee9aadc2f2ad8b465399.jpg",
                "alt": "单行本",
                "rcv_url": "http://www.samanhua.net/shoplist.aspx?type=2"
            },
            {
                "image_url": "//bs.baidu.com/adtest/df0411778f20be376466d65661ae7495.jpg",
                "alt": "周边",
                "rcv_url": "http://www.samanhua.net/shoplist.aspx?type=3"
            }
        ],
        "nav_json_mockup": "[{\"skin\":\"a\", \"text\":\"全部贴子\",\"url\":\"http://baidu.com/\"},{\"skin\":\"b\", \"text\":\"咨询贴\",\"url\":\"http://baidu.com/\"},{\"skin\":\"c\", \"text\":\"晒经验\",\"url\":\"http://baidu.com/\"},{\"skin\":\"d\", \"text\":\"活动贴\",\"url\":\"http://baidu.com/\"}]",
        "nav_json": "%%GOOD_CATEGORY_JSON%%",
        "extra_nav": [
            {
                "text": "游戏",
                "url": "http://tieba.baidu.com/game/index?kw=%EC%AA%C2%FE%BB%AD",
                "skin": "game",
                "is_new": true
            }
        ]
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */
