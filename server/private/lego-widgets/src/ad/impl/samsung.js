/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/samsung.js ~ 2013/12/10 20:24:51
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * samsung相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/samsung.less');

goog.provide('ad.impl.Samsung');

ad.Debug(function(async) {
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var head = new ad.widget.SmallHead(AD_CONFIG['head']);
    var section = new ad.widget.Section(AD_CONFIG['section']);
    var tabTitles = [];
    var tabPanels = [];
    var tabConfig = AD_CONFIG['tab']['config'];
    var tabs = AD_CONFIG['tab']['tabs'];
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        tabTitles.push({
            'tab_title': tab['title']
        });
        tabPanels.push(new ad.widget.TabCont(tab['cont']));
    }
    // 最后一个TAB
    var lastTab = AD_CONFIG['last_tab'];
    if (lastTab) {
        tabTitles.push({
            'tab_title': lastTab['title']
        });
        var iframe = new ad.widget.Iframe(lastTab['iframe']);
        var tabCont = new ad.widget.TabCont(lastTab['cont']);
        var normalContainer = new ad.widget.NormalContainer({
            'material_name': ('TAB' + (tabPanels.length + 1))
        });
        normalContainer.setWidgets(iframe, tabCont);
        tabPanels.push(normalContainer);
    }

    tabConfig['options'] = tabTitles;

    // 构造TAB容器
    var tab = new ad.widget.TabContainer(tabConfig);
    tab.setWidgets(tabPanels);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);

    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [video, [head, section]],
        tab,
        buttons
    );

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
