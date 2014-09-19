package baidu.dv.core {

	/**
	 *  线条样式
	 *  @author xiaokun
	 */
	public class LineStyle {
		
		/**
		 *	颜色
		 */
		public var color:uint;
		
		/**
		 *	粗细
		 */
		public var thickness:Number;
		
		/**
		 *	透明度
		 */
		public var alpha:Number;
		
		public function LineStyle(color:uint = 0x000000, thickness:Number = 1, alpha:Number = 1) {
			this.color = color;
			this.thickness = thickness;
			this.alpha = alpha;
		}
	
	}

}

