/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/


/**
 * src/ad/impl/qtz/qtz_benz_e_class_new.js ~ 2013/08/12 16:35:41
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * qtz_benz_e_class_new相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.FullWindowContainer');
goog.require('ad.widget.Flash');
goog.require('ad.plugin.GetADID');

goog.include('ad/impl/qtz/qtz_benz_e_class_new.less');
goog.provide('ad.impl.qtz.QtzBenzEClassNew');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    var qtz = new ad.widget.Flash(AD_CONFIG['qtz']);
    var fwc = new ad.widget.FullWindowContainer(AD_CONFIG['fwc']);
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);

    fwc.setWidgets([flash]);
    material.setWidgets(
        [qtz, fwc]
    );
    if (async === true) {
        return material;
    }
    material.show();

    autoShowFwc();

    qtz.addListener('click', function(ev) {
        qtz.sendLog('QTZ_click', 'QTZ_click');
        // Benz E-Class：配置非链接，显示浮层，否则跳转。
        if (!/^http/.test(AD_CONFIG['qtz']['link_rcv_url'])) {
            showFwc();
            return false;
        }
    });
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



    // 记录fwc显示次数: cookie['BAIDUAD_{adId}_{baiduId}'] = pv

    function autoShowFwc() {
        var adId = RT_CONFIG['adid'] ? RT_CONFIG['adid'] : AD_CONFIG['adid'];
        var baiduId = baidu.cookie.get('BAIDUID');
        if (baiduId !== null) {
            baiduId = baiduId.replace(/[^\w]/g, '');
        } else {
            return false;
        }
        var cookieName = 'BAIDUAD_' + adId + '_' + baiduId;
        var cookieOptions = {
            'expires': 1000 * 86400
        };
        var fwcPV = parseInt(baidu.cookie.get(cookieName), 10) || 0;
        if (fwcPV < 2) {
            showFwc();
            baidu.cookie.set(cookieName, (fwcPV + 1).toString(), cookieOptions);
        }
    }

    function showFwc() {
        if (ad.env.isIpad) {
            return;
        }
        fwc.show();
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
