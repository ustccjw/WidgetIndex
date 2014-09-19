/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: Style2.js 9564 2012-06-06 04:43:29Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/impl/Style1.js ~ 2012/06/06 11:47:13
 * @author loutongbing
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.Footer');
goog.require('ad.widget.Header');
goog.require('ad.widget.ImageShowHorizontal');
goog.require('ad.widget.LinkList');
goog.include('ad/impl/style2.less');

goog.provide('ad.impl.Style2');

ad.Debug(function(async) {
  var material = new ad.Material(AD_CONFIG['id']);
  material.setRender(new ad.render.DefaultRender());
  material.setWidgets(
    [new ad.widget.Header(AD_CONFIG['header'])],
    [new ad.widget.ImageShowHorizontal(AD_CONFIG['image_show_horizontal'])]
  );
  if (async === true) {
      return material;
  }
  material.show();
  material.getCMS().init(material.getId());
  var widget = material.getWidget(1, 0);
  widget.addListener(ui.events.TAB_CHANGE, function(tabIndex) {
    material.getCMS().sendLog({
        'r' : new Date().valueOf(),
        'q' : (window['bdQuery'] || ''),
        'xp' : 'tab' + tabIndex + 'mouseover',
        'plid' : material.getId().replace(/ec-ma-/g, ''),
        'title' : 'tab'
    });
  });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
