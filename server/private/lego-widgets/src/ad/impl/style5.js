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
goog.require('ad.widget.FloatVideo');
goog.require('ad.widget.Footer');
goog.require('ad.widget.Header');
goog.require('ad.widget.LinkList');
goog.include('ad/impl/style5.less');

goog.provide('ad.impl.Style5');

ad.Debug(function(async) {
  var material = new ad.Material(AD_CONFIG['id']);
  material.setRender(new ad.render.DefaultRender());
  material.setWidgets(
    [new ad.widget.Header(AD_CONFIG['header'])],
    [new ad.widget.Footer(AD_CONFIG['footer'])],
    [new ad.widget.LinkList(AD_CONFIG['link_list'])],
    [new ad.widget.FloatVideo(AD_CONFIG['float_video'])]
  );
  if (async === true) {
    return material;
  }
  material.show();
  var header = material.getWidget(0, 0);
  var video = material.getWidget(3, 0);
  var cms = material.getCMS();
  cms.init(material.getId());

  baidu.dom.hide(baidu.g(video.getId('float-video-container')));
  var img_dom = baidu.g(header.getId('title-image'));
  img_dom.target = '_self';
  img_dom.onclick = function() {
    baidu.dom.show(baidu.g(video.getId('float-video-container')));
    cms.sendLog({
        'r' : new Date().valueOf(),
        'q' : (window['bdQuery'] || ''),
        'xp' : 'floatopen',
        'plid' : material.getId().replace(/ec-ma-/g, ''),
        'title' : '浮层打开'
    });
  }
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
