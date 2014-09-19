/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/


/**
 * src/ad/impl/tieba/jnj_video.js ~ 2013/08/20 16:35:43
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * jnj_video相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.tieba.VideoInList');

goog.include('ad/impl/tieba/jnj_video.less');

goog.provide('ad.impl.tieba.JnjVideo');

ad.Debug(function() {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.tieba.VideoInList(AD_CONFIG['video'])]
    );
    material.show();
    var root = material.getRoot();
    baidu.dom.setStyle(root, 'height', 'auto');
    baidu.dom.setStyle(root, 'overflow', 'visible');
});

/* vim: set ts=4 sw=4 sts=4 tw=100: */