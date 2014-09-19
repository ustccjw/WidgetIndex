/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: qtz_image_slide_show_v2.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/qtz_image_slide_show_v2.js ~ 2013/10/29 11:46:25
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * 版本是259x146
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Section');
goog.require('ad.widget.BaiduShareV2');
goog.require('ad.widget.standard.ImageSlideShow');

goog.include('ad/impl/new_custom/qtz_image_slide_show_v2.less');

goog.provide('ad.impl.new_custom.QtzImageSlideShowV2');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var widgets = [];
    
    widgets.push(new ad.widget.standard.ImageSlideShow(AD_CONFIG['slide']));
    var links = AD_CONFIG['links'];
    if (links && links['options'] && links['options'].length) {
        widgets.push(new ad.widget.Section(links));
    }

    var shareButton = AD_CONFIG['baidu_share']['cfg'];
    if ('true' in shareButton) {
        var config = shareButton['true'];
        config['display'] = true;
        config['bds_more_first'] = true;
        widgets.push(new ad.widget.BaiduShareV2(config));
    }

    material.setWidgets(widgets);
    
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
