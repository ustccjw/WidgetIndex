/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/stars2013/image.js ~ 2013/11/20 15:00:30
 * @author loutongbing@baidu.com (loutongbing)
 * @version $Revision: 150523 $
 * @description
 * image相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/stars2013/image.less');
goog.include('ad/widget/stars2013/image.html');

goog.provide('ad.widget.stars2013.Image');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.stars2013.Image = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_stars2013_image';
};
baidu.inherits(ad.widget.stars2013.Image, ad.widget.Widget);

/** @override */
ad.widget.stars2013.Image.prototype.enterDocument = function() {
    ad.widget.stars2013.Image.superClass.enterDocument.call(this);
    var me = this; 
    baidu.dom.setAttr(me.getId('span'), 'style', 'color:' + me.color);
    baidu.dom.setAttr(me.getId('span-2'), 'style', 'color:' + me.color);     
    var query = ad.base.getObjectByName('bds.comm.query');
    if (query) {
        baidu.g(me.getId('span-2')).innerHTML = '总结' + query + '的2013';
        //url前缀
        var urlPrefix = 'http://top.baidu.com/detail?b=';
        //default url
        var url = 'http://top.baidu.com/detail?b=18&ie=utf-8&w=%E7%AB%A0%E5%AD%90%E6%80%A1';
        //判断query是否命中urlList
        var id = me.urlList[query];
        if (id) {
            url = urlPrefix + id + '&ie=utf-8&w=' + encodeURIComponent(query);
        }
        baidu.g(me.getId('link')).href = url;  
    }
 
};

/** @override */
ad.widget.stars2013.Image.prototype.patchData = function() {
    this.color = this._data['color'];   
    this.urlList = { 
        '周冬雨': 18,
        '霍思燕': 3,
        '李小冉': 3,
        '唐一菲': 3,
        '陈紫函': 3,
        '陈雅伦': 18,
        '赵韩樱子': 18,
        '熊黛林': 18,
        '朱茵': 3,
        '林依晨': 3,
        '夕树舞子': 18,
        '杜汶泽': 17,
        '李晨': 22,
        '吴尊': 2,
        '明道': 22,
        '张译': 17,
        '霍建华': 17,
        '陈晓东': 17,
        '王蓉': 16,
        '黄鹤': 16,
        '梦鸽': 42,
        '刘惜君': 16,
        '杨爱瑾': 16,
        '刘忻': 16,
        '薛凯琪': 16,
        '何洁': 16,
        '梁博': 15,
        '迈克尔-杰克逊': 15,
        '俞灏明': 15,
        '郭富城': 15,
        '窦唯': 15,
        '庾澄庆': 22,
        '郑爽': 18,
        '刘诗诗': 18,
        '陈若仪': 18,
        'angelababy': 18,
        '章子怡': 18,
        '陈乔恩': 18,
        '杨幂': 18,
        '宋茜': 16,
        '朴信惠': 18,
        '赵丽颖': 18,
        '张馨予': 18,
        '叶一茜': 18,
        '林心如': 18,
        '孙俪': 18,
        '倪妮': 18,
        '袁姗姗': 18,
        '尹恩惠': 18,
        '李湘': 18,
        '景甜': 18,
        '刘亦菲': 18,
        '范冰冰': 18,
        '马伊琍': 18,
        '赵奕欢': 18,
        '唐嫣': 18,
        '赵薇': 18,
        '柳岩': 18,
        '林志玲': 18,
        '谢娜': 18,
        '高圆圆': 18,
        '陈妍希': 18,
        '李宇春': 16,
        '张含韵': 16,
        '曾沛慈': 16,
        '李小璐': 18,
        '叶玉卿': 18,
        '汤唯': 18,
        '林允儿': 18,
        '郭采洁': 18,
        '武藤兰': 18,
        '林更新': 22,
        '林志颖': 15,
        '郭德纲': 17,
        '张翰': 17,
        '刘德华': 15,
        '周星驰': 17,
        '李敏镐': 17,
        '周杰伦': 15,
        '陈晓': 17,
        '文章': 17,
        '苏志燮': 17,
        '成龙': 17,
        '冯绍峰': 17,
        '林正英': 17,
        '甄子丹': 17,
        '李连杰': 17,
        '罗晋': 22,
        '张国荣': 15,
        '谢霆锋': 15,
        '吴奇隆': 15,
        '郑容和': 15,
        '陈奕迅': 15,
        '胡歌': 15,
        '黄晓明': 17,
        '钟汉良': 15,
        '张根硕': 15,
        '郭涛': 17,
        '罗志祥': 15,
        '吴京': 17,
        '周润发': 17,
        '赵本山': 17,
        '赵又廷': 17,
        '尼坤': 15,
        '林峰': 15,
        '汪东城': 22,
        '刘恺威': 17,
        '邓超': 22,
        '魏晨': 15,
        '古天乐': 22,
        '李钟硕': 22,
        '谢天华': 15,
        '张学友': 15,
        '黄渤': 17,
        '彭丽媛': 16,
        '少女时代': 16,
        '王菲': 16,
        '吉克隽逸': 16,
        '吴莫愁': 16,
        '邓丽君': 16,
        '张惠妹': 16,
        '梅艳芳': 16,
        '蔡依林': 16,
        '艾薇儿': 16,
        '梁静茹': 16,
        '那英': 16,
        '张靓颖': 16,
        '张韶涵': 16,
        '杨钰莹': 16,
        '邓紫棋': 16,
        '尚雯婕': 16,
        '丁丁': 16,
        '周笔畅': 16,
        '戚薇': 16,
        '李孝利': 16,
        '宋祖英': 16,
        '汤灿': 16,
        'by2': 16,
        '曲婉婷': 16,
        '范玮琪': 16,
        '金莎': 16,
        '刘若英': 16,
        '玖月奇迹': 16,
        '金泫雅': 16,
        '卓依婷': 16,
        '萧亚轩': 16,
        '龚琳娜': 16,
        '黄绮珊': 16,
        '泰勒斯威夫特': 16,
        '郑秀妍': 16,
        '王心凌': 16,
        '孙燕姿': 16,
        '汪峰': 15,
        '李琦': 15,
        '五月天': 15,
        '张杰': 15,
        '王力宏': 15,
        '鹿晗': 15,
        '吴亦凡': 15,
        '金贤重': 15,
        '苏有朋': 15,
        '林俊杰': 15,
        '许嵩': 15,
        '韩庚': 15,
        '黄家驹': 15,
        '萧敬腾': 15,
        'justin bieber': 15,
        '东方神起': 15,
        'beyond': 15,
        '张智霖': 15,
        '金钟国': 15,
        '朴有天': 15,
        '无印良品': 15,
        '高凌风': 15,
        '林志炫': 15,
        '陈翔': 15,
        '邱泽': 15,
        '许巍': 15 
    };
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
