/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/smart/title.js ~ 2014/02/19 15:29:34
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * 自定义title相关的实现逻辑
 **/

goog.require('ad.widget.Title');

goog.provide('ad.widget.smart.Title');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Title}
 */
ad.widget.smart.Title = function(data) {
    ad.widget.Title.call(this, data);
};
baidu.inherits(ad.widget.smart.Title, ad.widget.Title);

/** @override */
ad.widget.smart.Title.prototype.patchData = function() {
    if (this._data && this._data['name'] && this._data['desc']) {
        this._data['title'] = this._data['name'] + '|' + (window["bdQuery"] || '') + '|' + this._data['desc'];
    }
    ad.widget.smart.Title.superClass.patchData.call(this);
}






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
