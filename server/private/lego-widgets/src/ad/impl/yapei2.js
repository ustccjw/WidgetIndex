/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/yapei2.js ~ 2013/07/23 11:35:03
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * yapei2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/yapei2.less');

goog.provide('ad.impl.Yapei2');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var colorList = new ad.widget.Colorlist(AD_CONFIG['color_list']);
    var section = new ad.widget.Section(AD_CONFIG['section']);
    var buttonList = new ad.widget.ButtonGroup(AD_CONFIG['button_list']);

    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [
            leftVideo,
            [
                [smallHead],
                [colorList]
            ]
        ],
        [
            section
        ],
        [buttonList]
    );
    if (async === true) {
        return material;
    }
    
    material.show();
});