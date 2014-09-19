/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/zuche.config.js ~ 2013-10-11 17:33:06
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 *
 **/
var AD_CONFIG = {
    "head": {
        'display_official_site_icon': true,
        'rcv_url' : 'http://www.baidu.com',
        'title' : '<em>多美滋</em>源自欧洲市场领先者',
        'description_rcv_html': '心怀激情，就有创造悦的力量！上传照片，说出你的激情，与大家分享悦的力量，即有机会获得BMW原厂自行车等缤纷大奖！BMW一直为追求企业社会的和谐发展。心怀激情，我们不断传递温暖，同时也收获悦的力量登陆还可查看BMW多款燃情座驾！即有机会获得BMW原厂自行车，心怀激情创造悦！',
        'site' : 'www.bmw.com.cn',
        'logo_rcv_url': 'http://www.baidu.com',
        'logo': 'http://dummyimage.com/121x121'
    },
    "tab": {
        "interval_time" : 50000000,
        "hover_time" : 1000,
        "li_margin": 0,
        "width": 524
    },
    "tab1": {
        "tab_title": "短租自驾",
        "form": {
            "display_short_driving_self": true,
            "datasource_url": '//bs.baidu.com/adtest/5793c7a57756faa11d22742b284596ba.js',
            "form_action": "http://order.zuche.com/border.html"
        }
    },
    "tab2": {
        "tab_title": "短租代驾",
        "form": {
            "display_short_driving_other": true,
            "datasource_url": '//bs.baidu.com/adtest/5793c7a57756faa11d22742b284596ba.js',
            "form_action": "http://cd.zuche.com/bcdorder.html"
        }
    },
    "tab3": {
        "tab_title": "长租",
        "form": {
            "display_long_driving": true,
            "datasource_url": '//bs.baidu.com/adtest/5793c7a57756faa11d22742b284596ba.js',
            "form_action": "http://changzu.zuche.com/bczorder.html"
        }
    },
    "tab4": {
        "tab_title": "顺风车",
        "form": {
            "display_free_ride": true,
            "datasource_url": '//bs.baidu.com/adtest/5793c7a57756faa11d22742b284596ba.js',
            "form_action": "http://easyride.zuche.com/bsforder.html"
        },
        "links": {
            "options": [
                {
                    'text': '北京出发',
                    'rcv_url': 'http://www.baidu2.com'
                }, 
                {
                    "text": "上海出发",
                    "rcv_url": "http://baidu.com"
                }, 
                {
                    "text": "广州出发",
                    "rcv_url": "http://baidu.com"
                },
                {
                    'text': '深圳出发',
                    'rcv_url': 'http://www.baidu2.com'
                }, 
                {
                    "text": "杭州出发",
                    "rcv_url": "http://baidu.com"
                }, 
                {
                    "text": "武汉出发",
                    "rcv_url": "http://baidu.com"
                }
            ]
        }
    },
    "table": [
        [
            {
                'category' : '极致美白0瑕疵',
                'category_rcv_url' : 'http://www.baidu.com'
            },
            {
                'category' : '2012时尚彩妆',
                'category_rcv_url' : 'http://www.baidu.com'
            },
            {
                'category' : '香水特惠重磅回归',
                'category_rcv_url' : 'http://www.baidu.com'
            },
            {
                'category' : '新客送礼8款选1',
                'category_rcv_url' : 'http://www.baidu.com'
            }
        ],
        [
            {
                'name' : '倩碧美白￥302', 
                'target_rcv_url' : 'http://cn.strawberrynet.com/skincare/clinique/?trackid=1411300010&utm_source=Baidu%20Brandzone&utm_medium=cpc&utm_term=Baidu%20Brandzone_Table_1&utm_campaign=Brandzone&utm_content=Adtext#8504' 
            },
            {
                'name' : '新款眼影流行前线', 
                'target_rcv_url' : 'http://cn.strawberrynet.com/oldProdSearch.aspx?trackid=1411300011&utm_source=Baidu%20Brandzone&utm_medium=cpc&utm_term=Baidu%20Brandzone_Table_2&utm_campaign=Brandzone&utm_content=Adtext&searchLineId=&searchField=eye+shadow' 
            },
            {
                'name' : '巴宝莉兰蔻3折', 
                'target_rcv_url' : 'http://cn.strawberrynet.com/gifts-specials/womens-fragrance/?trackid=1411300012&utm_source=Baidu%20Brandzone&utm_medium=cpc&utm_term=Baidu%20Brandzone_Table_3&utm_campaign=Brandzone&utm_content=Adtext' 
            },
            {
                'name' : '特惠产品超值2折', 
                'target_rcv_url' : 'http://cn.strawberrynet.com/extraSpecial.aspx?trackid=1411300013&utm_source=Baidu%20Brandzone&utm_medium=cpc&utm_term=Baidu%20Brandzone_Table_4&utm_campaign=Brandzone&utm_content=Adtext' 
            }
        ]
    ]
};





/* vim: set ts=4 sw=4 sts=4 tw=100: */
