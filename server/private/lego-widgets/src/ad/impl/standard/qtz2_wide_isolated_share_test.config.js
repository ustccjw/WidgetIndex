/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/qtz2.config.js ~ 2014/08/26 16:38:07
 * @author hekai02@baidu.com (Kyle He)
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
            }
            /*,
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
        "options": [{
            "text": "即刻加入x计划，领取免费大礼包分阶营养强化",
            "text_rcv_url": "http://www.baidu.com"
        }, {
            "text": "打败变异人分阶营养强化分阶营养强化",
            "text_rcv_url": "http://www.baidu.com"
        }, {
            "text": "分阶营养强化分阶营养强化分阶营养强化分阶营养强化",
            "text_rcv_url": "http://www.baidu.com"
        }]
    },
    "baidu_share": {
        "cfg": {
            "true": {
                'prefix_txt': '分享到：',
                'options': [
                    {
                        'platform': {
                            'wechat': {
                                'title': '微信',
                                'api': 'http://qrcodegenerator.newoffline.bae.baidu.com/',
                                'params': {
                                    'size': '6',
                                    'level': 'Q',
                                    'margin': '0'
                                },
                                'qrcode': {
                                    'title': '分享到微信朋友圈',
                                    'tip': '打开微信，点击底部的“发现”，使用“扫一扫”即可将网页分享至朋友圈。',
                                    'type': {
                                        'url': {
                                            'url': 'http://weixin.qq.com/r/d3WZgVzEuwHErRji9yBl'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        'platform': {
                            'weibo': {
                                'title': '新浪微博',
                                'api': 'http://service.weibo.com/share/share.php',
                                'params': {
                                    'url': 'http://www.hahaha.com',
                                    'title': 'share title',
                                    'pic': 'http://ww3.sinaimg.cn/bmiddle/62013dabgw1ejosxpgb12j20sg0zj79g.jpg',
                                    'searchPic': 'false',
                                    'appkey': '1343713053'
                                }
                            }
                        } 
                    },
                    {
                        'platform': {
                            'qqweibo': {
                                'title': '腾讯微博',
                                'api': 'http://share.v.t.qq.com/index.php',
                                'params': {
                                    'c': 'share',
                                    'a': 'index',
                                    'url': 'http://www.hahaha2.com',
                                    'title': 'hahahahha-title',
                                    'appkey': '801cf76d3cfc44ada52ec13114e84a96',
                                    'pic': 'http://ww3.sinaimg.cn/bmiddle/62013dabgw1ejosxpgb12j20sg0zj79g.jpg'
                                }
                            }
                        } 
                    },
                    {
                        'platform': {
                            'douban': {
                                'title': '豆瓣',
                                'api': 'http://www.douban.com/share/service',
                                'params': {
                                    'href': 'http://www.hahaha2.com',
                                    'name': 'share title',
                                    'text': 'share description'
                                }
                            }
                        } 
                    },
                    {
                        'platform': {
                            'wechat': {
                                'title': '微信',
                                'api': 'http://qrcodegenerator.newoffline.bae.baidu.com/',
                                'params': {
                                    'size': '6',
                                    'level': 'Q',
                                    'margin': '0'
                                },
                                'qrcode': {
                                    'title': '分享到微信朋友圈23333',
                                    'tip': '打开微信，点击底部的“发现”，使用“扫一扫”即可将网页分享至朋友圈。',
                                    'type': {
                                        'image': {
                                            'url': 'http://ecma.bdimg.com/adtest/810f7335690764b3305d9563be376b47.JPG'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        'platform': {
                            'renren': {
                                'title': '从网',
                                'api': 'http://widget.renren.com/dialog/share',
                                'params': {
                                    'resourceUrl': 'http://www.hahaha444.com',
                                    'srcUrl': 'http://www.hahaha444.com',
                                    'title': 'share title',
                                    'pic': 'http://ww3.sinaimg.cn/bmiddle/62013dabgw1ejosxpgb12j20sg0zj79g.jpg',
                                    'description': '汪汪汪，汪汪汪，汪汪汪。汪汪汪汪汪，汪汪汪；汪汪汪汪汪汪；汪汪汪汪汪汪！汪汪汪汪汪汪汪，汪汪汪汪汪汪。汪汪汪汪汪？汪汪汪汪汪汪汪？！汪汪汪汪汪汪汪汪汪汪。“汪汪汪汪汪汪汪汪汪汪汪”，汪汪汪汪，“汪汪汪汪汪汪汪汪汪汪汪汪”。汪汪汪汪汪汪汪汪汪。'
                                }
                            }
                        } 
                    }
                ]
            }
        }
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */