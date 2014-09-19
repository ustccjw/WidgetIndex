/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/siemens.config.js ~ 2013/11/01 17:21:46
 * @author chenli11@baidu.com (chenli)
 * @version $Revision: 11222 $
 * @description
 * siemens的配置数据
 **/

var AD_CONFIG = {
    'h1': {
        'rcv_url': 'http://www.siemens.com/answers/cn/zh/?stc=cnccc022291',
        'title': '<em>西门子</em>(中国)有限公司',
        'display_official_site_icon': true,
        'description_rcv_html': '在过去140多年的时间里，西门子一直活跃在中国市场，并以其创新的技术、卓越的产品和解决方案，在<a href="http://www.industry.siemens.com.cn/home/cn/zh/Pages/industry.aspx?stc=cnccc022294" target="_blank">工业</a>、<a href="http://www.energy.siemens.com.cn/CN/Pages/Default.aspx?stc=cnccc022295" target="_blank">能源</a>、<a href="http://www.medical.siemens.com/webapp/wcs/stores/servlet/StoreCatalogDisplay~q_catalogId~e_-8~a_langId~e_-8~a_storeId~e_10001.htm?stc=cnccc022296" target="_blank">医疗</a>、<a href="http://www.infrastructure-cities.siemens.com.cn/?stc=cnccc022297" target="_blank">基础设施</a>与城市业务领域处于领先地位。西门子以先进的科技，为人们探求可持续发展的长远答案',
        //'description_rcv_url': 'http://www.baidu.com',
        'site': 'www.siemens.com.cn',
        'logo': {
            'logo_rcv_url': 'http://www.siemens.com/answers/cn/zh/?stc=cnccc022292',
            'logo': '//bs.baidu.com/adcoup-mat/557d1361-ad4e-4138-bd62-a2bed43f7329.jpg'
        }
    },
    'colorlist': {
        'options': [{
            'text': '健康中国',
            'rcv_url': 'http://w1.siemens.com.cn/healthcare-zh/?stc=cnccc022307',
            'desc': [{
                'desc': '西门子医疗技术能更早地发现病症，更准确地诊断病变并改善治疗。',
                'desc_rcv_url': 'http://w1.siemens.com.cn/healthcare-zh/?stc=cnccc022302'
            }]
        }, {
            'text': '生产管理',
            'rcv_url': 'http://w1.siemens.com.cn/manufacturing-management-zh/manufacturing-management.html?stc=cnccc022303',
            'desc': [{
                'desc': '西门子工业产品及一站式解决方案可以帮助企业显著提高生产效率。',
                'desc_rcv_url': 'http://w1.siemens.com.cn/manufacturing-management-zh/manufacturing-management.html?stc=cnccc022301'
            }]
        }]
    },
    'small_weibo': {
        'weibo_type': {
            'sina': {
                'id' : '1666068804',
                'fieldset': true,
                'verify_img': '//bs.baidu.com/adtest/bad0630957bb1be6a9fd748ea583e375.gif',
                'follow_imgsrc': '//bs.baidu.com/adtest/3269a267cac519de04f045220a72d368.png'
            },
            'qq': {
                'id': 'SiemensChinaCN',
                'verify_img': 'http://eiv.baidu.com/mapm2/img/qq_verify.png',
                'follow_imgsrc': '//bs.baidu.com/adtest/d2274b7c05976b0fa4a9cbc2e22e0198.png'
            }
        }
    },
    'button_group': {
        'options' : [
            {
              'rcv_url' : 'http://w1.siemens.com.cn/about_us/index.asp',
              'text' : '关于我们'
            },
            {
              'rcv_url' : 'http://www.careers.siemens.com.cn/Career/Main_ch.html',
              'text' : '招贤纳士'
            },
            {
              'rcv_url' : 'http://w1.siemens.com.cn/corporate_responsibility/index.asp',
              'text' : '可持续发展'
            },
            {
              'rcv_url' : 'http://page.renren.com/601353783',
              'text' : '人人网主页'
            },
            {
              'rcv_url' : 'https://plus.google.com/+Siemens/posts',
              'text' : 'Google+'
            }
        ]
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */
