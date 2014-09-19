/**
 *  ueditor完整配置项
 *  可以在这里配置整个编辑器的特性
 */

;(function () {
    var URL = "/assets/third_party/ueditor/";
    /**
     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
     */
    window.UEDITOR_CONFIG = {
        //为编辑器实例添加一个路径，这个不能被注释
        UEDITOR_HOME_URL : URL
        //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
        ,toolbars:[[ 'italic','link', 'unlink']]
        //当鼠标放在工具栏上时显示的tooltip提示
        ,labelMap:{'italic':'斜体','unlink':'取消链接','link':'超链接'}

        //不需要底部的元素tip或者字数统计的话直接取消下面两句话的注释即可
       ,elementPathEnabled:false
       ,wordCount:false
    };
})();
