/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/xuandong_preview.js ~ 2014/01/10 17:54:53
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * xuandong_preview相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');
goog.require('ad.widget.FullWindowContainer');
goog.require('ad.widget.Flash');

goog.include('ad/impl/xuandong_preview.less');

goog.provide('ad.impl.XuandongPreview');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var fwc = new ad.widget.FullWindowContainer(AD_CONFIG['fwc']);
    var fwc_show;
    var result = baidu.dom.create("div", {
        "class": "ec-result"
    });
    document.body.appendChild(result);

    var swfFile = baidu.url.getQueryValue(window.location.href, 'swf');
    if (!UrlExists(swfFile)) {
        log('error', 'ec-check-nofile', "未找到炫动SWF文件。");
        return;
    } else if (!swfFile || swfFile.substr(-4) !== '.swf') {
        log('error', 'ec-check-noswffile', "没有正确的炫动SWF文件。");
        return;
    }
    AD_CONFIG['flash']['src'] = swfFile;
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    fwc.setWidgets([flash]);
    material.setWidgets(
        [fwc]
    );
    if (async === true) {
        return material;
    }
    material.show();

    initCheck();

    // 测试各接口
    flash.addListener('FLASH_close', function() {
        hideFwc();
        log('ok', 'ec-check-close', "【关闭功能】功能已实现。");
    });
    flash.addListener('FLASH_stop', function() {
        hideFwc();
        log('ok', 'ec-check-stop', "【结束播放】统计已发送。");
    });
    flash.addListener('FLASH_start', function() {
        log('ok', 'ec-check-start', "【开始播放】统计已发送。");
    });
    flash.addListener('FLASH_track', function(no) {
        log('ok', 'ec-check-click', "【炫动点击】统计已发送。");
    });

    function initCheck() {
        var btn = baidu.dom.create("input", {
            "type": "button",
            "value": "测试",
            "class": "ec-btn"
        });
        result.appendChild(btn);
        baidu.on(btn, 'click', function(e) {
            startCheck();
            baidu.dom.remove(btn);
        });
    }

    function startCheck() {
        log('normal', 'ec-check-start', '【开始播放】统计未检查。');
        log('normal', 'ec-check-close', '【关闭功能】功能未检查。请点击关闭按钮。');
        log('normal', 'ec-check-click', '【炫动点击】统计未检查。请点击炫动广告。');
        log('normal', 'ec-check-stop', '【结束播放】统计未检查。');
        showFwc();

        var btn = baidu.dom.create("input", {
            "type": "button",
            "value": "测试",
            "class": "ec-btn"
        });
        result.appendChild(btn);
        baidu.on(btn, 'click', function(e) {
            restartCheck();
            baidu.dom.remove(btn);
        });
    }

    function restartCheck() {
        window.location.reload();
    }

    function showFwc() {
        fwc_show = true;
        fwc.show();
        flash.refresh();
        baidu.dom.setStyles(flash.getId('flash'), {
            'width': '100%',
            'height': baidu.page.getViewHeight() + 'px',
            'position': 'fixed'
        });

        ad.base.setTimeout(function() {
            if (fwc_show === true) {
                hideFwc();
                log('error', 'ec-check-close', '【关闭功能】未实现 或 广告超时。');
            }
        }, 8100);
    }

    function hideFwc() {
        fwc_show = false;
        fwc.hide();
        flash.clearRoot();
    }

    function log(type, id, s) {
        createDiv(id, s);
        switch (type) {
            case 'ok':
                baidu.dom.addClass(id, 'ec-ok');
                break;
            case 'error':
                baidu.dom.addClass(id, 'ec-error');
                break;
            case 'normal':
                baidu.dom.addClass(id, 'ec-gray');
                break;
            default:
                baidu.dom.addClass(id, 'ec-gray');
                break;
        }
    }

    function createDiv(id, s) {
        var div = baidu.dom.g(id);
        if (div) {
            div.className = '';
            div.innerHTML = s;
        } else {
            div = baidu.dom.create("div", {
                "id": id,
                "class": ''
            });
            div.innerHTML = s;
            result.appendChild(div);
        }
        return div;
    }

    function UrlExists(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status == 200;
    }

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */