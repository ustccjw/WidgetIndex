/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: coca.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/coca.js ~ 2013/10/30 14:23:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Video');
goog.require('ad.widget.CocaPincode');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/new_custom/coca.less');

goog.provide('ad.impl.new_custom.Coca');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial(AD_CONFIG['id']);
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var weibo = new ad.widget.SmallWeibo(AD_CONFIG['weibo']);
    var pincodeForm = new ad.widget.CocaPincode(AD_CONFIG['form']);
    var button = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);
    var widgets = [
        [title],
        [video, smallHead, weibo],
        [pincodeForm],
        [button]
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
