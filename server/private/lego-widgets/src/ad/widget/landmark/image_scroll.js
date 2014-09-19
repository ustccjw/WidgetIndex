/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/landmark/image_scroll.js ~ 2013/12/02 16:39:07
 * @author loutongbing@baidu.com (loutongbing)
 * @version $Revision: 150523 $
 * @description
 * image_scroll相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/landmark/image_scroll.less');
goog.include('ad/widget/landmark/image_scroll.html');

goog.provide('ad.widget.landmark.ImageScroll');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.landmark.ImageScroll = function(data) {
    ad.widget.Widget.call(this, data);

    this.switchTime = 3000;

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_landmark_image_scroll';

    /**
     * @type {number}
     * @private
     */
    this._timer;
};
baidu.inherits(ad.widget.landmark.ImageScroll, ad.widget.Widget);

/** @override */
ad.widget.landmark.ImageScroll.prototype.bindEvent = function() {
    ad.widget.landmark.ImageScroll.superClass.bindEvent.call(this);
    var me = this;
    var linkArr =  baidu.g(me.getId('link-container')).getElementsByTagName('td');
    var imgArr = baidu.g(me.getId('image-container')).getElementsByTagName('a');
    me._hideAllImg();
    baidu.dom.addClass(linkArr[0], 'ec-current');
    baidu.dom.show(imgArr[0]);
    me._onSlide(0,linkArr);
};


ad.widget.landmark.ImageScroll.prototype._onSlide = function(index,linkArr) {
    var me = this;
    for (var i = 0; i < linkArr.length; i++) {
        baidu.on(linkArr[i], 'mouseenter', function() {
            for (var j = 0; j < linkArr.length; j++) {
                baidu.dom.removeClass(linkArr[j], 'ec-current');
            }
            baidu.dom.addClass(this, 'ec-current');
            var currentIndex = parseInt(baidu.dom.getAttr(this, 'index'), 10);
            me._hideAllImg();
            baidu.dom.show(me.getId('img' + currentIndex));
            index = currentIndex % linkArr.length;
        });
    }
    baidu.on(baidu.g(me.getId('main')), 'mouseenter', function() {
        ad.base.clearInterval(me._timer);
    });
    baidu.on(baidu.g(me.getId('main')), 'mouseleave', function() {
        start();
    });
    function start() {
        me._timer = ad.base.setInterval(function() {
            me._hideAllImg();
            for (var j = 0; j < linkArr.length; j++) {
                baidu.dom.removeClass(linkArr[j], 'ec-current');
            }
            index = (index + 1) % linkArr.length;
            baidu.dom.addClass(me.getId('link' + index), 'ec-current');
            baidu.dom.show(me.getId('img' + index));
        },3000);
    }
    start();
};

ad.widget.landmark.ImageScroll.prototype._hideAllImg = function() {
    var me = this;
    var imgArr = baidu.g(me.getId('image-container')).getElementsByTagName('a');
    for (var j = 0; j < imgArr.length; j++) {
        baidu.dom.hide(imgArr[j]);
    }
};

/**
 * @override
 */
ad.widget.landmark.ImageScroll.prototype.dispose = function() {
    if (this._timer) {
        ad.base.clearInterval(this._timer);
        this._timer = null;
    }
    ad.widget.landmark.ImageScroll.superClass.dispose.call(this);
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
