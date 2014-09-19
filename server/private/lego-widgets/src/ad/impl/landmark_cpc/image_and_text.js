/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark_cpc/image_and_text.js ~ 2014/06/05 16:27:20
 * @author loutongbing@baidu.com (loutongbing)
 * @version $Revision: 11222 $
 * @description
 * image_and_text相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.siva.Title_icon16');
goog.require('ad.widget.siva.ImgWithSitelinksV2');
goog.require('ad.widget.siva.DescriptionV2');
goog.require('ad.widget.siva.Showurl');

goog.include('ad/impl/landmark_cpc/image_and_text.less');

goog.provide('ad.impl.landmark_cpc.ImageAndText');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    // material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [new ad.widget.siva.Title_icon16(AD_CONFIG['title'])],
        [new ad.widget.siva.ImgWithSitelinksV2(AD_CONFIG['image_and_text'])],
        [new ad.widget.siva.DescriptionV2(AD_CONFIG['description'])],
        [new ad.widget.siva.Showurl(AD_CONFIG['url'])]

    );
    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
