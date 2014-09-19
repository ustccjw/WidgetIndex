/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/skoda3.js ~ 2014/04/15 14:35:32
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * skoda3相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Flash');

goog.include('ad/impl/skoda3.less');

goog.provide('ad.impl.Skoda3');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    material.setWidgets(
        [flash]
    );

    if (async === true) {
        return material;
    }

    material.show();

    if (ad.env.isIpad && AD_CONFIG['flash']['ipad_img']) {
        var imgWrap = flash.getRoot().querySelector('.ec-ipad-link');
        var img2 = baidu.dom.create('img', {
            'width': '744',
            'height': '350',
            'src': AD_CONFIG['flash']['ipad_img2'] || AD_CONFIG['flash']['ipad_img']
        });
        imgWrap.appendChild(img2);
    }
});






/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
