/**************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless_custom/burberry/smart.js ~ 2014/02/13 15:58:05
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * smart相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.Head');
goog.require('ad.widget.wireless.TipButton');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.EmptyPanel');

goog.include('ad/impl/wireless/smart/head.less');
goog.include('ad/impl/wireless_custom/burberry/smart.less');

goog.provide('ad.impl.wireless_custom.burberry.Smart');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var head = new ad.widget.wireless.Head(AD_CONFIG['head']);
    var tipButton = new ad.widget.wireless.TipButton(AD_CONFIG['tip_button']);

    //领取小样弹层
    var fwc = new ad.widget.FloatWindowContainer({
        "material_name": 'ec-burberry',
        "width": 320,
        "height": 480
    });
    var fwcTitle = new ad.widget.EmptyPanel({
        "content": '<img src="//bs.baidu.com/adtest/c8870cbedaaa744d7e8b4377244972ed.png" class="ec-logo" />Burberry Brit Rhythm 小样申领'
    });
    var fwcPanel = new ad.widget.EmptyPanel({
        'content': '<div class="ec-button-submit-wrap"><div class="ec-submit-success-title">加载中...</div></div>'
    });
    fwc.setWidgets(fwcTitle, fwcPanel);

    material.setWidgets(head, tipButton, fwc);

    if (async === true) {
        return material;
    }
    material.show();

    var checkUrl = 'http://wbapi.baidu.com/service/burberry/isover';
    baidu.sio.callByServer(checkUrl, function(sResult) {
        if ('true' == sResult['success'] && sResult['result'] && 'false' == sResult['result']['isover']) {
            getPopupHandler();
        } else {
            sampleIsOver();
        }
        baidu.dom.removeClass(tipButton.getRoot().firstElementChild, 'ec-tip-button-hide');
    });

    /**
     * 请求弹出层处理脚本
     */
    function getPopupHandler() {
        var times = 3; //等待次数
        var waitTime = 2000; //确认时间间隔
        var wisePage = baidu.g('page');
        //等待js的加载
        function waitJs() {
            if (window['burberryPopupHandler20140225']) {
                window['burberryPopupHandler20140225'].show();
                setPageHeight();
                return true;
            } else {
                if (times > 0) {
                    setTimeout(waitJs, waitTime);
                    times--;
                } else {
                    fwcPanel.refresh(null, {
                        'content': '<div class="ec-button-submit-wrap"><div class="ec-submit-success-title">加载错误，稍后再试</div></div>'
                    });
                    setTimeout(function() {
                        fwc && fwc.hide();
                    }, 3500);
                }
                return false;
            }
        }
        function setPageHeight() {
            wisePage && baidu.dom.setStyles(wisePage, {
                "height": baidu.page.getViewHeight() + 'px',
                "overflow-y": 'hidden'
            });
        }
        tipButton.addListener(ui.events.CLICK, function(evt) {
            if (!waitJs()) {
                fwc.show();
                setPageHeight();
                baidu.dom.setStyles(fwc.getRoot().firstElementChild, {
                    "left": "0",
                    "top": "0",
                    "width": baidu.page.getViewWidth() + "px",
                    "height": baidu.page.getViewHeight() + "px"
                });
            }
            baidu.event.preventDefault(evt);
        });
        var popupJsUrl = 'http://eiv.baidu.com/mapm2/jiejing/burberry/burberryPopupHandler20140225.js';
        baidu.sio.callByBrowser(popupJsUrl, function() {
            if (window['burberryPopupHandler20140225']) {
                window['burberryPopupHandler20140225']['prepare'](AD_CONFIG['head']['rcv_url'], fwc, fwcPanel, baidu);
            }
        });
        if(wisePage) {
            fwc.addListener(ui.events.CLOSE, function() {
                baidu.dom.setStyles(wisePage, {
                    'height': 'auto',
                    "overflow-y": 'auto'
                });
            });
        }
    }

    //裁剪js的时候需要这些方法
    var buttonDom = tipButton.getRoot();
    baidu.dom.addClass(buttonDom, 'not-a-class');
    baidu.dom.hasClass(buttonDom, 'not-a-class');
    baidu.dom.removeClass(buttonDom, 'not-a-class');
    baidu.object.clone({});

    /**
     * 显示领取完毕提示
     */
    function sampleIsOver() {
        tipButton.refresh(null, AD_CONFIG['tip_button_isover']);
    }

});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */