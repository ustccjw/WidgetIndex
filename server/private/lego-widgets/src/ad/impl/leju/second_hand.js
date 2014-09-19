/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/leju/second_hand.js ~ 2014/05/21 11:31:26
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 11222 $
 * @description
 * second_hand相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Header');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.Table');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/leju/second_hand.less');

goog.provide('ad.impl.leju.SecondHand');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['header']['list']['options'][0]['text'] =
        '买卖：' + AD_CONFIG['header']['list']['options'][0]['text'];
    AD_CONFIG['header']['list']['options'][1]['text'] =
        '租赁：' + AD_CONFIG['header']['list']['options'][1]['text'];

    material.setWidgets(
        new ad.widget.Title(AD_CONFIG['title']),
        new ad.widget.Header(AD_CONFIG['header']),
        new ad.widget.Colorlist(AD_CONFIG['colorlist']),
        new ad.widget.Table(AD_CONFIG['table']),
        new ad.widget.ButtonGroup(AD_CONFIG['button_group'])
    );

    if (async === true) {
        return material;
    }
    material.show();
});

/* vim: set ts=4 sw=4 sts=4 tw=100: */
