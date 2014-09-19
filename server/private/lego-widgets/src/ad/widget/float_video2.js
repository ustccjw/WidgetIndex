/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/float_video2.js ~ 2012/12/24 15:17:11
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * float_video2相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/float_video2.less');
goog.include('ad/widget/float_video2.html');

goog.provide('ad.widget.FloatVideo2');

baidu.event._eventFilter.mouseenter;
baidu.event._eventFilter.mouseleave;

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.FloatVideo2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_float_video2';

    this._fg;

    this._bg;

    this._start;
};
baidu.inherits(ad.widget.FloatVideo2, ad.widget.Widget);

/** @override */
ad.widget.FloatVideo2.prototype.enterDocument = function() {
    ad.widget.FloatVideo2.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.FloatVideo2.prototype.bindEvent = function() {
    ad.widget.FloatVideo2.superClass.bindEvent.call(this);

    // CODE HERE
    var me = this;
    me._fg = baidu.g(me.getId('fg'));
    me._bg = baidu.g(me.getId('bg'));
    me._start = baidu.g(me.getId('fg-start'));

    me._bindMouseenterEvent(me.getId('fg'));
    me._bindMouseenterEvent(me.getId('bg'));
    me._bindMouseleaveEvent(me.getId('fg'));
    me._bindMouseleaveEvent(me.getId('bg'));
};

/** @override */
ad.widget.FloatVideo2.prototype.patchData = function() {
    if (this._data) {
        if(this._data['float'] && this._data['float']['video'] && this._data['float']['video'][0]){
            this._data['float']['cur_video'] = this._data['float']['video'][0];
        }
    }
}


ad.widget.FloatVideo2.prototype._bindMouseenterEvent = function(domid) {
    var dom = baidu.g(domid);
    var me = this;
    if(dom){
        baidu.on(dom, 'mouseenter', function(e){
            me._start.className = 'ec-start ec-hover';
            me._bg.style.display = 'block';
        });
    }
}

ad.widget.FloatVideo2.prototype._bindMouseleaveEvent = function(domid) {
    var dom = baidu.g(domid);
    var me = this;
    if(dom){
        baidu.on(dom, 'mouseleave', function(e){
            me._start.className = 'ec-start';
            me._bg.style.display = 'none';
        });
    }
}


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
