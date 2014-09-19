/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao/qtz.js ~ 2013/11/06 19:02:46
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * qtz相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Flash');

goog.include('ad/impl/zhidao/qtz.less');

goog.provide('ad.impl.zhidao.Qtz');

ad.Debug(function(async) {
    var bannerSrc = ad.base.getObjectByName('banner.src', AD_CONFIG);
    var ipadType;
    if (bannerSrc) {
        if (ad.env.isIpad) {
            AD_CONFIG['banner']['ipad_img'] = AD_CONFIG['banner']['ipad_img'] || bannerSrc; //优先显示ipad图片
            AD_CONFIG['banner']['ipad_link_rcv_url'] = AD_CONFIG['banner']['ipad_link_rcv_url']
                || AD_CONFIG['banner']['link_rcv_url'];
        }
        if (!/\.swf$/.test(bannerSrc)) { //是图片
            AD_CONFIG['banner']['is_ipad'] = true;
            if (ad.env.isIpad) {
                ipadType = '图片链接(ipad)';
            }
            else {
                ipadType = '图片链接';
                AD_CONFIG['banner']['ipad_img'] = bannerSrc;
                AD_CONFIG['banner']['ipad_link_rcv_url'] = AD_CONFIG['banner']['link_rcv_url'];
            }
        }
    }

    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        new ad.widget.Flash(AD_CONFIG['banner'])
    );
    if (ipadType) { //更改title2
        material.addListener(ui.events.AFTER_MATERIAL_SHOW, function() {
            var ipadLink;
            var bannerCtn = baidu.g(material.getWidget(0).getId());
            if (document.querySelector) {
                ipadLink = bannerCtn.querySelector('.ec-ipad-link');
            }
            else {
                var widgetLinks = bannerCtn.getElementsByTagName('a');
                for (var i = 0, len = widgetLinks.length; i < len; i++) {
                    if (baidu.dom.hasClass(widgetLinks[i], 'ec-ipad-link')) {
                        ipadLink = widgetLinks[i];
                        break;
                    }
                }
            }
            if (ipadLink) {
                ipadLink.setAttribute('title2', ipadType);
            }
        });
    }

    if (async === true) {
        return material;
    }

    material.show();
});









/* vim: set ts=4 sw=4 sts=4 tw=100 : */
