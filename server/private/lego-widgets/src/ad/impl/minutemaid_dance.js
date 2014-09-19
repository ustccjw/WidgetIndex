/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/minutemaid_dance.js ~ 2013/03/19 11:44:13
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * minutemaid_dance相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Iframe');

goog.include('ad/impl/minutemaid_dance.less');

goog.provide('ad.impl.MinutemaidDance');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    var placeholder = new ad.widget.Iframe({});
    material.setWidgets([placeholder]);
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    var hold = baidu.dom.first(placeholder.getRoot());
    var wrap1 = hold;
    var wrap2 = baidu.dom.create('div');
    wrap1.appendChild(wrap2);

    baidu.dom.addClass(wrap2, 'ad-widget-wrap');

    // create link
    var link = baidu.dom.create('a', {
        'href': AD_CONFIG['main_url'],
        'target': '_blank',
        'style': 'position:absolute;top:10px;left:50%;margin-left:-641px;width:100px;height:75px;'
    });

    var image = baidu.dom.create('img', {
        'src': 'http://g.cn.miaozhen.com/x.gif?k=1005068&p=3yNQ70&rt=2&ns=[M_ADIP]&ni=[M_IESID]&na=[M_MAC]&v=[M_LOC]&o='
    });
    baidu.dom.setStyles(image, {
        'position': 'absolute',
        'top': 0,
        'left': '-9999px'
    });

    // append link
    var firstChild = baidu.dom.first(wrap2);
    if (firstChild) {
        baidu.dom.insertBefore(link, firstChild);
    } else {
        wrap2.appendChild(link);
    }
    baidu.dom.insertBefore(image, link);

    // setup background
    var contentSec = baidu.g('contentSec');
    if (contentSec) {
        baidu.dom.setStyle(contentSec, 'background', '#f3f2f3');
    }

    // bind event
    baidu.event.on(link, 'click', function() {
        placeholder.sendLog('点击LOGO');
    });
    placeholder.sendLog('皮肤展现');
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
