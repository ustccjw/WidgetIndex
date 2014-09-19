/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/case1142.js ~ 2013/10/28 12:14:19
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * 纯色加冕（微博）样式
 * icafe.baidu.com/issue/adcoup-1142/show?spaceId=519&cid=5
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.standard.ImageSlideShow');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/small_head.less');
goog.include('ad/impl/standard/small_weibo.less');
goog.include('ad/impl/standard/button_group.less');
goog.include('ad/impl/standard/case1142.less');

goog.provide('ad.impl.standard.Case1142');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var imageSlideShow = new ad.widget.standard.ImageSlideShow(AD_CONFIG['image_slide_show']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var smallWeibo = new ad.widget.SmallWeibo(AD_CONFIG['small_weibo']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);

    var widgets = [
        [title],
        [imageSlideShow, smallHead],
        [smallWeibo],
        [buttonGroup]
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
