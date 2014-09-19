/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/impl/lego/lv.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/15 09:23:43$
 */

goog.require('ad.Debug');
goog.require('ad.StyleMaterial');
goog.require('ad.lego');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.TabContainer');
goog.require('ad.plugin.impl.Lv');

goog.include('ad/impl/lego/lv.less');

goog.provide('ad.impl.lego.Lv');

/*REQUIRE_REPLACE_MARK*/
var LAYOUT = {
    "width": 524,
    "height": 408,
    "padding": [
        0,
        0,
        0,
        0
    ],
    "background": "",
    "backgroundColor": "",
    "borderWidth": 6,
    "borderColor": "#aa8d7e",
    "margin": [
        0,
        0,
        0,
        0
    ],
    "rows": [
        {
            "width": 524,
            "height": 231,
            "padding": [
                0,
                0,
                0,
                0
            ],
            "cols": [
                {
                    "width": 232,
                    "height": 231,
                    "padding": [
                        0,
                        0,
                        0,
                        0
                    ],
                    "rows": [
                        {
                            "width": 232,
                            "height": 197,
                            "padding": [
                                4,
                                0,
                                0,
                                4
                            ],
                            "index": 0,
                            "ns": ad.widget.Video
                        },
                        {
                            "width": 232,
                            "height": 34,
                            "padding": [
                                0,
                                0,
                                0,
                                4
                            ],
                            "index": 1,
                            "ns": ad.widget.VideoTitle
                        }
                    ]
                },
                {
                    "width": 292,
                    "height": 231,
                    "padding": [
                        0,
                        0,
                        0,
                        0
                    ],
                    "rows": [
                        {
                            "width": 292,
                            "height": 151,
                            "padding": [
                                4,
                                10,
                                7,
                                0
                            ],
                            "index": 2,
                            "ns": ad.widget.SmallHead
                        },
                        {
                            "width": 292,
                            "height": 40,
                            "padding": [
                                3,
                                10,
                                4,
                                0
                            ],
                            "index": 3,
                            "ns": ad.widget.ButtonList
                        },
                        {
                            "width": 292,
                            "height": 40,
                            "padding": [
                                3,
                                10,
                                6,
                                0
                            ],
                            "index": 4,
                            "ns": ad.widget.ButtonList
                        }
                    ]
                }
            ]
        },
        {
            "width": 524,
            "height": 177,
            "padding": [
                0,
                0,
                0,
                0
            ],
            "index": 5,
            "ns": ad.widget.TabContainer
        }
    ],
    "extraRequires": []
};

ad.Debug(function() {
    var id = ad.lego.getId();
    var material = new ad.StyleMaterial(id, LAYOUT, AD_CONFIG);
    material.show();
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
