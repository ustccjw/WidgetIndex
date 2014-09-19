/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/smart/video.js ~ 2013/10/31 11:27:41
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * video相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.smart.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Video');
goog.require('ad.widget.Section');

goog.include('ad/impl/smart/video.less');

goog.provide('ad.impl.smart.Video');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        new ad.widget.smart.Title(AD_CONFIG['title']),
        [
            new ad.widget.Video(AD_CONFIG['video']),
            [
                new ad.widget.SmallHead(AD_CONFIG['head']),
                new ad.widget.Section(AD_CONFIG['links'])
            ]
        ]
    );
    if (async === true) {
        return material;
    }

    material.show();
});









/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
