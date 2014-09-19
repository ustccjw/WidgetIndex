/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1073.js ~ 2013/11/27 17:53:24
 * @author chenli11@baidu.com (chenli11)
 * @version $Revision: 11222 $
 * @description
 * case1073相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.ImageShowHorizontal');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/advanced/case1073.less');

goog.provide('ad.impl.advanced.Case1073');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    var imageConfig = AD_CONFIG[ 'image' ][ 'options' ];
    if ( imageConfig.length > 1 && !( 'title' in imageConfig[0] ) ) {
        for (var i = 0, l = imageConfig.length; i < l; i ++ ) {
            imageConfig[i]['title'] = i + 1;
        }
    }

    var tabConfig = AD_CONFIG[ 'tab' ];
    tabConfig.options = [];
    tabConfig.options.push( {
        "tab_title": AD_CONFIG[ 'small_weibo' ][ 'tab_title' ]
    } );
    var tab = new ad.widget.TabContainer( AD_CONFIG[ 'tab' ] );
    var weibo = AD_CONFIG[ 'small_weibo' ][ 'weibo_type' ];
    if ('sina' in weibo) {
        tab.setWidgets( [ new ad.widget.SmallWeibo(weibo['sina']) ] );
    }
    else if ('qq' in weibo) {
        tab.setWidgets( [ new ad.widget.QQWeibo(weibo['qq']) ] );
    }

    material.setWidgets(
        [
            new ad.widget.ImageShowHorizontal(AD_CONFIG[ 'image' ]),
            new ad.widget.SmallHead(AD_CONFIG[ 'small_head' ])
        ],
        tab,
        [new ad.widget.ButtonGroup(AD_CONFIG[ 'button_group' ])]
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
