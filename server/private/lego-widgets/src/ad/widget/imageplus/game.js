/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/game.js ~ 2013/09/02 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * game相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/game.less');
goog.include('ad/widget/imageplus/game.html');

goog.provide('ad.widget.imageplus.Game');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.Game = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_game';
};
baidu.inherits(ad.widget.imageplus.Game, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.Game.prototype.patchData = function () {
    ad.widget.imageplus.Game.superClass.patchData.call(this);
    if (this._data) {
        // 对描述限制为两行，不一定精确故设置了max-height
        var desc = this.getData('desc');
        if (desc) {
            this._data['desc'] = ad.base.subByte(
                desc,
                38,
                '...'
            );
        }

        this._data['seller_name'] = this._data['seller_name'] || '百度爱玩';
    }
};

















/* vim: set ts=4 sw=4 sts=4 tw=100  */
