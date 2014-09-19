/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/amd/rcv2.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/01/06 21:47:23$
 */

goog.require('ad.base');
goog.require('ad.plugin.Plugin');
goog.require('ad.plugin.amd.Plugin');

goog.provide('ad.plugin.amd.Rcv2');

/**
 * rcv2插件的amd封装
 * @extends {ad.plugin.amd.Plugin}
 * @constructor
 */
ad.plugin.amd.Rcv2 = function() {
    ad.plugin.amd.Plugin.call(this);
    this._name = 'ad.plugin.amd.Rcv2';
};
baidu.inherits(ad.plugin.amd.Rcv2, ad.plugin.amd.Plugin);
ad.plugin.Plugin.register(new ad.plugin.amd.Rcv2());

/** @expose */
ad.plugin.amd.Rcv2.prototype.attachTo = function(material) {
    // XXX: 历史版本(以后每次对rcv2的变动，都需要新增一个版本，并更新下面的url)
    // 并需要将历史版本地址都贴在此处，以供以后更新维护
    this.lazyAttachTo(material, RT_CONFIG['HOST']('ecma.bdimg.com') + '/lego-mat/exported/plugin/rcv2.v1.js');
};















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
