/***************************************************************************
 * 
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    ../../../src/ad/test/demo.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2012/11/22 15:28:17$
 */

goog.require('ad.Debug');
goog.require('ad.StyleMaterial');
goog.require('ad.lego');
goog.require('ad.widget.H1');
goog.require('ad.widget.H2');
// goog.include('ad/test/demo.less');

goog.provide('ad.test.Demo');

AD_CONFIG = {
    '0': {
        'url' : 'http://www.baidu.com',
        'title' : '<em>多美滋</em>源自欧洲市场领先者',
        'description' : '多美滋源自欧洲市场领先者，母公司旗下多个品牌在欧洲市场处于领先地位，具备国际领先的创新和研发能力。根据中国宝宝不同阶段的成长需求，推出全新 优阶系列产品，采用\"分阶营养强化\"，配方，让宝宝在各阶段展现成长优势。根据中国宝宝。<a href=\"###\">新浪微博入口</a>',
        'description_url': 'http://www.baidu.com',
        'site' : '1000day.dumex.com.cn/',
        'query':[
            {
                'key_word':'机甲',
                'url':'www.baidu.com'
            },
            {
                'key_word':'新玩法',
                'url':'www.baidu.com'
            },
            {
                'key_word':'公平',
                'url':'www.baidu.com'
            },
            {
                'key_word':'专业',
                'url':'www.baidu.com'
            }
        ],
        'logo': {
            'logo_url': 'http://www.baidu.com',
            'logo': 'http://bs.baidu.com/adtest/c7186a9d3636dfdecb40f92846137774.jpg'
        }
    },
    '1' : {
        'services' : '夏日推荐',
        'price_title' : '草莓价',
        'data' : [
            {
                'title' : '茱莉蔻极萃白系列-美白天使',
                'url' : 'http://cn.strawberrynet.com/skincare/jurlique/?trackid=1411300027&utm_source=Baidu%20Brandzone&utm_medium=cpc&utm_term=Baidu_Brandzone_Product%20info_1&utm_campaign=Brandzone&utm_content=Adtext#16881',
                'image' : 'http://eiv.baidu.com/mapm2/strawberry/120727_pl_01/1.jpg',
                'price' : 289
            },
            {
                'title' : '娇兰花草水语栀子含羞草',
                'url' : 'http://cn.strawberrynet.com/perfume/guerlain/?trackid=1411300029&utm_source=Baidu%20Brandzone&utm_medium=cpc&utm_term=Baidu_Brandzone_Product%20info_2&utm_campaign=Brandzone&utm_content=Adtext#14668',
                'image' : 'http://eiv.baidu.com/mapm2/strawberry/120727_pl_01/2.jpg',
                'price' : 311
            },
            {
                'title' : '安娜苏梦幻彩妆走进童话世界',
                'url' : 'http://cn.strawberrynet.com/makeup/anna-sui/?trackid=1411300029&utm_source=Baidu%20Brandzone&utm_medium=cpc&utm_term=Baidu_Brandzone_Product%20info_3&utm_campaign=Brandzone&utm_content=Adtext#17009',
                'image' : 'http://eiv.baidu.com/mapm2/strawberry/120727_pl_01/3.jpg',
                'price' : 195
            }
        ]
    }
};

var LAYOUT = {
    "width": 540,
    "height": 225,
    "padding": [0, 0, 0, 0],
    "margin": [0, 0, 0, 0],
    "background": "http://bs.baidu.com/adcoup-mat/8e2e201f-8a85-4347-aee3-fe82a570c3c6.jpg",
    "backgroundColor": "#ccc",
    "borderWidth": 10,
    "borderColor": "#369",
    "rows": [
        {
            "height": 82,
            "width": 540,
            "ns": ad.widget.H1,
            "index": 0
        },
        {
            "height": 82,
            "width": 540,
            "cols": [
                {
                    "height": 82,
                    "width": 270,
                    "ns": ad.widget.H2,
                    "index": 1
                },
                {
                    "height": 82,
                    "width": 270,
                    "ns": ad.widget.H2,
                    "index": 1
                }
            ]
        }
    ]
};

ad.Debug(function() {
    var id = ad.lego.getId();
    var material = new ad.StyleMaterial(id, LAYOUT, AD_CONFIG);
    if (typeof ECMA_define === "function") {
        ECMA_define(function(){ return material; });
    } else {
        material.show();
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
