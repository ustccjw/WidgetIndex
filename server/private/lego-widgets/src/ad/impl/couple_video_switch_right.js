/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/couple_video_switch_right.js ~ 2014/09/03 14:24:24
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 11222 $
 * @description
 * 高级版右侧擎天柱的样式包含如下的功能：
 * 根据AD_CONFIG中字段的差异，自动适配到对应的样式
 * 1. 图文样式
 * 2. 图文样式+图片浮层
 * 3. 视频
 */

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.base');

goog.require('ad.widget.Image');
goog.require('ad.widget.Flash');
goog.require('ad.widget.Section');
goog.require('ad.widget.BaiduShareV2');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.standard.Video');

goog.include('ad/impl/standard/video.less');
goog.include('ad/impl/couple_video_switch_right.less');

goog.provide('ad.impl.CoupleVideoSwitchRight');

ad.Debug(function(async) {

    var material = new ad.material.BaseMaterial();

    var widgets = [];

    // 260x146的视频必须存在
    var video = null;
    var videoOptions = null;
    if (AD_CONFIG['videos']) {
        videoOptions = AD_CONFIG['videos']['options'];
        video = new ad.widget.standard.Video(videoOptions[0]);
        video.bindEvent = geneVideoBindEvent(0);
        widgets.push(video);
    }

    // 过渡线
    var line = null;
    var lineConfig = null;
    if (AD_CONFIG['line']) {
        lineConfig = AD_CONFIG['line'];
        lineConfig['image_url'] = lineConfig['image_url'][lineConfig['theme']];
        delete lineConfig['theme'];
        line = new ad.widget.Image(lineConfig);
        widgets.push(line);
    }

    // 描述，链接，分享都是可选的内容.
    var htmlText = null;
    var description = AD_CONFIG['description'];
    if (description && description['rcv_html'].length) {
        htmlText = new ad.widget.HtmlText(AD_CONFIG['description']);
        widgets.push(htmlText);
    }

    var links = AD_CONFIG['links'];
    var section = new ad.widget.Section(links);
    if (links && links['options'] && links['options'].length) {
        widgets.push(section);
    }

    var shareButton = AD_CONFIG['baidu_share']['cfg'];
    if ('true' in shareButton) {
        var config = shareButton['true'];
        config['display'] = true;
        config['bds_more_first'] = true;
        widgets.push(new ad.widget.BaiduShareV2(config));
    }

    material.setWidgets(widgets);

    // 保证线上 在ready后才执行
    var bdsReady = ad.base.getObjectByName('bds.ready');
    if (typeof bdsReady === 'function') {
        bdsReady(function() {
            if (typeof require === 'function') {
                require.config({
                    'baseUrl': RT_CONFIG.HOST('s1.bdstatic.com') + '/r/www/cache/biz',
                    'packages': [ {
                        'name': 'ecma',
                        'location': RT_CONFIG.HOST('ecma.bdimg.com') + '/public01'
                    } ]
                });
                require([ 'ecma/ui/event_center' ], function(m) {
                    m['subscribe']('FLASH_HOVER_DOT', function(ev, dotId) {
                        switchVideo(dotId - 1);
                    });
                    m['subscribe']('FLASH_LEAVE_DOT', function(ev, dotId) {
                        hideLine();
                    });
                });
            }
        });

    }

    if (async === true) {
        return material;
    }

    material.show();

    material.rewriteTitle2(null, '右侧', false);


    var lineDom = null;
    var lineImg = null;
    if (line) {
        lineDom = line.getRoot();
        lineImg = lineDom.getElementsByTagName('img');
        if (lineImg) {
            lineImg = lineImg[0];
        }
        if (lineConfig['class']) {
            baidu.dom.addClass(lineDom, lineConfig['class']);
        }
    }

    var currentVideoIndex = 0;
    var videoSwitchDelayTimer;
    function switchVideo(index) {
        if (!videoOptions[index]) {
            return ;
        }
        showLine(index, function() {
            if (currentVideoIndex !== index) {
                video.bindEvent = geneVideoBindEvent(index);
                video.refresh(null, videoOptions[index]);
                /*video.setVideo(videoOptions[index]['video_url']);
                video.pause();*/
                currentVideoIndex = index;
            }
            // hideLine();
        });
    }
    function showLine(index, callback) {
        lineDom.style.display = 'block';
        lineImg.src = lineConfig['image_url'];
        videoSwitchDelayTimer = ad.base.setTimeout(callback, 600);
    }
    function hideLine() {
        baidu.dom.hide(lineDom);
        lineImg.src = lineConfig['transparent_image'];
        ad.base.clearTimeout(videoSwitchDelayTimer);
    }

    // For Debug
    // window.rightVideoSwitch = switchVideo;

    // 播放日志中插入视频编号
    // 因为多个视频切换，需要知道每个视频的播放记录
    function geneVideoBindEvent(index) {
        index += 1;
        return function() {
            var me = this;
            var container = baidu.g(me.getId('video-container'));
            var url = me._data['rcv_url'];
            var clickProxy = me._data['click_proxy'];
            if (!me._data['is_ipad']) {
                window[me._data['OpenCstUrlCallBack']] = function() {
                    if (me.trigger(ui.events.VIDEO_CLICK) !== false) {
                        me.sendLog('视频链接跳转', 'videojump');
                    }
                    if (url) {
                        // 使用其他函数取代默认跳转功能
                        if (clickProxy && (typeof window[clickProxy]) === 'function') {
                            window[clickProxy](url);
                        }
                        else {
                            window.open(url);
                        }
                    }
                };

                window[me._data['TrackCallBack']] = function(num) {
                    // 精算统计播放时间
                    var mktIndex = (window['_mkt'] && me._data['mkt_index']) ? me._data['mkt_index'] : 0;
                    if (num === 0) {
                        if (me.trigger(ui.events.VIDEO_START) !== false) {
                            me.sendLog('手动播放[' + index + ']', 'videostart');
                            if (mktIndex) {
                                window['_mkt'].push('_startTimer', mktIndex);
                            }
                        }
                    }
                    else if (num === 2) {
                        if (me.trigger(ui.events.VIDEO_FINISH) !== false) {
                            me.sendLog('播放完成[' + index + ']', 'videocomplete');
                            if (mktIndex) {
                                window['_mkt'].push('_stopTimer', mktIndex);
                            }
                        }
                    }
                    else if (num === 3) {
                        if (me.trigger(ui.events.VIDEO_PAUSE) !== false) {
                            me.sendLog('暂停播放[' + index + ']', 'videopause');
                            if (mktIndex) {
                                window['_mkt'].push('_pauseTimer', mktIndex);
                            }
                        }
                    }
                    else if (num === 4) {
                        if (me.trigger(ui.events.VIDEO_CONTINUE) !== false) {
                            me.sendLog('继续播放[' + index + ']', 'videocontinue');
                            if (mktIndex) {
                                window['_mkt'].push('_continueTimer', mktIndex);
                            }
                        }
                    }
                    else if (num === 5) {
                        if (me.trigger(ui.events.VIDEO_AUTO) !== false) {
                            me.sendLog('自动播放[' + index + ']', 'videoauto');
                        }
                    }
                };
            }
            else {
                if (container) {
                    baidu.on(container, 'click', function(e) {
                        // if (me.trigger(ui.events.VIDEO_CLICK) !== false) {
                            // 是链接跳转，这里没必要手动发送
                            // me.sendLog('视频链接跳转(ipad)', 'videojump');
                        // } else {
                        if (me.trigger(ui.events.VIDEO_CLICK) === false) {
                            baidu.event.stop(e);
                        }
                    });
                }
            }
        };
    }

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
