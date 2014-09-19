/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: Style3.js 9564 2012-06-06 04:43:29Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/impl/Style3.js ~ 2012/06/06 11:47:13
 * @author loutongbing
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.H1');
goog.require('ad.widget.LinkList');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ui.events');
goog.include('ad/impl/style3.less');

goog.provide('ad.impl.Style3');

ad.Debug(function(async) {
  var material = new ad.Material(AD_CONFIG['id']);
  material.setRender(new ad.render.DefaultRender());
  material.setWidgets(
    [new ad.widget.Title(AD_CONFIG['title'])],
    [new ad.widget.Video(AD_CONFIG['video'])],
    [new ad.widget.H1(AD_CONFIG['h1'])],
    [new ad.widget.LinkList(AD_CONFIG['linkList'])]
  );
  if (async === true) {
    return material;
  }
  material.show();
  var cms = material.getCMS();
  cms.init(material.getId());
  var video = material.getWidget(1, 0);
  video.addListener(ui.events.VIDEO_START, function() {
    cms.sendLog({
        'r' : new Date().valueOf(),
        'q' : (window['bdQuery'] || ''),
        'plid' : material.getId().replace(/ec-ma-/g, ''),
        'title' : 'videostart'
    });
  });
  video.addListener(ui.events.VIDEO_FINISH, function() {
    cms.sendLog({
        'r' : new Date().valueOf(),
        'q' : (window['bdQuery'] || ''),
        'plid' : material.getId().replace(/ec-ma-/g, ''),
        'title' : 'videofinish'
    });
  });
  video.addListener(ui.events.VIDEO_CLICK, function() {
    cms.sendLog({
        'r' : new Date().valueOf(),
        'q' : (window['bdQuery'] || ''),
        'plid' : material.getId().replace(/ec-ma-/g, ''),
        'title' : 'videoclick'
    });
  });

});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
