/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z dingguoliang01 $
 *
 **************************************************************************/


/**
 * src/ad/impl/animate/logic.js ~ 2013/09/13 15:59:32
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 10927 $
 * @description
 * logic相关的实现逻辑
 * 样式参考：animate.baidu.com/view/9636759.htm
 **/
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.animate.Dragdrop');
goog.include('ad/impl/animate/logic.less');
goog.provide('ad.impl.animate.Logic');

ad.Debug(function (async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());
    var logic = new ad.widget.animate.Dragdrop(AD_CONFIG['logic']);
    var options = logic.getData('options');
    function initDefaultLogic(logic, options) {
        var logicMap = AD_CONFIG['logic_map'];
        var emptyStr = logic.empty.join('');
        var key;
        for(var i = 0, l = options.length; i < l; i++) {
            key = emptyStr.substring(0, i) + "1" + emptyStr.substring(i + 1, l);
            if (!(key in logicMap)) {
                logicMap[key] = options[i];
            }
        }
    }
    function initResult(logic, length) {
        logic.empty = [];
        while(length > 0) {
            logic.empty.push(0);
            length--;
        }
    }
    initResult(logic, options.length);
    initDefaultLogic(logic, options);
    material.setWidgets(
        [logic]
    );
    if (async === true) {
        return material;
    }
    ad.base.jqueryReady(function() {
        logic.addListener(ui.events.DROP, function (temp, target) {
            var html = temp.find('span').html();
            html = html || "";
            var options = this.getData('options');
            var option;
            var location = -1;
            for(var index = 0; index < options.length; index++) {
                option = options[index];
                if (html === option['text']) {
                    location = index;
                    break;
                }
            }
            if(location > -1) {
                this.empty[location] = 1;
            }
            var logicMap = AD_CONFIG['logic_map'];
            var key = this.empty.join('');
            var val;
            if (key in logicMap) {
                val = logicMap[key];
            } else {
                val = logicMap['default'];
            }
            var img = target.find('img');
            img.fadeOut(function() {
                target.find('span').html(val['text']);
                img.attr('src', val['drag_img']);
            }).fadeIn(function() {
                if(logic.empty.join('').indexOf("0") === -1) {
                    target.addClass('ec-highlight');
                }
            });
        });
        logic.addListener(ui.events.REFRESH, function (dragdrop) {
            initResult(logic, options.length);
            dragdrop.dropObj.removeClass('ec-highlight');

        });
        material.show();
    });

});
