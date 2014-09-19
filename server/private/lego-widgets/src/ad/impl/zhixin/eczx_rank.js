/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/eczx_rank.js ~ 2013/09/30 18:00:51
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * eczx_rank相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.zhixin.Rank');

goog.include('ad/impl/zhixin/eczx_rank.less');

goog.provide('ad.impl.zhixin.EczxRank');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.zhixin.Rank(AD_CONFIG['rank'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
