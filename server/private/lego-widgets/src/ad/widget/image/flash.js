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

goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/image/flash.less');
goog.include('ad/widget/image/flash.html');

goog.provide('ad.widget.image.Flash');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.image.Flash = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_image_flash';
};
baidu.inherits(ad.widget.image.Flash, ad.widget.Widget);

/** @override */
ad.widget.image.Flash.prototype.bindEvent = function() {
    ad.widget.image.Flash.superClass.bindEvent.call(this);
    if (baidu.g(this.getId('link'))) {
        var me = this;
        baidu.on(baidu.g(this.getId('link')), 'click', function(evt){
            if (false === me.trigger(ui.events.CLICK, this)) {
                baidu.event.stop(evt || window.event);
            }
        });
    }
};

/** @private */
ad.widget.image.Flash.prototype.patchData = function() {
    if (this._data){
        var re = /^.+.(png|jpg|jpeg|bmp|gif)$/i;
        this._data['is_img'] = re.test(this._data['src']);
    }
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
