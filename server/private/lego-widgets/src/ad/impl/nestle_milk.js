/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: nestle_milk.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/nestle_milk.js ~ 2012/09/27 14:17:21
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * encore相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.Title');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.ImageShowArrow');

goog.include('ad/impl/nestle_milk.less');

goog.provide('ad.impl.NestleMilk');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-nestle_milk'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    var material = new ad.material.BaseMaterial();
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var fwcFloat = [];
    var fwcFirstOpen = [];
    var lastFWCIndex;
    if (AD_CONFIG['float_cons'] && AD_CONFIG['float_cons'].length) {
        var flashCount = AD_CONFIG['float_cons'].length;
        for (var i = 0; i < flashCount; i++) {
            AD_CONFIG['fwc']['id'] = (i + 1);
            var fwcItem = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
            AD_CONFIG['float_cons'][i]['switch_time'] = 50000000;
            fwcItem.setWidgets(new ad.widget.ImageShowArrow(AD_CONFIG['float_cons'][i]));
            fwcFloat.push(fwcItem);
        }
    }

    material.setWidgets(
        new ad.widget.Title(AD_CONFIG['title']), [
            leftVideo,
            smallHead
        ],
        new ad.widget.Iframe(AD_CONFIG['iframe']),
        new ad.widget.ButtonGroup(AD_CONFIG['button_group']),
        fwcFloat
    );
    if (async === true) {
        return material;
    }

    material.show();

    smallHead.addListener(ui.events.CLICK, function(index, me) {
        showFWC(index);
        smallHead.sendLog("float" + (index + 1) + "open");
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('videostart');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        leftVideo.sendLog('videoclick');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('videocomplete');
        return false;
    });

    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */

    function showFWC(index) {
        if (lastFWCIndex == index) {
            return;
        }
        hideFWC(lastFWCIndex);
        var targetFWC = fwcFloat[index];
        if (targetFWC) {
            targetFWC.show();
            lastFWCIndex = index;
            if (!fwcFirstOpen[index]) {
                fwcFirstOpen[index] = true;
                material.trigger(ui.events.NEW_AD_CANVAS, targetFWC.getId() + '-fwc');
                targetFWC.addListener(
                    ui.events.CLOSE,
                    function() {
                        hideFWC(index);
                    }
                );
                var imgArrow = targetFWC.getWidget(0);
                imgArrow.addListener(ui.events.ARROW_RIGHT, function() {
                    imgArrow.sendLog("float" + (index + 1) + "-arrow-right");
                });
                imgArrow.addListener(ui.events.ARROW_LEFT, function() {
                    imgArrow.sendLog("float" + (index + 1) + "-arrow-left");
                });
                imgArrow.rewriteTitle2(
                    imgArrow.getRoot(),
                    "float" + (index + 1) + "-",
                    false
                );
            }
        }
    }

    /**
     * 隐藏对应的浮层
     * @param {number} index 索引.
     */

    function hideFWC(index) {
        var targetFWC = fwcFloat[index];
        if (!targetFWC)
            return;
        targetFWC.hide();
        lastFWCIndex = -1;
    }
});









/* vim: set ts=4 sw=4 sts=4 tw=100: */
