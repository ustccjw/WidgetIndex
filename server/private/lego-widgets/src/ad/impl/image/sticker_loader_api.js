/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: sticker_loader.js 11222 2012-11-26 02:53:59Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/impl/image/sticker_loader.js ~ 2012/11/26 16:22:34
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 11222 $
 * @description
 * 图片贴片广告加载器相关的实现逻辑
 **/

goog.require('ad.impl.image.StickerLoader');

goog.provide('ecom.ma.sticker');

/**
 * 给图片提供的接口.
 * @export
 */
ecom.ma.sticker = {
    _instance: new ad.impl.image.StickerLoader(),

    /**
     * 设置检索词接口
     * @expose
     * @param {string} word 检索词（utf-8编码之后的）
     */
    setWord: function(word){
        ecom.ma.sticker._instance.setWord(word);
    },

    /**
     * 设置大图页的回调函数解决大图页滚动后屏幕抖动的问题
     * @expose
     * @param {Function} callback 回调
     */
    setCallBack: function(callback){
        ecom.ma.sticker._instance.setCallBack(callback);
    },

    /**
     * 获取是第几次广告请求
     * @expose
     */
    getPageNum: function(){
        return ecom.ma.sticker._instance.getPageNum();
    },

    /**
     * 老接口 现在不用了
     * @expose
     */
    changePic: function(){

    },

    /**
     * 预览
     * @expose
     */
    preview: function(data){
        ecom.ma.sticker._instance._renderRCV(data);
    }
}


