/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/yashili.js ~ 2013/08/29 11:17:05
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * yashili相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.tieba.GamePlay');
goog.require('ad.service.RCV2Service');

goog.include('ad/impl/tieba/yashili.less');

goog.provide('ad.impl.tieba.Yashili');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    var gamePlay = new ad.widget.tieba.GamePlay(AD_CONFIG['game']);
    material.setWidgets(
        [gamePlay]
    );
    if (async === true) {
        return material;
    }
    material.show();

    gamePlay.addListener(ui.events.TIEBA_LIST_GAME_PLAY, function(){
        var rcv2 = new ad.service.RCV2Service(AD_CONFIG['id']);
        rcv2.sendLog({
            'item': '打开Flash游戏'
        });
    });

    //Fix Tieba style problems:
    var root = material.getRoot();
    baidu.setStyle(root, 'height', 'auto');
    baidu.setStyle(root, 'overflow', 'visible');
    //get rid of 'overflow:hidden' in Tieba list.
    baidu.setStyle(baidu.dom.getParent(root), 'overflow', 'visible');
    baidu.setStyle(baidu.dom.getParent(baidu.dom.getParent(root)), 'overflow', 'visible');

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
