/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/sticker/multimedia.js ~ 2014/09/04 16:21:05
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * multimedia相关的实现逻辑
 **/

goog.require('ui.events');
goog.require('ad.base');
goog.require('ad.dom');
goog.require('ad.widget.imageplus.v2.BaseWidget');

goog.include('ad/widget/imageplus/v2/sticker/multimedia.less');
goog.include('ad/widget/imageplus/v2/sticker/multimedia.html');

goog.provide('ad.widget.imageplus.v2.sticker.Multimedia');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.sticker.Multimedia = function(data) {
    ad.widget.imageplus.v2.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_sticker_multimedia';
};
baidu.inherits(ad.widget.imageplus.v2.sticker.Multimedia, ad.widget.imageplus.v2.BaseWidget);

/** @override */
ad.widget.imageplus.v2.sticker.Multimedia.prototype.enterDocument = function() {
    ad.widget.imageplus.v2.sticker.Multimedia.superClass.enterDocument.call(this);
    var me = this;
    var img = this.g(this.getId('baiduimageplus-s-multimedia-img-ctn'));
    var vbar = this.g(this.getId('baiduimageplus-s-multimedia-vbar'));
    var hbar = this.g(this.getId('baiduimageplus-s-multimedia-hbar'));
    function expandImg() {
        ad.dom.addClass(img, 'baiduimageplus-s-multimedia-img-ctn-expanded');
        var resizeInfo = {};
        if (me._data['show_hbar']) {
            ad.dom.hide(hbar);
            resizeInfo['height'] = me._data['height'] + 16 + 'px';
            img.style.height = me._data['height'] + 'px';
        }
        if (me._data['show_vbar']) {
            ad.dom.hide(vbar);
            resizeInfo['width'] = me._data['width'] + 40 + 'px';
        }
        me.trigger(ui.events.BOX_RESIZE, resizeInfo);
    }

    function collaseImg() {
        baidu.dom.removeClass(img, 'baiduimageplus-s-multimedia-img-ctn-expanded');
        var resizeInfo = {};
        if (me._data['show_hbar']) {
            hbar.style.display = 'block';
            img.style.height = '60px';
            resizeInfo['height'] = '76px';
        }
        if (me._data['show_vbar']) {
            vbar.style.display = 'block';
            resizeInfo['width'] = '100%';
        }
        me.trigger(ui.events.BOX_RESIZE, resizeInfo);
    }
    if (this._data['show_vbar'] || this._data['show_hbar']) {
        baidu.on(img, ui.events.MOUSE_OVER, expandImg);
        baidu.on(img, ui.events.MOUSE_OUT, collaseImg);
    }
};

/** @override */
ad.widget.imageplus.v2.sticker.Multimedia.prototype.patchData = function() {
    ad.widget.imageplus.v2.sticker.Multimedia.superClass.patchData.apply(this);
    if (this._data) {
        this._data['title'] = (this._data['title'] || '图片') + '相关推广';
        this._data['is_flash'] = /\.swf$/.test(this._data['idea_url']);

        /**
         * @type {ad.plugin.imageplus.ILoaderApi}
         */
        var loaderApi = this.getData('api');
        var imgWidth = 600;
        if (loaderApi) {
            var rect = loaderApi.getImgRect();
            imgWidth = rect['width'];
        }
        var scaledHeight = 60;
        if (this._data['idea_height'] > 60) {
            scaledHeight = this._data['idea_height'];
            this._data['show_hbar'] = true;
        }
        this._data['height'] = scaledHeight;
        var scaledWidth = this._data['idea_width'] * scaledHeight / this._data['idea_height'];
        this._data['width'] = scaledWidth;
        this._data['view_width'] = Math.min(imgWidth - 40, scaledWidth);

        if (scaledWidth <= imgWidth - 140) {
            this._data['show_arrow'] = true;
            this._data['arrow_width'] = imgWidth - 40 - scaledWidth;
        }
        else if (scaledWidth > imgWidth - 40) {
            this._data['show_vbar'] = true;
        }
        else {
            this._data['no_vbar_arrow'] = true;
        }
    }
};





















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
