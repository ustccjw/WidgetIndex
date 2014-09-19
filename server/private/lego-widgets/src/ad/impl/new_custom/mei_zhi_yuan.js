/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: guolinaiyou.js 150523 2013-06-05 14:06:00Z  fanxueliang$
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/mei_zhi_yuan.js ~ 2014/07/21 10:55:52
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * coca2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Image');
goog.require('ad.widget.Title');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/new_custom/mei_zhi_yuan.less');

goog.provide('ad.impl.new_custom.MeiZhiYuan');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var video = new ad.widget.Video(AD_CONFIG['video']);
    if(AD_CONFIG['title']['logoimg'] && !AD_CONFIG['title']['logoimg']['logoimg']){
        delete AD_CONFIG['title']['logoimg'];
    }
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var head = new ad.widget.SmallHead(AD_CONFIG['head']);

    var productsConfig = AD_CONFIG['products']['options'];
    var floatVideos = new Array(productsConfig.length);
    var floatWindows = new Array(productsConfig.length);
    var initedFloatWindowLog = new Array(productsConfig.length);
    var lastFloatWindowId = -1;
    // imageNormal 点击行为
    for (var i = 0; i < productsConfig.length; i++) {
        if ('url' in productsConfig[i]['click_behavior']) {
            // 链接跳转
            productsConfig[i]['rcv_url'] 
                = productsConfig[i]['click_behavior']['url']['rcv_url'];
        } else if ('layer' in productsConfig[i]['click_behavior']) {
            // 出视频浮层
            productsConfig[i]['rcv_url'] = '###';
            // i 用于确定fwc对应哪一个product
            floatVideos[i] = new ad.widget.Video(productsConfig[i]['click_behavior']['layer']['float_video']);
            floatWindows[i] = new ad.widget.FloatWindowContainer(productsConfig[i]['click_behavior']['layer']);
            floatWindows[i].setWidgets(floatVideos[i]);
            initedFloatWindowLog[i] = false;
        }
    }
    // 用于setWidgets，移除了空白项
    var floatWindowsForShow = [];
    for (var i = 0; i < floatWindows.length; i++) {
        if (floatWindows[i]) {
            floatWindowsForShow.push(floatWindows[i]);
        }
    };
    
    var products = new ad.widget.ImageNormal(AD_CONFIG['products']);

    var img = new ad.widget.Image(AD_CONFIG['image']);

    var app;
    // 因为 SPEC 中会有 defaultValue 导致及时没有填写，app 也不为空
    // 这样就还是会创建 app，所以增加了检测 src
    if(AD_CONFIG['app'] && AD_CONFIG['app']['src']) {
        app = new ad.widget.Flash(AD_CONFIG['app']);
    }

    var widgets = [
        [title],
        [
            [video],
            [
                head,
                products
            ]
        ],
        [img]
    ];

    if (app) {
        widgets.push([app]);
    }

    if (floatWindowsForShow) {
        widgets.push(floatWindowsForShow);
    }

    material.setWidgets.apply(material, widgets);

    if (async === true) {
        return material;
    }
    material.show();
    
    if(app) {
        baidu.hide(app.getRoot());
        img.addListener(ui.events.CLICK, function(){
            baidu.show(app.getRoot());
            img.sendLog("app_float_open", "app_float_open");
            return false;
        });
        var div = baidu.dom.create('div', {"class": "ec-float-close"});
        baidu.g(app.getId('flash')).appendChild(div);
        baidu.on(div, 'click', function(){
            baidu.hide(app.getRoot());
        });
    }

    // 点击出浮层
    products.addListener(ui.events.CLICK, function(index) {
        // 出浮层返回true，则不跳转链接
        return !showFloatWindow(index)
    });

    // 浮层关闭时清理Flash (For IE)
    ad.base.forEach(floatWindowsForShow, function(floatWindow) {
        floatWindow.addListener(ui.events.CLOSE, function(index) {
            hideFloatWindows();
        });
    });

    function showFloatWindow(index) {
        if (floatWindows[index]) {
            if (lastFloatWindowId == index) {
                return true;
            }

            hideFloatWindows();
            floatWindows[index].show();

            // 重新渲染Flash
            ad.base.setTimeout(function() {
                floatVideos[index].refresh(null);
            }, 10);

            lastFloatWindowId = index;

            // 统计
            var canvas;
            for (var i = floatWindows.length - 1; i >= 0; i--) {
                if (!initedFloatWindowLog[i] && floatWindows[i]) {
                    canvas = baidu.dom.first(floatWindows[i].getRoot());
                    if (canvas && canvas.id) {
                        material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                        initedFloatWindowLog[i] = true;
                    }
                }
            };

            return true;
        } else {
            lastFloatWindowId = -1;
            return false;
        }
    }

    function hideFloatWindows() {
        ad.base.forEach(floatWindowsForShow, function(floatWindow) {
            floatWindow.hide();
        });
        ad.base.forEach(floatVideos, function(floatVideo) {
            if (floatVideo) {
                floatVideo.clearRoot();
            }
        });
        lastFloatWindowId = -1;
    }

    return material;
});