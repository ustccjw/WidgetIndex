/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/b3.js ~ 2014/03/05 13:59:07
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 11222 $
 * @description
 * b3相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.H1');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.Table');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/h1.less');
goog.include('ad/impl/standard/colorlist.less');
goog.include('ad/impl/standard/table.less');

goog.include('ad/impl/standard/b3.less');

goog.provide('ad.impl.standard.B3');

ad.Debug(function(async){

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

    var widgets = [
        new ad.widget.H1(AD_CONFIG['head'])
    ];

    // 样式C和样式B的区别就是少了一个color-list
    var options = ad.base.getObjectByName('list.options', AD_CONFIG);
    if (options && options.length) {
        widgets.push(new ad.widget.Colorlist(AD_CONFIG['list']));
    }
    widgets.push(new ad.widget.Table(gridDataAdapter(AD_CONFIG['table']['tbody'])));

    var material = new ad.material.BaseMaterial();
    material.setWidgets(widgets);

    if (async === true) {
        return material;
    }

    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
