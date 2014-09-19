/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/impl/lego/image_powerlink_roller.js ~ 2013/06/18 15:56:24
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 11222 $
 * @description
 * image_powerlink_roller相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');
goog.require('ad.widget.Slider');
goog.require('ad.widget.ImageGrid');
goog.require('ad.widget.ImageTopBackground');
goog.include('ad/impl/lego/image_powerlink_roller2.less');
goog.provide('ad.impl.lego.ImagePowerlinkRoller2');

ad.Debug(function (async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());
    if ("javascript:void(0);" === AD_CONFIG['image']['image_rcv_url']) {
        delete AD_CONFIG['image']['image_rcv_url'];
    }
    var slider = new ad.widget.Slider(AD_CONFIG['slider']),
        imageGrid = new ad.widget.ImageGrid(AD_CONFIG['image_grid']),
        image = new ad.widget.Image(AD_CONFIG['image']),
        bg = new ad.widget.ImageTopBackground(AD_CONFIG['background']);
    material.setWidgets(
        [slider, imageGrid, image, bg]
    );
    if (async === true) {
        return material;
    }
    material.show();
    var root = material.getRoot(),
        copyDiv = document.createElement('div');
    copyDiv.className = 'ec-copy';
    copyDiv.innerHTML = AD_CONFIG['copy'];
    root.appendChild(copyDiv);
    if (slider._btns.length > 1) {
        slider.next = function() {
            var index = this._getNextBtnIndex();
            this._changeBtn(index);
            this._changeImg(index);
        }
        slider.previous = function() {
            var index = this._lastCurBtnIndex - 1;
            index = index < 1 ? this._btns.length : index;
            this._changeBtn(index);
            this._changeImg(index);
        }
        var sliderRoot = slider.getRoot().children[0];
        baidu.on(sliderRoot, 'click', function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.nodeType === 1 && target.nodeName === 'IMG') {
                target = target.parentNode;
                if ('ec-left ec-arrow' === target.className) {
                    slider.previous();
                } else if ('ec-right ec-arrow' === target.className) {
                    slider.next();
                }
            }
        });
        function patchArrow(className, src) {
            var img = document.createElement('img'),
                a = document.createElement('a');
            img.src = src;
            a.appendChild(img);
            a.className = className;
            sliderRoot.appendChild(a);
        }
        patchArrow('ec-left ec-arrow', RT_CONFIG.HOST("ecma.bdimg.com") + "/adtest/4369990dede078dbde8295f160cdaa0b.png");
        patchArrow('ec-right ec-arrow', RT_CONFIG.HOST("ecma.bdimg.com") + "/adtest/dfd5c189ced4db767a838003b9ce8902.png");
    }
});

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
