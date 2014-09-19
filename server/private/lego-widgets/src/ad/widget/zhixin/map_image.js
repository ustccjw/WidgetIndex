/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhixin/map_image.js ~ 2014/03/04 14:25:33
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * map_image相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.Widget');

goog.include('ad/widget/zhixin/map_image.less');
goog.include('ad/widget/zhixin/map_image.html');

goog.provide('ad.widget.zhixin.MapImage');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhixin.MapImage = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhixin_map_image';
};
baidu.inherits(ad.widget.zhixin.MapImage, ad.widget.Widget);


/** @override */
ad.widget.zhixin.MapImage.prototype.patchData = function() {
    if (this._data) {
        //设置一些默认值
        ad.base.extend(this._data, {
            'overall_icon_src': 'http://ecma.bdimg.com/adtest/1553a1cf988c2979bc7315f39502ef0f.gif',
            'overall_text': '全景',
            'tip_text': '来自百度地图'
        });
    }
}



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */