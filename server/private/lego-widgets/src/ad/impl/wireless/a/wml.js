/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/a/wml.js ~ 2013/11/29 16:00:22
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * wml相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.EmptyPanel');

goog.provide('ad.impl.wireless.a.Wml');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['top_title']['title'] = ad.base.subByte(AD_CONFIG['top_title']['title'].replace(/<em>|<\/em>/g, ''), 28);
    AD_CONFIG['description']['rcv_html'] = ad.base.subByte(AD_CONFIG['description']['rcv_html'], 52, '..');
    if (AD_CONFIG['buttons']['options'].length > 3) {
        AD_CONFIG['buttons']['options'] = AD_CONFIG['buttons']['options'].slice(0, 3);
    }
    if (AD_CONFIG['tel'] && AD_CONFIG['tel']['buttons'] && AD_CONFIG['tel']['buttons'].length) {
        var tel = AD_CONFIG['tel']['buttons'][0];
        AD_CONFIG['tel']['show_tel'] = true;
        AD_CONFIG['tel']['tel_name'] = tel['tel_name'];
        AD_CONFIG['tel']['tel'] = tel['tel'];
        AD_CONFIG['tel']['tel_rcv_url'] = tel['tel_rcv_url'] ? tel['tel_rcv_url'] : 'tel:' + tel['tel'];
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
        '{{#buttons}}',
        '{{#options}}',
            '<a href="{{{rcv_url}}}" title2="[子链接{{_index}}]">{{text}}</a>',
            '{{^@last}} | {{/@last}}',
        '{{/options}}<br/>',
        '{{/buttons}}',
        '{{#tel}}',
        '{{#show_tel}}',
            '<a href="{{{tel_rcv_url}}}" title2="[电话]">{{tel_name}}&nbsp;{{tel}}</a><br/>',
        '{{/show_tel}}',
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
