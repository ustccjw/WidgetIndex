package baidu.dv.charts {
	
	import baidu.dv.charts.GridBasedChart;
	import baidu.dv.core.GridPlacement;
	
	/**
	 *  BarChart
	 *
	 *  @author yang_dong@baidu.com
	 */
	public class LineChart extends GridBasedChart {
		
		public function LineChart() {
			super();
		}
		
		/**
		 *	@private
		 */
		override public function set data(value:*):void {
			
			super.data = value;
			
			//如果默认的数据中含有label data这两个字段，默认作为折线图添加
			var d:Object = _data[0];
			if(d.hasOwnProperty(CATEGORY_FIELD) && d.hasOwnProperty(VALUE_FIELD)) {
				addLineGraph(VALUE_FIELD, CATEGORY_FIELD, GridPlacement.BOTTOM, GridPlacement.LEFT);
			}
		}
		
	}
}

