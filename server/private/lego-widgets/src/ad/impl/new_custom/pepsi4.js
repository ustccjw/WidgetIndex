/**************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/pepsi4.js ~ 2014/04/24 16:27:36
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * pepsi4相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.base');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Image');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Flash');

goog.include('ad/impl/new_custom/pepsi4.less');

goog.provide('ad.impl.new_custom.Pepsi4');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-pepsi4';

    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.H1(AD_CONFIG['title']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var head = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var image = new ad.widget.Image(AD_CONFIG['image']);

    if(AD_CONFIG['flash']['link_url']) {
        AD_CONFIG['flash']['flashvars_param'] = '&linkurl='
            + window['encodeURIComponent'](AD_CONFIG['flash']['link_url']);
    }
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([flash]);

    material.setWidgets(
        [title],
        [video, head],
        [image],
        [fwc]
    );

    if (async === true) {
        return material;
    }

    material.show();

    var fwcDom = fwc.getRoot();
    var layoutDom = baidu.dom.last(baidu.dom.first(material.getRoot()));

    baidu.dom.insertAfter(fwcDom, layoutDom);
    fwc.show();
    var swfDom = baidu.dom.first(fwcDom);
    swfDom.style.left = '-10000px';


    var genToken;

    //baidu.event.on(image.getRoot(), ui.events.CLICK, function() {
    //    showFlash();
    //});

    function showFlash() {
        baidu.dom.setStyles(baidu.dom.first(fwcDom), {
            'left': '0',
            'top': '0'
        });
        baidu.dom.setStyles(fwcDom, {
            'position': 'absolute',
            'left': '-5px',
            'top': '-5px'
        });
    }

    // 二维码
    function makeQR(token) {
        ad.base.require('muses/tool', RT_CONFIG.HOST('ecma.bdimg.com') + '/lego-mat/muses/tool.js', function(tool) {
            var QRCode = tool['QRCode'];
            baidu.dom.insertHTML(
                image.getRoot().getElementsByTagName('div')[0],
                'beforeEnd',
                '<div id="ec-pepsi4-qr" class="ec-qrcode"></div>'
            );
            // 这里的 return 仅仅是为了消除jshint的warning...
            return new QRCode('ec-pepsi4-qr', {
                text: AD_CONFIG['config']['mobile_url'] + '?muses_scepter=' + token,
                'width': 86,
                'height': 86,
                'colorDark': '#000000',
                'colorLight': '#16ffff',
                'correctLevel': QRCode['CorrectLevel']['L']
            });
        });
    }

    var flashMovie = ad.base.getMovie(flash.getId('swf'));

    // 加载Connect模块
    ad.base.require(
        'muses/connect',
        RT_CONFIG.HOST('ecma.bdimg.com') + '/lego-mat/muses/connect.js',
        function(Connect) {
            // 创建一个连接实例
            var connect = new Connect();
            var isConn = false;
            var isSele = false;

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
                            if(ad.env.isIpad) {
                                fwc.sendLog('ipad扫二维码页面跳转');
                                connect['destroy']();
                                setTimeout(function() {
                                    window['location']['href'] = 'http://mp.weixin.qq.com'
                                        + '/s?__biz=MjM5OTQ0MTg4MA==&mid=202577656&idx=1'
                                        + '&sn=63467848d065c9ce1d84d6e1bf1c9be4#rd';
                                }, 300);
                                return;
                            }
                            if(!isConn) {
                                fwc.sendLog('扫二维码打开FLASH浮层');
                                showFlash();
                                isConn = true;
                                return;
                            }

                            var msgNum = parseInt(msg, 10);

                            if (1 >= msgNum && !isSele) {
                                flashMovie['callFlashselect']();
                                fwc.sendLog('开始互动');
                                isSele = true;
                            } else {
                                flashMovie['callFlashballrun'](msgNum);
                                if(8 <= msgNum) {
                                    fwc.sendLog('互动结束');
                                    connect['destroy']();
                                }
                            }
                        };
                    })
                    .fail(function(err) {
                        var errmsg = '';
                        for(var key in err) {
                            errmsg += key + ': ' + err[key];
                        }
                        //TODO
                    });
            }
        }
    );
});



/* vim: set ts=4 sw=4 sts=4 tw=100:  */
