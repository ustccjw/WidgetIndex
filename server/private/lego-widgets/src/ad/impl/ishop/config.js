
goog.provide('ad.impl.ishop.constants');
goog.provide('ad.impl.ishop.urls');
goog.provide('ad.impl.ishop.events');


/**
 * @enum {string}
 */
ad.impl.ishop.constants = {
    'SEARCH_DOMAIN': 'http://weigouapp.baidu.com',
    'ISHOP_DOMAIN': '', // 使用相对
    'YIHAODIAN_SUFFIX': '?tracker_u=107732880'
};

/**
 * @enum {string}
 */
ad.impl.ishop.urls = {
    'LOG_URL': '/v.gif',

    'SEARCH': '/data/ishop/search',
    'VCODE_IMAGE': '/service/user/api/get_image_vcode',
    'DELIVERY_RANGE': '/service/third_party/yhd/delivery_info.html',
    // 'DELIVERY_RANGE': 'http://cq01-sdc-ma34.vm.baidu.com:8080/service/third_party/yhd/delivery_info.html',
    'REGION': '/service/third_party/region/region.js',
    'MOBILE_VCODE': '/service/user/api/send_vcode',
    'SUBMIT_BUY': '/service/order/api/create',
    'ORDER_LIST': '/service/user/order/list',
    'MIDDLE_PAGE' : '/service/product/view/',
    'SEARCH_MIDPAGE': '/service/product/search',
    'LOGIN' : '/service/user/login'
};

/**
 * @enum {string}
 */
ad.impl.ishop.events = {
    'DETAIL_VIEW': 'detail_view',
    'PURCHASE_VIEW': 'purchase_view',
    'SUCCESS_VIEW': 'success_view'
}
