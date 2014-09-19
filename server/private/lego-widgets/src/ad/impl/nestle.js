/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: nestle.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/nestle.js ~ 2013/03/18 13:45:50
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * nestle相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Video');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');

goog.include('ad/impl/nestle.less');

goog.provide('ad.impl.Nestle');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var arrTabWidget = [];
    var options = ad.base.getObjectByName('tab.options', AD_CONFIG);
    for(var i = 0; i < options.length; i++){
        arrTabWidget.push(
            new ad.widget.ImageCartoon(options[i]['tab_con'])
        );
    }

    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tabContainer.setWidgets(arrTabWidget);

    material.setWidgets(
        [
            new ad.widget.Video(AD_CONFIG['video']),
            [
                new ad.widget.SmallHead(AD_CONFIG['head']),
                new ad.widget.ButtonGroup(AD_CONFIG['button']),
                new ad.widget.SmallWeibo(AD_CONFIG['weibo'])
            ]
        ],
        tabContainer
    );
    if (async === true) {
        return material;
    }
    material.show();
    //material.initMonitor(AD_CONFIG['main_url']);
    //百度精算监测
    //material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
});

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
