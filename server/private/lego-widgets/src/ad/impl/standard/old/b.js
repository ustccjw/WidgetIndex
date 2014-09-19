/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/old/b.js ~ 2013/11/27 16:41:02
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * bat相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.Table');

goog.include('ad/impl/standard/old/base.less');
goog.include('ad/impl/standard/old/h1.less');
goog.include('ad/impl/standard/old/section.less');
goog.include('ad/impl/standard/old/b.less');

goog.provide('ad.impl.standard.old.B');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    /**
     * @param {Array.<Object>} data
     * @return {Object}
     */
    function gridDataAdapter(data) {
        // spec中使用的是datatype:GRID，生成的数据格式跟
        // ad.widget.Table要求的不太符合，这里做一下适配~~~
        var config = {};

        // 数组的第一项是head，剩下的都是row.
        config['head'] = data[0];
        config['body'] = [];
        for (var i = 1; i < data.length; i ++) {
            config['body'].push({'tr': data[i]});
        }

        return config;
    }

    // 样式C和样式B的区别是少了一个section
    var options = ad.base.getObjectByName('list.options', AD_CONFIG);
    if (options && options.length) {
        material.setWidgets(
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.Section(AD_CONFIG['list']),
            new ad.widget.Table(gridDataAdapter(AD_CONFIG['table']['tbody']))
        );
    }
    else {
        material.setWidgets(
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.Table(gridDataAdapter(AD_CONFIG['table']['tbody']))
        );
    }

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
