/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: advanced.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced.js ~ 2012/09/06 10:46:32
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * hp相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.H1');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/advanced.less');

goog.provide('ad.impl.Advanced');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab_container']);
    var restTabs = [];
    if(AD_CONFIG['tab'] && AD_CONFIG['tab']['options']) {
        var tabConfig = AD_CONFIG['tab']['options'];
        if(tabConfig.length) {
            for(var i = 0, len = tabConfig.length; i < len; i ++){
                restTabs.push(new ad.widget.TabCont(tabConfig[i]));
            }
        }
    }
    tabContainer.setWidgets(restTabs);

    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['head'])],
        [tabContainer],
        [new ad.widget.ButtonGroup(AD_CONFIG['buttons'])]
    );

    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    // 百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
