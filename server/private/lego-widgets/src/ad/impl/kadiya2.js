/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: kadiya2.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/kadiya2.js ~ 2013/03/18 13:45:50
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
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.Image');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.LinkList');
goog.require('ui.events');

goog.include('ad/impl/kadiya2.less');

goog.provide('ad.impl.KaDiYa2');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    AD_CONFIG['fwc']['material_name'] = 'ec-kadiya';
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc']['video']);
    var fwcLinks = new ad.widget.LinkList(AD_CONFIG['fwc']['links']);
    fwc.setWidgets([fwcVideo, fwcLinks]);
    var fwcRenderd = false;

    var arrTabWidget = [];
    var tcConfig = AD_CONFIG['tabs'];
    tcConfig['options'] = [];
    for (var i = 0; i < AD_CONFIG['tabs']['contents'].length; i++) {
        tcConfig['options'].push({
            "tab_title": AD_CONFIG['tabs']['contents'][i]['tab_title']
        });
        if ('image_cartoon' in AD_CONFIG['tabs']['contents'][i]['tab_con']) {
            arrTabWidget.push(new ad.widget.ImageCartoon(AD_CONFIG['tabs']['contents'][i]['tab_con']['image_cartoon']));
        } else {
            arrTabWidget.push(new ad.widget.SmallWeibo(AD_CONFIG['tabs']['contents'][i]['tab_con']['weibo']));
        }
    }
    var tc = new ad.widget.TabContainer(tcConfig);
    tc.setWidgets(arrTabWidget);

    var bg1 = new ad.widget.ButtonGroup(AD_CONFIG['buttons_1']);
    var bg2 = new ad.widget.ButtonGroup(AD_CONFIG['buttons_2']);
    var img = new ad.widget.Image(AD_CONFIG['img']);
    material.setWidgets(
        [
            [img],
            [new ad.widget.SmallHead(AD_CONFIG['head']), bg1, bg2]
        ], [tc], [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])], [fwc]
    );

    if (async === true) {
        return material;
    }
    material.show();

    bg1.rewriteTitle2(bg1.getRoot(), "头部上");
    bg2.rewriteTitle2(bg2.getRoot(), "头部下");
    fwc.addListener(ui.events.CLOSE, function(index) {
        hideFWC();
    });
    img.addListener(ui.events.CLICK, function() {
        img.sendLog('floatopen', 'floatopen');
        showFWC();
    });

    /**
     * 显示对应的视频浮层
     */
    function showFWC() {
        hideFWC();
        if (!fwc)
            return;
        //重绘浮层视频
        if (fwcVideo) {
            ad.base.setTimeout(function() {
                fwcVideo.refresh(null, AD_CONFIG['fwc']['video']);
            }, 10);
            fwc.show();
            if (!fwcRenderd) {
                var canvas = baidu.dom.first(fwc.getRoot());
                if (canvas && canvas.id) {
                    material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                    fwcLinks.rewriteTitle2(fwcLinks.getRoot(), '浮层');
                    fwcRenderd = true;
                }
            }
        }
    }

    /**
     * 隐藏视频浮层
     */
    function hideFWC() {
        if (fwcVideo) {
            fwcVideo.clearRoot();
        }
        fwc.hide();
    }
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
