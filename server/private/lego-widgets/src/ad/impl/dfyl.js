/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: dfyl.js 11222 2012-08-20 02:53:59Z dingguoliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/dfyl.js ~ 2012/09/27 14:17:21
 * @author dingguoliang@baidu.com (dingguoliang)
 * @version $Revision: 11222 $
 * @description
 * encore相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/dfyl.less');

goog.provide('ad.impl.DFYL');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-df-yulong'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['fwc']['id'] = 1;
    AD_CONFIG['fwc']['display_bg_iframe'] = true;
    var material = new ad.material.BaseMaterial();
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var arr_tab_cont = [];
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var tab1 = new ad.widget.Iframe(AD_CONFIG['tab1']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var lastFWCVideoIndex;
    var cover;
    var fwcRenderd = false;
    
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc']['options'][0]);
    var datasource = {'width': 100, 'height': 55, 'options': []};
    for (var i = 0; i < AD_CONFIG['fwc']['options'].length; i ++) {
        var item = AD_CONFIG['fwc']['options'][i];
        datasource['options'].push({
            'img_url': item['thumbnail_img_url'],
            'text': item['thumbnail_text']
        });
    }
    var imageNormal = new ad.widget.ImageNormal(datasource);
    fwc.setWidgets([fwcVideo,imageNormal]);
    
    arr_tab_cont.push(tab1);
    var options = ad.base.getObjectByName('tab.options', AD_CONFIG);
    if(options && options.length) {
        for(var i = 0, len = options.length; i < len; i ++) {
            arr_tab_cont.push(new ad.widget.TabCont(options[i]['tab_cont']));
        }
    }

    ad.widget.TabContainer.prototype.calcTabHeadWidth = function(tabCount) {
        if (this._data['auto_li_width']) {
            // 不限制宽度，根据字数动态的调整.
            // FIXME(leeight) 不过貌似没有padding-left和padding-right，其实效果不太好看.
            return;
        }

        // 每个标签的宽度
        var itemWidth = this._data['li_width'];
        var itemBorderWidth = parseInt(this.getData('li_border_width', 1), 10);
        if (!itemWidth) {
            var totalWidth = this._data['width'];
            itemWidth = Math.floor(totalWidth/ tabCount) - 3;

        }

        var tabWidths = [];
        for (var i = 0; i < tabCount; i++) {
            tabWidths.push(itemWidth + 'px');
        }

        return tabWidths;
    };

    AD_CONFIG['tab']['options'].unshift({'tab_title': '预约车型'});
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tab_container.setWidgets(arr_tab_cont);
    
    material.setWidgets(
        [leftVideo,smallHead],
        [tab_container],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])],
        [fwc]
    );
    
    if (async === true) {
        return material;
    }
    
    material.show();
    
    smallHead.addListener(ui.events.CLICK, function(index, me) {
        leftVideo.pause();
        showFWC(index + 1);
        smallHead.sendLog("float1open");
        smallHead.sendLog('float1video'+(index + 2) + 'start');
        return false;
     });

    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('video1start');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(0);
        leftVideo.pause();
        leftVideo.sendLog('float1open');
        leftVideo.sendLog('float1video1start');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('video1complete');
        return false;
    });

    fwc.addListener(ui.events.CLOSE, function(index) {
        hideFWC();
    });
    
    fwcVideo.addListener(ui.events.VIDEO_START, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'start');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'jump');
        //在ipad下手动跳转
        if(fwcVideo._data['is_ipad']){
            fwcVideo.redirect();
        }
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'complete');
        return false;
    });

    imageNormal.addListener(ui.events.CLICK, function(index,e) {
        var oTarget = baidu.event.getTarget(e);
        if(oTarget.nodeType == '1') {
            if(oTarget.nodeName.toLowerCase() == 'img') {
                this.sendLog('float1Button' + (index + 1) + 'imgclick');
            }
            else if(oTarget.nodeName.toLowerCase() == 'span') {
                this.sendLog('float1Button' + (index + 1) + 'textclick');
            }
        }
        setCover(index);
        fwcVideo.refresh(null, AD_CONFIG['fwc']['options'][index]);
        lastFWCVideoIndex = index;
        return false;
    });

    tab_container.addListener(ui.events.TAB_HOVER, function() {
        return false;
    });

    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(lastFWCVideoIndex == index) {
            return;
        }
        hideFWC();
        if(!fwc)
            return;
        //重绘浮层视频
        if(fwcVideo) {
            ad.base.setTimeout(function() {
                fwcVideo.refresh(null,AD_CONFIG['fwc']['options'][index]);
            },10);
            fwc.show();
            if (!fwcRenderd) {
                var canvas = baidu.dom.first(fwc.getRoot());
                if (canvas && canvas.id) {
                    material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                    fwcRenderd = true;
                }
            }
        }
        arr_links = imageNormal.getRoot().getElementsByTagName('a');
        setCover(index);
        lastFWCVideoIndex = index;
    }

    
    function hideFWC() {
        if(fwcVideo) {
            fwcVideo.clearRoot();
        }
        fwc.hide();
        lastFWCVideoIndex = -1;
    }
    var arr_links;
    function setCover(index) {
        if(!cover) {
            cover = baidu.dom.create('div',{'class':'ec-cover'});
            cover.innerHTML = '播放中';
        }
        var link = arr_links[index];
        if(link) {
            link.appendChild(cover);
        }
    }
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
