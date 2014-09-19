/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/weipinghui.js ~ 2014/08/12 17:13:39
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * weipinghui相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.bmw.Poster');
goog.require('ad.widget.bmw.ImageList');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.SmallHead');

goog.include('ad/impl/new_custom/weipinghui.less');

goog.provide('ad.impl.new_custom.Weipinghui');

ad.Debug(function(async) {
    // 处理数据
    var postersData = AD_CONFIG['posters'];
    var imageListData = [];
    var posterInstances = [];
    for (var i = 0; i < postersData.length; ++i) {
        posterInstances.push(new ad.widget.bmw.Poster(postersData[i]));
        imageListData.push({
            'text': postersData[i]['title'],
            'img_url': postersData[i]['thumb_url'],
            'rcv_url': postersData[i]['rcv_url']
        });
        for (var j = postersData[i]['links'].length - 1; j >= 0; --j) {
            postersData[i]['links'][j]['rcv_url'] 
                = postersData[i]['text_rcv_url'];
        }
    }
    imageListData = { 'options' : imageListData };
    imageListData['width'] = AD_CONFIG['width'];

    // 生成 Widget 实例
    var material = new ad.material.BaseMaterial();
    var normalContainer = new ad.widget.NormalContainer({});
    var imageList = new ad.widget.bmw.ImageList(imageListData);

    normalContainer.setWidgets(posterInstances);

    material.setWidgets(
        [ normalContainer ],
        [ imageList ],
        [ new ad.widget.SmallHead(AD_CONFIG['small_head']) ]
    );


    if (async === true) {
        return material;
    }

    material.show();


    // 图片切换
    var hideAllPosters = function () {
        baidu.each(posterInstances, function (elem, index) {
            elem.hide();
        });
        imageList.deactivate();
    };

    var showPoster = function (index) {
        posterInstances[index].show();
        imageList.activate(index);
    };

    var currentIndex;

    var switchToPoster = function (index) {
        hideAllPosters();
        showPoster(index);
        currentIndex = index;
        imageList.sendLog('imageList[' + index + ']switched');
    };

    var indexCount = posterInstances.length;
    var loopInterval = AD_CONFIG['interval'] || 2000;
    var loopTimer;
    var delayTimeout = 400;
    var delayTimer;

    var switchToNextPoster = function () {
        currentIndex = ++currentIndex % indexCount;
        switchToPoster(currentIndex);
    };

    var setAutoLoop = function () {
        loopTimer = ad.base.setInterval(switchToNextPoster, loopInterval);
    };

    var cancelAutoLoop = function () {
        ad.base.clearInterval(loopTimer);
    };

    var setDelaySwitch = function (index) {
        delayTimer = ad.base.setTimeout(function () {
            switchToPoster(index);
        }, delayTimeout);
    };

    var cancelDelaySwitch = function () {
        ad.base.clearTimeout(delayTimer);
    };

    switchToPoster(0);
    setAutoLoop();

    imageList.addListener(ui.events.CLICK, function(index) {
        cancelAutoLoop();
        if (index !== currentIndex) {
            switchToPoster(index);
        }
        return false;
    });

    imageList.addListener(ui.events.MOUSE_OVER, function(index) {
        cancelAutoLoop();
        cancelDelaySwitch();
        if (index !== currentIndex) {
            imageList.deactivate(currentIndex);
            setDelaySwitch(index);
        }
    });

    imageList.addListener(ui.events.MOUSE_OUT, function(index) {
        cancelDelaySwitch();
        setAutoLoop();
    });

    baidu.each(posterInstances, function (poster, index) {
        poster.addListener(ui.events.MOUSE_OVER, function() {
            cancelAutoLoop();
        });

        poster.addListener(ui.events.MOUSE_OUT, function() {
            setAutoLoop();
        });

        poster.rewriteTitle2(null, '第' + (index + 1) + '张', false);
    });

});















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
