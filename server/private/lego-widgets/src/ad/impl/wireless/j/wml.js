/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/j/wml.js ~ 2013/12/26 15:22:16
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * wml相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.EmptyPanel');

goog.provide('ad.impl.wireless.j.Wml');

ad.Debug(function(async) {
    AD_CONFIG['title']['title'] = ad.base.subByte(AD_CONFIG['title']['title'].replace(/<em>|<\/em>/g, ''), 28);
    AD_CONFIG['description']['rcv_html'] = ad.base.subByte(AD_CONFIG['description']['rcv_html'], 56, '..');

    ad.base.forEach(AD_CONFIG['tels']['options'], function(item) {
        if (!item['tel_rcv_url']) {
            item['tel_rcv_url'] = 'tel:' + item['tel_num'];
        }
    });

    var tpl = [
        '{{#title}}',
        '<a href="{{{rcv_url}}}" title2="[主标题]" target="_blank">{{{title}}}</a><br/>',
        '{{/title}}',

        '{{#description}}',
        '{{rcv_html}}<br/>',
        '{{/description}}',

        '{{#show_url}}',
        '{{site}} - 品牌推广<br/>',
        '{{/show_url}}',

        '{{#links}}',
        '{{#options}}',
        '<a href="{{{rcv_url}}}" title2="[产品链接{{_index}}]" target="_blank">{{text}}</a><br/>',
        '{{/options}}',
        '{{/links}}',

        '{{#buttons}}',
        '{{#options}}',
        '<a href="{{{rcv_url}}}" title2="[子链接{{_index}}]" target="_blank">{{text}}</a><br/>',
        '{{/options}}',
        '{{/buttons}}',

        '{{#tels}}',
        '{{#options}}',
        '<a href="{{{tel_rcv_url}}}" target="_blank">{{series_name}}&nbsp;{{tel_num}}</a><br/>',
        '{{/options}}',
        '{{/tels}}'
    ].join('');

    var material = new ad.material.BaseMaterial();
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


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
