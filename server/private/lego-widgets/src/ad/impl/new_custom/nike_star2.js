/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/nike_star2.js ~ 2014/06/16 11:19:57
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * nike_star2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.standard.Video');
goog.require('ad.widget.tieba.Text');
goog.require('ad.widget.gear.Roller');
goog.require('ad.widget.gear.Slider');
goog.require('ad.widget.BaiduShareV2');

goog.include('ad/impl/new_custom/nike_star2.less');

goog.provide('ad.impl.new_custom.NikeStar2');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var bgImage = new ad.widget.ImageLink(AD_CONFIG['image_link']);
    var tabCfg = AD_CONFIG['tab'];
    var tabCon1 = tabCfg['tab_con1'];
    var tabCon2 = tabCfg['tab_con2'];
    var tabCon3 = tabCfg['tab_con3'];
    var tabCon4 = tabCfg['tab_con4'];

    tabCfg['options'] = [];
    tabCfg['options'].push({
        "tab_title": tabCon1['tab_title']
    }, {
        "tab_title": tabCon2['tab_title']
    }, {
        "tab_title": tabCon3['tab_title']
    }, {
        "tab_title": tabCon4['tab_title']
    });

    var tab = new ad.widget.TabContainer(tabCfg);
    var norCont1 = new ad.widget.NormalContainer({});
    var norCont2 = new ad.widget.NormalContainer({});
    var norCont3 = new ad.widget.NormalContainer({});
    var norCont4 = new ad.widget.NormalContainer({});

    //tab1
    var video1 = new ad.widget.standard.Video(tabCon1['video']);
    var text1Cfg = {
        "texts": [tabCon1['video_text']]
    };
    ;
    var text1 = new ad.widget.tieba.Text(text1Cfg);
    var norCont1Widgets = [[video1, text1]];
    var share1Button = tabCon1['baidu_share']['cfg'];
    if ('true' in share1Button) {
        var config = share1Button['true'];
        norCont1Widgets.push(new ad.widget.BaiduShareV2(config));
    }
    norCont1.setWidgets(norCont1Widgets);

    //tab2
    var video2 = new ad.widget.standard.Video(tabCon2['video']);
    var bigImage = new ad.widget.ImageLink(tabCon2['video_image']);
    var norCont2Widgets = [video2, bigImage];
    var share2Button = tabCon2['baidu_share']['cfg'];
    if ('true' in share2Button) {
        var config = share2Button['true'];
        norCont2Widgets.push(new ad.widget.BaiduShareV2(config));
    }
    norCont2.setWidgets(norCont2Widgets);

    //tab3
    var video3 = new ad.widget.standard.Video(tabCon3['video']);
    var bigImage = new ad.widget.ImageLink(tabCon3['video_image']);
    var norCont3Widgets = [video3, bigImage];
    var share3Button = tabCon3['baidu_share']['cfg'];
    if ('true' in share3Button) {
        var config = share3Button['true'];
        norCont3Widgets.push(new ad.widget.BaiduShareV2(config));
    }
    norCont3.setWidgets(norCont3Widgets);

    //tab4
    var slider = new ad.widget.gear.Slider(tabCon4['slider']);
    var norCont4Widgets = [slider];
    var share4Button = tabCon4['baidu_share']['cfg'];
    if ('true' in share4Button) {
        var config = share4Button['true'];
        norCont4Widgets.push(new ad.widget.BaiduShareV2(config));
    }
    norCont4.setWidgets(norCont4Widgets);

    tab.setWidgets([norCont1, norCont2, norCont3, norCont4]);

    material.setWidgets([bgImage, tab]);

    if (async === true) {
        return material;
    }

    material.show();

    //tab1加百科链接
    var textDom = baidu.g(text1.getId());
    baidu.dom.insertHTML(baidu.dom.first(textDom), 'beforeEnd', 
        '<a href="' + tabCon1['video_baike_link'] + '" target="_blank" title2="TAB1百科链接">[查看人物百科]</a>');
    //add百科链接log
    baidu.event.on(textDom, ui.events.CLICK, function(e) {
        var evt = e || window.event;
        var element = evt.target || evt.srcElement;
        if('a' == element.nodeName.toLowerCase()) {
            text1.sendLog('TAB1人物百科链接click');
        }
    });

    //给video添加log
    function addVideoLog(video, tabNum) {
        video.addListener(ui.events.VIDEO_START, function() {
            video.sendLog('TAB' + tabNum + 'videostart');
            return false;
        });
        video.addListener(ui.events.VIDEO_PAUSE, function() {
            video.sendLog('TAB' + tabNum + 'videopause');
            return false;
        });

        video.addListener(ui.events.VIDEO_CONTINUE, function() {
            video.sendLog('TAB' + tabNum + 'videocontinue');
            return false;
        });
        video.addListener(ui.events.VIDEO_FINISH, function() {
            video.sendLog('TAB' + tabNum + 'videocomplete');
            return false;
        });
        video.addListener(ui.events.VIDEO_AUTO, function() {
            video.sendLog('TAB' + tabNum + 'videoauto');
            return false;
        });
    }

    addVideoLog(video1, 1);
    addVideoLog(video2, 2);
    addVideoLog(video3, 3);
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */