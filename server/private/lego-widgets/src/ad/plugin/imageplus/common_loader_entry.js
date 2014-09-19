/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/common_loader_entry.js ~ 2013/08/09 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description CommonLoader的入口
 *
 *      <script>
 *      var baiduImagePlus = {
 *          // 这里是配置，具体参见common_loader_config和base_loader_config
 *      };
 *      </script>
 *      <script src="http://ecma.bdimg.com/public03/imageplus/commonLoader.js">
 *      </script>
 **/
goog.require('ad.string');
goog.require('ad.object');
goog.require('ad.plugin.imageplus.CommonLoader');
goog.require('ad.plugin.imageplus.CommonLoaderConfig');

goog.provide('ad.plugin.imageplus.commonLoaderEntry');

var cproId = window['cpro_id'] || '';
var pageConfig = window['baiduImagePlus'] || {};
var logTimes = {};

// 如果没有设置baiduImagePlus，则使用cproId作为unionId
if (!pageConfig['unionId'] && cproId) {
    pageConfig['unionId'] = cproId;
}

// 如果正在加载广告或是已经加载好了
// 则不再重复加载
if (pageConfig['_status'] !== 'loading' && pageConfig['_status'] !== 'loaded') {
    pageConfig['_status'] = 'loading';
    window['baiduImagePlus'] = pageConfig;

    logTimes['start'] = new Date().getTime();
    var siteUrl = pageConfig['api'] || 'http://imageplus.baidu.com/ui';
    siteUrl = siteUrl
        + (siteUrl.indexOf('?') === -1 ? '?' : '&')
        + 'api=config'
        + '&tu=' + ad.string.trim(pageConfig['unionId'] || '').replace(/^u/, '')
        + '&pic=' + document.getElementsByTagName('img').length;
    baidu.sio.callByServer(
        siteUrl,
        function (data) {
            logTimes['site_api_loaded'] = new Date().getTime();
            data = data || {};
            go(ad.object.extend(pageConfig, data));
        },
        {
            'charset': 'gbk',
            'timeOut': 10000,
            'onfailure': go
        }
    );
}

/**
 * 启动loader
 *
 * @param {Object=} opt_config 配置
 */
function go(opt_config) {
    // 如果有全局变量baiduImagePlus则使用它作为配置
    var loader = new ad.plugin.imageplus.CommonLoader(
        new ad.plugin.imageplus.CommonLoaderConfig(opt_config || pageConfig)
    );
    // 设置记录时间点
    loader.setLogTimes(logTimes);

    loader.main();

    // 目前只暴露出去`main`方法
    // 将来可以暴露出`loadAd(img) / releaseAd(img)`之类的方法
    window['baiduImagePlus'] = {
        '_status': 'loaded',
        '_loader': loader,
        'showAd': function () {
            return loader.showAd.apply(loader, arguments);
        },
        'removeAd': function () {
            return loader.removeAd.apply(loader, arguments);
        },
        'updateAd': function () {
            return loader.updateAd.apply(loader, arguments);
        },
        'updateAds': function () {
            return loader.updateAds.apply(loader, arguments);
        },
        'watchAds': function () {
            return loader.watchAds.apply(loader, arguments);
        },
        'linkAd': function () {
            return loader.linkAd.apply(loader, arguments);
        },
        'unlinkAd': function () {
            return loader.unlinkAd.apply(loader, arguments);
        },
        'unlinkAds': function () {
            return loader.unlinkAds.apply(loader, arguments);
        }
    };
}






