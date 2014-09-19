/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1096.js ~ 2013/11/29 14:10:53
 * @author chenli11@baidu.com (chenli11)
 * @version $Revision: 11222 $
 * @description
 * case1096相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.ImageShowHorizontal');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/advanced/case1096.less');

goog.provide('ad.impl.advanced.Case1096');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    var imageConfig = AD_CONFIG[ 'image' ][ 'options' ];
    if ( imageConfig.length > 1 && !( 'title' in imageConfig[0] ) ) {
        for (var i = 0, l = imageConfig.length; i < l; i ++ ) {
            imageConfig[i]['title'] = i + 1;
        }
    }

    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var tabBodies = [];
    for (var i = 0; i < AD_CONFIG['tab']['options'].length; i ++) {
        var item = AD_CONFIG['tab']['options'][i];
        var weibo = item['weibo'];
        if ('sina' in weibo) {
            tabBodies.push(new ad.widget.SmallWeibo(weibo['sina']));
        }
        else if ('qq' in weibo) {
            tabBodies.push(new ad.widget.QQWeibo(weibo['qq']));
        }
    }
    tab.setWidgets(tabBodies);

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
