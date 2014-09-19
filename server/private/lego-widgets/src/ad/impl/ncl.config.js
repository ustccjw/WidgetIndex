/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/ncl.config.js ~ 2013/01/17 13:02:17
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * ncl的配置数据
 **/

var AD_CONFIG = {
    'slider': {
        'width': 220, //图片宽度
        'height': 190, //图片高度
        'delay': 200, //切换选择时的延时响应时间
        'interval_time': 5000, //自动切换时间间隔 =0表示不自动切换
        'mode': 'horizontal', //'mode':'vertical'|'horizontal'|'normal' 图片展示模式：垂直滚动、水平滚动、无动画效果
        'options': [
            {
                'img_url':'http://ecmc.bdimg.com/adtest/d415c84d91052249934ee4b5ec6ad256.jpg',
                'rcv_url':'http://www.baidu.com'
            },
            {
                'img_url':'http://ecmc.bdimg.com/adtest/3f5e488b77baa72a80f7c80ef9260090.jpg',
                'rcv_url':'http://www.baidu.com'
            },
            {
                'img_url':'http://ecmc.bdimg.com/adtest/d415c84d91052249934ee4b5ec6ad256.jpg',
                'rcv_url':'http://www.baidu.com'
            },
            {
                'img_url':'http://ecmc.bdimg.com/adtest/3f5e488b77baa72a80f7c80ef9260090.jpg',
                'rcv_url':'http://www.baidu.com'
            }
        ]
    },
    'head': {
        'titletext' : '安利<em>纽崔莱</em>网站',
        'titleurl_rcv_url' : 'http://www.baidu.com',
        'description_rcv_html' : '自1854年以来,代代相传至今的路易威登,以卓越品质、杰出创意和精湛工艺成为时尚旅行艺术的象征.产品包括...',
        'site' : 'www.louisvuitton.cn'
    },
    'section': {
        'options': [
            {
                'text' : '即刻加入1000日计划，领取免费大礼包',
                'text_rcv_url' : 'http://www.baidu.com'
            },
            {
                'text' : '即刻加入999日计划，领取免费大礼包',
                'text_rcv_url' : 'http://www.baidu.com'
            },
            {
                'text' : '即刻加入888日计划，领取免费大礼包',
                'text_rcv_url' : 'http://www.baidu.com'
            }
        ]
    },
    'tab0': {
        'img': {
            'src' : 'http://eiv.baidu.com/mapm2/niucuilai/131101_pl_01/tab1.jpg',
            'rcv_url' : 'http://www.baidu.com'
        },
        'section': {
            'options': [
                {
                    'text' : '即刻加入1000日计划，领取免费大礼包',
                    'text_rcv_url' : 'http://www.baidu.com',
                    'detail':[
                        {
                            'text':'宝宝不同阶段sssssssssssssss有不同的营养需求，快来一探究竟！',
                            'rcv_url':'http://www.baidu.com'
                        }
                    ]
                }
            ]
        },
        'kws': {
            'options': [
                {
                    'text' : '蛋白质奶粉介绍',
                    'text_rcv_url' : 'http://www.baidu.com'
                },
                {
                    'text' : '优质早餐食谱',
                    'text_rcv_url' : 'http://www.baidu.com'
                },
                {
                    'text' : 'APP应用',
                    'text_rcv_url' : 'http://www.baidu.com'
                }
            ]
        }
    },
    'tabs': [
        {
            'img': {
                'src' : 'http://eiv.baidu.com/mapm2/niucuilai/131101_pl_01/tab2.jpg',
                'rcv_url' : 'www.baidu.com'
            },
            'section': {
                'options': [
                    {
                        'text' : '即刻加入1000日计划，领取免费大礼包',
                        'text_rcv_url' : 'www.baidu.com',
                        'detail':[
                            {
                                'text':'宝宝不同阶段sssssssssssssss有不同的营养需求，快来一探究竟！',
                                'rcv_url':'http://www.baidu.com'
                            }
                        ]
                    },
                    {
                        'text' : '即刻加入1000日计划，领取免费大礼包',
                        'text_rcv_url' : 'www.baidu.com',
                        'detail':[
                            {
                                'text':'宝宝不同阶段sssssssssssssss有不同的营养需求，快来一探究竟！',
                                'rcv_url':'http://www.baidu.com'
                            }
                        ]
                    }
                ]
            }
        },
        {
            'img': {
                'src' : 'http://eiv.baidu.com/mapm2/niucuilai/131101_pl_01/tab3.jpg',
                'rcv_url' : 'www.baidu.com'
            },
            'section': {
                'options': [
                    {
                        'text' : '即刻加入1000日计划，领取免费大礼包',
                        'text_rcv_url' : 'www.baidu.com',
                        'detail':[
                            {
                                'text':'宝宝不同阶段有sssssssssssssss不同的营养需求，快来一探究竟！',
                                'rcv_url':'http://www.baidu.com'
                            }
                        ]
                    },
                    {
                        'text' : '即刻加入1000日计划，领取免费大礼包',
                        'text_rcv_url' : 'www.baidu.com',
                        'detail':[
                            {
                                'text':'宝宝不同阶段sssssssssssssss有不同的营养需求，快来一探究竟！',
                                'rcv_url':'http://www.baidu.com'
                            }
                        ]
                    }
                ]
            }
        }
    ],
    'tab_head': {
        'width': 510,
        'interval_time': 5000,
        'hover_time': 250,
        'li_margin': 10,
        'li_border_width': 0,
        'options': [
            {
                'tab_title': '植物的力量'
            },
            {
                'tab_title': '蛋白质一勺'
            },
            {
                'tab_title': '纽崔莱的故事'
            }
        ]
    },
    'buttons': {
        'options': [
            {
                'text' : '纽崔莱故事',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '植物营养素',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '倍力健',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '蛋白质粉',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '产品列表',
                'rcv_url' : 'http://www.baidu.com'
            }
        ]
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */
