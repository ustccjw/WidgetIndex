/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.config.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhixin/aladin.config.js ~ 2013/09/13 14:01:57
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * aladin相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    title: "<em>大众</em>汽车_百度百科",
    title_rcv_url: "http://product.xgo.com.cn/price_list/brand_29_1.shtml",
    table_head: [{
        text: "类型"
    }, {
        text: "车系"
    }],
    table_body: [{
        title: "轿车",
        links: [{
            text: "polo",
            text_rcv_url: "http://www.xgo.com.cn/2574/"
        }, {
            text: "<em>朗逸</em>",
            text_rcv_url: "http://www.xgo.com.cn/3597/"
        }, {
            text: "帕萨特",
            text_rcv_url: "http://www.xgo.com.cn/2506/"
        }, {
            text: "PASSAT新领驭",
            text_rcv_url: "http://www.xgo.com.cn/2507/"
        }, {
            text: "更多..",
            text_rcv_url: "http://product.xgo.com.cn/price_list/brand_29_1_0_1.shtml"
        }]
    }, {
        title: "SUV",
        links: [{
            text: "途观",
            text_rcv_url: "http://www.xgo.com.cn/3853/"
        }, {
            text: "途安",
            text_rcv_url: "http://www.xgo.com.cn/2566/"
        }, {
            text: "途锐",
            text_rcv_url: "http://www.xgo.com.cn/2513/"
        }, {
            text: "Tiguan",
            text_rcv_url: "http://www.xgo.com.cn/3296/"
        }, {
            text: "更多..",
            text_rcv_url: "http://product.xgo.com.cn/price_list/brand_29_2_0_1.shtml"
        }]
    }, {
        title: "跑车",
        links: [{
            text: "Scirocco尚酷",
            text_rcv_url: "http://www.xgo.com.cn/3750/"
        }, {
            text: "大众Eos",
            text_rcv_url: "http://www.xgo.com.cn/3433/"
        }, {
            text: "-"
        }, {
            text: "-"
        }, {
            text: "更多..",
            text_rcv_url: "http://product.xgo.com.cn/price_list/brand_29_3_0_1.shtml"
        }]
    }],
    table_foot: {
        text: "查看全部28款大众汽车",
        text_rcv_url: "http://product.xgo.com.cn/price_list/brand_29_1.shtml"
    },
    showurl: {
        site: "www.xgo.com.cn",
        date: "2013-9-13"
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */