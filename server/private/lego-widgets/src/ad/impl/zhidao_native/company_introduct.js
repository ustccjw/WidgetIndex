/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao_native/company_introduct.js ~ 2014/04/18 19:09:10
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * company_introduct相关的实现逻辑
 **/

goog.require('ui.events');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.Flash');
goog.require('ad.widget.zhidao_native.CompanyIntroduct');
goog.require('ad.widget.zhidao_native.CompanyLeaveMessage');
goog.require('ad.plugin.ClickMonkey');
goog.require('ad.plugin.Rcv2');

goog.include('ad/impl/zhidao_native/company_introduct.less');

goog.provide('ad.impl.zhidao_native.CompanyIntroduct');

ad.Debug(function(async) {
    var bannerData = AD_CONFIG['banner'];
    var banner = null;
    if (/swf$/i.test(bannerData['src'])) {
        var data = {
            'width': 250,
            'height': 194,
            'src': bannerData['src'],
            'link_rcv_url': bannerData['rcv_url']
        };
        banner = new ad.widget.Flash(data);
    }
    else {
        banner = new ad.widget.ImageLink(bannerData);
    }
    var material = new ad.material.BaseMaterial();
    var introduct = new ad.widget.zhidao_native.CompanyIntroduct(AD_CONFIG['introduct']);
    material.setWidgets(banner, introduct);

    if (async === true) {
        return material;
    }
    material.show();

    banner.rewriteTitle2(null, '右侧');
    if (AD_CONFIG['introduct']['show_online_message']) {
        var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
        var plid = ad.base.getObjectByName('pluginParam/ad.plugin.ClickMonkey/plid', RT_CONFIG, '/');
        var leaveMessage = new ad.widget.zhidao_native.CompanyLeaveMessage({
            'parent_plid': plid
        });
        fwc.setWidgets(leaveMessage);

        introduct.addListener(ui.events.CLICK, function(e) {
            fwc.show();
        });

        leaveMessage.addListener(ui.events.CLICK, function(e) {
            fwc.close();
        });
    }

    // TODO
    /*
    function relocateHandler() {
        var canvas = material.getRoot();
    }
    baidu.on(window, 'resize', relocateHandler);
    baidu.on(window, 'scroll', relocateHandler);
    */
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
