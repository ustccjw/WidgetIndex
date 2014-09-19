/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/bentley.js ~ 2014/03/26 10:57:27
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * bentley相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Image');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.standard.TabCont');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.Bmap');

goog.include('ad/impl/bentley.less');

goog.provide('ad.impl.Bentley');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    // 浮层播放器
    var fwc, fwcs = [],
        fwcVideo, fwcVideos = [],
        initedFWCLog = [];
    ad.base.forEach(AD_CONFIG['fwc'], function(config) {
        config['material_name'] = 'ec-bentley-video';
        fwc = new ad.widget.FloatWindowContainer(config);
        fwcVideo = new ad.widget.Video(config['video']);
        fwc.setWidgets([fwcVideo]);
        fwcs.push(fwc);
        fwcVideos.push(fwcVideo);
        initedFWCLog.push(false);
    });


    // 地图
    var selectPlace = new ad.widget.DependencySelect(AD_CONFIG['baidu_map']['province_city']);
    var bMap = new ad.widget.Bmap(AD_CONFIG['baidu_map']['map']);
    AD_CONFIG['fwc_map']['material_name'] = 'ec-bentley-map';
    AD_CONFIG['fwc_map']['id'] = 2;
    var fwcMap = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc_map']);
    fwcMap.setWidgets(
        [
            selectPlace,
            bMap
        ]
    );

    var lastFWCVideoIndex;
    var cover;
    var initedMapFWCLog = false;

    // 其他 Tabs
    var arrTabCont = [];
    var normalContainer;
    var tabVideoThunb;
    var tabOptions = AD_CONFIG['tab']['options'];
    for (var i = 0; i < tabOptions.length; i++) {
        tabOptions[i]
        normalContainer = new ad.widget.NormalContainer({});
        normalContainer.setWidgets([
            new ad.widget.standard.TabCont(tabOptions[i]),
            new ad.widget.ButtonGroup(tabOptions[i]['buttons'])
        ]);
        arrTabCont.push(normalContainer);
    };
    // 第一个 Tab
    AD_CONFIG['tab']['options'].unshift({
        'tab_title': AD_CONFIG['first_tab']['tab_title']
    });
    normalContainer = new ad.widget.NormalContainer({});
    tabVideoThunb = new ad.widget.MultiVideoThunbnail(
        AD_CONFIG['first_tab']['picture']);
    normalContainer.setWidgets([
        tabVideoThunb,
        new ad.widget.Iframe(AD_CONFIG['first_tab']['iframe']),
        new ad.widget.ButtonGroup(AD_CONFIG['first_tab']['buttons'])
    ]);
    arrTabCont.unshift(normalContainer);

    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tabContainer.setWidgets(arrTabCont);

    var leftVideoImg;
    var hasLeftVideo = true;
    if (AD_CONFIG['left_video_img']['options']['image']) {
        hasLeftVideo = false;
    }
    if (!hasLeftVideo) {
        leftVideoImg = new ad.widget.Image(AD_CONFIG['left_video_img']['options']['image']);
    } else {
        leftVideoImg = new ad.widget.Video(AD_CONFIG['left_video_img']['options']['video']);
    }
    var rightVideoThunb = new ad.widget.MultiVideoThunbnail(
        AD_CONFIG['right_video_thunb']);

    material.setWidgets(
        [new ad.widget.Title(AD_CONFIG['title'])], [
            leftVideoImg,
            new ad.widget.SmallHead(AD_CONFIG['right_description']),
            rightVideoThunb
        ], [tabContainer]
    );
    if (async === true) {
        return material;
    }
    material.show();

    rightVideoThunb.addListener(ui.events.CLICK, function(index, me) {
        if (hasLeftVideo) {
            leftVideoImg.pause();
        }
        showFWC(index + 0);
        rightVideoThunb.sendLog("float1open");
        rightVideoThunb.sendLog('float1video' + (index + 2) + 'start');
        return false;
    });
    tabVideoThunb.addListener(ui.events.CLICK, function() {
        tabVideoThunb.sendLog('floatmapopen', 'floatmapopen');
        showMapFWC();
        return false;
    });
    ad.base.forEach(fwcs, function(fwc) {
        fwc.addListener(ui.events.CLOSE, function(index) {
            hideFWC();
            rightVideoThunb.clearPlayStatus();
        });
    });
    fwcMap.addListener(ui.events.CLOSE, function(index) {
        hideMapFWC();
        tabVideoThunb.clearPlayStatus();
    });
    ad.base.forEach(fwcVideos, function(fwcVideo) {
        fwcVideo.addListener(ui.events.VIDEO_START, function() {
            fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'start');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_CLICK, function() {
            fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'jump');
            //在ipad下手动跳转
            if (fwcVideo._data['is_ipad']) {
                fwcVideo.redirect();
            }
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_PAUSE, function() {
            fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'pause');
            return false;
        });

        fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
            fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'continue');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
            fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'complete');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_AUTO, function() {
            fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'auto');
            return false;
        });
    });

    /**
     * 处理select place 切换
     * @param {Array} values place select数据
     */
    function placeTypeHandler(values) {
        var data = [];
        baidu.array.each(values, function(item, index) {
            if (item.value != "null") {
                data.push(item.value);
            }
        });
        if (data && data.length) {
            bMap.moveToCity(data[data.length - 1]);
        }
    }
    selectPlace.addListener(ui.events.CHANGE, function(values) {
        placeTypeHandler(values);
    });
    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if (lastFWCVideoIndex == index) {
            return;
        }
        hideFWC();
        hideMapFWC();
        if (!fwc)
            return;
        //显示浮层
        if (fwcs) {
            fwcs[index].show();
        }
        if (fwcVideos) {
            // 重绘视频
            ad.base.setTimeout(function() {
                fwcVideos[index].refresh(null, AD_CONFIG['fwc'][index]['video']);
            }, 10);
        }
        lastFWCVideoIndex = index;

        var canvas;
        for (var i = fwcs.length - 1; i >= 0; i--) {
            if (!initedFWCLog[i]) {
                canvas = baidu.dom.first(fwcs[i].getRoot());
                if (canvas && canvas.id) {
                    material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                    initedFWCLog[i] = true;
                }
            }
        };
    }
    /**
     * 显示地图浮层
     */
    function showMapFWC() {
        hideFWC();
        fwcMap.show();
        if (!initedMapFWCLog) {
            var canvas = baidu.dom.first(fwcMap.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                //material.getCMS().init(baidu.getAttr(baidu.dom.first(fwcMap.getRoot()), 'id'));
                initedMapFWCLog = true;
            }
        }
    }
    /**
     * 隐藏地图浮层
     */
    function hideMapFWC() {
        fwcMap.hide();
    }
    /**
     * 隐藏视频浮层
     */
    function hideFWC() {
        ad.base.forEach(fwcs, function(fwc) {
            fwc.hide();
        });
        ad.base.forEach(fwcVideos, function(fwcVideo) {
            fwcVideo.clearRoot();
        });
        lastFWCVideoIndex = -1;
    }

    return material;

});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */