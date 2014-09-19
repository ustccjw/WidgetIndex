/**
 * src/ad/impl/guerlain.js ~ 2013-06-07 14:44:55
 * @author xiongjie01@baidu.com
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Tab');
goog.require('ad.widget.Flash');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ui.events');

goog.include('ad/impl/guerlain.less');

goog.provide('ad.impl.Guerlain');

ad.Debug(function(async) {
    AD_CONFIG['float']['material_name'] = 'ec-guerlain';

    var video = new ad.widget.Video(AD_CONFIG['video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['head']);
    // 视频弹出层
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['float']);
    // 视频hook，有可能根本就没点过，可以先不创建widget
    var flash = new ad.widget.Flash(AD_CONFIG['flash']['flashs'][0]);
    fwc.setWidgets([flash]);
    var tab = new ad.widget.Tab(AD_CONFIG['tab']);
    var links = new ad.widget.ButtonGroup(AD_CONFIG['links']);

    var material = new ad.material.BaseMaterial();
    material.setWidgets([video, smallHead], tab, links, fwc);

    if (async === true) {
        return material;
    }
    material.show();

    // 绑定视频事件
    var logRecord = {
        'videostart': 0,
        'videocomplete': 0
    };
    video.addListener(ui.events.VIDEO_START, function() {
        if (logRecord['videostart'] == 0) {
            logRecord['videostart'] = 1;
            video.sendLog({
                'action': '视频开始播放',
                '__node': video.getRoot()
            });
        }
        return false;
    });
    video.addListener(ui.events.VIDEO_PAUSE, function() {
        return false;
    });
    video.addListener(ui.events.VIDEO_CONTINUE, function() {
        return false;
    });
    video.addListener(ui.events.VIDEO_FINISH, function() {
        if (logRecord['videocomplete'] == 0) {
            logRecord['videocomplete'] = 1;
            video.sendLog({
                'action': '视频结束播放',
                '__node': video.getRoot()
            });
        }
        return false;
    });

    // 绑定浮层相关事件
    smallHead.addListener(ui.events.CLICK, function(index, widget, link) {
        showPopup(index, link);
        return false;
    });
    fwc.addListener(ui.events.CLOSE, hidePopup);

    var lastIndex = -1;
    /**
     * 显示对应的广告浮层
     * @param {number} index 索引.
     * @param {Node} link 点击的链接
     */
    function showPopup(index, link) {
        video.pause();

        if (index != lastIndex) {
            hidePopup();
            smallHead.sendLog({
                'action': '打开浮层' + (index + 1),
                '__node': link
            });

            flash.refresh(null, AD_CONFIG['flash']['flashs'][index]);
            lastIndex = index;

            fwc.show();
        }
    }

    function hidePopup() {
        flash.clearRoot();
        lastIndex = -1;

        fwc.hide();
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
