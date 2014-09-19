/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/gx_sck/ylzx/doctor_info.js ~ 2013/10/17 16:39:47
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * doctor_info相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.base');
goog.require('ad.widget.Widget');

goog.include('ad/widget/gx_sck/ylzx/doctor_info.less');
goog.include('ad/widget/gx_sck/ylzx/doctor_info.html');

goog.provide('ad.widget.gx_sck.ylzx.DoctorInfo');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.gx_sck.ylzx.DoctorInfo = function(data) {
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gx_sck_ylzx_doctor_info';

    /**
     * 阿拉丁scrollbar.
     * @type {opui_scroll_scrollbarv}
     */
    this._scrollbar = null;

    /**
     * 上次选中的科室名称.
     * @type {string}
     */
    this._lastDivision = 'all';

    /**
     * 科室信息.
     * @type {Object}
     */
    this._mapDivision = {};

    /**
     * bds.ready事件触发标志.
     * @type {boolean}
     */
    this._isBDSReady = false;

    ad.widget.Widget.call(this, data);
};
baidu.inherits(ad.widget.gx_sck.ylzx.DoctorInfo, ad.widget.Widget);

/** @override */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype.patchData = function() {
    if (this._data) {
        this._data['is_ipad'] = ad.env.isIpad;
        var doctors = this.getData('doctors');
        if (doctors && doctors.length) {
            //设置表格高度
            var height = this._getTableHeight(doctors.length);
            this._data['doctor_list_height'] = height;
            if (height !== 'auto') {
                this._data['doctor_list_container_height'] = (parseInt(height, 10) - 1) + 'px';
            } else {
                this._data['doctor_list_container_height'] = height;
            }

            for (var i = 0; i < doctors.length; i++) {
                this._mapDivision[doctors[i]['division']] = null;

                var fee = this._data['doctors'][i]['fee'];
                if (fee !== 0) {
                    fee += '元';
                } else {
                    fee = '免费';
                }
                this._data['doctors'][i]['fee'] = fee;
            }
            this._data['divisions'] = baidu.object.keys(this._mapDivision); //获取科室信息

            //设置“更多”按钮的可见性
            this._data['is_show_more'] = this._isShowMore();
        } else {
            this._data['is_show_more'] = 'none';
        }

        if (this._data['ps_select']) {
            var title = (this._data['ps_select']['title']) ? this._data['ps_select']['title'] : this._data['title'];
            title = title.replace(/<em>|<\/em>/g, '');
            var url = (this._data['ps_select']['site']) ? this._data['ps_select']['site'] : this._data['site'];
            url = /^https?:\/\//.test(url) ? url : 'http://' + url;
            var data = {
                // title中会包含&quot;等字符，需要decode
                'title': baidu.decodeHTML(title),
                'url': url
            };
            this._data['ps_select']['data'] = baidu.json.stringify(data);
        }
    }

    if (this._data.hasOwnProperty('sign')) {
        this._data['ps_vsign'] = true;
    }
};

/** @override */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype.enterDocument = function() {
    ad.widget.gx_sck.ylzx.DoctorInfo.superClass.enterDocument.call(this);

    this._nav = baidu.g(this.getId('nav'));
    this._more = baidu.g(this.getId('more'));
    this._division = baidu.g(this.getId('division'));
    this._list = baidu.g(this.getId('list'));
    this._doctorList = baidu.g(this.getId('doctor-list'));
    this._doctorListContainer = baidu.g(this.getId('doctor-list-container'));

    var arrDivision = this.getData('divisions');
    if (arrDivision && arrDivision.length) {
        this._rows = baidu.dom.children(baidu.dom.children(this._list)[0]); //缓存表格行
        //初始化阿拉丁滚动条
        this._setScrollBar();
        this._mapDivision['all'] = baidu.dom.first(this._nav);
    }

};

/** @override */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype.bindEvent = function() {
    ad.widget.gx_sck.ylzx.DoctorInfo.superClass.bindEvent.call(this);

    var me = this;

    //处理bds.ready
    var bdsReady = ad.base.getObjectByName('bds.ready');
    if (typeof bdsReady === 'function') {
        bdsReady(function() {
            me._isBDSReady = true;
            //初始化阿拉丁滚动条
            me._setScrollBar();
        });
    }

    ad.dom.on(me._nav, 'click', function(e) {
        var oTarget = baidu.event.getTarget(e || window.event);
        if (oTarget.nodeType === 1 && oTarget.nodeName.toLowerCase() === 'li') {
            var division = baidu.getAttr(oTarget, 'data-division');
            if (!me._mapDivision[division]) {
                me._mapDivision[division] = oTarget;
            }
            me._selDivision(division);
        }
    });

    //"更多"
    ad.dom.on(me._more, 'click', function() {
        me._moreDivision();
    });

    //v标
    if (this._data['ps_vsign']) {
        var bdsReady = ad.base.getObjectByName('bds.ready');
        if ('function' === typeof bdsReady) {
            bdsReady(function() {
                //创建dom
                var trustDom = baidu.g(me.getId('c-trust'));
                trustDom.innerHTML = '<span class="c-trust" data_key="' + me._data['sign'] + '"></span>';
                var trustObj = ad.base.getObjectByName('bds.se.trust');
                if(trustObj && 'function' === typeof trustObj['init']) {
                    trustObj['init']();
                }
            });
        }
    }
};



/** 
 * 初始化阿拉丁滚动条
 */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype._setScrollBar = function() {
    if (this._scrollbar) {
        return;
    }
    var me = this;
    //在投放和具有大搜环境的调试环境使用大搜的阿拉丁滚动条
    if (typeof(A) !== 'undefined' && A.use) {
        A.use('baidu', function() {
            A.use('scrollbarv', function() {
                if (me._scrollbar) {
                    return;
                }
                me._scrollbar = A.ui.scrollbarv({
                    'content': me._doctorList
                });
            });
        });
    } else {
        baidu.page.loadCssFile(RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/f21d6f3e168c1f1b3b45e4ff5012d7fc.css');
        baidu.sio.callByBrowser(RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/b2416b37b50a0ed76302f26fe313b45c.js', function() {
            if (me._scrollbar) {
                return;
            }
            me._scrollbar = A.ui.scrollbarv({
                'content': me._doctorList
            });
        });
    }
};

/** 
 * 展开/收起 “更多” 按钮
 */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype._moreDivision = function() {
    var divisionListHeight = this._nav.offsetHeight;
    var className = this._more.className;
    if (className.indexOf('ec-doctor-division-more-expand') >= 0) {
        this._more.className = 'ec-doctor-division-more';
        this._division.style.height = '25px';
    } else {
        this._more.className = 'ec-doctor-division-more ec-doctor-division-more-expand';
        this._division.style.height = divisionListHeight + 'px';
    }
};

/** 
 * 清空表格
 */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype._clearTable = function() {
    baidu.dom.empty(baidu.dom.first(this._list));
};

/** 
 * 根据科室名获取表格行对象
 * @param {string} division 科室名
 * @return {Array} rows 对应科室的表格行
 */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype._getRowsByDivision = function(division) {
    if (division === 'all') {
        return this._rows;
    } else {
        var rows = [];
        var doctorList = this.getData('doctors');
        for (var i = 0; i < doctorList.length; i++) {
            if (doctorList[i]['division'] === division) {
                rows.push(this._rows[i]);
            }
        }
        return rows;
    }
};

/** 
 * 根据医生个数计算表格的高度以实现自适应
 * @param {number} count 医生个数
 */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype._getTableHeight = function(count) {
    if (count > 5) {
        return '165px';
    } else {
        return 'auto';
    }
};

/** 
 * 根据医生个数调整dom高度已实现自适应：>5行出滚动条 <=5行自适应
 * @param {number} rowCount 表格行数
 */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype._fixHeight = function(rowCount) {
    if (rowCount > 5) {
        this._doctorListContainer.style.height = (parseInt(this._getTableHeight(rowCount), 10) - 1) + 'px';
        this._doctorList.style.height = this._getTableHeight(rowCount);
    } else {
        this._doctorListContainer.style.height = this._getTableHeight(rowCount);
        this._doctorList.style.height = this._getTableHeight(rowCount);
    }
};

/** 
 * 重绘表格
 * @param {string} division 对应的科室名称
 */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype._reBindTable = function(division) {
    this._clearTable();
    var oFragment = document.createDocumentFragment();
    var rows = this._getRowsByDivision(division);
    this._fixHeight(rows.length);
    for (var i = 0; i < rows.length; i++) {
        oFragment.appendChild(rows[i]);
    }
    baidu.dom.first(this._list).appendChild(oFragment);
};

/** 
 * 设置tab样式
 * @param {string} division 科室名称
 */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype._setTabStyle = function(division) {
    this._mapDivision[this._lastDivision].className = 'ec-doctor-division-tab-nav-li';
    this._mapDivision[division].className = 'ec-doctor-division-tab-nav-li ec-doctor-division-tab-nav-li-selected';
};

/** 
 * 选择某个科室
 * @param {string} division 科室名称
 */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype._selDivision = function(division) {
    if (division === this._lastDivision) {
        return;
    }
    this._setTabStyle(division);
    this._reBindTable(division); //重新绘制表格
    if (this._scrollbar) {
        this._scrollbar.render(); //重绘阿拉丁滚动条
    }
    this._lastDivision = division;
};

/** 
 * 是否需要显示“更多”按钮：逻辑是当选择科室不超过1行时显示，只有1行就不显示
 * @return {string} 'block' | 'none'
 */
ad.widget.gx_sck.ylzx.DoctorInfo.prototype._isShowMore = function() {
    var arrDivision = this.getData('divisions');
    if (arrDivision && arrDivision.length) {
        var txtLen = 2 * 2 + baidu.string.getByteLength(arrDivision.join(''));
        var divisionCount = arrDivision.length;
        if (txtLen * 6 + (5 + 5 + 10) * divisionCount > 376) {
            return 'block';
        } else {
            return 'none';
        }
    } else {
        return 'none';
    }
};





























/* vim: set ts=4 sw=4 sts=4 tw=100: */
