/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/wise/minutemaid_orange.js ~ 2013/10/22 17:33:02
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * minutemaid_orange相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/wise/minutemaid_orange.less');
goog.include('ad/widget/wise/minutemaid_orange.html');

goog.provide('ad.widget.wise.MinutemaidOrange');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wise.MinutemaidOrange = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_wise_minutemaid_orange';

    this._token = baidu.url.getQueryValue(window.location.href, 'mmo_token');
    // Inner test:
    // this._url = "http://jx-sdc-bk02.jx.baidu.com:8998/api/update_status.php?id=" + this._token + "&count=";
    this._url = "http://wpl.baidu.com/api/update_status.php?id=" + this._token + "&count=";
    this._orange = 0; // 计数
    this._lockLength = 2000; // 锁屏时长
    this._locked = false;
    this._allowPhone = (navigator.userAgent.match(/(iPad|iPhone|iPod|Android|android)/g) ? true : false); // 限制机型
};
baidu.inherits(ad.widget.wise.MinutemaidOrange, ad.widget.Widget);

/** @override */
ad.widget.wise.MinutemaidOrange.prototype.enterDocument = function() {
    // 动态修改viewport
    this._viewport = document.querySelector("meta[name=viewport]");
    this._viewPortContent = this._viewport ? this._viewport['content'] : "";

    // WISE端会复制一个修改了id的dom对象,
    // 与这次投放的js动态对象冲突, 这里将它删除
    var doms = document.querySelectorAll('.ad-widget-wise-minutemaid-orange');
    for (var i = doms.length - 1; i >= 0; i--) {
        baidu.hide(doms[i]);
    };
    baidu.show(this.getId('outer'));

    if (!this._token) {
        return false;
    }
    if (this._allowPhone) {
        this.open();
        this.setOrange(0);
    } else {
        this.simpleOpen();
    }

};

/** @override */
ad.widget.wise.MinutemaidOrange.prototype.bindEvent = function() {
    var me = this;
    baidu.event.on(this.getId('wrap'), "touchstart", function() {
        if (me._locked) return;
        me.setOrange(me._orange + 1);
    });
    baidu.event.on(this.getId('playagain'), "click", function() {
        me.playagain();
    });
    baidu.event.on(this.getId('close'), "click", function() {
        me.close();
    });
    baidu.event.on(this.getId('simple-close'), "click", function() {
        me.simpleClose();
    });
};

/**
 * 针对普通机型显示简单浮层
 */
ad.widget.wise.MinutemaidOrange.prototype.simpleOpen = function() {
    baidu.show(this.getId('simple-wrap'));
}

/**
 * 再玩一次
 */
ad.widget.wise.MinutemaidOrange.prototype.playagain = function() {
    this.setOrange(0);
    location.reload();
}

/**
 * 显示浮层
 */
ad.widget.wise.MinutemaidOrange.prototype.open = function() {
    baidu.show(this.getId('wrap'));
    this.play(this.getId('word1'), 'word1show');
    var content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    if (this._viewport) {
        this._viewport.setAttribute('content', content);
    }
}

/**
 * 关闭浮层
 */
ad.widget.wise.MinutemaidOrange.prototype.close = function() {
    baidu.hide(this.getId('wrap'));
    this.postOrange(-1);
    if (this._viewport) {
        this._viewport.setAttribute('content', this._viewPortContent);
    }
}

/**
 * 关闭浮层
 */
ad.widget.wise.MinutemaidOrange.prototype.simpleClose = function() {
    baidu.hide(this.getId('simple-wrap'));
}

/**
 * 播放某个动画
 * @param {string} domId 动画对象domId.
 * @param {string} motion 动画名.
 */
ad.widget.wise.MinutemaidOrange.prototype.play = function(domId, motion) {
    baidu.addClass(domId, motion);
}

/**
 * 设置客户端橘子数为n
 * @param {number} n 橘子数.
 */
ad.widget.wise.MinutemaidOrange.prototype.setOrange = function(n) {
    var me = this;

    this._orange = n;

    if (this._orange >= -1 && this._orange <= 4) {
        this.postOrange(this._orange);
    } else {
        return false;
    }

    if (this._orange === 1 || this._orange === 2 || this._orange === 3) {
        this._locked = true;
        ad.base.setTimeout(function() {
            me._locked = false;
        }, me._lockLength);
    }

    switch (this._orange) {
        case 1:
            this.play(this.getId('word1'), 'word1hide');
            this.play(this.getId('orange1'), 'orange1move');
            this.play(this.getId('word2'), 'word2show');
            break;
        case 2:
            this.play(this.getId('word2'), 'word2hide');
            this.play(this.getId('orange2'), 'orange2move');
            this.play(this.getId('word3'), 'word3show');
            break;
        case 3:
            this.play(this.getId('word3'), 'word3hide');
            this.play(this.getId('orange3'), 'orange3move');
            break;
        case 4:
            this.play(this.getId('orange4'), 'orange4move');
            this.play(this.getId('orange5'), 'orange5move');
            this.play(this.getId('orange6'), 'orange6move');
            this.play(this.getId('tree'), 'treemove');
            this.play(this.getId('ending2'), 'ending2move');
            this.play(this.getId('playagain'), 'playagainmove');
            break;
    }

}

/**
 * 设置服务器端橘子数为n
 * @param {number} n 橘子数.
 */
ad.widget.wise.MinutemaidOrange.prototype.postOrange = function(n) {
    var url = this._url + n;
    baidu.sio.callByServer(url, function(resp) {
        // console.log(resp);
    });
}


/* vim: set ts=4 sw=4 sts=4 tw=100: */