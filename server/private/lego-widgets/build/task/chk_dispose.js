/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    build/task/chk_dispose.js
 * desc:
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/12/31 16:17:55$
 */

var colors = require('colors');
var base = require('../base');

var pool = base.ignore(base.get_task_pool(), 'build/ignore/app_test.cfg');

var def = base.task_runner(pool, base.run_chk_dispose, function(output) {
    if (!output) {
        return true;
    }

    var isPass = true;

    if (output.unDisposedTimers.length) {
        isPass = false;
    }
    if (output.callNotFromAdBase.length) {
        isPass = false;
    }
    if (output.unDisposedEvents.length) {
        isPass = false;
    }

    if (!isPass) {
        // !== true
        return output;
    }

    return true;
});
def.done(function(){
    // IGNORE
});
def.fail(function(failure){
    console.log(JSON.stringify(failure, null, 2));
    process.exit(1);
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
