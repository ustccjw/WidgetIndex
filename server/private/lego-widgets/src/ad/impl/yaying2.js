/**
 * src/ad/impl/yaying2.less ~ 2013-11-04 14:22:11
 * @author shaojunjie, xiongjie
 * @version $Revision: 11222 $
 * @description
 * yaying2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Flash');
goog.require('ui.events');

goog.include('ad/impl/yaying2.less');

goog.provide('ad.impl.Yaying2');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var imageNormalWidget = new ad.widget.ImageNormal(AD_CONFIG['images']);
    var popWindows = [];

    AD_CONFIG['pop_video']['material_name'] = 'ec-yaying';
    var videoPopWindow = new ad.widget.FloatWindowContainer(AD_CONFIG['pop_video']);
    videoPopWindow.setWidgets(new ad.widget.Video(AD_CONFIG['pop_video']['video']), new ad.widget.ImageNormal(AD_CONFIG['pop_video']['images']));
    popWindows.push(videoPopWindow);

    var flashData = AD_CONFIG['pop_flash']['options'];
    var flashPopWindow;
    for (var i = 0, len = flashData.length; i < len; i++) {
        flashData[i]['id'] = i + 2;
        flashPopWindow = new ad.widget.FloatWindowContainer(flashData[i]);
        flashPopWindow.setWidgets(new ad.widget.Flash(flashData[i]));
        popWindows.push(flashPopWindow);
    }

    var cavasEventTriggered = {};

    material.setWidgets(
        [
            new ad.widget.Video(AD_CONFIG['video']),
            [
                new ad.widget.SmallHead(AD_CONFIG['small_head']),
                new ad.widget.SmallWeibo(AD_CONFIG['small_weibo'])
            ]
        ],
        new ad.widget.ButtonGroup(AD_CONFIG['button_group']),
        imageNormalWidget,
        popWindows
    );
    if (async === true) {
        return material;
    }

    material.show();
    imageNormalWidget.addListener(ui.events.CLICK, function(idx) {
        showPopup(idx);
        return false;
    });

    var lastPopupIdx = -1;

    function showPopup(idx) {
        if (idx == lastPopupIdx) return;
        if (lastPopupIdx != -1) {
            popWindows[lastPopupIdx].hide();
            popWindows[lastPopupIdx].removeListener(ui.events.CLOSE, monitorCloseEvent);
        }
        popWindows[idx].show();
        lastPopupIdx = idx;
        popWindows[idx].addListener(ui.events.CLOSE, monitorCloseEvent);
        imageNormalWidget.sendLog({
            'action': '浮层' + (idx + 1) + '打开',
            '__node': popWindows[idx].getRoot()
        });
        if (cavasEventTriggered[idx] === undefined) {
            cavasEventTriggered[idx] = true;
            material.trigger(ui.events.NEW_AD_CANVAS, popWindows[idx].getId() + '-fwc');
        }
    }

    function monitorCloseEvent() {
        popWindows[lastPopupIdx].removeListener(ui.events.CLOSE, monitorCloseEvent);
        lastPopupIdx = -1;
    }
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
