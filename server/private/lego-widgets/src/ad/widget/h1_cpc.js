/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: h1.js 13834 2012-11-03 06:31:22Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/H1.js ~ 2012/06/07 22:07:55
 * @author loutongbing
 * @version $Revision: 13834 $
 * @description
 * 苏宁易购的头部效果
 **/

goog.require('ad.widget.H1');
goog.provide('ad.widget.H1Cpc');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.H1Cpc = function(data) {
    ad.widget.H1.call(this, data);
};
baidu.inherits(ad.widget.H1Cpc, ad.widget.H1);

/** @override */
ad.widget.H1Cpc.prototype.patchData = function() {
    var defLinks;
    if (this._data['img_sources']) {
        defLinks = this._data['img_sources'].split(',');
    }
    var linkItems = [];
    if (this._data['image_links']) {
        linkItems = this._data['image_links']['options'] || [];
    }
    if (linkItems && defLinks) {
        var defLen = defLinks.length, linkLen = linkItems.length;
        for (var i = 0; i < linkLen; i++) {
            if (defLinks[i]) {
                linkItems[i]['image_url'] = defLinks[i];
            }
        }
    }

    ad.widget.H1Cpc.superClass.patchData.call(this);
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
