/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/ping_an_frs2.js ~ 2012/11/15 19:03:37
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 11222 $
 * @description
 * ping_an_frs2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.tieba.Text');
goog.require('ad.widget.tieba.Image');
goog.require('ad.service.RCV2Service');

goog.include('ad/impl/tieba/ping_an_frs2.less');

goog.provide('ad.impl.tieba.PingAnFrs2');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    // material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [new ad.widget.tieba.Text(AD_CONFIG['text'])],
        [new ad.widget.tieba.Image(AD_CONFIG['image'])]
    );
    material.show();
    var root = material.getRoot();
    if(root){
        root.style.height = 'auto';
    }

    var rcv2Service = new ad.service.RCV2Service(AD_CONFIG['id']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
