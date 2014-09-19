/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: lv.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/lv.js ~ 2013/10/30 14:23:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Image');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.Video');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Flash');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.lv.List');
goog.require('ad.widget.DependencySelect');

goog.include('ad/impl/new_custom/lv.less');

goog.provide('ad.impl.new_custom.Lv');


ad.Debug(function(async){
    var list;
    var select;
    var listIndex = -1;
    var selectDefault;
    function createWidget(cfg, index) {
        var widgetConfig = cfg['tab_content'];
        if ('tabcont' in widgetConfig) {
            return new ad.widget.TabCont(widgetConfig['tabcont']);
        }
        else if ('form' in widgetConfig) {
            if (!widgetConfig['form']['dependency']) {
                widgetConfig['form']['dependency'] = [
                    {
                        'name': "city",
                        'title': "城&nbsp;&nbsp;&nbsp;&nbsp;市",
                        'default': "上海"
                    },
                    {
                        'name': "store",
                        'title': "专卖店"
                    }
                ];
            }
            selectDefault = widgetConfig['form']['dependency'][0]['default'];
            select = new ad.widget.DependencySelect(widgetConfig['form']);
            list = new ad.widget.lv.List({
                'title_left': widgetConfig['form']['head_text'],
                'title_left_rcv_url': widgetConfig['form']['head_text_rcv_url']
            });
            var nc = new ad.widget.NormalContainer({});
            nc.setWidgets([list, select]);
            listIndex = index;
            return nc;
        }
    }
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
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
    AD_CONFIG['fwc']['material_name'] = 'ec-lv-video';
    AD_CONFIG['fwc']['id'] = 1;
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([fwcVideo, multiVideoThunbnail]);

    var flashFwcArr = [];
    var flashFwcRendered = [];
    var flashOptions = AD_CONFIG['products']['options'];
    for (var j = 0; j < flashOptions.length; j ++) {
        var flashFwcConf = AD_CONFIG['flash_fwc'];
        flashFwcConf['float_bg'] = {};
        flashFwcConf['float_bg']['src'] = flashOptions[j]['flash']['ipad_img'];
        flashFwcConf['float_bg']['rcv_url'] = flashOptions[j]['flash']['link_rcv_url'];
        flashFwcConf['material_name'] = 'ec-lv-flash';
        flashFwcConf['id'] = j + 2;
        var flashFwc = new ad.widget.FloatWindowContainer(flashFwcConf);
        flashFwc.setWidgets([new ad.widget.Flash(flashOptions[j]['flash'])]);
        flashFwcArr.push(flashFwc);
        flashFwcRendered.push(false);
    }

    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    for (var i = 0; i < tabOptions.length; i ++) {
        tabBodies.push(createWidget(tabOptions[i], i))
    }
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    /**
     * @param {number} index
     * @return {string}
     */
    tab.getTabClassName = function(index) {
        var className = "ec-tab-content-" + index;
        if (index === listIndex) {
            className += " ec-tab-content-form";
        } else {
            className += " ec-tab-content-tabcont";
        }
        return className;
    }
    tab.setWidgets(tabBodies);


    var widgets = [
        [title],
        [video, smallHead, imgs],
        [tab],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])],
        [fwc],
        flashFwcArr
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
    //material.initMonitor(AD_CONFIG['main_url']);
    //material.initHMJSMoniter(AD_CONFIG['hmjs_id']);


    video.addListener(ui.events.VIDEO_CLICK, function(){
        showFWC(0);
        video.pause();
        video.sendLog('floatopen');
        return false;
    });
    imgs.addListener(ui.events.CLICK, function(index){
        showFlashFWC(index);
        imgs.sendLog('img' + (index + 1) + 'floatopen');
    });
    baidu.each(flashFwcArr, function(item, index){
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
        hideFWC();
    });
    if (select) {
        select.addListener(ui.events.CHANGE, function(city, shop, depth){
            var detail;
            var sel = select.getEleByName('city');
            if (depth == 0) {
                detail = shop[0];
            }
            else {
                var sIndex = city[1]['selectedIndex'];
                detail = shop[sIndex]['children'][0];
            }
            detail['enable_bmap'] = false;
            detail['img_src'] = RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/e95d4b929e1cb6938751645176a62178.jpg';
            detail['title_left'] = list.getData('title_left', detail['title_left']);
            detail['title_left_rcv_url'] = list.getData('title_left_rcv_url', detail['title_left_rcv_url'])
            list.refresh(null, detail);
            list.rewriteTitle2(null, detail['title_right'] + ' ', false);
        });

        // select初始化完毕了.
        select.addListener(ui.events.LOAD, function(){
            var defaultCity = selectDefault || '上海';
            select.initByVal(defaultCity);
        });
    }
    var fwcRenderd = false;
    /**
     * 显示对应的Flash浮层
     * @param {number} index 索引.
     */
    function showFlashFWC(index) {
        if(!flashFwcArr[index]) {
            return;
        }
        hideFWC();
        flashFwcArr[index].show();
        if (!flashFwcRendered[index]) {
            var canvas = baidu.dom.first(flashFwcArr[index].getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                //material.getCMS().init(canvas.id);
                flashFwcRendered[index] = true;
            }
        }
    }

    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(!fwc) {
            return;
        }
        hideFWC();
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
        if(flashFwcArr) {
            baidu.each(flashFwcArr, function(item, index){
                item.hide();
            });
        }
    }
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
