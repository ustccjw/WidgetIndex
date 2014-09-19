/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao_wise/detail_page_a.js ~ 2014/02/17 15:55:31
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * detail_page相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhidao_wise.DetailFqa');
goog.require('ad.widget.Top');
goog.require('ad.widget.wireless.Tab');
goog.require('ad.widget.wireless.ProductList');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.wireless.WideTelButton');
goog.require('ad.widget.zhidao_wise.DetailContainerA');
goog.require('ad.widget.Section');
goog.require('ad.widget.zhidao_wise.DetailProvider');

goog.include('ad/impl/zhidao_wise/detail_page_a.less');

goog.provide('ad.impl.zhidao_wise.DetailPageA');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var detailContainer = new ad.widget.zhidao_wise.DetailContainerA(AD_CONFIG['detail_cont']);

    var fqa = new ad.widget.zhidao_wise.DetailFqa(AD_CONFIG['detail_fqa']);
    var tabTitle = new ad.widget.Top({
        "top_title": AD_CONFIG['tab']['tab_title']
    });

    var tabTitles = [];
    var tabPanels = [];
    var tabConfig = AD_CONFIG['tab'];
    var tabs = AD_CONFIG['tab']['tabs'];

    tabs.forEach(function(tab) {
        var productConfig = tab['cont'];
        tabTitles.push({
            'tab_title': tab['title']
        });
        tabPanels.push(new ad.widget.wireless.ProductList(productConfig));
    });

    tabConfig['options'] = tabTitles;
    var tab = new ad.widget.wireless.Tab(tabConfig);
    tab.setWidgets(tabPanels);

    var buttonsOptions = [];
    AD_CONFIG['detail_cont']['options'].forEach(function(option) {
        buttonsOptions.push({
            'text': option['button_title'],
            'rcv_url': option['button_rcv_url']
        });
    });

    var buttons = new ad.widget.ButtonGroup({
        'options': buttonsOptions
    });

    var detailWidgetArr = [fqa, tabTitle, tab, buttons];

    if (AD_CONFIG['tel_button']) {
        var telBtn = new ad.widget.wireless.WideTelButton(AD_CONFIG['tel_button']['button'][0]);
        detailWidgetArr.push(telBtn);
    }

    var detailProvider = new ad.widget.zhidao_wise.DetailProvider(AD_CONFIG['detail_provider']);
    detailWidgetArr.push(detailProvider);

    var sectionTitle = new ad.widget.Top({
        "top_title": AD_CONFIG['section']['section_title']
    });
    var section = new ad.widget.Section(AD_CONFIG['section']);
    detailWidgetArr.push(sectionTitle);
    detailWidgetArr.push(section);

    detailContainer.setWidgets(detailWidgetArr);

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