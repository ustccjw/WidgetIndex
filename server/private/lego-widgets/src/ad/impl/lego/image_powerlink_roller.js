/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lego/image_powerlink_roller.js ~ 2013/06/18 15:56:24
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * image_powerlink_roller相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.StyleMaterial');
goog.require('ad.lego');
goog.require('ad.widget.Slider');
goog.require('ad.widget.ImageGrid');
goog.require('ad.widget.Image');
goog.require('ad.widget.ImageTopBackground');
goog.require('ad.plugin.impl.ImagePowerlinkRoller2');

goog.include('ad/impl/lego/image_powerlink_roller.less');

goog.provide('ad.impl.lego.ImagePowerlinkRoller');

/*REQUIRE_REPLACE_MARK*/
var LAYOUT = {
    "width": 996,
    "height": 220,
    "padding": [0, 0, 0, 0],
    "background": "",
    "margin": [0, 0, 0, 0],
    "rows": [
        {
            "width": 996,
            "height": 220,
            "padding": [0, 0, 0, 0],
            "cols": [
                {
                    "width": 680,
                    "height": 220,
                    "padding": [10, 0, 10, 10],
                    "index": 0,
                    "ns": ad.widget.Slider
                },
                {
                    "width": 294,
                    "height": 220,
                    "padding": [10, 0, 6, 0],
                    "index": 1,
                    "ns": ad.widget.ImageGrid
                },
                {
                    "width": 22,
                    "height": 220,
                    "padding": [10, 0, 10, 0],
                    "index": 2,
                    "ns": ad.widget.Image
                }
            ]
        },
        {
            "width": 840,
            "height": 15,
            "padding": [0, 0, 0, 0],
            "index": 3,
            "ns": ad.widget.ImageTopBackground
        }
    ]
};
/*PLUGIN_BEFORE_REPLACE_MARK*/

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
