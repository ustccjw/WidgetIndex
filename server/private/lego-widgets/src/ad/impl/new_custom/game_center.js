/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    game_center.js
 * desc:
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/06/19 15:03:04$
 */

goog.provide('ad.GameCenter');

/**
 * 游戏服务器连接类
 * @param {Object} options 选项
 *
 * @constructor
 */
ad.GameCenter = function(options) {
    /**
     * @type {Object}
     */
    this.options = options;

    /**
     * @type {Function}
     */
    this.MusesConnect = options['MusesConnect'];

    /**
     * @type {string}
     */
    this.host = options['host'] || 'http://gamecenter_0-0-0-2.jpaas-idea.baidu.com';

    /**
     * @type {?string}
     */
    this.hostToken = null;

    /**
     * @type {boolean}
     */
    this.started = false;

    /**
     * @type {Object.<string, Function>}
     */
    this.listeners = {};

    /**
     * @type {?Object}
     */
    this.roomData = null;
};

/**
 * 客户端模式
 *
 * @enum {string}
 */
ad.GameCenter.ClientMode = {
    HOST: 'HOST', // 主人，即PC的角色
    PLAYER: 'PLAYER' // 玩家
};

/**
 * 事件类型
 *
 * @enum {string}
 */
ad.GameCenter.Events = {
    HOST_TOKEN_CREATED: 'HOST_TOKEN_CREATED', // PC上的需要关注的事件：新的本地房间token已创建，需要去更新二维码
    HOST_TOKEN_EXPIRED: 'HOST_TOKEN_EXPIRED', // ad.GameCenter 内部事件，不用管
    ROOM_ENTERED: 'ROOM_ENTERED', // 手机事件：自己进入房间了
    OPPONENT_ENTER_ROOM: 'OPPONENT_ENTER_ROOM', // 手机事件：对方进入房间了
    PLAYER_MESSAGE_RECEIVED: 'PLAYER_MESSAGE_RECEIVED' // 收到对方玩家消息
};

/**
 * 生成访问ad.GameCenter服务器的完整地址
 *
 * @param {string} path
 * @return {string}
 */
ad.GameCenter.prototype.getUrl = function(path) {
    return this.host + path + '?callback=?';
};

/**
 * 获取房间信息
 */
ad.GameCenter.prototype.getRoomData = function() {
    return this.roomData;
};

/**
 * 创建本地房间
 *
 * @param {Function} callback
 */
ad.GameCenter.prototype.createLocalRoom = function(callback) {
    var me = this;
    var url = this.getUrl('/room/create');
    $.getJSON(url)
        .done(function(data) {
            if (data['success']) {
                me.roomData = data;
                callback(null, data['result']['token']);
            }
            else {
                callback(new Error('创建本地房间失败'));
            }
        })
        .fail(function() {
            callback(new Error('服务器错误'));
        });
};

/**
 * 启动
 *
 * @param {ad.GameCenter.ClientMode} mode 连入的类型：PC(HOST)还是手机(PLAYER)
 * @param {Object=} data 额外信息，可选
 */
ad.GameCenter.prototype.start = function(mode, data) {
    if (this.started) {
        return;
    }
    this.mode = mode || ad.GameCenter.ClientMode.PLAYER;
    this.started = true;

    if (this.mode === ad.GameCenter.ClientMode.PLAYER) {
        this.playerStart(data);
    }
    else {
        this.hostStart();
    }
};

/**
 * HOST(PC)的启动逻辑
 */
ad.GameCenter.prototype.hostStart = function() {
    var me = this;
    this.createLocalRoom(function(err, token) {
        if (!err) {
            me.connectAsHost(token);
            // EVENT: 本地房间创建成功事件
            me.trigger(ad.GameCenter.Events.HOST_TOKEN_CREATED, token);
        }
        else {
            me.trigger(
                ad.GameCenter.Events.ERROR,
                err
            );
        }
    });
};

/**
 * HOST重启
 */
ad.GameCenter.prototype.hostRestart = function() {
    this.hostStart();
};

/**
 * 获取HOST当前token
 */
ad.GameCenter.prototype.getHostToken = function() {
    return this.hostToken;
};

/**
 * 以HOST身份与muses系统建立互动连接
 *
 * @param {string} token
 */
ad.GameCenter.prototype.connectAsHost = function(token) {
    var me = this;
    me.hostToken = token;
    function connectInternal() {
        var connect = /** @type {Connect} */new me.MusesConnect();
        me.connect = connect;

        connect
            .connectWith(token)
            .then(function() {
                // 接收更新token的事件
                connect.onMessage = function(msg) {
                    if (msg['type'] === 'event'
                        && msg['event'] === ad.GameCenter.Events.HOST_TOKEN_EXPIRED
                    ) {
                        me.hostRestart();
                    }
                };
            })
            .fail(function(err) {
                me.trigger(
                    ad.GameCenter.Events.ERROR,
                    err
                );
            });
    }

    if (this.connect) {
        this.connect
            .disconnect()
            .then(function() {
                connectInternal();
            });
    }
    else {
        connectInternal();
    }
};

/**
 * 玩家启动
 *
 * @param {Object} player 当前玩家信息
 */
ad.GameCenter.prototype.playerStart = function(player) {
    this.player = player;
    var me = this;
    var matches = window.location.href.match(/(?:\?|&)muses_scepter=([^&]+)/);
    var token = matches && matches.length >= 2 ? matches[1] : null;
    if (token) {
        this.tryEnterRoom(token, function(err, token, isNeedInformHost) {
            if (!err) {
                me.connectAsPlayer(
                    token,
                    function (connect) {
                        if (isNeedInformHost) {
                            connect.send({
                                type: 'event',
                                event: ad.GameCenter.Events.HOST_TOKEN_EXPIRED
                            });
                        }
                    }
                );
            }
            else {
                me.trigger(
                    ad.GameCenter.Events.ERROR,
                    err
                );
            }
        });
    }
    else {
        this.searchRandomRoom(function(err, token) {
            if (!err) {
                me.connectAsPlayer(token);
            }
            else {
                me.trigger(
                    ad.GameCenter.Events.ERROR,
                    err
                );
            }
        });
    }
};

/**
 * 尝试进入本地房间
 *
 * @param {string} token
 * @param {Function} callback
 */
ad.GameCenter.prototype.tryEnterRoom = function(token, callback) {
    var me = this;
    var url = this.getUrl('/room/enter');
    $.getJSON(url, {token: token})
        .done(function(data) {
            if (data['success']) {
                me.roomData = data;
                var isNeedInformHost = data['result']['entered'] && data['result']['full'];
                callback(null, data['result']['token'], isNeedInformHost);
            }
            else {
                callback(new Error('创建随机房间失败'));
            }
        })
        .fail(function() {
            callback(new Error('服务器错误'));
        });
};

/**
 * 搜寻随机房间
 */
ad.GameCenter.prototype.searchRandomRoom = function(callback) {
    var url = this.getUrl('/room/search');
    var me = this;
    $.getJSON(url)
        .done(function(data) {
            if (data['success']) {
                me.roomData = data;
                callback(null, data['result']['token']);
            }
            else {
                callback(new Error('获取随机房间失败'));
            }
        })
        .fail(function() {
            callback(new Error('服务器错误'));
        });
};

/**
 * 获取当前玩家使用的token
 */
ad.GameCenter.prototype.getPlayToken = function() {
    return this.playToken;
};

/**
 * 以玩家身份与muses系统建立互动连接
 *
 * 会发送echo信息确认对方玩家的存在
 * 以 OPPONENT_ENTER_ROOM 事件对外通知对方玩家已接入
 *
 * @param {string} token
 * @param {Function} afterHandler
 */
ad.GameCenter.prototype.connectAsPlayer = function(token, afterHandler) {
    var me = this;
    me.playToken = token;
    function connectInternal() {
        var connect = /** @type {Connect} */new me.MusesConnect();
        me.connect = connect;

        connect
            .connectWith(token)
            .then(function() {
                // 回调
                afterHandler && afterHandler(connect);

                // EVENT: 已进入房间，但还不确定是否有对手在
                me.trigger(
                    ad.GameCenter.Events.ROOM_ENTERED,
                    connect
                );

                var sendSeqs = [];
                var timer = null;
                connect.onMessage = function(msg) {
                    if (msg['type'] === 'echo') {
                        // 应答，序列号加1作为响应
                        connect.send({
                            'type': 'ack',
                            'seq': msg['seq'] + 1,
                            'player': me.player // 将自己的信息发送给对方
                        });
                    }
                    else if (msg['type'] === 'ack') {
                        var ackSeq = msg['seq'];
                        for (var i = 0; i < sendSeqs.length; i++) {
                            if (ackSeq === sendSeqs[i] + 1) {
                                clearTimeout(timer);
                                // EVENT: 确认对手进入房间
                                me.trigger(
                                    ad.GameCenter.Events.OPPONENT_ENTER_ROOM,
                                    connect,
                                    msg['player'] // 收到对手信息
                                );
                                break;
                            }
                        }
                    }
                    else if (msg['type'] === 'message') {
                        me.trigger(ad.GameCenter.Events.PLAYER_MESSAGE_RECEIVED, msg['data']);
                    }
                };
                /**
                 * 发起echo消息，探测房间里有没有人
                 */
                function echo() {
                    var seq = parseInt(Math.random() * 9007199254740991, 10);
                    sendSeqs.push(seq);
                    // 删掉一些seq，免得始终没人回应，队列太长了
                    if (sendSeqs.length > 100) {
                        sendSeqs.shift();
                    }
                    connect.send({
                        'type': 'echo',
                        'seq': seq
                    });
                    timer = setTimeout(echo, 500);
                }
                echo();
            })
            .fail(function(err) {
                me.trigger(
                    ad.GameCenter.Events.ERROR,
                    err
                );
            });
    }

    if (this.connect) {
        this.connect
            .disconnect()
            .then(function() {
                connectInternal();
            });
    }
    else {
        connectInternal();
    }
};

/**
 * 绑定事件
 */
ad.GameCenter.prototype.addListener = function(eventName, handler) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(handler);
};

/**
 * 触发事件
 */
ad.GameCenter.prototype.trigger = function(eventName, var_args) {
    var args = [].slice.call(arguments, 1);
    var handlers = this.listeners[eventName] || [];
    for (var i = 0; i < handlers.length; i++) {
        handlers[i].apply(this, args);
    }
};

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
