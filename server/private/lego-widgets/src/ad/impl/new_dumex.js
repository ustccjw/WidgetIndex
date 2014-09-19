/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_dumex.js ~ 2014/03/17 14:49:25
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * new_dumex相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonListFluid');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.Image');

goog.include('ad/impl/new_dumex.less');

goog.provide('ad.impl.NewDumex');

ad.Debug(function(async){

    var material = new ad.material.BaseMaterial();
    var buttonList = new ad.widget.ButtonListFluid(
                                AD_CONFIG['button_list']);
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab_container']);

    // 生成 Tab container 内容
    var tabContainerOptions = AD_CONFIG['tab_container']['options'];
    var tabContinerWidgets = [];
    for (var i = 0; i < tabContainerOptions.length; i++) {
        tabContinerWidgets.push(
            new ad.widget.Image(tabContainerOptions[i])
        );
    };
    tabContainer.setWidgets(tabContinerWidgets);

    material.setWidgets(
        [
            new ad.widget.Title(AD_CONFIG['header'])
        ],
        [
            new ad.widget.Video(AD_CONFIG['video']),
            new ad.widget.SmallHead(AD_CONFIG['small_head']),
            buttonList
        ],
        [tabContainer]
    );
    if (async === true) {
        return material;
    }
    material.show();
    
});

/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
