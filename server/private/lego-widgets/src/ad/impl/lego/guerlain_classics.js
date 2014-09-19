/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lego/guerlain_classics.js ~ 2013/06/20 10:41:17
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * video_powerlink_standard相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.lego');
goog.require('ad.StyleMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.Section');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.plugin.impl.GuerLainClassics');

goog.include('ad/impl/lego/guerlain_classics.less');

goog.provide('ad.impl.lego.GuerLainClassics');

/*PLUGIN_BEFORE_REPLACE_MARK*/
var LAYOUT = {
    width: 535,
    height: 360,
    padding: [10, 10, 10, 10],
    margin: [0, 0, 20, 0],
    background: "",
    backgroundColor: "#f3f0e9",
    borderWidth: 0,
    borderColor: "",
    extraRequires: [{
        index: 5,
        ns: ad.widget.Flash
    }, {
        index: 7,
        ns: ad.widget.Flash
    }, {
        index: 9,
        ns: ad.widget.Flash
    }],
    rows: [{
        cols: [{
            width: 220,
            height: 195,
            padding: [0, 0, 0, 0],
            index: 0,
            ns: ad.widget.Video
        }, {
            width: 295,
            height: 195,
            padding: [0, 0, 0, 14],
            index: 1,
            ns: ad.widget.SmallHead
        }],
        width: 515,
        height: 195,
        padding: [0, 0, 0, 0]
    }, {
        width: 515,
        height: 71,
        padding: [10, 0, 0, 0],
        index: 2,
        ns: ad.widget.Section
    }, {
        width: 515,
        height: 26,
        padding: [10, 0, 0, 0],
        index: 3,
        ns: ad.widget.ButtonGroup
    }, {
        width: 515,
        height: 16,
        padding: [10, 0, 0, 0],
        index: 4,
        ns: ad.widget.FloatWindowContainer
    }, {
        width: 515,
        height: 17,
        padding: [10, 0, 0, 0],
        index: 6,
        ns: ad.widget.FloatWindowContainer
    }, {
        width: 515,
        height: 15,
        padding: [10, 0, 0, 0],
        index: 8,
        ns: ad.widget.FloatWindowContainer
    }]
};
/*PLUGIN_BEFORE_REPLACE_MARK*/
    
ad.Debug(function() {
    var id = ad.lego.getId();
    var material = new ad.StyleMaterial(id, LAYOUT, AD_CONFIG);
    material.show();
});




















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
