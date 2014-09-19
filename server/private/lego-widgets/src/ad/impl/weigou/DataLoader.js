goog.require('ad.impl.weigou.constants');
goog.require('ad.impl.weigou.urls');
goog.require('ad.impl.weigou.util');
goog.require('ad.impl.weigou.env');

goog.require('ad.service.SubmitXDService');

goog.provide('ad.impl.weigou.dal');

/**
 * @constructor
 * @param {string} query The search query.
 * @param {string} qid The query id.
 */
ad.impl.weigou.DataLoader = function(query, qid) {
    /**
     * JSONP回调函数的后缀，主要为了避免并发请求的回调函数覆盖
     * @type {number}
     */
    this._suffix = 0;

    /**
     * Post Iframe所使用的service
     * @type {ad.service.SubmitXDService}
     */
    this.submitXDService = null;

    /**
     * 数据缓存
     * @type {Object}
     */
    this._cache = {};

    /**
     * 维护检索端请求的顺序
     */
    this.sid = 0;

    /**
     * @type {string}
     */
    this.qid = qid;

    /**
     * @type {string}
     */
    this.query = query;

    /**
     * dataloader初始化时间
     */
    this._startTime = new Date();
};

/**
 * 拼合jsonp请求的url参数
 * @param {Object|null|undefined} params 参数.
 * @param {string} url jsonp请求的链接地址.
 */
ad.impl.weigou.DataLoader.prototype._buildUrl = function(params, url) {
    var paramUrl = [];
    for (var p in params) {
        paramUrl.push(p + '=' + encodeURIComponent(params[p]));
    }

    if (paramUrl.length > 0) {
        url += '?';
    }
    return url + paramUrl.join('&');
};

/**
 * 加载jsonp的script文件
 * @param {string} src jsonp的地址.
 * @param {Object|null|undefined} params 参数.
 * @param {Function=} opt_callback 回调函数.
 */
ad.impl.weigou.DataLoader.prototype._loadScript = function(src, params, opt_callback) {
    var me = this;

    src = me._buildUrl(params, src);

    var script = document.createElement('script'),
        header = document.getElementsByTagName('head')[0];

    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.onload = function() {
        if (opt_callback) {
            opt_callback();
        }
        ad.base.setTimeout(function() {
            header.removeChild(script);
        }, 200);
        script.onload = null;
    };
    script.src = src;

    header.insertBefore(script, header.firstChild);
};

/**
 * 调用post iframe的接口
 * @param {Object} opt 参数.
 */
ad.impl.weigou.DataLoader.prototype._post = function(opt) {
    var me = this;
    var params = ad.impl.weigou.util.getUrlParams();
    if (!me.submitXDService) {
        var url = params['proxyHtml'];
        if (!url) {
            url = ad.impl.weigou.dist.MOBILE ?
                ad.impl.weigou.urls.PROXY_V2_HTML :
                ad.impl.weigou.urls.PROXY_HTML;
        }

        me.submitXDService = new ad.service.SubmitXDService(
            'weigou',
            url
        );
        me.submitXDService.init();
    }

    opt['params']['_ajax'] = 1;
    opt['params']['_device'] = ad.impl.weigou.env.getDevice();
    opt['params']['qid'] = me.qid;
    opt['params']['sid'] = me.sid;
    opt['params']['_time'] = (new Date()) - me._startTime;
    var host = params['weigouUrl'];
    if (!host) {
        host = opt['hostUrl'];
    }
    me.submitXDService.submit(
        host + opt['url'],
        opt['params'],
        function(data) {
            opt['callback'](data);
        }
    );
};


/**
 * 调用jsonp接口
 * @param {string} callbackName 回调函数名.
 * @param {Object} opt 参数.
 */
ad.impl.weigou.DataLoader.prototype._jsonp = function(callbackName, opt) {
    var me = this;
    if (!opt['params']) {
        opt['params'] = {};
    }

    callbackName += ('_' + new Date().getTime());
    opt['params']['callback'] = callbackName;

    window[callbackName] = function(data) {
        opt['callback'](data);

        var _s = ad.base.setTimeout(function() {
            if (ad.impl.weigou.dist.MOBILE ||
                ad.impl.weigou.dist.IPAD) {
                delete window[callbackName];
            } else {
                if (baidu.ie) {
                    window[callbackName] = null;
                } else {
                    delete window[callbackName];
                }
            }
            ad.base.clearTimeout(_s);
        }, 100);
    };

    var params = ad.impl.weigou.util.getUrlParams();

    var host;
    if (opt['host'] === 'www') {
        me.sid++;
        host = params['url'];
        if (!host) {
            host = opt['hostUrl'];
        }
        opt['params']['qid'] = me.qid;
        opt['params']['sid'] = me.sid;
    } else if (opt['host'] === 'weigou') {
        opt['params']['_ajax'] = 1;
        host = params['weigouUrl'];
        if (!host) {
            host = opt['hostUrl'];
        }
    }

    if (ad.impl.weigou.dist.PC) {
        var index = host.indexOf('?');
        if (index !== -1) {
            var urlParams = baidu.url.queryToJson(host);
            host = host.substr(0, index);
            var key, value;
            for (key in urlParams) {
                value = urlParams[key];
                urlParams[key] = decodeURIComponent(value);
            }
            baidu.object.extend(opt['params'], urlParams);
        }
    }
    me._loadScript(host + opt['url'], opt['params']);
};

/**
 * 发送异步请求
 * @param {Object} opt
 */
ad.impl.weigou.DataLoader.prototype.send = function(opt) {
    var me = this;

    opt['type'] = opt['type'] || 'ajax';

    switch (opt['host']) {
        case 'www':
            opt['hostUrl'] = ad.impl.weigou.dist.MOBILE ?
                ad.impl.weigou.constants.MOBILE_SEARCH_DOMAIN :
                ad.impl.weigou.constants.SEARCH_DOMAIN;
            break;
        case 'weigou':
            opt['hostUrl'] = ad.impl.weigou.constants.WEIGOU_DOMAIN;
            break;
        default:
            throw new Error('This host is not exists!');
    }

    switch (opt['type']) {
        case 'post':
            me._post(opt);
            break;
        case 'jsonp':
            var callbackName;
            // 为了缓存，保证请求region的url每次都是一样的，不带有后缀
            if (opt['callbackName'] === 'region_jd' || opt['callbackName'] === 'region') {
                callbackName = opt['callbackName'];
            } else {
                callbackName = opt['callbackName'] + '_' + (++me._suffix);
            }
            me._jsonp(callbackName, opt);
            break;
        default:
            throw new Error('This type of request is not exists!');
    }
};

/**
 * @return {ad.impl.weigou.DataLoader}
 */
ad.impl.weigou.DataLoader.getInstance = function() {
    var searchInfo = ad.impl.weigou.env.getSearchInfo();
    return new ad.impl.weigou.DataLoader(searchInfo.query, searchInfo.qid);
}

/**
 * DataLoader的实例
 * @type {ad.impl.weigou.DataLoader}
 */
ad.impl.weigou.dal = ad.impl.weigou.DataLoader.getInstance();

(function() {
    var dal = ad.impl.weigou.dal;

    var localCode = '';
    try {
        var data = ad.impl.weigou.dist.MOBILE ?
            window['A']['ec']['weigou'] :
            window['bds']['ecom']['data']['zhixin'];
        localCode = data['localcode'] || '';
    } catch (e) {
    }

    /**
     * 向检索端请求搜索结果
     */
    dal.search = function(params, callback) {
        params['query'] = dal.query;
        params['lc'] = localCode;

        dal.send({
            'host': 'www',
            'type': 'jsonp',
            'callbackName': 'search',
            'url': ad.impl.weigou.urls.SEARCH,
            'callback': callback,
            'params': params
        });
    };

    /**
     * 获取商品详情
     * @param {string} id 商品的Id.
     * @param {string} region 地域，例如『北京』.
     * @param {function(Object)} callback 回调函数.
     */
    dal.detail = function(id, region, callback) {
        dal.send({
            'host': 'www',
            'type': 'jsonp',
            'callbackName': 'detail',
            'url': ad.impl.weigou.urls.DETAIL,
            'callback': callback,
            'params': {
                'id': id,
                'lc': localCode,
                'region': region,
                'query': dal.query
            }
        });
    };

    /**
     * 获取商品属性
     */
    dal.attribute = function(id, region, callback) {
        dal.send({
            'host': 'www',
            'type': 'jsonp',
            'callbackName': 'attribute',
            'url': ad.impl.weigou.urls.ATTRIBUTE,
            'callback': callback,
            'params': {
                'id': id,
                'lc': localCode,
                'region': region,
                'query': dal.query
            }
        });
    };

    /**
     * 推荐数据
     */
    dal.recommend = function(id, region, callback) {
        dal.send({
            'host': 'www',
            'type': 'jsonp',
            'callbackName': 'recommend',
            'url': ad.impl.weigou.urls.RECOMMEND,
            'callback': callback,
            'onerror': function() {},
            'params': {
                'id': id,
                'lc': localCode,
                'region': region,
                'query': dal.query
            }
        });
    };

    /**
     * 获取商品详情
     */
    dal.detailRecommend = function(id, region, callback) {
        dal.send({
            'host': 'www',
            'type': 'jsonp',
            'callbackName': 'detail_recommend',
            'url': ad.impl.weigou.urls.DETAIL_RECOMMEND,
            'callback': callback,
            'params': {
                'id': id,
                'lc': localCode,
                'region': region,
                'query': dal.query
            }
        });
    };

    /**
     * 获取票务的翻页数据
     */ 
    dal.searchTicket = function(params, callback) {
        params['query'] = dal.query;

        dal.send({
            'host': 'www',
            'type': 'jsonp',
            'callbackName': 'search_ticket',
            'url': ad.impl.weigou.urls.TICKET_SEARCH,
            'callback': callback,
            'params': params
        });
    };

    /**
     * 获取票务的商品详情
     */
    dal.detailTicket = function(id, stationId, callback) {
        dal.send({
            'host': 'www',
            'type': 'jsonp',
            'callbackName': 'detail_ticket',
            'url': ad.impl.weigou.urls.TICKET_DETAIL,
            'callback': callback,
            'params': {
                'id': id,
                'station_id': stationId,
                'query': dal.query
            }
        });
    };

    /**
     * 获取手机安全码
     * @param {string} mobile 手机号.
     * @param {function(Object)} callback 回调函数.
     */
    dal.getMobileVCode = function(mobile, callback) {
        dal.send({
            'host': 'weigou',
            'type': 'jsonp',
            'callbackName': 'getMobileVcode',
            'url': ad.impl.weigou.urls.MOBILE_VCODE,
            'callback': callback,
            'params': {
                'mobile': mobile
            }
        });
    };

    /**
     * 加载省市区数据
     */
    dal.region = function(params, callback) {
        dal.send({
            'host': 'weigou',
            'type': 'jsonp',
            'callbackName': 'region',
            'url': ad.impl.weigou.dist.MOBILE ?
                ad.impl.weigou.urls.MOBILE_REGION :
                ad.impl.weigou.urls.REGION,
            'params': params,
            'callback': callback
        });
    };

    /**
     * 加载京东4级数据
     */
    dal.jd_town = function(params, callback) {
        dal.send({
            'host': 'weigou',
            'type': 'jsonp',
            'callbackName': 'jd_town',
            'url': ad.impl.weigou.urls.JD_TOWN,
            'params': params,
            'callback': callback
        });
    };

    /**
     * 加载省市区数据，京东数据
     */
    dal.region_jd = function(params, callback) {
        dal.send({
            'host': 'weigou',
            'type': 'jsonp',
            'callbackName': 'region_jd',
            'url': ad.impl.weigou.urls.REGION_JD,
            'params': params,
            'callback': callback
        });
    };

    /**
     * 提交订单
     * @param {Object} params 请求的参数.
     * @param {function(Object)} callback 回掉函数.
     * @param {boolean=} opt_retry 失败之后是否重试，默认为true.
     */
    dal.submit = function(params, callback, opt_retry) {
        dal.send({
            'host': 'weigou',
            'type': 'post',
            'url': ad.impl.weigou.urls.SUBMIT_BUY,
            'callbackName': 'submit',
            'callback': function(response){
                if (opt_retry !== false && response && response['success'] === 'false') {
                    var message = response['message'];
                    if (message && message['session_expired']) {
                        dal.submit(params, callback, false);
                        return;
                    }
                }
                callback(response);
            },
            'params': params
        });
    };

    /**
     * 加载用户的地址，不区分京东还是国标，也不需要vcode。
     * 如果是登录状态，直接返回，如果是非登录状态，返回没有登录的情况.
     */
    dal.getMyAddresses = function(params, callback) {
        dal.send({
            'host': 'weigou',
            'type': 'jsonp',
            'url': ad.impl.weigou.urls.MY_ADDRESSES,
            'callbackName': 'getMyAddresses',
            'callback': callback,
            'params': params
        });
    }

    /**
     * 加载用户使用过的地址，隐含登录的操作.
     * @param {Object} params 请求中的参数.
     * @param {function(Object)} callback 处理结果的回掉函数.
     */
    dal.addressesV2 = function(params, callback) {
        dal.send({
            'host': 'weigou',
            'type': 'jsonp',
            'url': ad.impl.weigou.urls.ADDRESSES_V2,
            'callbackName': 'getAddressesV2',
            'callback': callback,
            'params': params
        });
    };

    /**
     * 加载用户使用过的地址
     */
    dal.addresses = function(params, callback) {
        dal.send({
            'host': 'weigou',
            'type': 'jsonp',
            'url': ad.impl.weigou.urls.ADDRESSES,
            'callbackName': 'getAddresses',
            'callback': callback,
            'params': params
        });
    };

    /**
     * 获取运费和总价
     * @param {Object} params 请求的参数.
     * @param {function(Object)} callback 回掉函数.
     * @param {boolean=} opt_retry 失败之后是否重试，默认为true.
     */
    dal.checkOrder = function(params, callback, opt_retry) {
        dal.send({
            'host': 'weigou',
            'type': 'post',
            'url': ad.impl.weigou.urls.CHECK_ORDER,
            'callbackName': 'checkOrder',
            'callback': function(response){
                if (opt_retry !== false && response && response['success'] === 'false') {
                    var message = response['message'];
                    if (message && message['session_expired']) {
                        dal.checkOrder(params, callback, false);
                        return;
                    }
                }
                callback(response);
            },
            'params': params
        });
    };


})();


