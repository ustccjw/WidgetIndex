/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: hengda.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/hengda.config.js ~ 2013/10/30 14:23:28
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * case1179的配置数据
 **/

var AD_CONFIG = {
    "id": "bubugao0507",
    "main_url": "http://www.vivo.com.cn",
    "bg": "//bs.baidu.com/adtest/b7bfbb803c0cb85db2a99aeceea9fc0c.jpg",
    "button": {
        "top": 360,
        "left": 50
    },
    "countdown1": {
        "endTime": "2014-05-07 19:30:00",
        //时间是否是文本显示，用于特殊样式的倒计时
        "displayText": true,
        //时间的分隔符
        "timeSeparator": '',
        //是否显示天
        "displayDay": false,
        //是否显示天的单位
        "displayDayUnit": false,
        //是否显示时间的单位
        "displayTimeUnit": false
    },
    "countdown2": {
        "endTime": "2014-05-07 22:00:00",
        //时间是否是文本显示，用于特殊样式的倒计时
        "displayText": true,
        //时间的分隔符
        "timeSeparator": '',
        //是否显示天
        "displayDay": false,
        //是否显示天的单位
        "displayDayUnit": false,
        //是否显示时间的单位
        "displayTimeUnit": false
    },
    "links": {
        'options' : [
            {
              'rcv_url' : 'http://www.vivo.com.cn/?utm_source=baidu&utm_medium=brandzone&utm_campaign=Brandzone_%E6%B4%BB%E5%8A%A8%E6%A0%87%E8%AF%AD'
            }
        ]
    },
    "iframe": {
        "width" : 317,
        "height" : 170,
        'src': 'http://www.vivo.com.cn/live-player.html'
    },
    "logo": {
        "image_rcv_url": "http://www.vivo.com.cn/?utm_source=baidu&utm_medium=brandzone&utm_campaign=Brandzone_%E5%BC%82%E5%BD%A2%E5%93%81%E4%B8%93logo"
    },
    "image": {
        "image_url": "//bs.baidu.com/adtest/9a940c3b71e9e0a0bde0635fe2821026.jpg",
        "image_rcv_url": "http://www.vivo.com.cn/?utm_source=baidu&utm_medium=brandzone&utm_campaign=Brandzone_%E7%9B%B4%E6%92%AD%E7%BB%93%E6%9D%9F%E8%B7%B3%E8%BD%AC"
    }
};





/* vim: set ts=4 sw=4 sts=4 tw=100: */
