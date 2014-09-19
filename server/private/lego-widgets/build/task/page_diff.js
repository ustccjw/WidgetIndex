/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * build/task/page_diff.js ~ 2013/09/14 20:24:34
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 * 比较两张png图片的差异，将差异输出.
 **/
var base = require('../base');

var activeCount = 0;
var pool = base.get_task_pool();
pool = base.ignore(pool, 'build/ignore/app_test.cfg');
pool = base.ignore(pool, 'build/ignore/page_diff.cfg');
var failure = [];
function startTask() {
    if (!pool.length) {
        if (activeCount <= 0) {
            if (failure.length) {
                process.stderr.write(failure.join('\n---------------\n'));
                process.exit(1);
            }
        }
        return;
    }

    var item = pool.pop();
    var def = base.run_page_diff(item.url, item.file);
    activeCount ++;
    def.ensure(function(){
        activeCount --;
    });
    def.done(function(output){
        if (output) {
            console.log(('[PASS]:' + item.file).green);
        }
        startTask();
    });
    def.fail(function(error){
        console.log(('[FAIL]:' + item.file).red);
        failure.push(error.toString());
        startTask();
    });
}

var os = require('os');
var cpus = Math.min(os.cpus().length * 2, pool.length);
if (os.type() === 'Windows_NT' || os.type() === 'Darwin') {
    cpus = 2;
}
for(var i = 0; i < 1; i ++) {
    startTask();
}
















/* vim: set ts=4 sw=4 sts=4 tw=100: */
