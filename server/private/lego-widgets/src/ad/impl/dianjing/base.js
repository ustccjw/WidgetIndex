/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/dianjing/Base.js ~ 2013/02/26 21:19:50
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * 点睛的主要逻辑，作为图片搜索结果页和大图页的基类
 **/

goog.require('ad.Material');
goog.require('ad.widget.bzt.Dianjing');
goog.require('ad.widget.image.Sticker2');
goog.provide('ad.impl.dianjing.Base');


/**
 * @constructor
 */
ad.impl.dianjing.Base = function(config){

    /**
     * 配置
     * @type {Object.<string, *>}
     * @private
     */
    this._config = config;

    /**
     * 点睛广告数据
     * @type {Object.<string, *>}
     * @private
     */
    this._adData = {};

    /**
     * 广告请求标记哈希
     * @type {Object.<string, boolean>}
     * @private
     */
    this._adRequestFlagHash = {};

    /**
     * 广告容器
     * @type {HTMLElement}
     * @private
     */
    this._targetDom;

    /**
     * 是否在大图页请求了第一批图片点睛广告
     * @type {boolean}
     * @private
     */
    this._detail_hasrequest_ad = false;

    /**
     * 唯一标示一次pv的qid
     * @type {string}
     * @private
     */
    this._qid = '';

    /**
     * 缓存promotion事件的参数，等到qid就绪后手动发送
     * @type {Array}
     * @private
     */
    this._doPromotion_args = [];

    /**
     * 当前的imgid
     * @type {string}
     * @private
     */
    this._curImgId;

    /**
     * 切换之前的imgid
     * @type {string}
     * @private
     */
    this._lastImgId;

    /**
     * 发送底图PV步长
     * @type {number}
     * @private
     */
    this._sendPVStep = 5;

    /**
     * 发送底图PV图片id数组
     * @type {Object}
     * @private
     */
    this._sendPVImages = [];

    /**
     * 发送底图PV地址
     * @type {string}
     * @private
     */
    this._sendPVUrl = 'http://nmp-ws.baidu.com/?word={0}&list={1}&img_show=1&url={2}';

}

/**
 * 设置容器DOM
 * @param {HTMLElement} dom
 */
ad.impl.dianjing.Base.prototype.setTargetDom = function(dom){
    this._targetDom = dom;
}

/**
 * 获取容器DOM
 * @return {HTMLElement}
 */
ad.impl.dianjing.Base.prototype.getTargetDom = function(){
    return this._targetDom;
}

ad.impl.dianjing.Base.prototype.setAdStyle = baidu.fn.blank;

/**
 * 渲染点睛广告
 * @param {Object} args
 */
ad.impl.dianjing.Base.prototype._showAd = function(args){
    var me = this;
    var imgid = args['imaId'];
    var zoom = parseFloat(args['zoom']);

    var adInfo = me._getAdInfoByImgId(imgid);
    me._resetAdinfo(adInfo, zoom);
    if((adInfo && adInfo['ads'] && adInfo['ads'].length) || adInfo && adInfo['bks'] && adInfo['bks'].length || adInfo && adInfo['vds'] && adInfo['vds'].length){
        me._disposeAd(); //销毁之前的物料
        var canvasId = me._getCanvasIdByImgid();
        var canvas = baidu.dom.create('div',{'id': canvasId});
          me._targetDom.appendChild(canvas);

          var material = new ad.Material(canvasId), widget;
          if(parseInt(adInfo['style_type'], 10) == 3){
              widget = new ad.widget.image.Sticker2(adInfo);
          }
          else {
              widget = new ad.widget.bzt.Dianjing(adInfo);
          }
        material.setWidgets(
            [widget]
        );
        ad.base.setTimeout(function(){
            if(baidu.g(canvasId)){
                material.show();

                //点睛广告标注显示sendlog 为了防止多次进入发送多次 做了一些判断
                if(me._showBZLogFlag != me._curImgId){
                    if(widget.sendShowBZLog){
                        widget.sendShowBZLog();
                    }
                }
                me._showBZLogFlag = me._curImgId;

                if(me.setAdStyle !== baidu.fn.blank){
                    me.setAdStyle(widget);
                }

                 //贴片
                var pic = baidu.dom.first(me._targetDom);

                baidu.on(pic, 'mouseenter', function(){
                    if(me.getStyleTypeByImgId(me._curImgId) == 3){
                        if(me.widget){
                            if(baidu.cookie.get('ecom-ma-sticker-enable') !== 'false'){
                                if(me.widget.showSticker){
                                    me.widget.showSticker();
                                }
                                var root = me.widget.getRoot(), sticker;
                                if(root){
                                    sticker = baidu.dom.first(root);
                                }
                                if(sticker){
                                    sticker.style.height = '75px'; 
                                }
                            }
                        }
                    }
                });

                baidu.on(pic, 'mouseleave', function(){
                    if(me.getStyleTypeByImgId(me._curImgId) == 3){
                        if(me.widget){
                            if(baidu.cookie.get('ecom-ma-sticker-enable') !== 'false'){
                                ad.base.setTimeout(function(){
                                    if(me.widget.hideSticker && !me.widget._isEnterSticker){
                                        me.widget.hideSticker();
                                    }
                                }, 200);
                                
                                var root = me.widget.getRoot(), sticker;
                                if(root){
                                    sticker = baidu.dom.first(root);
                                }
                                if(sticker){
                                    sticker.style.height = '0px'; 
                                }
                            }
                        }
                    }
                });
            }
            
        },0);
    }
}

/**
 * 获取物料容器ID
 * @return {string} 
 */
ad.impl.dianjing.Base.prototype._getCanvasIdByImgid = function(){
    if(!COMPILED){
        return 'canvas';
    }
    else {
        return 'canvas_dianjing_detail';
    }
}

/**
 * 获取对应图片的广告数据
 * @param {string} imgid
 * @return {Object} 
 */
ad.impl.dianjing.Base.prototype._getAdInfoByImgId = function(imgid){
    return this._adData[imgid];
}

/**
 * 发送广告请求
 */
ad.impl.dianjing.Base.prototype.requestAd = baidu.fn.blank;

/**
 * 初始化 qid的获取 图片中间页事件的监听
 */
ad.impl.dianjing.Base.prototype.init = function(){
    var me = this;
    me.resetCookie();
    me._getQid();

    

    baidu.getObjectByName('ns.image.event.addListener')('SHOW_IMAGE_PROMOTION', function(e, args){
          if(me._qid){
              me._doPromotion(args);
          }
          else{
              me._doPromotion_args.push(args);
          }
    });

    if(me.setAdStyle !== baidu.fn.blank){
        baidu.getObjectByName('ns.image.event.addListener')('SHOW_IMAGE_DETAIL', function(e, args){
              var imgInfo;
              if(me._curImgId != args['imaId']){
                imgInfo = {
                      'id': me._curImgId,
                      'src': me._getImgUrl(args['objURL'])
                  }
                  me._sendPVImages.push(imgInfo);
                  me._sendPVLog(false);
            }
            me._curImgId = args['imaId'];
              
              if(!me._detail_hasrequest_ad){
                  me.requestAd(
                      {'imageIds': baidu.getObjectByName('ns.image')['firstPageList']},
                      function(){
                          me._showAd(args);
                      }
                  );
                  me._detail_hasrequest_ad = true;
              }
              else{
                  me._showAd(args);
            }
        });
    }
    else {
        baidu.getObjectByName('ns.image.event.addListener')('SHOW_IMAGE_MIDDLE', function(e, args){
              me._showAd(args);
        });
    }

    //定时器，手动发送所有剩余没发的底图展现 时间间隔是5s
    ad.base.setInterval(function(){
        me._sendPVLog(true);
    },5000);
}

/**
 * 获取当前的检索词的方法
 * @return {Function}
 */
ad.impl.dianjing.Base.prototype.getQuery = function(){
    return baidu.getObjectByName('ns.image.getQuery')();
}

/**
 * 获取请求广告数据地址
 * @param {Array} imgList 图片id数组
 * @return {string} url
 */
ad.impl.dianjing.Base.prototype.getAdUrl = function(imgList){
    if(!imgList)
        return '';
    if(!imgList.length){
        return '';
    }
    else{
        var url = [this._config['ad_server'] + '?callback=c'];
        url.push('wd=' + this.getQuery());
        url.push('tm=' + this._config['tpl']);
        //url.push('src=10');
        url.push('n=' + imgList.length);
        url.push('list=' + imgList.join('_'));
        url.push('qid=' + this._qid);
        //url.push('r=' + Math.random());
        return url.join('&');
    }
}

/**
 * 缓存广告数据
 * @param {Object} ads 广告数据
 * @param {number} page 页索引
 */
ad.impl.dianjing.Base.prototype.saveAd = function(ads, page){
    var me = this;
    me._adRequestFlagHash[page] = true;
    if(ads){
        baidu.array.each(ads['ads'], function(item, i){
            if(!me._adData[item['image_id']]){
                me._adData[item['image_id']] = {};
                //me._adData[item['image_id']]['ads'] = [];
            };
            if(!me._adData[item['image_id']]['ads']){
                me._adData[item['image_id']]['ads'] = [];
            }
            me._adData[item['image_id']]['ads'].push(item);
            me._adData[item['image_id']]['style_type'] = ads['style_type'];
        });
        baidu.array.each(ads['bks'], function(item, i){
            if(!me._adData[item['image_id']]){
                me._adData[item['image_id']] = {};
                //me._adData[item['image_id']]['ads'] = [];
            };
            if(!me._adData[item['image_id']]['bks']){
                me._adData[item['image_id']]['bks'] = [];
            }
            me._adData[item['image_id']]['bks'].push(item);
            me._adData[item['image_id']]['style_type'] = ads['style_type'];
        });
        baidu.array.each(ads['vds'], function(item, i){
            if(!me._adData[item['image_id']]){
                me._adData[item['image_id']] = {};
                //me._adData[item['image_id']]['ads'] = [];
            };
            if(!me._adData[item['image_id']]['vds']){
                me._adData[item['image_id']]['vds'] = [];
            }
            me._adData[item['image_id']]['vds'].push(item);
            me._adData[item['image_id']]['style_type'] = ads['style_type'];
        });
    }
}

/**
 * 获取第一页的图片id数据
 * @return {Array} 
 */
ad.impl.dianjing.Base.prototype.getImgListPage1 = function(){
    return baidu.getObjectByName('ns.image.firstPageList');
}

/**
 * 适配广告数据，用来重定位或者是其他修改
 * @param {Object} adinfo 广告数据
 * @param {number} zoom  原图缩放比率
 */
ad.impl.dianjing.Base.prototype._resetAdinfo = function(adinfo, zoom){
    var me = this;
    if(adinfo && adinfo['ads'] && adinfo['ads'].length){
        baidu.array.each(adinfo['ads'], function(item, i){
            //根据缩放比率适配坐标值
            item['icon_top_left_x_change'] = zoom * parseFloat(item['icon_top_left_x']);
            item['icon_top_left_y_change'] = zoom * parseFloat(item['icon_top_left_y']);
            adinfo['width_change'] = zoom * item['image_width'];
            adinfo['height_change'] = zoom * item['image_height'];
            //修改显示价格（ecom返回的是以分位单位的）
            item['price_change'] = me._fixPrice(item['price']);
        });
    }
    if(adinfo && adinfo['bks'] && adinfo['bks'].length){
        baidu.array.each(adinfo['bks'], function(item, i){
            //根据缩放比率适配坐标值
            item['icon_top_left_x_change'] = zoom * parseFloat(item['icon_top_left_x']);
            item['icon_top_left_y_change'] = zoom * parseFloat(item['icon_top_left_y']);
            adinfo['width_change'] = zoom * item['image_width'];
            adinfo['height_change'] = zoom * item['image_height'];
            //修改显示价格（ecom返回的是以分位单位的）
            //item['price_change'] = me._fixPrice(item['price']);
        });
    }
    if(adinfo && adinfo['vds'] && adinfo['vds'].length){
        baidu.array.each(adinfo['vds'], function(item, i){
            //根据缩放比率适配坐标值
            item['icon_top_left_x_change'] = zoom * parseFloat(item['icon_top_left_x']);
            item['icon_top_left_y_change'] = zoom * parseFloat(item['icon_top_left_y']);
            adinfo['width_change'] = zoom * item['image_width'];
            adinfo['height_change'] = zoom * item['image_height'];
        });
    }
}

/**
 * 设置价格
 * @param {number} price 检索端返回的价格
 * @return {number}  处理后的价格
 */
ad.impl.dianjing.Base.prototype._fixPrice = function(price){
    return (price/100).toFixed(2);
}

/**
 * 是否需要发起广告请求
 * @param {number} page 页索引
 * @return {boolean}  
 */
ad.impl.dianjing.Base.prototype.enableRequest = function(page){
    return !this._adRequestFlagHash[page];
}

/**
 * 销毁之前的点睛物料
 */
ad.impl.dianjing.Base.prototype._disposeAd = function(){
    var canvasId = this._getCanvasIdByImgid();
    var materialDom = baidu.g(canvasId);
    if(materialDom){
        var styleDom = baidu.dom.prev(materialDom);
        if(styleDom && styleDom.nodeName != 'IMG'){
            baidu.dom.remove(styleDom);
        }
        baidu.dom.remove(materialDom);
    }

}

/**
 * 获取qid
 */
ad.impl.dianjing.Base.prototype._getQid = function(){
    var me = this;
    baidu.sio.callByServer(
        me._config['qid_server'],
        function(qid){
            me._qid = qid;
            //qid就绪后发送之前的广告数据请求
            //结果页如果第二页没有发请求，就手动发
            if(me.requestAd !== baidu.fn.blank){
                  if(me.setAdStyle === baidu.fn.blank){
                      me._issetpage1 = true; //标记已发第一页的请求
                      me.requestAd({'imageIds':me.getImgListPage1(),'page':1});
                }
            }
            if(me._doPromotion_args.length){
                for(var i = 0; i < me._doPromotion_args.length; i ++){
                    me._doPromotion(me._doPromotion_args[i]);
                }
            }
        }
    );
}

/**
 * promotion事件处理
 * param {Object} args 参数
 */
ad.impl.dianjing.Base.prototype._doPromotion = function(args){
    var me = this;
    if(me.requestAd !== baidu.fn.blank){
          me.requestAd(args);

          if(me.setAdStyle !== baidu.fn.blank){
              me._detail_hasrequest_ad = true;
        }
      }
}

/**
 * 恢复贴片的展现
 */
ad.impl.dianjing.Base.prototype.resetCookie = function() {
    baidu.cookie.set('ecom-ma-sticker-enable', true);
}

/**
 * 通过图片id获取styletype
 * @param {string} imgid
 * @return {number}
 */
ad.impl.dianjing.Base.prototype.getStyleTypeByImgId = function(imgid) {
    return parseInt(this._adData[imgid]['style_type'], 10);
}

/**
 * 设置当前的imgid(调试用，一般不会显式调用该方法)
 * @param {string} imgid
 */
ad.impl.dianjing.Base.prototype.setCurImgId = function(imgid) {
    this._curImgId = imgid;
}

/**
 * 发送底图的展现请求
 * @param{boolean} isAuto 是否是定时器发出的
 */
ad.impl.dianjing.Base.prototype._sendPVLog = function(isAuto) {
    if(this._sendPVImages.length >=2){
        if(this._sendPVImages[0] === this._sendPVImages[1]){
            this._sendPVImages.shift();
        }
    }
    var query = this.getQuery(), list, len = this._sendPVImages.length;
    if(this._sendPVImages && len){
        if(isAuto){
            list = this._sendPVImages.splice(0,len);
        }
        else {
            if(len >= this._sendPVStep) {
                list = this._sendPVImages.splice(0,5);
            }
        }
        var idList = [], srcList = [];

        if(list && list.length){
            for(var i = 0; i < list.length; i ++){
                idList.push(list[i]['id']);
                srcList.push(list[i]['src']);
            }
            try{
                baidu.sio.log(baidu.format(
                    this._sendPVUrl, 
                    query, 
                    idList.join('_'),
                    srcList.join('$')
                    )
                );
            }
            catch(err){
                
            }
            
        }
        
    }
    
}

/**
 * 获取当前大图的src
 * @param{string} 当前大图的原始url
 * @return{string} 加密之后的大图的原始url
 */
ad.impl.dianjing.Base.prototype._getImgUrl = function(imgUrl) {
    if(imgUrl){
        return encodeURIComponent(imgUrl);
    }
    else {
        return '';
    }
}












/* vim: set ts=4 sw=4 sts=4 tw=100: */
