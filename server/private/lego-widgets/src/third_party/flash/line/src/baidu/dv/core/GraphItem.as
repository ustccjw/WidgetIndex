package baidu.dv.core {

	import flash.display.Shape;
	import flash.display.DisplayObject;
	
	/**
	 *  图形项基类<br/>
	 *	常见的图形项有线图和区域图中的点、柱状图的每个柱子
	 *  @author xiaokun
	 */
	public class GraphItem extends DVBase {
		
		/**
		 *	此item在所有graphItems中的索引号
		 */
		protected var _index:uint;
		
		/**
		 *	@private
		 *	当前是否被强调显示
		 */
		protected var _emphasized:Boolean = false;
		
		/**
		 *	构造函数
		 */
		public function GraphItem() {
			super();
		}
		
		/**
		 *	获取/设置此item在所有graphItems中的索引号
		 */
		public function get index():uint {
			return _index;
		}
		
		public function set index(value:uint):void {
			_index = value;
		}
		
		/**
		 *	强调显示
		 */
		public function emphasize():void {
			if (_emphasized) {
				return;
			}
			
			_emphasized = true;
			validateAll();
			doEmphasize();
		}
		
		/**
		 *	恢复正常显示
		 */
		public function normalize():void {
			if (!_emphasized) {
				return;
			}
			
			_emphasized = false;
			validateAll();
			doNormalize();
		}
		
		/**
		 *	@private
		 *	强调显示的处理，子类需覆写此方法添加具体实现
		 */
		protected function doEmphasize():void {
			
		}
		
		/**
		 *	@private
		 *	恢复正常显示的处理，子类需覆写此方法添加具体实现
		 */
		protected function doNormalize():void {
			
		}
		
	}

}