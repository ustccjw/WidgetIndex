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

goog.require('ad.base');
goog.require('ad.plugin.loader');
goog.require('ad.plugin.AspLoader');

goog.provide('ad.impl.image.StickerLoader');



/**
 * @constructor
 */
ad.impl.image.StickerLoader = function(){
    /**
     * 检索词（百度图片rd传递过来的并且经过utf-8编码，因为asp那里需要该编码格式）
     * @type {string}
     * @private
     */
    this._query;

    /**
     * asp广告地址（不带word）
     * @type {string}
     * @private
     */
    this._aspUrl = 'http://a.baidu.com/ecom?di=641&tm=baiduASPGBannerTRH&lang=3&word=';

    /**
     * tag广告地址
     * @type {string}
     * @private
     */
    //this._tagUrl = 'http://jx-ma-eval-001.jx.baidu.com:8090/ui';
    this._tagUrl = 'http://nmp-ws.baidu.com/ui2';

    /**
     * 跨域页面
     * @type {string}
     * @private
     */
    this._proxy = 'static/searchdetail/html/imgProxy.html';
    //this._proxy = 'src/ad/impl/dianjing/realenv-detail/imgProxy.html';

    /**
     * tag物料地址
     * @type {string}
     * @private
     */
    this._tagMatUrl = 'http://ecma.bdimg.com/adtest/c1c587ec12cc95ff16d10f992c661138.js';

    /**
     * 大图页回调函数
     * @type {Function}
     * @private
     */
    this._callbackDetail;

    /**
     * 请求次数
     * @type {number}
     * @private
     */
    this._adReqCount = 0;

    /**
     * 当前的imgid
     * @type {string}
     * @private
     */
    this._curImgId;

    /**
     * 唯一标示一次pv的qid
     * @type {string}
     * @private
     */
    this._qid = '';

    /**
     * 获取qid服务地址,用来区分一次pv
     * @type {string}
     * @private
     */
    this._qidServer = 'http://nmp-ws.baidu.com/qid?callback=';


    /**
     * 图片id数组缓存
     * @type {Array}
     * @private
     */
    this._imgIds = [];

    /**
     * 切换图片的总次数
     * @type {number}
     * @private
     */
    this._changeCount = 0;

    /**
     * 在将要渲染新物料之前的物料
     * @type {Object}
     * @private
     */
    this._mat;

    this.curIndex = -1;
};

/**
 * 设置检索词，同时也是入口
 * @param {string} query 检索词（utf-8编码之后的）
 */
ad.impl.image.StickerLoader.prototype.setWord = function(query){
    this._query = query;
    this._init();
}

/**
 * 设置大图页的回调函数解决大图页滚动后屏幕抖动的问题
 * @param {Function} callback 回调
 */
ad.impl.image.StickerLoader.prototype.setCallBack = function(callback){
    this._callbackDetail = callback;
}

/**
 * 运行大图页回调函数
 */
ad.impl.image.StickerLoader.prototype._doCallBackDetail = function(){
    if(typeof this._callbackDetail == 'function'){
        this._callbackDetail();
    }
}

/**
 * 初始化对大图页事件的监听器
 * @private
 */
ad.impl.image.StickerLoader.prototype._init = function(){
    this._getQid();

    // 监听img抛出的事件
    var nsImageEvent = /** @type {{addListener:Function}} */ (ad.base.getObjectByName('ns.image.event'));
    if (nsImageEvent) {
        var me = this;
        nsImageEvent.addListener('SHOW_IMAGE_PROMOTION', function(e, args){
            me._promotionEventHandler(args);
        });
        nsImageEvent.addListener('SHOW_IMAGE_DETAIL', function(e, args){
            if(me._curImgId == args['imaURL']){
                return;
            }
            me._curImgId = args['imaURL'];
            me._detailEventHandler(args);
        });
    }
}

/**
 * promotion事件处理
 * param {Object} args 参数
 * @private
 */
ad.impl.image.StickerLoader.prototype._promotionEventHandler = function(args){
    this._imgIds = this._imgIds.concat(args['imaURLs']);
}

/**
 * detail事件处理
 * param {Object} args 参数
 * @private
 */
ad.impl.image.StickerLoader.prototype._detailEventHandler = function(args){
    var me = this;

    if(me._changeCount % 8 == 0){
        if(me._qid){
            //改成了post方式
            ad.base.postByWindowName(
                me._tagUrl, 
                me._getPostData(me._getImgIdsByImgId(args['imaURL'])),
                function(res){
                    var data = baidu.json.parse(res);
                    me._adReqCount ++; //广告请求次数+1
                    me._removeMat(); //销毁之前渲染的物料
                    if(!data){
                        //asp
                        me._renderASP();
                    }
                    else if(data['rcv'] && data['render']){
                        // rcv
                        me._renderRCV(data);
                    }
                    else {
                        // adconfig
                        me._renderConfig(data);
                    };
                },
                {'proxy': me._proxy}
            );
        }
    }

    me._changeCount ++;
}

/**
 * 获取是第几次广告请求
 */
ad.impl.image.StickerLoader.prototype.getPageNum = function(){
    return this._adReqCount;
}

/**
 * 获取qid
 * @private
 */
ad.impl.image.StickerLoader.prototype._getQid = function(){
    //return;
    var me = this;
    baidu.sio.callByServer(
        me._qidServer,
        function(qid){
            me._qid = qid;
            me._changeCount = 0;//开始广告请求
            if(me._curImgId){
                me._detailEventHandler({'imaURL': me._curImgId});
            }
        }
    );
}

/**
 * 删除物料和对应的样式，以便重新绘制新的物料
 * @private
 */
ad.impl.image.StickerLoader.prototype._removeMat = function(){
    var canvas = baidu.g('ecma-8964');
    if (canvas) {
        canvas.innerHTML = '';
        var styleDom = baidu.dom.prev(canvas);
        if(styleDom){
            if(styleDom.nodeName == 'STYLE'){
                baidu.dom.remove(styleDom);
            }
        }
        //删除精算
        while(baidu.dom.next(canvas)){
            baidu.dom.remove(baidu.dom.next(canvas));
        }
        //FIXME:这里其实还要取消物料canvas挂接的click事件，否则会导致某些不需要发送clickmonkey的监测也发了，但是这是在logclick5.js里挂接的
    }
}

/**
 * 获取指定imgid之后的8个imgid
 * @param {string} imgid 指定的图片id
 * @return {?Array|undefined} arrImgid 该imgid之后的8个imgid
 */
ad.impl.image.StickerLoader.prototype._getImgIdsByImgId = function(imgid){
    var me = this, len = me._imgIds.length;
    if(len){
        for(var i = 0; i < len; i ++){
            if(me._imgIds[i] == imgid){
                return me._imgIds.slice(i,i+8);
            }
        }
    }
}

/**
 * 获取post数据
 * @param {?Array|undefined} imgid 图片id(8个)
 * @return {Object} post数据
 */
ad.impl.image.StickerLoader.prototype._getPostData = function(imgid){
    if (!imgid) {
        return null;
    }

    var postData = {
        'wd': this._getQueryForTag(),
        'src': 2,
        'qid': this._qid,
        'image_url': imgid
    }

    return postData;
}

/**
 * 获取asp广告地址
 * @return {string} asp广告地址
 */
ad.impl.image.StickerLoader.prototype._getASPUrl = function(){
    var me = this;
    return me._aspUrl + me._query + '_' + me._qid + '&r=' + Math.random();
}

/**
 * 根据检索端返回的结果适配tag广告的AD_CONFIG
 * @param {Object} adData 检索端返回的结果
 * @return {Object} AD_CONFIG
 */
ad.impl.image.StickerLoader.prototype._getTagADConfig = function(adData){
    return {
        'id': "ecma-8964",
        'shiyan1': adData
    };
}

/**
 * 去掉最后一个”了“
 * @return {string} 
 */
ad.impl.image.StickerLoader.prototype._getQueryForTag = function(){
    var decode = decodeURIComponent(this._query);
    var l = decode.length;
    //return encodeURIComponent(decode.substr(0,l-1));
    //改成post之后，敏明那边做了encode，所以这里就不encode了
    return decode.substr(0,l-1);
}

/**
 * 渲染rcv、render型物料，为了方便单测，单独提出来
 * @param {Object} data 检索端返回的结果{'rcv': ['xx',..], 'render', 'xx.js'}
 */
ad.impl.image.StickerLoader.prototype._renderRCV = function(data){
    var me = this;

    window['ECMA_require'](data['render'], function(boot){
        if (typeof boot['start'] == 'function'){
            //素材库的render的canvasid是后端生成的，不是ecma-8964
            var canvasId = boot['get']('RT_CONFIG')['id'];
            if(canvasId){
                baidu.g('ecma-8964').innerHTML = '<div id="' + canvasId +'"></div>';
            }

            if(boot && boot['set']){
                boot['set']('AD_CONFIG', me.getAdconfigByLinks(data['rcv'], boot['get']('LINKS'), boot['get']('AD_CONFIG')));
                boot['set']('LINKS', data['rcv']);
            }
            me._mat = boot['start'](true);

            me._mat.show();
        }
        me._doCallBackDetail();

    });
}

/**
 * 渲染ASP
 */
ad.impl.image.StickerLoader.prototype._renderASP = function(){
    ECMA_ASP_require(this._getASPUrl(), function(){
        //me._doCallBackDetail();
    });
}

/**
 * 渲染模板稳定，物料动态型物料
 * @param {Object} data 检索端返回的AD_CONFIG
 */
ad.impl.image.StickerLoader.prototype._renderConfig = function(data){
    var me = this;

    window['ECMA_require'](me._tagMatUrl, function(boot){
        if(boot && boot['set']){
            boot['set']('AD_CONFIG', me._getTagADConfig(data));
        }
        if(typeof boot['start'] == 'function'){
            me._mat = boot['start'](true);
            me._mat.show();
        }

        me._doCallBackDetail();
    });
}

/**
 * 通过新的LINKS获取新的AD_CONFIG
 * @param {Array} nlinks 新的LINKS
 * @param {Array} olinks 旧的LINKS
 * @param {Object} oadconfig 旧的AD_CONFIG
 * @return {Object|undefined}
 */
ad.impl.image.StickerLoader.prototype.getAdconfigByLinks = function(nlinks, olinks, oadconfig) {
    var visitUrl = function(adConfig){
        for(var p in adConfig){
            if(typeof adConfig[p] == 'string'){
                adConfig[p] = getNewRCV(adConfig[p]) || adConfig[p];
            }
            else {
                visitUrl(adConfig[p]);
            }
        }
    }
    var getNewRCV = function(rcv){
        for(var i = 0; i < olinks.length; i ++){
            if(olinks[i] == rcv){
                return nlinks[i];
            }
        }
    }
    visitUrl(oadconfig);
    return oadconfig;
};

/**
 * 供测试用
 * @return {Object|undefined}
 */
ad.impl.image.StickerLoader.prototype._getAdData = function() {
    var me = this;
    var config = {
        "logo_url":"http://t.womenwan.com/dw/baidu/yw.jpg",
        "show_url":"http://www.yaowan.com",
        "site_url":"http://www.yaowan.com",
        "ads" : [
            {
                "desc":"两大图广告1test123",
                "image_url":"http://t.womenwan.com/dw/baidu/jdsj/jdsj03.jpg",
                "click_url":"http://10.65.7.31:8765/click.php?t=S-30d15frnsmhxKw000002swl8mX0000Z6000Q6Q00a3as000s0000.mLFW5HR3njb40A-Vu1Y0mv_qrDn3PHTYwDR3nDcsPHD1fWnkfHbvwWFKPjwAfRujrRm0THLiJ_LhgL7dugF40ZNzUjdCIZwsrBtEIa44myqLmy38mvqVQvI9UyREphw1phFbIZKWTz4spZ0OIAIdTvNz5H0100"
            },
            {
                "desc":"两大图广告2test123",
                "image_url":"http://t.womenwan.com/dw/baidu/jdsj/jdsj04.jpg",
                "click_url":"http://10.65.7.31:8765/click.php?t=S-30d15frnsmhxKw000002swl8mX0000Z6000Q6Q00a4as000s0000.mLFW5HRLrj010A-Vu1Y0mv_qrDn3PHTYwDR3nDcsPHD1fWnkfHbvwWFKPjwAfRujrRm0THLiJ_LhgL7dugF40ZNzUjdCIZwsrBtEIa44myqLmy38mvqVQvI9UyREphw1phFbIZKWTz4spZ0OIAIdTvNz5H0Y00"
            }
        ]
    };

    var arrRcv = [
        'http://www.volvocars.com/zh-CN/campaigns/60cluster/Pages/default.aspx?utm_source=Baidu&utm_medium=Imagedetail&utm_content=Image&utm_campaign=2013_Q3_60s',
        [
            'http://t.yaowan.com/game/jdsjbdtpcs.php?tguser=07',
            'http://t.yaowan.com/game/jqxsbdtpcs.php?tguser=07',
            'http://t.yaowan.com/game/tlcsbdtpcs.php?tguser=07',
            'http://t.yaowan.com/game/sgfybdtpcs.php?tguser=071',
            'http://t.yaowan.com/game/jzwcbdtpcs.php?tguser=07',
            'http://t.yaowan.com/game/yltxbdtpcs.php?tguser=07',
            'http://t.yaowan.com/game/html/tyym02/index.php?tguser=tpcs_001'
        ],
        'http://image.baidu.com/i?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1375775531072_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E8%8A%AC%E8%BE%BE', //接口升级后的fenda
        'http://bzclk.baidu.com/click.php?t=PjFkXjQ-SGTGFfVi00000Prf1dfz0000n6000cbH00aFDs000f000Z.mLFW5HcdnW6k0A-Vu1dvO5nJn0KWp1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6Kk5Tj8Y27xTgN-TMb0IgF_5y9YIZ0lQzq-QhP8QhdGmyqlpAN8QhPEUiqzQhIGuWqo5HDsnjm3rHnhTjY1XyNLNj0hIhtqnvw9rHIBmhN-FMuz5HchTMfqnBu8T1dUHNqKwD-fgiu8pHdUHNqFwNPFw7YhUhDqyYdxHR7jgiuE5y9YIZ0-nYD-nbm-nbuYIMn8XyqdpLR8mvqVFHFAphqCUh4GugI9UAV-T60', //jw
        'http://image.baidu.com/i?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1375775531072_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E8%8A%AC%E8%BE%BE' //fenda窄版
    ];

    var arrRender = [
        'http://ecma.bdimg.com/adtest/4faccf16b10955357ad5d4c31d558a9a.js', //沃尔沃
        'http://ecma.bdimg.com/adtest/db8e949e162733193ce34e369f3ef003.js', //要玩排行榜
        'http://ecma.bdimg.com/adtest/36429529aaaf6991ebad11de7eee6153.js', //接口升级后的芬达物料
        'http://bcscdn.baidu.com/adtest/c02ae028f3cc7a368ac17c39bf23c183.js', //jw
        'http://ecma.bdimg.com/adtest/d2d7c7ea7c9717a7a7b21044e52b8c78.js' //fenda窄版
    ];

    var reqCount = me.getPageNum();

    function getData(){
        me.curIndex ++;
        var len = arrRender.length;
        if(me.curIndex == len){
            me.curIndex = 0;
        }
        if(arrRcv[me.curIndex] instanceof Array){
            return {'rcv': arrRcv[me.curIndex], 'render': arrRender[me.curIndex]};
        }
        else {
            return {'rcv': [arrRcv[me.curIndex]], 'render': arrRender[me.curIndex]};
        }
    }

    var result;
    switch(reqCount % 3){
        //asp
        case 0:
            result = undefined;
            break;
        //rcv render型
        case 1:
            result = getData();
            break;
        //单一模板拼接AD_CONFIG
        case 2:
            result = config;
            break;
        default:
            result = undefined;
    }
    return result;
};



