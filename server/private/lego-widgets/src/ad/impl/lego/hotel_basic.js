/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lego/hotel_basic.js ~ 2013/06/20 10:41:17
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * video_powerlink_standard相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.lego');
goog.require('ad.StyleMaterial');

goog.require('ad.widget.H1');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ButtonGroup');

goog.require('ad.widget.HotelForm');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.HotLine');

goog.require('ad.plugin.impl.HotelBasic');

goog.include('ad/impl/lego/hotel_basic.less');

goog.provide('ad.impl.lego.HotelBasic');

/*PLUGIN_BEFORE_REPLACE_MARK*/
var LAYOUT = {
    'width': 535,
    'height': 325,
    'padding': [0, 0, 0, 0],
    'margin': [0, 0, 20, 0],
    'background': "",
    'backgroundColor': "",
    'borderWidth': 0,
    'borderColor': "",
    'extraRequires': [{
        'index': 3,
        'ns': ad.widget.HotelForm
    }, {
        'index': 4,
        'ns': ad.widget.ImageCartoon
    }, {
        'index': 5,
        'ns': ad.widget.TabCont
    }, {
        'index': 6,
        'ns': ad.widget.HotLine
    }],
    'rows': [{
        'width': 535,
        'height': 130,
        'padding': [0, 0, 0, 0],
        'index': 0,
        'ns': ad.widget.H1
    }, {
        'width': 535,
        'height': 159,
        'padding': [0, 0, 0, 0],
        'index': 1,
        'ns': ad.widget.TabContainer
    }, {
        'width': 535,
        'height': 36,
        'padding': [0, 0, 0, 0],
        'index': 2,
        'ns': ad.widget.ButtonGroup
    }]
};
/*PLUGIN_BEFORE_REPLACE_MARK*/

ad.Debug(function(async) {
    var id = ad.lego.getId();
    var material = new ad.StyleMaterial(id, LAYOUT, AD_CONFIG);
    if (async === true) {
        return material;
    }
    material.show();
});




















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
