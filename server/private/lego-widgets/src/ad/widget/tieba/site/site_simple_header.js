/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/site/site_simple_header.js ~ 2013/04/19 15:38:32
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 150523 $
 * @description
 * site_simple_header相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/site/site_simple_header.less');
goog.include('ad/widget/tieba/site/site_simple_header.html');

goog.provide('ad.widget.tieba.site.SiteSimpleHeader');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.site.SiteSimpleHeader = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_site_site_simple_header';
};
baidu.inherits(ad.widget.tieba.site.SiteSimpleHeader, ad.widget.Widget);

/** @override */
ad.widget.tieba.site.SiteSimpleHeader.prototype.enterDocument = function () {
    ad.widget.tieba.site.SiteSimpleHeader.superClass.enterDocument.call(this);

    //处理皮肤的逻辑
    var skinTpl = [
        '.wrap1 {background: url("{{bottom_url}}") {{#bottom_repeat}}repeat-x{{/bottom_repeat}}{{^bottom_repeat}}no-repeat{{/bottom_repeat}} center bottom {{color}};}',
        '.wrap2 {background: url("{{top_url}}") no-repeat center top;}'
    ].join('');

    var data = this._data;

    if (data['skin']) {
        var cssText = Mustache.render(skinTpl, data['skin']);

        ad.dom.createStyles(cssText, null, this.getRoot());
    }
};

/** @override */
ad.widget.tieba.site.SiteSimpleHeader.prototype.patchData = function () {
    if (this._data) {
        var gallery = this._data['gallery'];
        if (gallery) {
            if (gallery.length > 0) {
                this._data['has_gallery'] = true;
            }        
            for (var i = 0, j = gallery.length; i < j; i++) {
                gallery[i]['index'] = i + 1;
            }
        }

        var skin = this._data['skin'];
        var bottomRepeat = !!skin['bottom_repeat']['true'];
        skin['bottom_url'] = skin['bottom_repeat'][bottomRepeat]['bottom_url'];
        skin['bottom_repeat'] = bottomRepeat;
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
