/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: c361.config.js 150523 2012-10-30 10:06:05Z  DestinyXie$
 *
 **************************************************************************/



/**
 * src/ad/impl/c361.config.js ~ 2013/04/18 15:18:36
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * c361的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-8964",
    "hmjs_id": "1234567890",
    "main_url": "http://www.baidu.com",
    "video_left": {
        'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
        'video_url' : 'http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv',
        //'csttit' : 'zhidao.baidu.com',
        'ipad_img': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
        'width':220,
        'height':190
    },
    'small_head' : {
        'titletext' : '<em>买一善一</em>官方网站',
        'titleurl_rcv_url' : 'http://www.baidu.com',
        'description_rcv_html' : '361做了一件事情,361做了一件事情,361做了一件事情,他做了一件事情,361做了一件事情,361做了一件事情,361做了一件事情,他做了一件事情',
        'query' : [{
            'key_word' : '梅赛德斯-奔驰',
            'url' : 'http://www.buick.com.cn'
        }],
        'image_group_head' : {
            'options':[
                {
                    'imgsrc':'//bs.baidu.com/adtest/c402da5afb3ef0bab10edb7d339d64ec.gif'
                },{
                    'imgsrc':'//bs.baidu.com/adtest/b57e2cae3b60a378deaea4420bce9811.gif'
                },{
                    'imgsrc':'//bs.baidu.com/adtest/db1657072001e1f6cd7b62ea871a2b69.gif'
                }
            ]
        },
        'site' : 'www.onecaresone.com'
    },
    'tab':{
        'interval_time' : 500000000, //自动切换tab时间间隔
        'hover_time' : 200,
        'width': 250,
        'li_border_width': 0,
        'default_index' : 0, //默认载入的tab，从0开始
        'options': [
            {
                'tab_title': '<img src="//bs.baidu.com/adtest/b6f9aa7d83e7fa6e5e4ba5911d46b558.gif" alt="" />新浪微博互动'
            },{
                'tab_title': '<img src="//bs.baidu.com/adtest/d4fe4599e72bfefee92098ed376571ba.gif" alt="" />腾讯微博互动'
            }
        ]
    },
    'sina_weibo': {
        'id' : '1924007153',
        'name' : '买一善一sina',
        'follow_imgsrc' : 'http://drmcmm.baidu.com/media/id=PWbvPWc1PHm&gp=402&time=nHnYnj6LnHbkPf.png',
        'verify_img' : 'http://eiv.baidu.com/mapm2/duqusheng/ceshi/weibo/identificationImg.png',
        'is_display_icon':false
    },
    'tenc_weibo': {
        'id' : 't',
        'name' : '买一善一tenc',
        'follow_imgsrc' : 'http://drmcmm.baidu.com/media/id=PWbvPWc1PHm&gp=402&time=nHnYnj6LnHbkPf.png',
        'verify_img' : 'http://eiv.baidu.com/mapm2/duqusheng/ceshi/weibo/identificationImg.png',
        'is_display_icon':false
    },
    'button_list': {
        'options' : [
            {'text' : '爱心购买',
              'url' : 'http://www.baidu1.com'
            },{
                'text' : '爱心产品',
                'url' : 'http://www.baidu2.com'
            },{
                'text' : '捐鞋进度',
                'url' : 'http://www.baidu3.com'
            },{
                'text' : '受捐地区',
                'url' : 'http://www.baidu2.com'
            },{
                'text' : '爱心大使',
                'url' : 'http://www.baidu3.com'
            }
        ]
    },
    "fwc": {
        "width":720,
        "height":420
    },
    "flash": [{
            "name" : "Nike0",
            "width":720,
            "height":420,
            "src":"//bs.baidu.com/i-m-f-e/Main.swf"
        },{
            "name" : "Nike1",
            "width":720,
            "height":420,
            "src":"//bs.baidu.com/i-m-f-e/Main.swf"
        },{
            "name" : "Nike2",
            "width":720,
            "height":420,
            "src":"//bs.baidu.com/i-m-f-e/Main.swf"
        },{
            "name" : "Nike3",
            "width":720,
            "height":420,
            "src":"//bs.baidu.com/i-m-f-e/Main.swf"
        }]
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */
