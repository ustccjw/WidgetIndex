/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/galaxy/card_main.js ~ 2013/12/04 17:32:51
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * card_main相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.gx_sck.CardMainNew');

goog.include('ad/impl/galaxy/card_main.less');

goog.provide('ad.impl.galaxy.CardMain');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    // PS分享菜单获取标题
    if (AD_CONFIG['main']['ps_select'] && !AD_CONFIG['main']['ps_select']['title']) {
        AD_CONFIG['main']['ps_select']['title'] = AD_CONFIG['head']['title'];
    }

    var widgetHead = new ad.widget.Title(AD_CONFIG['head']);
    var widgetCard = new ad.widget.gx_sck.CardMainNew(AD_CONFIG['main']);
    material.setWidgets(
        widgetHead,
        widgetCard
    );
    if (async === true) {
        return material;
    }
    material.show();
    if (AD_CONFIG['ader_info']) {
        window['ecom_gx_ylzx_info'] = function(data) { //官网和V认证
            if (data) {
                if (data['is_show_site']) {
                    var header = widgetHead.getRoot();
                    var site_icon = baidu.q('ec-official-site', header)[0];
                    site_icon.style.display = "inline-block";
                }
            }
        };
        baidu.sio.callByBrowser(AD_CONFIG['ader_info']);
        ad.base.registerUnloadHandler(function() {
            if (window['ecom_gx_ylzx_info']) {
                window['ecom_gx_ylzx_info'] = null;
                try {
                    delete window['ecom_gx_ylzx_info'];
                } catch (e) {}
            }
        });
    }
});



/* vim: set ts=4 sw=4 sts=4 tw=100 : */