/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: yili_jlg.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/yili_jlg.js ~ 2012/08/20 13:19:37
 * @author fanxueliang@baidu.com
 * @version $Revision: 11222 $
 * @description
 * lqd相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/yili_jlg.less');

goog.provide('ad.impl.YiliJLG');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tab.setWidgets([new ad.widget.SmallWeibo(AD_CONFIG['small_weibo'])]);
    material.setWidgets(
        [new ad.widget.Video(AD_CONFIG['video']), new ad.widget.SmallHead(AD_CONFIG['small_head'])],
        [tab],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );
    if (async === true) {
        return material;
    }

    material.show();
    //material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
