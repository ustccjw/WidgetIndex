/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/rcres/text_link.js ~ 2014/03/19 13:45:30
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 11222 $
 * @description
 * text_link相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Header');

goog.include('ad/impl/rcres/text_link.less');

goog.provide('ad.impl.rcres.TextLink');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    function getReplaceWord(reg, value, replaceMent) {
        if (reg.test(value)) {
            return value.replace(reg, replaceMent);
        }
        return value;
    }

    function redWord(query, value) {
        var redQuery = '<em>' + query + '</em>';
        var index = value.indexOf(query);
        var redIndex = value.indexOf(redQuery);
        if (index > -1 && redIndex == -1) {
            var reg = new RegExp(query, 'g');
            return value.replace(reg, redQuery);
        }
        return value;
    }

    if (window['bds'] && window['bds']['comm']) {
        var query = window['bds']['comm']['query'];
        if (query) {
            for (var i in AD_CONFIG['header']) {
                AD_CONFIG['header'][i] = getReplaceWord(/@word@/g, AD_CONFIG['header'][i], query);
                if (i === 'title' || i === 'description_rcv_html') {
                    AD_CONFIG['header'][i] = redWord(query, AD_CONFIG['header'][i]);
                }
            }
        }
        if (window['bds']['comm']['dsp'] == 'ipad') {
            baidu.dom.addClass(material.getRoot(), 'ec-ipad');
        }
    }

    material.setWidgets(
        new ad.widget.Header(AD_CONFIG['header'])
    );

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
