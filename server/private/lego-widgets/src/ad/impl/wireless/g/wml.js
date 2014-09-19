/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/g/wml.js ~ 2013/12/25 13:54:11
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * wml相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.EmptyPanel');

goog.provide('ad.impl.wireless.g.Wml');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['head']['title'] = ad.base.subByte(AD_CONFIG['head']['title'], 28);
    AD_CONFIG['head']['description'] = ad.base.subByte(AD_CONFIG['head']['description'], 56, '...');

    var listData = ad.base.getObjectByName('list.options', AD_CONFIG);
    if (listData && listData.length) {
        for (var i = 0; i < listData.length; i ++ ) {
            listData[i]['text'] = ad.base.subByte(listData[i]['text'], 32, '...');
        }
    }

    var tpl = [
        '<a href="{{{head.rcv_url}}}" title2="[主标题]">{{{head.title}}}</a><br/>',
        '{{head.description}}<br/>',
        '{{head.site}}- 品牌推广<br/>',
        '{{#list.options}}',
            '<a href="{{{rcv_url}}}" title2="[栏目{{_index}}]">{{{text}}}</a><br/>',
        '{{/list.options}}',
        '{{#table.body}}',
        '{{#tr}}',
            '<a href="{{{rcv_url}}}" title2="[子链接{{_index}}]">{{{text}}}</a><br/>',
        '{{/tr}}',
        '{{/table.body}}'
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


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
