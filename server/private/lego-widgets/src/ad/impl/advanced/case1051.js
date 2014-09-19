/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1051.js ~ 2013/11/01 17:21:46
 * @author chenli11@baidu.com (chenli)
 * @version $Revision: 11222 $
 * @description
 * case1051相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ui.events');

goog.include('ad/impl/advanced/case1051.less');

goog.provide('ad.impl.advanced.Case1051');

ad.Debug(function(async) {

    var material = new ad.material.BaseMaterial();
    var weibo = null;

    if ( ! AD_CONFIG['small_weibo']['weibo_type']['sina'] ) {

        weibo = new ad.widget.QQWeibo( AD_CONFIG['small_weibo']['weibo_type']['qq'] );

    } else {

        weibo = new ad.widget.SmallWeibo( AD_CONFIG['small_weibo']['weibo_type']['sina'] );

    }

    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['h1'])],
        [new ad.widget.Colorlist(AD_CONFIG['colorlist'])],
        [weibo],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );
    if (async === true) {
        return material;
    }
    material.show();

});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
