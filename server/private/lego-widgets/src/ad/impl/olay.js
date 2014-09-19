/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: olay.js  2012-07-18 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/impl/olay.js ~ 2012/07/18 11:47:13
 * @author wangdawei
 * @version $Revision: $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Video');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.Flash');
goog.require('ad.widget.TabContainer');
goog.include('ad/impl/olay.less');

goog.provide('ad.impl.Olay');

ad.Debug(function(async) {
    var h1 = new ad.widget.H1(AD_CONFIG['h1']);
    var imageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    var fwcCount = AD_CONFIG['fwc']['options'].length;
    var arrSection = [];
    var arrFWC = [];
    var arrVideo = [];

    for (var i = 0; i < fwcCount; i++) {
        //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
        AD_CONFIG['fwc']['options'][i]['material_name'] = 'olay';
        AD_CONFIG['fwc']['options'][i]['id'] = i + 1;
        arrSection.push(new ad.widget.Section(AD_CONFIG['section']['options'][i]));
        arrFWC.push(new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']['options'][i]));
        if ("video" in AD_CONFIG['fwc_cont']['options'][i]['content']) {
            arrVideo[i] = new ad.widget.Video(AD_CONFIG['fwc_cont']['options'][i]['content']['video']);
            arrFWC[i].setWidgets([arrVideo[i]]);
        } else if ("image" in AD_CONFIG['fwc_cont']['options'][i]['content']) {
            arrVideo[i] = null;
            arrFWC[i].setWidgets(new ad.widget.ImageLink(AD_CONFIG['fwc_cont']['options'][i]['content']['image']));
        } else if ("flash" in AD_CONFIG['fwc_cont']['options'][i]['content']) {
            arrVideo[i] = null;
            arrFWC[i].setWidgets(new ad.widget.Flash(AD_CONFIG['fwc_cont']['options'][i]['content']['flash']));
        } else {

        }
    }
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tabs']);
    tabContainer.setWidgets(arrSection);

    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [h1], [imageNormal], [tabContainer],
        arrFWC
    );

    if (async === true) {
        return material;
    }

    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);

    imageNormal.addListener(ui.events.MOUSE_OVER, function(imgIndex) {
        tabContainer.switchTab(imgIndex);
        tabContainer.cancelSlideShow();
    });
    imageNormal.addListener(ui.events.MOUSE_OUT, function(imgIndex) {
        tabContainer.startSlideShow();
    });

    imageNormal.addListener(ui.events.CLICK, function(imgIndex) {
        showFWC(imgIndex);
        this.sendLog('图片链接' + (imgIndex + 1));
        return false;
    });

    baidu.array.each(arrSection, function(item, i) {
        // FIXME(leeight) 修订栏目的title2
        // 异步了，无法直接调用
        // item.rewriteTitle2(null,"tab" + (i + 1) + '-');
    });

    baidu.array.each(arrVideo, function(item, i) {
        if (!item) {
            return false;
        }
        item.addListener(ui.events.VIDEO_START, function() {
            this.sendLog('video' + (i + 1) + '_start');
            return false;
        });
        item.addListener(ui.events.VIDEO_FINISH, function() {
            this.sendLog('video' + (i + 1) + '_finish');
            return false;
        });
        item.addListener(ui.events.VIDEO_CLICK, function() {
            this.sendLog('video' + (i + 1) + '_click');
            //在ipad下手动跳转
            if (this._data['is_ipad']) {
                this.redirect();
            }
            return false;
        });
    });

    baidu.array.each(arrFWC, function(item, i) {
        item.addListener(ui.events.CLOSE, function() {
            hideFWC(i);
        })
        // FIXME(user) material.getCMS()
        // material.getCMS().init(baidu.getAttr(baidu.dom.first(item.getRoot()), 'id'));
    });

    var lastFWCIndex = -1;

    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if (lastFWCIndex == index) {
            return;
        }
        hideFWC(lastFWCIndex);
        var targetFWC = arrFWC[index];
        if (!targetFWC)
            return;
        //重绘浮层视频
        if (arrVideo[index]) {
            ad.base.setTimeout(function() {
                arrVideo[index].refresh();
            }, 10);
            targetFWC.show();
        } else {
            targetFWC.show();
        }
        lastFWCIndex = index;
    }

    /**
     * 隐藏对应的浮层
     * @param {number} index 索引.
     */
    function hideFWC(index) {
        var targetFWC = arrFWC[index];
        if (!targetFWC)
            return;
        if (arrVideo[index]) {
            arrVideo[index].clearRoot();
        }
        targetFWC.hide();
        lastFWCIndex = -1;
    }


});

/* vim: set ts=4 sw=4 sts=4 tw=100: */