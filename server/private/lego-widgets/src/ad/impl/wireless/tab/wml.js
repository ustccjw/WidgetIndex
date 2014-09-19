/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/tab/wml.js ~ 2013/12/09 17:50:14
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * wml相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.EmptyPanel');

goog.provide('ad.impl.wireless.tab.Wml');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['head']['title'] = ad.base.subByte(AD_CONFIG['head']['title'].replace(/<em>|<\/em>/g, ''), 28);
    AD_CONFIG['head']['description'] = ad.base.subByte(AD_CONFIG['head']['description'], 56, '..');

    AD_CONFIG['productList'] = AD_CONFIG['tab']['tab1']['cont'];

    if (AD_CONFIG['tel_button'] && AD_CONFIG['tel_button']['button'] && AD_CONFIG['tel_button']['button'].length) {
        var tel = AD_CONFIG['tel_button']['button'][0];
        AD_CONFIG['tel_button']['tel_name'] = tel['tel_name'];
        AD_CONFIG['tel_button']['tel'] = tel['tel'];
        AD_CONFIG['tel_button']['tel_rcv_url'] = tel['tel_rcv_url'] ? tel['tel_rcv_url'] : 'tel:' + tel['tel'];
    }

    var tpl = [
        '{{#head}}',
            '<a href="{{{rcv_url}}}" title2="[主标题]" target="_blank">{{{title}}}</a><br/>',
            '{{description}}<br/>',
            '{{site}} - 品牌推广<br/>',
        '{{/head}}',
        '{{#productList}}',
            '{{#options}}',
                '{{title}}<br/>',
                '{{#list}}',
                    '<a href="{{rcv_url}}" title2="[产品链接{{_index}}]">{{title}}</a>',
                    '{{^@last}}&nbsp;&nbsp;&nbsp;&nbsp;{{/@last}}',
                '{{/list}}',
                '<br/>',
            '{{/options}}',
        '{{/productList}}',
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
