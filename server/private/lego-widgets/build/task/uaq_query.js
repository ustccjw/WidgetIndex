/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * build/task/uaq_query.js ~ 2013/09/13 15:05:18
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 根据keywords.csv，启动uaq的任务
 **/
var Deferred = require('../Deferred');
var fs = require('fs');

var activeCount = 0;
var taskIds = JSON.parse(fs.readFileSync('test/keywords.task.txt'));

function startTask() {
    if (!taskIds.length) {
        return;
    }

    var task = taskIds.pop();
    var def = queryTask(task);
    def.done(function(task){
        console.log(JSON.stringify(task));
        startTask();
    });
    def.fail(function(e){
        console.error(JSON.stringify(e));
        startTask();
    });
}

function queryTask(task) {
    var def = new Deferred();
    var url = 'http://uaq.baidu.com/interface/speedtest/queryTask.php?task_id=' + task.task_id;
    var http = require('http');
    http.get(url, function(res){
        // {"status":"ok","result":{"first_screen": 0.42, ....},"url":"","create_time":"","taskinfourl":""}
        // {"status":"64","url":"","create_time":""}
        var buffer = [];
        res.on('data', function (chunk) {
            buffer.push(chunk);
        });
        res.on('end', function(){
            try {
                var data = JSON.parse(Buffer.concat(buffer).toString('utf-8'));
                var status = data.status;
                if (status === 'ok') {
                    task.progress = 100;
                    task.first_screen = data.result.first_screen;
                } else if (/\d+/.test(status)) {
                    task.progress = parseInt(status, 10);
                    task.first_screen = null;
                } else {
                    data.task_id = task.task_id;
                    def.reject(data);
                    return;
                }
                def.resolve(task);
            } catch(e){
                def.reject(e);
            }
        });
    }).on('error', function(e){
        def.reject(e);
    });

    return def;
}

var cpus = 10;
for(var i = 0; i < cpus; i ++) {
    startTask();
}





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
