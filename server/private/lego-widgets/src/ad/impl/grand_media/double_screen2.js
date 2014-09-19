/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/grand_media/double_screen2.js ~ 2014/07/11 14:25:08
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * double_screen2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');

goog.include('ad/impl/grand_media/double_screen2.less');

goog.provide('ad.impl.grand_media.DoubleScreen2');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var imageConf = AD_CONFIG['image'];
    var coverConf = ad.base.getObjectByName("interactive.cover", imageConf);
    var hiddenConfig = ad.base.getObjectByName("type.hidden", imageConf);
    
    if (hiddenConfig) {
        imageConf['tip'] = hiddenConfig['tip'];
    }
    var image = new ad.widget.Image(imageConf);
    material.setWidgets(
        [image]
    );

    if (async === true) {
        return material;
    }

    material.show();

    var genToken;
    var hasQR = false;
    var waiting = [];
    var QRCode = null;
    var imageSize = imageConf['image_size'] || "1";
    var imageWrap = $(image.getRoot()).children().first();
    imageWrap.addClass('ad-widget-image-size' + imageSize);

    var qrDomStr = '<div id="ec-double-screen-qr" class="ec-qrcode"></div>';
    
    if (hiddenConfig) {
        // image.sendLog('隐藏型展现');
        image.rewriteTitle2(null, '隐藏型');
        //隐藏型入口
        var imageLayer = $('#' + image.getId('image-layer'));
        var isBlink = hiddenConfig['blink'];
        var tipPos = hiddenConfig['tip_pos'];
        imageLayer.addClass('ec-image-layer-has-hover');
        if('left' == tipPos) {
            imageLayer.addClass('ec-image-layer-left');
        }

        var interDomStr = '<div class="ec-icon"></div>' +
            '<div class="ec-desc-wrap">' +
                '<div class="ec-title">' + hiddenConfig['hover_tip']['title'] +
                '</div>' +
                '<div class="ec-desc">' + hiddenConfig['hover_tip']['description']
                 + '</div>' +
            '</div>' + qrDomStr;

        imageLayer.append(interDomStr);
        var isEntered = false;
        ad.dom.enter(imageLayer[0], function(e) {
            if (isEntered) {
                return;
            }
            if (coverConf) { //双屏交互时才需要Connect模块
                createConnect(true)
            } else {
                makeQR(null);
            }
            imageLayer.addClass('ec-image-layer-hover');
            isEntered = true;
        });
        //ad.dom.leave(imageLayer[0], function(e) {
        //    imageLayer.removeClass('ec-image-layer-hover');
        //});
        if (isBlink) {
            var tipDom = imageLayer.children().first();
            function blinkBlink() {
                if(tipDom && !isEntered) {
                    if(tipDom.hasClass('ec-light')) {
                        tipDom.removeClass('ec-light');
                    } else {
                        tipDom.addClass('ec-light');
                    }
                    ad.base.setTimeout(blinkBlink, 1000);
                }
            }
            blinkBlink();
        }
    } else {
        var embedConfig = ad.base.getObjectByName("type.embed", imageConf);
        var lPos = embedConfig['left'];
        var tPos = embedConfig['top'];
        image.sendLog('嵌入型展现');
        image.rewriteTitle2(null, '嵌入型');
        imageWrap.append(qrDomStr);
        imageWrap.find('#ec-double-screen-qr').css({"left": lPos, "top": tPos});
        if (coverConf) { //双屏交互时才需要Connect模块
            createConnect();
        } else {
            makeQR(null);
        }
    }

    function refreshImage(newImg, noLink) {
        if (!newImg) {
            return;
        }
        var newImageConf = {};
        ad.base.extend(newImageConf, imageConf);
        newImageConf['image_url'] = newImg;
        if(noLink) {
            newImageConf['image_rcv_url'] = null;
        } else {
            newImageConf['image_rcv_url'] = imageConf['image_rcv_url'];
        }
        image.refresh(null, newImageConf);
        imageWrap.addClass('ec-image-connected');
    }

    function addCallbackText(msg) {
        var textDomStr = '<div class="ec-image-callback-text">您的长相达到 ' 
            + (msg['face_rate'] || '') + ' 分 ！按外貌协会规定，你领到 '
            + (msg['coupon_value'] || '') + ' 元外卖现金！</div>';
        imageWrap.append(textDomStr);
    }

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
        var qrcode = new QRCode('ec-double-screen-qr', {
            text: AD_CONFIG['config']['mobile_url'] + (genToken ? "?muses_scepter=" + genToken : ''),
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
                                        refreshImage(coverConf['connect_image_url'], true);
                                        break;
                                    case 'end':
                                        image.sendLog((isHover ? '隐藏式' : '嵌入式') + '游戏结束');
                                        refreshImage(coverConf['callback_image_url']);
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





/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */