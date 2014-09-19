/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/hm.js ~ 2012/08/27 14:30:04
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 11222 $
 * @description
 * burberry相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.floatvideo.Main');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Video');
goog.require('ad.widget.floatvideo.Film');
goog.require('ad.widget.floatvideo.Like');
goog.require('ad.widget.floatvideo.Share');

goog.include('ad/impl/floatvideo.less');

goog.provide('ad.impl.Floatvideo');

ad.Debug(function(async){
   dataAdapter(AD_CONFIG);

    var material = new ad.Material(AD_CONFIG['id']),
        main = new ad.widget.floatvideo.Main(AD_CONFIG['main']),
        fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']),
        video = new ad.widget.Video(AD_CONFIG['video'][0]),
        film = new ad.widget.floatvideo.Film(AD_CONFIG['film']),
        like = new ad.widget.floatvideo.Like(AD_CONFIG['like']),
        share = new ad.widget.floatvideo.Share(AD_CONFIG['share']),
        curIndex = 0;

    var sendLog;
    function sendLog() {}

    fwc.setWidgets(
        [video,film],
        [like,share]
    );
    material.setWidgets(
        [main],
        fwc
    );
    if (async === true) {
        return material;
    }
    material.show();

    main.addListener(ui.events.CLICK, function(){
        if(sendLog){
            sendLog('main');
        }
        showFWC();
    });

    fwc.addListener(ui.events.CLOSE,function(){
        if(sendLog){
            sendLog('fwc-close');
        }
        hideFWC();
    })

    video.addListener(ui.events.VIDEO_START,function(){
        if(sendLog){
            sendLog('video-start-' + curIndex);
        }
        return false;
    })

    video.addListener(ui.events.VIDEO_FINISH,function(){
        if(sendLog){
            sendLog('video-complete-' + curIndex);
        }
        return false;
    })

    video.addListener(ui.events.VIDEO_CLICK,function(){
        if(sendLog){
            sendLog('video-jump-' + curIndex);
        }
        return false;
    })

    film.addListener(ui.events.FILM_UP, function(){
        if(sendLog){
            sendLog('film-up');
        }
    });

    film.addListener(ui.events.CLICK, function(index){
        curIndex = index;
        if(sendLog){
            sendLog('video-start-' + curIndex);
        }
        video.clearRoot();
        video.refresh(null,AD_CONFIG['video'][index]);
    });

    film.addListener(ui.events.FILM_DOWN, function(){
        if(sendLog){
            sendLog('film-down');
        }
    });
    
    like.addListener(ui.events.CLICK, function(){
        if(sendLog){
            sendLog('like');
        }
    });

    share.addListener(ui.events.CLICK, function(index){
        if(sendLog){
            sendLog('share-' + index);
        }
    });

    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */
    function showFWC(){
        //重绘浮层视频
        if(video){
            ad.base.setTimeout(function(){
                video.refresh();
            },10);
            fwc.show();
        }
        else{
            fwc.show();
        }
        film.reset();
    }

    /**
     * 隐藏对应的浮层
     * @param {number} index 索引.
     */
    function hideFWC(){
        if(video){
            video.clearRoot();
        }
        fwc.hide();
    }

    function dataAdapter(data){
        data['id'] = data['canvas_id'];
        if(data['fwc']){
            data['fwc']['width'] = 590;
            data['fwc']['height'] = 400;
            data['fwc']['top'] = data['fwc']['top'];
            data['fwc']['left'] = data['fwc']['left'];
            data['fwc']['float_bg'] = {
                'src': data['fwc']['src'],
                'href': data['fwc']['href']
            };
        }
        if(data['video'] && data['video'].length){
            data['film'] = {
                'width': 80,
                'height': 60,
                'options': []
            }
            for(var i = 0; i < data['video'].length; i ++){
                data['video'][i]['csttit'] = "zhidao.baidu.com";
                data['video'][i]['width'] = 480;
                data['video'][i]['height'] = 295;
                data['video'][i]['is_play'] = true;
                data['video'][i]['ipad_img'] = data['video'][i]['img_url'];
                //填充胶片数据
                data['film']['options'].push({
                    'img': data['video'][i]['img'],
                    'text': data['video'][i]['text']
                });
            }
        }

        data['like'] = {};
        data['like']['type'] = 'small';
        data['like']['color'] = 'blue';
        data['like']['uid'] = '5474809';
        data['like']['text'] = '喜欢并分享';

    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
