/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/spec_check.js ~ 2014/05/03 12:49:29
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * spec_check相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/spec_check.less');
goog.include('ad/widget/spec_check.html');

goog.provide('ad.widget.SpecCheck');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.SpecCheck = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_spec_check';
};
baidu.inherits(ad.widget.SpecCheck, ad.widget.Widget);

/** @override */
ad.widget.SpecCheck.prototype.patchData = function() {
    if (this._data) {
        var json = null;
        if (window.JSON) {
            json = window.JSON.stringify(this._data, null, 4);
        }
        else {
            json = baidu.json.stringify(this._data);
        }
        this._data['json'] = json;
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
