/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless_custom/burberry/wml.js ~ 2014/02/25 18:39:27
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * wml相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.EmptyPanel');

goog.provide('ad.impl.wireless_custom.burberry.Wml');

ad.Debug(function(async) {

    AD_CONFIG['head']['title'] = ad.base.subByte(AD_CONFIG['head']['title'].replace(/<em>|<\/em>/g, ''), 28);

    AD_CONFIG['description'] = {
        'rcv_html': ad.base.subByte(AD_CONFIG['head']['description'], 56, '..')
    }
    AD_CONFIG['show_url'] = {
        'site': AD_CONFIG['head']['site']
    }

    var tpl = [
        '{{#title}}',
        '<a href="{{{rcv_url}}}" title2="[主标题]">{{{title}}}</a><br/>',
        '{{/title}}',

        '{{#description}}',
        '{{rcv_html}}<br/>',
        '{{/description}}',

        '{{#show_url}}',
        '{{site}} - 品牌推广<br/>',
        '{{/show_url}}',

        '{{#list}}',
        '{{#options}}',
        '{{title}}',
        '<br/>',
        '{{#list}}',
        '{{text}}',
        '<a href="{{{rcv_url}}}" title2="[栏目{{_index}}]">{{title}}</a>&nbsp;&nbsp;&nbsp;&nbsp;',
        '{{/list}}',
        '<br/>',
        '{{/options}}',
        '{{/list}}',

        '{{#buttons}}',
        '{{#options}}',
        '<a href="{{{rcv_url}}}" title2="[子链接{{_index}}]">{{text}}</a><br/>',
        '{{/options}}',
        '{{/buttons}}'
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