/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/couple_video_switch_left.config.js ~ 2014/09/03 14:23:15
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 11222 $
 * @description
 * couple_video_switch_left的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-8964",
    "main_url": "http://www.baidu.com",
    "small_head": {
        'logoimg': {
            'logoimg': '//bs.baidu.com/adtest/72dabe2474aca353717575dccc71ed24.jpg'
        },
        'titletext': '<em>美汁源</em>人人爱果粒',
        'titleurl_rcv_url': 'http://www.baidu.com',
        "display_official_site_icon": true,
        'query': [{
            'key_word': "美汁源",
            'rcv_url': "www.baidu.com"
        }]
    },
    "flash": {
        'width': 538,
        'height': 300,
        'wmode': 'transparent',
        'is_flashvars': true,
        'src': '//bs.baidu.com/public01/2014-04/left.swf',
        'ipad_img': '//bs.baidu.com/adtest/029b9845a1acb95ecb7c27de0f6ead95.jpg',
        "theme": 0,
        "button": {
            "x": "20",
            "y": "137",
            "width": "90",
            "height": "30"
        },
        "buttonUrl": "http://www.baidu.com/?1",
        "dots": [{
            "x": "260",
            "y": "150"
        }, {
            "x": "400",
            "y": "240"
        }, {
            "x": "420",
            "y": "120"
        }]
    },
    "button_group": {
        "options": [{
            "text": "thinkpad",
            "rcv_url": "http://baidu.com"
        }, {
            "text": "商务本",
            "rcv_url": "http://baidu.com"
        }, {
            "text": "一体机",
            "rcv_url": "http://baidu.com"
        }, {
            "text": "二体机",
            "rcv_url": "http://baidu.com"
        }, {
            "text": "三体机",
            "rcv_url": "http://baidu.com"
        }]
    },
    "show_url": {
        "site": "www.baidu.com",
        "brand_url": "http://clkmk.baidu.com/clkmk-rcv/lnk?id=54&x=7cfd628d1b3553c4012e3334d6aa9a9620e407637355a14cf73d2f920f7ce6a4661fa0d2e6c2bdc8"
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
