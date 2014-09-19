/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: xd_snt.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/xd_snt.js ~ 2013/03/18 13:45:50
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
goog.require('ad.widget.Iframe');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.Table');
goog.require('ui.events');

goog.include('ad/impl/xd_snt.less');

goog.provide('ad.impl.Xdsnt');

ad.Debug(function(async) {

    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    //AD_CONFIG['weibo']['weibo_context_length'] = 80;

    var arrTabWidget = [];
    var ic1 = new ad.widget.ImageCartoon(AD_CONFIG['img_group'][0]);
    var ic2 = new ad.widget.ImageCartoon(AD_CONFIG['img_group'][1]);

    arrTabWidget.push(ic1);
    arrTabWidget.push(ic2);

    var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);
    arrTabWidget.push(iframe);
    var nc2 = new ad.widget.NormalContainer({});
    var table1 = new ad.widget.Table(AD_CONFIG['table'][0]);
    var table2 = new ad.widget.Table(AD_CONFIG['table'][1]);
    nc2.setWidgets([table1, table2]);
    arrTabWidget.push(nc2);
    var tabcon = new ad.widget.TabCont(AD_CONFIG['active_detail']);
    arrTabWidget.push(tabcon);
    if(AD_CONFIG['img_group'][2]){
        arrTabWidget.push(new ad.widget.ImageCartoon(AD_CONFIG['img_group'][2]));
    }
    var tc = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tc.setWidgets(arrTabWidget);

    var bg1 = new ad.widget.ButtonGroup(AD_CONFIG['bottons'][0]);

    material.setWidgets(
            [
                [new ad.widget.Video(AD_CONFIG['video']), new ad.widget.VideoTitle(AD_CONFIG['video_title'])],
                [new ad.widget.SmallHead(AD_CONFIG['head']), new ad.widget.Section(AD_CONFIG['section']), bg1]
            ],
            [tc]
    );
    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
});

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
