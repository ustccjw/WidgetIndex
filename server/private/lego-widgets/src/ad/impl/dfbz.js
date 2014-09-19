/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/dfbz.js ~ 2012/08/24 11:55:54
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 11222 $
 * @description
 * dfbz相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.Slider');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Table');
goog.require('ad.service.StatisticsService');

goog.include('ad/impl/dfbz.less');

goog.provide('ad.impl.Dfbz');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.DefaultRender());
    material.setWidgets(
        [new ad.widget.Slider(AD_CONFIG['slider']), new ad.widget.SmallHead(AD_CONFIG['small_head'])],
        [new ad.widget.Table(AD_CONFIG['table'])]
    );
    if (async === true) {
        return material;
    }
    
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    //统计service，主要统计可视展现率、用户鼠标停留时间、广告的加载时长
    var statisticsService = new ad.service.StatisticsService();
    statisticsService.init(material.getId());
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
