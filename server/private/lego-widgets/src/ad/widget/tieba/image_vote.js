/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/image_vote.js ~ 2012/10/11 09:21:23
 * @author  ()
 * @version $Revision: 10927 $
 * @description
 * image_vote相关的实现逻辑
 **/
goog.require('ad.widget.Widget');
goog.require('ad.lego');

goog.include('ad/widget/tieba/image_vote.less');
goog.include('ad/widget/tieba/image_vote.html');

goog.provide('ad.widget.tieba.ImageVote');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.ImageVote = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_image_vote';
};
baidu.inherits(ad.widget.tieba.ImageVote, ad.widget.Widget);

/**
 * 点击图片缩略图后，预览图片
 * @param {HTMLAnchorElement} btn 被点击的链接
 */
ad.widget.tieba.ImageVote.prototype._previewImage = function (btn){
    var me = this;
    me.hide();

    try {
        window['TiebaFrs']['PreviewImage'](
            ad.lego.getMaterialIdByWidget(this),
            btn.getAttribute('src'),
            function () {
                me.show();
            }
        );
    } catch (e) {}
};

/** @override */
ad.widget.tieba.ImageVote.prototype.bindEvent = function () {
    var me = this;
    ad.widget.tieba.ImageVote.superClass.bindEvent.call(me);

    // bind event for links
    var root = baidu.g(me.getId());
    if(root){
        var expandBtns = root.getElementsByTagName('img');
        baidu.each(expandBtns, function (btn, index){
            baidu.on(btn, 'click', function (event){
                me._previewImage(btn);
                baidu.event.preventDefault(event);
            });
        });
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
