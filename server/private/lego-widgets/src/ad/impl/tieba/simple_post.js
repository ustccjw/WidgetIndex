/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: simple_post.js 14951 2012-11-26 08:16:27Z pengxing $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/simple_post.js ~ 2012/09/28 11:32:23
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 14951 $
 * @description
 * simple_post相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.tieba.SimplePost');
goog.require('ad.service.RCV2Service');

goog.include('ad/impl/tieba/simple_post.less');

goog.provide('ad.impl.tieba.SimplePost');

ad.Debug(function() {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.tieba.SimplePost(AD_CONFIG['simple_post'])]
    );
    material.show();
    var root = material.getRoot();
    if (root) {
        root.style.height = '';
    }

    var rcv2 = new ad.service.RCV2Service(AD_CONFIG['id']);
    var widget = material.getWidget(0, 0);
    widget.addListener(ui.events.VIDEO_START, function(){
        rcv2.sendLog({'item': 'video-start'});
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
