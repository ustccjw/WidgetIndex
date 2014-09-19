/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: coca2.js 150523 2013-06-05 14:06:00Z  DestinyXie$
 *
 **************************************************************************/



/**
 * src/ad/impl/coca2.js ~ 2013/06/05 14:06:00
 * @author fanxueliang@baidu.com
 * @version $Revision: 150523 $
 * @description
 * coca2相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Image');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FullWindowContainer');

goog.include('ad/impl/coca2.less');

goog.provide('ad.impl.Coca2');

/**
 * @override
 * 重写FullWindowContainer获取控件所处的元素根节点方法.
 * @return {Element} FullWindowContainer元素的根节点.
 * @expose
 */
ad.widget.FullWindowContainer.prototype.getRoot = function() {
    return baidu.g(this.getId());
};

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var head = new ad.widget.SmallHead(AD_CONFIG['head']);
    var weibo = new ad.widget.SmallWeibo(AD_CONFIG['weibo']);
    var img = new ad.widget.Image(AD_CONFIG['image']);
    var app;
    var fwc;
    var flash;
    if(AD_CONFIG['app']) {
        app = new ad.widget.Flash(AD_CONFIG['app']);
    }
    if(AD_CONFIG['fwc']) {
        fwc = new ad.widget.FullWindowContainer(AD_CONFIG['fwc']);
        flash = new ad.widget.Flash(AD_CONFIG['flash']);
        fwc.setWidgets([flash]);
    }
    
    if(!AD_CONFIG['app'] && !AD_CONFIG['fwc']) {
        material.setWidgets(
            [
                [video],
                [
                    head,
                    weibo
                ]
            ],
            [img]
        );
    }
    else if(!AD_CONFIG['app']) {
        material.setWidgets(
            [
                [video],
                [
                    head,
                    weibo
                ]
            ],
            [img],
            [fwc]
        );
    } else {
        material.setWidgets(
            [
                [video],
                [
                    head,
                    weibo
                ]
            ],
            [img],
            [app]
        );
    }

    if (async === true) {
        return material;
    }
    material.show();
    //material.initMonitor(AD_CONFIG['main_url']);
    if(AD_CONFIG['color'] && AD_CONFIG['color']['border']) {
        baidu.dom.setStyles(material.getRoot(), {'border-color': AD_CONFIG['color']['border']});
    }
    else {
        baidu.dom.setStyles(material.getRoot(), {'border-color': '#fa6c6b'});
    }
    if (app) {
        baidu.hide(app.getRoot());
    }

    function showFwc() {
        baidu.show(fwc.getRoot());
        fwc.show();
        flash.refresh();
    }

    function hideFwc() {
        baidu.hide(fwc.getRoot());
        fwc.hide();
        flash.clearRoot();
    }
    if (fwc) {
        if (!ad.env.isIpad) {
            var materialPosition = baidu.dom.getPosition(material.getRoot());
            var div = baidu.dom.create('div', {'class': 'ec-ma-float-container-coca'});
            baidu.dom.insertBefore(div, material.getRoot());
            baidu.dom.setStyles(
                div,
                {
                    'top': materialPosition['top'] + 'px',
                    'left': materialPosition['left'] + 'px',
                    'width': '1000px',
                    'height': '400px'
                }
            );
            fwc.refresh(div);
            showFwc();
            baidu.dom.setStyles(fwc.getId('bg'), {'height':'400px'});
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
            }
            fwc.addListener(ui.events.CLOSE, function() {
                hideFwc();
            });
            flash.addListener('FLASH_close', function() {
                hideFwc();
                flash.sendLog('FLASH_close', 'FLASH_close');
            });
            flash.addListener('FLASH_stop', function() {
                hideFwc();
                flash.sendLog('FLASH_stop', 'FLASH_stop');
            });
            flash.addListener('FLASH_start', function() {
                flash.sendLog('FLASH_start', 'FLASH_start');
            });
            flash.addListener('FLASH_track', function(no) {
                flash.sendLog(no, no);
            });
        }
    }
    if (app) {
        img.addListener(ui.events.CLICK, function() {
            baidu.show(app.getRoot());
            img.sendLog('app_float_open', 'app_float_open');
        });
    }
    return material;
});
