/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * build/task/chk_single_quote.js ~ 2013/12/29 11:06:29
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 * 在rcres系统中通过人肉的方式投放定制的html，如果代码中存在
 * 单引号，导致投放之后无法修改，为了降低这种情况出现的概率，我们
 * 禁止在html和less中使用单引号
 **/
var base = require('../base');

var pool = base.get_file_pool(function(item){
    if (item.indexOf('/ad/widget/') !== -1) {
        if (/\.app\.html$/.test(item)) {
            return false;
        }
        return /(\.html|\.less)$/.test(item);
    }
    return /(\.less)$/.test(item);
});
pool = base.ignore(pool, 'build/ignore/chk_single_quote.cfg');

var def = base.task_runner(pool, base.run_chk_single_quote);
def.done(function(){
    // IGNORE
});
def.fail(function(failure){
    console.log(JSON.stringify(failure, null, 2));
    process.stderr.write('\nSingle quote is not allowed in the following files.\n' +
        failure.map(function(item){ return item.file }).join(' ') + '\n');
    process.exit(1);
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
