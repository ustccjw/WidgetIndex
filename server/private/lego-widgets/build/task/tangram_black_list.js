/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    build/task/tangram_black_list.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/23 15:30:52$
 */

// 如果已经将tangram里某个函数迁移到了ad/base里
// 那么需要在这里写一下，这样后面如果不小心使用了，会在跑app_test的时候报错
var blackList = [
    // 例如：
    // "baidu.g",
    // "baidu.dom.g",
    // ...
];

module.exports = blackList;


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
