/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/vancleef.js ~ 2013/03/11 11:40:24
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * vancleef相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.ImageGrid');

goog.include('ad/impl/vancleef.less');

goog.provide('ad.impl.Vancleef');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.DefaultRender());
    var image = new ad.widget.ImageGrid(AD_CONFIG['image']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var imageCartoon = new ad.widget.ImageCartoon(AD_CONFIG['image_cartoon']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group_foot']);

    var tabs = [];
    var tabConfigOptions = AD_CONFIG['tabs']['options'];

    for (var i = 0; i < tabConfigOptions.length; i ++) {
        var item = tabConfigOptions[i]['tab_content'];
        if ('sina' in item) {
            tabs.push(new ad.widget.SmallWeibo(item['sina']));
        } else if ('qq' in item) {
            tabs.push(new ad.widget.QQWeibo(item['qq']));
        }
    }

    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tabs']);
    tabContainer.setWidgets(tabs);

    material.setWidgets(
        [image],
        [smallHead, imageCartoon],
        [tabContainer],
        [buttonGroup]
    );

    if (async === true) {
        return material;
    }

    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
