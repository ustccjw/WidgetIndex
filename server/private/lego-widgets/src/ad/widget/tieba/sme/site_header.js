/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/sme/site_header.js ~ 2013/04/03 13:46:13
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 10927 $
 * @description
 * site_header相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/sme/site_header.less');
goog.include('ad/widget/tieba/sme/site_header.html');

goog.provide('ad.widget.tieba.sme.SiteHeader');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.sme.SiteHeader = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_site_header';
};
baidu.inherits(ad.widget.tieba.sme.SiteHeader, ad.widget.Widget);

/** @override */
ad.widget.tieba.sme.SiteHeader.prototype.enterDocument = function() {
    ad.widget.tieba.sme.SiteHeader.superClass.enterDocument.call(this);

    //处理皮肤的逻辑
    var skinTpl = [
        '.wrap1 {background: url("{{bottom_url}}") repeat-x center bottom {{color}};}',
        '.wrap2 {background: url("{{top_url}}") no-repeat center top;}'
    ].join('');

    var data = this._data;

    if (data['skin']) {
        var cssText = Mustache.render(skinTpl, data['skin']);

        var style = document.createElement('style');
        style.type = 'text/css';
        style.media = 'screen';
        style.styleSheet
            ? style.styleSheet.cssText = cssText
            : style.appendChild(document.createTextNode(cssText));
        baidu.dom.insertBefore(style, this.getRoot());
    }
};

/** @override */
ad.widget.tieba.sme.SiteHeader.prototype.bindEvent = function() {
    ad.widget.tieba.sme.SiteHeader.superClass.bindEvent.call(this);

};

/** @override */
ad.widget.tieba.sme.SiteHeader.prototype.patchData = function() {

    function hasPlaceholder(value) {
        return typeof value === 'string' && value.match(/%%[\w\d_]+%%/);
    }

    if (this._data) {
        var nav = this._data['nav_json_mockup']; //预览时用
        if (!nav) {
            nav = this._data['nav_json']; //检索端替换过则为真实数据，否则应给出空数据
            if (hasPlaceholder(nav)) { //检索端还没替换，是预渲染HTML
                nav = '[]'; //预渲染时用的空数据
            }
        }
        nav = baidu.json.parse(nav);
        if (nav.length > 0) {
            this._data['has_nav'] = true;
        }
        for (var i = 0, j = nav.length; i < j; i++) {
            nav[i]['index'] = i + 1;
        }
        this._data['nav'] = nav;
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
