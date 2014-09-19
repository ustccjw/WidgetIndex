/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/gx_sck/comp_card_main.js ~ 2013/04/11 14:31:11
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * comp_card_main相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/gx_sck/comp_card_main.less');
goog.include('ad/widget/gx_sck/comp_card_main.html');

goog.provide('ad.widget.gx_sck.CompCardMain');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.gx_sck.CompCardMain = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gx_sck_comp_card_main';
};
baidu.inherits(ad.widget.gx_sck.CompCardMain, ad.widget.Widget);

/**
 * @inheritDoc
 */
ad.widget.gx_sck.CompCardMain.prototype.patchData = function() {
    var showUrl = this.getData('show_url');
    if (showUrl) {
        // 去除protocol
        this._data['show_url'] = showUrl.replace(/^[A-Za-z]{3,9}:(\/\/)?/g, '');
    }
};


/* vim: set ts=4 sw=4 sts=4 tw=100: */
