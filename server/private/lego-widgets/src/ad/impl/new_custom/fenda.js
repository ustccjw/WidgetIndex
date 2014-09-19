/**
 * @author chenjiawei01@baidu.com
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SinaWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.Image');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Flash');

goog.include('ad/impl/new_custom/fenda.less');
goog.provide('ad.impl.new_custom.Fenda');


ad.Debug(function (async) {
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['smallHead']);
    var htmlText = new ad.widget.HtmlText(AD_CONFIG['htmlText']);
    var image = new ad.widget.Image(AD_CONFIG['image']);

    // weibo
    var weibo;
    if (AD_CONFIG['weibo']['isSinaWeibo'] === false) {
        weibo = new ad.widget.QQWeibo(AD_CONFIG['weibo']);
    }
    else {
        weibo = new ad.widget.SinaWeibo(AD_CONFIG['weibo']);
    }

    // video浮层
    var fwcVideo = new ad.widget.Video(AD_CONFIG['videoFwc']['video']);
    AD_CONFIG['videoFwc']['material_name'] = 'ec-fenda-video';
    AD_CONFIG['videoFwc']['id'] = 1;
    var videoFwc = new ad.widget.FloatWindowContainer(AD_CONFIG['videoFwc']);
    videoFwc.setWidgets([fwcVideo]);

    // flash浮层
    AD_CONFIG['flashFwc']['material_name'] = 'ec-fenda-flash';
    AD_CONFIG['flashFwc']['id'] = 2;
    var flashFwc = new ad.widget.FloatWindowContainer(AD_CONFIG['flashFwc']);
    flashFwc.setWidgets([new ad.widget.Flash(AD_CONFIG['image']['flash'])]);
    
    var widgets = [
        [title, video, [smallHead, weibo]],
        [htmlText],
        [image],
        videoFwc,
        flashFwc
    ];
    material.setWidgets(widgets);

    // 标识浮层是否被初始化，是否与物料绑定
    var videoFwcRendered = false;
    var flashFwcRendered = false;

    // 显示video浮层
    video.addListener(ui.events.VIDEO_CLICK, function () {
        hideFwc();
        videoFwc.show();
        if (!videoFwcRendered) {
            var canvas = baidu.dom.first(videoFwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                videoFwcRendered = true;
            }
        }
        video.pause();
        video.sendLog('floatopen');
        return false;
    });

    // 显示flash浮层
    image.addListener(ui.events.CLICK, function () {
        hideFwc();
        flashFwc.show();
        if (!flashFwcRendered) {
            var canvas = baidu.dom.first(flashFwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                flashFwcRendered = true;
            }
        }
        image.sendLog('image floatopen');
        return false;
    });
    
    // 隐藏所有浮层
    function hideFwc () {
        videoFwc.hide();
        flashFwc.hide();
    }

    // 浮层关闭事件
    flashFwc.addListener(ui.events.CLOSE, function () {
        hideFwc();
    });
    videoFwc.addListener(ui.events.CLOSE, function () {
        hideFwc();
    });

    // video浮层中video的事件
    fwcVideo.addListener(ui.events.VIDEO_START, function () {
        fwcVideo.sendLog('floatvideo start');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function () {
        fwcVideo.sendLog('floatvideo finish');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_PAUSE, function () {
        fwcVideo.sendLog('floatvideo pause');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function () {
        fwcVideo.sendLog('floatvideo continue');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_AUTO, function () {
        fwcVideo.sendLog('floatvideo auto');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function () {
        fwcVideo.sendLog('floatvideo click');
        return false;
    });

    if (async === true) {
        return material;
    }
    material.show();

    // 处理dom
    var tmp = baidu.dom.q('ad-widget-qq-weibo');
    if (tmp.length) {
        var qqWeibo = tmp[0];
        var weiboName = baidu.dom.q('ec-name', qqWeibo)[0];
        baidu.dom.setStyles(weiboName, {
            "padding": 0,
            "background": "none"
        });
        var weibotext = baidu.dom.q('ec-text', qqWeibo)[0];
        weibotext.firstChild.nodeValue = '粉丝';
    }

    return material;
});