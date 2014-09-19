package baidu.dv.graphs {
	
	import flash.display.Graphics;

	import baidu.dv.core.GraphItem;
	import baidu.dv.core.LineStyle;
	
	/**
	 * 填充颜色
	 */
	[Style(name="fillColor", type="uint")]
	
	/**
	 * 填充透明度
	 */
	[Style(name="fillAlpha", type="Number")]
	
	/**
	 * 边框样式
	 */
	[Style(name="borderStyle", type="baidu.dv.core.LineStyle")]
	
	
	/**
	 * 强调显示时的填充颜色
	 */
	[Style(name="emphasizedFillColor", type="uint")]
	
	/**
	 * 强调显示时的填充透明度
	 */
	[Style(name="emphasizedFillAlpha", type="Number")]
	
	/**
	 * 强调显示时的边框样式
	 */
	[Style(name="emphasizedBorderStyle", type="baidu.dv.core.LineStyle")]
	
	
	/**
	 *  柱状图形项
	 *  @author xiaokun
	 */
	public class BarItem extends GraphItem {
		
		/**
		 *	构造函数
		 */
		public function BarItem() {
			super();
			
			//因为BarItem可以不用设置任何参数即使用，所以这里设置一下失效
			invalidate("all");
		}

		/**
		 *  @private
		 */
		override protected function initStyle():void {	
			_styles["fillColor"] = 0x666666;
			_styles["fillAlpha"] = 1;
			_styles["emphasizedFillColor"] = 0x666666;
			_styles["emphasizedFillAlpha"] = 1;
		}
		
		/**
		 *	@private
		 */
		override protected function applyChanges():void {	
			draw();
		}

		/**
		 *	@private
		 */
		override protected function doEmphasize():void {
			draw();
		}

		/**
		 *	@private
		 */
		override protected function doNormalize():void {
			draw();
		}
		
		/**
		 *	@private
		 *	绘图
		 */
		protected function draw():void {
			graphics.clear();
			if (_emphasized) {
				var emphasizedStyle:LineStyle = _styles["emphasizedBorderStyle"];
				if (emphasizedStyle) {
					graphics.lineStyle(emphasizedStyle.thickness, emphasizedStyle.color, emphasizedStyle.alpha);
				} else {
					graphics.lineStyle();
				}
				graphics.beginFill(_styles["emphasizedFillColor"], _styles["emphasizedFillAlpha"]);
				graphics.drawRect(0, 0, _width, _height);
			} else {
				var style:LineStyle = _styles["borderStyle"];
				if (style) {
					graphics.lineStyle(style.thickness, style.color, style.alpha);
				} else {
					graphics.lineStyle();
				}
				graphics.beginFill(_styles["fillColor"], _styles["fillAlpha"]);
				graphics.drawRect(0, 0, _width, _height);
			}
			graphics.endFill();
		}
		
	}

}

