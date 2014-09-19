/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/plugin/image_powerlink_roller_plugin.js ~ 2013/07/04 14:06:03
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
goog.require('ad.plugin.Plugin');

goog.provide('ad.plugin.impl.ImagePowerlinkRoller');

/**
 * 图片阿拉丁的功能扩展
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.ImagePowerlinkRoller = function() {
    ad.plugin.Plugin.call(this);
}
baidu.inherits(ad.plugin.impl.ImagePowerlinkRoller, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.ImagePowerlinkRoller());

/** @expose */
ad.plugin.impl.ImagePowerlinkRoller.prototype.attachTo = function(material) {
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function(){
        baidu.dom.setStyles(
            material.getRoot(),
            {
                'position': 'relative',
                'z-index': '1',
                'font': '12px/1.5 arial,sans-serif',
                'margin': '128px auto 35px',
                'width': '974px'
            }
        );
        var inst0 = baidu.q('ad-inst-0', material.getRoot());
        var inst1 = baidu.q('ad-inst-1', material.getRoot());
        baidu.each(inst0.concat(inst1), function(ele) {
            baidu.dom.setStyle(ele, 'background-color', 'white');
        });
    });
}




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
