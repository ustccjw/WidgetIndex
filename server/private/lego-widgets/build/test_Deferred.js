/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * test_Deferred.js ~ 2013/08/13 22:12:47
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
var Deferred = require('./Deferred');

var POOL = [1,2,3,4,5,6,7,8,9,10];
var failure = [];
var ActiveCount = 0;
function startTask() {
    if (!POOL.length) {
        if (ActiveCount <= 0) {
            console.log("FAIL: [%s]", failure);
        }
        return;
    }

    var chunk = POOL.pop();
    var def = new Deferred();
    ActiveCount ++;
    def.ensure(function(){
        ActiveCount --;
    });
    def.done(function(chunk){
        console.log("DONE: [%s]", chunk);
        startTask();
    });
    def.fail(function(chunk){
        failure.push(chunk);
        startTask();
    });
    var delay = Math.ceil(Math.random() * 10);
    setTimeout(function(){
        if (Math.random() > .5) {
            def.resolve(chunk);
        } else {
            def.reject(chunk);
        }
    }, delay * 100);
    return def;
};


for(var i = 0; i < 10; i ++) {
    startTask();
}





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
