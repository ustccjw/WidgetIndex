/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/text_vote.js ~ 2012/10/12 04:25:48
 * @author pengxing (pengxing@baidu.com)
 * @version $Revision: 11222 $
 * @description
 * text_vote相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.tieba.TextVote');
goog.require('ad.service.RCV2Service');

goog.include('ad/impl/tieba/text_vote.less');

goog.provide('ad.impl.tieba.TextVote');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.tieba.TextVote(AD_CONFIG['text_vote'])]
    );
    material.show();

    var root = material.getRoot();
    if(root){
        root.style.height = 'auto';
    }

    var rcv2Service = new ad.service.RCV2Service(AD_CONFIG['id']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
