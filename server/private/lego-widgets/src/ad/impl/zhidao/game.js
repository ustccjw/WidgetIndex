/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: game.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao/game.js ~ 2013/01/24 16:22:18
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * result相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');

goog.require('ad.widget.TabContainer');
goog.require('ad.widget.zhidao.Game');

goog.include('ad/impl/zhidao/game.less');

goog.provide('ad.impl.zhidao.Game');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var gameArr = [];
    for(var i = 0; i < AD_CONFIG['games'].length; i++){
        gameArr.push(new ad.widget.zhidao.Game(AD_CONFIG['games'][i]));
    }
    tabContainer.setWidgets(gameArr);
    material.setWidgets(
        [tabContainer]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.getCMS().init(material.getId());
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
