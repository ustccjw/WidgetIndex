/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/baike/simple_head.js ~ 2013/09/13 21:09:52
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * simple_head相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.baike.SimpleHead');

goog.include('ad/impl/baike/simple_head.less');

goog.provide('ad.impl.baike.SimpleHead');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    // material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [new ad.widget.baike.SimpleHead(AD_CONFIG['head'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
