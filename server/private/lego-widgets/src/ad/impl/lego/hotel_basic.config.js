/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: hotel_basic.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lego/hotel_basic.config.js ~ 2013/06/20 10:41:17
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * video_powerlink_standard的配置数据
 **/

var AD_CONFIG = {
    "0": {
        "title": "<em>雅诗兰黛</em>中国官网商城－限量护肤套装,焕彩肌肤每一天!",
        "url": "http://www.baidu.com",
        "logo": {
            "logo_url": "http://www.baidu.com",
            "logo": "http://bcs-sandbox.baidu.com/lego-mat/fe89af2e-8244-49b8-a935-3c0cb1f2c581_90_90.jpg"
        },
        "description": "雅诗兰黛中国官网商城－限量护肤套装,焕彩肌肤每一天!雅诗兰黛中国官网商城－限量护肤套装,焕彩肌肤每一天!雅诗兰黛中国官网商城－限量护肤套装,焕彩肌肤每一天!雅诗兰黛中国官网商城－限量护肤套装,焕彩肌肤每一天!",
        "site": "http://www.baidu.com"
    },
    "1": {
        "interval_time": 5000,
        "is_show_random": false,
        "width": 535,
        'li_border_width': 0,
        "default_index": 0,
        "options": [{
            "tab_title": "打发时光"
        }, {
            "tab_title": "打发时光"
        }, {
            "tab_title": "打发时光"
        }, {
            "tab_title": "打发时光"
        }]
    },
    "2": {
        "options": [{
            "text": "官方微博",
            "rcv_url": "http://www.baidu.com"
        }, {
            "text": "官方微博",
            "rcv_url": "http://www.baidu.com"
        }, {
            "text": "官方微博",
            "rcv_url": "http://www.baidu.com"
        }, {
            "text": "官方微博",
            "rcv_url": "http://www.baidu.com"
        }, {
            "text": "官方微博",
            "rcv_url": "http://www.baidu.com"
        }],
        "button_width": 0
    },
    "3":  {
        "datasource_url": "http://bcs-sandbox.baidu.com/lego-mat/7a0c5be9-1c7b-40d2-b374-bc996399d68d.js",
        "hotels": [
            {
                "alternative_hotel_type": {
                    "native_hotel": {
                        "default_checked": true,
                        "form_action": "http://www.baidu.com",
                        "form_charset": "UTF-8",
                        "form_method": "GET",
                        "hidden_inputs": [{
                            "name": "sss",
                            "value": "s"
                        }],
                        "city": {
                            "submit_name": "aaa",
                            "default_value": "a"
                        },
                        "keyword": {
                            "submit_name": "ssss",
                            "default_value": "s"
                        },
                        "checkin_date": {
                            "submit_name": "cccc",
                            "default_value": "c"
                        },
                        "checkout_date": {
                            "submit_name": "ffff",
                            "default_value": "f"
                        }
                    }
                }
            }, 
            {
                "alternative_hotel_type": {
                    "internal_hotel": {
                        "default_checked": false,
                        "form_action": "http://www.baidu.com",
                        "form_charset": "UTF-8",
                        "form_method": "GET",
                        "hidden_inputs": [],
                        "city": {
                            "submit_name": "aaaaa",
                            "default_value": "f"
                        },
                        "keyword": {
                            "submit_name": "eeee",
                            "default_value": "r"
                        },
                        "checkin_date": {
                            "submit_name": "yyyyy",
                            "default_value": "j"
                        },
                        "checkout_date": {
                            "submit_name": "kkkk",
                            "default_value": "l"
                        }
                    }
                }
            }
        ]
    },
    "4": {
        "image_width": 110,
        "image_margin": 10,
        "speed": 25,
        "options": [{
            "imgsrc": "http://bcs-sandbox.baidu.com/lego-mat/7aff7a1e-8d76-455f-9eda-ac3fe1de87a0_110_90.jpg",
            "imgurl_rcv_url": "http://www.baidu.com"
        }, {
            "imgsrc": "http://bcs-sandbox.baidu.com/lego-mat/ff77ccc0-68d7-4480-ae33-714fc5609b96_110_90.jpg",
            "imgurl_rcv_url": "http://www.baidu.com"
        }, {
            "imgsrc": "http://bcs-sandbox.baidu.com/lego-mat/ebce9114-5a03-41f7-ab33-46cd19df4682_110_90.jpg",
            "imgurl_rcv_url": "http://www.baidu.com"
        }, {
            "imgsrc": "http://bcs-sandbox.baidu.com/lego-mat/5184d739-105e-4fd1-a03f-b93dfbf4fde5_110_90.jpg",
            "imgurl_rcv_url": "http://www.baidu.com"
        }, {
            "imgsrc": "http://bcs-sandbox.baidu.com/lego-mat/f7fc880f-c25c-49ec-ba16-04b9ef3439da_110_90.jpg",
            "imgurl_rcv_url": "http://www.baidu.com"
        }],
        "left_arrow": "//bs.baidu.com/adtest/94e22f92e19ef767fa3215d5bc06f151.png",
        "right_arrow": "//bs.baidu.com/adtest/8d611e5f63d5ca7c6db2daf111252b5d.png"
    },
    "5": {
        "pro_img_url": "http://bcs-sandbox.baidu.com/lego-mat/ebb8283b-63ac-42fb-a1ac-4595b3efff60_180_100.jpg",
        "pro_rcv_url": "http://www.baidu.com",
        "des_title": "特润修护肌透精华",
        "des_title_rcv_url": "http://www.baidu.com",
        "des_text": "一网上商城，官方正品，24H在线。雅诗兰黛焕彩肌肤每一天，官网购物臻享红石榴精粹水、红石榴晚霜，焕醒肌肤鲜活",
        "des_text_rcv_url": "http://www.baidu.com",
        "type_title": "精选套装",
        "type_links": [{
            "text": "精选套装",
            "rcv_url": "http://www.baidu.com"
        }, {
            "text": "精选套装",
            "rcv_url": "http://www.baidu.com"
        }, {
            "text": "精选套装",
            "rcv_url": "http://www.baidu.com"
        }, {
            "text": "精选套装",
            "rcv_url": "http://www.baidu.com"
        }]
    },
    "6": {
        "pro_img_url": "http://bcs-sandbox.baidu.com/lego-mat/42968ca7-48ba-439e-8ae6-cc01e07176d6_180_100.jpg",
        "pro_rcv_url": "http://www.baidu.com",
        "hot_line": {
            "text": "公司、海外、个人预订酒店均可免费拨打官方预订热线",
            "phone_number": "8007898907"
        }
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100 : */
