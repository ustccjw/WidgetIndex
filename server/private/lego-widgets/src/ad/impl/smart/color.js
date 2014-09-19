/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/smart/color.js ~ 2013/11/13 16:58:33
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * color相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ui.events');
goog.require('ad.widget.Title');
goog.require('ad.widget.smart.ColorHead');
goog.require('ad.widget.smart.ImageSlider');
goog.require('ad.widget.ImageNormal');

goog.include('ad/impl/smart/color.less');

goog.provide('ad.impl.smart.Color');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var head = new ad.widget.smart.ColorHead(AD_CONFIG['head']);
    material.setWidgets(
        new ad.widget.Title(AD_CONFIG['title']),
        [
            new ad.widget.smart.ImageSlider(AD_CONFIG['banners']),
            [
                head,
                new ad.widget.ImageNormal(AD_CONFIG['images'])
            ]
        ]
    );

    head.addListener(ui.events.CLICK, function (elm){
        head.sendLog({
            "action": '点击更多颜色次数',
            "__node": elm
        });
    });

    if (async === true) {
        return material;
    }
    material.show();
});















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
