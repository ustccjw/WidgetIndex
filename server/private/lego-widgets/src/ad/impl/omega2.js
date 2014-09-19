/***************************************************************************
 *
 * Copyright (c) 2013-10-14 14:34:23 Baidu.com, Inc. All Rights Reserved
 * $Id: omega2.js 11222 2013-10-14 14:34:23 dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/impl/omega2.js ~ 2013/10/14 14:34:23
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 11222 $
 * @description
 * omega2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.lv.List');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.Table');
goog.require('ui.events');

goog.include('ad/impl/omega2.less');

goog.provide('ad.impl.Omega2');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var arrTabWidget = [];
    var ic1 = new ad.widget.ImageCartoon(AD_CONFIG['img_group_1']);
    var ic2 = new ad.widget.ImageCartoon(AD_CONFIG['img_group_2']);

    arrTabWidget.push(ic1);
    arrTabWidget.push(ic2);

    AD_CONFIG['select']['dependency'] = [{
        'name': "city",
        'title': "城&nbsp;&nbsp;&nbsp;&nbsp;市",
        'default': "上海"
    }, {
        'name': "store",
        'title': "专卖店"
    }];

    var select = new ad.widget.DependencySelect(AD_CONFIG['select']);
    var list = new ad.widget.lv.List(AD_CONFIG['select']);
    var nc = new ad.widget.NormalContainer({});
    nc.setWidgets([list, select]);
    arrTabWidget.push(nc);

    function genTableBody(tbody) {
        var tableBody = [];
        for (var i = 0; i < tbody.length; i++) {
            tableBody[i] = {
                "tr": tbody[i]
            };
        };
        return tableBody;
    }

    AD_CONFIG['table_1']['body'] = genTableBody(AD_CONFIG['table_1']['body']);
    AD_CONFIG['table_2']['body'] = genTableBody(AD_CONFIG['table_2']['body']);
    var table1 = new ad.widget.Table(AD_CONFIG['table_1']);
    var table2 = new ad.widget.Table(AD_CONFIG['table_2']);
    var nc2 = new ad.widget.NormalContainer({});
    nc2.setWidgets([table1, table2]);
    arrTabWidget.push(nc2);

    arrTabWidget.push(new ad.widget.SmallWeibo(AD_CONFIG['weibo']));
    var tc = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tc.setWidgets(arrTabWidget);

    var bg1 = new ad.widget.ButtonGroup(AD_CONFIG['bottons_1']);
    var bg2 = new ad.widget.ButtonGroup(AD_CONFIG['bottons_2']);

    material.setWidgets(
        [
            [new ad.widget.Video(AD_CONFIG['video']), new ad.widget.VideoTitle(AD_CONFIG['video_title'])],
            [new ad.widget.SmallHead(AD_CONFIG['head']), bg1, bg2]
        ], [tc]
    );

    select.addListener(ui.events.CHANGE, function(city, shop, depth) {
        var detail;
        if (depth == 0) {
            detail = shop[0];
        } else {
            var sIndex = city[1]['selectedIndex'];
            if (!('children' in shop[sIndex])) {
                return;
            }
            detail = shop[sIndex]['children'][0];
        }
        detail['title_left_rcv_url'] = AD_CONFIG['select']['title_left_rcv_url'];
        list.refresh(null, detail);
        list.rewriteTitle2(null, detail['title_right'] + ' ', false);
    });

    // select初始化完毕了.
    select.addListener(ui.events.LOAD, function() {
        var defaultCity = '上海';
        select.initByVal(defaultCity);
    });

    if (async === true) {
        return material;
    }

    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
    // 百度精算监测
    // material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

});