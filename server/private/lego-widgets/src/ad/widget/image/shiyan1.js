/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/image/shiyan1.js ~ 2013/03/07 15:23:39
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * shiyan1相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/image/shiyan1.less');
goog.include('ad/widget/image/shiyan1.html');

goog.provide('ad.widget.image.Shiyan1');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.image.Shiyan1 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_image_shiyan1';
};
baidu.inherits(ad.widget.image.Shiyan1, ad.widget.Widget);

/** @override */
ad.widget.image.Shiyan1.prototype.patchData = function() {
    if (this._data) {
        this._data['logo_width'] = 65;
        this._data['logo_height'] = 20;
        this._data['width'] = 157;
        this._data['height'] = 200;
        //过滤showurl的http://
        if(this._data['show_url']){
            this._data['show_url'] = this._data['show_url'].replace('http://','');
        }
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
