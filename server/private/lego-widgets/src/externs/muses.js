/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/externs/muses.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/06/24 17:12:54$
 */

/**
 * Muses Connect
 * @constructor
 */
var Connect = function() {};

/**
 * configure
 * @type {Object} configuration 配置对象
 */
Connect.prototype.config = function(configuration) {};

/**
 * connect to specified token
 *
 * @param {string} token
 */
Connect.prototype.connectWith = function(token) {};

/**
 * ensure room not empty
 */
Connect.prototype.ensureRoomNotEmpty = function() {};

/**
 * syntax sugar for ensureRoomNotEmpty
 */
Connect.prototype.ensurePartnerConnected = function() {};

/**
 * send a message to connected dest
 * @param {string|Object|number} msg 要发送的消息
 */
Connect.prototype.send = function(msg) {};

/**
 * disconnect with dest
 * but you can connect again by calling connectWith
 */
Connect.prototype.disconnect = function() {};

/**
 * destroy cometd connect
 */
Connect.prototype.destroy = function() {};

/**
 * is connected
 */
Connect.prototype.isConnected = function() {};

/**
 * 生成token
 */
Connect.prototype.createToken = function() {};

/**
 * check if connect is destroyed
 */
Connect.prototype.isDestroyed = function() {};

/**
 * on message received hook
 */
Connect.prototype.onMessage = function() {};

/**
 * on token expired hook
 */
Connect.prototype.onTokenExpired = function() {};





















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
