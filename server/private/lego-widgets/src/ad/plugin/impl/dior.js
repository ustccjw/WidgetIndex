/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/impl/dior.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/15 12:52:52$
 */

goog.require('ad.plugin.Plugin');
goog.require('ad.plugin.Hmt');

goog.provide('ad.plugin.impl.Dior');

/**
 * dior样式的功能扩展
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.Dior = function() {
    ad.plugin.Plugin.call(this);
}
baidu.inherits(ad.plugin.impl.Dior, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.Dior());

/** @expose */
ad.plugin.impl.Dior.prototype.attachTo = function(material) {
    material.addListener(ui.events.BEFORE_MATERIAL_SHOW, function() {
        // 已经在品专产品线上加了精算，此段代码不再需要
        /*
        var title = AD_CONFIG['1']['titletext'];
        // 对迪奥的物料加上精算监控
        if (/\u8fea\u5965|dior/i.test(title)) {
            AD_CONFIG['global'] = AD_CONFIG['global'] || {};
            AD_CONFIG['global']['hmjs_id'] = 'f9a4ab142d5d033ad526ace3aaa15a00';
        }
        */
    });
}



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
