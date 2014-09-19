/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/couple_left.config.js ~ 2014/02/18 12:35:01
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * couple_left的配置数据
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
        //'src': 'http://localhost:8888/projects/PL-LeftRight-flash/left.swf',
        'ipad_img': '//bs.baidu.com/adtest/0b9c3730d42402fab0669cc43c814e35.jpg',
        //'flashvars_param': '&btn=130,30,100,20&dots=150,20,200,200,102,110,35,230&btnurl=...',
        "theme": 1,
        "button": {
            "x": "100",
            "y": "100",
            "width": "90",
            "height": "30"
        },
        "button_url": "http://www.baidu.com/?1",
        "dots": [{
            "x": "100",
            "y": "50"
        }, {
            "x": "100",
            "y": "100"
        }, {
            "x": "200",
            "y": "100"
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
            "text": "一体机",
            "rcv_url": "http://baidu.com"
        }, {
            "text": "一体机",
            "rcv_url": "http://baidu.com"
        }]
    },
    "show_url": {
        "site": "www.baidu.com",
        "brand_url": "http://clkmk.baidu.com/clkmk-rcv/lnk?id=54&x=7cfd628d1b3553c4012e3334d6aa9a9620e407637355a14cf73d2f920f7ce6a4661fa0d2e6c2bdc8"
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */