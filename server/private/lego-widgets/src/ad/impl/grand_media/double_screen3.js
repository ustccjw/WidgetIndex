/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/


/**
 * src/ad/impl/grand_media/double_screen3.js ~ 2014/07/11 14:25:08
 * @author dingguoliang01@baidu.com (Tingkl)
 * @version $Revision: 150523 $
 * @description
 * double_screen3相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');
goog.require('ad.widget.Video');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FloatWindowContainer');
goog.include('ad/impl/grand_media/double_screen3.less');

goog.provide('ad.impl.grand_media.DoubleScreen3');

ad.Debug(function (async) {
    var material = new ad.material.BaseMaterial();
    var bannerConf = AD_CONFIG['banner'];
    var fwcConf = AD_CONFIG['fwc'];
    var fwc = new ad.widget.FloatWindowContainer(fwcConf);
    var content = ad.base.getObjectByName('content', fwcConf);
    var fwcVideo;
    var fwcImg;
    if ('video' in content) {
        fwcVideo = new ad.widget.Video(content['video']);
        fwc.setWidgets([fwcVideo]);
    }
    else {
        fwcImg = new ad.widget.Image(content['image']);
        fwc.setWidgets([fwcImg]);
    }
    var imageConf = ad.base.getObjectByName('image', bannerConf);
    var flashConf = ad.base.getObjectByName('flash', bannerConf);
    var image;
    var flash;
    var logger;
    var coverConf;
    var hiddenConfig;
    if (flashConf) {
        coverConf = ad.base.getObjectByName('interactive.cover', flashConf);
        hiddenConfig = ad.base.getObjectByName('hidden', flashConf);
        flash = new ad.widget.Flash(flashConf);
        logger = flash;
        material.setWidgets(
            [flash],
            [fwc]
        );
    }
    else {
        coverConf = ad.base.getObjectByName('interactive.cover', imageConf);
        hiddenConfig = ad.base.getObjectByName('type.hidden', imageConf);
        if (hiddenConfig) {
            imageConf['tip'] = hiddenConfig['tip'];
        }
        image = new ad.widget.Image(imageConf);
        logger = image;
        material.setWidgets(
            [image],
            [fwc]
        );
    }

    if (async === true) {
        return material;
    }

    material.show();

    logger.addListener(ui.events.CLICK, function () {
        logger.sendLog('banner_click');
        return true;
    });


    if (fwcVideo) {
        fwcVideo.addListener(ui.events.VIDEO_START, function () {
            fwcVideo.sendLog('floatvideostart');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_FINISH, function () {
            fwcVideo.sendLog('floatvideofinish');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_PAUSE, function () {
            fwcVideo.sendLog('floatvideopause');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function () {
            fwcVideo.sendLog('floatvideocontinue');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_AUTO, function () {
            fwcVideo.sendLog('floatvideoauto');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_CLICK, function () {
            fwcVideo.sendLog('floatvideoclick');
            return false;
        });
    }
    else if (fwcImg) {
        fwcImg.addListener(ui.events.CLICK, function () {
            fwcImg.sendLog('floatgifclick');
            return false;
        });
    }
    fwc.addListener(ui.events.CLOSE, function () {
        fwc.sendLog('floatclose');
        hideFWC();
        return false;
    });

    var fwcRenderd = false;

    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if (!fwc) {
            return;
        }
        fwc.show();
        if (fwcVideo) {
            fwcVideo.refresh(null, AD_CONFIG['fwc']['video']);
        }
        if (!fwcRenderd) {
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                // material.getCMS().init(canvas.id);
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
    }


    var genToken;
    var hasQR = false;
    var waiting = [];
    var QRCode = null;
    // 二维码
    function makeQR(token) {
        genToken = token;
        if (QRCode == null) {
            waiting.push(token);
            return;
        }
        if (hasQR) {
            return;
        }
        hasQR = true;
        var ie6 = navigator.userAgent.indexOf('MSIE 6') >= 0;
        var width = ie6 ? 92 : 86;
        var height = ie6 ? 90 : 86;
        return new QRCode('ec-double-screen-qr', {
            text: AD_CONFIG['config']['mobile_url'] + (genToken ? '?muses_scepter=' + genToken : ''),
            'width': width,
            'height': height,
            'colorDark': '#000000',
            'colorLight': '#ffffff',
            'correctLevel': QRCode['CorrectLevel']['L']
        });
    }

    ad.base.require(
        'muses/tool',
        'http://ecma.bdimg.com/lego-mat/muses/tool.js',
        function (tool) {
            QRCode = tool['QRCode'];
            for (var i = 0; i < waiting.length; i++) {
                makeQR(waiting[i]);
            }
            waiting = [];
        },
        true
    );

    // 加载Connect模块
    function createConnect(isHover) {
        ad.base.require(
            'muses/connect',
            'http://ecma.bdimg.com/lego-mat/muses/connect.js',
            function (Connect) {
                // 创建一个连接实例
                var connect = new Connect();
                connect['createToken']()
                    .then(function (token) {
                        makeQR(token);
                        if (isHover) {
                            logger.sendLog('qrcode_pv');
                        }
                        else {
                            logger.sendLog('embed_qrcode_pv');
                        }
                        makeConnect(token);
                    });

                function makeConnect(token) {
                    connect['connectWith'](token)
                        .then(function () {
                            // 接收消息
                            connect['onMessage'] = function (msg) {
                                var type = msg && msg['type'];
                                if (!type) {
                                    return;
                                }
                                switch (type) {
                                    case 'open':
                                        logger.sendLog('qrcode_scan');
                                        showFWC();
                                        connect['send']({ type: 'opened' });
                                        break;
                                    case 'close':
                                        logger.sendLog('app_mid_click');
                                        connect['destroy']();
                                        break;
                                }
                            };
                        })
                        .fail(function (err) {
                        });
                }
            },
            true
        );
    }

    if (flashConf) {
        var isBlink = hiddenConfig['blink'];
        var hoverTip = hiddenConfig['hover_tip'];
        var flashWrap = baidu.dom.first(flash.getRoot());
        var hoverLayer = document.createElement('a');
        baidu.dom.setAttr(hoverLayer, 'target', '_blank');
        baidu.dom.setAttr(hoverLayer, 'hidefocus', 'hidefocus');
        baidu.dom.setAttr(hoverLayer, 'href', flashConf['link_rcv_url']);
        baidu.dom.setAttr(hoverLayer, 'title2', '二维码浮层');
        ad.dom.addClass(hoverLayer, 'ec-image-layer-float');
        hoverLayer.innerHTML = '<div id="ec-double-screen-qr" class="ec-qrcode-left"></div><p class="ec-style-1">' +
            hoverTip['title'] + '</p><p class="ec-style-2">' +
            hoverTip['description1'] + '</p><p class="ec-style-2">' +
            hoverTip['description2'] + '</p>';
        flashWrap.appendChild(hoverLayer);
        flash.rewriteTitle2(null, '隐藏浮层型');
        var maskLayer = ad.dom.g(flash.getId('link'));
        var flashLayer = document.createElement('div');
        flashLayer.innerHTML = '<div class="ad-widget-mask-layer"></div>' +
            '<div class="ad-widget-fake-layer">' +
            '<span>' + hiddenConfig['tip'] + '</span><div class="ec-icon"></div></div>';
        ad.dom.addClass(flashLayer, 'ad-widget-trigger-layer');
        var isEntered = false;
        flashWrap.appendChild(flashLayer);
        ad.dom.hover(flashWrap, function (e) {
            ad.dom.addClass(maskLayer, 'ec-image-layer-mask');
            ad.dom.addClass(flashLayer, 'ec-image-layer-hide');
            baidu.dom.setStyle(hoverLayer, 'display', 'block');
            if (isEntered) {
                return;
            }
            if (coverConf) { // 双屏交互时才需要Connect模块
                createConnect(true);
            }
            else {
                makeQR(null);
            }
            isEntered = true;
        }, function () {
            baidu.dom.removeClass(maskLayer, 'ec-image-layer-mask');
            baidu.dom.removeClass(flashLayer, 'ec-image-layer-hide');
            baidu.dom.hide(hoverLayer);
        });

        if (isBlink) {
            var tipDom = baidu.dom.first(baidu.dom.last(flashLayer));
            var blinkBlink = function () {
                if (tipDom) {
                    if (ad.dom.hasClass(tipDom, 'ec-light')) {
                        baidu.dom.removeClass(tipDom, 'ec-light');
                    }
                    else {
                        ad.dom.addClass(tipDom, 'ec-light');
                    }
                    ad.base.setTimeout(blinkBlink, 1000);
                }
            };
            blinkBlink();
        }
    }
    else {
        var imageSize = imageConf['image_size'] || '1';
        var imageWrap = baidu.dom.first(image.getRoot());
        ad.dom.addClass(imageWrap, 'ad-widget-image-size' + imageSize);
        var screenQr = document.createElement('div');
        ad.dom.addClass(screenQr, 'ec-qrcode');
        baidu.dom.setAttr(screenQr, 'id', 'ec-double-screen-qr');

        if (hiddenConfig) {
            image.rewriteTitle2(null, '隐藏型');
            // 隐藏型入口
            var imageLayer = ad.dom.g(image.getId('image-layer'));
            var isBlink = hiddenConfig['blink'];
            var tipPos = hiddenConfig['tip_pos'];
            ad.dom.addClass(imageLayer, 'ec-image-layer-has-hover');
            if ('left' === tipPos) {
                ad.dom.addClass(imageLayer, 'ec-image-layer-left');
            }

            var ecIcon = document.createElement('div');
            ad.dom.addClass(ecIcon, 'ec-icon');
            imageLayer.appendChild(ecIcon);
            var ecDescWrap = document.createElement('div');
            ad.dom.addClass(ecDescWrap, 'ec-desc-wrap');
            ecDescWrap.innerHTML = '<div class="ec-title">' + hiddenConfig['hover_tip']['title'] +
                '</div>' +
                '<div class="ec-desc">' + hiddenConfig['hover_tip']['description']
                + '</div>';
            imageLayer.appendChild(ecDescWrap);
            imageLayer.appendChild(screenQr);
            var isEntered = false;
            ad.dom.enter(imageWrap, function (e) {
                if (isEntered) {
                    return;
                }
                if (coverConf) { // 双屏交互时才需要Connect模块
                    createConnect(true);
                }
                else {
                    makeQR(null);
                }
                ad.dom.addClass(imageLayer, 'ec-image-layer-hover');
                isEntered = true;
            });

            if (isBlink) {
                var tipDom = baidu.dom.first(imageLayer);
                var blinkBlink = function () {
                    if (tipDom && !isEntered) {
                        if (ad.dom.hasClass(tipDom, 'ec-light')) {
                            baidu.dom.removeClass(tipDom, 'ec-light');
                        }
                        else {
                            ad.dom.addClass(tipDom, 'ec-light');
                        }
                        ad.base.setTimeout(blinkBlink, 1000);
                    }
                };
                blinkBlink();
            }
        }
        else {
            var embedConfig = ad.base.getObjectByName('type.embed', imageConf);
            var lPos = embedConfig['left'] + 'px';
            var tPos = embedConfig['top'] + 'px';
            image.sendLog('qrcode_pv');
            image.rewriteTitle2(null, '嵌入型');
            imageWrap.appendChild(screenQr);
            baidu.dom.setStyle(screenQr, 'left', lPos);
            baidu.dom.setStyle(screenQr, 'top', tPos);
            if (coverConf) { // 双屏交互时才需要Connect模块
                createConnect();
            }
            else {
                makeQR(null);
            }
        }
    }
});


/* vim: set ts=4 sw=4 sts=4 tw=100 note: */
