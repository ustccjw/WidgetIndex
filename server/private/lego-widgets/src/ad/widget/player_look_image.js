/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/player_look_image.js ~ 2013/07/05 13:44:25
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * player_look_image相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/player_look_image.less');
goog.include('ad/widget/player_look_image.html');

goog.provide('ad.widget.PlayerLookImage');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.PlayerLookImage = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_player_look_image';
};
baidu.inherits(ad.widget.PlayerLookImage, ad.widget.Widget);

/** @override */
ad.widget.PlayerLookImage.prototype.enterDocument = function() {
    ad.widget.PlayerLookImage.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.PlayerLookImage.prototype.bindEvent = function() {
    var me = this;
    ad.widget.PlayerLookImage.superClass.bindEvent.call(me);

    var mask = baidu.q('ad-widget-pli-cover', me.getRoot());
    baidu.on(mask[0], 'click', function(e) {
        e = e || window.event;
        me.trigger(ui.events.CLICK);
        if (!me._data['rcv_url']) {
            baidu.event.stop(e);
        }
    });
};

/** @override */
ad.widget.PlayerLookImage.prototype.patchData = function() {
    if (this._data) {
        this._data['img_width'] = this._data['width'];
        this._data['img_height'] = this._data['height'] - 25;

        if (typeof this._data['tip'] != 'undefined') {
            if (!this._data['tip']) {
                delete this._data['tip'];
            }
        }
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
