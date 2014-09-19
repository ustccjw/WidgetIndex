/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/johnniewalker.js ~ 2013/07/11 14:40:40
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * johnniewalker相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.image.Flash2');


goog.include('ad/impl/johnniewalker.less');

goog.provide('ad.impl.Johnniewalker');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var flash2 = new ad.widget.image.Flash2(AD_CONFIG['flash2']);
    material.setWidgets(
        [flash2]
    );

    var firstShow = false;
    var timeout;

    flash2.addListener(ui.events.IMAGE_FLASH2_CLOSE, function(){
        this.sendLog('关闭');
        close();
    });

    flash2.addListener(ui.events.IMAGE_FLASH2_REPLAY, function(){
        this.sendLog('重播');
        start();
    });

    flash2.addListener(ui.events.IMAGE_FLASH2_HOVER, function(){
        this.sendLog('进入');
        timeout = ad.base.setTimeout(function(){
            if(!firstShow){
                start();
                firstShow = true;
            }
        }, 500);
    });

    flash2.addListener(ui.events.IMAGE_FLASH2_OUT, function(){
        if(timeout){
            ad.base.clearTimeout(timeout);
        }
    });

    flash2.addListener('FLASH_close', function(e, args){
        close();
    });

    flash2.addListener('FLASH_click', function(e, args){
        var url = this.getData('bg.link_rcv_url');
        window.open(url);
    });
    

    function start(){
        var flashDom = baidu.g(flash2.getId('flash'));
        var closeDom = baidu.g(flash2.getId('close'));
        var replayDom = baidu.g(flash2.getId('replay'));
        var rightContainerDom = baidu.g('rightContainer');

        if(rightContainerDom){
            rightContainerDom.style.zIndex = 20;
        }
        if(flashDom){
            flashDom.innerHTML = flash2.getFlashHTML();
            flashDom.style.left = 'auto';
            flashDom.style.right = '0px';
            closeDom.style.display = 'block';
            replayDom.style.display = 'none';
        }
    }

    function close(){
        var flashDom = baidu.g(flash2.getId('flash'));
        var closeDom = baidu.g(flash2.getId('close'));
        var replayDom = baidu.g(flash2.getId('replay'));
        var rightContainerDom = baidu.g('rightContainer');

        if(rightContainerDom){
            rightContainerDom.style.zIndex = 0;
        }
        if(flashDom){
            flashDom.style.left = '-10000px';
            flashDom.style.right = 'auto';
            closeDom.style.display = 'none';
            replayDom.style.display = 'block';
        }
    }
    if(async !== true){
        material.show();
    }
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
