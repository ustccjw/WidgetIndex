/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/flash_optimus.js ~ 2013/12/05 17:45:42
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * flash_optimus相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Flash');

goog.include('ad/impl/landmark/flash_optimus.less');

goog.provide('ad.impl.landmark.FlashOptimus');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['flash']['width'] = 175;
    AD_CONFIG['flash']['height'] = 300;
    AD_CONFIG['flash']['style_width'] = '175px';
    AD_CONFIG['flash']['style_height'] = '300px';

    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    material.setWidgets(flash);

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
