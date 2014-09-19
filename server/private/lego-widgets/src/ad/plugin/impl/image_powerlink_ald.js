/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/plugin/image_ald.js ~ 2013/07/04 13:57:46
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
goog.require('ad.lego');
goog.require('ad.plugin.Plugin');
goog.require('ad.plugin.api.ImageAld');

goog.provide('ad.plugin.impl.ImagePowerlinkAld');

/**
 * 图片阿拉丁的功能扩展
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.ImagePowerlinkAld = function() {
    ad.plugin.Plugin.call(this);
}
baidu.inherits(ad.plugin.impl.ImagePowerlinkAld, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.ImagePowerlinkAld());

/** @expose */
ad.plugin.impl.ImagePowerlinkAld.prototype.attachTo = function(material) {
    ad.lego.exportContext({
        'material': material
    });
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function(){
        baidu.dom.setStyles(
            material.getRoot(),
            {
                'display': 'none',
                'font': '12px/1.5 arial,sans-serif'
            }
        );
        var aldWidget = material.getWidget(0);
        baidu.dom.setStyle(aldWidget.getRoot().parentNode, 'width', 'auto');
    });
}




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
