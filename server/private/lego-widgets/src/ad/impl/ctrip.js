/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: ctrip.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/ctrip.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Ctrip');
goog.require('ad.widget.Table');
goog.require('ui.events');

goog.include('ad/impl/ctrip.less');

goog.provide('ad.impl.Ctrip');


ad.Debug(function(async) {
    function getTableConfig(data) {
        var config = {};
        config['head'] = data['tbody'][0];
        config['body'] = [];
        for (var i = 1; i < data['tbody'].length; i ++) {
            config['body'].push({
                'tr': data['tbody'][i]
            });
        }
        return config;
    }

    var material = new ad.material.BaseMaterial(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['head'])],
        [new ad.widget.Ctrip(AD_CONFIG['ctrip'])],
        [new ad.widget.Table(getTableConfig(AD_CONFIG['table']))]
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
