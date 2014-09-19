/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1092.js ~ 2013/11/09 18:49:38
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * case1092相关的实现逻辑
 * 品牌专区-左侧视频样式（浮层图片）
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.ImageShowArrow');

goog.include('ad/impl/advanced/case1092.less');

goog.provide('ad.impl.advanced.Case1092');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var tabBodies = [];
    for (var i = 0; i < AD_CONFIG['tab']['options'].length; i ++) {
        var item = AD_CONFIG['tab']['options'][i];
        var weibo = item['weibo'];
        if ('sina' in weibo) {
            tabBodies.push(new ad.widget.SmallWeibo(weibo['sina']));
        }
        else if ('qq' in weibo) {
            tabBodies.push(new ad.widget.QQWeibo(weibo['qq']));
        }
    }
    tab.setWidgets(tabBodies);

    var fwcCache = {};
    smallHead.addListener(ui.events.CLICK, function(index, evt){
        var config = smallHead.getData('image_group_head.options.' + index + '.float');
        if (!config['options'].length) {
            return true;
        }

        var fwc = fwcCache[index];
        if (!fwc) {
            // 显示浮层图片
            fwc = new ad.widget.FloatWindowContainer({
                'width': 720,
                'height': 420,
                'id': (index + 1),
                'material_name': 'ec-case1092'
            });
            var images = new ad.widget.ImageShowArrow(config);
            fwc.setWidgets(images);
            fwcCache[index] = fwc;
            fwc.show();
            material.trigger(ui.events.NEW_AD_CANVAS, fwc.getId('fwc'));
        }
        else {
            fwc.show();
        }
        return false;
    });

    material.setWidgets([video, smallHead], tab, buttonGroup);
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
