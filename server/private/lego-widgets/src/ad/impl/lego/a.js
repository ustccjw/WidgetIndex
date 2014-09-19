/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * a.js ~ 2013/12/13 16:40:19
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *
 * 企业名片左侧样式.
 *
 **/
goog.require('ad.Debug');
goog.require('ad.StyleMaterial');
goog.require('ad.lego');
goog.require('ad.widget.gx_sck.CompCardMain');

goog.include('ad/impl/lego/a.less');

goog.provide('ad.impl.lego.A');

var LAYOUT = {
  "width": 520,
  "height": 350,
  "padding": [
    0,
    0,
    0,
    0
  ],
  "background": "",
  "backgroundColor": "",
  "borderWidth": 0,
  "borderColor": "",
  "margin": [
    0,
    0,
    20,
    0
  ],
  "rows": [
    {
      "width": 520,
      "height": 350,
      "padding": [
        0,
        0,
        0,
        0
      ],
      "index": 0,
      "ns": ad.widget.gx_sck.CompCardMain,
      "content": 2
    }
  ],
  "extraRequires": []
}
  
ad.Debug(function(async) {
    var id = ad.lego.getId();
    var material = new ad.StyleMaterial(id, LAYOUT, AD_CONFIG);
    if (async === true) {
        return material;
    }
    material.show();
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
