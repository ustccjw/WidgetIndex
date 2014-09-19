/**
 * 开发版本的文件导入
 */
(function () {
    var paths = [
                'editor.js',
                'core/browser.js',
                'core/utils.js',
                'core/EventBase.js',
                'core/dom/dtd.js',
                'core/dom/domUtils.js',
                'core/dom/Range.js',
                'core/dom/Selection.js',
                'core/Editor.js',
                'core/ajax.js',
                'plugins/inserthtml.js',
                'plugins/_link.js',
                'plugins/selectall.js',
                'plugins/delete.js',
                'plugins/wordcount.js',
                'plugins/undo.js',
                'plugins/paste.js', //粘贴时候的提示依赖了UI
                'plugins/shortcutkeys.js',
                'plugins/enterkey.js',
                'plugins/keystrokes.js',
                'plugins/fiximgclick.js',
                'plugins/autolink.js',
                'plugins/autoheight.js',
                'plugins/serialize.js',
                'plugins/basestyle.js',
                'plugins/elementpath.js',
                'ui/ui.js',
                'ui/uiutils.js',
                'ui/uibase.js',
                'ui/mask.js',
                'ui/popup.js',
                'ui/stateful.js',
                'ui/button.js',
                'ui/toolbar.js',
                'ui/dialog.js',
                'ui/_editorui.js',
                'ui/_editor.js'
            ],
            baseURL = '_src/';
    for ( var i = 0, pi; pi = paths[i++]; ) {
        document.write( '<script type="text/javascript" src="' + baseURL + pi + '"></script>' );
    }
})();
