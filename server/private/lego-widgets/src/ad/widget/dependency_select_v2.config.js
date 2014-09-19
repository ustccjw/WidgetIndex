/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: dependency_select_v2.config.js 18021 2013-03-04 06:45:26Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/jn/demo/dependency_select_v2.config.js ~ 2012/08/08 21:41:35
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 18021 $
 * @description
 * video相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    "dependency":[
        {
            "name": "province",
            "title": "省份"
        },{
            "name": "city",
            "title": "城市"
        }
    ],
    //"datasource_url": "//bs.baidu.com/adtest/80c592a1a964d95c225d6a170ee147bf.js"
    "data": [{
        "text": "请选择*",
        "value": "null",
        "children": [{
            "text": "请选择*",
            "value": "null"
        }]
    }, {
        "text": "上海",
        "value": "上海",
        "children": [{
            "text": "上海",
            "value": "上海"
        }]
    }, {
        "text": "浙江",
        "value": "浙江",
        "selected": 1,
        "children": [{
            "text": "杭州",
            "value": "杭州"
        }, {
            "text": "温州",
            "value": "温州"
        }, {
            "text": "宁波",
            "value": "宁波"
        }, {
            "text": "金华",
            "value": "金华"
        }, {
            "text": "绍兴",
            "value": "绍兴"
        }]
    }, {
        "text": "江苏",
        "value": "江苏",
        "children": [{
            "text": "苏州",
            "value": "苏州"
        }, {
            "text": "南京",
            "value": "南京"
        }]
    }, {
        "text": "江西",
        "value": "江西",
        "children": [{
            "text": "南昌",
            "value": "南昌"
        }]
    }, {
        "text": "北京",
        "value": "北京",
        "children": [{
            "text": "北京",
            "value": "北京"
        }]
    }, {
        "text": "山东",
        "value": "山东",
        "children": [{
            "text": "济南",
            "value": "济南"
        }, {
            "text": "青岛",
            "value": "青岛"
        }]
    }, {
        "text": "河北",
        "value": "河北",
        "children": [{
            "text": "石家庄",
            "value": "石家庄"
        }, {
            "text": "唐山",
            "value": "唐山"
        }]
    }, {
        "text": "天津",
        "value": "天津",
        "children": [{
            "text": "天津",
            "value": "天津"
        }]
    }, {
        "text": "湖北",
        "value": "湖北",
        "children": [{
            "text": "武汉",
            "value": "武汉"
        }]
    }, {
        "text": "湖南",
        "value": "湖南",
        "children": [{
            "text": "长沙",
            "value": "长沙"
        }]
    }, {
        "text": "广东",
        "value": "广东",
        "children": [{
            "text": "广州",
            "value": "广州"
        }, {
            "text": "深圳",
            "value": "深圳"
        }, {
            "text": "东莞",
            "value": "东莞"
        }, {
            "text": "佛山",
            "value": "佛山"
        }]
    }, {
        "text": "福建",
        "value": "福",
        "children": [{
            "text": "厦门",
            "value": "厦门"
        }]
    }, {
        "text": "四川",
        "value": "四川",
        "children": [{
            "text": "成都",
            "value": "成都"
        }]
    }, {
        "text": "重庆",
        "value": "重庆",
        "children": [{
            "text": "重庆",
            "value": "重庆"
        }]
    }, {
        "text": "云南",
        "value": "云南",
        "children": [{
            "text": "昆明",
            "value": "昆明"
        }]
    }, {
        "text": "贵州",
        "value": "贵州",
        "children": [{
            "text": "贵阳",
            "value": "贵阳"
        }]
    }, {
        "text": "陕西",
        "value": "陕西",
        "children": [{
            "text": "西安",
            "value": "西安"
        }]
    }, {
        "text": "山西",
        "value": "山西",
        "children": [{
            "text": "太原",
            "value": "太原"
        }]
    }, {
        "text": "河南",
        "value": "河南",
        "children": [{
            "text": "郑州",
            "value": "郑州"
        }]
    }, {
        "text": "辽宁",
        "value": "辽宁",
        "children": [{
            "text": "沈阳",
            "value": "沈阳"
        }, {
            "text": "大连",
            "value": "大连"
        }]
    }, {
        "text": "吉林",
        "value": "吉林",
        "children": [{
            "text": "长春",
            "value": "长春"
        }]
    }, {
        "text": "黑龙江",
        "value": "黑龙江",
        "children": [{
            "text": "哈尔滨",
            "value": "哈尔滨"
        }]
    }, {
        "text": "安徽",
        "value": "安徽",
        "children": [{
            "text": "合肥",
            "value": "合肥"
        }]
    }, {
        "text": "内蒙古",
        "value": "内蒙古",
        "children": [{
            "text": "鄂尔多斯",
            "value": "鄂尔多斯"
        }]
    }, {
        "text": "新疆",
        "value": "新疆",
        "children": [{
            "text": "乌鲁木齐",
            "value": "乌鲁木齐"
        }]
    }]
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
