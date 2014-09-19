//ui跟编辑器的适配層
//那个按钮弹出是dialog，是下拉筐等都是在这个js中配置
//自己写的ui也要在这里配置，放到baidu.editor.ui下边，当编辑器实例化的时候会根据editor_config中的toolbars找到相应的进行实例化
(function () {
    var utils = baidu.editor.utils,
        editorui = baidu.editor.ui,
        iframeUrlMap = {
            'link':'~/dialogs/link/link.html'
        };

    var btnCmds = ['italic', 'unlink'];
    for ( var i = 0, ci; ci = btnCmds[i++]; ) {
        ci = ci.toLowerCase();
        editorui[ci] = function ( cmd ) {
            return function ( editor, title ) {
                var ui = new editorui.Button( {
                    className:'edui-for-' + cmd,
                    title:title || editor.options.labelMap[cmd] || '',
                    onclick:function () {
                        editor.execCommand( cmd );
                    },
                    showText:false
                } );
                editor.addListener( 'selectionchange', function ( type, causeByUi, uiReady ) {
                    var state = editor.queryCommandState( cmd );
                    if ( state == -1 ) {
                        ui.setDisabled( true );
                        ui.setChecked( false );
                    } else {
                        if ( !uiReady ) {
                            ui.setDisabled( false );
                            ui.setChecked( state );
                        }
                    }
                } );
                return ui;
            };
        }( ci );
    }
    var dialogBtns = {
        noOk:[],
        ok:['link']

    };

    for ( var p in dialogBtns ) {
        (function ( type, vals ) {
            for ( var i = 0, ci; ci = vals[i++]; ) {
                (function ( cmd ) {
                    editorui[cmd] = function ( editor, iframeUrl, title ) {
                        iframeUrl = iframeUrl || (editor.options.iframeUrlMap || {})[cmd] || iframeUrlMap[cmd];
                        title = title || editor.options.labelMap[cmd.toLowerCase()] || '';
                        //没有iframeUrl不创建dialog
                        if ( !iframeUrl ) {
                            return;
                        }
                        var dialog = new editorui.Dialog( utils.extend( {
                            iframeUrl:editor.ui.mapUrl( iframeUrl ),
                            editor:editor,
                            className:'edui-for-' + cmd,
                            title:title
                        }, type == 'ok' ? {
                            buttons:[
                                {
                                    className:'edui-okbutton',
                                    label:'确认',
                                    onclick:function () {
                                        dialog.close( true );
                                    }
                                },
                                {
                                    className:'edui-cancelbutton',
                                    label:'取消',
                                    onclick:function () {
                                        dialog.close( false );
                                    }
                                }
                            ]
                        } : {} ) );

                        editor.ui._dialogs[cmd + "Dialog"] = dialog;
                        var ui = new editorui.Button( {
                            className:'edui-for-' + cmd,
                            title:title,
                            onclick:function () {
                                dialog.render();
                                editor.fireEvent( cmd + "Clicked", dialog );
                            }
                        } );
                        editor.addListener( 'selectionchange', function () {
                            //只存在于右键菜单而无工具栏按钮的ui不需要检测状态
                            var unNeedCheckState = {'edittd':1, 'edittable':1};
                            if ( cmd in unNeedCheckState )return;
                            var state = editor.queryCommandState( cmd );
                            ui.setDisabled( state == -1 );
                            ui.setChecked( state );
                        } );
                        return ui;
                    };
                })( ci.toLowerCase() )
            }
        })( p, dialogBtns[p] )
    }

})();
