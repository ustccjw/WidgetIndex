/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: Style4.js 9564 2012-06-06 04:43:29Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/impl/Style4.js ~ 2012/06/06 11:47:13
 * @author loutongbing
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.Float');
goog.require('ad.widget.Header');
goog.require('ad.widget.Image');
goog.require('ad.widget.LinkList');
goog.include('ad/impl/style4.less');

goog.provide('ad.impl.Style4');

ad.Debug(function(async) {
  var material = new ad.Material(AD_CONFIG['id']);
  material.setRender(new ad.render.DefaultRender());
  material.setWidgets(
    [new ad.widget.Header(AD_CONFIG['header'])],
    [new ad.widget.Image(AD_CONFIG['image'])],
    [new ad.widget.LinkList(AD_CONFIG['linkList'])],
    [new ad.widget.Float(AD_CONFIG['float'])]
  );
  if (async === true) {
    return material;
  }
  material.show();
  var cms = material.getCMS();
  cms.init(material.getId());

  var float_container = material.getWidget(3, 0);
  var img_container = material.getWidget(1, 0);
  baidu.dom.hide(baidu.g(float_container.getId('float-container')));
  var img_dom = baidu.g(img_container.getId('img'));
  img_dom.onclick = function() {
    baidu.dom.show(baidu.g(float_container.getId('float-container')));
    cms.sendLog({
        'r' : new Date().valueOf(),
        'q' : (window['bdQuery'] || ''),
        'xp' : 'floatopen',
        'plid' : material.getId().replace(/ec-ma-/g, ''),
        'title' : '浮层打开'
    });
  }

});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
