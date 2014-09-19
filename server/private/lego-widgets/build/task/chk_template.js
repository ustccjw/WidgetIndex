/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * build/task/chk_template.js ~ 2013/11/11 11:14:29
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 检查模板中的href是否符合规范
 * 必须是href="{{{rcv_url}}}"的格式
 **/
var base = require('../base');

var pool = base.get_template_pool();
var def = base.task_runner(pool, base.run_chk_template);
def.fail(function(failure){
    console.log(JSON.stringify(failure, null, 2));
    process.exit(1);
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
