/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/spec_check.js ~ 2014/05/03 12:43:01
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * spec_check相关的实现逻辑
 *
 * 用于检查SPEC的表单输出正确与否：直接将AD_CONFIG显示在canvas上
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.SpecCheck');

goog.include('ad/impl/spec_check.less');

goog.provide('ad.impl.SpecCheck');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var specCheck = new ad.widget.SpecCheck(AD_CONFIG['data']);
    material.setWidgets(specCheck);

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
