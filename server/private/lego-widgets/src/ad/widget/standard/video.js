/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/standard/video.js ~ 2013/11/06 13:16:59
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 10927 $
 * @description
 * video相关的实现逻辑
 **/
goog.require('ad.dom');
goog.require('ad.widget.Video');
goog.require('ad.widget.FloatWindowContainer');

goog.provide('ad.widget.standard.Video');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Video}
 */
ad.widget.standard.Video = function(data) {
    ad.widget.Video.call(this, data);

    /**
     * @type {ad.widget.Video}
     * @private
     */
    this._bigVideo;

    /**
     * @private
     * @type {ad.widget.FloatWindowContainer}
     */
    this._fwc;

    /**
     * @private
     * @type {string}
     */
    this._fwcTop;
};
baidu.inherits(ad.widget.standard.Video, ad.widget.Video);

/** @override */
ad.widget.standard.Video.prototype.bindEvent = function() {
    ad.widget.standard.Video.superClass.bindEvent.call(this);

    // 打开/关闭浮层视频
    var me = this;
    this.addListener('VIDEO_OPEN_POPUP', function(e, args) {
        me._showPopup();
    });
};

/**
 * 浮层中视频的配置信息
 * @return {Object}
 */
ad.widget.standard.Video.prototype._getBigVideoConfig = function() {
    var newConfig = baidu.extend({}, this._data);
    newConfig['width'] = 540;
    newConfig['height'] = 304;
    newConfig['is_play'] = true;
    newConfig['playermode'] = 'big';
    if (this._data['big_img_url']) {
        newConfig['img_url'] = this._data['big_img_url'];
    }
    return newConfig;
};

/**
 * 使用FloatWindowContainer显示大的视频.
 */
ad.widget.standard.Video.prototype._showPopup = function() {
    // 问题：浏览器缓冲视频流，导致小视频loading过程中，大视频打开不会自动播放。
    // 解决办法：打开大视频时清空小视频。
    this.getSwf()['swfVideoClear']();

    if (!this._fwc) {
        var me = this;
        this._fwc = new ad.widget.FloatWindowContainer({
            'width': 540,
            'height': 304
        });
        this._bigVideo = new ad.widget.Video(this._getBigVideoConfig());
        this._bigVideo.addListener('VIDEO_CLOSE_POPUP', function(e, args) {
            me._hidePopup();
        });
        this._fwc.setWidgets([this._bigVideo]);
        this._fwc.show();
        this._fwcTop = ad.dom.getStyle(this._fwc.getId() + "-fwc", 'top')
        baidu.hide(this._fwc.getId('close'));
    } else {
        baidu.dom.setStyle(this._fwc.getId() + "-fwc", 'top', this._fwcTop);
        this._bigVideo.getSwf()['swfVideoPlay']();
    }

};

/**
 * 隐藏大的视频.
 */
ad.widget.standard.Video.prototype._hidePopup = function() {
    // 问题：IE浏览器会将隐藏dom内的swf文件as callback接口置为null。
    // 解决办法：不关闭浮层，只是将其移出屏幕。
    if (this._fwc) {
        baidu.dom.setStyle(this._fwc.getId() + "-fwc", 'top', '-9999px');
        this._bigVideo.getSwf()['swfVideoPause']();
    }
};

/** @override */
ad.widget.standard.Video.prototype.patchData = function() {
    // 强制使用新版的播放器，不能设置
    this._data['player_ver'] = 7;
    if (!this._data['playermode']) {
        this._data['playermode'] = 'small';
    }

    ad.widget.standard.Video.superClass.patchData.call(this);
};

/** @override */
ad.widget.standard.Video.prototype.dispose = function() {
    if (this._fwc) {
        this._fwc.dispose();
    }

    if (this._bigVideo) {
        this._bigVideo.dispose();
    }

    ad.widget.standard.Video.superClass.dispose.call(this);
};

/**
 * 获得浮层大视频播放器的实例
 * @return {ad.widget.Video}
 */
ad.widget.standard.Video.prototype.getBigVideo = function() {
    return this._bigVideo;
}



/* vim: set ts=4 sw=4 sts=4 tw=100: */
