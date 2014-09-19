/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lego/image_powerlink_ald.js ~ 2013/06/18 20:50:37
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * image_powerlink_ald相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.lego');
goog.require('ad.StyleMaterial');
goog.require('ad.widget.bzt.ImageAld');
goog.require('ad.plugin.impl.ImagePowerlinkAld');

goog.include('ad/impl/lego/image_powerlink_ald.less');

goog.provide('ad.impl.lego.ImagePowerlinkAld');

/*REQUIRE_REPLACE_MARK*/
var LAYOUT = {
    "width": 840,
    "height": 115,
    "padding": [0, 0, 0, 0],
    "background": "",
    "margin": [0, 0, 0, 0],
    "rows": [
        {
            "width": 840,
            "height": 115,
            "padding": [0, 0, 0, 0],
            "index": 0,
            "ns": ad.widget.bzt.ImageAld
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
