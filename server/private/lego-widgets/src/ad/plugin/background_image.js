/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/plugin/background_image_plugin.js ~ 2013/07/04 10:59:21
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 因为Plugin和Material的代码可以获取同样的AD_CONFIG, LINKS, RT_CONFIG，因此
 * 放到同样的Context，也可以不放到同样的Context.
 * (function(AD_CONFIG, LINKS, RT_CONFIG){
 *  // plugin1 code
 *  // plugin2 code
 * })(AD_CONFIG_1, LINKS_1, RT_CONFIG_1);
 *
 * (function(AD_CONFIG, LINKS, RT_CONFIG){
 *   // material code
 * })(AD_CONFIG_1, LINKS_1, RT_CONFIG_1);
 */
goog.require('ad.plugin.Plugin');
goog.require('ui.events');
goog.require('ad.url');

goog.provide('ad.plugin.BackgroundImage');

/**
 * 展示物料的背景图
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.BackgroundImage = function() {
    ad.plugin.Plugin.call(this);
    this._name = 'ad.plugin.BackgroundImage';
};
baidu.inherits(ad.plugin.BackgroundImage, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.BackgroundImage());

/** @expose */
ad.plugin.BackgroundImage.prototype.attachTo = function(material) {
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function() {
        // AD_CONFIG应该是所属material用到的AD_CONFIG
        var background = ad.base.getObjectByName('global.background', AD_CONFIG);
        if (background) {
            var ele = baidu.q('ad-material-inside', material.getRoot());
            if (ele && ele.length) {
                ele[0].style.backgroundImage = 'url(' + background + ')';
            }
            else { // 兼容JS生成的样式
                material.getRoot().style.backgroundImage = 'url(' + background + ')';
            }
        }
    });
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
