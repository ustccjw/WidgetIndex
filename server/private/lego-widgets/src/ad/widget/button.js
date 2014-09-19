/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/button.js ~ 2013/01/24 21:08:37
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * button相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/button.less');
goog.include('ad/widget/button.html');

goog.provide('ad.widget.Button');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Button = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_button';
};
baidu.inherits(ad.widget.Button, ad.widget.Widget);

/** @override */
ad.widget.Button.prototype.enterDocument = function() {
    ad.widget.Button.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.Button.prototype.bindEvent = function() {
    ad.widget.Button.superClass.bindEvent.call(this);
    var me = this;
    baidu.on(baidu.g(me.getId('button')), 'click', function(e){
        me.trigger(ui.events.CLICK, e, me);
    });
    // CODE HERE
};

/** @override */
ad.widget.Button.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
        this._data['class_name'] = this._data['class_name'] || '';
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
