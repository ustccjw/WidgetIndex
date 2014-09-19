/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/image/Shiyan2.js ~ 2013/03/07 15:23:39
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * Shiyan2相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/image/shiyan2.less');
goog.include('ad/widget/image/shiyan2.html');

goog.provide('ad.widget.image.Shiyan2');

baidu.event._eventFilter.mouseenter;
baidu.event._eventFilter.mouseleave;

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.image.Shiyan2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_image_shiyan2';

    this._lastText;

    this._lastBlock;
};
baidu.inherits(ad.widget.image.Shiyan2, ad.widget.Widget);

/** @override */
ad.widget.image.Shiyan2.prototype.enterDocument = function() {
    ad.widget.image.Shiyan2.superClass.enterDocument.call(this);

    var firstText = baidu.dom.q('ec-text', baidu.g(this.getId('shiyan2-ul')), 'div')[0];
    baidu.dom.setStyle(firstText, 'display', 'none');
    baidu.dom.setStyle(baidu.dom.next(firstText), 'display', 'block');
    this._lastText = firstText;
    this._lastBlock = baidu.dom.next(firstText);
};

/** @override */
ad.widget.image.Shiyan2.prototype.bindEvent = function() {
    ad.widget.image.Shiyan2.superClass.bindEvent.call(this);

    var me = this;
    baidu.array.each(baidu.dom.q('ec-text', baidu.g(me.getId('shiyan2-ul')), 'div'), function(item, i) {
        baidu.on(item, 'mouseenter', function() {
            if (me._lastText) {
                baidu.dom.setStyle(me._lastText, 'display', 'block');
            }
            if (me._lastBlock) {
                baidu.dom.setStyle(me._lastBlock, 'display', 'none');
            }
            baidu.dom.setStyle(item, 'display', 'none');
            //baidu.fx.collapse(item);
            baidu.dom.setStyle(baidu.dom.next(item), 'display', 'block');
            me._lastText = item;
            me._lastBlock = baidu.dom.next(item);
        });

    });
};

/** @override */
ad.widget.image.Shiyan2.prototype.patchData = function() {
    if (this._data) {
        this._data['logo_width'] = 65;
        this._data['logo_height'] = 20;
        this._data['width'] = 191;
        this._data['height'] = 166;
        //过滤showurl的http://
        if (this._data['show_url']) {
            this._data['show_url'] = this._data['show_url'].replace('http://', '');
        }
    }
}



/* vim: set ts=4 sw=4 sts=4 tw=100: */