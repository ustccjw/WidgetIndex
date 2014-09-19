package baidu.dv.graphs {
	
	import flash.geom.Point;

	import baidu.dv.core.Graph;
	import baidu.dv.core.GridPlacement;
	import baidu.dv.grids.CategoryGrid;
	import baidu.dv.grids.ValueGrid;
	
	/**
	 *  基于坐标网格的图形类
	 *  @author xiaokun
	 */
	public class GridBasedGraph extends Graph {
		
		/**
		 *	@private
		 *	类目坐标网格失效
		 */
		protected static const INVALID_TYPE_CATEGORY_GRID:String = "categoryGrid";
		
		/**
		 *	@private
		 *	数值坐标网格失效
		 */
		protected static const INVALID_TYPE_VALUE_GRID:String = "valueGrid";
		
		/**
		 *	@private
		 *	类目坐标网格
		 */
		protected var _categoryGrid:CategoryGrid;
		
		/**
		 *	@private
		 *	数值坐标网格
		 */
		protected var _valueGrid:ValueGrid;
		
		public function GridBasedGraph() {
			super();
		}
		
		/**
		 *	获取/设置类目坐标网格
		 */
		public function get categoryGrid():CategoryGrid {
			return _categoryGrid;
		}
		
		public function set categoryGrid(value:CategoryGrid):void {
			if (value == _categoryGrid) {
				return;
			}
			
			_categoryGrid = value;
			invalidate(INVALID_TYPE_CATEGORY_GRID);
		}
		
		/**
		 *	获取/设置数值坐标网格
		 */
		public function get valueGrid():ValueGrid {
			return _valueGrid;
		}
		
		public function set valueGrid(value:ValueGrid):void {
			if (value == _valueGrid) {
				return;
			}

			_valueGrid = value;
			invalidate(INVALID_TYPE_VALUE_GRID);
		}
		
		/**
		 *	根据索引值获得数据点对应的位置
		 *	@param	index	<uint>索引值
		 *	@return			<Point>对应的位置
		 */
		public function getPointByIndex(index:uint):Point {
			var point:Point;
			var posCategory:Number = _categoryGrid.getPositionByIndex(index);
			var posValue:Number = _valueGrid.getPositionByValue(_data[index]);
			if (_categoryGrid.placement == GridPlacement.TOP || _categoryGrid.placement == GridPlacement.BOTTOM) {
				point = new Point(posCategory, posValue);
			} else {
				point = new Point(posValue, posCategory);
			}
			return point;
		}
	
	}

}

