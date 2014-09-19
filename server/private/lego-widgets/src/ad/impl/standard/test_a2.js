/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/test_a2.js ~ 2014/01/10 11:35:59
 * @author chenli11@baidu.com (chenli11)
 * @version $Revision: 11222 $
 * @description
 * test_a2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.H1');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/standard/title.less');
goog.include('ad/impl/standard/h1.less');
goog.include('ad/impl/standard/colorlist.less');
goog.include('ad/impl/standard/button_group.less');
goog.include('ad/impl/standard/test_a2.less');

goog.provide('ad.impl.standard.Test_a2');

ad.Debug(function(async){
    var title = new ad.widget.Title({
        'title': AD_CONFIG['head']['title'],
        'rcv_url': AD_CONFIG['head']['rcv_url'],
        'display_official_site_icon': AD_CONFIG['head']['display_official_site_icon']
    });
    delete AD_CONFIG['head']['title'];

    var widgets = [
        [
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.Colorlist(AD_CONFIG['list']),
            new ad.widget.ButtonGroup(AD_CONFIG['buttons'])
        ]
    ];

    var material = new ad.material.BaseMaterial();
    material.setWidgets(title, widgets);

    if (async === true) {
        return material;
    }

    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
