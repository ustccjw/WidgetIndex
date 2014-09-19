/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/galaxy/jyhy/left.js ~ 2014/04/08 14:18:43
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * left相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.gx_sck.jyhy.CardMain');
goog.require('ad.widget.gx_sck.jyhy.Table');

goog.include('ad/impl/galaxy/jyhy/left.less');

goog.provide('ad.impl.galaxy.jyhy.Left');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    var cardMain = new ad.widget.gx_sck.jyhy.CardMain(AD_CONFIG['card']);
    var table = new ad.widget.gx_sck.jyhy.Table(AD_CONFIG['table']);

    material.setWidgets(
        [cardMain],
        [table]
    );

    if (async === true) {
        return material;
    }
    material.show();

    //官网和V认证
    window['ecom_gx_ylzx_info'] = function(data){
        if(data){
            if(data['is_show_site']){
                cardMain.showSite();
            }
        }
    }

    baidu.sio.callByServer(AD_CONFIG['ader_info'], function(){});

});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
