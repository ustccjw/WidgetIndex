/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/qtz_libai.js ~ 2014/06/26 17:34:23
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * qtz_libai相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Image');
goog.require('ad.widget.Section');
goog.require('ad.widget.BaiduShareV2');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.FullWindowContainer');
goog.require('ad.widget.Flash');

goog.include('ad/impl/qtz_libai.less');

goog.provide('ad.impl.QtzLibai');

ad.Debug(function(async) {

    var material = new ad.Material(AD_CONFIG['id']);
    var banner = new ad.widget.Image(AD_CONFIG['banner']);
    var htmlText = new ad.widget.HtmlText(AD_CONFIG['description']);
    var links = new ad.widget.Section(AD_CONFIG['links']);
    var shareButton = AD_CONFIG['baidu_share']['cfg'];
    var config = shareButton['true'];
    config['bds_more_first'] = true;
    var share = new ad.widget.BaiduShareV2(config);
    var fwc = new ad.widget.FullWindowContainer(AD_CONFIG['fwc']);
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    fwc.setWidgets([flash]);

    material.setWidgets(
        [banner, htmlText, links, share], [fwc]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    // MUSE二维码:
    var genToken;
    var hasQR = false;
    var QRCode = null;

    function makeQR(token) {
        ad.base.require(
            'muses/tool',
            RT_CONFIG.HOST('ecma.bdimg.com') + '/lego-mat/muses/tool.js',
            function(tool) {
                QRCode = tool['QRCode'];
                if (hasQR) {
                    return;
                }
                hasQR = true;
                var qrcode = new QRCode('ec-qtz-libai-qr', {
                    text: AD_CONFIG['config']['mobile_url'] + "?muses_scepter=" + genToken,
                    'width': 108,
                    'height': 108,
                    'colorDark': '#000000',
                    'colorLight': '#ffffff',
                    'correctLevel': QRCode['CorrectLevel']['L']
                });
            }
        );
    }

    function createConnect() {
        ad.base.require(
            'muses/connect',
            RT_CONFIG.HOST('ecma.bdimg.com') + '/lego-mat/muses/connect.js',
            function(Connect) {
                // 创建一个连接实例
                var connect = new Connect();
                var isConn = false;

                connect['createToken']()
                    .then(function(token) {
                        genToken = token;
                        makeQR(token);
                        makeConnect(token);
                    });

                function makeConnect(token) {
                    connect['connectWith'](token)
                        .then(function() {
                            // 接收消息
                            connect['onMessage'] = function(msg) {
                                if (msg !== 'open') {
                                    return;
                                }
                                showFwc();
                                banner.sendLog('开始炫动浮层');
                            };
                        })
                        .fail(function(err) {});
                }
            },
            true
        );
    }

    var qrDomStr = '<div id="ec-qtz-libai-qr" class="ec-qrcode"></div>';
    var imgDom = banner.getRoot().getElementsByTagName('div')[0];
    baidu.dom.insertHTML(imgDom, 'beforeEnd', qrDomStr);
    createConnect();

    // 炫动flash统计
    flash.addListener('FLASH_close', function() {
        hideFwc();
        flash.sendLog('FLASH_close', 'FLASH_close');
    });
    flash.addListener('FLASH_stop', function() {
        hideFwc();
        flash.sendLog('FLASH_stop', 'FLASH_stop');
    });
    flash.addListener('FLASH_start', function() {
        flash.sendLog('FLASH_start', 'FLASH_start');
    });
    flash.addListener('FLASH_track', function(no) {
        flash.sendLog(no, no);
    });

    function showFwc() {
        fwc.show();
        baidu.dom.hide('ec-qtz-libai-qr');
        flash.refresh();
        baidu.dom.setStyles(flash.getId('flash'), {
            'width': '100%',
            'height': baidu.page.getViewHeight() + 'px',
            'position': 'fixed'
        });
    }

    function hideFwc() {
        fwc.hide();
        flash.clearRoot();
    }

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
