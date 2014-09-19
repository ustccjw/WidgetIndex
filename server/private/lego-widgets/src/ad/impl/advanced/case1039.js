/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1039.js ~ 2013/11/18 11:42:13
 * @author chenli11@baidu.com (chenli11)
 * @version $Revision: 11222 $
 * @description
 * case1039相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.BaiduShare');

goog.include('ad/impl/advanced/case1039.less');

goog.provide('ad.impl.advanced.Case1039');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var widget = [];

    AD_CONFIG['video']['ipad_img'] = AD_CONFIG['video']['img_url'];

    var links = new ad.widget.Colorlist(AD_CONFIG['links']);

    var shareButton = AD_CONFIG['share']['is_show_share'];
    var share;
    if ('true' in shareButton) {

        var config = shareButton['true'];
        config['display'] = true;
        config['options'].push({'type': 'bds_more'});
        share = new ad.widget.BaiduShare(config);
        material.setWidgets(
            [new ad.widget.Video(AD_CONFIG['video'])],
            [links],
            [share]
        );

    } else {

        material.setWidgets(
            [new ad.widget.Video(AD_CONFIG['video'])],
            [links]
        );

    }
    
    if (async === true) {
        return material;
    }
    material.show();

    links.rewriteTitle2( links.getRoot(), '右侧', false );
    if ( 'true' in shareButton ) {
        share.rewriteTitle2( share.getRoot(), '右侧分享', false );
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
