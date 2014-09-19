/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/zhidao_native/loader.js ~ 2014/04/17 15:00:00
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 **/

goog.require('ad.base');
goog.require('ad.plugin.loader');
goog.require('ui.events');

goog.provide('ad.plugin.zhidaoNative.QbLoader');


/**
 * zhidao_native QbLoader
 * 通用的loader类
 *
 * 一个页面只有一个loader实例；
 * 一个loader实例有n个广告实例（目前为3个）；
 * 一个广告实例对应一个render js；
 * 一个广告实例对应一个canvas id；
 *
 * @constructor
 * @param {Object} config 配置
 *      {
 *          "qid": "1234",
 *          "canvas": {
 *              "banner": "ecwd_native_banner",
 *              "related": "ecwd_native_related",
 *              "right": "ecwd_native_right"
 *          }
 *      }
 */
ad.plugin.zhidaoNative.QbLoader = function (config) {
    var me = this;

    if (!config['qid'] || !config['canvas']) {
        return;
    }

    /**
     * @type {string} qid
     */
    me.qid = config['qid'];

    /**
     * @type {Object} 广告canvas的id
     */
    me.canvasIds = me.prepareCanvas(config['canvas']);

    /**
     * 抽样类型 - 在clickmonkey统计里需要加上此名字作为plid
     * 1是有知道板块，2是没有，(还有0的情况 - 这种比较少见，BAIDUID为空，可以不统计)
     *
     * @type {string}
     */
    me.sampleType = config['sampleType'];

    /**
     * @type {Object} 广告的配置数据
     */
    me.adData = {};

    /**
     * 缓存了每个render的AD_CONFIG
     * 因为ECMA_require会缓存render的AD_CONFIG，
     * 所以导致了render多次调用生成的多个实例使用了同一个AD_CONFIG，
     * 故需要缓存最原始的AD_CONFIG，使用时拷贝，避免render多次调用时的冲突
     * @type {Object}
     * @private
     */
    me._adConfigCache = {};

    /**
     * 记录已经加载的广告
     * @type {Object}
     */
    me._loadedAd = {};

    me.main();
};

/**
 * 生成物料容器ID
 *
 * @param {Object.<string, string>} canvasConfig 容器配置
 * @return {Object.<string, string>}
 */
ad.plugin.zhidaoNative.QbLoader.prototype.prepareCanvas = function(canvasConfig) {
    var canvasIds = [];

    for (var adName in canvasConfig) {
        // 不直接使用广告位容器，而在广告位容器里创建一个新的物料容器
        // 否则会导致广告位容器上的css被物料容器上的css覆盖掉
        var canvasId = canvasConfig[adName] + '-canvas';
        canvasIds[adName] = canvasId;

        var container = baidu.g(canvasConfig[adName]);
        if (container) {
            var canvas = baidu.dom.create('div', {
                id: canvasId
            });
            container.appendChild(canvas);
        }
    }

    return canvasIds;
};

/**
 * 开始入口
 */
ad.plugin.zhidaoNative.QbLoader.prototype.main = function () {
    var me = this;
    me.getData(function () {
        me.load(['banner', 'related', 'right']);
    });
};

/**
 * 加载处理数据
 *
 * @param {Function} callback .
 */
ad.plugin.zhidaoNative.QbLoader.prototype.getData = function (callback) {
    var me = this;
    var jsonpCallback = function (data) {
        for (var adName in data) {
            data[adName]['data'] = data[adName]['data'] || {};
            data[adName]['data']['id'] = me.canvasIds[adName];
        }
        me.adData = data;
        callback();
    };
    // FIXME: 实验所需，正式上线这里要删掉!!!
    window['ecwd_native_callback'] = jsonpCallback;
    baidu.sio.callByServer(
        'http://bs.baidu.com/public03/zhidao_native/qb_data/' + me.qid
            + '?cache=' + Math.ceil(new Date() / (3600000 * 24)),   // 缓存一天
        jsonpCallback,
        {
            'charset': 'utf-8',
            'timeout': 10000
        }
    );
};

/**
 * 加载一个广告
 *
 * @param {string} adName 广告名称.
 * @param {function()=} opt_callback 成功后回调函数
 */
ad.plugin.zhidaoNative.QbLoader.prototype._loadOne = function (adName, opt_callback) {
    var me = this;
    if (me._loadedAd[adName]) {
        // 已加载，则不重复加载
        return;
    }
    me._loadedAd[adName] = true;

    var renderUrl = me.adData[adName]['render_url'];

    if (!renderUrl) {
        // 没有没有指定的js地址则不展示
        return;
    }

    var cacheTime = 3600000 * 24;
    if (renderUrl.indexOf('?') !== -1) {
        renderUrl += '&';
    }
    else {
        renderUrl += '?';
    }
    renderUrl += 'cache=' + Math.ceil(new Date() / cacheTime);

    /* jshint ignore:start */
    ECMA_require(renderUrl, function (m) {
        // 生成AD_CONFIG

        if (!me._adConfigCache[adName]) {
            // 记录最原始的AD_CONFIG
            me._adConfigCache[adName] = m.get('AD_CONFIG');
        }
        // 拷贝原始的AD_CONFIG
        var materialConfig = baidu.json.parse(baidu.json.stringify(
            me._adConfigCache[adName]
        ));

        // 将数据写到AD_CONFIG中，并设置到render里面
        // 强制写入
        ad.base.extend(materialConfig, me.adData[adName]['data'], true);
        m.set('AD_CONFIG', materialConfig);

        // FIXME: 实验用的
        me.prepareClickMonkey(m, adName);

        // 检查容器是否存在，不存在的情况下不渲染物料
        var canvasId = me.canvasIds[adName];
        if (canvasId && baidu.g(canvasId)) {
            m.start(false);
        }

        if (opt_callback) {
            opt_callback();
        }
    });
    /* jshint ignore:end */
};

/**
 * 设置clickmonkey所需数据
 * @param {ad.Wrapper} wrapper
 * @param {string} adName
 */
ad.plugin.zhidaoNative.QbLoader.prototype.prepareClickMonkey = function(wrapper, adName) {
    var RT_CONFIG = wrapper.get('RT_CONFIG');
    RT_CONFIG['pluginParam'] = {
        'ad.plugin.ClickMonkey': {
            'plid': 'ecwd-' + adName + '-' + this.qid + (this.sampleType != null ? ('-' + this.sampleType) : '')
        }
    };
    wrapper.set('RT_CONFIG', RT_CONFIG);
};

/**
 * 加载一个或多个广告
 *
 * @param {Array.<string>|string} adNames 一个或多个广告名称.
 * @param {Function=} opt_callback 回调函数.
 */
ad.plugin.zhidaoNative.QbLoader.prototype.load = function (adNames, opt_callback) {
    adNames = typeof adNames === 'string'
        ? adNames.split(',')
        : adNames;
    var adLength = adNames.length;
    if (!adLength) {
        return;
    }

    var counter = 0;
    var callback = function () {
        counter++;
        if (counter < adLength) {
            return;
        }

        if (opt_callback) {
            opt_callback();
        }
    };

    var me = this;
    baidu.array.each(adNames, function (adName) {
        me._loadOne(/** @type {string} */(adName), callback);
    });
};

/**
 * 新建QbLoader实例的方法
 * @param {Object} config
 */
var newQbLoader = function (config) {
    return new ad.plugin.zhidaoNative.QbLoader(config);
};
ad.base.exportPath('ecom.ma.zhidao.qbLoader', newQbLoader);










/* vim: set ts=4 sw=4 sts=4 tw=100: */
