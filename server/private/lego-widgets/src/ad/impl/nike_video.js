/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/nike_video.js ~ 2013/02/26 14:49:57
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * nike_video相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Image');
goog.require('ad.widget.Share');
goog.require('ad.widget.Flash');
//goog.require('ad.widget.Video');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/nike_video.less');

goog.provide('ad.impl.NikeVideo');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var fwcflash = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var thumbnail = new ad.widget.Image(AD_CONFIG['thumbnail']);
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
        fwcflash.setWidgets([
            flash
            // video
        ]);
    // var video = new ad.widget.Video(AD_CONFIG['video']);
    // material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [thumbnail],
        [new ad.widget.Share(AD_CONFIG['share'])],
        // [new ad.widget.Image(AD_CONFIG['float_image'])],
        [fwcflash]
    );
    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    // FIXME(user) material.getCMS().init
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwcflash.getRoot()), 'id'));
    fwcflash.hide();
    flash.clearRoot();

    // set bacground
    baidu.setStyle(
        material.getRoot(),
        'background',
        'url(' + AD_CONFIG['background']['url'] + ') no-repeat center top ' + AD_CONFIG['background']['color']
    );

    thumbnail.addListener(ui.events.CLICK, function() {
        thumbnail.sendLog('float1window1open');
        fwcflash.show();
        ad.base.setTimeout(function() {
            flash.refresh();
        }, 0);
    });
    fwcflash.addListener(ui.events.CLOSE, function() {
        fwcflash.sendLog('float1window1close');
        flash.clearRoot();
    });
    /*
    video.addListener(ui.events.VIDEO_START, function(){
        video.sendLog('float1video1start');
        return false;
    });
    video.addListener(ui.events.VIDEO_CLICK, function(){
        video.sendLog('float1video1jump');
        //在ipad下手动跳转
        if(video._data['is_ipad']){
            video.redirect();
        }
        return false;
    });
    video.addListener(ui.events.VIDEO_FINISH, function(){
        video.sendLog('float1video1complete');
        return false;
    });
    */


    // TODO 视频播放的日志记录，需要AVD开放接口
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
