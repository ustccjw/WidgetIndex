/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: zhidao_company.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao/zhidao_company.js ~ 2013/01/24 16:22:18
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * 知道商业化接口
 **/


goog.require('ad.impl.zhidao.Loader');

goog.provide('ecom.ma.zhidao.Commercialization');

/**
 * 设置加载器数据，触发请求并加载物料
 * @param {string} domId 物料根节点id
 * @param {string} adId 广告位id
 * @param {string} siteId 企业id
 * @param {Function=} callback 回调函数
 * @export
 */
ecom.ma.zhidao.Commercialization.showAd = function(domId, adId, siteId, callback){
    if(!window['arrBaiduAds']){
        //因为asp的响应是形如 arrBaiduAds[{广告位ID}]="...." 这样的
        window['arrBaiduAds'] = {}; 
    }
    new ad.impl.zhidao.Loader().setAdData(domId, adId, siteId, callback);
}

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
