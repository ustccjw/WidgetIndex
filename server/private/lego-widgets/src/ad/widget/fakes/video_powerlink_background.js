/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/fakes/video_powerlink_background.js ~ 2013/06/21 10:36:35
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * video_powerlink_background相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/fakes/video_powerlink_background.html');

goog.provide('ad.widget.fakes.VideoPowerlinkBackground');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.fakes.VideoPowerlinkBackground = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_fakes_video_powerlink_background';
};
baidu.inherits(ad.widget.fakes.VideoPowerlinkBackground, ad.widget.Widget);

/** @override */
ad.widget.fakes.VideoPowerlinkBackground.prototype.enterDocument = function() {
    ad.widget.fakes.VideoPowerlinkBackground.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.fakes.VideoPowerlinkBackground.prototype.bindEvent = function() {
    ad.widget.fakes.VideoPowerlinkBackground.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.fakes.VideoPowerlinkBackground.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
