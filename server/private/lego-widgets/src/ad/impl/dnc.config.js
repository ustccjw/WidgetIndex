/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: dnc.config.js  2012/08/09 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/dnc.config.js ~ 2012/08/09 12:14:49
 * @author wangdawei
 * @version $Revision $
 * @description
 * 演示用的配置项.
 **/

var AD_CONFIG = {
    'id':'ec-ma-dnc-1',
    'main_url':'http://www.baidu.com',
    'video':{
        'rcv_url' : 'http://clkmk.baidu.com/clkmk-rcv/lnk?id=3128&x=c8d987f82b525ba0f6e10c975f1db1c85f08a3579f50d94ff10def13d223d15921ec055af4008a6eaca8f056bf06b6643994d66f5c05512d0db2f92569e22e4cee625e4b7463b6a7dcbf50a6bf2504077375c54a5c6a2772',
        'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
        'video_url' : 'http://eiv.baidu.com/mapm2/bmw/120601_pl_01/sp.flv',
        'csttit' : 'zhidao.baidu.com',
        'ipad_img': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
        'width':220,
        'height':190
    },
    'smallhead':{
        'titletext' : '<em>东研环境DNC</em>官网',
        'titleurl_rcv_url' : 'http://www.baidu.com',
        'description_rcv_html' : '东研环境(北京东研二十一世纪环境科技有限公司)是一家以净化技术为依托，以创新服务为理念，以保护生命为信条的公司，专注于经营智能净水系列...',
        'site' : 'www.louisvuitton.cn'
    },
    'section':{
        'options' : [
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/dnc/120810_pl_01/section_flag.gif',
                'text' : 'DNC东研中央净水产品耀世而创',
                'text_url' : 'www.baidu.com'
            },
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/dnc/120810_pl_01/section_flag.gif',
                'text' : '世界地球日 全屋净水解决方案健康',
                'text_url' : 'www.baidu.com'
            },
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/dnc/120810_pl_01/section_flag.gif',
                'text' : 'DNC东研空气净化机清新上市',
                'text_url' : 'www.baidu.com'
            }
        ]
    },
    'tabs' : {
        'interval_time' : 11114000, 
        'hover_time' : 200, 
        'li_border_width': 0,
        'default_index' : 1, //默认载入的tab，从0开始
        'options': [{
            'tab_title':'智能净水',
            'item':{
                'pro_img_url' : 'http://drmcmm.baidu.com/media/id=P1D4nj0dPWD&gp=402&time=nHnYnH64rjRkrf.jpg',
                'pro_url' : 'http://www.dell.com.cn',
                'des_title' : '途胜 自由本能 suv',
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
            'tab_title':'智能卫浴',
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
             'tab_title':'空气净化',
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
               'tab_title':'健康绿电',
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
            'tab_title':'前瞻科技',
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
            {'text' : '服务客户',
              'url' : 'www.baidu1.com'
            },{
                'text' : '新闻中心',
                'url' : 'www.baidu2.com'
            },{
                'text' : '关于东研',
                'url' : 'www.baidu3.com'
            },{
                'text' : '环境经营',
                'url' : 'www.baidu4.com'
            },{
                'text' : '资质认证',
                'url' : 'www.baidu4.com'
            }
        ]
    }
};










/* vim: set ts=4 sw=4 sts=4 tw=100: */
