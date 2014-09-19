/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/qtz2_wide_v2.config.js ~ 2013/10/25 21:41:56
 * @author liyubei@baidu.com (liyubei),fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * qtz2的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-8964",
    "main_url": "http://www.baidu.com",
    "banner": {
        "type": {
            "image": {
                "image_url": "http://dummyimage.com/259x194"
            }/*,
            "flash": {
                "width": 259,
                "height": 194,
                "src": "http://dummyimage.com/259x194",
                "ipad_img": "http://dummyimage.com/259x194/000/fff?text=iPad"
            }*/
        },
        "rcv_url": "http://www.baidu.com/?l=banner"
    },
    "links": {
        "options": [
            {
                "text": "即刻加入x计划，领取免费大礼包分阶营养强化",
                "text_rcv_url": "http://www.baidu.com"
            },
            {
                "text": "打败变异人分阶营养强化分阶营养强化",
                "text_rcv_url": "http://www.baidu.com"
            },
            {
                "text": "分阶营养强化分阶营养强化分阶营养强化分阶营养强化",
                "text_rcv_url": "http://www.baidu.com"
            }
        ]
    },
    "baidu_share": {
      "cfg": {
        "true": {
            "display": true,
            "type": {
                "weixin": true,
                "tsina": true,
                "tqq": true,
                "renren": true
            },
            "common": {
                "bdUrl": "http://langdong823.beijing-hyundai.com.cn/",
                "bdDesc": "自定义分享摘要",
                "bdText": "自定义分享内容",
                "bdPic": "http://www.baidu.com/img/baidu_sylogo1.gif"
            }
        }
      }
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */