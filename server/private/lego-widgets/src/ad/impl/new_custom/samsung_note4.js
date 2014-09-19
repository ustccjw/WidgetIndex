/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: guolinaiyou.js 150523 2013-06-05 14:06:00Z  fanxueliang$
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/samsung_note4.js ~ 2014/08/06 15:38:38
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * samsung_note4相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Image');
goog.require('ad.widget.Title');

goog.include('ad/impl/new_custom/samsung_note4.less');

goog.provide('ad.impl.new_custom.SamsungNote4');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var video = new ad.widget.Video(AD_CONFIG['video']);
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var head = new ad.widget.SmallHead(AD_CONFIG['head']);
    var products = new ad.widget.ImageNormal(AD_CONFIG['products']);
    var img = new ad.widget.Image(AD_CONFIG['image_banner']);
    
    material.setWidgets(
        [ title ],
        [
            [ video ],
            [
                head,
                products
            ]
        ],
        [ img ]
    );
    
    if (async === true) {
        return material;
    }

    material.show();

});
