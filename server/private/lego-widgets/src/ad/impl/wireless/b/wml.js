/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/b/wml.js ~ 2013/12/11 13:55:29
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * wml相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.EmptyPanel');

goog.provide('ad.impl.wireless.b.Wml');

ad.Debug(function(async) {

    AD_CONFIG['title']['title'] = ad.base.subByte(AD_CONFIG['title']['title'].replace(/<em>|<\/em>/g, ''), 28);
    AD_CONFIG['description']['rcv_html'] = ad.base.subByte(AD_CONFIG['description']['rcv_html'], 52, '..');

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
        '{{#buttons}}',
        '{{#options}}',
        '<a href="{{{rcv_url}}}" title2="[子链接{{_index}}]">{{text}}</a>',
        '{{^@last}} | {{/@last}}',
        '{{/options}}<br/>',
        '{{/buttons}}',
        '{{#list}}',
        '{{#options}}',
        '<a href="{{{rcv_url}}}" title2="[栏目{{_index}}]">{{text}}</a><br/>',
        '{{/options}}',
        '{{/list}}'
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



/* vim: set ts=4 sw=4 sts=4 tw=100: */