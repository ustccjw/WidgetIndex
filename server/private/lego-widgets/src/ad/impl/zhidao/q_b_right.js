/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao/q_b_right.js ~ 2013/10/18 13:06:15
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * q_b_right相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhidao.QBRight');

goog.include('ad/impl/zhidao/q_b_right.less');

goog.provide('ad.impl.zhidao.QBRight');

ad.Debug(function(async){
    var canvasId = 'zhidao-qb-right-' + ad.base.uuid();
    var material = new ad.material.BaseMaterial(canvasId);
    // material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [new ad.widget.zhidao.QBRight(AD_CONFIG)]
    );
    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
