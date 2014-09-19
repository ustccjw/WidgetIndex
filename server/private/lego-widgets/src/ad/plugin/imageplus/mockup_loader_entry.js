/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/mockup_loader_entry.js ~ 2013/08/09 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description MockupLoader的入口
 *
 *      <script>
 *      var baiduImagePlusFakeImgs = [imgDom];
 *      var baiduImagePlusFakeData = [
 *          {
 *              'name': 'product',
 *              'position_type':'0',
 *              'render': 'http://bs.baidu.com/public03/imageplus/product.app.js',
 *              'ads':[
 *                  {
 *                      'image': decodeURIComponent(imgDom.src),
 *                      'desc':'Apple/苹果 MacBook Pro MD101CH/A',
 *                      'price':'10860',
 *                      'seller_name':'百度微购',
 *                      'idea_url':'http://ecma.bdimg.com/adtest/7498d405318eef7b8ac49ea13b2dde4f.png',
 *                      'encry_url':'http://weigou.baidu.com/search?f=sug&q=macbook+pro',
 *                      'icon_top_left_x':'239',
 *                      'icon_top_left_y':'269',
 *                  }
 *              ]
 *          }
 *      ];
 *      </script>
 *      <script src="http://ecma.bdimg.com/public03/imageplus/mockup_loader.js">
 *      </script>
 **/
/*global document:false, navigator:false, clearTimeout:false,
 setTimeout:false, ECMA_require:false, goog:false, HASH:false */


goog.require('ad.plugin.imageplus.MockupLoader');
goog.require('ad.plugin.imageplus.BaseLoaderConfig');

goog.provide('ad.plugin.imageplus.mockupLoaderEntry');


/**
 * 启动loader
 *
 * @param {Object=} opt_config 配置
 */
function go(opt_config) {
    // 如果有全局变量baiduImagePlus则使用它作为配置
    var loader = new ad.plugin.imageplus.MockupLoader(
        new ad.plugin.imageplus.BaseLoaderConfig({})
    );
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

go();






