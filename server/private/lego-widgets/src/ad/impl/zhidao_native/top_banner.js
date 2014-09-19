/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao_native/top_banner.js ~ 2014/04/18 21:01:07
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * top_banner相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.Flash');
goog.require('ad.plugin.ClickMonkey');
goog.require('ad.plugin.Rcv2');

goog.include('ad/impl/zhidao_native/top_banner.less');

goog.provide('ad.impl.zhidao_native.TopBanner');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var bannerData = AD_CONFIG['banner'];
    if (/swf$/i.test(bannerData['src'])) {
        var data = {
            'width': 960,
            'height': 90,
            'src': bannerData['src'],
            'link_rcv_url': bannerData['rcv_url']
        };
        var flash = new ad.widget.Flash(data);
        material.setWidgets(flash);
    }
    else {
        var image = new ad.widget.ImageLink(bannerData);
        material.setWidgets(image);
    }

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
