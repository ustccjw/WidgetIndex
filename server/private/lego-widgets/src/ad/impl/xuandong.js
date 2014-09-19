
/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/xuandong.js ~ 2013/09/23 18:20:01
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * xuandong相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.FullWindowContainer');
goog.require('ad.widget.Flash');
goog.require('ad.plugin.GetADID');

goog.include('ad/impl/xuandong.less');

goog.provide('ad.impl.Xuandong');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var fwc = new ad.widget.FullWindowContainer(AD_CONFIG['fwc']);
    var fwcRenderd = false;
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);

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
    material.show();
    autoShowFwc();

    flash.addListener('FLASH_close', function() {
        hideFwc();
        flash.sendLog('FLASH_close', 'FLASH_close');
        //psLog('手动关闭', 0);
    });
    flash.addListener('FLASH_stop', function() {
        hideFwc();
        flash.sendLog('FLASH_stop', 'FLASH_stop');
        //psLog('结束关闭', 2);
    });
    flash.addListener('FLASH_start', function() {
        flash.sendLog('FLASH_start', 'FLASH_start');
        //psLog('开始', 3);
    });
    flash.addListener('FLASH_track', function(no) {
        flash.sendLog(no, no);
        //psLog("点击", 1);
    });


    // 记录fwc显示次数: cookie['BAIDUAD_{adId}_{baiduId}'] = pv

    function autoShowFwc() {
        // 预览环境下直接显示浮层，不做cookie判断
        if (window['IS_PREVIEW']) {
            showFwc();
            return true;
        }

        
        //var sid = baidu.cookie.get('H_PS_PSSID');
        //if (sid) {
        //    var parts = sid.split('_');
        //    if (baidu.array.contains(parts, '7376')) {
        //        psLog('sid7376出浮层', 4);
        //    } else if (baidu.array.contains(parts, '7377')) {
        //        psLog('sid7377不出浮层', 5);
        //        return false;
        //    } else {
        //        psLog('sid不为7376或7377不出浮层', 6);
        //        return false;
        //    }
        //}

        var adId = RT_CONFIG['adid'] ? RT_CONFIG['adid'] : AD_CONFIG['conf']['adid'];
        var baiduId = baidu.cookie.get('BAIDUID');
        if (baiduId !== null) {
            baiduId = baiduId.replace(/[^\w]/g, '');
        } else {
            return false;
        }
        var storeName = 'BAIDUAD_' + adId + '_' + baiduId;

        // 通过本地存储限制显示次数，默认为2
        var limit = AD_CONFIG['conf']['limit'] ? AD_CONFIG['conf']['limit'] : 2;
        limit = parseInt(limit, 10);

        // 获取本地存储中的值
        function checkStorePV(storeObj) {
            var fwcPV = parseInt(storeObj.get(storeName), 10) || 0;
            if (fwcPV < limit) {
                showFwc();
                storeObj.set(storeName, (fwcPV + 1));
            }
        }

        // 执行品专脚本时，有可能还没有bds.se.store，用bds.ready时也可能会没有
        var interStartTime = new Date().getTime();
        var interId = ad.base.setInterval(function() {
            var storeObj = ad.base.getObjectByName('bds.se.store');
            if (storeObj) {
                ad.base.clearInterval(interId);
                checkStorePV(storeObj);
                return;
            }
            if (new Date().getTime() - interStartTime > 6000) {
                ad.base.clearInterval(interId);
            }
        }, 500);
    }

    function showFwc() {
        fwc.show();
        flash.refresh();
        baidu.dom.setStyles(flash.getId('flash'), {
            'width': '100%',
            'height': baidu.page.getViewHeight() + 'px',
            'position': 'fixed'
        });
        if (!fwcRenderd) {
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                //material.getCMS().init(canvas.id);
                fwcRenderd = true;
            }
        }
    }

    function hideFwc() {
        fwc.hide();
        flash.clearRoot();
    }


    //ps monitor
    // var mainUrl = AD_CONFIG['conf']['main_url'] || '-';
    // function psLog(title, fcNum) {
    //     var params = {
    //         'fm': 'pl',
    //         'p1': 1,
    //         'url': mainUrl,
    //         'rsv_tpl': 'se_com_default', // UBS: 点击结果使用的模板名，我们广告没有，使用默认值
    //         'rsv_srcid': '999999', // UBS: 阿拉丁资源位ID，我们广告没有，使用一个假的六位数字代替
    //         'mu': 'http://nourl.ubs.baidu.com/999999',
    //         'rsv_fc': fcNum,
    //         'title': title
    //     };
    //     if (typeof window['c'] === 'function') {
    //         window['c'](params);
    //     }
    // }

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */