/**
 * src/ad/impl/coca_cola.less ~ 2013-11-04 14:22:11
 * @author shaojunjie, xiongjie
 * @version $Revision: 11222 $
 * @description
 * coca_cola相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Section');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ui.events');

goog.include('ad/impl/coca_cola.less');

goog.provide('ad.impl.CocaCola');

ad.Debug(function (async) {
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var imageNormalWidget = new ad.widget.ImageNormal(AD_CONFIG['images']);
    AD_CONFIG['fwc']['material_name'] = 'ec-cocacola';
    AD_CONFIG['fwc']['id'] = 1;
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc']['options'][0]);
    var datasource = {'width': 100, 'height': 56, 'options': []};
    for (var i = 0; i < AD_CONFIG['fwc']['options'].length; i++) {
        var item = AD_CONFIG['fwc']['options'][i];
        datasource['options'].push({
            'img_url': item['thumbnail_img_url'],
            'text': item['thumbnail_text'],
            'display_play_button': true
        });
    }
    var multiVideoThunbnail = new ad.widget.MultiVideoThunbnail(datasource);
    fwc.setWidgets([fwcVideo, multiVideoThunbnail]);
    material.setWidgets(
        [
            title,
            [
                new ad.widget.Video(AD_CONFIG['video']),
                [
                    new ad.widget.SmallHead(AD_CONFIG['small_head']),
                    new ad.widget.SmallWeibo(AD_CONFIG['small_weibo'])
                ]
            ]
        ],
        new ad.widget.Section(AD_CONFIG['section']),
        imageNormalWidget,
        fwc
    );
    if (async === true) {
        return material;
    }

    material.show();
    var lastFWCVideoIndex = -1;
    imageNormalWidget.addListener(ui.events.CLICK, function(index){
        showFWC(index);
        imageNormalWidget.sendLog('img' + (index + 1) + 'floatopen');
        return false;
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
});


/* vim: set ts=4 sw=4 sts=4 tw=100: */
