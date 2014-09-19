/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/bmw/image_list.js ~ 2014/05/15 10:43:53
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * image_list相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/bmw/image_list.less');
goog.include('ad/widget/bmw/image_list.html');

goog.provide('ad.widget.bmw.ImageList');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 * @export
 */
ad.widget.bmw.ImageList = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_bmw_image_list';
};
baidu.inherits(ad.widget.bmw.ImageList, ad.widget.Widget);

/** @override */
ad.widget.bmw.ImageList.prototype.enterDocument = function() {
    ad.widget.bmw.ImageList.superClass.enterDocument.call(this);

    var canvas = baidu.g(this.getId('bmw-image-list'));
    this.images = baidu.q('ec-image', canvas, 'div');
};

/** @override */
ad.widget.bmw.ImageList.prototype.bindEvent = function() {
    ad.widget.bmw.ImageList.superClass.bindEvent.call(this);

    var me = this;
    var images = this.images;
    if(images && images.length){
        baidu.array.each(images,function(item, i){
            baidu.on(item,"mouseover",function(e){
                // fix ie6 hover bug
                baidu.dom.addClass(/** @type {Node} */(item), 'ec-hover');
                me.trigger(ui.events.MOUSE_OVER, i);
            });
            baidu.on(item,"mouseout",function(e){
                // fix ie6 hover bug
                baidu.dom.removeClass(/** @type {Node} */(item), 'ec-hover');
                me.trigger(ui.events.MOUSE_OUT, i);
            });
            baidu.on(item,"click",function(e){
                if(me.trigger(ui.events.CLICK, i, e) === false){
                    baidu.event.stop(e);
                }
            });
        })
    }

};

/** @override */
ad.widget.bmw.ImageList.prototype.patchData = function() {
    var images = this._data['options'];
    var totalWidth = this._data['width'] || 536;
    var imageWidth;
    for (var i = images.length - 1; i >= 0; i--) {
        imageWidth = Math.floor(totalWidth / (i + 1));
        images[i]['width'] = imageWidth;
        totalWidth -= imageWidth;
    };
}


ad.widget.bmw.ImageList.prototype.activate = function(index) {
    baidu.dom.addClass(this.images[index], 'ec-active');
};

ad.widget.bmw.ImageList.prototype.deactivate = function(index) {
    if (index) {
        baidu.dom.removeClass(this.images[index], 'ec-active');
    } else {
        baidu.each(this.images, function (elem) {
            baidu.dom.removeClass(elem, 'ec-active');
        });
    }
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
