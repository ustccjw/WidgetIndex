/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/a.js ~ 2013/10/08 21:29:03
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision$
 * @description
 * 标准样式A
 **/
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.H1');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/h1.less');
goog.include('ad/impl/standard/msign.less');
goog.include('ad/impl/standard/colorlist.less');
goog.include('ad/impl/standard/button_group.less');
goog.include('ad/impl/standard/a.less');

goog.provide('ad.impl.standard.A');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    // 样式D和样式A的区别是少了一个button-group
    var options = ad.base.getObjectByName('buttons.options', AD_CONFIG);
    if (options && options.length) {
        material.setWidgets(
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.Colorlist(AD_CONFIG['list']),
            new ad.widget.ButtonGroup(AD_CONFIG['buttons'])
        );
    }
    else {
        material.setWidgets(
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.Colorlist(AD_CONFIG['list'])
        );
    }

    if (async === true) {
        return material;
    }

    material.show();
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
