/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: wangyi.config.js 9567 2012-06-06 06:33:00Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/wangyi.config.js ~ 2012/06/05 12:14:49
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9567 $
 * @description
 * 演示用的配置项.
 **/

var AD_CONFIG = {
    'id' : 'ec-ma-wangyi120718',
    'main_url' : 'http://www.163.com',
    "head" : {
        "logo" : "http://fanxueliang.fe.baidu.com/163/logo.png", //看客图片地址
        "logo_url" : "http://www.163.com",//看客图片跳转地址
        "logo_title" : "看客",//看客图片跳转地址
        "title" : "<em>网易</em>163-有态度的门户",//专区标题文字 （其中红色部分“网易”请用“<em>网易</em>”代替）
        "url" : "http://www.163.com",//专区标题跳转地址
        "list" : {
            "options" : [{   //列表 为4条
                    "text" : "陕西被强制...", //列表描述文字
                    "url" : "http://www.163.com"   //列表跳转地址
                },{
                    "text" : "奥迪女招警车...",
                    "url" : "http://www.163.com"
                },{
                    "text" : "主办方回应...",
                    "url" : "http://www.163.com"
                },{
                    "text" : "甘肃永登为...",
                    "url" : "http://www.163.com"
                }
            ]
        },
        'site' : 'www.dell.com.cn'
    },
    "mail" : {
        "mail_logo" : "http://eiv.baidu.com/mapm2/img/163/mail_logo.png",
        "mail_logo_url" : "http://mail.163.com/",
        "regist_text" : "注册",
        "regist_url" : "http://reg.email.163.com/mailregAll/reg0.jsp?from=baidu", //注册地址
        "action" : "https://reg.163.com/logins.jsp",//表单提交地址
        "method" : "post",//提交数据方式
        "charset" : "utf-8",
        "text_inputs" : [
            {
                "title" : "账号： ",
                "id":"user-name",
                "type":"text",
                "mail_type" :{ 
                    "options" : [ //邮箱类型
                        {
                            "type" : "163.com", //邮箱类型
                            "value" : "http://entry.mail.163.com/coremail/fcg/ntesdoor2?style=-1&lightweight=1&verifycookie=1" //与邮箱类型关联的标识
                        },{
                            "type" : "126.com", //邮箱类型
                            "value" : "http://entry.mail.126.com/cgi/ntesdoor?hid=10010102&style=-1&lightweight=1&verifycookie=1" //与邮箱类型关联的标识
                        },{
                            "type" : "yeah.net", //邮箱类型
                            "value" : "http://entry.yeah.net/cgi/ntesdoor?style=-1&lightweight=1&verifycookie=1" //与邮箱类型关联的标识
                        }
                    ]
                }
            },{
                "title" : "密码： ",
                "id":"pass-word",
                "type":"password"
            }
        ],
        "hidden_inputs" : [ //其他隐藏域
            {
                "name":"username", //隐藏域字段名
                "id":"username",
                "value":"" //隐藏域值
            },{
                "name":"url", //隐藏域字段名
                "id":"url",
                "value":"" //隐藏域值
            },{
                "name":"password", //隐藏域字段名
                "id":"password",
                "value":"" //隐藏域值
            },{
                "name":"type", //隐藏域字段名
                "value":"1" //隐藏域值
            },{
                "name":"product", //隐藏域字段名
                "value":"baidu" //隐藏域值
            }
        ]
    },
    "tabs" : {
        'interval_time' : 500000, 
        'hover_time' : 200, 
        'default_index' : 0,
        'width': 535,
        'li_border_width': 0,
        "options":[
            {
                'tab_title':'新闻',//tab 标题
                'item':{
                   'pro_img_url' : 'http://fanxueliang.fe.baidu.com/163/img.png',//图片地址
                   'pro_url' : 'http://www.163.com',//图片跳转地址
                   'type_title':'新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻',//描述标题
                   'type_title_url':'http://www.163.com',//描述标题跳转地址
                   'type_links':[
                       {
                           'type' : '专业控',//分类
                           'text':'小马拉多纳...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       },{
                           'type' : '另一面',//分类
                           'text':'骗女网友...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       },{
                           'type' : '数  度',//分类
                           'text':'魔兽难...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       }
                   ]
                }
            },{
                'tab_title':'体育',//tab 标题
                'item':{
                   'pro_img_url' : 'http://fanxueliang.fe.baidu.com/163/img.png',//图片地址
                   'pro_url' : 'http://www.163.com',//图片跳转地址
                   'type_title':'体育体育体育体育体育',//描述标题
                   'type_title_url':'http://www.163.com',//描述标题跳转地址
                   'type_links':[
                       {
                           'text':'小马拉多纳...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       },{
                           'text':'骗女网友...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       },{
                           'text':'魔兽难...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       }
                   ]
                }
            },{
                'tab_title':'娱乐',//tab 标题
                'item':{
                   'pro_img_url' : 'http://fanxueliang.fe.baidu.com/163/img.png',//图片地址
                   'pro_url' : 'http://www.163.com',//图片跳转地址
                   'type_title':'娱乐娱乐娱乐娱乐',//描述标题
                   'type_title_url':'http://www.163.com',//描述标题跳转地址
                   'type_links':[
                       {
                           'text':'小马拉多纳...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       },{
                           'text':'骗女网友...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       },{
                           'text':'魔兽难...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       }
                   ]
                }
            },{
                'tab_title':'财经',//tab 标题
                'item':{
                   'pro_img_url' : 'http://fanxueliang.fe.baidu.com/163/img.png',//图片地址
                   'pro_url' : 'http://www.163.com',//图片跳转地址
                   'type_title':'财经财经财经财经',//描述标题
                   'type_title_url':'http://www.163.com',//描述标题跳转地址
                   'type_links':[
                       {
                           'text':'小马拉多纳...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       },{
                           'text':'骗女网友...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       },{
                           'text':'魔兽难...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       }
                   ]
                }
            },{
                'tab_title':'汽车',//tab 标题
                'item':{
                   'pro_img_url' : 'http://fanxueliang.fe.baidu.com/163/img.png',//图片地址
                   'pro_url' : 'http://www.163.com',//图片跳转地址
                   'type_title':'汽车汽车汽车',//描述标题
                   'type_title_url':'http://www.163.com',//描述标题跳转地址
                   'type_links':[
                       {
                           'text':'小马拉多纳...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       },{
                           'text':'骗女网友...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       },{
                           'text':'魔兽难...', //分类下描述文字
                           'url':'http://www.163.com'   //分类下描述文字跳转地址
                       }
                   ]
                }
            }
        ]
    },
    "buttons" : {
        "options" : [{
                'text' : '微博',
                'url' : 'http://www.163.com' //跳转地址
            },{
                'text' : '博客',
                'url' : 'http://www.163.com'
            },{
                'text' : '游戏',
                'url' : 'http://www.163.com'
            },{
                'text' : '彩票',
                'url' : 'http://www.163.com'
            },{
                'text' : '视频',
                'url' : 'http://www.163.com'
            }
        ]
    }
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
