/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/lancome_bk.js ~ 2014/02/13 13:49:47
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 11222 $
 * @description
 * lancome_bk相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.zhixin.ProductsBk');
goog.require('ad.widget.zhixin.ProductsBkCar');
goog.require('ad.widget.zhixin.Baike');
goog.require('ad.widget.zhixin.MilestoneBk');

goog.include('ad/impl/zhixin/lancome_bk.less');
goog.include('ad/impl/standard/tab.less');

goog.provide('ad.impl.zhixin.LancomeBk');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    var title = new ad.widget.Title(AD_CONFIG['title']);

    // 由于alternative包多了一层，这个options负责把tab对象抽出来
    var options = [];
    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    for (var i = 0, l = tabOptions.length; i < l; i ++) {
        var tabCont = tabOptions[i]['tabCont'];
        if ('tab1' in tabCont) {
            tabBodies.push(new ad.widget.zhixin.Baike(tabCont['tab1']));
            options.push(tabCont['tab1']);
        }
        else if ('tab2' in tabCont) {
            tabBodies.push(new ad.widget.zhixin.MilestoneBk(tabCont['tab2']));
            options.push(tabCont['tab2']);
        }
        else if ('tab3' in tabCont) {
            var body = tabCont['tab3']['body'];
            for (var j = 0, l1 = body.length; j < l1; j++) {
                for (var k = 0, l2 = body[j]['tr'].length; k < l2; k++) {
                    var item = body[j]['tr'][k];
                    item.title2 = j + 1;
                }
            }
            tabBodies.push(new ad.widget.zhixin.ProductsBk(tabCont['tab3']));
            options.push(tabCont['tab3']);
        }
        else {
            var body = tabCont['tab4']['body'];
            for (var j = 0, l1 = body.length; j < l1; j++) {
                for (var k = 0, l2 = body[j]['tr'].length; k < l2; k++) {
                    var item = body[j]['tr'][k];
                    item.title2 = j + 1;
                }
            }
            tabBodies.push(new ad.widget.zhixin.ProductsBkCar(tabCont['tab4']));
            options.push(tabCont['tab4']);
        }
    }
    // 把收集回来的tab放到上一层
    AD_CONFIG['tab']['options'] = options;
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tab.setWidgets(tabBodies);

    var widgets = [title, tab];
    material.setWidgets(widgets);

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
