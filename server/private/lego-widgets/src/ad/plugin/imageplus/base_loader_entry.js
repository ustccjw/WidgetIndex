/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/base_loader_entry.js ~ 2013/08/09 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description BaseLoader的入口
 *
 *      <script>
 *      var baiduImagePlus = {
 *          // 这里是配置，具体参见base_loader_config
 *      };
 *      </script>
 *      <script src="http://ecma.bdimg.com/public03/imageplus/baseLoader.js">
 *      </script>
 *
 *      这个loader是很基础的loader，默认不做任何事情
 *      但是提供api供使用者自己调用来展现广告
 **/
/*global document:false, navigator:false, clearTimeout:false, location:false,
 setTimeout:false, ECMA_require:false, goog:false, HASH:false */


goog.require('ad.plugin.imageplus.BaseLoader');
goog.require('ad.plugin.imageplus.BaseLoaderConfig');

goog.provide('ad.plugin.imageplus.baseLoaderEntry');

// 如果有全局变量baiduImagePlus则使用它作为配置
var loader = new ad.plugin.imageplus.BaseLoader(
    new ad.plugin.imageplus.BaseLoaderConfig(window['baiduImagePlus'])
);
// 设置时间
loader.setLogTimes({
    'start': new Date().getTime()
});

loader.main();

ad.base.exportPath('baiduImagePlus', {
    '_loader': loader,
    'ready': function () {
        return loader.ready.apply(loader, arguments);
    },
    'showAds': function () {
        return loader.showAds.apply(loader, arguments);
    },
    'showAd': function () {
        return loader.showAd.apply(loader, arguments);
    },
    'eachAd': function () {
        return loader.eachAd.apply(loader, arguments);
    },
    'removeAd': function () {
        return loader.removeAd.apply(loader, arguments);
    },
    'removeAds': function () {
        return loader.removeAds.apply(loader, arguments);
    },
    'removeUselessAds': function () {
        return loader.removeUselessAds.apply(loader, arguments);
    },
    'refreshAds': function () {
        return loader.refreshAds.apply(loader, arguments);
    },
    'hideAd': function () {
        return loader.hideAd.apply(loader, arguments);
    },
    'hideAds': function () {
        return loader.hideAds.apply(loader, arguments);
    },
    'hideUselessAds': function () {
        return loader.hideUselessAds.apply(loader, arguments);
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
});






