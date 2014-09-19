/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/plugin/GuerLainClassics.js ~ 2013/07/04 14:28:55
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
goog.require('ad.plugin.Plugin');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FloatWindowContainer');

goog.provide('ad.plugin.impl.GuerLainClassics');

/**
 * 娇兰经典样式的功能扩展
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.GuerLainClassics = function() {
    ad.plugin.Plugin.call(this);
};
baidu.inherits(ad.plugin.impl.GuerLainClassics, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.GuerLainClassics());

/** @expose */
ad.plugin.impl.GuerLainClassics.prototype.attachTo = function(material) {
    var flash1 = new ad.widget.Flash(AD_CONFIG['5']);
    var flash2 = new ad.widget.Flash(AD_CONFIG['7']);
    var flash3 = new ad.widget.Flash(AD_CONFIG['9']);
    material.addListener(ui.events.BEFORE_MATERIAL_SHOW, function() {
        var fwc1 = material.getWidget(3);
        var fwc2 = material.getWidget(4);
        var fwc3 = material.getWidget(5);
        fwc1.setWidgets([flash1]);
        fwc2.setWidgets([flash2]);
        fwc3.setWidgets([flash3]);
    });

    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function() {
        var fwc1 = material.getWidget(3);
        var fwc2 = material.getWidget(4);
        var fwc3 = material.getWidget(5);
        var small_head = material.getWidget(0, 1);
        var arr_fwc = [fwc1, fwc2, fwc3];

        baidu.array.each(arr_fwc, function(item, index){
            var canvas = baidu.dom.first(item.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
            }
        });
        small_head.addListener(ui.events.CLICK, function(index, me) {
            if(arr_fwc[index]) {
                arr_fwc[index].show();
            }
            small_head.sendLog("float" + (index + 1) + "open");
            return false;
        });
        baidu.array.each(arr_fwc, function(item, index) {
            item.addListener(ui.events.CLOSE, function() {
                if(arr_fwc[index]) {
                    arr_fwc[index].hide();
                }
            });
        });
    });
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
