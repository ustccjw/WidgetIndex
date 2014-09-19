/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/ad/plugin/get_adid.js
 * desc:
 * author:  shaojunjie(shaojunjie@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/24 12:14:59$
 */
goog.require('ad.base');
goog.require('ad.plugin.Plugin');

goog.provide('ad.plugin.GetADID');

/**
 * 获取ADID
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.GetADID = function() {
    ad.plugin.Plugin.call(this);
};
baidu.inherits(ad.plugin.GetADID, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.GetADID());

/** @expose */
ad.plugin.GetADID.prototype.attachTo = function(material) {
    var adid = (ad.base.getObjectByName('pluginParam/ad.plugin.GetADID/adid', RT_CONFIG, '/'));
    RT_CONFIG['adid'] = adid;
};



/* vim: set ts=4 sw=4 sts=4 tw=100 : */