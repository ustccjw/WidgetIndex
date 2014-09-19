/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/ming_tu2.js ~ 2014/03/18 15:18:07
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * ming_tu2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.standard.TabCont');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.ImageNormal');

goog.include('ad/impl/ming_tu2.less');

goog.provide('ad.impl.MingTu2');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-ming-tu2'; 

    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.H1(AD_CONFIG['title']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var tabOptions = [];
    tabOptions.push({
        "tab_title": AD_CONFIG['img']['tab_title']
    });
    tabOptions.push({
        "tab_title": AD_CONFIG['iframe']['tab_title']
    });
    tabOptions.push({
        "tab_title": AD_CONFIG['tab_cont1']['tab_title']
    });
    tabOptions.push({
        "tab_title": AD_CONFIG['img_cartoon1']['tab_title']
    });
    tabOptions.push({
        "tab_title": AD_CONFIG['tab_cont2']['tab_title']
    });
    tabOptions.push({
        "tab_title": AD_CONFIG['img_cartoon2']['tab_title']
    });
    AD_CONFIG['tab']['options'] = tabOptions;

    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var img = new ad.widget.ImageLink(AD_CONFIG['img']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);
    var tabCont1 = new ad.widget.standard.TabCont(AD_CONFIG['tab_cont1']);
    var tabCont2 = new ad.widget.standard.TabCont(AD_CONFIG['tab_cont2']);
    var imgCartoon1 = new ad.widget.ImageCartoon(AD_CONFIG['img_cartoon1']);
    var imgCartoon2 = new ad.widget.ImageCartoon(AD_CONFIG['img_cartoon2']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);

    tab.setWidgets([img, iframe, tabCont1, imgCartoon1, tabCont2, imgCartoon2]);

    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc_videos']['options'][0]);
    var imageNormalOpts = [];
    baidu.array.each(AD_CONFIG['fwc_videos']['options'], function(option) {
        var imgConf = {
            'img_url': option['tip_img_url'],
            'text': option['tip_text']
        };
        imageNormalOpts.push(imgConf);
    });
    AD_CONFIG['image_normal']['options'] = imageNormalOpts;
    var imageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    var lastFWCVideoIndex;
    var cover;
    var arr_links;

    fwc.setWidgets([fwcVideo, imageNormal]);

    material.setWidgets(
        [title], 
        [leftVideo, smallHead], 
        [tab], 
        [buttons], 
        [fwc]
    );

    if (async === true) {
        return material;
    }

    material.show();

    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('leftvideostart');
        return false;
    });
    
    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(0);
        leftVideo.pause();
        leftVideo.sendLog('floatopen');
        leftVideo.sendLog('floatvideo1start');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('leftvideocomplete');
        return false;
    });

    smallHead.addListener(ui.events.CLICK, function(index, me) {
        leftVideo.pause();
        showFWC(index + 1);
        smallHead.sendLog("floatopen");
        smallHead.sendLog('floatvideo'+(index + 2) + 'start');
        return false;
    });

    fwc.addListener(ui.events.CLOSE, function() {
        baidu.dom.removeClass(arr_links[lastFWCVideoIndex], 'ec-current');
        hideFWC();
    });
     
    fwcVideo.addListener(ui.events.VIDEO_START, function() {
        fwcVideo.sendLog('floatvideo' + (lastFWCVideoIndex + 1) + 'start');
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_CLICK, function() {
        fwcVideo.sendLog('floatvideo' + (lastFWCVideoIndex + 1) + 'jump');
        //在ipad下手动跳转
        if(fwcVideo._data['is_ipad']){
            fwcVideo.redirect();
        }
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
        fwcVideo.sendLog('floatvideo' + (lastFWCVideoIndex + 1) + 'complete');
        return false;
    });

    imageNormal.addListener(ui.events.CLICK, function(index, e) {
        this.sendLog('floatButton' + (index + 1) + 'click');
        setCover(index);
        fwcVideo.refresh(null, AD_CONFIG['fwc_videos']['options'][index]);
        lastFWCVideoIndex = index;
        return false;
    });

    var fwcRenderd = false;

    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if (lastFWCVideoIndex == index) {
            return;
        }
        hideFWC();
        if (!fwc)
            return;
        //重绘浮层视频
        if (fwcVideo) {
            ad.base.setTimeout(function() {
                fwcVideo.refresh(null, AD_CONFIG['fwc_videos']['options'][index]);
            }, 10);
            fwc.show();
        }
        if(!arr_links) {
            arr_links = imageNormal.getRoot().getElementsByTagName('a');
            baidu.array.each(arr_links, function(link) {
                var play = baidu.dom.create('div', {
                    'class': 'ec-play'
                });
                play.innerHTML = '播放';
                link.appendChild(play);
            });
        }
        
        setCover(index);
        lastFWCVideoIndex = index;

        if (!fwcRenderd) {
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                fwcRenderd = true;
            }
        }
    }

    /**
     * 隐藏视频浮层
     */
    function hideFWC() {
        if (fwcVideo) {
            fwcVideo.clearRoot();
        }
        fwc.hide();
        lastFWCVideoIndex = -1;
    }

    function setCover(index) {
        if (!cover) {
            cover = baidu.dom.create('div', {
                'class': 'ec-cover'
            });
            cover.innerHTML = '播放中';
        }
        if (undefined !== lastFWCVideoIndex && lastFWCVideoIndex > -1) {
            baidu.dom.removeClass(arr_links[lastFWCVideoIndex], 'ec-current');
        }
        var link = arr_links[index];
        baidu.dom.addClass(link, 'ec-current');
        if (link) {
            link.appendChild(cover);
        }
    }

});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */