/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: amazon.js 9564 2012-06-06 04:43:29Z songao $
 *
 **************************************************************************/



/**
 * src/ad/impl/amazon.js ~ 2012/06/06 11:47:13
 * @author songao(songao@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.search_box.SearchBox');
goog.require('ad.widget.Slider');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Table');
goog.require('ad.widget.Title');
goog.include('ad/impl/amazon.less');

goog.provide('ad.impl.Amazon');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']), 
        smallWeibo = new ad.widget.SmallWeibo(AD_CONFIG['weibo']);
    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [new ad.widget.Title(AD_CONFIG['title'])],
        [
            new ad.widget.Slider(AD_CONFIG['image_slider']),
            [
                new ad.widget.SmallHead(AD_CONFIG['head']),
                smallWeibo,
                new ad.widget.search_box.SearchBox(AD_CONFIG['search_box'])
            ]
        ],
        [new ad.widget.ImageCartoon(AD_CONFIG['image_group'])],
        [new ad.widget.Table(AD_CONFIG['table'])]
    );
    if (async === true) {
        return material;
    }
    material.show();

    material.initMonitor(AD_CONFIG['main_url']);

    smallWeibo.addListener(ui.events.WEIBO_NAME,function(){
        baidu.sio.log(AD_CONFIG['weibo']['custom_url']);
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
