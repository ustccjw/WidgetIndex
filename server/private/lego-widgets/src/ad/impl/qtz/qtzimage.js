/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: qtzimage.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/qtz/qtzimage.js ~ 2012/08/27 14:30:04
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * qtzfloat相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.ImagePcIpad');
goog.require('ad.widget.Share');

goog.include('ad/impl/qtz/qtzimage.less');

goog.provide('ad.impl.qtz.Qtzimage');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    material.setWidgets(
        [new ad.widget.ImagePcIpad(AD_CONFIG['image'])],
        [new ad.widget.Share(AD_CONFIG['share'])]
    );
    material.show();
    material.getCMS().init(material.getId());
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
