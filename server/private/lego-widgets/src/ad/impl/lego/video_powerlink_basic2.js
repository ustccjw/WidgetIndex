/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lego/video_powerlink_basic2.js ~ 2013/07/25 10:01:33
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * video_powerlink_basic2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.StyleMaterial');
goog.require('ad.lego');
goog.require('ad.widget.PlayerLookImage');
goog.require('ad.widget.Share');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.fakes.VideoPowerlinkBackground');
goog.require('ad.widget.LinkWithoutRcv');
goog.require('ad.plugin.impl.VideoPowerlinkBasic2');
// 日志统计的功能
goog.require('ad.plugin.ClickMonkey');

goog.include('ad/impl/lego/video_powerlink_basic2.less');

goog.provide('ad.impl.lego.VideoPowerlinkBasic2');

var LAYOUT = {
    "width": 480,
    "height": 315,
    "padding": [0, 0, 5, 0],
    "background": "",
    "margin": [0, 0, 0, 0],
    "rows": [
        {
            "width": 480,
            "height": 270,
            "padding": [0, 0, 0, 0],
            "index": 0,
            "ns": ad.widget.PlayerLookImage
        },
        {
            "width": 480,
            "height": 25,
            "padding": [0, 0, 0, 0],
            "cols": [
                {
                    "width": 380,
                    "height": 25,
                    "padding": [0, 0, 0, 0],
                    "index": 1,
                    "ns": ad.widget.Share
                },
                {
                    "width": 100,
                    "height": 25,
                    "padding": [0, 0, 0, 0],
                    "index": 5,
                    "ns": ad.widget.LinkWithoutRcv
                }
            ]
        },
        {
            "width": 480,
            "height": 15,
            "padding": [0, 0, 0, 0],
            "index": 2,
            "ns": ad.widget.FloatWindowContainer
        }
    ]
};

ad.Debug(function(){
    var id = ad.lego.getId();
    var material = new ad.StyleMaterial(id, LAYOUT, AD_CONFIG);

    if (typeof ECMA_define === "function") {
        ECMA_define(function(){ return material; });
    } else {
        material.show();
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */