/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: qtzvideotitle.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/qtz/qtzvideotitle.js ~ 2012/08/27 14:30:04
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * qtzfloat相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.Video');
goog.require('ad.widget.Share');

goog.include('ad/impl/qtz/qtzvideotitle.less');

goog.provide('ad.impl.qtz.Qtzvideotitle');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    material.setWidgets(
        [new ad.widget.VideoTitle(AD_CONFIG['video_title'])],
        [new ad.widget.Video(AD_CONFIG['video'])],
        [new ad.widget.Share(AD_CONFIG['share'])]
    );
    material.show();
    material.getCMS().init(material.getId());
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
