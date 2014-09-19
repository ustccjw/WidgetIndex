/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: zhidao_loader.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao/zhidao_loader.js ~ 2013/01/24 16:22:18
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * 企业知道广告加载器
 **/


goog.provide('ad.impl.zhidao.Loader');

/**
 * constructor
 */
ad.impl.zhidao.Loader = function(){
    
    /**
     * 请求广告地址（不带word, 不带di）
     * @type {string}
     * @private
     */
    //this._requestUrl = 'http://localhost:81/ws/default2.aspx?di=641&tm=baiduASPGBannerTRH&word=';
    //this._requestUrl = 'http://10.42.85.30:8086/ecom?di=641&tm=baiduASPGBannerTRH&lang=3&word=';
    //this._requestUrl = 'http://a.baidu.com/ecom?di=641&tm=baiduASPGBannerTRH&lang=3&word=';
    this._requestUrl = 'http://a.baidu.com/ecom?tm=baiduASPGBannerTRH&lang=3';
    
    /**
     * dom root ID
     * @type {string}
     * @private
     */
     this._adDomId = '';
     
    /**
     * 企业ID 提供给word
     * @type {string}
     * @private
     */
     this._adSiteId = '';
     
     /**
     * 广告位ID
     * @type {string}
     * @private
     */
    this._adId = '';
    
    /**
     * 回调函数
     * @type {Function}
     * @private
     */
    this._callback;
}


/**
 * 设置物料加载所需的数据
 * @param {string} domId 物料根节点id
 * @param {string} adId 广告位id
 * @param {string} siteId 企业id
 * @param {string} callback 回调函数
 */
ad.impl.zhidao.Loader.prototype.setAdData = function(domId, adId, siteId, callback){
    this._adDomId = domId;
    this._adSiteId = siteId;
    this._adId = adId;
    if(callback){
        this._callback = callback;
    }
    this._requestAD();
}

/**
 * 运行知道页回调函数
 */
ad.impl.zhidao.Loader.prototype._doCallBack = function(){
    if(this._callback){
        (this._callback)();
    }
}

/**
 * @private
 * @param {string} resp 响应
 * @return {Object} result 广告物料数据
 */
ad.impl.zhidao.Loader.prototype._getScriptUrl = function(resp){
    var result = {};
    if(!resp){
        return result;
    }
    var reg_url = resp.match(/src=\'([^']+)\'/i);
    
    if(reg_url && reg_url.length && reg_url.length == 2){
        result['url'] = reg_url[1];
    }
    var reg_id = resp.match(/id=\'([^']+)\'/i);
    if(reg_id && reg_id.length && reg_id.length == 2){
        result['id'] = reg_id[1];
    }
    return result;
}

/**
 * 添加脚本代码，展现广告
 * @param {Object} data 脚本地址
 */
ad.impl.zhidao.Loader.prototype._showAD = function(data) {
    var root = baidu.g(this._adDomId);
    if(data && data['id']){
        var content = baidu.dom.create('div', {'id':data['id']});
        root.appendChild(content);
    }
    if(data && data['url']){
        var script = document.createElement("script");
        baidu.dom.setAttr(script, 'charset', 'utf-8');
        baidu.dom.setAttr(script, 'src', data['url']);
        root.appendChild(script);
    }
};

/**
 * 请求广告投放代码
 * @private
 */
ad.impl.zhidao.Loader.prototype._requestAD = function(){
    var me = this;
    var url = me._requestUrl + '&word=' + me._adSiteId + '&di=' + me._adId + '&r=' + Math.random();
    baidu.sio.callByBrowser(url, function(data){
        var material_data = me._getScriptUrl(window['arrBaiduAds'][me._adId]);
        if(material_data){
            me._showAD(material_data);
            me._doCallBack();
        }
    });
}









/* vim: set ts=4 sw=4 sts=4 tw=100: */
