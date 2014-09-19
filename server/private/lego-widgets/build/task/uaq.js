/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * build/task/uaq.js ~ 2013/09/13 15:05:18
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 根据keywords.csv，启动uaq的任务
 * 因为uaq给提供的限额是每天100~150个url，而且uaq建议不要集中提交一批url，因此我们采用
 * 如下的策略提交url：
 * 1. 读取url列表文件
 * 2. *如果*超过了当天的阈值，等待；否则提交请求
 * 3. 提交请求
 * 4. *如果*成功，获取task_id；*否则*跳转到6步
 * 5. 根据task_id查询状态
 *    *如果*progress大于0，说明已经分配了client，可以继续提交了，跳转到第一步
 *    *否则*等待一段儿时间，继续查询状态
 *    *如果*等待的时间超过了阈值，判断此次任务已经失效，跳转到第一步
 * 6. 等待一段儿时间，跳转到第一步
 **/
var Deferred = require('../Deferred');
var fs = require('fs');

// 每天最多提交140个任务
var MAX_TASK_PER_DAY = 140;

// 每个任务之间等待3分钟，也就是提交了之后等待3分钟查询状态
// 如果progress > 0，说明可以继续提交任务了，否则继续等待3分钟
var MAX_WAITING_TIME_PER_TASK = 2 * 60 * 1000;

// 如果等待了12分钟task_id的状态也没有变化，抛弃之
// 继续提交任务
var MAX_WAITING_TIME = 4 * MAX_WAITING_TIME_PER_TASK;


var inputFile = process.argv[2] || 'test/keywords.csv';

var activeCount = 0;
var keywords = fs.readFileSync(inputFile).toString().trim().split(/\r?\n/g);
var taskIds = [];

function startTask() {
    if (!keywords.length) {
        if (activeCount <= 0) {
            // 输出taskIds
            fs.writeFileSync('test/keywords.task.txt', JSON.stringify(taskIds, null, 2));
        }
        return;
    }

    var query = keywords.pop();
    if (query) {
        query = query.split(/,/g)[0];
    }
    if (!query) {
        startTask();
        return;
    }

    var def = sendRequest(query);
    activeCount ++;
    def.ensure(function(){
        activeCount --;
    });
    def.done(function(task_id){
        var item = {query: query, task_id: task_id};
        taskIds.push(item);
        console.log(item);
        setTimeout(startTask, MAX_WAITING_TIME_PER_TASK);
    });
    def.fail(function(e){
        console.error(e);
        // 失败了，等待一会儿事件，继续下一个任务
        setTimeout(startTask, MAX_WAITING_TIME_PER_TASK);
    });
}

function sendRequest(query) {
    var def = new Deferred();
    var url = "http://uaq.baidu.com/interface/speedtest/createTask.php?snum=500&url=" +
        encodeURIComponent("http://www.baidu.com/s?wd=" + encodeURIComponent(query)) + "&tnum=30&interval=10&_=1379052877534"
    var http = require('http');
    http.get(url, function(res){
        // {"status":"ok","task_id":"470ae5430190753f8b7551b7d88a8599"}
        var buffer = [];
        res.on('data', function (chunk) {
            buffer.push(chunk);
        });
        res.on('end', function(){
            try {
                var data = JSON.parse(Buffer.concat(buffer).toString('utf-8'));
                if (data['status'] === 'ok') {
                    def.resolve(data['task_id']);
                } else {
                    def.reject(data);
                }
            } catch(e){
                def.reject(e);
            }
        });
    }).on('error', function(e){
        def.reject(e);
    });

    return def;
}

var cpus = 1;
for(var i = 0; i < cpus; i ++) {
    startTask();
}





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
