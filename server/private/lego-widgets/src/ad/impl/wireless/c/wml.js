/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/c/wml.js ~ 2013/12/12 21:02:23
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * wml相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.EmptyPanel');

goog.provide('ad.impl.wireless.c.Wml');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['top_title']['title'] = ad.base.subByte(AD_CONFIG['top_title']['title'].replace(/<em>|<\/em>/g, ''), 28);
    AD_CONFIG['description']['rcv_html'] = ad.base.subByte(AD_CONFIG['description']['rcv_html'], 52, '..');

    if (AD_CONFIG['tel'] && !AD_CONFIG['tel']['tel_rcv_url']) {
        AD_CONFIG['tel']['tel_rcv_url'] =  'tel:' + AD_CONFIG['tel']['tel'];
    }

    var tpl = [
        '{{#top_title}}',
            '<a href="{{{rcv_url}}}" title2="[主标题]">{{{title}}}</a><br/>',
        '{{/top_title}}',
        '{{#description}}',
            '{{rcv_html}}<br/>',
        '{{/description}}',
        '{{#show_url}}',
            '{{site}} - 品牌推广<br/>',
        '{{/show_url}}',
        '{{#links}}',
        '{{#options}}',
            '<a href="{{{rcv_url}}}" title2="[栏目{{_index}}]">{{text}}</a><br/>',
        '{{/options}}',
        '{{/links}}',
        '{{#tel}}',
        '<a href="{{{tel_rcv_url}}}" title2="[电话]">{{tel_name}}&nbsp;{{tel}}</a><br/>',
        '{{/tel}}'
    ].join('');
    var html = Mustache.render(tpl, AD_CONFIG);
    var panel = new ad.widget.EmptyPanel({
        'content': html
    });
    material.setWidgets(panel);

    if (async === true) {
        return material;
    }
    material.show();
});




















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
