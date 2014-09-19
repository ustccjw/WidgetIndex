/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/video/case10034.js ~ 2014/05/28 17:07:19
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * case10034相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');
goog.require('ad.widget.PlayerLookImage');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Flash');
goog.require('ad.widget.BaiduShareV2');
goog.require('ad.widget.LinkWithoutRcv');

goog.include('ad/impl/video/case10034.less');

goog.provide('ad.impl.video.Case10034');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var widgets = [];
    var player = new ad.widget.PlayerLookImage(AD_CONFIG['player']);
    var bg = new ad.widget.Image(AD_CONFIG['bg']);
    var link = new ad.widget.LinkWithoutRcv(AD_CONFIG['link']);
    widgets = [bg, player, link];

    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    fwc.setWidgets([flash]);

    var share = AD_CONFIG['share'];
    widgets.push(new ad.widget.BaiduShareV2(share));
    widgets.push(fwc);

    material.setWidgets(
        widgets
    );

    if (async === true) {
        return material;
    }
    material.show();

    player.addListener(ui.events.CLICK, function() {
        showFwc();
        player.sendLog('popup');
    });
    var fwcRenderd = false;

    /**
     * 显示对应的视频浮层
     */
    function showFwc() {
        if (!fwc) {
            return;
        }
        fwc.show();
        if (flash) {
            flash.refresh(null, AD_CONFIG['flash']);
        }
        if (!fwcRenderd) {
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                fwcRenderd = true;
            }
        }
    }

    /**
     * 隐藏视频浮层
     */
    function hideFwc() {
        fwc.hide();
    }

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */