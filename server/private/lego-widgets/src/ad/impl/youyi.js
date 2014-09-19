/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: youyi.js 150523 2013-06-07 10:29:22Z DestinyXie$
 *
 **************************************************************************/



/**
 * src/ad/impl/youyi.js ~ 2013/06/07 10:29:22
 * @author xiebin01@baidu.com (DestinyXie), fanxueliang@baidu.com
 * @version $Revision: 150523 $
 * @description
 * youyi相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Image');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/youyi.less');

goog.provide('ad.impl.Youyi');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial(AD_CONFIG['id']);
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var img = new ad.widget.Image(AD_CONFIG['img']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    
    material.setWidgets(
        [title],
        [leftVideo, smallHead],
        [img],
        [buttonGroup]
    );

    if (async === true) {
        return material;
    }
    material.show();
    
});
