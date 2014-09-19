/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: yili.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/yili.js ~ 2013/10/30 14:23:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/new_custom/yili.less');

goog.provide('ad.impl.new_custom.Yili');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var iframeTitle = new ad.widget.VideoTitle(AD_CONFIG['iframe_title']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);
    
    material.setWidgets(
        [
            title,
            [video, smallHead],
            iframeTitle,
            iframe,
            buttons
        ]
    );
    if (async === true) {
        return material;
    }
    material.show();
    
    iframeTitle.rewriteTitle2(iframeTitle.getRoot(), "表单区域标题", true);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
