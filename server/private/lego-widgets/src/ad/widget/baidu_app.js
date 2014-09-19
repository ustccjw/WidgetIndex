/*************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/


/**
 * src/ad/widget/baidu_app.js ~ 2013/07/16 17:46:03
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * baidu_app相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/baidu_app.less');
goog.include('ad/widget/baidu_app.html');

goog.provide('ad.widget.BaiduApp');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.BaiduApp = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_baidu_app';
};
baidu.inherits(ad.widget.BaiduApp, ad.widget.Widget);


/** @override */
ad.widget.BaiduApp.prototype.enterDocument = function() {
    ad.widget.BaiduApp.superClass.enterDocument.call(this);
    var me = this;

    baidu.sio.callByBrowser(RT_CONFIG.HOST("ecma.bdimg.com") + "/adtest/79cf1effcd9b6f7fed43c83f32458851.js", function() {
        var bapp = new BAPP({
            'width': me._data['width'],
            'apikey': me._data['apikey'],
            'container': baidu.g(me.getId('sandbox'))
        });
        baidu.dom.setStyle(me.getRoot(), "width", me._data['width']);
        baidu.dom.setStyle(me.getRoot(), "overflow", "hidden");
        bapp.render(me._data['appid']);
    });
};

/** @override */
ad.widget.BaiduApp.prototype.bindEvent = function() {
    ad.widget.BaiduApp.superClass.bindEvent.call(this);
};

/** @override */
ad.widget.BaiduApp.prototype.patchData = function() {
    if (this._data) {
        this._data['appid'] = this._data['appid'] || '';
        this._data['width'] = this._data['width'] || 540;
        this._data['apikey'] = this._data['apikey'] || '';
    }
};


/* vim: set ts=4 sw=4 sts=4 tw=100: */
