/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/plugin/image_powerlink_roller_custom.js ~ 2013-09-12 10:37:12
 * @author xiongjie
 * @version $Revision$
 * @description
 *
 **/
goog.require('ad.plugin.Plugin');

goog.provide('ad.plugin.impl.ImagePowerlinkRollerCustom');

/**
 * 鼎图高级样式A-定制
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.ImagePowerlinkRollerCustom = function() {
    ad.plugin.Plugin.call(this);
}
baidu.inherits(ad.plugin.impl.ImagePowerlinkRollerCustom, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.ImagePowerlinkRollerCustom());

/** @expose */
ad.plugin.impl.ImagePowerlinkRollerCustom.prototype.attachTo = function(material) {
    if (AD_CONFIG["4"].options && AD_CONFIG["4"].options.length <= 6) { //图片大于6张才显示翻页箭头
        AD_CONFIG["4"]["disable"] = true;
    }
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function() {
        baidu.dom.setStyles(
            material.getRoot(), {
                'position': 'relative',
                'z-index': '1',
                'font': '12px/1.5 arial,sans-serif',
                'margin': '128px auto 35px',
                'width': '980px'
            }
        );
        var inst0 = baidu.q('ad-r0c0', material.getRoot());
        baidu.dom.setStyles(inst0, {
            'background-color': '#fff'
        });
    });
}









/* vim: set ts=4 sw=4 sts=4 tw=100: */
