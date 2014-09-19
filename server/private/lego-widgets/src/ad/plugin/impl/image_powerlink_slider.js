/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/plugin/image_powerlink_slider_plugin.js ~ 2013/07/04 14:10:04
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
goog.require('ad.plugin.Plugin');

goog.provide('ad.plugin.impl.ImagePowerlinkSlider');

/**
 * 图片阿拉丁的功能扩展
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.ImagePowerlinkSlider = function() {
    ad.plugin.Plugin.call(this);
}
baidu.inherits(ad.plugin.impl.ImagePowerlinkSlider, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.ImagePowerlinkSlider());

/** @expose */
ad.plugin.impl.ImagePowerlinkSlider.prototype.attachTo = function(material) {
    material.addListener(ui.events.BEFORE_MATERIAL_SHOW, function() {
        AD_CONFIG['0']['width'] = 950;
        AD_CONFIG['0']['height'] = 200;
    });
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function() {
        baidu.dom.setStyles(
            material.getRoot(),
            {
                'margin': '128px auto 35px',
                'width': '954px'
            }
        );
        var inst0Ctner = baidu.q('ad-inst-0', material.getRoot());
        if (inst0Ctner && inst0Ctner.length) {
            baidu.dom.setStyles(
                inst0Ctner[0],
                {
                    'width': '950px',
                    'border': '2px solid white'
                }
            );
        }
    });
}





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
