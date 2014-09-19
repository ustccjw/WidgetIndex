/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/qtz2.js ~ 2013/10/25 21:41:56
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * 高级版右侧擎天柱的样式包含如下的功能：
 * 根据AD_CONFIG中字段的差异，自动适配到对应的样式
 * 1. 图文样式
 * 2. 图文样式+图片浮层
 * 3. 视频
 */

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Image');
goog.require('ad.widget.Flash');
goog.require('ad.widget.Section');
goog.require('ad.widget.BaiduShareV2');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.standard.Video');

goog.include('ad/impl/standard/video.less');
goog.include('ad/impl/standard/qtz2.less');

goog.provide('ad.impl.standard.Qtz2');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var widgets = [];

    // 259x75的图片/Flash必须存在的
    var image = null;
    var flash = null;
    var flashConfig = null;
    var imageConfig = null;
    if (AD_CONFIG['banner']) {
        imageConfig = ad.base.getObjectByName("banner.type.image", AD_CONFIG);
        if (imageConfig) {
            imageConfig['image_rcv_url'] = AD_CONFIG['banner']['rcv_url'];
            image = new ad.widget.Image( /** @type {Object} */ (imageConfig));
            widgets.push(image);
        } else {
            flashConfig = ad.base.getObjectByName("banner.type.flash", AD_CONFIG);
            flashConfig['link_rcv_url'] = AD_CONFIG['banner']['rcv_url'];
            flashConfig['ipad_link_rcv_url'] = AD_CONFIG['banner']['rcv_url'];
            if (flashConfig) {
                flash = new ad.widget.Flash( /** @type {Object} */ (flashConfig));
                widgets.push(flash);
            }
        }
    }

    // 259x146的视频必须存在
    var video = null;
    if (AD_CONFIG['video']) {
        video = new ad.widget.standard.Video(AD_CONFIG['video']);
        widgets.push(video);
    }

    // 描述，链接，分享都是可选的内容.
    var htmlText = null;
    var description = AD_CONFIG['description'];
    if (description && description['rcv_html'].length) {
        htmlText = new ad.widget.HtmlText(AD_CONFIG['description']);
        widgets.push(htmlText);
    }

    var links = AD_CONFIG['links'];
    var section = new ad.widget.Section(links);
    if (links && links['options'] && links['options'].length) {
        widgets.push(section);
    }

    // 带时间线的擎天柱样式,加入日期
    if (AD_CONFIG['timeline']) {
        ad.base.forEach(AD_CONFIG['links']['options'], function(item) {
            item['text'] = "<em>" + item['date'] + "</em>" + item['text'];
        });
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
    material.rewriteTitle2(null, '右侧', false);

    // 带时间线的擎天柱样式
    if (AD_CONFIG['timeline']) {
        $('#' + section.getId() + ' li').prepend('<span class="ec-dot"></span>');
        $('#' + htmlText.getId() + '> .ad-widget-htmltext').prepend('<span class="ec-clock"></span>');
    }

    // 259x146的大图是可选的
    var imageLarge = AD_CONFIG['image_large'];
    if (image && imageLarge && imageLarge['image_url']) {
        var imageLargeElement = new Image();
        imageLargeElement.className = 'ec-large-img';
        imageLargeElement.src = imageLarge['image_url'];
        imageLargeElement.id = image.getId('large-img');

        if (imageLarge['image_rcv_url']) {
            var anchor = document.createElement('A');
            anchor.href = imageLarge['image_rcv_url'];
            anchor.target = '_blank';
            anchor.setAttribute('title2', '右侧大图链接');
            anchor.appendChild(imageLargeElement);
            baidu.g(image.getId('img')).parentNode.appendChild(anchor);
        } else {
            baidu.g(image.getId('img')).parentNode.appendChild(imageLargeElement);
        }

        ad.dom.enter(image.getId('img'), function() {
            baidu.addClass(image.getRoot().parentNode, 'ec-hover');
        });

        ad.dom.leave(image.getId('large-img'), function() {
            baidu.removeClass(image.getRoot().parentNode, 'ec-hover');
        });
    }
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */