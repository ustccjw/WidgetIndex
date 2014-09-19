package baidu.fw.fixer {
	
	import flash.display.InteractiveObject;
    import flash.display.Stage;
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.external.ExternalInterface;

    /**
     * 用于校正flash鼠标滚动和页面鼠标滚动的冲突。
     * <p>使用方法：MouseWheelFixer.apply(stage);</p>
     * @author as4game@gmail.com
	 * 
	 * 基于as4game的用于stage的全局设置，改为某个元素的设置
	 * <p>不再使用apply设置，cancel取消；改为register设置，unregister取消</p>
	 * <p>MouseWheel.register(displayObject);MouseWheel.unregister(displayObject);MouseWheel.unregisterAll();</p>
	 * @version	2010/01/10
	 * @author	yang_dong@baidu.com
     */
    public class MouseWheelFixer {
		
		private static const PRE_FUNC:String = "HANDLER_";				//函数名称不能以数字开头...

        private static var _mouseInObject:Boolean = false;
        private static var _mouseWheelEnabled:Boolean = true;
		private static var _triggers:Array = [];
		private static var _handlers:Array = [];
		
		private static var _activeTrigger:InteractiveObject = null;
		
        /**
         * 为某个可显示元素注册鼠标滚轮禁用事件
         * @param trigger 触发器。InteractiveObject对象。
		 * @param handler 处理函数。Function对象
         */
        public static function register(trigger:InteractiveObject = null, handler:Function = null):void {
            if (trigger) {
				if (_triggers.indexOf(trigger) == -1) {
					_triggers.push(trigger);
					var handlerID:String = PRE_FUNC + (new Date()).time + "" + Math.floor(Math.random() * _triggers.length);
					if (handler == null) {
						handlerID = PRE_FUNC;
					}
					_handlers.push(handlerID);
					
					var evtTypeIn:String = (trigger is Stage)?(MouseEvent.MOUSE_MOVE):(MouseEvent.ROLL_OVER);
					var evtTypeOut:String = (trigger is Stage)?(Event.MOUSE_LEAVE):(MouseEvent.ROLL_OUT);
					trigger.addEventListener(evtTypeIn, handleMouseIn);
					trigger.addEventListener(evtTypeOut, handleMouseOut);
					
					ExternalInterface.addCallback(handlerID, handler);
				}
            }
        }
		
        /**
         *  为某个可显示元素取消鼠标滚轮禁用事件
         * @param trigger 触发器。InteractiveObject对象。
         */
        public static function unregister(trigger:InteractiveObject = null, handler:Function = null):void {
            if (trigger) {
				var index:int = _triggers.indexOf(trigger);
				if (index != -1) {
					_triggers.splice(index, 1);
					_handlers.splice(index, 1);
					
					var evtTypeIn:String = (trigger is Stage)?(MouseEvent.MOUSE_MOVE):(MouseEvent.ROLL_OVER);
					var evtTypeOut:String = (trigger is Stage)?(Event.MOUSE_LEAVE):(MouseEvent.ROLL_OUT);
					trigger.removeEventListener(evtTypeIn, handleMouseIn);
					trigger.removeEventListener(evtTypeOut, handleMouseOut);
					
					mouseWheelEnabled = true;
				}
			}else {
				unregisterAll();
			}
        }
		
		/**
         *  为所有可显示元素取消鼠标滚轮禁用事件
         */
        public static function unregisterAll(trigger:InteractiveObject = null):void {
            for (var i = 0, iLen = _triggers.length; i < iLen; i++ ) {
				var trigger:InteractiveObject = _triggers[i] as InteractiveObject;
				var evtTypeIn:String = (trigger is Stage)?(MouseEvent.MOUSE_MOVE):(MouseEvent.ROLL_OVER);
				var evtTypeOut:String = (trigger is Stage)?(Event.MOUSE_LEAVE):(MouseEvent.ROLL_OUT);
				trigger.removeEventListener(evtTypeIn, handleMouseIn);
				trigger.removeEventListener(evtTypeOut, handleMouseOut);
			}
			_triggers = [];
			 mouseWheelEnabled = true;
        }
		
		/**
		 * 处理鼠标移入事件
		 */
        private static function handleMouseIn(e:Event):void {
            if (!_mouseInObject) {
				_activeTrigger = e.target as InteractiveObject;
                _mouseInObject = true;
                mouseWheelEnabled = false;
            }
        }
		
		/**
		 * 处理鼠标移出事件
		 */
        private static function handleMouseOut(e:Event):void {
            if(_mouseInObject) {
                _mouseInObject = false;
                mouseWheelEnabled = true;
            }
        }
		
        /**
         * 获取/设置 window 的鼠标滚动是否可用，用此属性可用启用或者禁用 window 对鼠标滚轮的响应。
         */
        public static function set mouseWheelEnabled(value:Boolean):void {
            _mouseWheelEnabled = value;
			
			var jsCode:Array = [];
            if (!_mouseWheelEnabled) {
				var flashID:String = ExternalInterface.objectID;
				var flashHandlerID:String = _handlers[_triggers.indexOf(_activeTrigger)];
				jsCode = [];
				jsCode.push("var _onFlashMousewheel = function(e){");
				jsCode.push("e = e || event;e.preventDefault && e.preventDefault();e.stopPropagation && e.stopPropagation();");
				
				if (flashHandlerID != PRE_FUNC) {
					//监听了鼠标处理函数
					jsCode.push("var delta = e.wheelDelta || e.detail;")
					jsCode.push("baidu.swf.getMovie('" + flashID + "')." + flashHandlerID + "(delta);");
				}
				
				jsCode.push("return e.returnValue = false;};");
				jsCode.push("if(window.addEventListener)");
				jsCode.push("{var type = (document.getBoxObjectFor)?'DOMMouseScroll':'mousewheel';");
				jsCode.push("window.addEventListener(type, _onFlashMousewheel, false);}");
				jsCode.push("else{document.onmousewheel = _onFlashMousewheel;}");
				ExternalInterface.call("eval", jsCode.join(""));
            }else {
				jsCode = [];
				jsCode.push("if(window.removeEventListener){");
				jsCode.push("var type = (document.getBoxObjectFor)?'DOMMouseScroll':'mousewheel';");
				jsCode.push("window.removeEventListener(type, _onFlashMousewheel, false);}");
				jsCode.push("else{document.onmousewheel = null;}");
                ExternalInterface.call("eval", jsCode.join(""));
            }
        }
        public static function get mouseWheelEnabled():Boolean {
            return _mouseWheelEnabled;
        }
		
    }
}
