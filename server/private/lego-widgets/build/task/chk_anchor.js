/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * build/chk_anchor.js ~ 2014-01-08 16:02:17
 * @author xiongjie01
 * @version $Revision$
 * @description
 *
 **/
var colors = require('colors');
var base = require('../base');
var fs = require('fs');

var pool = base.get_task_pool();

var failure = [];
var activeCount = 0;
function startTask() {
    if (!pool.length) {
        if (activeCount <= 0) {
            if (failure.length) {
                console.log(JSON.stringify(failure, null, 2));
                process.exit(1);
            }
        }
        return;
    }

    var item = pool.pop();
    var def = base.run_chk_anchor(item.url, item.file);
    activeCount ++;
    def.ensure(function(){
        activeCount --;
    });
    def.done(function(output){
        if (output) {
            var isPass = output.invalidAnchorsXpath.length == 0;

            if (isPass) {
                console.log(('[PASS]:' + output.file).green);
            } else {
                console.log(('[FAIL]:' + output.file).red);
                failure.push({file: output.file, ColoredAnchorsXpath: output.invalidAnchorsXpath});
            }
        }

        startTask();
    });
    def.fail(function(error){
        console.log(('[FAIL]:' + item.file).red);
        failure.push({file: item.file, error: error.toString()})
        startTask();
    });
}

var os = require('os');
var cpus = Math.min(os.cpus().length * 2, pool.length);
if (os.type() === 'Windows_NT' || os.type() === 'Darwin') {
    cpus = 2;
}
for(var i = 0; i < cpus; i ++) {
    startTask();
}



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
