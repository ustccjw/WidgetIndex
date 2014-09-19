/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/bmw_mini.js ~ 2013/09/24 11:40:33
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * bmw_mini相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.ImageShowHorizontal');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.Title');
goog.require('ad.widget.Button');

goog.include('ad/impl/bmw_mini.less');

goog.provide('ad.impl.BmwMini');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());
    var options = AD_CONFIG['img_show']['options'];
    if(options && options.length && options.length > 1) {
        for(var w = 0; w < options.length; w++) {
            options[w]['title'] = " ";
        }
    }
    var imgShow = new ad.widget.ImageShowHorizontal(AD_CONFIG['img_show']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var imageLinks = [];
    var title = new ad.widget.Title(AD_CONFIG['bottom_title']);
    var button = new ad.widget.Button(AD_CONFIG['bottom_button']);
    var options = ad.base.getObjectByName('tab.options', AD_CONFIG);
    if(options && options.length) {
        for(var i = 0, len = options.length; i < len; i ++) {
            imageLinks.push(new ad.widget.ImageLink(options[i]));
        }
    }
    tab.setWidgets(imageLinks);

    material.setWidgets(
        [imgShow, smallHead],
        [tab],
        [title, button]
    );

    if (async === true) {
        return material;
    }

    material.show();
    //material.initMonitor(AD_CONFIG['main_url']);
    //百度精算监测
    // material.initHMJSMoniter(AD_CONFIG['hmjs_id']);


    var navs = imgShow.getRoot().getElementsByTagName('li');
    for (var i = 0; i < navs.length; i++) {
        baidu.on(navs[i], 'mouseenter', function() {
            return false;
        });
        baidu.on(navs[i], 'click', function() {
            var index = parseInt(this.getAttribute('data-index', 10));
            imgShow._cancelSlideShow();
            imgShow._showSlide(index);
            imgShow._startSlideShow();
        });
    }
});