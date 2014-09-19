/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/**
 * src/ad/plugin/yinglang_gt.js ~ 2013/07/04 14:28:55
 * @author shaojunjie(shaojunjie@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
goog.require('ad.plugin.Plugin');
goog.require('ad.widget.ImageShowArrow');
goog.require('ad.widget.ButtonList');

goog.provide('ad.plugin.impl.YinglangGt');

/**
 * 英朗GT经典样式的功能扩展
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.YinglangGt = function() {
    ad.plugin.Plugin.call(this);
};
baidu.inherits(ad.plugin.impl.YinglangGt, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.YinglangGt());

/** @expose */
ad.plugin.impl.YinglangGt.prototype.attachTo = function(material) {
    var fwc0_image_show = new ad.widget.ImageShowArrow(AD_CONFIG['4']),
        fwc1_image_show = new ad.widget.ImageShowArrow(AD_CONFIG['5']),
        fwc2_image_show = new ad.widget.ImageShowArrow(AD_CONFIG['6']),
        fwc3_image_show = new ad.widget.ImageShowArrow(AD_CONFIG['7']),
        fwc0_button_list = new ad.widget.ButtonList(AD_CONFIG['8']),
        fwc1_button_list = new ad.widget.ButtonList(AD_CONFIG['9']),
        fwc2_button_list = new ad.widget.ButtonList(AD_CONFIG['10']),
        fwc3_button_list = new ad.widget.ButtonList(AD_CONFIG['11']);


    material.addListener(ui.events.BEFORE_MATERIAL_SHOW, function() {
        var fwc0 = material.getWidget(3, 0);
        var fwc1 = material.getWidget(3, 1);
        var fwc2 = material.getWidget(3, 2);
        var fwc3 = material.getWidget(3, 3);
        fwc0.setWidgets([fwc0_image_show, fwc0_button_list]);
        fwc1.setWidgets([fwc1_image_show, fwc1_button_list]);
        fwc2.setWidgets([fwc2_image_show, fwc2_button_list]);
        fwc3.setWidgets([fwc3_image_show, fwc3_button_list]);
        if(typeof(AD_STYLE_CONTENT) !== undefined){
            AD_STYLE_CONTENT = AD_STYLE_CONTENT.replace("#canvas .ad-inst-4", ".ad-inst-4").replace("#canvas .ad-inst-5", ".ad-inst-5").replace("#canvas .ad-inst-6", ".ad-inst-6").replace("#canvas .ad-inst-7", ".ad-inst-7");
        }
    });

    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function() {
        var fwc0 = material.getWidget(3, 0);
        var fwc1 = material.getWidget(3, 1);
        var fwc2 = material.getWidget(3, 2);
        var fwc3 = material.getWidget(3, 3);
        baidu.addClass(baidu.g(fwc0.getId('fwc')), 'ad-inst-4');
        baidu.addClass(baidu.g(fwc1.getId('fwc')), 'ad-inst-5');
        baidu.addClass(baidu.g(fwc2.getId('fwc')), 'ad-inst-6');
        baidu.addClass(baidu.g(fwc3.getId('fwc')), 'ad-inst-7');

        var fwc_arr = [fwc0, fwc1, fwc2, fwc3];
        var small_head_fwc = [fwc1, fwc2, fwc3];

        baidu.array.each(fwc_arr, function(item, index){
            var canvas = baidu.dom.first(item.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
            }
        });

        var small_head = material.getWidget(0, 1);
        var image_normal = material.getWidget(0, 0);
        image_normal.addListener(ui.events.CLICK, function(index, ev) {
            ev.preventDefault();
            fwc0.show();
            small_head.sendLog("浮层1：open");
        });

        small_head.addListener(ui.events.CLICK, function(index, me) {
            small_head_fwc[index].show();
            small_head.sendLog("浮层"+(index + 1)+"：open");
        });

        fwc0.addListener(ui.events.CLOSE, function() {
            fwc0.sendLog("浮层1：close");
        });

        baidu.array.each(small_head_fwc, function(item, index) {
            item.addListener(ui.events.CLOSE, function() {
                item.sendLog("浮层"+(index + 1)+"：close");
            });
        });

    });
};


/* vim: set ts=4 sw=4 sts=4 tw=100: */
