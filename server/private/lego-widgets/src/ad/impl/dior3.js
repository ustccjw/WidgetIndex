/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/dior3.js ~ 2012/08/27 14:30:04
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 11222 $
 * @description
 * burberry相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.LinkList');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/dior3.less');

goog.provide('ad.impl.Dior3');

ad.Debug(function(async){

    var material = new ad.material.BaseMaterial();
    if(AD_CONFIG['fwc']){
        AD_CONFIG['fwc']['material_name'] = 'ec-dior3'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
        AD_CONFIG['fwc']['id'] = 1;
        var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']); //左侧视频点击弹开浮层1
        var fwcLinks = new ad.widget.LinkList(AD_CONFIG['fwc']['links']);
        var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc']['video']);
        fwc.setWidgets([fwcVideo, fwcLinks]);
    }
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var fwcRenderd = false;
    
    var arrTabCont = [];
    var options = ad.base.getObjectByName('tab.options', AD_CONFIG);
    if (options && options.length) {
        for (var i = 0; i < options.length; i ++) {
            arrTabCont.push(new ad.widget.TabCont(options[i]));
        }
    }
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tabContainer.setWidgets(arrTabCont);
    if(AD_CONFIG['fwc']){
        material.setWidgets(
            [leftVideo, smallHead],
            [tabContainer],
            [new ad.widget.ButtonGroup(AD_CONFIG['button_group_foot'])],
            [fwc]
        );
    }
    else {
        material.setWidgets(
            [leftVideo, smallHead],
            [tabContainer],
            [new ad.widget.ButtonGroup(AD_CONFIG['button_group_foot'])]
        );
    }
    if (async === true) {
        return material;
    }
    material.show();
    if(AD_CONFIG['fwc']){
        leftVideo.addListener(ui.events.VIDEO_CLICK, function(){
            showFWC();
            leftVideo.pause();
            leftVideo.sendLog('floatopen');
            return false;
        });
        fwc.addListener(ui.events.CLOSE, function(index) {
            hideFWC();
         });
        fwcVideo.addListener(ui.events.VIDEO_START, function(){
            fwcVideo.sendLog('floatvideostart');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_CLICK, function(){
            fwcVideo.sendLog('floatvideojump');
            //在ipad下手动跳转
            if(fwcVideo._data['is_ipad']){
                fwcVideo.redirect();
            }
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_FINISH, function(){
            fwcVideo.sendLog('floatvideocomplete');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_PAUSE, function(){
            fwcVideo.sendLog('floatvideopause');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function(){
            fwcVideo.sendLog('floatvideocontinue');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_AUTO, function(){
            fwcVideo.sendLog('floatvideoauto');
            return false;
        });

        /**
         * 显示视频浮层
         */
        function showFWC(){
            if(!fwc) {
                return;
            }
            //重绘浮层视频
            if(fwcVideo){
                ad.base.setTimeout(function(){
                    fwcVideo.refresh();
                },10);
                fwc.show();
                if(!fwcRenderd) {
                    var canvas = baidu.dom.first(fwc.getRoot());
                    if (canvas && canvas.id) {
                        material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                        fwcLinks.rewriteTitle2(fwcLinks.getRoot(), '浮层');
                        fwcRenderd = true;
                    }
                }
            }
        }

        /**
         * 隐藏视频浮层
         */
        function hideFWC(){
            if(!fwc) {
                return;
            }
            if(fwcVideo){
                fwcVideo.clearRoot();
            }
            fwc.hide();
        }
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
