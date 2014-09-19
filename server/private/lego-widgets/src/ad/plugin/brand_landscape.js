/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/brand_landscape.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/03/24 16:53:22$
 */

goog.require('ad.dom');
goog.require('ad.plugin.Plugin');
goog.require('ui.events');

goog.provide('ad.plugin.BrandLandscape');

/**
 * 全景加框CSS RESET
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.BrandLandscape = function() {
    ad.plugin.Plugin.call(this);
    this._name = 'ad.plugin.BrandLandscape';
};
baidu.inherits(ad.plugin.BrandLandscape, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.BrandLandscape());

/** @expose */
ad.plugin.BrandLandscape.prototype.attachTo = function(material) {
    material.addListener(ui.events.BEFORE_MATERIAL_SHOW, function() {
        var tpl = [
            '.c-border #{0} {',
            '    margin-top: -9px;',
            '    margin-left: -9px;',
            '    border-top: none;',
            '    border-right: none;',
            '    border-left: none;',
            '    box-shadow: none;',
            '}'
        ].join('');

        var css = baidu.format(tpl, material.getId());
        var id = material.getId() + '-landscape-style';
        if (!baidu.g(id)) {
            ad.dom.createStyles(css, id, material.getRoot());
        }
    });
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
