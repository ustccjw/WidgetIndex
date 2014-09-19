/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker/pa_shrink.js ~ 2014/06/03 15:49:00
 * @author zhouminming01@baidu.com
 * @version $Revision: 10927 $
 * @description
 * pa_shrink相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/sticker/pa_shrink.less');
goog.include('ad/widget/imageplus/sticker/pa_shrink.html');

goog.provide('ad.widget.imageplus.sticker.PaShrink');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.sticker.PaShrink = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_pa_shrink';
};
baidu.inherits(ad.widget.imageplus.sticker.PaShrink, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.sticker.PaShrink.prototype.patchData = function() {
    ad.widget.imageplus.sticker.PaShrink.superClass.patchData.call(this);
    if (this._data) {
        //截断百科的描述
        var desc = this.getData('desc');
        if (desc) {
            this._data['desc'] = ad.base.subByte(
                desc,
                70,
                '...'
            );
        }
    }
};

/** @override */
ad.widget.imageplus.sticker.PaShrink.prototype.enterDocument = function () {
    var me = this;
    ad.widget.imageplus.sticker.PaShrink.superClass.enterDocument.call(me);

    var root = me.getRoot();
    if (!root) {
        return root;
    }

    if (COMPILED) {
        var loaderApi = me.getData('api');
        var hoverClass = 'ad-widget-imageplust-sticker-pa-shrink-hover';
        var timer = null;
        var show = function () {
            if (timer) {
                ad.base.clearTimeout(timer);
            }
            baidu.addClass(root, hoverClass);
        };
        var hide = function () {
            baidu.removeClass(root, hoverClass);
        };
        loaderApi.addListener(ui.events.MOUSE_OVER, show);
        loaderApi.addListener(ui.events.MOUSE_MOVE, show);
        loaderApi.addListener(ui.events.MOUSE_OUT, hide);

        // 初始展现，然后过段时间隐藏
        // 第一次展现时的展现时间
        var firstShowTime = me.getData('box.first_show_time', 5000);
        show();
        timer = ad.base.setTimeout(
            function() {
                hide();
                timer = null;
            },
            firstShowTime
        );
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
