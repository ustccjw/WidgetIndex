/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/smart/image_slider.js ~ 2013/10/29 18:51:32
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * image_slider相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/smart/image_slider.less');
goog.include('ad/widget/smart/image_slider.html');

goog.provide('ad.widget.smart.ImageSlider');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.smart.ImageSlider = function(data) {
    this._timer;

    this._interval = 5000; //轮播间隔

    this._currentIdx = 0; //默认显示第几幅

    this._imgCount; //图片数量

    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_smart_image_slider';
};
baidu.inherits(ad.widget.smart.ImageSlider, ad.widget.Widget);

/** @override */
ad.widget.smart.ImageSlider.prototype.bindEvent = function() {
    ad.widget.smart.ImageSlider.superClass.bindEvent.call(this);

    if (this._imgCount > 1) {
        this._timer = ad.base.setInterval(baidu.fn.bind(this._showImageAt, this), this._interval);

        var navs = baidu.g(this.getId('navs'));
        var me = this;
        baidu.on(navs, 'click', function(evt) {
            evt = evt || window.event;
            var targetElm = baidu.event.getTarget(evt);
            if (targetElm.tagName.toLowerCase() == 'li') {
                me._showImageAt(targetElm.getAttribute('data-index') - 0);
            }
        });
    }
};

/** @override */
ad.widget.smart.ImageSlider.prototype.patchData = function() {
    if (this._data) {
        var imgsData = this.getData('options', []);
        var len = imgsData.length;
        this._imgCount = len;
        if (len > 0) {
            this._data['image_src'] = imgsData[0]['img_src'];
        }
        if (this._data['interval'] !== undefined && !isNaN(parseInt(this._data['interval']))) {
            this._interval = parseInt(this._data['interval'], 10);
        }
    }
};

/**
 * @param {Number} idx
 * @description 显示第几张图片
 */
ad.widget.smart.ImageSlider.prototype._showImageAt = function(idx) {
    if (idx === undefined) { //自动轮播
        idx = (this._currentIdx + 1) % this._imgCount;
    }
    else { //点击切换时
        if (idx != this._currentIdx) {
            ad.base.clearInterval(this._timer); //清除定时器
            this._timer = ad.base.setInterval(baidu.fn.bind(this._showImageAt, this), this._interval);
            this.sendLog({
                'action': 'banner缩略图' + (idx + 1)
            });
        }
        else {
            return;
        }
    }
    var imgElm = baidu.g(this.getId('img'));
    var imgData = this.getData('options', [])[idx];
    imgElm.src = imgData['img_src'];
    imgElm.parentNode.href = imgData['img_rcv_url'];
    imgElm.parentNode.setAttribute('title2', 'banner图' + (idx + 1));

    var navs = baidu.g(this.getId('navs'));
    baidu.removeClass(navs.children[this._currentIdx], 'ec-current');
    baidu.addClass(navs.children[idx], 'ec-current');

    this._currentIdx = idx;
};









/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
