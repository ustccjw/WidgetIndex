/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: qdsuhu.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/qdsuhu.js ~ 2013/03/18 13:45:50
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * Qdsuhu相关的实现逻辑
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
goog.require('ad.widget.LinkList');
goog.require('ad.widget.Section');
goog.require('ui.events');

goog.include('ad/impl/qdsuhu.less');

goog.provide('ad.impl.Qdsuhu');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var arrTabWidget = [];
    var tab1 = new ad.widget.ImageCartoon(AD_CONFIG['tab1']);
    arrTabWidget.push(tab1);
    var tab2 = new ad.widget.NormalContainer({});
    tab2.setRender(new ad.render.RecursiveRender({
        'block_class': 'ec-normal-tab2'
    }));
    var tabCont = new ad.widget.TabCont(AD_CONFIG['tab2']['tab_cont']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['tab2']['buttons']);
    tab2.setWidgets(
        [tabCont],
        [buttons]
    );
    arrTabWidget.push(tab2);

    var tab3 = new ad.widget.NormalContainer({});
    tab3.setRender(new ad.render.RecursiveRender({
        'block_class': 'ec-normal-tab3'
    }));

    var tab3Left = new ad.widget.NormalContainer({});
    tab3Left.setRender(new ad.render.RecursiveRender({
        'block_class': 'ec-normal-tab3-left'
    }));
    var tab3LeftTitle = new ad.widget.Title(AD_CONFIG['tab3']['table_left']['title']);
    var leftOptions = ad.base.getObjectByName("tab3.table_left.list.options", AD_CONFIG);
    if(leftOptions && leftOptions.length){
        baidu.each(leftOptions, function(item, index){
            item['title'] = (index + 1) + ". " + item['title'];
        });
    }
    var leftList = new ad.widget.LinkList(AD_CONFIG['tab3']['table_left']['list']);
    tab3Left.setWidgets([tab3LeftTitle, leftList]);
    var tab3Right = new ad.widget.NormalContainer({});
    tab3Right.setRender(new ad.render.RecursiveRender({
        'block_class': 'ec-normal-tab3-right'
    }));
    var tab3RightTitle = new ad.widget.Title(AD_CONFIG['tab3']['table_right']['title']);
    var rightOptions = ad.base.getObjectByName("tab3.table_right.list.options", AD_CONFIG);
    if(rightOptions && rightOptions.length){
        baidu.each(rightOptions, function(item, index){
            item['title'] = (index + 1) + ". " + item['title'];
        });
    }
    var rightList = new ad.widget.LinkList(AD_CONFIG['tab3']['table_right']['list']);
    tab3Right.setWidgets([tab3RightTitle, rightList]);
    tab3.setWidgets([tab3Left, tab3Right]);
    arrTabWidget.push(tab3);
    var tab4 = new ad.widget.NormalContainer({});
    tab4.setRender(new ad.render.RecursiveRender({
        'block_class': 'ec-normal-tab4'
    }));
    var linksArr = [];
    var img = new ad.widget.ImageLink(AD_CONFIG['tab4']['image']);
    linksArr.push(img);
    var sectionOptions =  ad.base.getObjectByName("tab4.section.options", AD_CONFIG);
    if(sectionOptions && sectionOptions.length){
        baidu.each(sectionOptions, function(item, index){
            item['icon_url'] = RT_CONFIG.HOST("ecma.bdimg.com") + "/adtest/e0579a49c6e331334d825258c952cfaa.jpg";
        });
    }
    var section = new ad.widget.Section(AD_CONFIG['tab4']['section']);
    linksArr.push(section);
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
    var tabTitleRewrited = false;
    //material.initMonitor(AD_CONFIG['main_url']);
    tc.addListener(ui.events.TAB_CHANGE, function(index){
        if(!tabTitleRewrited && index == 2){
            tab3RightTitle.rewriteTitle2(tab3RightTitle.getRoot(), "right-");
            tab3LeftTitle.rewriteTitle2(tab3LeftTitle.getRoot(), "left-");
            rightList.rewriteTitle2(rightList.getRoot(), "right-");
            leftList.rewriteTitle2(leftList.getRoot(), "left-");
            tabTitleRewrited = true;
        }
    });

    return material;
});

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
