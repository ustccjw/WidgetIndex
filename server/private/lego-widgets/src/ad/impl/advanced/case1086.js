/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1086.js ~ 2013/11/28 22:21:24
 * @author chenli11@baidu.com (chenli11)
 * @version $Revision: 11222 $
 * @description
 * case1086相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/advanced/case1086.less');

goog.provide('ad.impl.advanced.Case1086');

ad.Debug(function(async){
    function getVideoConfig(index) {
        var item = AD_CONFIG['small_head']['image_group_head']['options'][index];
        var videoUrl = item['video_url'];
        var imageUrl = item['img_url'];
        if (index !== 0) {
            // getVideoConfig(0)的时候必须有视频呀
            if (!videoUrl) {
                return null;
            }
        }

        var cfg = {
            "rcv_url": item['img_rcv_url'],
            "img_url": imageUrl,
            "video_url": videoUrl,
            "ipad_img": imageUrl,
            "width": 220,
            "is_play": false,
            "height": 190
        };

        return cfg;
    }
    
    var material = new ad.material.BaseMaterial();
    var video = new ad.widget.Video(getVideoConfig(0));
    
    //第一张小图是否显示视频脚标
    var dispayFirstTip = false;
    var options = AD_CONFIG['small_head']['image_group_head']['options'];
    for(var i = 1; i < options.length; i++) {
        if(options[i] && options[i]['video_url']){
            //有两个以上视频，显示视频脚标
            dispayFirstTip = true;
            options[i]['tip'] = "&nbsp;";
        }
    }
    if(dispayFirstTip){
        options[0]['tip'] = '&nbsp;';
    }
    
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var section = new ad.widget.Section(AD_CONFIG['section']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);

    smallHead.addListener(ui.events.CLICK, function(index, evt){
        var videoConfig = getVideoConfig(index);
        if (dispayFirstTip && videoConfig) {
            videoConfig['is_play'] = true;
            video.setData(videoConfig);
            video.refresh();
            return false;
        }
        return true;
    });
    material.setWidgets([video, smallHead], section, buttonGroup);
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
