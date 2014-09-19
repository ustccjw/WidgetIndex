/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: pic_ns.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/pic_ns.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.NSPic');
goog.require('ad.widget.ImageCartoon');

goog.include('ad/impl/pic_ns.less');

goog.provide('ad.impl.PicNS');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    AD_CONFIG['tapes']['image_width'] = 116;
    AD_CONFIG['tapes']['image_margin'] = 6;
    material.setWidgets(
        new ad.widget.H1(AD_CONFIG['head']),
        new ad.widget.NSPic(AD_CONFIG['ns_pic_info']),
        new ad.widget.ImageCartoon(AD_CONFIG['tapes']),
        new ad.widget.NSPic(AD_CONFIG['ns_pic_more'])
    );

    if (async === true) {
        return material;
    }

    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
