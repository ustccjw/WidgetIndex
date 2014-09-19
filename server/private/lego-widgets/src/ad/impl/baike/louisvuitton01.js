/***************************************************************************
 *
 * Copyright (c) 2013-09-24 14:34:26 Baidu.com, Inc. All Rights Reserved
 * $Id: louisvuitton.js 11222 2013-09-24 14:34:26 dingguoliang01 $
 *
 **************************************************************************/


/**
 * src/ad/impl/louisvuitton.js ~ 2013/09/24 14:34:26
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 11222 $
 * @description
 * louisvuitton01相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.baike.SimpleTitle');
goog.require('ad.widget.baike.TimeLine');
goog.include('ad/impl/baike/louisvuitton01.less');
goog.provide('ad.impl.baike.LouisVuitton01');

ad.Debug(function (async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());
    var simpleTitle = new ad.widget.baike.SimpleTitle(AD_CONFIG['simple_title']);
    var timeLine = new ad.widget.baike.TimeLine(AD_CONFIG['time_line']);
    material.setWidgets(
        [simpleTitle],
        [timeLine]
    );
    if (async === true) {
        return material;
    }
    material.show();
});
