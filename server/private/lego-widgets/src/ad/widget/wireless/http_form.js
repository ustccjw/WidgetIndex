/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: http_form.js 13834 2012-11-03 06:31:22Z $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/http_form.js ~ 2014/01/16 12:07:55
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 13834 $
 * @description
 * http接口表单
 **/
goog.require('ad.string');
goog.require('ad.widget.wireless.Form');

goog.provide('ad.widget.wireless.HttpForm');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.HttpForm = function(data) {
    ad.widget.wireless.Form.call(this, data);
};
baidu.inherits(ad.widget.wireless.HttpForm, ad.widget.wireless.Form);

/**
 * @override
 */
ad.widget.wireless.Form.prototype.patchData = function() {
    if(this._data && this._data['form_action_url']){
        this._data['form_plid'] = this._data['form_action_url'];
    }
};

/**
 * @override
 */
ad.widget.wireless.HttpForm.prototype.sendFormData = function() {
    var me = this;
    var url = ad.string.trim(baidu.g(me.getId('form-plid')).value);
    var params = 'name=' + encodeURIComponent(ad.string.trim(baidu.g(me.getId('name')).value)) +
                 '&mobile=' + encodeURIComponent(ad.string.trim(baidu.g(me.getId('mobile')).value));

    if(/\?/.test(url)) {
        params = '&' + params;
    } else {
        params = '?' + params;
    }
    var url = url + params + '&r=' + new Date().valueOf();
    baidu.sio.log(url);
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
