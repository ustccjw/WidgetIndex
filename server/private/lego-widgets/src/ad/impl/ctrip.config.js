/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: ctrip.config.js 9567 2012-06-06 06:33:00Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/ctrip.config.js ~ 2012/06/05 12:14:49
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9567 $
 * @description
 * 演示用的配置项.
 **/

var AD_CONFIG = {
    'id' : 'ec-ma-ctrip130716',
    'hmjs_id' : '',
    'main_url' : 'http://www.ctrip.com',
    'head' : {
        'title' : '<em>携程旅行网</em>:酒店预订,机票预订,旅游度假就上携程网!',
        'rcv_url' : 'http://www.ctrip.com',
        'logo' : '//bs.baidu.com/adtest/898236bfc782a53cc136c6811ad5a031.jpg',
        'logo_rcv_url' : 'http://www.ctrip.com',
        'description_rcv_html' : '携程<a kw="1" target="_blank" href="http://www.ctrip.com/adredirect.asp?keyword=hotel&src=baidu81">酒店预订</a>、<a kw="1" target="_blank" href="http://www.ctrip.com/adredirect.asp?keyword=flight&src=baidu81">机票预订</a>、<a kw="1" target="_blank" href="http://www.ctrip.com/adredirect.asp?keyword=vacation&src=baidu81">旅游度假</a>一站式解决，<a kw="1" target="_blank" href="http://www.ctrip.com/adredirect.asp?keyword=index&src=baidu81">月月狂减天天低价</a>，<a kw="1" target="_blank" href="http://www.ctrip.com/adredirect.asp?keyword=hotel&src=baidu81">酒店预订</a>保证低价，景点门票1000万大返现。酒店、机票折扣低至2折起，官网预订有保障，部分热门航线享免费接送机服务，热线全天候为您服务，立即<a kw="1" target="_blank" href="http://www.ctrip.com/adredirect.asp?keyword=index&src=baidu81">访问ctrip.com</a>！',
        'site' : 'www.ctrip.com'
    },
    'ctrip': {
        data_city: '//bs.baidu.com/adtest/ccc23ca9bd535e43a47c73a6bf59f629.js',
        types: [
            {
                title: '主题：',
                items: [
                    {
                        'text': '摄影',
                        'rcv_url': 'http://www.baidu.com'
                    },{
                        'text': '山水',
                        'rcv_url': 'http://www.baidu.com'
                    },{
                        'text': '购物',
                        'rcv_url': 'http://www.baidu.com'
                    },{
                        'text': '海岛',
                        'rcv_url': 'http://www.baidu.com'
                    },{
                        'text': '自驾游',
                        'rcv_url': 'http://www.baidu.com'
                    }
                ]
            },{
                title: '处境：',
                items: [
                    {
                        'text': '港澳台',
                        'rcv_url': 'http://www.baidu.com'
                    },{
                        'text': '泰国',
                        'rcv_url': 'http://www.baidu.com'
                    },{
                        'text': '日本',
                        'rcv_url': 'http://www.baidu.com'
                    },{
                        'text': '韩国',
                        'rcv_url': 'http://www.baidu.com'
                    },{
                        'text': '美国',
                        'rcv_url': 'http://www.baidu.com'
                    }
                ]
            },{
                title: '特色：',
                items: [
                    {
                        'text': '签证',
                        'rcv_url': 'http://www.baidu.com'
                    },{
                        'text': '用车服务',
                        'rcv_url': 'http://www.baidu.com'
                    },{
                        'text': '当地游',
                        'rcv_url': 'http://www.baidu.com'
                    },{
                        'text': '邮轮',
                        'rcv_url': 'http://www.baidu.com'
                    }
                ]
            }
        ]
    },
    'table': {
        'tbody': [
            [
                {
                    'text': "城市酒店预订"
                }, {
                    'text': "品牌酒店预订"
                }, {
                    'text': "特价机票1.5折起"
                }, {
                    'text': "旅游酒店预订"
                }, {
                    'text': "特别优惠"
                }
            ],
            [
                {
                    'text': "上海酒店",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "如家快捷酒店",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "上海特价机票",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "青岛酒店",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "欧洲旅游",
                    'rcv_url': "http://www.ctrip.com"
                }
            ],
            [
                {
                    'text': "北京酒店",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "汉庭快捷酒店",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "北京特价机票",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "厦门酒店",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "惠选酒店",
                    'rcv_url': "http://www.ctrip.com"
                }
            ],
            [
                {
                    'text': "杭州酒店",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "锦江之星酒店",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "广州特价机票",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "三亚酒店",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "携程团购",
                    'rcv_url': "http://www.ctrip.com"
                }
            ],
            [
                {
                    'text': "南京酒店",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "莫泰168酒店",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "厦门特价机票",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "大连酒店",
                    'rcv_url': "http://www.ctrip.com"
                }, {
                    'text': "携程火车票",
                    'rcv_url': "http://www.ctrip.com"
                }
            ]
        ]
    }
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
