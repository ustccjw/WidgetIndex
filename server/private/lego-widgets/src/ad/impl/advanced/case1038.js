/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1038.js ~ 2013/11/08 10:36:32
 * @author chenli11@baidu.com (chenli11)
 * @version $Revision: 11222 $
 * @description
 * case1038相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.Video');
goog.require('ad.widget.BaiduShare');

goog.include('ad/impl/advanced/case1038.less');

goog.provide('ad.impl.advanced.Case1038');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    var videoTitle = new ad.widget.VideoTitle(AD_CONFIG['video_title']);

    var shareButton = AD_CONFIG['share']['is_show_share'];
    var share;
    if ('true' in shareButton) {

        var config = shareButton['true'];
        config['display'] = true;
        config['options'].push({'type': 'bds_more'});
        share = new ad.widget.BaiduShare(config);
        material.setWidgets(
            [videoTitle],
            [new ad.widget.Video(AD_CONFIG['video'])],
            [share]
        );

    } else {

        material.setWidgets(
            [videoTitle],
            [new ad.widget.Video(AD_CONFIG['video'])]
        );

    }
    
    if (async === true) {
        return material;
    }
    material.show();

    videoTitle.rewriteTitle2( videoTitle.getRoot(), '右侧', false );
    if ( 'true' in shareButton ) {
        share.rewriteTitle2( share.getRoot(), '右侧分享', false );
    }

});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
