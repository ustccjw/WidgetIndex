/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: sinaweibo.config.js 9567 2012-06-06 06:33:00Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/sinaweibo.config.js ~ 2012/06/05 12:14:49
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9567 $
 * @description
 * 演示用的配置项.
 **/

var AD_CONFIG = {
    'id' : 'ec-ma-sinaweibo',
    'main_url' : 'http://weibo.com',
    'head' : {
        'title' : '<em>新浪微博</em>-随时随地分享身边的新鲜事',
        'url' : 'http://weibo.com',
        'description' : '新浪微博(weibo.com)是极具影响力的微博，拥有超过3亿注册用户、超过30万认证用户，其中有13万多家企业与机构账户。通过140字记录，“织围脖”是网友随时随地记录生活、分享社会新鲜事的生活方式。手机微博weibo.cn立即注册新浪<b></b>微博。',
        'query':[
            {
                'key_word':'新浪微博',
                'url':'www.baidu.com'
            },
            {
                'key_word':'手机微博',
                'url':'www.baidu.com'
            }
        ],
        'logo' : '//bs.baidu.com/adtest/d66d3af0ec67e4bf27c29829b93d3040.png',
        'logo_url' : 'http://weibo.com',
        'site' : 'weibo.com'
    },
    //tab 右上角logo配置
    'logo': {
        'options' : [
            {
              'url' : 'http://weibo.com',
              'title' : '&nbsp;'
            }
        ]
    },
    //tab 头配置
    'tab_titles' : {
        'interval_time' : 5000000,
        'hover_time' : 200,
        'default_index' : 3, //默认载入的tab，从0开始
        'options': [
            {
                'tab_title': '立即注册'
            },{
                'tab_title': '微话题'
            },{
                'tab_title': '名人堂'
            },{
                'tab_title': '微吧'
            },{
                'tab_title': '微游戏'
            }
        ]
    },
    //tab 内容配置
    'tab_cons' : [
        {
            "logo" : {
                'options' : [
                    {
                        'img_url' : '//bs.baidu.com/adtest/295212074618433c6de0274bdf6baa09.png',
                        'url' : 'www.baidu.com'
                    }
                ]
            },
            "regist_form" : {
                'form' : {
                    'action' : 'http://weibo.com/signup/signup.php',
                    'method' : 'get',
                    'charset' : 'utf-8',
                    'params' : [
                        {'key' : 'from', 'value' : 'baidu/?c=spr_web_sq_baidudz_weibo_t040' }
                    ],
                    'query_name' : 'username',
                    'label_query_name' : '我的邮箱/手机'
                },
                'placeholder' : '邮箱/会员账号/手机',
                'button_text' : '立即开通'
            }
        },{
            "logo" : {
                'options' : [
                    {
                        'img_url' : '//bs.baidu.com/adtest/15de4950b9101bf6edb61bce34dc6c07.png',
                        'url' : 'www.baidu.com',
                        'text' : ''
                    }
                ]
            },
            "weibo" : {
                'id' : '1836003984',
                'follow_imgsrc' : '//bs.baidu.com/adtest/81130a35fd4dad9e36439708378eee35.png'
            },
            "hot_talk" : {
                "options" : [
                    {
                        'text' : '帅哥民警办案牺牲(112035)',
                        'text_url' : 'http://www.baidu.com',
                        'detail':[
                            {
                                'text':'江苏24岁民警遇袭身亡，女友微博晒催泪短信',
                                'url':'http://www.baidu.com'
                            }
                        ]
                    },{
                        'text' : '北京新地铁图出炉(512035)',
                        'text_url' : 'http://www.baidu.com',
                        'detail':[
                            {
                                'text':'霸州一家抗拆打倒七人，自拍现场视频引热议',
                                'url':'http://www.baidu.com'
                            }
                        ]
                    }
                ]
            },
            "top" : {
                'options': [
                    {
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '副局长举报副市长',
                        'text_url' : 'http://www.baidu.com',
                        'number': '(12144541)'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '武术世家打翻拆迁者',
                        'text_url' : 'http://www.baidu.com',
                        'number': '(12144541)'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '公安喜感航母style',
                        'text_url' : 'http://www.baidu.com',
                        'number': '(12144541)'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '何韵诗出柜女友曝光',
                        'text_url' : 'http://www.baidu.com',
                        'number': '(12144541)'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '纪许光被疑动机不纯',
                        'text_url' : 'http://www.baidu.com',
                        'number': '(12144541)'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '北京新地铁图出炉',
                        'text_url' : 'http://www.baidu.com',
                        'number': '(12144541)'
                    }
                ]
            }
        },{
            "logo" : {
                'options' : [
                    {
                        'img_url' : '//bs.baidu.com/adtest/22bc5868d5f48db63621c0179442f9b3.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '新浪个人认证<span>veritied.weibo.com</span>'
                    }
                ]
            },
            "top_impact" : {
                'top_title': "影响力排行榜",
                'options': [
                    {
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '姚晨',
                        'text_url' : 'http://www.baidu.com',
                        'number': '52.136515',
                        'status_icon' : '//bs.baidu.com/adtest/0fc259bb7e0a87521a78f511de3c39d6.png'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '平安北京',
                        'text_url' : 'http://www.baidu.com',
                        'number': '52.136515',
                        'status_icon' : '//bs.baidu.com/adtest/0fc259bb7e0a87521a78f511de3c39d6.png'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '姚晨',
                        'text_url' : 'http://www.baidu.com',
                        'number': '52.136515',
                        'status_icon' : '//bs.baidu.com/adtest/0fc259bb7e0a87521a78f511de3c39d6.png'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '姚晨',
                        'text_url' : 'http://www.baidu.com',
                        'number': '52.136515',
                        'status_icon' : '//bs.baidu.com/adtest/0fc259bb7e0a87521a78f511de3c39d6.png'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '姚晨',
                        'text_url' : 'http://www.baidu.com',
                        'number': '52.136515',
                        'status_icon' : '//bs.baidu.com/adtest/0fc259bb7e0a87521a78f511de3c39d6.png'
                    }
                ]
            },
            "top_popularity" : {
                'top_title': "人气排行榜",
                'options': [
                    {
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '姚晨',
                        'text_url' : 'http://www.baidu.com',
                        'number': '52.136515',
                        'status_icon' : '//bs.baidu.com/adtest/0fc259bb7e0a87521a78f511de3c39d6.png'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '姚晨',
                        'text_url' : 'http://www.baidu.com',
                        'number': '52.136515',
                        'status_icon' : '//bs.baidu.com/adtest/0fc259bb7e0a87521a78f511de3c39d6.png'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '平安中国',
                        'text_url' : 'http://www.baidu.com',
                        'number': '52.136515',
                        'status_icon' : '//bs.baidu.com/adtest/0fc259bb7e0a87521a78f511de3c39d6.png'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '姚晨',
                        'text_url' : 'http://www.baidu.com',
                        'number': '52.136515',
                        'status_icon' : '//bs.baidu.com/adtest/0fc259bb7e0a87521a78f511de3c39d6.png'
                    },{
                        'no_icon' : '//bs.baidu.com/adtest/af8b2e7ff19582e1a9c00d6c12bc82bd.png',
                        'text' : '姚晨',
                        'text_url' : 'http://www.baidu.com',
                        'number': '52.136515',
                        'status_icon' : '//bs.baidu.com/adtest/0fc259bb7e0a87521a78f511de3c39d6.png'
                    }
                ]
            }
        },{
            "logo" : {
                'options' : [
                    {
                        'img_url' : '//bs.baidu.com/adtest/7d14890534c64033c2702826b48721b3.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '新浪微吧<span>8.weibo.com</span>'
                    }
                ]
            },
            "images" : {
                'options' : [
                    {
                        'img_url' : '//bs.baidu.com/adtest/ec2770b6f7cf6cdeefcec948a59fc384.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '杂谈吧'
                    },{
                        'img_url' : '//bs.baidu.com/adtest/ec2770b6f7cf6cdeefcec948a59fc384.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '杂谈吧'
                    },{
                        'img_url' : '//bs.baidu.com/adtest/ec2770b6f7cf6cdeefcec948a59fc384.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '杂谈吧'
                    },{
                        'img_url' : '//bs.baidu.com/adtest/ec2770b6f7cf6cdeefcec948a59fc384.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '杂谈吧'
                    }
                ]
            },
            "top_hot" : {
                'options': [
                    {
                        'text' : '副局长举报副市长',
                        'text_url' : 'http://www.baidu.com',
                        'number': '(12144541)'
                    },{
                        'text' : '武术世家打翻拆迁者',
                        'text_url' : 'http://www.baidu.com',
                        'number': '(12144541)'
                    },{
                        'text' : '公安喜感航母style',
                        'text_url' : 'http://www.baidu.com',
                        'number': '(12144541)'
                    },{
                        'text' : '何韵诗出柜女友曝光',
                        'text_url' : 'http://www.baidu.com',
                        'number': '(12144541)'
                    },{
                        'text' : '纪许光被疑动机不纯',
                        'text_url' : 'http://www.baidu.com',
                        'number': '(12144541)'
                    },{
                        'text' : '北京新地铁图出炉',
                        'text_url' : 'http://www.baidu.com',
                        'number': '(12144541)'
                    }
                ]
            }
        },{
            "logo" : {
                'options' : [
                    {
                        'img_url' : '//bs.baidu.com/adtest/6ec9108d4e16672edc57a64f28c5eae7.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '新浪微游戏<span>game.weibo.com</span>'
                    }
                ]
            },
            "images" : {
                'options' : [
                    {
                        'img_url' : '//bs.baidu.com/adtest/ec2770b6f7cf6cdeefcec948a59fc384.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '杂谈吧'
                    },{
                        'img_url' : '//bs.baidu.com/adtest/ec2770b6f7cf6cdeefcec948a59fc384.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '杂谈吧'
                    },{
                        'img_url' : '//bs.baidu.com/adtest/ec2770b6f7cf6cdeefcec948a59fc384.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '杂谈吧'
                    },{
                        'img_url' : '//bs.baidu.com/adtest/ec2770b6f7cf6cdeefcec948a59fc384.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '杂谈吧'
                    },{
                        'img_url' : '//bs.baidu.com/adtest/ec2770b6f7cf6cdeefcec948a59fc384.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '杂谈吧'
                    },{
                        'img_url' : '//bs.baidu.com/adtest/ec2770b6f7cf6cdeefcec948a59fc384.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '杂谈吧'
                    },{
                        'img_url' : '//bs.baidu.com/adtest/ec2770b6f7cf6cdeefcec948a59fc384.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '杂谈吧'
                    },{
                        'img_url' : '//bs.baidu.com/adtest/ec2770b6f7cf6cdeefcec948a59fc384.png',
                        'url' : 'http://www.baidu.com',
                        'text' : '杂谈吧'
                    }
                ]
            }
        }
    ]
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
