/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: suhu.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/suhu.js ~ 2013/03/18 13:45:50
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * lv2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.Title');
goog.require('ad.widget.ImageLink');
goog.require('ui.events');

goog.include('ad/impl/suhu.less');

goog.provide('ad.impl.SuHu');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    
    var arrTabWidget = [];
    var tab1 = new ad.widget.ImageCartoon(AD_CONFIG['tab1']);
    arrTabWidget.push(tab1);
    var tab2 = new ad.widget.NormalContainer({});
    var tabCont = new ad.widget.TabCont(AD_CONFIG['tab2']['tab_cont']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['tab2']['buttons']);
    tab2.setWidgets(
        [tabCont],
        [buttons]
    );
    arrTabWidget.push(tab2);
    var tab3 = new ad.widget.ImageCartoon(AD_CONFIG['tab3']);
    arrTabWidget.push(tab3);
    var tab4 = new ad.widget.NormalContainer({});
    var linksArr = [];
    var img = new ad.widget.ImageLink(AD_CONFIG['tab4']['image']);
    linksArr.push(img);
    var links = ad.base.getObjectByName('tab4.links', AD_CONFIG);
    
    for(var i = 0; i < links.length; i++) {
        var options = links[i]['options'];
        var itemCont = new ad.widget.NormalContainer({});
        var items = [];
        for(var j = 0; j < options.length; j++) {
            items.push(new ad.widget.Title(options[j]));
        }
        itemCont.setWidgets(items);
        linksArr.push(itemCont);
    }
    tab4.setWidgets(linksArr);
    arrTabWidget.push(tab4);
    arrTabWidget.push(new ad.widget.SmallWeibo(AD_CONFIG['tab5']));
    AD_CONFIG['tab']['options'] = [];
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab1']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab2']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab3']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab4']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab5']['tab_title']});
    var tc = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tc.setWidgets(arrTabWidget);


    material.setWidgets(
        [
            [new ad.widget.Video(AD_CONFIG['video']), new ad.widget.VideoTitle(AD_CONFIG['video_title'])],
            [new ad.widget.SmallHead(AD_CONFIG['head'])]
        ],
        [tc]
    );
    if (async === true) {
        return material;
    }

    material.show();
    
    //material.initMonitor(AD_CONFIG['main_url']);
});

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
