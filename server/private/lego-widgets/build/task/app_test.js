/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * build/app_test.js ~ 2013/08/11 21:56:50
 * @author liyubei(liyubei@baidu.com)
 * @version $Revision$
 * @description
 *
 **/

var base = require('../base');
var argv = require('optimist').argv;
var chkTangramApi = require('./chk_tangram_api');

var pool = base.ignore(base.get_task_pool(), 'build/ignore/app_test.cfg');
var def = base.task_runner(pool, function(item){
    return base.run_test_case(item, argv.set_benchmark);
});

def.done(function(){
    // IGNORE
});
def.fail(function(failure){
    var failureFiles = failure.map(function(item){ return item.file });
    failure.forEach(function(item){
        console.log(item.file);
        console.log(item.error);
    });
    // process.stderr.write(JSON.stringify(failure, null, 2));
    process.stderr.write('\nPlease run the following command to fix this issue.\nnode build/task/app_test.js --set_benchmark=1 ' + failureFiles.join(' ') + '\n');
    process.exit(1);
});



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
