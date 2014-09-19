/**
 * @author chenjiawei01@baidu.com
 * 封装pc和ipad耳目组件
 **/

goog.require('ad.env');
goog.require('ad.widget.Widget');
goog.require('ui.events');
goog.require('ad.dom');

goog.include('ad/widget/iermu.less');
goog.include('ad/widget/iermu.html');

goog.provide('ad.widget.Iermu');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Iermu = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_iermu';
};
baidu.inherits(ad.widget.Iermu, ad.widget.Widget);

/** @override */
ad.widget.Iermu.prototype.enterDocument = function() {
    ad.widget.Iermu.superClass.enterDocument.call(this);

    var id = this.getId('iermu');
    var shareid = this._data['shareid'];
    var uk = this._data['uk'];
    var width = this._data['width'];
    var height = this._data['height'];
    var me = this;

    if (this._data['is_ipad']) {

        // CORS
        var corsXhr = new XMLHttpRequest();
        corsXhr.open('GET', 'https://pcs.baidu.com/rest/2.0/pcs/device?method=liveplay&type=hls&shareid=' +
            encodeURIComponent(shareid) + '&uk=' + encodeURIComponent(uk));
        corsXhr.onload = function(event) {
            var xhr = event.target;
            var responseText = xhr.responseText;
            var data = baidu.json.parse(responseText);

            if (data['div']) {
                
                // 解析出video标签 和 video id
                var res = data['div'].match(/<video\s*id\s*=\s*"([^"]+)".+?<\/video>/);
                var videoHtml = res[0];
                var videoId = res[1];
                ad.dom.g(id).innerHTML = videoHtml;

                // 设置宽高
                baidu.dom.setStyles(videoId, {
                    'width': width + 'px',
                    'height': height + 'px'
                });
                me.videoId = videoId;

                // 发送play事件
                baidu.event.once(videoId, 'playing', function(event) {
                    me.trigger(ui.events.PLAY);
                });
            }
        };
        corsXhr.send();
   }
    else {

        // 动态加载script
        baidu.sio.callByBrowser(RT_CONFIG.HOST('kankan.baidu.com') + '/baiducam.min.js', function() {
            var option = {
                'container': id,
                'shareid': shareid,
                'uk': uk,
                'width':  width,
                'height': height,
                'autoStart': 'false'
            };
            var baiducam = new window['Baiducam'](option);

            baiducam['status'](function(data, err) {
                var xhr = baidu.ajax.request('', {
                    'method': 'HEAD',
                    'async': false,
                    'noCache': true
                });
                var date = new Date(xhr.getResponseHeader('Date'));
                var hour = date.getHours();
                if (hour >= 9 && hour <= 17 && data.status === 1) {
                    baiducam['play'](function() {}, function() {

                        // 播放成功，发送play事件
                        me.trigger(ui.events.PLAY);
                    });
                }
                else {
                    baiducam['vodList'](function(list) {
                        if (list) {

                            // 播放随机录播
                            var index = Math.floor(Math.random() * list.length);
                            baiducam['vodShow'](list[index][0], function() {}, function() {

                                // 播放成功，发送play事件
                                me.trigger(ui.events.PLAY);
                            });
                        }
                    });
                }
            });
        });
    }
};

/** @private */
ad.widget.Iermu.prototype.patchData = function() {
    if (this._data) {
        this._data['is_ipad'] = this.getData('is_ipad', ad.env.isIpad);
    }
};

/** @override */
ad.widget.Iermu.prototype.hide = function() {
    ad.widget.Iermu.superClass.hide.call(this);

    // 暂停直播
    if (this._data['is_ipad']) {
        ad.dom.g(this.videoId).pause();
    }
    else {

        // pc版本的没有提供pause接口
        // 隐藏时要删除flash dom
        var container = this.getId('iermu');
        ad.dom.remove(container);
    }
};
