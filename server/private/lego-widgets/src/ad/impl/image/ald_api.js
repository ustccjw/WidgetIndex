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

goog.require('ad.impl.image.Ald');

goog.provide('ecom.ma.image.ald');

ecom.ma.image.ald = {
    /**
     * 物料
     * @type {Object}
     */
    _m: null,

    /**
     * 模块
     * @type {Object}
     */
    _w: null,

    /**
     * 获取物料id
     * @return {string}
     */
    getId: function(){
        return AD_CONFIG['id'];
    },

    /**
     * 获取阿拉丁宽高
     * @return {width: number, height: number}
     */
    getArea: function(){
        var config = AD_CONFIG['ald'];
        var width = 0;
        var height = 0;
        if(config && config['ads'] && config['ads'].length){
            for(var i = 0; i < config['ads'].length; i ++){
                width += 10 + parseInt(config['ads'][i]['small_width']);
                if(height < parseInt(config['ads'][i]['small_height'])){
                    height = parseInt(config['ads'][i]['small_height']);
                }
            }
        }
        return {'width':width - 10,'height':height};
    },

    /**
     * 渲染广告
     */
    show: function(){
        var me = this;
        if(!me._w){
            me._w = new ad.widget.bzt.ImageAld(AD_CONFIG['ald']);
        }
        var midDom = me._w.getMidDomId();
        if(!me._m){
            me._m = new ad.Material(me.getId());
            me._m.setWidgets([me._w]);
        }
        else{
            me._m.dispose();
            //因为浮层挂在body下，而不是在canvas里，所以需要手动remove
            baidu.dom.remove(baidu.g(midDom));
        }
        me._m.show();
        me._m.initMonitor(AD_CONFIG['main_url']);
        me._m.getCMS().init(midDom);

    }
}

ad.base.exportPath('ecom.ma.image.ald', ecom.ma.image.ald);









