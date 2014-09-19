/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/*global location:false*/

/**
 * src/ad/plugin/image_loader.js ~ 2013/09/13 10:17:00
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 * 用于图片频道的loader，提供接口供图片页面调用加载相应广告
 **/

goog.require('ad.base');
goog.require('ad.plugin.loader');

goog.provide('ad.plugin.ImageAdLoader');

/**
 * 图片频道广告加载器类
 *
 * @constructor
 */
ad.plugin.ImageAdLoader = function () {
    /**
     * 广告名称和配置的关系
     * 广告名称大小写无关，配置中统一使用小写
     *
     * 配置目前包含：
     *      url：必填，广告路径
     *      mode: 可选，此广告配置的模式，默认的模式是production，
     *            可以通过在url里面加ecomMode=development来指定当前页面的参数
     *      rate: 可选，此广告配置展现的百分比。默认为100%。
     *            如果所有比例加起来不到100，则有可能不出广告
     *            如果所有比例加起来超过100，则最后一个广告的概率被削减，
     *            使其满足和为100
     *      cacheTime：可选，js文件缓存时间，默认为1天(3600000 * 24)
     *      charset：可选，js文件编码，默认为utf-8
     *
     * @type {Object} .
     * @private
     */
    this._adConfig = {
        'imageplus': [
            {
                'url': 'http://ecma.bdimg.com/public03/imageplus/loader.js'
                // 'mode': 'production'
                // 'rate': '50%',
                // 'charset': 'utf-8',
                // 'cacheTime': 3600000 * 24
            },
            {
                'url': 'http://bs.baidu.com/public03/imageplus/loader-dev.js',
                'mode': 'development',
                'cacheTime': 1   // 测试环境，无缓存
            },
            {
                'url': 'http://bs.baidu.com/public03/imageplus/loader-test.js',
                'mode': 'test',
                'cacheTime': 1   // 测试环境，无缓存
            }
        ],
        'imageright': [
            {
                'url': 'http://ecma.bdimg.com/public03/imageright/loader.js'
            },
            {
                'url': 'http://bs.baidu.com/public03/imageright/loader-dev.js',
                'mode': 'development'
            }
        ]
    };

    /**
     * 模式
     * @type {string}
     */
    this._mode = this._getMode();
};


/**
 * 获取当前页面loader所处的模式
 * @private
 * @return {string} mode .
 */
ad.plugin.ImageAdLoader.prototype._getMode = function () {
    var modeReg = /[\?&]ecomMode=([^$&#]+)/;
    var r = location.href.match(modeReg);
    return r ? r[1] : 'production';
};

/**
 * 计算要使用的配置
 * @private
 * @param {Array.<Object>} config url的配置
 * @return {Object} 计算得到的配置
 */
ad.plugin.ImageAdLoader.prototype._dice = function (config) {
    var me = this;
    var configs = baidu.array.filter(config, function (config) {
        return (config['mode'] || 'production') === me._mode;
    });

    if (!configs.length) {
        return null;
    }

    var random = Math.random() * 100;   // [0, 100)
    var rate = 0;
    var chosenConfig;
    baidu.array.each(configs, function (config) {
        rate += config['rate']
            ? parseInt(config['rate'], 10)
            : 100;

        if (random < rate) {
            chosenConfig = /**@type {Object} */ (config);
            return false;
        }
    });

    return chosenConfig;
};

/**
 * 加载一个广告
 *
 * @param {string} adName 广告名称.
 * @param {Function=} opt_callback 回调函数.
 */
ad.plugin.ImageAdLoader.prototype._loadOne = function (adName, opt_callback) {
    var config = this._adConfig[adName.toLowerCase()];

    if (config.length) {
        config = this._dice(config);
        if (!config) {
            // 没有选中任何广告则不展示
            // 但是也要激活回调，不然会因为一个广告加载失败影响到其他广告
            if (opt_callback) {
                opt_callback();
            }
            return;
        }
    }

    var url = config ? config['url'] : '';
    var cacheTime = config['cacheTime'] || (3600000 * 24);
    if (url) {
        baidu.sio.callByBrowser(
            url + '?cache=' + Math.ceil(new Date() / cacheTime),
            function () {
                if (opt_callback) {
                    opt_callback(adName);
                }
            },
            {
                'charset': config['charset'] || 'utf-8',
                'onfailure': function () {
                    if (opt_callback) {
                        opt_callback();
                    }
                }
            }
        );
    }
};

/**
 * 加载一个或多个广告
 *
 * @param {Array.<string>|string} adNames 一个或多个广告名称.
 * @param {Function=} opt_callback 回调函数.
 */
ad.plugin.ImageAdLoader.prototype.load = function (adNames, opt_callback) {
    adNames = typeof adNames === 'string'
        ? adNames.split(',')
        : adNames;
    var adLength = adNames.length;
    if (!adLength) {
        return;
    }

    var counter = 0;
    var successLoaded = [];
    var callback = function (loadedAdName) {
        counter++;
        if (loadedAdName) {
            successLoaded.push(loadedAdName);
        }

        if (counter < adLength) {
            return;
        }

        if (opt_callback) {
            opt_callback(successLoaded);
        }
    };

    var me = this;
    baidu.array.each(adNames, function (adName) {
        me._loadOne(/** @type {string} */(adName), callback);
    });
};

var imageAdLoader = new ad.plugin.ImageAdLoader();
ad.base.exportPath('ecom.ma.adLoader', imageAdLoader);

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
