
goog.require('ad.impl.ishop.constants');
goog.require('ad.impl.ishop.util');

goog.provide('ad.impl.ishop.dal');

/**
 * @constructor
 *
 */
ad.impl.ishop.DataLoader = function(){

    /**
     * JSONP回调函数的后缀，主要为了避免并发请求的回调函数覆盖
     * @type {number} 
     */
    this._suffix = 0;
};

/**
 * 拼合jsonp请求的url参数
 * @param {Object|null|undefined} params 参数
 * @param {string} url jsonp请求的链接地址
 */
ad.impl.ishop.DataLoader.prototype._buildUrl = function(params, url){
    var paramUrl = [];
    for(var p in params){
        paramUrl.push(p + '=' + encodeURIComponent(params[p]));
    }

    if(paramUrl.length > 0){
        url += '?';
    }
    return url + paramUrl.join('&');
};

/**
 * 加载jsonp的script文件
 * @param {string} src jsonp的地址
 * @param {Object|null|undefined} params 参数
 * @param {Function=} opt_callback 回调函数
 */
ad.impl.ishop.DataLoader.prototype._loadScript = function(src, params, opt_callback){
    var me = this;

    src = me._buildUrl(params, src);

    var script = document.createElement('script'),
        header = document.getElementsByTagName('head')[0];

    script.type = "text/javascript";
    script.charset = "utf-8";
    script.onload = function(){
        if(opt_callback){
            opt_callback();
        }
        ad.base.setTimeout(function(){
            header.removeChild(script);
        }, 200);
        script.onload = null;
    };
    script.src = src;

    header.insertBefore(script, header.firstChild);
};

/**
 * 调用jsonp接口
 * @param {string} callbackName 回调函数名
 * @param {Object} opt 参数
 */
ad.impl.ishop.DataLoader.prototype._jsonp = function(callbackName, opt){
    var me = this;
    opt['params']['callback'] = callbackName;

    window[callbackName] = function(data){
        if(data['success'] == 'false'){
            if(data['message']['global']){
                alert(data['message']['global']);
            }
            // 这里没处理fields的问题，因为检索端这边不会有这种问题
        } else {
            opt['callback'](data);
        }
        
        var _s = ad.base.setTimeout(function(){
            if(baidu.ie){
                window[callbackName] = null;
            } else {
                delete window[callbackName];
            }
            ad.base.clearTimeout(_s);
        }, 100);
    };

    var href = window['location']['href'];
    var sParam = href.substring(href.indexOf('?'));
    var params = baidu.url.queryToJson(sParam);

    // Have to do this thing, because queryToJson didn't decode for us.
    for(var p in params){
        params[p] = decodeURIComponent(params[p]);
    }

    // 默认用url中的参数url作为检索端的地址，如果没有，则用weigouapp.baidu.com作为检索端的地址
    var host = params['url'];
    if(!host){
        host = ad.impl.ishop.constants.SEARCH_DOMAIN;
    }
    me._loadScript(host + opt['url'], opt['params']);
};

/**
 * ajax请求
 * @param {Object} opt 参数
 */
ad.impl.ishop.DataLoader.prototype._ajax = function(opt){
    var me = this;

    if(!opt['params']){
        opt['params'] = {};
    }
    opt['params']['_t'] = (+new Date());
    baidu.ajax.request(ad.impl.ishop.constants.ISHOP_DOMAIN + opt['url'], {
        'method': 'get',
        'data': ad.impl.ishop.util.jsonToQuery(opt['params']),
        'onsuccess': function(xhr){
            var data;
            try{
                data = baidu.json.parse(xhr.responseText);
            } catch(e){
                // 返回的数据格式错误
                return;
            }

            if(data['success'] !== undefined){
                var message = data['message'];
                if(message){
                    // 返回有错
                    if(message['global']){
                        alert(message['global']);
                        return;
                    }
                }
            }
            // 无论是否有错误，都需要调用回调函数，根据中华人民共和国宪法，回调函数有权知道发生了什么
            if(opt['callback']){
                opt['callback'](data);
            }
        }
    });
};

/**
 * 发送异步请求
 * @param {Object} opt
 */
ad.impl.ishop.DataLoader.prototype.send = function(opt){
    var me = this;

    if(opt['type'] == 'search'){
        var callbackName = opt['callbackName'] + '_' + (++me._suffix);
        me._jsonp(callbackName, opt);
    } else {
        me._ajax(opt);
    }
};

/**
 * DataLoader的实例
 * @type {ad.impl.ishop.DataLoader}
 */
ad.impl.ishop.dal = new ad.impl.ishop.DataLoader();

(function(){
    var dal = ad.impl.ishop.dal;

    /**
     * 向检索端请求搜索结果
     */
    dal.search = function(query, callback){
        dal.send({
            'type': 'search',
            'url': ad.impl.ishop.urls.SEARCH,
            'callbackName': 'ishop_search',
            'callback': callback,
            'params': {
                'query': query
            }
        });
    };

    /**
     * 获取手机安全码
     */
    dal.getMobileVCode = function(mobile, callback){
        dal.send({
            'url': ad.impl.ishop.urls.MOBILE_VCODE,
            'callback': callback,
            'params': {
                'mobile': mobile
            }
        });
    };

    /**
     * 加载省市区数据
     */
    dal.region = function(callback){
        dal.send({
            'url': ad.impl.ishop.urls.REGION,
            'callback': callback
        });
    };

    /**
     * 提交订单
     */
    dal.submit = function(params, callback){
        dal.send({
            'url': ad.impl.ishop.urls.SUBMIT_BUY,
            'callback': callback,
            'params': params 
        });
    };

    /*
     * 获取图片验证码
     */
    /*
    dal.vcode = function(callback){
        dal.send({
            'url' : ad.impl.ishop.urls.VCODE_IMAGE,
            'callback' : callback
        });
    };
    */

})();


