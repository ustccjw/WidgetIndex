/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/landmark/image_float.js ~ 2013/12/04 19:11:55
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * image_float相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.dom');

goog.include('ad/widget/landmark/image_float.less');
goog.include('ad/widget/landmark/image_float.html');

goog.provide('ad.widget.landmark.ImageFloat');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.landmark.ImageFloat = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_landmark_image_float';
};
baidu.inherits(ad.widget.landmark.ImageFloat, ad.widget.Widget);

/** @override */
ad.widget.landmark.ImageFloat.prototype.bindEvent = function() {
    ad.widget.landmark.ImageFloat.superClass.bindEvent.call(this);

    var me = this;
    ad.dom.on(me.getId('image'), 'click', function(evt) {
        baidu.show(me.getId('float'));

        me.sendLog({
            'action': '打开浮层',
            '__node': baidu.g(me.getId('image'))
        });
    });
    ad.dom.on(me.getId('close'), 'click', function(evt) {
        baidu.hide(me.getId('float'));

        me.sendLog({
            'action': '关闭浮层',
            '__node': baidu.g(me.getId('close'))
        });

        baidu.event.stop(evt || window.event);
    });
};

/** @override */
ad.widget.landmark.ImageFloat.prototype.patchData = function() {
    if (this._data) {
        if (!this._data['float_width']) {
            this._data['float_width'] = 400;
        }
        if (!this._data['float_height']) {
            this._data['float_height'] = 300;
        }
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
