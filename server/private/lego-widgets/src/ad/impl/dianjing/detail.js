/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/dianjing/main.js ~ 2013/02/26 21:19:50
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * main相关的实现逻辑
 **/

goog.require('ad.dom');
goog.require('ad.impl.dianjing.Base');

goog.provide('ad.impl.dianjing.BigPic');

/**
 * @constructor
 * @extends {ad.impl.dianjing.Base}
 */
ad.impl.dianjing.BigPic = function(config){
    ad.impl.dianjing.Base.call(this, config);

    /**
     * widget
     * @type {HTMLElement}
     **/
    this.widget;
};
baidu.inherits(ad.impl.dianjing.BigPic, ad.impl.dianjing.Base);

/**
 * 发送广告请求
 * @param{Object} args 图片传来的参数
 * @param{Function} callback 回调
 */
ad.impl.dianjing.BigPic.prototype.requestAd = function(args, callback){
    var me = this;
    
    var _callback = function(adData){
            if(me.enableRequest(args['page'])){
            me.saveAd(adData, args['page']);
        }
        if(callback){
            callback();
        }
    };
    var url = me.getAdUrl(args['imageIds']);
    if(url && me._qid){
        baidu.sio.callByServer(
            url,
            _callback
            ,{'charset':'gbk'}    
        );
    }
}

/**
 * 调整物料位置
 * @param{Object} widget 点睛模块
 */
ad.impl.dianjing.BigPic.prototype.setAdStyle = function(widget){
    var me = this;
    me.widget = widget;
    var dom = me.getTargetDom();
    var img = baidu.dom.first(dom);
    var left = ad.dom.getStyle(img, 'left');
    var top = ad.dom.getStyle(img, 'top');
    var bottom = parseInt(ad.dom.getStyle(dom, 'height'), 10) - parseInt(top, 10) - parseInt(ad.dom.getStyle(img, 'height'), 10);
    if(me.getStyleTypeByImgId(me._curImgId) == 3){
        baidu.dom.setStyles(baidu.dom.first(widget.getRoot()), {'left':left, 'bottom': bottom + 'px'});
    }
    else {
        baidu.dom.setStyles(baidu.dom.first(widget.getRoot()), {'left':left, 'top': top});
    }
}    

/**
 * 是否需要发送广告数据请求
 * @param{number} page 页索引
 */
ad.impl.dianjing.BigPic.prototype.enableRequest = function(page){
    return true;
}


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
