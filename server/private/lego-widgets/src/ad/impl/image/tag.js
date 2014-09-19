/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/image/tag.js ~ 2013/07/25 11:27:54
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * tag相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.image.Shiyan1');

goog.include('ad/impl/image/tag.less');

goog.provide('ad.impl.image.Tag');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    // material.setRender(new ad.render.RecursiveRender());
    var config = getADConfig(AD_CONFIG['shiyan1']);
    var widget = new ad.widget.image.Shiyan1(config);
    material.setWidgets(
        [widget]
    );

    function getADConfig(orgConfig){
    	var adConfig = {};
    	adConfig['seller_name'] = 'agoda';
    	//adConfig['url'] = orgConfig['show_url'];
    	adConfig['logo'] = orgConfig['logo_url'];
    	adConfig['more_url'] = orgConfig['site_url'];
    	adConfig['show_url'] = orgConfig['show_url'];
    	adConfig['options'] = [];
    	var len = orgConfig['ads'].length;
    	if(len){
    		for(var i = 0; i < len; i ++){
    			var option = {};
    			option['url'] = orgConfig['ads'][i]['click_url'];
    			option['src'] = orgConfig['ads'][i]['image_url'];
    			option['text'] = orgConfig['ads'][i]['desc'];
    			adConfig['options'].push(option);
    		}
    	}
    	return adConfig;
    }

    if(async !== true){
        material.show();
        //material.initMonitor(AD_CONFIG['main_url']);
    }
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
