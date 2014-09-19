/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: gucci.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/gucci.js ~ 2013/10/30 14:23:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.standard.TabCont');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.Video');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.lv.List');
goog.require('ad.widget.DependencySelectV2');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/video.less');
goog.include('ad/impl/standard/small_head.less');
goog.include('ad/impl/standard/tab_cont.less');
goog.include('ad/impl/new_custom/gucci.less');

goog.provide('ad.impl.new_custom.Gucci');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial(AD_CONFIG['id']);
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
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
    AD_CONFIG['fwc']['material_name'] = 'ec-gucci';
    AD_CONFIG['fwc']['id'] = 1;
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([fwcVideo, multiVideoThunbnail]);

    var list;
    var select;
    function createFormWidget(cfg) {
        if (!cfg['dependency']) {
            cfg['dependency'] = [
                {
                    'name': "city",
                    'title': "城&nbsp;&nbsp;&nbsp;&nbsp;市：",
                    'default': "上海"
                },
                {
                    'name': "store",
                    'title': "专卖店："
                }
            ];
        }
        select = new ad.widget.DependencySelectV2(cfg);
        list = new ad.widget.lv.List({
            'title_left': cfg['head_text'],
            'title_left_rcv_url': cfg['head_text_rcv_url']
        });
        var nc = new ad.widget.NormalContainer({});
        nc.setWidgets([list, select]);
        return nc;
    }

    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    var tabLength = tabOptions.length;
    for (var i = 0; i < tabLength; i++) {
        tabBodies.push(new ad.widget.standard.TabCont(tabOptions[i]));
    }
    tabOptions.push({"tab_title": "专卖店查询"});
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tabBodies.push(createFormWidget(AD_CONFIG['form']));
    tab.setWidgets(tabBodies);


    var imageFwcArr = [];
    var imageFwcRendered = [];
    var imageOptions = AD_CONFIG['products']['options'];
    for (var j = 0; j < imageOptions.length; j ++) {
        var imageFwcConf = AD_CONFIG['image_fwc'];
        imageFwcConf['material_name'] = 'ec-gucci-image';
        imageFwcConf['id'] = j + 2;
        var imageFwc = new ad.widget.FloatWindowContainer(imageFwcConf);
        imageFwc.setWidgets([new ad.widget.ImageLink(imageOptions[j]['fwc_image'])]);
        imageFwcArr.push(imageFwc);
        imageFwcRendered.push(false);
    }

    var widgets = [
        [title],
        [leftVideo, smallHead, imgs],
        [tab],
        [new ad.widget.ButtonGroup(AD_CONFIG['buttons'])],
        [fwc],
        imageFwcArr
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
    if (select) {
        function initSelectData(){
            var dropdowns = select.getDropdowns();
            var values = [];
            var deps = select.getData('dependency');
            if(deps && deps.length) {
                baidu.each(deps, function(item){
                    if(item && item['name'] && dropdowns && dropdowns[item['name']]) {
                        values.push(select.getValue(dropdowns[item['name']]));
                    }
                });
            }
            var dataMap = select.getDataMap();
            var detail;
            if(dataMap && dataMap[values[0]][values.join('-')]) {
                detail = dataMap[values[0]][values.join('-')][0];
            }
            else {
                detail = {};
            }
            detail['enable_bmap'] = false;
            detail['img_src'] = RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/e95d4b929e1cb6938751645176a62178.jpg';
            detail['title_left'] = list.getData('title_left', detail['title_left']);
            detail['title_left_rcv_url'] = list.getData('title_left_rcv_url', detail['title_left_rcv_url'])
            list.refresh(null, detail);
            list.rewriteTitle2(null, detail['title_right'] + ' ', false);
        }
        select.addListener(ui.events.CHANGE, initSelectData);
        // select初始化完毕了.
        select.addListener(ui.events.LOAD, initSelectData);
    }
    leftVideo.addListener(ui.events.VIDEO_CLICK, function(){
        showFWC(0);
        leftVideo.sendLog('floatopen', 'floatopen');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_START, function(){
        leftVideo.sendLog('leftvideostart');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_FINISH, function(){
        leftVideo.sendLog('leftvideofinish');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_PAUSE, function(){
        leftVideo.sendLog('leftvideopause');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_CONTINUE, function(){
        leftVideo.sendLog('leftvideocontinue');
        return false;
    });
    imgs.addListener(ui.events.CLICK, function(index){
        showImageFWC(index);
        imgs.sendLog('img' + (index + 1) + 'floatopen');
    });
    baidu.each(imageFwcArr, function(item, index){
        item.addListener(ui.events.CLOSE, function() {
            imgs.resetCurrentIndex();
            hideFWC();
        });
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
     * 隐藏所有浮层
     */
    function hideFWC() {
        if(fwcVideo) {
            fwcVideo.clearRoot();
        }
        multiVideoThunbnail.clearPlayStatus();
        fwc.hide();
        if(imageFwcArr) {
            baidu.each(imageFwcArr, function(item, index){
                item.hide();
            });
        }
    }

    /**
     * 显示对应的图片浮层
     * @param {number} index 索引.
     */
    function showImageFWC(index) {
        if(!imageFwcArr[index]) {
            return;
        }
        hideFWC();
        imageFwcArr[index].show();
        if (!imageFwcRendered[index]) {
            var canvas = baidu.dom.first(imageFwcArr[index].getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                //material.getCMS().init(canvas.id);
                imageFwcRendered[index] = true;
            }
        }
    }
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
