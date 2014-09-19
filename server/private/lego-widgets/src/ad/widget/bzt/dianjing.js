/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/bzt/dianjing.js ~ 2013/02/26 21:17:03
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * dianjing相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/bzt/dianjing.less');
goog.include('ad/widget/bzt/dianjing.html');

goog.provide('ad.widget.bzt.Dianjing');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.bzt.Dianjing = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_bzt_dianjing';

    /**
     * 默认配置
     * @type {number}
     * @private
     */
    this._timeoutid;

    /**
     * 开始展示标注信息的时刻
     * @type {Date}
     * @private
     */
    this._startDJ;

    /**
     * 点睛标记
     * @type {HTMLElement}
     * @private
     */
    this._flag;

    /**
     * 操作提示
     * @type {HTMLElement}
     * @private
     */
    this._tip;

    /**
     * 关闭操作提示
     * @type {HTMLElement}
     * @private
     */
    this._closeTip;

    /**
     * 标注
     * @type {Array}
     * @private
     */
    this._arrBZ;

};
baidu.inherits(ad.widget.bzt.Dianjing, ad.widget.Widget);

/** @override */
ad.widget.bzt.Dianjing.prototype.enterDocument = function() {
    ad.widget.bzt.Dianjing.superClass.enterDocument.call(this);

    // CODE HERE
    var me = this;
    var root = me.getRoot();
    me._flag = baidu.q('ec-dianjing-flag', root,'a')[0];
    me._tip = baidu.q('ec-dianjing-flag-tip', root,'div')[0];
    me._closeTip = baidu.q('ec-dianjing-flag-tip-close', me._tip,'div')[0];
    me._arrBZ = baidu.q('ec-biaozhu', root,'a');
    me._arrBKLogo = baidu.q('ec-dianjing-bk-idea', root,'div');
    me._arrBKDesc = baidu.q('ec-dianjing-bk-desc', root,'div');
    me._arrVDInfo = baidu.q('ec-dianjing-bg-info-vd', root,'div');
    if(!baidu.cookie.get('dianjing-tip')){
        me._tip.style.display = 'block';
    }
    /* 闪动效果
    var arrState = ['none', 'block'];
    var changeCount = 2;
    var start = 0;
    var intervalID = ad.base.setInterval(function(){
        baidu.array.each(me._arrBZ, function(item, i){
            item.style.display = arrState[start%2];
        });
        start ++;
        if(start == changeCount){
            ad.base.clearInterval(intervalID);
        }
    },300);
    */
    if(!baidu.browser.ie){
        me._showBZ(me._arrBZ);
    }

    //百科有无logo两种展示
    if(me._data['bks'] && me._data['bks'].length){
        baidu.array.each(me._data['bks'], function(item, i){
            if(!item['idea_url']){
                if(me._arrBKLogo && me._arrBKLogo[i]){
                    me._arrBKLogo[i].style.display = 'none';
                    if(me._arrBKDesc[i]){
                        me._arrBKDesc[i].style.width = '250px';
                    }
                }
            }
        });
    }

    //视频样式长度样式区别
    if(me._arrVDInfo && me._arrVDInfo.length){
        for(var i = 0; i < me._data['vds'].length; i ++){
            var title = me._data['vds'][i]['title'], cname;
            if(title){
                cname = 'ec-dianjing-info ec-vd-long';
            }
            else {
                cname = 'ec-dianjing-info ec-vd-short';
            }
            baidu.dom.first(me._arrVDInfo[i]).className = cname;
        }
    }
};

/** @override */
ad.widget.bzt.Dianjing.prototype.bindEvent = function() {
    ad.widget.bzt.Dianjing.superClass.bindEvent.call(this);

    // CODE HERE
    var me = this;
    var root = me.getRoot();
    var arrBiaozhu = baidu.q('ec-dianjing-biaozhu', root,'a');
    var arrInfo = baidu.q('ec-dianjing-bg-info', root,'div');
    var arrBiaozhuBK = baidu.q('ec-dianjing-biaozhu-bk', root,'a');
    var arrInfoBK = baidu.q('ec-dianjing-bg-info-bk', root,'div');
    var arrBiaozhuVD = baidu.q('ec-dianjing-biaozhu-vd', root,'a');
    var arrInfoVD = baidu.q('ec-dianjing-bg-info-vd', root,'div');

    baidu.on(me._flag, 'mouseenter', function(){
        me._tip.style.display = 'block';
    });

    baidu.on(me._flag, 'mouseleave', function(){
        if(baidu.cookie.get('dianjing-tip')){
            me._tip.style.display = 'none';
        }
    });

    baidu.on(me._closeTip, 'click', function(){
        me._tip.style.display = 'none';
        baidu.cookie.set('dianjing-tip', true);
    });

    baidu.array.each(arrBiaozhu, function(item, i){
        baidu.on(item, 'mouseenter', function(){
            me._resetAdinfoPosition(arrBiaozhu[i], arrInfo[i]);
            me._startDJ = new Date();
            me._sendLog(me._getRcvByIndex(i, 'ads'), 1);
            baidu.dom.setStyle(arrInfo[i], 'display', 'block');
        });
        baidu.on(item, 'mouseleave', function(){
            me._sendLog(me._getRcvByIndex(i, 'ads'), 3, me._getShowtime());
            if(me._data['style_type'] != 2){
                me._timeoutid = ad.base.setTimeout(function(){
                    baidu.dom.setStyle(arrInfo[i], 'display', 'none');
                }, 200);
            }
            else {
                me._timeoutid = ad.base.setTimeout(function(){
                    baidu.dom.setStyle(arrInfo[i], 'display', 'none');
                }, 50);
            }
        });
    });

    baidu.array.each(arrBiaozhuBK, function(item, i){
        baidu.on(item, 'mouseenter', function(){
            me._resetAdinfoPosition(arrBiaozhuBK[i], arrInfoBK[i]);
            me._startDJ = new Date();
            me._sendLog(me._getRcvByIndex(i, 'bks'), 1);
            baidu.dom.setStyle(arrInfoBK[i], 'display', 'block');
        });
        baidu.on(item, 'mouseleave', function(){
            me._sendLog(me._getRcvByIndex(i, 'bks'), 3, me._getShowtime());
            if(me._data['style_type'] != 2){
                me._timeoutid = ad.base.setTimeout(function(){
                    baidu.dom.setStyle(arrInfoBK[i], 'display', 'none');
                }, 200);
            }
            else {
                me._timeoutid = ad.base.setTimeout(function(){
                    baidu.dom.setStyle(arrInfoBK[i], 'display', 'none');
                }, 50);
            }
        });
    });

    baidu.array.each(arrBiaozhuVD, function(item, i){
        baidu.on(item, 'mouseenter', function(){
            me._resetAdinfoPosition(arrBiaozhuVD[i], arrInfoVD[i]);
            me._startDJ = new Date();
            me._sendLog(me._getRcvByIndex(i, 'vds'), 1);
            baidu.dom.setStyle(arrInfoVD[i], 'display', 'block');
        });
        baidu.on(item, 'mouseleave', function(){
            me._sendLog(me._getRcvByIndex(i, 'vds'), 3, me._getShowtime());
            me._timeoutid = ad.base.setTimeout(function(){
                baidu.dom.setStyle(arrInfoVD[i], 'display', 'none');
            }, 200);

        });
    });


    baidu.array.each(arrInfo, function(item, i){
        baidu.on(item, 'mouseenter', function(){
            if(me._timeoutid){
                ad.base.clearTimeout(me._timeoutid);
            }
        });
        baidu.on(item, 'mouseleave', function(){
            baidu.dom.setStyle(item, 'display', 'none');
        });
    });

    baidu.array.each(arrInfoBK, function(item, i){
        baidu.on(item, 'mouseenter', function(){
            if(me._timeoutid){
                ad.base.clearTimeout(me._timeoutid);
            }
        });
        baidu.on(item, 'mouseleave', function(){
            baidu.dom.setStyle(item, 'display', 'none');
        });
    });

    baidu.array.each(arrInfoVD, function(item, i){
        baidu.on(item, 'mouseenter', function(){
            if(me._timeoutid){
                ad.base.clearTimeout(me._timeoutid);
            }
        });
        baidu.on(item, 'mouseleave', function(){
            baidu.dom.setStyle(item, 'display', 'none');
        });
    });

};

/** @override */
ad.widget.bzt.Dianjing.prototype.patchData = function() {
    var me = this;
    var styleType = parseInt(me._data['style_type'], 10);
    switch(styleType){
        case 1:{
            if (this._data) {
                if(this._data['ads'] && this._data['ads'].length){
                    for(var i = 0; i < this._data['ads'].length; i ++){
                        this._data['ads'][i]['info_top_left_x'] = parseInt(this._data['ads'][i]['icon_top_left_x_change'], 10) - 120;
                        this._data['ads'][i]['info_top_left_y'] = parseInt(this._data['ads'][i]['icon_top_left_y_change'], 10) + 35;
                    }
                }
                //百科的信息统一显示在左侧
                var width = this._data['width_change'];
                var left;
                if(width){
                    left = parseInt(width, 10) - 30 - 10;
                }
                if(this._data['bks'] && this._data['bks'].length){
                    for(var i = 0; i < this._data['bks'].length; i ++){
                        this._data['bks'][i]['icon_top_left_x_change'] = left;
                        this._data['bks'][i]['info_top_left_x'] = this._data['bks'][i]['icon_top_left_x_change'] - 270;

                        this._data['bks'][i]['info_top_left_y'] = parseInt(this._data['bks'][i]['icon_top_left_y_change'], 10);
                    }
                }
                //视频
                if(this._data['vds'] && this._data['vds'].length){
                    for(var i = 0; i < this._data['vds'].length; i ++){
                        this._data['vds'][i]['info_top_left_x'] = parseInt(this._data['vds'][i]['icon_top_left_x_change'], 10) - 60;
                        this._data['vds'][i]['info_top_left_y'] = parseInt(this._data['vds'][i]['icon_top_left_y_change'], 10) + 35;
                    }
                }
            }
        }
        break;
        case 2:{

            var width = this._data['width_change'];
            var left;
            if(width){
                left = parseInt(width, 10) - 30 - 10;
            }
            var top = 5;
            if(this._data['ads'] && this._data['ads'].length){
                for(var i = 0; i < this._data['ads'].length; i ++){
                    this._data['ads'][i]['icon_top_left_x_change'] = left;
                    top += 35*i;
                    this._data['ads'][i]['icon_top_left_y_change'] = top;

                    this._data['ads'][i]['info_top_left_x'] = this._data['ads'][i]['icon_top_left_x_change'] - 270;
                    this._data['ads'][i]['info_top_left_y'] = this._data['ads'][i]['icon_top_left_y_change'];
                }
                top += 35;
            }
            if(this._data['bks'] && this._data['bks'].length){
                for(var i = 0; i < this._data['bks'].length; i ++){
                    this._data['bks'][i]['icon_top_left_x_change'] = left;
                    this._data['bks'][i]['info_top_left_x'] = this._data['bks'][i]['icon_top_left_x_change'] - 270;

                    top += 35*i;
                    this._data['bks'][i]['icon_top_left_y_change'] = top;
                    this._data['bks'][i]['info_top_left_y'] = this._data['bks'][i]['icon_top_left_y_change'];
                }
            }
            //视频
            if(this._data['vds'] && this._data['vds'].length){
                for(var i = 0; i < this._data['vds'].length; i ++){
                    this._data['vds'][i]['info_top_left_x'] = parseInt(this._data['vds'][i]['icon_top_left_x_change'], 10) - 60;
                    this._data['vds'][i]['info_top_left_y'] = parseInt(this._data['vds'][i]['icon_top_left_y_change'], 10) + 35;
                }
            }
        }
        break;

    }
    //截断百科的描述 最大35个汉字
    var arrMaxLength = [75,110];
    var maxLength;
    if(me._data['bks'] && me._data['bks'].length){
        baidu.array.each(me._data['bks'], function(item, i){
            if(item['idea_url']){
                maxLength = arrMaxLength[0];
            }
            else {
                maxLength = arrMaxLength[1];
            }
            if(baidu.string.getByteLength(item['desc']) > maxLength){
                item['desc'] = baidu.string.subByte(item['desc'], maxLength - 10, '...');
            }
        });
    }
}

/**
 * 发送监测
 * @param {string} rcvurl
 * @param {number} actionid
 * @param {number} showtime
 */
ad.widget.bzt.Dianjing.prototype._sendLog = function(rcvurl, actionid, showtime) {
    var url = rcvurl + '&actionid=' + actionid;
    if(actionid == 3){
        url += '&attach=' + showtime;
    }
    else{
        url += '&attach=0';
    }
    baidu.sio.log(url);
}

/**
 * 获取广告展现时间 单位：秒
 * @return {number}
 */
ad.widget.bzt.Dianjing.prototype._getShowtime = function() {
    var end = new Date();
    return (end - this._startDJ)/1000;
}

/**
 * 获取rcv链接
 * @param {number} index
 * @param {string} type
 */
ad.widget.bzt.Dianjing.prototype._getRcvByIndex = function(index, type) {
    return this._data[type][index]['encry_url'];
}

/**
 * 重定位
 * @param {HTMLElement} biaozhu 标注
 * @param {HTMLElement} adinfo  广告区域
 */
ad.widget.bzt.Dianjing.prototype._resetAdinfoPosition = function(biaozhu, adinfo) {
    var bg = baidu.q('ec-dianjing-info-bg',adinfo);
    if(baidu.dom.getPosition(biaozhu).left < 120){
        if(bg && bg[0]){
            baidu.dom.setStyle(bg[0], 'left', '0px');
        }
        baidu.dom.setStyle(baidu.q('ec-dianjing-info',adinfo)[0], 'left', '0px');
    }
    else if(baidu.dom.getPosition(biaozhu).left > (baidu.page.getViewWidth() - 120)){
        var left = this._data['width_change'] - 267;
        if(bg && bg[0]){
            baidu.dom.setStyle(bg[0], 'left', left+'px');
        }
        baidu.dom.setStyle(baidu.q('ec-dianjing-info',adinfo)[0], 'left', left+'px');
    }
}

/**
 * 发送标注展现log
 */
ad.widget.bzt.Dianjing.prototype.sendShowBZLog = function() {
    var me = this;
    if(me._data['ads'] && me._data['ads'].length){
        baidu.array.each(me._data['ads'], function(item, i){
            me._sendLog(item['encry_url'], 4);
        });
    }
    if(me._data['bks'] && me._data['bks'].length){
        baidu.array.each(me._data['bks'], function(item, i){
            me._sendLog(item['encry_url'], 4);
        });
    }
    if(me._data['vds'] && me._data['vds'].length){
        baidu.array.each(me._data['vds'], function(item, i){
            me._sendLog(item['encry_url'], 4);
        });
    }
}

/**
 * 设置透明度
 * @param {HTMLElement} dom
 * @param {HTMLElement} value
 */
ad.widget.bzt.Dianjing.prototype._setOpacity = function(dom, value) {
    if(baidu.browser.ie){
        dom.style.filter = "alpha(opacity=" + 100*value + ")";
    }
    else{
        dom.style.opacity = value;
    }
}

/**
 * 展现标注
 * @param {Array} arrBZ
 */
ad.widget.bzt.Dianjing.prototype._showBZ = function(arrBZ) {
    var me = this;
    var easeInOut = function(t){
        return (t *= 2) < 1 ?  0.5 * t * t : 0.5 * (1 - (--t) * (t - 2));
    }
    var min = 0;
    var max = 100;

    var t = min;
    var intervalId = ad.base.setInterval(function(){
        for(var i = 0; i < arrBZ.length; i ++){
            //arrCover[i].style.opacity = 1-(max-min)*easeInOut(t/(max-min))/100;
            me._setOpacity(arrBZ[i], 1 - (max-min)*easeInOut(t/(max-min))/100);
        }
        if(t<max){
            t+=20;
        }
        else{
            ad.base.clearInterval(intervalId);
            t = min;
            var intervalId2 = ad.base.setInterval(function(){
                for(var i = 0; i < arrBZ.length; i ++){
                    //arrCover[i].style.opacity = 1-(max-min)*easeInOut(t/(max-min))/100;
                    me._setOpacity(arrBZ[i], (max-min)*easeInOut(t/(max-min))/100);
                }
                if(t<max){
                    t+=20;
                }
                else{
                    ad.base.clearInterval(intervalId2);

                }
            },100);
        }
    },100);
}



/* vim: set ts=4 sw=4 sts=4 tw=100: */
