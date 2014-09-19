/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao/result.js ~ 2013/01/24 16:22:18
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * result相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.zhidao.Result');

goog.include('ad/impl/zhidao/result.less');

goog.provide('ad.impl.zhidao.Result');

ad.Debug(function(){
    var material = new ad.Material('ec-ma-8964');
    // material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [new ad.widget.zhidao.Result(AD_CONFIG)]
    );
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
