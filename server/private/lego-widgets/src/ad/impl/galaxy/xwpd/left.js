/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/galaxy/xwpd/left.js ~ 2014/05/04 14:35:34
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * left相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.gx_sck.xwpd.CardMain');
goog.require('ad.widget.gx_sck.xwpd.NewsList');

goog.include('ad/impl/galaxy/xwpd/left.less');

goog.provide('ad.impl.galaxy.xwpd.Left');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var cardMain = new ad.widget.gx_sck.xwpd.CardMain(AD_CONFIG['card_main']);

    material.setWidgets(
        [cardMain],
        [new ad.widget.gx_sck.xwpd.NewsList(AD_CONFIG['news_list'])]
    );

    if (async === true) {
        return material;
    }

    material.show();


});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
