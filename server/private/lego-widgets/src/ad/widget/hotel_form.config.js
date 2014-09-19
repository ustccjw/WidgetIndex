/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: hotel_form.config.js 10927 2012-08-05 07:35:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/hotel_form.config.js ~ 2013/01/24 21:08:37
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * button相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    "hotel_options": {
        "native_hotel": {
            "default_checked": true
        },
        "internal_hotel": {
            "default_checked": false
        }
    },
    "datasource_url": "//bs.baidu.com/adtest/570f130e4e7661a1acd1858d01393ea7.js",
    "native_hotel": {
        "form_action": "http://u.ctrip.com/union/CtripRedirect.aspx",
        "form_charset": "UTF-8",
        "form_method": "GET",
        "hidden_inputs": [
            {
                "name": "key1",
                "value": "0"
            },{
                "name": "key2",
                "value": "1"
            }
        ],
        "city": {
            "submit_name": "city",
            "default_value": ""
        },
        "keyword": {
            "submit_name": "keyword",
            "default_value": ""
        },
        "checkin_date": {
            "submit_name": "checkinDate",
            "default_value": ""
        },
        "checkout_date": {
            "submit_name": "checkoutDate",
            "default_value": ""
        }
    },
    "internal_hotel": {
        "form_action": "http://u.ctrip.com/union/CtripRedirect.aspx",
        "form_charset": "UTF-8",
        "form_method": "GET",
        "hidden_inputs": [
            {
                "name": "key1",
                "value": "0"
            },{
                "name": "key2",
                "value": "1"
            }
        ],
        "city": {
            "submit_name": "city",
            "default_value": ""
        },
        "keyword": {
            "submit_name": "keyword",
            "default_value": ""
        },
        "checkin_date": {
            "submit_name": "checkinDate",
            "default_value": ""
        },
        "checkout_date": {
            "submit_name": "checkoutDate",
            "default_value": ""
        }
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
