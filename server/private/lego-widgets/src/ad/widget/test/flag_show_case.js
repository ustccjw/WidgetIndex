/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/test/flag_show_case.js ~ 2013/11/28 22:43:40
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 10927 $
 * @description
 * flag_show_case相关的实现逻辑
 * 测试一下FLAGS_*相关的功能
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/test/flag_show_case.less');
goog.include('ad/widget/test/flag_show_case.html');

goog.provide('ad.widget.test.FlagShowCase');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.test.FlagShowCase = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_test_flag_show_case';
};
baidu.inherits(ad.widget.test.FlagShowCase, ad.widget.Widget);

/** @override */
ad.widget.test.FlagShowCase.prototype.patchData = function() {
    if (this._data) {
        this._data['FLAGS_use_amd_define'] = FLAGS_use_amd_define;
        this._data['FLAGS_auto_decorate'] = FLAGS_auto_decorate;
        this._data['FLAGS_test_number'] = FLAGS_test_number;
        this._data['FLAGS_test_string'] = FLAGS_test_string;
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
