package baidu.ui.events 
{
	import flash.events.Event;
	/**
	 * ...
	 * @author zhanzhihu@baidu.com chengzhixing@baidu.com
	 */
	public class ColorPickerEvent extends Event
	{
		public static const CHANGE:String = "change";
		public static const OPEN:String = "open";
		public static const CLOSE:String = "close";
		public static const ITEM_ROLL_OVER : String = "itemRollOver";
		public static const ITEM_ROLL_OUT : String = "itemRollOut";
		
		/**
		 * 颜色。
		 */
		protected var _color:uint;
		
		public function ColorPickerEvent(type : String, color : uint) 
		{
			super(type, true);
			_color = color;
		}
		
		/**
		 * 获取 颜色。
		 */
		public function get color():uint {
			return _color;
		}
		
		/**
		 * @private
		 */
		override public function toString() : String {
			return formatToString("ColorPickerEvent", "type", "bubbles", "cancelable", "color");
		}

		/**
		 * @private
		 */
		override public function clone() : Event {
			return new ColorPickerEvent(type, color);
		}
		
	}

}