/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/text_vote.js ~ 2012/10/11 09:20:42
 * @author  ()
 * @version $Revision: 10927 $
 * @description
 * text_vote相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/text_vote.less');
goog.include('ad/widget/tieba/text_vote.html');

goog.provide('ad.widget.tieba.TextVote');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.TextVote = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_text_vote';
};
baidu.inherits(ad.widget.tieba.TextVote, ad.widget.Widget);

/** @override */
ad.widget.tieba.TextVote.prototype.enterDocument = function() {
    ad.widget.tieba.TextVote.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.tieba.TextVote.prototype.bindEvent = function() {
    ad.widget.tieba.TextVote.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.tieba.TextVote.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
