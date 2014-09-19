/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/old/qtz_v2.config.js ~ 2013/10/21 14:32:39
 * @author leeight(liyubei@baidu.com),fanxueliang(fanxueliang@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
var AD_CONFIG = {
  "root": {
    "file_type": {
      "image": {
        "src": "http://dummyimage.com/175x300"
      }
    },
    "click_rcv_url": "http://www.google.com",
    "is_show_share": {
      "true": {
        "display_more": false,
        "display": true,
        "type": {
            "weixin": true,
            "tsina": true,
            "tqq": true,
            "more": true
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

/**
var AD_CONFIG = {
  "root": {
    "file_type": {
      "flash": {
        "src": "http://eiv.baidu.com/mapm2/benchi/130925_pl_02/175.swf",
        "ipad_img_src": "http://dummyimage.com/175x300"
      }
    },
    "click_rcv_url": "",
    "is_show_share": {
      "true": {
        "config": {
          "bdText": "你好水电费水电费",
          "bdPic": "http://dummyimage.com/175x300",
          "url": "http://dummyimage.com/175x300",
        },
        "options": [
          {
            "type": "bds_tsina"
          }
        ]
      }
    }
  }
}
*/

/**
var AD_CONFIG = {
  "root": {
    "file_type": {
      "image": {
        "src": ""
      }
    },
    "click_rcv_url": "",
    "is_show_share": {
      "false": {}
    }
  }
}
*/

/**
var AD_CONFIG = {
  "root": {
    "file_type": {
      "flash": {
        "src": "",
        "ipad_img_src": ""
      }
    },
    "click_rcv_url": "",
    "is_show_share": {
      "false": {}
    }
  }
}
*/


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
