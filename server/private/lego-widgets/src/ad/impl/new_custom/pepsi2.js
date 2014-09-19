/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: pepsi2.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/pepsi2.js ~ 2013/10/30 14:23:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.env');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Image');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.Video');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FullWindowContainer');

goog.include('ad/impl/new_custom/pepsi2.less');

goog.provide('ad.impl.new_custom.Pepsi2');


/**
 * @override
 * 重写FullWindowContainer获取控件所处的元素根节点方法.
 * @return {Element} FullWindowContainer元素的根节点.
 * @expose
 */
ad.widget.FullWindowContainer.prototype.getRoot = function() {
    return baidu.g(this.getId());
};


ad.Debug(function(async){
    function createWidget(cfg, index) {
        var widgetConfig = cfg['tab_content'];
        if ('image_cartoon' in widgetConfig) {
            return new ad.widget.ImageCartoon(widgetConfig['image_cartoon']);
        }
        else if ('image' in widgetConfig) {
            return new ad.widget.Image(widgetConfig['image']);
        }
    }
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var logo = new ad.widget.MultiVideoThunbnail(AD_CONFIG['logo']);
    var imgs = new ad.widget.MultiVideoThunbnail(AD_CONFIG['products']);
    var lastFWCVideoIndex = -1;
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc']['options'][0]);
    var datasource = {'width': 100, 'height': 56, 'options': []};
    for (var i = 0; i < AD_CONFIG['fwc']['options'].length; i ++) {
        var item = AD_CONFIG['fwc']['options'][i];
        datasource['options'].push({
            'img_url': item['thumbnail_img_url'],
            'text': item['thumbnail_text'],
            'display_play_button': true
        });
    }
    var multiVideoThunbnail = new ad.widget.MultiVideoThunbnail(datasource);
    AD_CONFIG['fwc']['material_name'] = 'ec-nike';
    AD_CONFIG['fwc']['id'] = 1;
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([fwcVideo, multiVideoThunbnail]);
    
    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    for (var i = 0; i < tabOptions.length; i ++) {
        tabBodies.push(createWidget(tabOptions[i], i));
    }
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tab.setWidgets(tabBodies);
    var fullFwc;
    var fullFlash;
    if(AD_CONFIG['full_fwc']) {
        fullFwc = new ad.widget.FullWindowContainer(AD_CONFIG['full_fwc']);
        fullFlash = new ad.widget.Flash(AD_CONFIG['full_fwc_flash']);
        fullFwc.setWidgets([fullFlash]);
    }

    var widgets = [
        [title],
        [logo, smallHead, imgs],
        [tab],
        [fwc]
    ];
    if(fullFwc) {
        widgets.push([fullFwc]);
    }
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
    //material.initMonitor(AD_CONFIG['main_url']);
    //material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    function showFullFwc() {
        baidu.show(fullFwc.getRoot());
        fullFwc.show();
        fullFlash.refresh();
    }

    function hideFullFwc() {
        baidu.hide(fullFwc.getRoot());
        fullFwc.hide();
        fullFlash.clearRoot();
    }

    if (fullFwc) {
        if (!ad.env.isIpad) {
            var materialPosition = baidu.dom.getPosition(material.getRoot());
            var div = baidu.dom.create('div', {'class': 'ec-ma-float-container-pepsi'});
            baidu.dom.insertBefore(div, material.getRoot());
            baidu.dom.setStyles(
                div,
                {
                    'top': materialPosition['top'] + 'px',
                    'left': materialPosition['left'] + 'px',
                    'width': '1012px',
                    'height': '369px'
                }
            );
            fullFwc.refresh(div);
            showFullFwc();
            baidu.dom.setStyles(fullFwc.getId('bg'), {'height':'369px'});
            var canvas = baidu.dom.first(fullFwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
            }
            fullFlash.addListener(ui.events.CLOSE, function(){
                hideFullFwc();
            });
            fullFlash.addListener('FLASH_close', function() {
                hideFullFwc();
                fullFlash.sendLog('FLASH_close', 'FLASH_close');
            });
            fullFlash.addListener('FLASH_stop', function() {
                hideFullFwc();
                fullFlash.sendLog('FLASH_stop', 'FLASH_stop');
            });
            fullFlash.addListener('FLASH_start', function() {
                fullFlash.sendLog('FLASH_start', 'FLASH_start');
            });
            fullFlash.addListener('FLASH_track', function(no) {
                fullFlash.sendLog(no, no);
            });
        }
    }
    
    logo.addListener(ui.events.CLICK, function(){
        showFWC(0);
        logo.sendLog('floatopen', 'floatopen');
        return false;
    });
    imgs.addListener(ui.events.CLICK, function(index){
        showFWC(index + 1);
        imgs.sendLog('img' + (index + 1) + 'floatopen');
    });
    fwcVideo.addListener(ui.events.VIDEO_START, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'start');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'finish');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_PAUSE, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'pause');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'continue');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_AUTO, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'auto');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'click');
        return false;
    });
    multiVideoThunbnail.addListener(ui.events.CLICK, function(index){
        fwcVideo.refresh(null, AD_CONFIG['fwc']['options'][index]);
        lastFWCVideoIndex = index + 1;
    });
    fwc.addListener(ui.events.CLOSE, function() {
        imgs.resetCurrentIndex();
        logo.resetCurrentIndex();
        hideFWC();
    });
    var fwcRenderd = false;
    
    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(!fwc) {
            return;
        }
        fwc.show();
        if(multiVideoThunbnail) {
            multiVideoThunbnail.refresh();
        }
        multiVideoThunbnail.setPlayStatus(index);
        if(fwcVideo) {
            fwcVideo.refresh(null, AD_CONFIG['fwc']['options'][index]);
        }
        lastFWCVideoIndex = index + 1;
        if (!fwcRenderd) {
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                //material.getCMS().init(canvas.id);
                fwcRenderd = true;
            }
        }
    }
    
    /**
     * 隐藏视频浮层
     */
    function hideFWC() {
        if(fwcVideo) {
            fwcVideo.clearRoot();
        }
        multiVideoThunbnail.clearPlayStatus();
        fwc.hide();
    }
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
