/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/impl/weigou/user.js ~ 2013/05/07 17:24:59
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
goog.require('ad.impl.weigou.storage');

goog.provide('ad.impl.weigou.user');

ad.impl.weigou.user = {

/**
 * @private
 * @type {?Array.<Object>}
 */
_addresses: null,

/**
 * @private
 * @type {string}
 */
_region: '',

/**
 * Storage Key
 * 因为weigou.baidu.com上面实现了get_my_address，那么我们就可以统一国标和京东了
 * 只需要保存手机号和验证码即可（实际上验证码的意义也不大了）
 * @private
 * @type {string}
 */
_key: 'com.baidu.weigou.storage',

/**
 * 用来判断是否登录过，如果能够从
 * ad.impl.weigou.storage里面获取数据，说明可能登录过，需要
 * 通过调用获取地址的接口来确定是否真的是登录状态。
 * 如果成功的调用了获取地址的接口，那么session又会自动的延长30分钟
 * 如果调用获取地址的接口失败了，那么说明用户是没有登录的状态，显示登录表单之类的操作
 * @return {boolean}
 */
maybeIsLogin: function() {
    return ad.impl.weigou.user._checkLoginStatus(ad.impl.weigou.user._key);
},

/**
 * 强制删除用户本地保存的登录信息.
 */
forceLogout: function() {
    ad.impl.weigou.storage.remove(ad.impl.weigou.user._key);
    ad.impl.weigou.user._addresses = null;
},

/**
 * 获取当前的登录用户的手机号.
 * @return {?string}
 */
getMobile: function() {
    var key = ad.impl.weigou.user._key;
    if (ad.impl.weigou.user._checkLoginStatus(key)) {
        var userData = ad.impl.weigou.storage.get(key);
        return userData['mobile'];
    }
    return null;
},

/**
 * 获取当前的登录用户的手机号验证码/固定验证码.
 * @return {?string}
 */
getVcode: function() {
    var key = ad.impl.weigou.user._key;
    if (ad.impl.weigou.user._checkLoginStatus(key)) {
        var userData = ad.impl.weigou.storage.get(key);
        return userData['vcode'];
    }
    return null;
},

/**
 * 获取当前的地域信息
 * @return {string}
 */
getRegion: function() {
    return ad.impl.weigou.user._region;
},

/**
 * 设置当前的地域信息
 * @param {string} region 当前的区域，例如『北京』，『上海』
 */
setRegion: function(region) {
    region = (region || '').replace('全国', '') || '北京';
    ad.impl.weigou.user._region = region;
},

/**
 * 获取当前登录用户的常用地址.
 * @return {?Array.<Object>}
 */
getAddresses: function() {
    return ad.impl.weigou.user._addresses;
},

/**
 * 设置当前登录用户的常用地址.
 * @param {Array.<Object>} addresses 当前登录用户的常用地址，不区分京东和国标.
 */
setAddresses: function(addresses) {
    ad.impl.weigou.user._addresses = addresses;
},

/**
 * 登录成功之后设置登录的状态
 * @param {Object} customData 需要保存的一些信息.
 */
setLoginStatus: function(customData) {
    var key = ad.impl.weigou.user._key;
    var userData = ad.impl.weigou.storage.get(key) || {};
    userData = baidu.object.extend(/** @type {Object} */(userData), customData);
    ad.impl.weigou.storage.set(key, userData);
},

/**
 * @private
 * @return {boolean}
 */
_checkLoginStatus: function(merchant) {
    var userData = ad.impl.weigou.storage.get(merchant);
    var VCODE_VALID_PERIOD = 30 * 60 * 1000;

    if (!userData
        || !(userData['mobile'] && userData['vcode'] && userData['startTime'])
        || (+new Date() - userData['startTime'] > VCODE_VALID_PERIOD)
    ) {
        return false;
    }

    return true;
}

}














/* vim: set ts=4 sw=4 sts=4 tw=100: */
