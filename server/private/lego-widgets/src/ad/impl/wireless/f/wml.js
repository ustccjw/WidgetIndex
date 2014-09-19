/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/f/wml.js ~ 2013/12/24 18:11:46
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * wml相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.EmptyPanel');

goog.provide('ad.impl.wireless.f.Wml');

ad.Debug(function(async) {
    AD_CONFIG['head']['title'] = ad.base.subByte(AD_CONFIG['head']['title'].replace(/<em>|<\/em>/g, ''), 28);
    AD_CONFIG['head']['description'] = ad.base.subByte(AD_CONFIG['head']['description'], 56, '..');

    if (AD_CONFIG['tel_button'] && AD_CONFIG['tel_button']['button'] && AD_CONFIG['tel_button']['button'].length) {
        var tel = AD_CONFIG['tel_button']['button'][0];
        AD_CONFIG['tel_button']['tel_name'] = tel['tel_name'];
        AD_CONFIG['tel_button']['tel'] = tel['tel'];
        AD_CONFIG['tel_button']['tel_rcv_url'] = tel['tel_rcv_url'] ? tel['tel_rcv_url'] : 'tel:' + tel['tel'];
    }

    var material = new ad.material.BaseMaterial();

    var tpl = [
        '{{#head}}',
            '<a href="{{{rcv_url}}}" title2="[主标题]">{{{title}}}</a><br/>',
            '{{description}}<br/>',
            '{{site}} - 品牌推广<br/>',
        '{{/head}}',
        '{{#links}}',
        '{{#options}}',
            '<a href="{{{rcv_url}}}" title2="[栏目{{_index}}]">{{text}}</a><br/>',
        '{{/options}}',
        '{{/links}}',
        '{{#buttons}}',
            '{{#options}}',
                '<a href="{{{rcv_url}}}" title2="[子链接{{_index}}]">{{text}}</a><br/>',
            '{{/options}}',
        '{{/buttons}}',
        '{{#tel_button}}',
            '<a href="{{{tel_rcv_url}}}" title2="[电话]">{{tel_name}}&nbsp;{{tel}}</a><br/>',
        '{{/tel_button}}'
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



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */