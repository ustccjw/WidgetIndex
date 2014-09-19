/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao_wise/detail_page_b.js ~ 2014/02/18 16:58:15
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * detail_page_b相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhidao_wise.DetailFqa');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.zhidao_wise.DetailContainerA');
goog.require('ad.widget.zhidao_wise.DetailProvider');

goog.include('ad/impl/zhidao_wise/detail_page_b.less');

goog.provide('ad.impl.zhidao_wise.DetailPageB');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var detailContainer = new ad.widget.zhidao_wise.DetailContainerA(AD_CONFIG['detail_cont']);

    var fqa = new ad.widget.zhidao_wise.DetailFqa(AD_CONFIG['detail_fqa']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);
    var detailProvider = new ad.widget.zhidao_wise.DetailProvider(AD_CONFIG['detail_provider']);
    detailContainer.setWidgets([fqa, iframe, detailProvider]);

    material.setWidgets(
        [detailContainer]
    );

    if (async === true) {
        return material;
    }
    material.show();

    detailContainer.checkViewport();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
