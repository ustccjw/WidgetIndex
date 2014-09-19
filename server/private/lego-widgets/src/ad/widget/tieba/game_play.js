/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/game_play.js ~ 2013/07/24 15:39:56
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * game_play相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/tieba/game_play.less');
goog.include('ad/widget/tieba/game_play.html');

goog.provide('ad.widget.tieba.GamePlay');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.GamePlay = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_game_play';
};
baidu.inherits(ad.widget.tieba.GamePlay, ad.widget.Widget);

/** @override */
ad.widget.tieba.GamePlay.prototype.bindEvent = function() {
    ad.widget.tieba.GamePlay.superClass.bindEvent.call(this);
    var me = this;
    var content = this.getId('content');
    var gameWrap = this.getId('flash');
    var game = this.getId('game');
    var gameHtml = baidu.g(game).innerHTML;

    baidu.on(me.getId('image'), 'click', function(e) {
        me.sendLog('图标被点击', '图标被点击');
    });

    if (this._data['swf_src']) {
        baidu.on(me.getId('btn'), 'click', function(e) {
            baidu.event.preventDefault(e || window.event);

            baidu.dom.empty(game);
            baidu.dom.insertHTML(game, 'afterBegin', gameHtml);

            baidu.dom.hide(content);
            baidu.dom.show(gameWrap);
            baidu.setStyle(gameWrap, 'width', me._data['flash_width']);
            baidu.setStyle(gameWrap, 'height', me._data['flash_height'] + 20);
            me.sendLog('打开Flash', '打开Flash');
            me.trigger(ui.events.TIEBA_LIST_GAME_PLAY);
        });
        baidu.on(me.getId('close_btn'), 'click', function(e) {
            baidu.event.preventDefault(e || window.event);
            baidu.dom.hide(gameWrap);
            baidu.dom.show(content);
            //IE need remove swf.
            baidu.dom.empty(game);
            me.sendLog('关闭Flash', '关闭Flash');
        });
    }
};

/** @override */
ad.widget.tieba.GamePlay.prototype.patchData = function() {
    if (this._data) {
        this._data['flash_width'] = this._data['flash_width'] > 530 ? 530 : this._data['flash_width'];
        this._data['flash_height'] = this._data['flash_height'] > 440 ? 440 : this._data['flash_height'];
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */