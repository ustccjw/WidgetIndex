/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/leju/new_apartments.js ~ 2014/05/21 16:54:13
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 11222 $
 * @description
 * new_apartments相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Header');
goog.require('ad.widget.H2');
goog.require('ad.widget.leju.SpotNews');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/leju/new_apartments.less');

goog.provide('ad.impl.leju.NewApartments');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['header']['list']['options'][0]['text'] =
        '售楼中心电话：' + AD_CONFIG['header']['list']['options'][0]['text'];

    var spotNews = new ad.widget.leju.SpotNews(AD_CONFIG['spot_news']);

    material.setWidgets(
        new ad.widget.Title(AD_CONFIG['title']),
        new ad.widget.Header(AD_CONFIG['header']),
        new ad.widget.H2(AD_CONFIG['h2']),
        spotNews
    );

    if (async === true) {
        return material;
    }

    var layout = baidu.dom.first(material.getRoot());
    var timeStamp =  layout && layout.getAttribute('data-time');
    var renderTime = '';
    if (timeStamp) {
       renderTime = ' ' + baidu.date.format(new Date(timeStamp - 0), 'yyyy-MM-dd');
    }

    material.show();

    if (renderTime) {
        var origin = baidu.dom.q('ec-origin', spotNews.getRoot())[0];
        baidu.dom.insertHTML(origin, 'beforeEnd', renderTime);
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
