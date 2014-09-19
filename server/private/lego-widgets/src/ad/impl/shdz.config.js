/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: shdz.config.js  2012-08-15 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/shdz.config.js ~ 2012/08/15 12:14:49
 * @author wangdawei
 * @version $Revision $
 * @description
 * 演示用的配置项.
 **/

var AD_CONFIG = {
    'id':'ec-ma-shdz-1',
    'main_url':'http://www.baidu.com',
    'slider':{
        'width':220, //图片宽度
        'height':190, //图片高度
        'delay':200, //切换选择时的延时响应时间
        'interval_time':4000, //自动切换时间间隔 =0表示不自动切换
        'mode':'normal', //'mode':'vertical'|'horizontal'|'normal' 图片展示模式：垂直滚动、水平滚动、无动画效果
        'is_show_random':true, //是否随机显示图片
        'options':[
            {
                'img_url':'http://eiv.baidu.com/mapm2/csvw/11.jpg',
                'rcv_url':'www.baidu1.com'
            },
            {
                'img_url':'http://eiv.baidu.com/mapm2/csvw/12.jpg',
                'rcv_url':'www.baidu2.com'
            }
        ]
    },
    'h1':{
        'url' : 'http://www.baidu.com',
        'title' : '<em>上海大众汽车</em>官方网站',
        'description' : '成立于1985年的上海大众汽车有限公司是一家中德合资企业，是国内规模最大的现代化轿车生产基地之一。公司目前拥有Santana、Passat领...',
        'site' : 'www.olay.com.cn'
    },
    'small_weibo':{
        'id' : '1881301247',
        'icon' : 'http://eiv.baidu.com/mapm2/csvw/weibo_logo.gif',
        'icon_url' : 'http://www.baidu.com',
        'name' : '123',
        'follow_imgsrc' : 'http://eiv.baidu.com/mapm2/csvw/weibo_follow.gif',
        'is_display_icon':false,
        'verify_img' : 'http://drmcmm.baidu.com/media/id=P10vPjf4rHn&gp=402&time=nHnYnj6LnHbkr0.png'

    },
    'tabs' : {
        'interval_time' : 4000, 
        'hover_time' : 200, 
        'default_index' : 1, //默认载入的tab，从0开始
        'options': [{
            'tab_title':'全新朗逸',
            'item':{
                'pro_img_url' : 'http://drmcmm.baidu.com/media/id=P1D4nj0dPWD&gp=402&time=nHnYnH64rjRkrf.jpg',
                'pro_url' : 'http://www.dell.com.cn',
                'des_title' : '途胜途胜途胜途胜途胜',
                'des_title_url' : 'http://www.dell.com.cn',
                'des_text' : '搭载DOHC CVVT发动机动力澎湃。城市多功能车设计轻松应对各种复杂路况。',
                'des_text_url' : 'http://www.dell.com.cn',
                'type_title':'可选型号1',
                'type_links':[
                    {
                        'text':'2.0 GL 2WD MT',
                        'url':'http://www.dell.com.cn'
                    },{
                        'text':'2.0 GL 2WD MAT',
                        'url':'http://www.dell.com.cn'
                    },{
                        'text':'2.0 GLS 4WD MT',
                        'url':'http://www.dell.com.cn'
                    },{
                        'text':'2.0 DLX MT',
                        'url':'http://www.dell.com.cn'
                    }
                ]
            }
        },{
            'tab_title':'桑塔纳',
            'item':{
                'pro_img_url' : 'http://drmcmm.baidu.com/media/id=P1D4nj0dPWD&gp=402&time=nHnYnH64rjRkrf.jpg',
                'pro_url' : 'http://www.dell.com.cn',
                'des_title' : '途胜 自由本能 suv',
                'des_title_url' : 'http://www.dell.com.cn',
                'des_text' : '搭载DOHC CVVT发动机动力澎湃。城市多功能车设计轻松应对各种复杂路况。',
                'des_text_url' : 'http://www.dell.com.cn',
                'type_title':'可选型号2',
                'type_links':[
                    {
                        'text':'2.0 GL 2WD MT',
                        'url':'http://www.dell.com.cn'
                    },{
                        'text':'2.0 GL 2WD MAT',
                        'url':'http://www.dell.com.cn'
                    },{
                        'text':'2.0 GLS 4WD MT',
                        'url':'http://www.dell.com.cn'
                    },{
                        'text':'2.0 DLX MT',
                        'url':'http://www.dell.com.cn'
                    }
                ]
             }
         },{
             'tab_title':'新帕萨特',
             'item':{
                  'pro_img_url' : 'http://drmcmm.baidu.com/media/id=P1D4nj0dPWD&gp=402&time=nHnYnH64rjRkrf.jpg',
                  'pro_url' : 'http://www.dell.com.cn',
                  'des_title' : '途胜 自由本能 suv',
                  'des_title_url' : 'http://www.dell.com.cn',
                  'des_text' : '搭载DOHC CVVT发动机动力澎湃。城市多功能车设计轻松应对各种复杂路况。',
                  'des_text_url' : 'http://www.dell.com.cn',
                  'type_title':'可选型号3',
                  'type_links':[
                      {
                          'text':'2.0 GL 2WD MT',
                          'url':'http://www.dell.com.cn'
                      },{
                          'text':'2.0 GL 2WD MAT',
                          'url':'http://www.dell.com.cn'
                      },{
                          'text':'2.0 GLS 4WD MT',
                          'url':'http://www.dell.com.cn'
                      },{
                          'text':'2.0 DLX MT',
                          'url':'http://www.dell.com.cn'
                      }
                  ]
               }
           },{
               'tab_title':'Polo Gti',
               'item':{
               'pro_img_url' : 'http://drmcmm.baidu.com/media/id=P1D4nj0dPWD&gp=402&time=nHnYnH64rjRkrf.jpg',
               'pro_url' : 'http://www.dell.com.cn',
               'des_title' : '途胜 自由本能 suv',
               'des_title_url' : 'http://www.dell.com.cn',
               'des_text' : '搭载DOHC CVVT发动机动力澎湃。城市多功能车设计轻松应对各种复杂路况。',
               'des_text_url' : 'http://www.dell.com.cn',
               'type_title':'可选型号4',
               'type_links':[
                   {
                       'text':'2.0 GL 2WD MT',
                       'url':'http://www.dell.com.cn'
                   },{
                       'text':'2.0 GL 2WD MAT',
                       'url':'http://www.dell.com.cn'
                   },{
                       'text':'2.0 GLS 4WD MT',
                       'url':'http://www.dell.com.cn'
                   },{
                       'text':'2.0 DLX MT',
                       'url':'http://www.dell.com.cn'
                   }
               ]
            }
        },{
            'tab_title':'途观',
            'item':{
               'pro_img_url' : 'http://drmcmm.baidu.com/media/id=P1D4nj0dPWD&gp=402&time=nHnYnH64rjRkrf.jpg',
               'pro_url' : 'http://www.dell.com.cn',
               'des_title' : '途胜 自由本能 suv',
               'des_title_url' : 'http://www.dell.com.cn',
               'des_text' : '搭载DOHC CVVT发动机动力澎湃。城市多功能车设计轻松应对各种复杂路况。',
               'des_text_url' : 'http://www.dell.com.cn',
               'type_title':'可选型号5',
               'type_links':[
                   {
                       'text':'2.0 GL 2WD MT',
                       'url':'http://www.dell.com.cn'
                   },{
                       'text':'2.0 GL 2WD MAT',
                       'url':'http://www.dell.com.cn'
                   },{
                       'text':'2.0 GLS 4WD MT',
                       'url':'http://www.dell.com.cn'
                   },{
                       'text':'2.0 DLX MT',
                       'url':'http://www.dell.com.cn'
                   }
               ]
            }
        },{
            'tab_title':'途安',
            'item':{
               'pro_img_url' : 'http://drmcmm.baidu.com/media/id=P1D4nj0dPWD&gp=402&time=nHnYnH64rjRkrf.jpg',
               'pro_url' : 'http://www.dell.com.cn',
               'des_title' : '途胜 自由本能 suv',
               'des_title_url' : 'http://www.dell.com.cn',
               'des_text' : '搭载DOHC CVVT发动机动力澎湃。城市多功能车设计轻松应对各种复杂路况。',
               'des_text_url' : 'http://www.dell.com.cn',
               'type_title':'可选型号5',
               'type_links':[
                   {
                       'text':'2.0 GL 2WD MT',
                       'url':'http://www.dell.com.cn'
                   },{
                       'text':'2.0 GL 2WD MAT',
                       'url':'http://www.dell.com.cn'
                   },{
                       'text':'2.0 GLS 4WD MT',
                       'url':'http://www.dell.com.cn'
                   },{
                       'text':'2.0 DLX MT',
                       'url':'http://www.dell.com.cn'
                   }
               ]
            }
        }
        ]
    },
    'button_group':{
        'options' : [
            {'text' : '优酷空间',
              'url' : 'www.baidu1.com'
            },{
                'text' : '蓝思众享',
                'url' : 'www.baidu2.com'
            },{
                'text' : '车主中心',
                'url' : 'www.baidu3.com'
            },{
                'text' : '腾讯微博',
                'url' : 'www.baidu4.com'
            },{
                'text' : '经销商查询',
                'url' : 'www.baidu4.com'
            },{
                'text' : '申请试驾',
                'url' : 'www.baidu5.com'
            }
        ]
    }
};










/* vim: set ts=4 sw=4 sts=4 tw=100: */
