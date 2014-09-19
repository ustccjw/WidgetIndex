/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * build/task/png_diff.js ~ 2013/09/15 21:29:32
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 比较两张图片的差异
 **/
var png_diff = require('../base').png_diff;

if (process.argv.length != 4) {
    console.log("node " + process.argv[1] + " <actual.png> <base.png>");
    process.exit(0);
}

var def = png_diff(process.argv[2], process.argv[3], 0);
def.fail(function(msg){
    console.log(msg);
});
def.done(function(msg){
    console.log(msg);
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
