/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1095.js ~ 2013/11/06 17:22:49
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * case1095相关的实现逻辑
 **/
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');

goog.include('ad/impl/advanced/case1095.less');

goog.provide('ad.impl.advanced.Case1095');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var imageCartoon = new ad.widget.ImageCartoon(AD_CONFIG['image_cartoon']);
    var weiboConfig = AD_CONFIG['weibo']['type'];
    var weibo;
    if ('sina' in weiboConfig) {
        weibo = new ad.widget.SmallWeibo(weiboConfig['sina']);
    } else if ('qq' in weiboConfig) {
        weibo = new ad.widget.QQWeibo(weiboConfig['qq']);
    }

    material.setWidgets([video, [smallHead, weibo]], buttonGroup, imageCartoon);
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
