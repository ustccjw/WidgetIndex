/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/landmark/old_image_scroll.js ~ 2013/12/04 23:33:10
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * old_image_scroll相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.dom');

goog.include('ad/widget/landmark/old_image_scroll.less');
goog.include('ad/widget/landmark/old_image_scroll.html');

goog.provide('ad.widget.landmark.OldImageScroll');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.landmark.OldImageScroll = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_landmark_old_image_scroll';

    /**
     * @type {number}
     * @private
     */
    this._timer;
};
baidu.inherits(ad.widget.landmark.OldImageScroll, ad.widget.Widget);

/** @override */
ad.widget.landmark.OldImageScroll.prototype.enterDocument = function() {
    ad.widget.landmark.OldImageScroll.superClass.enterDocument.call(this);

    this.linkArr =  baidu.g(this.getId('titles')).getElementsByTagName('li');
    this.imgArr = baidu.g(this.getId('images')).getElementsByTagName('a');
    this.prepare();
};

/** @override */
ad.widget.landmark.OldImageScroll.prototype.bindEvent = function() {
    ad.widget.landmark.OldImageScroll.superClass.bindEvent.call(this);

    this.start();
};

ad.widget.landmark.OldImageScroll.prototype.prepare = function() {
    this.hideAllImage();
    this.current = 0;
    this.loaded = 1;
    this.loadNext();
    baidu.dom.addClass(this.linkArr[0], 'ec-current');
    baidu.dom.show(this.imgArr[0]);
};

ad.widget.landmark.OldImageScroll.prototype.loadNext = function(index) {
    index = index == null ? (this.current + 1) : index;
    if (this.loaded == this.imgArr.length) {
        return;
    }
    var next = this.imgArr[index % this.imgArr.length];
    if (!next) {
        return;
    }
    var img = next.getElementsByTagName('img')[0];
    var src = img.getAttribute('data-src');
    if (src) {
        img.src = src;
        img.removeAttribute('data-src');
        this.loaded++;
    }
};

ad.widget.landmark.OldImageScroll.prototype.start = function() {
    var me = this;
    var linkArr = this.linkArr;
    var imgArr = this.imgArr;

    for (var i = 0; i < linkArr.length; i++) {
        ad.dom.enter(linkArr[i], function() {
            for (var j = 0; j < linkArr.length; j++) {
                baidu.dom.removeClass(linkArr[j], 'ec-current');
            }
            var index = parseInt(baidu.dom.getAttr(this, 'index'), 10);
            baidu.dom.addClass(this, 'ec-current');
            me.hideAllImage();
            baidu.dom.show(imgArr[index]);
            me.current = index % linkArr.length;
            me.loadNext(me.current);
        });
    }
    ad.dom.enter(baidu.g(me.getId('main')), function() {
        ad.base.clearInterval(me._timer);
    });
    ad.dom.leave(baidu.g(me.getId('main')), function() {
        startInternal();
    });
    function startInternal() {
        me._timer = ad.base.setInterval(
            function() {
                me.hideAllImage();
                for (var j = 0; j < linkArr.length; j++) {
                    baidu.dom.removeClass(linkArr[j], 'ec-current');
                }
                me.current = (me.current + 1) % linkArr.length;
                me.loadNext(me.current + 1);
                if(!linkArr[me.current]) {
                    return;
                }
                baidu.dom.addClass(linkArr[me.current], 'ec-current');
                baidu.dom.show(imgArr[me.current]);
            },
            parseInt(me.getData('interval', 3000), 10)
        );


    }
    if (imgArr.length > 1) {
        startInternal();
    }
}


ad.widget.landmark.OldImageScroll.prototype.hideAllImage = function() {
    var imgArr = this.imgArr;

    for (var j = 0; j < imgArr.length; j++) {
        baidu.dom.hide(imgArr[j]);
    }
}

/**
 * @override
 */
ad.widget.landmark.OldImageScroll.prototype.dispose = function() {
    if (this._timer) {
        ad.base.clearInterval(this._timer);
        this._timer = null;
    }
    ad.widget.landmark.OldImageScroll.superClass.dispose.call(this);
}




















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
