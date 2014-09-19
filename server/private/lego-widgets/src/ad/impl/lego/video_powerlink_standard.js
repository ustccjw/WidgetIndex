/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lego/video_powerlink_standard.js ~ 2013/06/20 10:41:17
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * video_powerlink_standard相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.lego');
goog.require('ad.StyleMaterial');
goog.require('ad.widget.PlayerLookImage');
goog.require('ad.widget.Video');
goog.require('ad.widget.Share');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Button');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.plugin.impl.VideoPowerlinkStandard');

goog.include('ad/impl/lego/video_powerlink_standard.less');

goog.provide('ad.impl.lego.VideoPowerlinkStandard');

/*REQUIRE_REPLACE_MARK*/
var LAYOUT = {
    "width": 910,
    "height": 200,
    "padding": [0, 0, 0, 0],
    "background": "",
    "margin": [0, 0, 0, 0],
    "rows": [
        {
            "width": 910,
            "height": 154,
            "padding": [0, 0, 0, 0],
            "cols": [
                {
                    "width": 250,
                    "height": 154,
                    "padding": [0, 0, 5, 0],
                    "index": 0,
                    "ns": ad.widget.PlayerLookImage
                },
                {
                    "width": 660,
                    "height": 154,
                    "padding": [0, 0, 0, 0],
                    "rows": [
                        {
                            "width": 660,
                            "height": 116,
                            "padding": [0, 0, 15, 0],
                            "index": 1,
                            "ns": ad.widget.SmallHead
                        },
                        {
                            "width": 660,
                            "height": 38,
                            "padding": [8, 0, 0, 0],
                            "index": 2,
                            "ns": ad.widget.Button
                        }
                    ]
                }
            ]
        },
        {
            "width": 910,
            "height": 31,
            "padding": [0, 0, 0, 0],
            "index": 3,
            "ns": ad.widget.Share
        },
        {
            "width": 910,
            "height": 15,
            "padding": [0, 0, 0, 0],
            "index": 4,
            "ns": ad.widget.FloatWindowContainer
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
