/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/all_spec.js ~ 2013/05/31 10:27:24
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * all_spec相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/all_spec.less');
goog.include('ad/widget/all_spec.html');

goog.provide('ad.widget.AllSpec');


/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.AllSpec = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_all_spec';
    window['xwhtest'] = 'xwhtest2';
};
baidu.inherits(ad.widget.AllSpec, ad.widget.Widget);

/** @override */
ad.widget.AllSpec.prototype.enterDocument = function() {
    ad.widget.AllSpec.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.AllSpec.prototype.bindEvent = function() {
    ad.widget.AllSpec.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.AllSpec.prototype.patchData = function() {
    if (this._data) {
        var str = baidu.json.stringify(this._data);
        this._data['_custom_data'] = str;
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
