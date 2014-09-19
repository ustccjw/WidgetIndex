/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/plugin/image_powerlink_slider_custom.js ~ 2013-09-12 10:33:04
 * @author xiongjie
 * @version $Revision$
 * @description
 *
 **/
goog.require('ad.plugin.Plugin');

goog.provide('ad.plugin.impl.ImagePowerlinkSliderCustom');

/**
 * 鼎图高级样式B-定制
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.ImagePowerlinkSliderCustom = function() {
    ad.plugin.Plugin.call(this);
}
baidu.inherits(ad.plugin.impl.ImagePowerlinkSliderCustom, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.ImagePowerlinkSliderCustom());

/** @expose */
ad.plugin.impl.ImagePowerlinkSliderCustom.prototype.attachTo = function(material) {
    if (AD_CONFIG["3"].options && AD_CONFIG["3"].options.length <= 6) { //图片大于6张才显示翻页箭头
        AD_CONFIG["3"]["disable"] = true;
    }
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function() {
        var materailRoot = material.getRoot();
        baidu.dom.setStyles(
            materailRoot, {
                'margin': '128px auto 35px',
                'width': '954px'
            }
        );
        var inst0Ctner = baidu.q('ad-r0c0', materailRoot);
        if (inst0Ctner) {
            baidu.dom.setStyle(inst0Ctner[0], 'border', '2px solid #fff');
        }

        var plLogo = baidu.q('ad-r0c1', materailRoot); //给左边内容添加了宽度，就得相应减小logo的宽度
        if (plLogo) {
            baidu.dom.setStyle(plLogo[0], 'width', '24px');
        }
    });
}









/* vim: set ts=4 sw=4 sts=4 tw=100: */
