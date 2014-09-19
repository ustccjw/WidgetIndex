/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: game.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao/game.js ~ 2013/01/23 18:38:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * result相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhidao/game.less');
goog.include('ad/widget/zhidao/game.html');

goog.provide('ad.widget.zhidao.Game');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao.Game = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_game';


};
baidu.inherits(ad.widget.zhidao.Game, ad.widget.Widget);





/* vim: set ts=4 sw=4 sts=4 tw=100: */
