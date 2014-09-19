/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/grand_media/double_screen.js ~ 2014/06/05 15:45:19
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * double_screen相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');

goog.include('ad/impl/grand_media/double_screen.less');

goog.provide('ad.impl.grand_media.DoubleScreen');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var imageConf = AD_CONFIG['image'];
    var image = new ad.widget.Image(imageConf);
    material.setWidgets(
        [image]
    );

    if (async === true) {
        return material;
    }

    material.show();

    var useHover = imageConf['use_hover'];
    var qrDomStr = '<div id="ec-double-screen-qr" class="ec-qrcode"></div>';
    if (useHover) {
        // image.sendLog('隐藏型展现');
        image.rewriteTitle2(null, '隐藏型');
        //隐藏型入口
        var imageLayer = baidu.g(image.getId('image-layer'));
        var isBlink = imageConf['blink'];
        var tipPos = imageConf['tip_pos'];
        baidu.addClass(imageLayer, 'ec-image-layer-has-hover');
        if('left' == tipPos) {
            baidu.addClass(imageLayer, 'ec-image-layer-left');
        }

        var interDomStr = '<div class="ec-icon"></div>' +
            '<div class="ec-desc-wrap">' +
                '<div class="ec-title">' + imageConf['hover_tip']['title'] +
                '</div>' +
                '<div class="ec-desc">' + imageConf['hover_tip']['description']
                 + '</div>' +
            '</div>' + qrDomStr;

        baidu.dom.insertHTML(imageLayer, 'beforeEnd', interDomStr);
        var isEntered = false;
        ad.dom.enter(imageLayer, function(e) {
            if (isEntered) {
                return;
            }
            createConnect(true)
            baidu.addClass(imageLayer, 'ec-image-layer-hover');
            isEntered = true;
        });
        //ad.dom.leave(imageLayer, function(e) {
        //    baidu.removeClass(imageLayer, 'ec-image-layer-hover');
        //});
        if (isBlink) {
            var tipDom = baidu.dom.first(imageLayer);
            function blinkBlink() {
                if(tipDom && !isEntered) {
                    if(baidu.dom.hasClass(tipDom, 'ec-light')) {
                        baidu.dom.removeClass(tipDom, 'ec-light');
                    } else {
                        baidu.dom.addClass(tipDom, 'ec-light');
                    }
                    ad.base.setTimeout(blinkBlink, 1000);
                }
            }
            blinkBlink();
        }
    } else {
        image.sendLog('嵌入型展现');
        image.rewriteTitle2(null, '嵌入型');
        baidu.dom.insertHTML(baidu.dom.first(image.getRoot()), 'beforeEnd', qrDomStr);
        createConnect();
    }

    function refreshImage(newImg, noLink) {
        var newImageConf = {};
        ad.base.extend(newImageConf, imageConf);
        newImageConf['image_url'] = newImg;
        if(noLink) {
            newImageConf['image_rcv_url'] = null;
        } else {
            newImageConf['image_rcv_url'] = imageConf['image_rcv_url'];
        }
        image.refresh(null, newImageConf);
        baidu.addClass(baidu.dom.first(image.getRoot()), 'ec-image-connected');
    }

    function addCallbackText(msg) {
        var textDomStr = '<div class="ec-image-callback-text">您的长相达到 ' 
            + (msg['face_rate'] || '') + ' 分 ！按外貌协会规定，你领到 '
            + (msg['coupon_value'] || '') + ' 元外卖现金！</div>';
        baidu.dom.insertHTML(baidu.dom.first(image.getRoot()), 'beforeEnd', textDomStr);
    }

    var genToken;
    var hasQR = false;
    var waiting = [];
    var QRCode = null;
    // 二维码
    function makeQR(token) {
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
        var qrcode = new QRCode('ec-double-screen-qr', {
            text: AD_CONFIG['config']['mobile_url'] + "?muses_scepter=" + genToken,
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
        function(tool) {
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
            function(Connect) {
                // 创建一个连接实例
                var connect = new Connect();
                var isConn = false;

                connect['createToken']()
                    .then(function(token) {
                        genToken = token;
                        makeQR(token);
                        if (isHover) {
                            image.sendLog("隐藏式展示二维码");
                        } else {
                            image.sendLog("嵌入式展示二维码");
                        }
                        makeConnect(token);
                    })

                function makeConnect(token) {
                    connect['connectWith'](token)
                        .then(function() {

                            // 接收消息
                            connect['onMessage'] = function(msg) {
                                var status = msg && msg['status'];
                                if (!status) {
                                    return;
                                }
                                switch (status) {
                                    case 'start':
                                        image.sendLog((isHover ? '隐藏式' : '嵌入式') + '扫二维码开始游戏');
                                        refreshImage(imageConf['connect_image_url'], true);
                                        break;
                                    case 'end':
                                        image.sendLog((isHover ? '隐藏式' : '嵌入式') + '游戏结束');
                                        refreshImage(imageConf['callback_image_url']);
                                        addCallbackText(msg);
                                        connect['destroy']();
                                        break;

                                }
                            };
                        })
                        .fail(function(err) {});
                }
            },
            true
        );
    }
});



/* vim: set ts=4 sw=4 sts=4 tw=100 : */
