/**
 * @author chenjiawei01@baidu.com
 **/

goog.require('ad.base');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Image');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.MultiVideoThunbnail');

goog.include('ad/impl/new_custom/yiliqq.less');

goog.provide('ad.impl.new_custom.Yiliqq');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.H1(AD_CONFIG['title']);
    var head = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var imgs = new ad.widget.MultiVideoThunbnail(AD_CONFIG['products']);
    var image = new ad.widget.Image(AD_CONFIG['image']);
    var button = new ad.widget.ButtonGroup(AD_CONFIG['button']);

    var videoOptions = AD_CONFIG['products']['options'];
    var videoConfig = AD_CONFIG['video'];
    videoConfig['video_url'] = videoOptions[0]['video_url']; 
    videoConfig['rcv_url'] = videoOptions[0]['rcv_url']; 
    var video = new ad.widget.Video(AD_CONFIG['video']);

    for (var i = videoOptions.length - 1; i >= 0; i--) {
        videoOptions[i]['width'] = videoConfig['width'];
        videoOptions[i]['height'] = videoConfig['height'];
        videoOptions[i]['player_ver'] = videoConfig['player_ver'];
    };

    material.setWidgets(
        [title],
        [video, head, imgs],
        [button],
        [image]
    );

    if (async === true) {
        return material;
    }

    material.show();

    // 点击展示图片播放视频
    imgs.addListener(ui.events.CLICK, function(index) {
        video.refresh(null, videoOptions[index]);
    });
});