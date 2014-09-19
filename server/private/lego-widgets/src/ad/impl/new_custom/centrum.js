/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/centrum.js ~ 2014/05/26 14:06:56
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * centrum相关的实现逻辑
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

goog.include('ad/impl/new_custom/centrum.less');

goog.provide('ad.impl.new_custom.Centrum');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-centrum';

    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.H1(AD_CONFIG['title']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var head = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var imageConf = AD_CONFIG['image'];
    var image = new ad.widget.Image(imageConf);

    if (AD_CONFIG['flash']['link_url']) {
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

    if (ad.env.isIpad) {
        imageConf['image_url'] = imageConf['ipad_image_url'];
        image.refresh(null, imageConf);
        image.sendLog('显示ipad banner图');
        return;
    }

    var genToken;

    // function _log(msg) {
    //     window['console'] && console.log(msg);
    // }

    // 二维码
    function makeQR(token) {
        ad.base.require('muses/tool', RT_CONFIG.HOST('ecma.bdimg.com') + '/lego-mat/muses/tool.js', function(tool) {
            var QRCode = tool['QRCode'];
            baidu.dom.insertHTML(
                image.getRoot().getElementsByTagName('div')[0],
                'beforeEnd',
                '<div id="ec-centrum-qr" class="ec-qrcode"></div>'
            );

            var connUrl = AD_CONFIG['config']['mobile_url'] + '?muses_scepter=' + token;

            // return 是为了消除jshint的warning
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

    var flashMovie;

    // //点击触发浮层
    // baidu.event.on(image.getRoot(), ui.events.CLICK, function() {
    //     fwc.sendLog('点击Banner图打开FLASH浮层');
    //     fwc.show();
    //     flashMovie = ad.base.getMovie(flash.getId('swf'));
    // });

    fwc.addListener(ui.events.CLOSE, function() {
        flashMovie['callFlashmcover'] && flashMovie['callFlashmcover']();
        fwc.sendLog('退出游戏');
        basket.finish();
    });

    //获取水果数
    flash.addListener('FLASH_fruitsnum', function(action) {
        connect['send'](['score', action]);
    });

    //游戏结束
    flash.addListener('FLASH_ending', function() {
        fwc.sendLog('完成游戏');
        basket.finish();
    });

    //游戏结束点击flash
    flash.addListener('FLASH_jump', function() {
        fwc.sendLog('游戏结束点击FLASH浮层跳转页面');
    });

    // 加载Connect模块
    var connect;
    ad.base.require(
        'muses/connect',
        RT_CONFIG.HOST('ecma.bdimg.com') + '/lego-mat/muses/connect.js',
        function(Connect) {
            // 创建一个连接实例
            connect = new Connect();
            //var lastLatencyTime = null;
            //var lastGetLatency = null;

            connect['createToken']()
                .then(function(token) {
                    genToken = token;
                    makeQR(token);
                    makeConnect(token);
                });

            connect.onTokenExpired = function() {
                connect['destroy']()
                    .then(function() {
                        makeConnect();
                    });
            };

            function makeConnect(token) {
                connect['connectWith'](token)
                    .then(function() {
                        function checkMsg(msg) {
                            if ('open' === msg) {
                                fwc.show();
                                fwc.sendLog('扫二维码打开FLASH浮层');
                                flashMovie = ad.base.getMovie(flash.getId('swf'));
                            }
                            if ('start' === msg) {
                                flashMovie['callFlashselect']();
                                fwc.sendLog('开始游戏');
                                setTimeout(function() {
                                    basket.ready = true;
                                }, 3000);
                            }
                        }

                        // 接收消息
                        connect['onMessage'] = function(actions) {
                            //var msgTime = new Date().getTime();
                            if ('string' === typeof actions) {
                                //_log(actions + ', message time: ' + msgTime);
                                checkMsg(actions);
                            } else if (actions instanceof Array) {
                                // var connId = actions[0];
                                // if(!lastGetLatency || msgTime - lastGetLatency > 3000) {//3秒测一次延迟
                                //     connect['send'](['late', connId]);
                                //     lastGetLatency = msgTime;
                                // }
                                // var sendTime = actions[1];
                                var type = actions[2];
                                var dataArr = actions[3];
                                //var latencyTime = actions[4];
                                switch (type) {
                                    case 'msg':
                                        //_log('Message: ' + dataArr + ', message time: ' + msgTime);
                                        checkMsg(dataArr);
                                        break;
                                    case 'ori':
                                        //_log('DeviceOrientation: x: ' + dataArr[2] + ',
                                        //  y: ' + dataArr[1] + ', z: ' + dataArr[0]);
                                        basket.goX(dataArr[2] / 4);
                                        break;
                                    case 'han':
                                        //_log('HandlerPos: x: ' + dataArr[0] + ', y: ' + dataArr[1]);
                                        basket.goX(dataArr[0] / 5);
                                        break;

                                }
                                //if(!!latencyTime && latencyDom != lastLatencyTime) {
                                //    latencyDom.innerHTML = '网络延迟：<b>' + latencyTime + '</b>毫秒';
                                //}
                            }
                        };
                    })
                    .fail(function(err) {
                        var errmsg = '';
                        for (var key in err) {
                            errmsg += key + ': ' + err[key];
                        }
                        //TODO
                    });
            }
        }
    );

    //篮子控制
    var basket = {
        curSpeed: 5,
        minX: 130,
        maxX: 700,
        curLeft: 0,
        interVal: null,
        interTime: 100,
        ready: false,
        finished: false,
        goX: function(dis, isInter) {
            if (!this.ready || this.finished) {
                return;
            }
            if (!isInter) {
                clearTimeout(this.interVal);
            }
            var fdis = dis * this.curSpeed;
            var toX = this.curLeft + fdis;
            if (toX < this.minX) {
                toX = this.minX;
            }
            if (toX > this.maxX) {
                toX = this.maxX;
            }
            this.curLeft = toX;
            flashMovie['callFlashmcrun'](toX);
            if (0 === toX || this.maxX === toX) {
                return;
            }
            var self = this;
            this.interVal = setTimeout(function() {
                //_log('distance: ' + dis);
                if (dis > -3 && dis < 3) {
                    return;
                }
                self.goX(dis, true);
            }, this.interTime);
        },
        finish: function() {
            //this.finished = true;
            //结束游戏
            this.ready = false;
            if (connect && connect['send']) {
                connect['send'](['end']);
                //connect['destroy']();
                //_log('close');
            }
        }
    };
});


/* vim: set ts=4 sw=4 sts=4 tw=100 : */
