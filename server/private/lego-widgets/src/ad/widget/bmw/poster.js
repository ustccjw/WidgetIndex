/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/bmw/poster.js ~ 2014/05/14 10:58:51
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * poster相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/bmw/poster.less');
goog.include('ad/widget/bmw/poster.html');

goog.provide('ad.widget.bmw.Poster');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 * @export
 */
ad.widget.bmw.Poster = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_bmw_poster';
};
baidu.inherits(ad.widget.bmw.Poster, ad.widget.Widget);


/** @override */
ad.widget.bmw.Poster.prototype.bindEvent = function() {
    ad.widget.bmw.Poster.superClass.bindEvent.call(this);

    var me = this;
    var poster = baidu.g(this.getId('bmw-poster'))
    if(poster){
        baidu.on(poster, "mouseover",function(e){
            me.trigger(ui.events.MOUSE_OVER);
        });
        baidu.on(poster, "mouseout",function(e){
            me.trigger(ui.events.MOUSE_OUT);
        });
    }

};


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
