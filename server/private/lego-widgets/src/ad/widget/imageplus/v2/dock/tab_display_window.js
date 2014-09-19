/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/dock/tab_display_window.js ~ 2014/06/23 13:19:18
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * tab_display_window相关的实现逻辑
 **/

goog.require('ui.events');
goog.require('ad.widget.imageplus.v2.dock.Tab');

goog.include('ad/widget/imageplus/v2/dock/tab_display_window.less');
goog.include('ad/widget/imageplus/v2/dock/tab_display_window.html');

goog.provide('ad.widget.imageplus.v2.dock.TabDisplayWindow');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.dock.Tab}
 */
ad.widget.imageplus.v2.dock.TabDisplayWindow = function(data) {
    ad.widget.imageplus.v2.dock.Tab.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_dock_tab_display_window';
};
baidu.inherits(ad.widget.imageplus.v2.dock.TabDisplayWindow, ad.widget.imageplus.v2.dock.Tab);

/** @override */
ad.widget.imageplus.v2.dock.TabDisplayWindow.prototype.enterDocument = function() {
    ad.widget.imageplus.v2.dock.TabDisplayWindow.superClass.enterDocument.call(this);

    var me = this;
    if (!COMPILED) {
        ad.base.setTimeout(
            function() {
                me.checkLayout();
            },
            0
        );
    }
    else {
        this.checkLayout();
    }

    me.addListener(ui.events.BOX_RESIZE, function () {
        me.checkLayout();
    });

    me.addListener(ui.events.TAB_CHANGE, function() {
        me.checkLayout();
    });
};

/** @override */
ad.widget.imageplus.v2.dock.TabDisplayWindow.prototype.bindEvent = function() {
    ad.widget.imageplus.v2.dock.TabDisplayWindow.superClass.bindEvent.call(this);
};

/** @override */
ad.widget.imageplus.v2.dock.TabDisplayWindow.prototype.patchData = function() {
    ad.widget.imageplus.v2.dock.TabDisplayWindow.superClass.patchData.apply(this, arguments);

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    var byteLength = 0;
    if (loaderApi) {
        var rect = loaderApi.getImgRect();
        var width = rect['width'];
        byteLength = parseInt(2 * (width - 100) / 14, 10);
    }

    var adlist = this._data['adlist'];
    for (var i = 0; i < adlist.length; i++) {
        var item = adlist[i];
        if (byteLength > 0) {
            item['title'] = ad.base.subByte(item['title'], byteLength, '...');
        }
    }
};

/**
 * 检查当前描述是否是一行展示，如果是，将“去看看”按钮放入同一行中
 */
ad.widget.imageplus.v2.dock.TabDisplayWindow.prototype.checkLayout = function() {
    var index = this.currentTab;
    var descWrapper = this.g(this.getId('desc-' + index));
    var descTextWrapper = this.g(this.getId('desc-text-' + index));
    if (descTextWrapper.offsetHeight < 16
        &&descWrapper.offsetWidth - descTextWrapper.offsetWidth > 120
    ) {
        baidu.dom.addClass(descWrapper.parentNode, 'ad-ip-rbody-oneline');
    }
    else {
        baidu.dom.removeClass(descWrapper.parentNode, 'ad-ip-rbody-oneline');
    }
};



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
