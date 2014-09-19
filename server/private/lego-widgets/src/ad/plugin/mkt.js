/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/ad/plugin/jingsuan.js
 * desc:    百度精算插件
 * author:  xiongjie
 * version: $Revision$
 * date:    2013-07-24 15:17:46
 */
goog.require('ad.plugin.Plugin');
goog.require('ui.events');

goog.provide('ad.plugin.Hmt');

/**
 * 添加精算的监控统计
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.Hmt = function() {
    ad.plugin.Plugin.call(this);
    this._name = 'ad.plugin.Hmt';
};
baidu.inherits(ad.plugin.Hmt, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.Hmt());

/** @expose */
ad.plugin.Hmt.prototype.attachTo = function(material) {
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function() {
        var hmjs;
        var id = ad.base.getObjectByName('pluginParam/ad.plugin.Hmt/hmjs_id', RT_CONFIG, '/');
        if (id){
            if (baidu.g('_bdhm_mkt_' + id)) {
                hmjs = baidu.g('_bdhm_mkt_' + id);
            }
            else {
                hmjs = baidu.dom.create('div', {'id': '_bdhm_mkt_' + id});
            }
            baidu.dom.insertAfter(hmjs, material.getRoot());
            var mkt = document.createElement("script");
            mkt.src = (document && document.location && "https:" == document.location.protocol ? "https:" : "http:") + "//click.hm.baidu.com/mkt.js?" + id;
            baidu.dom.insertAfter(mkt, hmjs);
        }
    });
};




















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
