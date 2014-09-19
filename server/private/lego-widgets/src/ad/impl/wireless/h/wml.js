/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/h/wml.js ~ 2013/11/29 16:00:22
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * wml相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.EmptyPanel');

goog.provide('ad.impl.wireless.h.Wml');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['head']['title'] = ad.base.subByte(AD_CONFIG['head']['title'].replace(/<em>|<\/em>/g, ''), 28);
    AD_CONFIG['head']['description'] = ad.base.subByte(AD_CONFIG['head']['description'], 52, '..');
    if (AD_CONFIG['client_tel'] && AD_CONFIG['client_tel']['button'] && AD_CONFIG['client_tel']['button'].length) {
        var tel = AD_CONFIG['client_tel']['button'][0];
        AD_CONFIG['client_tel']['show_tel'] = true;
        AD_CONFIG['client_tel']['tel_name'] = tel['tel_name'];
        AD_CONFIG['client_tel']['tel'] = tel['tel'];
        AD_CONFIG['client_tel']['tel_rcv_url'] = tel['tel_rcv_url'] ? tel['tel_rcv_url'] : 'tel:' + tel['tel'];
    }

    var tpl = [
        '{{#head}}',
            '<a href="{{{rcv_url}}}" title2="[主标题]">{{{title}}}</a><br/>',
            '{{#description}}',
                '{{description}}<br/>',
            '{{/description}}',
            '{{#site}}',
                '{{site}} - 品牌推广<br/>',
            '{{/site}}',
        '{{/head}}',
        '{{#tab1}}',
            '{{#options}}',
                '{{#title}}',
                    '{{title}}<br/>',
                '{{/title}}',
                '{{#list}}',
                    '<a href="{{{rcv_url}}}" title2="[产品链接{{_index}}]">{{title}}</a>',
                    '{{^@last}}&nbsp;&nbsp;&nbsp;{{/@last}}',
                '{{/list}}',
                '<br/>',
            '{{/options}}',
        '{{/tab1}}',
        '{{#button_group}}',
            '{{#options}}',
                '<a href="{{{rcv_url}}}" title2="[子链接{{_index}}]">{{text}}</a><br/>',
            '{{/options}}',
        '{{/button_group}}',
        '{{#client_tel}}',
            '<a href="{{{tel_rcv_url}}}" title2="[电话]">{{tel_name}}&nbsp;{{tel}}</a><br/>',
        '{{/client_tel}}'
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
