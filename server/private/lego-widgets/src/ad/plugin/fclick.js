/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/plugin/fclick.js ~ 2013/11/23 18:48:20
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * siva的fclick统计.
 **/
goog.require('ad.base');
goog.require('ad.plugin.Plugin');
goog.require('ui.events');

goog.provide('ad.plugin.FClick');

/**
 * 添加fc的监控统计
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.FClick = function() {
    ad.plugin.Plugin.call(this);
    this._name = 'ad.plugin.FClick';
};
baidu.inherits(ad.plugin.FClick, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.FClick());

/** @expose */
ad.plugin.FClick.prototype.attachTo = function(material) {
    var me = this;
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function() {
        material.forEach(function(widget) {
            // FIXME(leeight) 重构的时候一起修改.
            widget.addListener(ui.events.SEND_LOG, function(logData) {
                me._sendLogImpl(logData);
            });
        });
    });
};

/**
 * 发送统计日志.
 * @param {Object} logData 统计日志数据.
 */
ad.plugin.FClick.prototype._sendLogImpl = function(logData) {
    var url = RT_CONFIG['HOST']('fclick.baidu.com') + '/w.gif?'+ baidu.url.jsonToQuery(logData);
    baidu.sio.log(url);
};
