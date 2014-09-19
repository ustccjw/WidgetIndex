/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/gallery.js ~ 2012/10/10 09:01:19
 * @author  ()
 * @version $Revision: 10927 $
 * @description
 * gallery相关的实现逻辑
 **/
goog.require('ad.widget.Widget');
goog.require('ad.lego');

goog.include('ad/widget/tieba/gallery.less');
goog.include('ad/widget/tieba/gallery.html');

goog.provide('ad.widget.tieba.Gallery');


/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.Gallery = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 覆盖在flash首帧图片上的player button的高度
     * @type {number}
     */
     this._playerBtnHeight = 75;

    /**
     * 覆盖在flash首帧图片上的player button的宽度
     * @type {number}
     */
     this._playerBtnWidth= 100;

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_gallery';
};
baidu.inherits(ad.widget.tieba.Gallery, ad.widget.Widget);

/** @override */
ad.widget.tieba.Gallery.prototype.enterDocument = function () {
    var me = this;
    ad.widget.tieba.Gallery.superClass.enterDocument.call(me);

    // load images and caculate the image size and resize it.
    var root = baidu.g(me.getId());
    if (root) {
        var images = root.getElementsByTagName('img');
        baidu.each(images, function (image, index) {
            var src = image.getAttribute('data-src');
            var img = new Image();
            var height;
            var width;
            var targetHeight;
            var targetWidth;

            if (!src) {
                return;
            }
            img.onload = function () {
                height = img.height;
                width = img.width;
                if (height > 75) {
                    targetHeight = 75;
                    width = width * (75 / height);
                }
                else {
                    targetHeight = height;
                }

                if (width > 100) {
                    targetHeight = targetHeight * (100 / width);
                    width = 100;
                }
                targetWidth = width;

                image.height = targetHeight;
                image.width = targetWidth;
                image.src = src;

                var parentNode = image.parentNode;
                var expandCover = parentNode.getElementsByTagName('b')[0];
                if (baidu.dom.hasClass(parentNode, 'ec-gallery-video')) {
                    var cover = parentNode.getElementsByTagName('div')[0];
                    baidu.dom.setStyles(cover, {
                        'top' : (targetHeight - me._playerBtnHeight) / 2 + 'px',
                        'left' : (targetWidth - me._playerBtnWidth) / 2 + 'px'
                    });
                }
                else {
                    baidu.dom.setStyles(expandCover, {
                        'width' : targetWidth + 'px',
                        'height' : targetHeight + 'px'
                    });
                }
            };
            img.src = src;
        });
    }
};


/**
 * 隐藏物料canvas
 *
 */
ad.widget.tieba.Gallery.prototype._hideMaterial = function () {
    var muid = ad.lego.getMaterialIdByWidget(this);
    var canvas = baidu.g(muid);

    if (canvas) {
        baidu.dom.hide(canvas);
    }
};

/**
 * 显示物料的canvas
 *
 */
ad.widget.tieba.Gallery.prototype._showMaterial = function () {
    var muid = ad.lego.getMaterialIdByWidget(this);
    var canvas = baidu.g(muid);

    if (canvas) {
        baidu.dom.show(canvas);
    }
};

/**
 * 点击图片缩略图后，预览图片
 * @param {HTMLAnchorElement} btn 被点击的链接
 */
ad.widget.tieba.Gallery.prototype._previewImage = function (btn) {
    var me = this;
    me._hideMaterial();

    try {
        window['TiebaFrs']['PreviewImage'] (
            ad.lego.getMaterialIdByWidget(this),
            btn.getAttribute('data-image'),
            function () {
                me._showMaterial();
            }
        );
    } catch (e) {}
};

/**
 * 点击flash缩略图后，预览flash
 * @param {HTMLAnchorElement} btn 被点击的链接
 */
ad.widget.tieba.Gallery.prototype._previewVideo = function (btn) {
    var me = this;
    me._hideMaterial();

    try{
        window['TiebaFrs']['PreviewVideo'] (
            ad.lego.getMaterialIdByWidget(this),
            btn.getAttribute('data-video'),
            function () {
                me._showMaterial();
            }
        );
    } catch (e) {}
};

/** @override */
ad.widget.tieba.Gallery.prototype.bindEvent = function () {
    var me = this;
    ad.widget.tieba.Gallery.superClass.bindEvent.call(me);

    // bind event for links
    var root = baidu.g(me.getId());
    if (root) {
        var expandBtns = root.getElementsByTagName('b');
        baidu.each(expandBtns, function (btn, index) {
            var wrapper = btn.parentNode;
            var galleryImgClass = 'ec-gallery-image';
            var galleryVideoCoverClass = 'ec-gallery-video-cover-wrapper';

            if (baidu.dom.hasClass(wrapper, galleryImgClass)) {
                baidu.on(btn, 'click', function (event) {
                    me._previewImage(btn);
                    baidu.event.preventDefault(event);
                });
            }
            else if (baidu.dom.hasClass(wrapper, galleryVideoCoverClass)) {
                // Handle the mouseover and mouseout event
                var span = wrapper.getElementsByTagName('span')[0];
                var galleryVideoHoverClass = 'ec-gallery-video-hover';

                baidu.on(btn, 'mouseenter', function () {
                    baidu.dom.addClass(span, galleryVideoHoverClass);
                });
                baidu.on(btn, 'mouseleave', function () {
                    baidu.dom.removeClass(span, galleryVideoHoverClass);
                });
                baidu.on(btn, 'click', function (event) {
                    me._previewVideo(btn);
                    baidu.event.preventDefault(event);
                });
            }
        });
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
