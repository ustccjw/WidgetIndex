/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/totem/aladdin.js ~ 2013/12/23 16:31:38
 * @author wdw0705@gmail.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * aladdin相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.totem.Aladdin');
goog.provide('ecom.ma.image.ald2');

ad.Debug(function(async){
    ecom.ma.image.ald2 = {
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
            var me = this;
            me._init();
            return me._m.getId();
        },

        /**
         * 获取阿拉丁宽高
         * @return {width: number, height: number}
         */
        getArea: function(){
            var config = AD_CONFIG['aladdin'];
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
            return {'width':width,'height':height};
        },

        /**
         * 渲染广告
         */
        show: function(){
            var me = this;
            me._init();
            me._m.dispose();
            //因为浮层挂在body下，而不是在canvas里，所以需要手动remove
            var midDom = me._w.getMidDomId();
            if(baidu.g(midDom)){
                baidu.dom.remove(baidu.g(midDom));
            }  
            me._m.show();
        },

        /**
         * 初始化物料
         */
        _init: function(){
            var me = this;
            if(!me._w){
                me._w = new ad.widget.totem.Aladdin(AD_CONFIG['aladdin']);
            }
            if(!me._m){
                me._m = new ad.material.BaseMaterial();
                me._m.setWidgets([me._w]);
            }
        }
    }

    ad.base.exportPath('ecom.ma.image.ald', ecom.ma.image.ald2);

    //该样式只适应V1模式
    /*
    if (async === true) {
        return ecom.ma.image.ald2._m;
    }
    */
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
