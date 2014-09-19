/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: xiangpiaopiao.js 9564 2013-08-23 04:43:29Z dingguoliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/xiangpiaopiao.js ~ 2013/08/23 11:47:13
 * @author dingguoliang(dingguoliang01@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.SmallWeibo');
goog.include('ad/impl/xiangpiaopiao.less');
goog.provide('ad.impl.XiangPiaoPiao');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [
            new ad.widget.Video(AD_CONFIG['video']),
            new ad.widget.SmallHead(AD_CONFIG['small_head'])
        ],
        [new ad.widget.Section(AD_CONFIG['section'])],
        [new ad.widget.SmallWeibo(AD_CONFIG['small_weibo'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
