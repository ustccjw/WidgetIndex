/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/rcres/case18.js ~ 2013/12/02 20:15:47
 * @author chenli11@baidu.com (chenli11)
 * @version $Revision: 11222 $
 * @description
 * case18相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.ImageShowHorizontal');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/rcres/case18.less');

goog.provide('ad.impl.rcres.Case18');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    var imageConfig = AD_CONFIG[ 'image' ][ 'options' ];
    if ( imageConfig.length > 1 && !( 'title' in imageConfig[0] ) ) {
        for (var i = 0, l = imageConfig.length; i < l; i ++ ) {
            imageConfig[i]['title'] = i + 1;
        }
    }
    material.setWidgets(
        [
            new ad.widget.ImageShowHorizontal(AD_CONFIG[ 'image' ]),
            new ad.widget.SmallHead(AD_CONFIG[ 'small_head' ])
        ],
        [new ad.widget.Section(AD_CONFIG['section'])],
        [new ad.widget.ButtonGroup(AD_CONFIG[ 'button_group' ])]
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
