/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/sticker_box.js ~ 2014/08/04 14:04:13
 * @author zhouminming01@baidu.com
 * @version $Revision: 10927 $
 * @description
 * sticker_box相关的实现逻辑
 **/

goog.require('ui.events');
goog.require('ad.widget.imageplus.v2.BaseBox');

goog.include('ad/widget/imageplus/v2/sticker_box.less');
goog.include('ad/widget/imageplus/v2/sticker_box.html');

goog.provide('ad.widget.imageplus.v2.StickerBox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseBox}
 */
ad.widget.imageplus.v2.StickerBox = function (data) {
    /**
     * 是否自适应内容的高度
     * @type {boolean}
     */
    this._autoHeight = true;
    /**
     * 最小高度
     * @type {number}
     */
    this._hoverHeight = 0;
    /**
     * 最大高度
     * @type {number}
     */
    this._normalHeight = 0;

    /**
     * 第一次展现时保持最大高度的时间
     * @type {number}
     */
    this._firstShowTime = 0;

    /**
     * 背景的透明度
     * @type {number}
     */
    this._boxBgOpacity = 0;

    /**
     * 是否有关闭按钮
     * @type {boolean}
     */
    this._hasCloseBtn = true;

    /**
     * 鼠标是否在图片上
     * @type {boolean}
     * @private
     */
    this._mouseOnImg = false;

    ad.widget.imageplus.v2.BaseBox.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_sticker_box';
};
baidu.inherits(ad.widget.imageplus.v2.StickerBox, ad.widget.imageplus.v2.BaseBox);

/** @override */
ad.widget.imageplus.v2.StickerBox.prototype.patchData = function () {
    ad.widget.imageplus.v2.StickerBox.superClass.patchData.apply(this, arguments);
    this._data['box'] = this._data['box'] || {};

    this._autoHeight = this.getData('box.auto_height', true);
    this._hoverHeight = this.getData('box.hover_height', 0);
    this._normalHeight = this.getData('box.normal_height', 0);
    this._firstShowTime = this.getData('box.first_show_time', 5000);
    this._boxBgOpacity = parseFloat(this.getData('box.box_bg_opacity', 0));
    this._hasCloseBtn = this.getData('box.has_close_btn', true);
    this._data['box']['has_close_btn'] = this._hasCloseBtn;
};

/** @override */
ad.widget.imageplus.v2.StickerBox.prototype.enterAd = function (loaderApi) {
    var me = this;
    if (me._hasCloseBtn) {
        var closeBtn = ad.dom.g(me.getId('close'));
        ad.event.on(closeBtn, 'click', function (e) {
            ad.event.preventDefault(e);
            me.closeAd();
        });
    }

    if (!me._autoHeight) {
        // 如果不是autoHeight（自适应），则一开始就知道hover之后的内容区高度(hoverHeight)
        // 故可以直接设定高度然后展现，不需要等隔离容器的内容load完成
        me._firstShow(loaderApi);
    }
};

/** @override */
ad.widget.imageplus.v2.StickerBox.prototype.enterAdOnLoad = function (loaderApi, isolatedRoot) {
    var background = ad.dom.g(this.getId('bg'));
    if (background) {
        ad.dom.opacity(background, this._boxBgOpacity);
    }

    if (this._autoHeight) {
        // 如果是autoHeight（自适应），则一开始不知道hover之后的内容区高度
        // 需要在隔离区内容load之后才能知道hoverHeight的值，故需要等隔离容器的内容load完成后执行
        this._firstShow(loaderApi);
    }
};

/**
 * 第一次展现的逻辑
 * @param {ad.plugin.imageplus.ILoaderApi} loaderApi
 */
ad.widget.imageplus.v2.StickerBox.prototype._firstShow = function (loaderApi) {
    var me = this;
    var show = me.async(function () {
        me._mouseOnImg = true;
        me.showContent();
    }, me);
    var hide = me.async(function () {
        me._mouseOnImg = false;
        me.hideContent();
    }, me);
    me.relayout(loaderApi.getImgRect());
    if (me._firstShowTime) {
        // 第一次展现必须在material.show之后，否则日志不能正常发送
        ad.base.setTimeout(function () {
            me.showContent();
            ad.base.setTimeout(me.async(function () {
                if (!me._mouseOnImg) {
                    me.hideContent();
                }
            }, me), me._firstShowTime);
        }, 0);
    }

    loaderApi.addListener(ui.events.MOUSE_MOVE, show);
    loaderApi.addListener(ui.events.MOUSE_OVER, show);
    loaderApi.addListener(ui.events.MOUSE_OUT, hide);
    loaderApi.rendDone(me.getData('box.imageplus_button', true));
};

ad.widget.imageplus.v2.StickerBox.prototype.onAdResize = function (event, imgRect) {
    this.updateIsolatedContainerSize();
    ad.widget.imageplus.v2.StickerBox.superClass.onAdResize.apply(this, arguments);
};

/** @override */
ad.widget.imageplus.v2.StickerBox.prototype.relayout = function (imgRect) {
    if (this._autoHeight) {
        this._hoverHeight = this.getIsolatedContainerHeight();
    }

    var root = this.getRoot();
    root.style.top = imgRect['height'] + 'px';
};

/**
 * 更新广告位置
 * @param {number} height
 */
ad.widget.imageplus.v2.StickerBox.prototype._updatePos = function (height) {
    var wrapper = ad.dom.g(this.getId('wrapper'));
    wrapper.style.cssText = ''
        + 'height:' + height + 'px;'
        + 'top:-' + height + 'px;';
};

/** @override */
ad.widget.imageplus.v2.StickerBox.prototype.hideContentFx = function (root, done, opt_triggerByWidget) {
    if (this._hasCloseBtn) {
        var closeBtn = ad.dom.g(this.getId('close'));
        closeBtn.style.display = 'none';
    }
    baidu.dom.removeClass(root, 'baiduimageplus-s-visible');
    this._updatePos(this._normalHeight);
    done(true);
};

/** @override */
ad.widget.imageplus.v2.StickerBox.prototype.showContentFx = function (root, done, opt_triggerByWidget) {
    if (this._hasCloseBtn) {
        var closeBtn = ad.dom.g(this.getId('close'));
        closeBtn.style.display = 'block';
    }
    ad.dom.addClass(root, 'baiduimageplus-s-visible');
    this._updatePos(this._hoverHeight);
    done(true);
};

/** @override */
ad.widget.imageplus.v2.StickerBox.prototype.getAdRect = function () {
    var wrapper = ad.dom.g(this.getId('wrapper'));
    var closeBtn = ad.dom.g(this.getId('close'));
    var wrapperRect = ad.dom.getRect(wrapper);
    var closeRect = ad.dom.getRect(closeBtn);

    if (wrapperRect['top'] <= closeRect['top']) {
        // 关闭按钮在内部
        return wrapperRect;
    }
    else {
        // 关闭按钮在外部
        return {
            'top': closeRect['top'],
            'left': wrapperRect['left'],
            'width': wrapperRect['width'],
            'height': wrapperRect['height'] + closeRect['height']
        };
    }

};























/* vim: set ts=4 sw=4 sts=4 tw=100: */
