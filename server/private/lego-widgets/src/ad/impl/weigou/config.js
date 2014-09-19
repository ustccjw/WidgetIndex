/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/weigou/config.js ~ 2013/03/04 13:59:08
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 11222 $
 * @description
 * weigou的配置文件
 **/
goog.provide('ad.impl.weigou.constants');
goog.provide('ad.impl.weigou.dist');
goog.provide('ad.impl.weigou.events');
goog.provide('ad.impl.weigou.urls');

/**
 * 是否是Mobile版本
 * @define {boolean}
 */
ad.impl.weigou.dist.MOBILE = false;

/**
 * 是否是iPad版本
 * @define {boolean}
 */
ad.impl.weigou.dist.IPAD = false;

/**
 * 是否是普通的PC版本.
 * @define {boolean}
 */
ad.impl.weigou.dist.PC = false;

/**
 * 是否是PC小流量抽样版本
 * @define {boolean}
 */
ad.impl.weigou.dist.PC_1 = false;

/**
 * 是否是wise小流量抽样版本
 * @define {boolean}
 */
ad.impl.weigou.dist.MOBILE_1 = false;

if (!COMPILED) {
// XXX 根据文件名自动的适配版本，方便本地调试.
var match = location.pathname.match(/\/([^\/]+)$/);
if (match) {
    var fileName = match[1];
    var flagsMap = {
        'mobile.app.html': ['MOBILE'],
        'ipad.app.html': ['PC', 'IPAD'],
        'mobile1.app.html': ['MOBILE', 'MOBILE_1']
    };
    var flags = flagsMap[fileName] || ['PC'];
    for(var i = 0; i < flags.length; i ++) {
        // XXX 如果直接使用ad.impl.weigou.dist会导致gcc对define的变量优化的时候
        // 有所顾虑，无法达到我们期望的删除无用分支的代码的目的。
        // ad.impl.weigou.dist[flags[i]] = true;
        window['ad']['impl']['weigou']['dist'][flags[i]] = true;
    }
}
}

/**
 * @enum {string}
 */
ad.impl.weigou.constants = {
    //'SEARCH_DOMAIN': 'http://10.65.7.31:8091/ecomui',
    //'SEARCH_DOMAIN': 'http://10.50.88.18:8200/ecomui',
    'SEARCH_DOMAIN': 'http://weigouapp.baidu.com/weigou',
    'WEIGOU_DOMAIN': 'http://weigou.baidu.com',
    // 'WEIGOU_DOMAIN': 'http://cq01-rdqa-pool017.cq01.baidu.com:8080',
    // 'WEIGOU_DOMAIN': 'http://10.46.188.60:8080',
    //'WEIGOU_DOMAIN': 'http://cq01-sdc-ma34.vm.baidu.com:8080', // 使用相对
    //'WEIGOU_DOMAIN': 'http://10.46.189.51:8004' // 使用相对
    //'WEIGOU_DOMAIN': 'http://10.46.188.60:8080'
    'MOBILE_SEARCH_DOMAIN': 'http://weigouapp.baidu.com/m'
    //'MOBILE_SEARCH_DOMAIN': 'http://10.237.2.183:8091/m',
    //'MOBILE_SEARCH_DOMAIN': 'http://10.65.7.31:8091/m',
};

/**
 * @enum {string}
 */
ad.impl.weigou.urls = {
    //'PROXY_HTML': 'http://cq01-ps-rdtest06-bbtocq.vm.baidu.com:8180/cache/biz/ecom/weigou/proxy.html',
    'PROXY_HTML': 'http://www.baidu.com/cache/biz/ecom/weigou/proxy.html',
    'PROXY_V2_HTML': 'http://www.baidu.com/cache/biz/ecom/weigou/proxy_v2.html',
    //'PROXY_HTML': 'http://fedev.baidu.com/~pengxing/weigou/proxy.html',
    //'PROXY_HTML': 'http://fedev.baidu.com:8082/proxy.html',
    //'PROXY_HTML': 'http://fedev.baidu.com:8088/src/ad/service/proxy.html',
    //'PROXY_HTML': 'http://yf-ps-q4-dywa33.yf01.baidu.com/proxy.html',
    //'PROXY_HTML': 'http://cq01-rdqa-dev044.cq01.baidu.com:8001/weigou.junwei/proxy.html',
    //'PROXY_HTML': 'http://cq01-rdqa-dev044.cq01.baidu.com:8002/src/ad/impl/weigou/proxy.html',

    // 检索端地址 weigouapp.baidu.com，PC端已经去掉了中间的weigou，wise没有，所以要区分开来
    'SEARCH': ad.impl.weigou.dist.MOBILE ? '/data/weigou/search' : '/data/search',
    'DETAIL': ad.impl.weigou.dist.MOBILE ? '/data/weigou/detail' : '/data/detail',
    'RECOMMEND': '/data/recommend',
    'DETAIL_RECOMMEND': '/data/detail_recommend',

    'ATTRIBUTE': '/data/weigou/attribute',

    'TICKET_SEARCH': '/data/ticket/search',
    'TICKET_DETAIL': '/data/ticket/detail',
    'TICKET_AGENDA_DETAIL': '/data/ticket/agenda_detail',

    // 以下都是weigou.baidu.com
    'REGION': '/service/user/api/get_region',
    'REGION_JD': '/service/user/api/get_jd_region',

    'MOBILE_REGION': '/service/user/api/get_region_async',
    'JD_TOWN': '/service/user/api/get_jd_town',

    'MOBILE_VCODE': '/service/user/api/send_vcode',
    'ADDRESSES': '/service/user/api/get_address',
    'ADDRESSES_V2': '/service/user/api/get_address_v2',
    'MY_ADDRESSES': '/service/user/api/get_my_address',

    'SUBMIT_BUY': '/service/order/api/create',
    'CHECK_ORDER': '/service/order/api/check_order',

    'MODIFY_PASSWORD_LINK': '/service/user/security',
    'ORDER_LINK': '/service/user/order/list',

    'LOG_URL': 'http://bzclk.baidu.com/weigou.php',
    // 'LOG_URL': 'http://cq01-rdqa-pool017.cq01.baidu.com:8000/weigou.php',
    // 'LOG_URL': 'http://192.168.1.239:8091/weigou.php',


    'AGMT_LINK': '/service/site/page?view=agreement'
};

/**
 * @enum {string}
 */
ad.impl.weigou.events = {
    'DETAIL_VIEW': 'detail_view',
    'PURCHASE_VIEW': 'purchase_view',
    'SUCCESS_VIEW': 'success_view',

    'REGION_CHANGED': 'region_changed',
    'GO_ON_SHOPPING': 'go_on_shopping',
    'BACK': 'back'
};
