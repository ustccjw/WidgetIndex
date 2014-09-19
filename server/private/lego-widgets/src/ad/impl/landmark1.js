/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: landmark1.js 9923 2012-06-28 10:25:19Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark1.js ~ 2012/06/06 11:47:13
 * @author loutongbing
 * @version $Revision: 9923 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');

goog.require('ad.widget.Float');
goog.require('ad.widget.Footer');
goog.require('ad.widget.Header');
goog.require('ad.widget.ImageShowHorizontal');
goog.require('ad.widget.ImageShowVertical');
goog.require('ad.widget.LinkList');
goog.require('ad.widget.Video');
goog.include('ad/impl/landmark1.less');

goog.provide('ad.impl.Landmark1');

ad.Debug(function() {
  var material = new ad.Material('canvas');
  material.setWidgets(
    [new ad.widget.Header(AD_CONFIG['header'])],
    [new ad.widget.Footer(AD_CONFIG['footer']), new ad.widget.Header(AD_CONFIG['header'])],
    [new ad.widget.Header(AD_CONFIG['header'])],
    //[new ad.widget.LinkList(AD_CONFIG['linkList'])],
    //[new ad.widget.ImageShowHorizontal(AD_CONFIG['ImageShowHorizontal'])],
    //[new ad.widget.ImageShowVertical(AD_CONFIG['ImageShowVertical'])],
    [new ad.widget.Video(AD_CONFIG['Video'])],
    [new ad.widget.Float(AD_CONFIG['float'])]
  );
  material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
