/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tagcloud3d.js ~ 2014/04/11 16:52:04
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * tagcloud3d相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');
goog.require('ad.widget.Flash');

goog.include('ad/impl/tagcloud3d.less');

goog.provide('ad.impl.Tagcloud3d');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial(AD_CONFIG['id']);
    var image = new ad.widget.Image(AD_CONFIG['image']);
    AD_CONFIG['flash']['ipad_img'] = AD_CONFIG['image']['image_url'];
    AD_CONFIG['flash']['ipad_link_rcv_url'] = AD_CONFIG['image']['image_rcv_url'];
    var tagsConfig = createTagsData(AD_CONFIG['flash']['tags']);
    AD_CONFIG['flash']['flashvars_param'] = tagsConfig;
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);

    material.setWidgets(
        [image, flash]
    );
    if (async === true) {
        return material;
    }
    material.show();

    flash.addListener('FLASH_tag_clicked', function(text) {
        flash.sendLog('链接点击:' + text);
    });

    function createTagsData(tagsConfig) {
        var string = '{"tag": [';
        ad.base.forEach(tagsConfig, function(item) {
            string += baidu.json.stringify(item) + ',';
        });
        string = string.slice(0, -1);
        string += ']}';
        return '&tagstring=' + encodeURIComponent(string);
    }

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */