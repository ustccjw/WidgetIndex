/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: hlhome.js  2012/08/06 10:25:19Z dingguoliang01 $
 *
 **************************************************************************/


/**
 * src/ad/impl/hlhome.js ~ 2012/08/06 11:47:13
 * @author dingguoliang01
 * @version $Revision: $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.Image');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.lv.List');
goog.include('ad/impl/hlhome.less');

goog.provide('ad.impl.HLHome');

ad.Debug(function (async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());

    /**
     * 动态的调整Tab头部标签的宽度.
     * @param {number} tabCount Tab的个数.
     * @return {Array.<string>|undefined}
     */
    ad.widget.TabContainer.prototype.calcTabHeadWidth = function (tabCount) {
        var leftWidth = 0;
        var totalWidth = this._data['width'],
            itemWidth = Math.floor(totalWidth / tabCount);
        leftWidth = Math.max(leftWidth, totalWidth - itemWidth * tabCount);
        var tabWidths = [];
        for (var i = 0; i < tabCount; i++) {
            if (i == tabCount - 1 && leftWidth) {
                // 把剩余的宽度追加到最后一个tab.
                tabWidths.push((itemWidth + leftWidth) + 'px');
            } else {
                tabWidths.push(itemWidth + 'px');
            }
        }
        return tabWidths;
    };
    function createWidget(cfg) {
        var widgetConfig = cfg['tab_type'];
        if ('image_cartoon' in widgetConfig) {
            return new ad.widget.ImageCartoon(widgetConfig['image_cartoon']);
        }
        else if ('select' in widgetConfig) {
            var list;
            var select;
            var selectDefault = "";
            var config = widgetConfig['select'];
            if (!config['dependency']) {
                config['dependency'] = [
                    {
                        'name': "city",
                        'title': "城&nbsp;&nbsp;&nbsp;&nbsp;市",
                        'default': "上海市"
                    },
                    {
                        'name': "store",
                        'title': "专卖店"
                    }
                ];
            }
            selectDefault = config['dependency'][0]['default'];
            select = new ad.widget.DependencySelect(config);
            list = new ad.widget.lv.List({
                'title_left': config['head_text'],
                'title_left_rcv_url': config['head_text_rcv_url']
            });
            var nc = new ad.widget.NormalContainer({});
            nc.setWidgets([select, list]);
            if (select) {
                select.addListener(ui.events.CHANGE, function(city, shop, depth){
                    var detail;
                    var sel = select.getEleByName('city');
                    if (depth == 0) {
                        detail = shop[0];
                    }
                    else {
                        var sIndex = city[1]['selectedIndex'];
                        if(shop[sIndex]['children']) {
                            detail = shop[sIndex]['children'][0];
                        }
                    }
                    if(detail) {
                        detail['enable_bmap'] = false;
                        detail['img_src'] = RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/e95d4b929e1cb6938751645176a62178.jpg';
                        detail['title_left'] = list.getData('title_left', detail['title_left']);
                        detail['title_left_rcv_url'] = list.getData('title_left_rcv_url', detail['title_left_rcv_url'])
                        list.refresh(null, detail);
                        list.rewriteTitle2(null, detail['title_right'] + ' ', false);
                    }

                });

                // select初始化完毕了.
                select.addListener(ui.events.LOAD, function(){
                    var defaultCity = selectDefault || '上海市';
                    select.initByVal(defaultCity);
                });
            }
            return nc;
        }
        else if ('image' in widgetConfig) {
            return new ad.widget.Image(widgetConfig['image']);
        }
    }
    function getDataSource() {
        var datasource = {'width': 100, 'height': 56, 'options': []};
        for (var i = 0; i < AD_CONFIG['fwc']['options'].length; i++) {
            var item = AD_CONFIG['fwc']['options'][i];
            datasource['options'].push({
                'img_url': item['thumbnail_img_url'],
                'text': item['thumbnail_text'],
                'display_play_button': true
            });
        }
        return datasource;
    }
    function getTabContainer() {
        var tabOptions = AD_CONFIG['tabs']['options'];
        var tabBodies = [];
        for (var i = 0; i < tabOptions.length; i ++) {
            tabBodies.push(createWidget(tabOptions[i], i))
        }
        var tabs = new ad.widget.TabContainer(AD_CONFIG['tabs']);
        tabs.setWidgets(tabBodies);
        return tabs;
    }
    AD_CONFIG['fwc']['material_name'] = 'ec-hlhome';
    AD_CONFIG['fwc']['id'] = 1;
    var lastFWCVideoIndex = -1;
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']),
        fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var imgs = new ad.widget.MultiVideoThunbnail(AD_CONFIG['products']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc']['options'][0]);
    var multiVideoThunbnail = new ad.widget.MultiVideoThunbnail(getDataSource());
    fwc.setWidgets([multiVideoThunbnail ,fwcVideo]);
    material.setWidgets(
        [new ad.widget.Title(AD_CONFIG['title'])],
        [
            leftVideo,
            [new ad.widget.SmallHead(AD_CONFIG['smallhead']),
            imgs]
        ],
        [getTabContainer()],
        [fwc]
    );
    if (async === true) {
        return material;
    }

    material.show();
    leftVideo.addListener(ui.events.VIDEO_START, function () {
        leftVideo.sendLog('leftvideostart');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_FINISH, function () {
        leftVideo.sendLog('leftvideofinish');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_PAUSE, function () {
        leftVideo.sendLog('leftvideopause');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_CONTINUE, function () {
        leftVideo.sendLog('leftvideocontinue');
        return false;
    });
    imgs.addListener(ui.events.CLICK, function(index){
        leftVideo.pause();
        showFWC(index);
        imgs.sendLog('img' + index  + 'floatopen');
    });
    fwcVideo.addListener(ui.events.VIDEO_START, function () {
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'start');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function () {
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'finish');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_PAUSE, function () {
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'pause');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function () {
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'continue');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_AUTO, function () {
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'auto');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function () {
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'click');
        return false;
    });
    multiVideoThunbnail.addListener(ui.events.CLICK, function (index) {
        leftVideo.pause();
        lastFWCVideoIndex = index;
        fwcVideo.refresh(null, AD_CONFIG['fwc']['options'][index]);
    });
    fwc.addListener(ui.events.CLOSE, function () {
        hideFWC();
        imgs.resetCurrentIndex();
    });
    var fwcRenderd = false;

    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if (!fwc) {
            return;
        }
        fwc.show();
        if (multiVideoThunbnail) {
            multiVideoThunbnail.refresh();
        }
        multiVideoThunbnail.setPlayStatus(index);
        if (fwcVideo) {
            fwcVideo.refresh(null, AD_CONFIG['fwc']['options'][index]);
        }
        lastFWCVideoIndex = index;
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
        if (fwcVideo) {
            fwcVideo.clearRoot();
        }
        multiVideoThunbnail.clearPlayStatus();
        fwc.hide();
    }


});

/* vim: set ts=4 sw=4 sts=4 tw=100: */
