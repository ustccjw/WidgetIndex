/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/hackathon_centrum.js ~ 2014/06/21 15:09:21
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * hackathon_centrum相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.base');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Image');
goog.require('ad.GameCenter');

goog.include('ad/impl/new_custom/hackathon_centrum.less');

goog.provide('ad.impl.new_custom.HackathonCentrum');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.H1(AD_CONFIG['title']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var head = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var imageConf = AD_CONFIG['image'];
    var image = new ad.widget.Image(imageConf);

    material.setWidgets(
        [title],
        [video, head],
        [image]
    );

    if (async === true) {
        return material;
    }

    material.show();

    if (ad.env.isIpad) {
        imageConf['image_url'] = imageConf['ipad_image_url'];
        image.refresh(null, imageConf);
        image.sendLog('显示ipad banner图');
        return;
    }

    function makeQR(token) {
        ad.base.require('muses/tool', 'http://ecma.bdimg.com/lego-mat/muses/tool.js', function(tool) {
            var QRCode = tool['QRCode'];
            var ctner = baidu.g('ec-centrum-qr');
            if (!ctner) {
                baidu.dom.insertHTML(
                    image.getRoot().getElementsByTagName('div')[0],
                    'beforeEnd',
                    '<div id="ec-centrum-qr" class="ec-qrcode"></div>'
                );
                ctner = baidu.g('ec-centrum-qr');
            }
            else {
                ctner.innerHTML = '';
            }

            var connUrl = AD_CONFIG['config']['mobile_url'] + '?muses_scepter=' + token;
            return new QRCode('ec-centrum-qr', {
                text: connUrl,
                'width': 126,
                'height': 126,
                'colorDark': '#000000',
                'colorLight': '#fff',
                'correctLevel': QRCode['CorrectLevel']['L']
            });
        });
    }

    ad.base.require(
        'muses/connect',
        'http://ecma.bdimg.com/lego-mat/muses/connect.js',
        function(/** @type {Function} */Connect) {
            var gameCenter = new ad.GameCenter({
                'MusesConnect': Connect,
                'host': 'http://114.215.181.63:8860'
            });

            // token 创建好的事件
            gameCenter.addListener(
                ad.GameCenter.Events.HOST_TOKEN_CREATED,
                function(token) {
                    makeQR(token);
                }
            );
            // 启动 GameCenter
            gameCenter.start(ad.GameCenter.ClientMode.HOST);
        },
        true
    );
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
