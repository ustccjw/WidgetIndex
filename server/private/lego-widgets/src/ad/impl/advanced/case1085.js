/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1085.js ~ 2013/11/08 10:27:52
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * case1085相关的实现逻辑
 * 品牌专区-左侧视频样式（微博）
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/advanced/case1085.less');

goog.provide('ad.impl.advanced.Case1085');

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
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var tabBodies = [];
    for (var i = 0; i < AD_CONFIG['tab']['options'].length; i ++) {
        var item = AD_CONFIG['tab']['options'][i];
        var weibo = item['weibo'];
        if ('sina' in weibo) {
            tabBodies.push(new ad.widget.SmallWeibo(weibo['sina']));
        }
        else if ('qq' in weibo) {
            tabBodies.push(new ad.widget.QQWeibo(weibo['qq']));
        }
    }
    tab.setWidgets(tabBodies);

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
    material.setWidgets([video, smallHead], tab, buttonGroup);
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
