/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/flag/lu.js ~ 2014/07/17 00:56:30
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * lu相关的实现逻辑
 **/

goog.require('ad.dom');
goog.require('ui.events');
goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/flag/lu.less');
goog.include('ad/widget/imageplus/flag/lu.html');

goog.provide('ad.widget.imageplus.flag.Lu');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.flag.Lu = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_flag_lu';
};
baidu.inherits(ad.widget.imageplus.flag.Lu, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.flag.Lu.prototype.enterDocument = function() {
    var me = this;
    ad.widget.imageplus.flag.Lu.superClass.enterDocument.call(this);

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
ad.widget.imageplus.flag.Lu.prototype.patchData = function() {
    ad.widget.imageplus.flag.Lu.superClass.patchData.call(this);
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
