/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: lanse.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/lanse.js ~ 2013/03/18 13:45:50
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * lv2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.Video');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ui.events');

goog.include('ad/impl/lanse.less');

goog.provide('ad.impl.Lanse');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());
    //微博内容最大长度
    AD_CONFIG['tab5']['weibo_context_length'] = 230;
    var arrTabWidget = [];
    var tab1 = new ad.widget.ImageCartoon(AD_CONFIG['tab1']);
    var tab3 = new ad.widget.ImageCartoon(AD_CONFIG['tab3']);
    var tab2 = new ad.widget.NormalContainer({});
    var tab4 = new ad.widget.NormalContainer({});
    var tabcon1 = new ad.widget.TabCont(AD_CONFIG['tab2']['tab_cont']);
    var tabcon2 = new ad.widget.TabCont(AD_CONFIG['tab4']['tab_cont']);
    var buttonGroups1 = new ad.widget.ButtonGroup(AD_CONFIG['tab2']['buttons']);
    var buttonGroups2 = new ad.widget.ButtonGroup(AD_CONFIG['tab4']['buttons']);
    var tab5 = new ad.widget.SmallWeibo(AD_CONFIG['tab5']);
    
    tab2.setWidgets([tabcon1, buttonGroups1]);
    tab4.setWidgets([tabcon2, buttonGroups2]);
    
    arrTabWidget.push(tab1);
    arrTabWidget.push(tab2);
    arrTabWidget.push(tab3);
    arrTabWidget.push(tab4);
    arrTabWidget.push(tab5);

    AD_CONFIG['tab']['options'] = [];
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab1']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab2']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab3']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab4']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab5']['tab_title']});
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tabContainer.setWidgets(arrTabWidget);
    
    material.setWidgets(
        [
            [new ad.widget.Video(AD_CONFIG['video'])],
            [new ad.widget.SmallHead(AD_CONFIG['head']), new ad.widget.Section(AD_CONFIG['section'])]
        ],
        [tabContainer]
    );
    if (async === true) {
        return material;
    }
    material.show();
});

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
