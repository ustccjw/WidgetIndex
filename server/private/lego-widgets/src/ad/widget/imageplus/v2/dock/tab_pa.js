/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/dock/tab_pa.js ~ 2014/07/02 02:39:45
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * tab_pa相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.v2.dock.Tab');

goog.include('ad/widget/imageplus/v2/dock/tab_pa.less');
goog.include('ad/widget/imageplus/v2/dock/tab_pa.html');

goog.provide('ad.widget.imageplus.v2.dock.TabPa');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.dock.Tab}
 */
ad.widget.imageplus.v2.dock.TabPa = function(data) {
    ad.widget.imageplus.v2.dock.Tab.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_dock_tab_pa';

    /**
     * 展开高度
     * @type {number}
     */
    this.expandHeight = 120;
};
baidu.inherits(ad.widget.imageplus.v2.dock.TabPa, ad.widget.imageplus.v2.dock.Tab);

/** @override */
ad.widget.imageplus.v2.dock.TabPa.prototype.enterDocument = function() {
    ad.widget.imageplus.v2.dock.TabPa.superClass.enterDocument.call(this);
};

/** @override */
ad.widget.imageplus.v2.dock.TabPa.prototype.bindEvent = function() {
    ad.widget.imageplus.v2.dock.TabPa.superClass.bindEvent.call(this);
};

/** @override */
ad.widget.imageplus.v2.dock.TabPa.prototype.patchData = function() {
    ad.widget.imageplus.v2.dock.TabPa.superClass.patchData.apply(this, arguments);

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    var byteLength = 0;
    if (loaderApi) {
        var rect = loaderApi.getImgRect();
        var width = rect['width'];
        byteLength = parseInt(2 * (width - 200) / 12, 10);
    }

    var adlist = this._data['adlist'];
    for (var i = 0; i < adlist.length; i++) {
        var item = adlist[i];
        if (byteLength > 0) {
            item['title'] = ad.base.subByte(item['title'], byteLength, '...');
        }
        if (item['desc']) {
            item['desc'] = ad.base.subByte(
                item['desc'],
                70,
                '...'
            );
        }
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
