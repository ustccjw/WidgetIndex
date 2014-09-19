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

goog.require('ad.widget.Header');
goog.require('ad.widget.ImageShowArrow');
goog.require('ad.widget.LinkList');
goog.include('ad/impl/style6.less');

goog.provide('ad.impl.Style6');

ad.Debug(function(async) {
  var material = new ad.Material(AD_CONFIG['id']);
  material.setWidgets(
    [new ad.widget.Header(AD_CONFIG['header'])],
    [new ad.widget.ImageShowArrow(AD_CONFIG['image_show_arrow'])],
    [new ad.widget.LinkList(AD_CONFIG['link_list'])]

  );
  if (async === true) {
    return material;
  }
  material.show();
  var cms = material.getCMS();
  cms.init(material.getId());
  var widget = material.getWidget(1, 0);
  widget.addListener(ui.events.ARROW_RIGHT, function(tabIndex) {
    cms.sendLog({
        'r' : new Date().valueOf(),
        'q' : (window['bdQuery'] || ''),
        'xp' : 'tab' + tabIndex + 'right',
        'plid' : material.getId().replace(/ec-ma-/g, ''),
        'title' : 'tab'
    });
  });
  widget.addListener(ui.events.ARROW_LEFT, function(tabIndex) {
    cms.sendLog({
        'r' : new Date().valueOf(),
        'q' : (window['bdQuery'] || ''),
        'xp' : 'tab' + tabIndex + 'left',
        'plid' : material.getId().replace(/ec-ma-/g, ''),
        'title' : 'tab'
    });
  });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
