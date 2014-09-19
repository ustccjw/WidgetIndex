/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/kaiyue_video.js ~ 2013/02/02 23:53:33
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * kaiyue_video相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.Map');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Button');
goog.require('ad.widget.ImageShowArrow');

goog.include('ad/impl/kaiyue_video.less');

goog.provide('ad.impl.KaiyueVideo');

ad.Debug(function(async){
    AD_CONFIG['fwc']['material_name'] = 'ec-kaiyuevideo'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.DefaultRender());
    var video = new ad.widget.Video(AD_CONFIG['video_left']);
    var head = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var button_group = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc']);
    var map = new ad.widget.Map(AD_CONFIG['map']);
    AD_CONFIG['fwc']['id'] = 1;
    var fwc_1 = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc_1.setWidgets([fwcVideo,map]);
    var fwcs = [];
    var fwcs_rendered = [];
    fwcs.push(fwc_1);
    fwcs_rendered.push(false);

    var arr_image_show_arrow = [];
    var arr_button = [];
    var arr_tab_cont = [];
    
    var floatCount = 1 + AD_CONFIG['small_head']['image_group_head']['options'].length;
    if(floatCount > 1){
        for(var i = 0; i < floatCount - 1; i ++){
            AD_CONFIG['imageshowarrowsblock']['imageshowarrows'][i]['switch_time'] = 5000000000000;
            var imageShowArrow = new ad.widget.ImageShowArrow(AD_CONFIG['imageshowarrowsblock']['imageshowarrows'][i]);
            var buttons = [];
            for(var j = 0; j < AD_CONFIG['buttonblock']['button'][i]['lists'].length; j ++){
                var arr_button_sub = [];
                for(var k = 0; k < AD_CONFIG['buttonblock']['button'][i]['lists'][j]['couple'].length; k ++){
                    AD_CONFIG['buttonblock']['button'][i]['lists'][j]['couple'][k]['class_name'] = 'ec-button-' + (k + 1);
                    var button = new ad.widget.Button(AD_CONFIG['buttonblock']['button'][i]['lists'][j]['couple'][k]);
                    arr_button_sub.push(button);
                }
                buttons.push(arr_button_sub);
            }
            arr_button.push(buttons);

            AD_CONFIG['fwc']['id'] = (i + 2);
            var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
            var arr_fwc_widgets = [imageShowArrow];
            for(var j = 0; j < buttons.length; j ++){
                for(var k = 0; k < buttons[j].length; k ++){
                    arr_fwc_widgets.push(buttons[j][k]);
                }
            }

            fwc.setWidgets(arr_fwc_widgets);
            arr_image_show_arrow.push(imageShowArrow);
            fwcs.push(fwc);
            fwcs_rendered.push(false);
        }

    }

    for(var i = 0; i < AD_CONFIG['tab']['options'].length; i ++){
        arr_tab_cont.push(new ad.widget.TabCont(AD_CONFIG['tab_cont']['options'][i]));
    }
    tab_container.setWidgets(arr_tab_cont);

    material.setWidgets(
        [video, head],
        [tab_container],
        [button_group],
        fwcs
    );
    if (async === true) {
        return material;
    }
    material.show();

    //监听map模块的事件
    map.addListener(ui.events.MAP_CLICK,function(i){
        map.sendLog('float1btn' + (i + 1));
        return false;
    });

    video.addListener(ui.events.VIDEO_CLICK, function(){
        showFWC(0);
        this.pause();
        this.sendLog('float1open');
        return false;
    });

    video.addListener(ui.events.VIDEO_FINISH, function(){
        this.sendLog('videocomplete');
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_START, function(){
        this.sendLog('float1video1start');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function(){
        this.sendLog('float1video1jump');
        //在ipad下手动跳转
        if(this._data['is_ipad']){
            this.redirect();
        }
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function(){
        this.sendLog('float1video1complete');
        return false;
    });

    head.addListener(ui.events.CLICK, function(index, me) {
        showFWC(index + 1);
        this.sendLog('float' + (index + 2) + 'open');
        return false;
     });

    fwc_1.addListener(ui.events.CLOSE, function(index) {
        hideFWC(0);
     });

    if(arr_image_show_arrow && arr_image_show_arrow.length) {
        baidu.array.each(
            arr_image_show_arrow, function(item, i) {
                item.addListener(ui.events.ARROW_RIGHT, function(index) {
                    //alert(index);
                    showButtons(i, index);
                    item.sendLog("float" + (i + 2) + "-arrow-right");
                    return false;
                });
                item.addListener(ui.events.ARROW_LEFT, function(index) {
                    //alert(index);
                    showButtons(i, index);
                    item.sendLog("float" + (i + 2) + "-arrow-left");
                    return false;
                });
            }
        );
    }

    var lastFWCIndex = -1;
    
    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */
    function showFWC(index){
        hideFWC(lastFWCIndex);
        var targetFWC = fwcs[index];
        var rendered = fwcs_rendered[index];
        if(!targetFWC)
            return;
        if(index == 0){
            //重绘浮层视频
            if(fwcVideo){
                ad.base.setTimeout(function(){
                    fwcVideo.refresh();
                },10);
                targetFWC.show();
            }
        }
        else{
            targetFWC.show();
            showButtons( index - 1, 0 );
        }
        lastFWCIndex = index;
        //fwc 统计
        if ( ! rendered ) {
            var canvas = baidu.dom.first( targetFWC.getRoot() );
            if ( canvas && canvas.id ) {
                material.trigger( ui.events.NEW_AD_CANVAS, canvas.id );
            }

            //new title2
            arr_image_show_arrow[ index - 1 ].rewriteTitle2( arr_image_show_arrow[ index - 1 ].getRoot(), "float" + ( index - 1 + 2 ) + "-", false );

            for( var j = 0; j < arr_button[ index - 1 ].length; j ++ ){
                for( var k = 0; k < arr_button[ index - 1 ][j].length; k ++ ){
                    arr_button[ index - 1 ][j][k].rewriteTitle2( null, '浮层' + ( index - 1 + 2 ) + '图片' + ( j + 1 ) + '按钮' + ( k + 1 ), true );
                }
            }

            fwcs_rendered[ index ] = true;
        }
    }

    /**
     * 隐藏对应的浮层
     * @param {number} index 索引.
     */
    function hideFWC(index){
        var targetFWC = fwcs[index];
        if(!targetFWC)
            return;
        if(index == 0){
            if(fwcVideo){
                fwcVideo.clearRoot();
            }
        }
        targetFWC.hide();
        lastFWCIndex = -1;
    }


    /**
     * 显示对应浮层对应图片的按钮
     * @param {number} floatIndex 浮层索引.
     * @param {number} imgIndex 图片索引。
     */

    function showButtons(floatIndex, imgIndex){
        var buttons = arr_button[floatIndex];
        if(buttons && buttons.length){
            for(var i = 0; i < buttons.length; i ++){
                for(var j = 0; j < buttons[i].length; j ++){
                    if(i == imgIndex){
                        buttons[i][j].show();
                    }
                    else{
                        buttons[i][j].hide();
                    }
                }
            }
        }
    }

});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
