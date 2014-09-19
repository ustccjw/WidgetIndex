/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/amd/plugin.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/01/16 12:24:04$
 */

goog.require('ad.base');
goog.require('ui.events');
goog.require('ad.plugin.Plugin');

goog.provide('ad.plugin.amd.Plugin');

/**
 * 插件的amd封装
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.amd.Plugin = function() {
    ad.plugin.Plugin.call(this);
};
baidu.inherits(ad.plugin.amd.Plugin, ad.plugin.Plugin);

/**
 * 将插件绑定到物料上
 */
ad.plugin.amd.Plugin.prototype.lazyAttachTo = function(material, path) {
    var me = this;
    function loadRealPlugin() { //后台渲染物料html时，ad.base.require依赖的document对象并不是真正的document，导致编译出错（插件代码一般在material show事件后执行）
        var requireId = path.replace(/[\W]/g, '');
        var requestUrl = me.getRealPath(path);
        ad.base.require(requireId, requestUrl, function(wrapper) {
            wrapper.set('AD_CONFIG', AD_CONFIG);
            wrapper.set('LINKS', LINKS);
            wrapper.set('RT_CONFIG', RT_CONFIG);

            var plugin = wrapper.start(true, true);
            plugin.attachTo(material);
        });
    }
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, loadRealPlugin);
};

/**
 * 获取带时间戳的url
 * @param {string} url 默认路径
 * @return {string}
 */
ad.plugin.amd.Plugin.prototype.getRealPath = function(url) {
    return url + (/\?/.test(url) ? '&' : '?') + 'cdnversion=' + Math.ceil(new Date() / 3600000);
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
