/**
 * @author chenjiawei01@baidu.com
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.bzt.ImageAld');

goog.include('ad/impl/image/ald2.less');

goog.provide('ad.impl.image.Ald2');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var imageAld = new ad.widget.bzt.ImageAld(AD_CONFIG);
    var widgets = [
        imageAld
    ];
    material.setWidgets(widgets);

    if (async === true) {
        return material;
    }
    material.show();


    return material;
});

