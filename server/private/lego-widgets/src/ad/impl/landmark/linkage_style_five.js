/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: linkage_style_five.js 12406 2012-09-28 03:46:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/linkage_style_five.js ~ 2012/09/28 11:32:23
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 12406 $
 * @description
 * linkage_style_five相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');

goog.require('ad.widget.LinkList');
goog.require('ad.widget.ImageShowArrow');
goog.require('ad.widget.VideoTitle');

goog.include('ad/impl/landmark/linkage_style_five.less');

goog.provide('ad.impl.landmark.LinkageStyleFive');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.VideoTitle(AD_CONFIG['title'])],
        [new ad.widget.ImageShowArrow(AD_CONFIG['tabs'])],
        [new ad.widget.LinkList(AD_CONFIG['more'])]
    );
    if (async === true) {
        return material;
    }

    material.show();
    var title = material.getWidget(0, 0);
    title.rewriteTitle2(title.getRoot(), "title", true);
    var more = material.getWidget(2, 0);
    more.rewriteTitle2(more.getRoot(), "more-pinz", true);
    var cms = material.getCMS();
    cms.init(material.getId());
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
