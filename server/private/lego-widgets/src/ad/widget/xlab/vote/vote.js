/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: vote.js 13639 2012-10-31 09:33:49Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/xlab/vote.js ~ 2012/09/24 18:49:19
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 13639 $
 * @description
 * vote相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/xlab/vote/vote.less');
goog.include('ad/widget/xlab/vote/vote.html');

goog.provide('ad.widget.xlab.Vote');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.xlab.Vote = function(data) {
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_xlab_vote';

    /**
     * @type {Array.<string>}
     * @private
     */
    this._colors = ['#E7AB6D', '#5DBC5B', '#6C81B6', '#A5CBD6', '#D843B3', '#C2F363', '#EE325F', '#FFC534', '#D8E928', '#E58652'];

    ad.widget.Widget.call(this, data);
};
baidu.inherits(ad.widget.xlab.Vote, ad.widget.Widget);

/** @override */
ad.widget.xlab.Vote.prototype.enterDocument = function() {
    ad.widget.xlab.Vote.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.xlab.Vote.prototype.bindEvent = function() {
    ad.widget.xlab.Vote.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.xlab.Vote.prototype.patchData = function() {
    if (this._data) {
        this._view = this._data['item_type'] == '1' ? 'AD_ad_widget_xlab_vote_image' : 'AD_ad_widget_xlab_vote_text';
        var input_type = this._data['max_select_num'] > 1 ? 'checkbox' : 'radio';
        var colors = this._colors;
        baidu.array.each(this._data['vote_items'], function(item, index) {
            item['_item_percent'] = parseInt(Math.random() * 100, 10);
            item['_input_type'] = input_type;
            item['_bar_color'] = colors[index];
        });
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
