package baidu.dv.grids {
	
	import baidu.dv.grids.CategoryGrid;
	import baidu.dv.core.LineStyle;
	import baidu.dv.core.GridPlacement;
	
	import flash.display.Shape;
	import flash.display.Graphics;
	

	/**
	 *  3D类目坐标网格
	 *  @author yang_dong@baidu.com
	 */
	public class CategoryGrid3D extends CategoryGrid {
		
		/**
		 *	构造函数
		 */
		public function CategoryGrid3D() {
			super();
		}
		
		/**
		 *	@private
		 *	绘制坐标轴
		 */
		override protected function drawAxisLine():void {
			if (_axisLineLayer == null) {
				_axisLineLayer = new Shape();
				addChildAt(_axisLineLayer, 0);
			}
			var gp:Graphics = _axisLineLayer.graphics;
			gp.clear();
			
			var style:LineStyle = _styles["axisLineStyle"];
			gp.lineStyle(style.thickness, style.color, style.alpha);
			switch (_placement) {
				case GridPlacement.BOTTOM :
					gp.moveTo(0, _height);
					gp.lineTo(_width, _height);
					break;
				case GridPlacement.LEFT :
					gp.moveTo(0, 0);
					gp.lineTo(0, _height);
					break;
				case GridPlacement.RIGHT :
					gp.moveTo(_width, 0);
					gp.lineTo(_width, _height);
					break;
				case GridPlacement.TOP :
					gp.moveTo(0, 0);
					gp.lineTo(_width, 0);
					break;
			}
		}
	
	}

}