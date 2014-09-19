/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/floatvideo/main.js ~ 2012/12/25 11:26:20
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * main相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/floatvideo/main.less');
goog.include('ad/widget/floatvideo/main.html');

goog.provide('ad.widget.floatvideo.Main');

baidu.event._eventFilter.mouseenter;
baidu.event._eventFilter.mouseleave;

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.floatvideo.Main = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_floatvideo_main';
};
baidu.inherits(ad.widget.floatvideo.Main, ad.widget.Widget);


/** @override */
ad.widget.floatvideo.Main.prototype.bindEvent = function() {
    ad.widget.floatvideo.Main.superClass.bindEvent.call(this);

    var me = this;
    me._fg = baidu.g(me.getId('fg'));
    me._bg = baidu.g(me.getId('bg'));
    me._start = baidu.g(me.getId('fg-start'));

    me._bindMouseenterEvent(me.getId('fg'));
    me._bindMouseenterEvent(me.getId('bg'));
    me._bindMouseleaveEvent(me.getId('fg'));
    me._bindMouseleaveEvent(me.getId('bg'));

    baidu.on(me._fg, 'click', function(e){
        me.trigger(ui.events.CLICK);
    });
    baidu.on(me._bg, 'click', function(e){
        me.trigger(ui.events.CLICK);
    });
};

/** @override */
ad.widget.floatvideo.Main.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
}

ad.widget.floatvideo.Main.prototype._bindMouseenterEvent = function(domid) {
    var dom = baidu.g(domid);
    var me = this;

    if (dom) {
        baidu.on(dom, 'mouseenter', function(e) {
            me._start.className = 'ec-start ec-hover';
            me._bg.style.display = 'block';
            var pos = baidu.dom.getPosition(me._fg);
            baidu.setStyles(me._bg, {
                'top': (pos.top - 5) + 'px',
                'left': (pos.left - 5) + 'px'
            });
            if (me._bg.parentNode != document.body) {
                document.body.appendChild(me._bg);
            }
        });
    }
}

ad.widget.floatvideo.Main.prototype._bindMouseleaveEvent = function(domid) {
    var dom = baidu.g(domid);
    var me = this;

    if (dom) {
        baidu.on(dom, 'mouseleave', function(e) {
            me._start.className = 'ec-start';
            me._bg.style.display = 'none';
        });
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
