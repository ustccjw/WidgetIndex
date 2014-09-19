/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * build/task/chk_bom.js ~ 2013/12/17 17:25:37
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 1. 检查文件中是否存在BOM，如果存在的话，报错
 * 2. 检查文件的编码是否是utf-8
 **/
var base = require('../base');

var pool = base.get_file_pool(function(item){
    return /(\.js|\.html|\.css|\.less)$/.test(item);
});
var def = base.task_runner(pool, base.run_chk_bom);
def.done(function(){
    // IGNORE
});
def.fail(function(failure){
    console.log(JSON.stringify(failure, null, 2));
    process.stderr.write('\nPlease run the following command to fix this issue.\nnode build/task/fix_bom.js ' +
        failure.map(function(item){ return item.file }).join(' ') + '\n');
    process.exit(1);
});






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
