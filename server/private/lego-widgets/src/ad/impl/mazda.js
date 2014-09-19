/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/mazda.js ~ 2013/07/30 10:50:23
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * mazda相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/mazda.less');

goog.provide('ad.impl.Mazda');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.DefaultRender());
    var image = new ad.widget.ImageLink(AD_CONFIG['main_image']);
    var small_head = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var tabs = new ad.widget.TabContainer(AD_CONFIG['tabs']);
    var button_group = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['popup']);
    var fwcRendered = false;
    var video_index = 0;
    var fwc_video = new ad.widget.Video(AD_CONFIG['popup_video']['lists'][video_index]);
    var fwc_image = new ad.widget.ImageNormal(AD_CONFIG['popup_image']);
    fwc.setWidgets([fwc_video, fwc_image]);

    var arr_tabs_cont = [];

    for (var i = 0; i < AD_CONFIG['tabs']['options'].length; i++) {
        arr_tabs_cont[i] = new ad.widget.NormalContainer({});
        arr_tabs_cont[i].setWidgets([
            new ad.widget.ImageLink(AD_CONFIG['tabs']['options'][i]['tab_cont']['image']),
            new ad.widget.Section(AD_CONFIG['tabs']['options'][i]['tab_cont']['list'])
        ]);
    }

    tabs.setWidgets(arr_tabs_cont);

    material.setWidgets(
        [image, small_head], [tabs], [button_group], [fwc]
    );
    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);

    small_head.addListener(ui.events.CLICK, function(index, me) {
        showFwc(index);
        small_head.sendLog("popup_open");
        small_head.sendLog('video' + (index + 2) + '_start');
        return false;
    });

    fwc_image.addListener(ui.events.CLICK, function(index, me) {
        setVideoIndex(index);
        return false;
    });

    fwc.addListener(ui.events.CLOSE, function() {
        hideFwc();
    });

    function showFwc(index) {
        setVideoIndex(index);
        fwc.show();
        if (!fwcRendered) {
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                fwcRendered = true;
            }
        }
    }

    function hideFwc() {
        if (fwc_video) {
            fwc_video.clearRoot();
        }
        fwc.sendLog("popup_close_video" + (video_index + 1) + "_played");
        fwc.hide();
    }

    function setVideoIndex(index) {
        fwc_video.refresh(null, AD_CONFIG['popup_video']['lists'][index]);
        fwc_video.sendLog("video" + (index + 1) + "_start");
        video_index = index;
    }

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */