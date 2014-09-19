/***************************************************************************
 *
 * Copyright (c) 2013-09-24 14:34:26 Baidu.com, Inc. All Rights Reserved
 * $Id: louisvuitton.js 11222 2013-09-24 14:34:26 dingguoliang01 $
 *
 **************************************************************************/


/**
 * src/ad/impl/louisvuitton.js ~ 2013/09/24 14:34:26
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 11222 $
 * @description
 * louisvuitton相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.baike.SimpleTitle');
goog.require('ad.widget.baike.TabContainer');
goog.require('ad.widget.baike.TimeLine');
goog.include('ad/impl/baike/louisvuitton.less');
goog.provide('ad.impl.baike.LouisVuitton');

ad.Debug(function (async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());
    var simpleTitle = new ad.widget.baike.SimpleTitle(AD_CONFIG['simple_title']);
    var tabContainer = new ad.widget.baike.TabContainer(AD_CONFIG['tab_container']);
    var timeLine = new ad.widget.baike.TimeLine(AD_CONFIG['time_line']);
    material.setWidgets(
        [simpleTitle],
        [timeLine],
        [tabContainer]
    );
    if (async === true) {
        return material;
    }
    material.show();

    if (AD_CONFIG['tab_container']['title'] && AD_CONFIG['tab_container']['descriptionTitle']) {
        var parent = baidu.dom.q('ec-left', baidu.dom.q('ad-widget-baike-tab-container')[0])[0];
        var element = parent.getElementsByTagName('h3')[0];
        element.innerHTML = AD_CONFIG['tab_container']['title'];
        parent = baidu.dom.q('ec-desc', baidu.dom.q('ad-widget-baike-tab-container')[0])[0];
        var element = parent.getElementsByTagName('h4')[0];
        element.innerHTML = AD_CONFIG['tab_container']['descriptionTitle'];
    }
});
