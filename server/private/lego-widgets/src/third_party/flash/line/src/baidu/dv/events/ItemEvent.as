package baidu.dv.events {
	import flash.events.Event;
	
	/**
	 * DV组件中的各个item能触发的基本事件，包括鼠标over事件，鼠标out事件，鼠标click事件
	 */
	public class ItemEvent extends Event {
		
		/**
		 * item的鼠标over事件
		 */
		public static const ITEM_OVER:String = "item_over";
		
		/**
		 * item的鼠标out事件
		 */
		public static const ITEM_OUT:String = "item_out";
		
		/**
		 * item的鼠标click事件
		 */
		public static const ITEM_CLICK:String = "item_click";
		
		/**
		 * item事件的数据对象
		 * 这个item所对应的图表的索引号，例如，是第几条折线，是第几块饼图
		 */
		public var index:int;
		
		/**
		 * 事件构造函数
		 */
		public function ItemEvent(type:String, bubbles:Boolean=false, cancelable:Boolean=false) {
			super(type, bubbles, cancelable);
		}
		
		/**
		 * @private
		 * 重写toString字符串
		 */
		override public function toString():String {
			return formatToString("ItemEvent", "type", "bubbles", "cancelable");
		}
		
		/**
		 * @private
		 * 事件克隆函数
		 */
		override public function clone():Event {
			var e:ItemEvent = new ItemEvent(type, bubbles, cancelable);
			e.index = index;
			return e;
		}
	}
}