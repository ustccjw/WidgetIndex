/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/text.js ~ 2012/10/11 08:30:40
 * @author  ()
 * @version $Revision: 10927 $
 * @description
 * text相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/text.less');
goog.include('ad/widget/tieba/text.html');

goog.provide('ad.widget.tieba.Text');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.Text = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_text';
};
baidu.inherits(ad.widget.tieba.Text, ad.widget.Widget);

/** @override */
ad.widget.tieba.Text.prototype.enterDocument = function() {
    ad.widget.tieba.Text.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.tieba.Text.prototype.bindEvent = function() {
    ad.widget.tieba.Text.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.tieba.Text.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
