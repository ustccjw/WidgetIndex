/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/impl/guerlain_brandnew.js
 * desc:    娇兰新样式插件
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/23 10:36:05$
 */

goog.require('ad.plugin.Plugin');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FloatWindowContainer');

goog.provide('ad.plugin.impl.GuerLainBrandNew');

/**
 * 娇兰经典样式的功能扩展
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.GuerLainBrandNew = function() {
    ad.plugin.Plugin.call(this);
};
baidu.inherits(ad.plugin.impl.GuerLainBrandNew, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.GuerLainBrandNew());

/** @expose */
ad.plugin.impl.GuerLainBrandNew.prototype.attachTo = function(material) {
    var flash1 = new ad.widget.Flash(AD_CONFIG['4']);
    var flash2 = new ad.widget.Flash(AD_CONFIG['5']);
    var flash3 = new ad.widget.Flash(AD_CONFIG['6']);

    material.addListener(ui.events.BEFORE_MATERIAL_SHOW, function() {
        var fwc1 = material.getWidget(3, 0);
        var fwc2 = material.getWidget(3, 1);
        var fwc3 = material.getWidget(3, 2);
        fwc1.setWidgets([flash1]);
        fwc2.setWidgets([flash2]);
        fwc3.setWidgets([flash3]);
    });

    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function() {
        var fwc1 = material.getWidget(3, 0);
        var fwc2 = material.getWidget(3, 1);
        var fwc3 = material.getWidget(3, 2);
        var arrFwc = [fwc1, fwc2, fwc3];
        baidu.array.each(arrFwc, function(item, index) {
            var canvas = baidu.dom.first(item.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
            }
        });
        // 点击小图，打开浮层
        var smallHead = material.getWidget(0, 1);
        smallHead.addListener(ui.events.CLICK, function(index, me) {
            if(arrFwc[index]) {
                arrFwc[index].show();
            }
            // XXX: widget里已经发了监控
            // smallHead.sendLog("浮层" + (index + 1) + "打开(点击小图)");
            return false;
        });
    });
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
