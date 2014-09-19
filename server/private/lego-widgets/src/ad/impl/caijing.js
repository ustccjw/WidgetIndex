/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/caijing.js ~ 2013/12/05 10:18:58
 * @author chenli11@baidu.com (chenli11)
 * @version $Revision: 11222 $
 * @description
 * caijing相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/caijing.less');

goog.provide('ad.impl.Caijing');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var weibo = null;

    if ( ! AD_CONFIG['small_weibo']['weibo_type']['sina'] ) {

        weibo = new ad.widget.QQWeibo( AD_CONFIG['small_weibo']['weibo_type']['qq'] );

    } else {

        weibo = new ad.widget.SmallWeibo( AD_CONFIG['small_weibo']['weibo_type']['sina'] );

    }
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['h1'])],
        [new ad.widget.Section(AD_CONFIG['section1'])],
        [new ad.widget.ImageCartoon(AD_CONFIG['img_card'])],
        [weibo],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
