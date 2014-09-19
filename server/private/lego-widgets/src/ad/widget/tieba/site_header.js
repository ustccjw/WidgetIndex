/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/site_header.js ~ 2013/04/03 13:46:13
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 10927 $
 * @description
 * site_header相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/site_header.less');
goog.include('ad/widget/tieba/site_header.html');

goog.provide('ad.widget.tieba.SiteHeader');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.SiteHeader = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_site_header';
};
baidu.inherits(ad.widget.tieba.SiteHeader, ad.widget.Widget);

/** @override */
ad.widget.tieba.SiteHeader.prototype.enterDocument = function () {
    ad.widget.tieba.SiteHeader.superClass.enterDocument.call(this);

    //处理皮肤的逻辑
    var skinTpl = [
        '.wrap1, .skin_normal .wrap1 {background: url({{bottom_url}}) {{#bottom_repeat}}repeat-x{{/bottom_repeat}}{{^bottom_repeat}}no-repeat{{/bottom_repeat}} center bottom {{color}};}',
        '.wrap2, .skin_normal .wrap2 {background: url({{top_url}}) no-repeat center top;}'
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

    window.bds_config = {'snsKey':{}};
    if (data['baidu_share']) {
        baidu.sio.callByBrowser(
            'http://share.baidu.com/static/js/shell_v2.js?t='
                + new Date().getHours(),
            function (){
                var script = document.createElement('script');
                script.setAttribute('data', 'type=tools&uid=10006&mini=1');
                script.id = 'bdshare_js';
                script.src = 'http://bdimg.share.baidu.com/static/js/bds_s_v2.js'
                    + '?cdnversion=' + Math.ceil(new Date()/3600000);
                var ref = document.getElementsByTagName('script')[0];
                ref.parentNode.insertBefore(script, ref);
            }
        );
    }
};

/** @override */
ad.widget.tieba.SiteHeader.prototype.patchData = function () {

    function hasPlaceholder(value) {
        return typeof value === 'string' && value.match(/%%[\w\d_]+%%/);
    }

    if (this._data) {
        //预览时用
        var nav = this._data['nav_json_mockup'];
        if (!nav) {
            //检索端替换过则为真实数据，否则应给出空数据
            nav = this._data['nav_json'];
            //检索端还没替换，是预渲染HTML
            if (hasPlaceholder(nav)) {
                //预渲染时用的空数据
                nav = '[]';
            }
        }
        nav = baidu.json.parse(nav);
        for (var i = 0, j = nav.length; i < j; i++) {
            nav[i]['index'] = i + 1;
        }
        if (this._data['extra_nav']) {
            nav = this._data['extra_nav'].concat(nav);
        }
        if (nav.length > 0) {
            this._data['has_nav'] = true;
        }

        this._data['nav'] = nav;

        // var intro = this._data['intro_mockup'];
        // if (!intro) {
        //     intro = this._data['intro'];
        //     if (hasPlaceholder(intro)) {
        //         intro = '';
        //     }
        // }
        // this._data['intro'] = intro;

        var gallery = this._data['gallery'];
        if (gallery) {
            if (gallery.length > 0) {
                this._data['has_gallery'] = true;
            }

            for (i = 0, j = gallery.length; i < j; i++) {
                gallery[i]['index'] = i + 1;
            }
        }
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
