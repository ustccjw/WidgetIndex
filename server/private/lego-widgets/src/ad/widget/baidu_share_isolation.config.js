/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/baidu_share_isolation.config.js ~ 2014/08/25 12:59:48
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * baidu_share_isolation相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    'prefix_txt': '分享到：',
    'options': [
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
};



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
