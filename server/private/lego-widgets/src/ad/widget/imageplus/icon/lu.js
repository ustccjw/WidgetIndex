/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/icon/lu.js ~ 2014/07/21 15:59:49
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * lu相关的实现逻辑
 **/

goog.require('ad.dom');
goog.require('ui.events');
goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/icon/lu.less');
goog.include('ad/widget/imageplus/icon/lu.html');

goog.provide('ad.widget.imageplus.icon.Lu');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.icon.Lu = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_icon_lu';
};
baidu.inherits(ad.widget.imageplus.icon.Lu, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.icon.Lu.prototype.enterDocument = function() {
    var me = this;
    ad.widget.imageplus.icon.Lu.superClass.enterDocument.call(this);

    var iframe = baidu.g(me.getId('iframe'));
    if (!iframe) {
        return;
    }

    var htmlCode = me.getData('desc') || '';
    ad.dom.writeIntoIframe(iframe, htmlCode, function (win, doc) {
        if (COMPILED) {
            me.trigger(ui.events.LOAD, doc);
        }
    });
};

/** @override */
ad.widget.imageplus.icon.Lu.prototype.patchData = function() {
    ad.widget.imageplus.icon.Lu.superClass.patchData.call(this);
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
