/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: iframe.js 9607 2012-06-08 17:10:22Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/iframe.js ~ 2012/06/09 00:30:31
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/iframe.html');
goog.include('ad/widget/iframe.less');
goog.provide('ad.widget.Iframe');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Iframe = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * @type {string}
     * @private
     */
    this._view = 'AD_ad_widget_iframe';
};
baidu.inherits(ad.widget.Iframe, ad.widget.Widget);


/**
 * @override
 */
ad.widget.Iframe.prototype.bindEvent = function() {
    var me = this;
    var img = baidu.g(me.getId('image'));
    if(img){
        baidu.on(img, 'click', function(e){
            if(me.trigger(ui.events.CLICK, e) == false){
                baidu.event.preventDefault(e);
                baidu.event.stop(e);
            }else{
                me.sendLog('产品图片', 'img');
            }
        });
    }
    var iframe = baidu.g(me.getId('iframe'));
    if (iframe) {
        baidu.on(iframe, 'load', function(e) {
            me.trigger(ui.events.LOAD);
        });
    }
};


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
