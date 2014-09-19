/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/app_tag.js
 * desc:    往物料容器上加上一个所属产品线的标记
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/02/13 11:40:00$
 */

goog.require('ad.plugin.Plugin');
goog.require('ad.base');
goog.require('ui.events');

goog.provide('ad.plugin.AppTag');

/**
 * 往物料容器上加上一个所属产品线的标记
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.AppTag = function() {
    ad.plugin.Plugin.call(this);
    this._name = 'ad.plugin.AppTag';
};
baidu.inherits(ad.plugin.AppTag, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.AppTag());

/** @expose */
ad.plugin.AppTag.prototype.attachTo = function(material) {
    function afterHandler() {
        var root = material.getRoot();
        var appId = ad.base.getObjectByName('pluginParam/ad.plugin.AppTag/appId', RT_CONFIG, '/');
        root.setAttribute('data-app', appId);
    }

    // 重跑错过了的事件，然后后续事件由监听函数接管
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, afterHandler, true);
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
