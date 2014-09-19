/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/flash.js ~ 2012/08/27 17:27:07
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 10927 $
 * @description
 * flash相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/flash.less');
goog.include('ad/widget/flash.html');

goog.provide('ad.widget.Flash');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Flash = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_flash';
};
baidu.inherits(ad.widget.Flash, ad.widget.Widget);

/** @override */
ad.widget.Flash.prototype.enterDocument = function() {
    var me = this;
    window[me._data['jsapi']] = function(id, eventType, var_args) {
        me.trigger('FLASH_' + eventType, var_args);
    };
    ad.widget.Flash.superClass.enterDocument.call(this);
    if (this._data['auto_hide_if_not_support']) {
        if (!baidu.swf.version) {
            baidu.hide(this.getRoot());
        }
    }
};

/** @override */
ad.widget.Flash.prototype.bindEvent = function() {
    ad.widget.Flash.superClass.bindEvent.call(this);
    if (baidu.g(this.getId('link'))) {
        var me = this;
        baidu.on(this.getId('link'), 'click', function(evt) {
            if (false === me.trigger(ui.events.CLICK, this)) {
                baidu.event.stop(evt || window.event);
            }
        });
    }
};

/** @private */
ad.widget.Flash.prototype.patchData = function() {
    if (this._data) {
        this._data['is_ipad'] = this.getData('is_ipad', ad.env.isIpad);
        this._data['jsapi'] = this.getId('jsapi').replace(/[^a-zA-Z]/g, '');
        this._data['wmode'] = this._data['wmode'] ? this._data['wmode'] : 'opaque';

        if (this._data['width'] && this._data['height']) {
            // 判别 'px' 和 '%'
            var w = this._data['width'].toString();
            var h = this._data['height'].toString();
            this._data['style_width'] = (/\d$/.test(w)) ? w + 'px' : w;
            this._data['style_height'] = (/\d$/.test(h)) ? h + 'px' : h;
        }
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
