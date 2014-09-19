/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/test/flag_show_case.js ~ 2013/11/28 22:52:23
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * flag_show_case相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.test.FlagShowCase');

goog.include('ad/impl/test/flag_show_case.less');

goog.provide('ad.impl.test.FlagShowCase');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setWidgets(new ad.widget.test.FlagShowCase({}));
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
