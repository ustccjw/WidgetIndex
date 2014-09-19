/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/hp.js ~ 2012/09/06 10:46:32
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 11222 $
 * @description
 * hp相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.H1');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Bmap');
goog.require('ad.widget.Table');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/bmap.less');

goog.provide('ad.impl.Bmap');

ad.Debug(function(async){
    var tab1,tab1_img1,bmap,fwc,restTabs = [],tab_container,h1,table,tabConfig;
    if(AD_CONFIG['tab'] && AD_CONFIG['tab']['options']){
        tabConfig = AD_CONFIG['tab']['options'];
        tab1 = tabConfig[0];
        if(tabConfig.length > 1){
            for(var i = 1, len = tabConfig.length; i < len; i ++){
                restTabs.push(new ad.widget.TabCont(tabConfig[i]));
            }
        }
    }
    if(tab1){
        tab1_img1 = new ad.widget.ImageNormal(tab1['img1']);
        bmap = new ad.widget.Bmap(tab1['bmap']);
        tab1['fwc']['material_name'] = 'test-bmap';
        tab1['fwc']['id'] = 1;
        fwc = new ad.widget.FloatWindowContainer(tab1['fwc']);
        fwc.setWidgets([bmap]);
    }
    
    tab_container = new ad.widget.TabContainer(AD_CONFIG['tab_container']);
    restTabs.unshift(tab1_img1);
    tab_container.setWidgets(restTabs);
    h1 = new ad.widget.H1(AD_CONFIG['h1']);
    table = new ad.widget.Table(AD_CONFIG['table']);

    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    material.setWidgets([h1],[tab_container],[table],[fwc]);

    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    //修订title2
    tab1_img1.rewriteTitle2(null,'主图');

    function showFWC(){
        hideFWC();
        if(!fwc)
            return;
        fwc.show();
    }


    function hideFWC(){
        fwc.hide();
    }

    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
