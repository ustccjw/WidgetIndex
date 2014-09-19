/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/image_link.js ~ 2013/06/28 12:45:07
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * image_link相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/image_link.less');
goog.include('ad/widget/image_link.html');

goog.provide('ad.widget.ImageLink');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ImageLink = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_image_link';
};
baidu.inherits(ad.widget.ImageLink, ad.widget.Widget);


/** @override */
ad.widget.ImageLink.prototype.bindEvent = function() {
    ad.widget.ImageLink.superClass.bindEvent.call(this);
    var me = this;
    baidu.on(me.getId('image'), 'click', function(e){
        if(me.trigger(ui.events.CLICK) === false){
            baidu.event.preventDefault(e);
            baidu.event.stopPropagation(e);
        }
    });

    if(baidu.g(me.getId("image-layer"))){
        baidu.on(baidu.g(me.getId("image-layer")), "click", function(){
            me.trigger(ui.events.CLICK);
        });
    }

};

/**
 * @override
 */
ad.widget.ImageLink.prototype.patchData = function() {
    var me = this;
    if (me._data && me._data['tip']) {
        var tip = me._data['tip'];
        if (!tip['text']) {
            delete me._data['tip'];
        }
        if (tip['text'] && !tip['rcv_url']) {
            delete tip['rcv_url'];
        }
    }
};























/* vim: set ts=4 sw=4 sts=4 tw=100: */
