/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/where_is_daddy.js ~ 2014/06/16 14:02:15
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * where_is_daddy相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/where_is_daddy.less');

goog.provide('ad.impl.WhereIsDaddy');

ad.Debug(function(async){
    // Patch Data
    var colorlist = [];
    colorlist.push(AD_CONFIG['list']['list-1']);
    colorlist.push(AD_CONFIG['list']['list-2']);
    colorlist['options'] = colorlist;
    colorlist['color_names'] = AD_CONFIG['list']['color_names'];
    

    var material = new ad.material.BaseMaterial();

    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['h1'])],
        [new ad.widget.Colorlist(colorlist)],
        [new ad.widget.ImageCartoon(AD_CONFIG['images'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );

    if (async === true) {
        return material;
    }

    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
