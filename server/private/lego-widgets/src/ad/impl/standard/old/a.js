/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/old/a.js ~ 2013/10/08 21:29:03
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision$
 * @description
 * 老标准样式A
 **/
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/standard/old/base.less');
goog.include('ad/impl/standard/old/h1.less');
goog.include('ad/impl/standard/old/section.less');
goog.include('ad/impl/standard/old/button_group.less');
goog.include('ad/impl/standard/old/a.less');

goog.provide('ad.impl.standard.old.A');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    // 样式D和样式A的区别是少了一个button-group
    var options = ad.base.getObjectByName('buttons.options', AD_CONFIG);
    if (options && options.length) {
        material.setWidgets(
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.Section(AD_CONFIG['list']),
            new ad.widget.ButtonGroup(AD_CONFIG['buttons'])
        );
    }
    else {
        material.setWidgets(
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.Section(AD_CONFIG['list'])
        );
    }

    if (async === true) {
        return material;
    }

    material.show();
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
