/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/minutemaid_orange.js ~ 2013/10/21 14:35:27
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * minutemaid_orange相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.url');
goog.require('ad.Material');
goog.require('ad.widget.FullWindowContainer');
goog.require('ad.widget.Flash');

goog.include('ad/impl/minutemaid_orange.less');

goog.provide('ad.impl.MinutemaidOrange');

ad.Debug(function(async) {
    var material = new ad.Material('ec-wise-mmo-2013');
    var fwc = new ad.widget.FullWindowContainer(AD_CONFIG['fwc']);
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    // Inner test:
    // var url = "http://jx-sdc-bk02.jx.baidu.com:8998/api/check_status.php?id=" + window['MZY_UUID'];
    var url = RT_CONFIG.HOST('wpl.baidu.com') + '/api/check_status.php?id=' + window['MZY_UUID'];
    var swfObj; // 用于接收as-js-API
    var orange = -1; // 服务端橘子数
    var clientOrange = -1; // 客户端橘子数
    var pollingInterval; // 轮询

    fwc.setWidgets([flash]);
    material.setWidgets(
        [fwc]
    );

    if (async === true) {
        return material;
    }

    // 浏览器无flash插件
    if (!baidu.swf.version) {
        return false;
    }

    var div = document.createElement('div');
    div.id = 'ec-wise-mmo-2013';
    document.body.insertBefore(div, document.body.firstChild);

    material.show();
    startPolling();

    flash.addListener('FLASH_close', function() {
        hideFwc();
    });

    function showFwc() {
        fwc.show();
        fwc.sendLog('ec_mzy_start');
        flash.refresh();
        swfObj = (!baidu.browser.ie) ? baidu.g(flash.getId('embed')) : baidu.g(flash.getId('swf'));
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

    function startPolling() {
        pollingInterval = ad.base.setInterval(function() {
            polling();
        }, 1000);
    }

    function polling() {
        // baidu.sio.callByBrowser("http://localhost:8888/1.php?test=-1", function() {
        //     orange = parseInt(orangeSent, 10);
        //     action();
        // });
        baidu.sio.callByServer(ad.url.normalize(url), function(resp) {
            orange = parseInt(resp.count, 10);
            action();
        });
    }

    function action() {
        // 未开始
        if (orange === -1) {
            // console.log("keep polling");
            return;
        }

        // 未改变状态
        if (clientOrange === orange) {
            return;
        }

        // 播放动画
        if (orange === 0) {
            showFwc();
            // console.log("showFWC");
        }
        else if (orange >= 1 && orange <= 3) {
            // console.log("jsPlayFalling");
            swfObj['jsPlayFalling']();
        }
        else if (orange >= 4) {
            // ad.base.clearInterval(pollingInterval);
            pollingInterval = null;
            swfObj['jsPlayEnding']();
            // console.log("stop");
        }

        // 更新客户端橘子数
        clientOrange = orange;
    }

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
