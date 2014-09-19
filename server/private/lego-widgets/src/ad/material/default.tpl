goog.require('ad.Debug');
goog.require('ad.lego');
goog.require('ad.StyleMaterial');

/*REQUIRE_REPLACE_MARK*/


/*PLUGIN_BEFORE_REPLACE_MARK*/

ad.Debug(function() {
    var id = ad.lego.getId();
    var material = new ad.StyleMaterial(id, LAYOUT, AD_CONFIG);
    material.show();

    /*PLUGIN_AFTER_REPLACE_MARK*/
});
