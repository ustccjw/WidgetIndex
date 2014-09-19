/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lego/image_powerlink_slider.js ~ 2013/06/19 20:11:51
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * image_powerlink_slider相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.StyleMaterial');
goog.require('ad.lego');
goog.require('ad.widget.TabSlider');
goog.require('ad.widget.ImageTopBackground');
goog.require('ad.widget.Image');
goog.require('ad.plugin.impl.ImagePowerlinkSlider');

goog.include('ad/impl/lego/image_powerlink_slider.less');

goog.provide('ad.impl.lego.ImagePowerlinkSlider');

/*REQUIRE_REPLACE_MARK*/
var LAYOUT = {
    "width": 1000,
    "height": 198,
    "padding": [0, 0, 0, 0],
    "background": "",
    "margin": [0, 0, 0, 0],
    "rows": [
        {
            "width": 1000,
            "height": 183,
            "padding": [0, 0, 0, 0],
            "cols": [
                {
                    "width": 954,
                    "height": 183,
                    "padding": [0, 0, 0, 0],
                    "index": 0,
                    "ns": ad.widget.TabSlider
                },
                {
                    "width": 46,
                    "height": 183,
                    "padding": [0, 0, 0, 0],
                    "index": 2,
                    "ns": ad.widget.Image
                }
            ]
        },
        {
            "width": 1000,
            "height": 15,
            "padding": [0, 0, 0, 0],
            "index": 1,
            "ns": ad.widget.ImageTopBackground
        }
    ]
};
/*PLUGIN_BEFORE_REPLACE_MARK*/

ad.Debug(function() {
    var id = ad.lego.getId();
    var material = new ad.StyleMaterial(id, LAYOUT, AD_CONFIG);
    material.show();
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
