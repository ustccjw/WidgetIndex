package baidu.dv.charts {
	
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.geom.Rectangle;
	
	/**
	 *  Chart_tips_render
	 *
	 *  @author yang_dong@baidu.com
	 */
	public class TipsRender extends Sprite {
		
		/**
		 * 构造函数
		 */
		public function TipsRender() {
			drawBG();
		}
		
		/**
		 * 绘制默认背景
		 */
		protected function drawBG():void {
			//宽高圆角
			var w:Number = 100;
			var h:Number = 100;
			var r:Number = 8;
			
			//绘制
			var gp:Graphics = this.graphics;
			gp.clear();
			gp.lineStyle(1, 0xADB9C2);
			gp.beginFill(0xD7DEE3);
			gp.drawRoundRect(0, 0, w, h, r, r);
			gp.endFill();
			
			//定义scale9
			this.scale9Grid = new Rectangle(r, r, w - r * 2, h - r * 2);
		}
		
	}
}

