

goog.provide('ad.impl.ishop.viewManager');

ad.impl.ishop.ViewManager = function(opt){

    /**
     * 保存View对象的引用
     */
    this._stack = [];
};

/**
 * 新增一个view
 * @param {ad.widget.ishop.ListView|ad.widget.ishop.PurchaseView} view
 */
ad.impl.ishop.ViewManager.prototype.add = function(view){
    var me = this;
    me._stack.push(view);
};

/**
 * 删除一个view
 */
ad.impl.ishop.ViewManager.prototype.remove = function(){
};

/**
 * 调整高度，由于app的接口已经封装了该接口，并且会自动获取页面的高度，所以只需调用app提供的接口即可
 *
 */
ad.impl.ishop.ViewManager.prototype.resize = function(){
    //TODO 调用app的接口resize
};



/**
 * 切换view的动画
 */
ad.impl.ishop.MoveEffect = function(){
    //TODO
};


ad.impl.ishop.viewManager = new ad.impl.ishop.ViewManager();
