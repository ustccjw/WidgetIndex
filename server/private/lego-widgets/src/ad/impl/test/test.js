/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: lv.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/lv.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.service.CodemonkeyService');
goog.include('ad/impl/test/test.less');

goog.provide('ad.impl.test.Test');


/**
 * @define {string}
 */
var AD_VERSION = 'AD_VERSION';

/**
 * @define {number}
 */
var AD_FOO = 1234;

/**
 * @define {boolean}
 */
var AD_BAR = false;

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.ButtonGroup(AD_CONFIG['buttons'])]
    );

    if (async !== true) {
        material.show();
    }

    var service = new ad.service.CodemonkeyService('12', 'd719b9f0b7ecbd26be7a20ec726ab636');
    service.add(function(err, object){
        if (err) {
            console.log(err);
        }
        else {
            service.get(function(err, object){
                if (err) {
                    console.log(err);
                } else {
                    console.log(object);
                }
            });
        }
    });
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
