/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao_wise/detail_page.js ~ 2013/12/18 15:27:48
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
goog.require('ad.widget.zhidao_wise.DetailContainer');
goog.require('ad.widget.Section');
goog.require('ad.widget.zhidao_wise.DetailSubPage');

goog.include('ad/impl/zhidao_wise/detail_page.less');

goog.provide('ad.impl.zhidao_wise.DetailPage');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var detailContainer = new ad.widget.zhidao_wise.DetailContainer(AD_CONFIG['detail_cont']);

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
        productConfig['options'].forEach(function(item) {
            item['image'] = item['image_big'];
        });
        tabPanels.push(new ad.widget.wireless.ProductList(productConfig));
    });

    tabConfig['options'] = tabTitles;
    var tab = new ad.widget.wireless.Tab(tabConfig);
    tab.setWidgets(tabPanels);

    var buttonsOptions = [];
    AD_CONFIG['detail_cont']['options'].forEach(function(option) {
        buttonsOptions.push({
            'text': option['button_title']
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

    var sectionTitle = new ad.widget.Top({
        "top_title": AD_CONFIG['section']['section_title']
    });
    var section = new ad.widget.Section(AD_CONFIG['section']);
    detailWidgetArr.push(sectionTitle);
    detailWidgetArr.push(section);

    detailContainer.setDetailWidgets(detailWidgetArr);

    var subPages = [];
    var subPagesConfig = AD_CONFIG['detail_cont']['options'];
    subPagesConfig.forEach(function(pageConfig) {
        subPages.push(new ad.widget.zhidao_wise.DetailSubPage(pageConfig));
    });

    //tab中的链接也加入到跳转子页面的行列
    var tabPreLinks = [0]; //用于计算每个tab之前以存在的链接数目，用于处理点击跳转子页面
    var tabButtonTitle = [];
    var tabSubPageConfig = baidu.object.clone(tabs);
    tabSubPageConfig.forEach(function(tab) {
        var subsConfig = tab['cont']['options'];
        var linkNum = 0;
        subsConfig.forEach(function(subConfig) {
            var linksConfig = subConfig['list'];
            linksConfig.forEach(function(pageConfig) {
                linkNum++;
                tabButtonTitle.push({
                    'button_title': pageConfig['title']
                });
                pageConfig['button_title'] = pageConfig['title'];
                pageConfig['title'] = pageConfig['content_title'];
                subPages.push(new ad.widget.zhidao_wise.DetailSubPage(pageConfig));
            });
        });
        tabPreLinks.push(tabPreLinks[tabPreLinks.length - 1] + linkNum);
    });

    detailContainer.setWidgets(subPages);

    material.setWidgets(
        [detailContainer]
    );

    if (async === true) {
        return material;
    }
    material.show();

    detailContainer.checkViewport();

    buttons.addListener(ui.events.CLICK, function(index, button) {
        detailContainer.switchPage(index);
        return false;
    });

    //临时解决下
    detailContainer._data['options'] = detailContainer._data['options'].concat(tabButtonTitle);
    baidu.on(baidu.g(tab.getId('tab-body')), ui.events.CLICK, function(opt_evt) {
        var evt = opt_evt || window.event;
        var target = evt.target || evt.srcElement;
        var curTabIndex = tab.selectedIndex;
        var links = [].slice.call(baidu.g(tab.getId('tab-content-' + curTabIndex)).querySelectorAll('.ec-list a'), 0);
        var linkIndex = links.indexOf(target);
        if (-1 !== linkIndex) {
            detailContainer.switchPage(subPagesConfig.length + tabPreLinks[curTabIndex] + linkIndex);
        }
        baidu.event.preventDefault(evt);
    });
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */