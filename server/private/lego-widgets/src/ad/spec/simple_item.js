/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/spec/simple_item.js
 * desc:    simple item
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/01 19:45:41$
 */

goog.require('ad.spec.Item');
goog.require('ad.spec.ItemType');

goog.provide('ad.spec.SimpleItem');

/**
 * 简单配置项
 * @param {Object} pref 表单配置项
 * @param {string=} opt_np 由name(即key)组成的name path
 * @param {string=} opt_dnp 由displayName组成的display name path
 * @extends {ad.spec.Item}
 * @constructor
 */
ad.spec.SimpleItem = function(pref, opt_np, opt_dnp) {
    ad.spec.Item.call(this, pref, opt_np, opt_dnp);

    /**
     * @type {ad.spec.ItemType}
     */
    this.type = ad.spec.ItemType.SIMPLE_ITEM;
};
baidu.inherits(ad.spec.SimpleItem, ad.spec.Item);



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
