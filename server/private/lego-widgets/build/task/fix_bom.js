/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * build/task/fix_bom.js ~ 2013/12/17 17:48:58
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 修复含有bom的文件.
 **/
var colors = require('colors');
var base = require('../base');

var pool = base.get_template_pool();
var pool = base.get_file_pool(function(item){
    return /(\.js|\.html|\.css|\.less)$/.test(item);
});

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
    var def = base.run_fix_bom(item.file);
    activeCount ++;
    def.ensure(function(){
        activeCount --;
    });
    def.done(function(output){
        console.log(('[PASS]:' + item.file).green);
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
