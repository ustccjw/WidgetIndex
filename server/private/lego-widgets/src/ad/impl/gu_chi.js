/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/gu_chi.js ~ 2013/10/14 14:59:32
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * gu_chi相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.lv.List');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.Table');

goog.include('ad/impl/gu_chi.less');

goog.provide('ad.impl.GuChi');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['head']);

    var bg1 = new ad.widget.ButtonGroup(AD_CONFIG['bottons_1']);
    var bg2 = new ad.widget.ButtonGroup(AD_CONFIG['bottons_2']);

    var ic1 = new ad.widget.ImageCartoon(AD_CONFIG['img_group_1']);
    var ic2 = new ad.widget.ImageCartoon(AD_CONFIG['img_group_2']);
    var ic3 = new ad.widget.ImageCartoon(AD_CONFIG['img_group_3']);

    var nc = new ad.widget.NormalContainer({});
    var table1 = new ad.widget.Table(gridDataAdapter(AD_CONFIG['table_1_head'] ,AD_CONFIG['table_1']));
    var table2 = new ad.widget.Table(gridDataAdapter(AD_CONFIG['table_2_head'] ,AD_CONFIG['table_2']));
    nc.setWidgets([table1, table2]);

    AD_CONFIG['select']['dependency'] = [{
        'name': "city",
        'title': "城&nbsp;&nbsp;&nbsp;&nbsp;市",
        'default': "上海"
    }, {
        'name': "store",
        'title': "专卖店"
    }];

    var select = new ad.widget.DependencySelect(AD_CONFIG['select']);
    var list = new ad.widget.lv.List({});
    var nc2 = new ad.widget.NormalContainer({});
    nc2.setWidgets([list, select]);

    var arrTabWidget = [ic1, nc, ic2, ic3, nc2];
    var tc = new ad.widget.TabContainer(AD_CONFIG['tab']);

    tc.setWidgets(arrTabWidget);

    //精算用于收集计时器的数组，用于统计视频播放时长
    window['_mkt'] = window['_mkt'] || [];

    material.setWidgets(
        [
            [
                leftVideo
            ],
            [
                smallHead,
                bg1,
                bg2
            ]
        ], [tc]
    );

    select.addListener(ui.events.CHANGE, function(city, shop, depth) {
        var detail;
        var sel = select.getEleByName('city');
        if (depth == 0) {
            detail = shop[0];
        } else {
            var sIndex = city[1]['selectedIndex'];
            detail = shop[sIndex]['children'][0];
        }
        detail['enable_bmap'] = false;
        detail['title_left_rcv_url'] = 'http://www.gucci.com/cn/stores';
        list.refresh(null, detail);
        list.rewriteTitle2(null, detail['title_right'] + ' ', false);
    });

    // select初始化完毕
    select.addListener(ui.events.LOAD, function() {
        var defaultCity = '上海';
        select.initByVal(defaultCity);
    });

    if (async === true) {
        return material;
    }

    material.show();
    //material.initMonitor(AD_CONFIG['main_url']);
    //百度精算监测
    //material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('video1start');
        //左侧视频开始播放精算计时
        window['_mkt'].push(['_startTimer', 1]);
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        leftVideo.pause();
        leftVideo.sendLog('video1jump');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('video1complete');
        //左侧视频完整播放精算计时
        window['_mkt'].push(['_stopTimer', 1]);
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        leftVideo.sendLog('video1pause');
        //左侧视频暂停播放精算计时
        window['_mkt'].push(['_pauseTimer', 1]);
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
        leftVideo.sendLog('video1continue');
        //左侧视频继续播放精算计时
        window['_mkt'].push(['_continueTimer', 1]);
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_AUTO, function() {
        leftVideo.sendLog('video1auto');
        //左侧视频自动开始播放精算计时
        window['_mkt'].push(['_startTimer', 1]);
        return false;
    });

    /**
     * @param {Object}  headdata
     * @param {Array.<Object>} bodydata
     * @return {Object}
     */
    function gridDataAdapter(headdata, bodydata) {
        // 适配spec中的datatype:GRID - widget.Table，生成的数据格式跟
        var config = {};
        config['head'] = [headdata];
        config['body'] = [];
        for (var i = 0; i < bodydata['tbody'].length; i++) {
            config['body'].push({
                'tr': bodydata['tbody'][i]
            });
        }
        return config;
    }

});