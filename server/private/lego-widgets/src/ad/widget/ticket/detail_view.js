/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/ticket/detail_view.js ~ 2013/05/14 16:10:17
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 150523 $
 * @description
 * detail_view相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/ticket/detail_view.less');
goog.include('ad/widget/ticket/detail_view.html');

goog.provide('ad.widget.ticket.DetailView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ticket.DetailView = function(data) {
    ad.widget.Widget.call(this, data);


    /**
     * @type {string}
     */
    this.name = 'detail';

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_ticket_detail_view';

    /**
     * @type {Element}
     */
    this.root;
};
baidu.inherits(ad.widget.ticket.DetailView, ad.widget.Widget);

/**
 * 返回q的第一个元素
 */
ad.widget.ticket.DetailView.prototype.qq = function(className) {
    return this.q(className)[0];
};

/**
 * 自动加上ecl-ticket-detail的前缀
 * @param {string} className
 * @return {!Array} 查找不到结果时返回空数组
 */
ad.widget.ticket.DetailView.prototype.q = function(className) {
    return baidu.q('ecl-ticket-' + this.name + '-' + className, this.root);
};

/** @override */
ad.widget.ticket.DetailView.prototype.enterDocument = function() {
    var me = this;
    ad.widget.ticket.DetailView.superClass.enterDocument.call(me);

    me.root = me.getRoot();

    // 处理name的截断
    var nameDom = me.qq('name');
    if(nameDom) {
        var title = nameDom.getAttribute('title');
        title = ad.impl.weigou.util.subByte(title, 84);
        nameDom.innerHTML = baidu.string.encodeHTML(title);
    }

    // 处理演员的截断
    var actorDom = me.qq('actors');
    if(actorDom) {
        var title = actorDom.getAttribute('title');
        title = ad.impl.weigou.util.subByte(title, 40);
        actorDom.innerHTML = baidu.string.encodeHTML(title);
    }

    // 处理演出时间
    var startTimeDom = me.qq('starttime');
    if (startTimeDom) {
        var time = new Date(
            parseInt(startTimeDom.getAttribute('data-time'))
        );
        startTimeDom.innerHTML = baidu.date.format(time, 'yyyy.MM.dd');
    }
    var endTimeDom = me.qq('endtime');
    if (endTimeDom) {
        var time = new Date(
            parseInt(endTimeDom.getAttribute('data-time'))
        );
        endTimeDom.innerHTML = baidu.date.format(time, 'yyyy.MM.dd');
    }

    // 处理演出agenda
    var agendas = me.q('agenda');
    baidu.each(agendas, function(agenda) {
        // 绑定鼠标mouseover和mouseout事件
        baidu.on(agenda, 'mouseover', function() {
            baidu.dom.addClass(this, 'ecl-ticket-detail-agenda-mouseover');
        });
        baidu.on(agenda, 'mouseout', function() {
            baidu.dom.removeClass(this, 'ecl-ticket-detail-agenda-mouseover');
        });
        if(!agenda.getAttribute('data-id')) {
            return;
        }

        // 处理agenda的显示
        var date = new Date(parseInt(agenda.getAttribute('data-time')));
        var html = [
            '<span class="ecl-l">',
                baidu.date.format(date, 'MM-dd HH-mm'),
            '</span>',
            '<span class="ecl-r">',
                me.getWeekday(date),
            '</span>'
        ];

        agenda.innerHTML = html.join('');

        baidu.on(agenda, 'click', function() {
            var selected = me.qq('agenda-selected');
            if(selected) {
                baidu.dom.removeClass(selected, 'ecl-ticket-detail-agenda-selected');
            }

            baidu.dom.addClass(this, 'ecl-ticket-detail-agenda-selected');
        });
        
    });
};

/** @override */
ad.widget.ticket.DetailView.prototype.bindEvent = function() {
    ad.widget.ticket.DetailView.superClass.bindEvent.call(this);

};

/**
 * 返回周“”
 * @param {Date}
 */
ad.widget.ticket.DetailView.prototype.getWeekday = function(date) {
    var weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

    return weekdays[date.getDay() - 1];
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
