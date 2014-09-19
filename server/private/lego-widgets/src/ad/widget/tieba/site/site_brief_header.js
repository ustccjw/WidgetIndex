/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/site/site_brief_header.js ~ 2013/04/03 13:46:13
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 10927 $
 * @description
 * site_brief_header相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/site/site_brief_header.less');
goog.include('ad/widget/tieba/site/site_brief_header.html');
    
goog.provide('ad.widget.tieba.site.SiteBriefHeader');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.site.SiteBriefHeader = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_site_site_brief_header';
};
baidu.inherits(ad.widget.tieba.site.SiteBriefHeader, ad.widget.Widget);

/** @override */
ad.widget.tieba.site.SiteBriefHeader.prototype.enterDocument = function() {
    ad.widget.tieba.site.SiteBriefHeader.superClass.enterDocument.call(this);

    //处理皮肤的逻辑
    var skinTpl = [
        '.wrap1 {background: url({{bottom_url}}) {{#bottom_repeat}}repeat-x{{/bottom_repeat}}{{^bottom_repeat}}no-repeat{{/bottom_repeat}} center bottom {{color}};}',
        '.wrap2 {background: url({{top_url}}) no-repeat center top;}'
    ].join('');

    var data = this._data;

    if (data['skin']) {
        var cssText = Mustache.render(skinTpl, data['skin']);

        ad.dom.createStyles(cssText, null, this.getRoot());
    }
};

/** @override */
ad.widget.tieba.site.SiteBriefHeader.prototype.patchData = function() {

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
        // if (this._data['extra_nav']) {
        //     nav = this._data['extra_nav'].concat(nav);
        // }
        if (this._data['has_game_tab'] && this._data['game_tab_url']) {
            nav.unshift({
                'text': '游戏',
                'url': this._data['game_tab_url'],
                // skin => nav-skin
                // 避免在模板中获取到data下的skin
                'nav_skin': 'game',
                'is_new': true
            });
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

        var skin = this._data['skin'];
        var bottomRepeat = !!skin['bottom_repeat']['true'];
        skin['bottom_url'] = skin['bottom_repeat'][bottomRepeat]['bottom_url'];
        skin['bottom_repeat'] = bottomRepeat;
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
