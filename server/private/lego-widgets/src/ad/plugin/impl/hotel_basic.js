/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/plugin/hotel_basic.js ~ 2013/07/04 14:28:55
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
goog.require('ad.plugin.Plugin');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.HotLine');
goog.require('ad.widget.HotelForm');

goog.provide('ad.plugin.impl.HotelBasic');

/**
 * 娇兰经典样式的功能扩展
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.HotelBasic = function() {
    ad.plugin.Plugin.call(this);
};
baidu.inherits(ad.plugin.impl.HotelBasic, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.HotelBasic());

/** @expose */
ad.plugin.impl.HotelBasic.prototype.attachTo = function(material) {
    material.addListener(ui.events.BEFORE_MATERIAL_SHOW, function() {
        var tabContainer = material.getWidget(1);

        tabContainer.addListener(ui.events.TAB_CHANGE, function(index) {
            baidu.addClass(tabContainer.getId('tab-content-' + index),
                'ad-inst-' + (3 + index));
        });

        var hotel_form = new ad.widget.HotelForm(AD_CONFIG['3']);
        var image_cartoon = new ad.widget.ImageCartoon(AD_CONFIG['4']);
        var tab_cont = new ad.widget.TabCont(AD_CONFIG['5']);
        var hot_line = new ad.widget.HotLine(AD_CONFIG['6']);
        tabContainer.setWidgets([hotel_form, image_cartoon, tab_cont, hot_line]);
    });
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
