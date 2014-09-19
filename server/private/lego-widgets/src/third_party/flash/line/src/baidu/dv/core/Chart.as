package baidu.dv.core {
	
	import flash.display.Sprite;
	
	/**
	 *  图表类，没有具体的内容，只是一个容器
	 *  @author xiaokun
	 *  @author yang_dong@baidu.com
	 */
	public class Chart extends DVBase {
		
		/**
		 *	@private
		 *	类目显示tips失效
		 */
		protected static const INVALID_TYPE_SHOWDATATIPS:String = "showDataTips";
		
		/**
		 *	@private
		 *	所有图形，索引是每个图形对应的数据字段名
		 */
		protected var _graphsHash:Object = {};
		
		/**
		 * @private
		 * 鼠标交互tips
		 */
		protected var _tips:Sprite;
		
		/**
		 * @private
		 * 是否在鼠标交互时显示tips
		 */
		protected var _showDataTips:Boolean = true;
		
		/**
		 * @private
		 * 鼠标交互显示的tips render
		 */
		protected var _tipsRender:Class;
		
		/**
		 *	构造函数
		 */
		public function Chart() {
			super();
			
			//提供默认的宽高
			_width = 500;
			_height = 300;
		}
		
		/**
		 * 设置/获取是否在鼠标交互时显示tips
		 */
		public function set showDataTips(value:Boolean):void {
			_showDataTips = value;
			
			invalidate(INVALID_TYPE_SHOWDATATIPS);
		}
		
		/**
		 * 设置/获取是否在鼠标交互时显示tips
		 */
		public function get showDataTips():Boolean {
			return _showDataTips;
		}
		
		/**
		 * 设置/获取鼠标交互显示的tips render
		 */
		public function set tipsRender(value:Class):void {
			if(value) {
				_tipsRender = value;
			}
		}
		
		/**
		 * 设置/获取鼠标交互显示的tips render
		 */
		public function get tipsRender():Class {
			return _tipsRender;
		}
		
		/**
		 *  @private
		 */
		override public function set width(value:Number):void {
			super.width = value;
			
			for (var dataField:String in _graphsHash) {
				_graphsHash[dataField].width = value;
			}
		}

		/**
		 *  @private
		 */
		override public function set height(value:Number):void {
			super.height = value;
			
			for (var dataField:String in _graphsHash) {
				_graphsHash[dataField].height = value;
			}
		}

		/**
		 *	@private
		 */
		override public function set data(value:*):void {
			if (!(value is Array)) {
				return;
			}
			
			super.data = value;
			
			for (var dataField:String in _graphsHash) {
				_graphsHash[dataField].data = getDataOfField(dataField);
			}
		}

		/**
		 *	添加一个图形
		 *	@param	graph		<Graph>要添加的一个图形
		 *	@param	dataField	<String>图形对应的数据字段名
		 */
		public function addGraph(graph:Graph, dataField:String):void {
			_graphsHash[dataField] = graph;
			
			graph.width = _width;
			graph.height = _height;
			if (_data) {
				graph.data = getDataOfField(dataField);
			}
			
			addChild(graph);
		}

		/**
		 *	根据数据字段名获得对应图形的引用
		 *	@param	dataField	<String>数据字段名
		 */
		public function getGraphByDataField(dataField:String):Graph {
			return _graphsHash[dataField];
		}

		/**
		 *	删除一个图形
		 *	@param	graph		<Graph>要删除的一个图形
		 */
		public function removeGraph(graph:Graph):void {
			for (var dataField:String in _graphsHash) {
				if (_graphsHash[dataField] == graph) {
					if (this.contains(graph)) {
						this.removeChild(graph);
					}
					delete _graphsHash[dataField];
					return;
				}
			}
		}

		/**
		 *	根据数据字段来删除对应的图形
		 *	@param	dataField	<String>数据字段名
		 */
		public function removeGraphByDataField(dataField:String):void {
			for (var field:String in _graphsHash) {
				if (field == dataField) {
					var graph:Graph = _graphsHash[field];
					if (this.contains(graph)) {
						this.removeChild(graph);
					}
					delete _graphsHash[field];
					return;
				}
			}
		}
		
		/**
		 *	获得某一个字段的所有数据
		 *	@param	dataField	<String>数据字段名
		 *	@return				<Array>原始数据指定字段的所有值
		 */
		public function getDataOfField(dataField:String):Array {
			if (_data == null) {
				return null;
			}
			
			var data:Array = [];
			for each (var record:Object in _data) {
				data.push(record[dataField]);
			}
			return data;
		}
	}

}

