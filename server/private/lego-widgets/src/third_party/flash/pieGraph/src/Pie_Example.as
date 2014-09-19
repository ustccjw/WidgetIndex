package {
	import flash.system.System;
	import flash.external.ExternalInterface;
	
	import baidu.dv.core.GraphItem;
	import baidu.dv.core.GradientStyle;
	import baidu.dv.core.LineStyle;
	import baidu.ui.controls.Tooltip;
	import flash.display.Sprite;
	import baidu.dv.graphs.PieGraph;
	import baidu.dv.graphs.PieItem;
	import baidu.dv.graphs.PieItem3D;
	import baidu.dv.events.ItemEvent;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.text.TextFormat;
	import ToolTips;
	/**
	 * Pie常用使用样例Example<br>
	 * 包括：PieItem2D	PieItem3D
	 * @author	yang_dong
	 */
	public class Pie_Example extends Sprite {
		
		private var xl:XmlLoader;
		//private const DATA = [5, 5, 5, 5, 20, 20, 20, 5, 5, 10];
		//private const LABELS = ["5%", "未央国", "乌托邦", "天堂", "地域", "", "Matrix", "中国", "未央国", "乌托邦", "天堂", "地域", "", "Matrix"];
		private const COLORS = [0x56c0d1, 0x2c73c6, 0xf2de45, 0xf6a023, 0x9bc646, 0x388b2f, 0xf2de45, 0x8800d1, 0x2c73c6, 0xf2de45, 0xf6a023, 0x9bc646, 0x388b2f, 0xf2de45, 0x388b2f, 0xf2de45];
		private var DATA:Array = new Array();
		private var LABELS:Array = new Array();
		//private const COLORS:Array=new Array();
		
		private var ComDataArr:Array;            //原始cdata文件加载下来的数组
		private var ComData:CommodityData;
		private var _tool:ToolTips;
		private var index:int ;
		/**
		 * Pie_Example使用用例
		 */
		public function Pie_Example() {
		    stage.showDefaultContextMenu = false;
			stage.scaleMode = "noScale";
			stage.align = "TL";
			System.useCodePage = true;
			this.addEventListener(Event.ENTER_FRAME, selfLoad);
		}
		
		/**
		 * 确保自身加载
		 * @param	evt
		 */
		private function selfLoad(evt:Event):void {
			if (stage.stageWidth > 0 && stage.stageHeight > 0) {
				this.removeEventListener(Event.ENTER_FRAME, selfLoad);
				
			    try {
					var id:String = this.loaderInfo.parameters["id"];
					var str:String = this.loaderInfo.parameters["js"]+'onLoad';
					ExternalInterface.addCallback("getXmlData", parseXmlData);
					if (id != " ") {
						ExternalInterface.call(str,id);
					}
					
			    }catch (e:Error) { }
               //------测试的数据--------------------
               //init('<?xml version="1.0" encoding="utf-8" ?> <rootd>  <cell name="苹果ipad2" clicks="25100" clickratio="0.0055" opens="54422" expenditure="-1" rata="50" /> <cell name="2联想乐pad" clicks="25500" clickratio="0.0655" opens="33232" expenditure="59900" rata="50" /> <cell name="三星Galaxy Tab" clicks="26600" clickratio="0.0675" opens="55522" expenditure="66800" rata="10" /> <cell name="摩托罗拉MOTO X" clicks="27700" clickratio="0.0875" opens="99922" expenditure="76800" rata="10" /><cell name="万利达Zpad T2" clicks="28800" clickratio="0.0645" opens="66622" expenditure="86800" rata="5" /> <cell name="本易M2" clicks="29100" clickratio="0.0955" opens="76522" expenditure="96800" rata="5" /> <cell name="乐天派Gpad 802" clicks="55100" clickratio="0.0995" opens="67522" expenditure="57800" rata="7" /> <cell name="爱国者N700 商务" clicks="53300" clickratio="0.3195" opens="37522" expenditure="88800" rata="5" /> <cell name="诺基亚5230" clicks="64400" clickratio="0.1195" opens="57522" expenditure="34800" rata="20" /> <cell name="酷派N900" clicks="24500" clickratio="0.1495" opens="12522" expenditure="89800" rata="3" />  </rootd>');
			//init('<?xml version="1.0" encoding="utf-8" ?><rootd><cell name="推广计划1" clicks="25100" clickratio="0.0102" opens="54422" expenditure="58800" rata="58800" /><cell name="推广计划2" clicks="21100" clickratio="0.0055" opens="54422" expenditure="48550" rata="48550" /><cell name="推广计划1" clicks="25100" clickratio="0.0102" opens="54422" expenditure="58800" rata="58800" /><cell name="推广计划2" clicks="21100" clickratio="0.0055" opens="54422" expenditure="48550" rata="48550" /><cell name="推广计划1" clicks="25100" clickratio="0.0102" opens="54422" expenditure="58800" rata="58800" /><cell name="推广计划2" clicks="21100" clickratio="0.0055" opens="54422" expenditure="48550" rata="48550" /><cell name="推广计划1" clicks="25100" clickratio="0.0102" opens="54422" expenditure="58800" rata="58800" /><cell name="推广计划2" clicks="21100" clickratio="0.0055" opens="54422" expenditure="48550" rata="48550" /></rootd>');
			   }
		}
		
		private function parseXmlData(str:String):void {
		  	//xl = new XmlLoader(url);
		    //xl.addEventListener("XML_LOAD_COMPLETE", init);
			init(str);
		}
		//=====================================
		private function init(xml:String) {
			clearInterface();
			var _xml:XML = new XML(xml);
			ComData    = new CommodityData();
			ComDataArr = [];
			DATA = [];
			LABELS = [];
			ComDataArr = ComData.parseXMLcd(_xml);  
			var totalnum:Number = 0;
			for (var i:int = 0; i < ComDataArr.length; i++ )
			{
				DATA[i] = Number(ComDataArr[i][5]);
				totalnum += Number(DATA[i]);
				//trace(ComDataArr.length+"长度"+DATA[i]);
			}
			for (var j:int = 0; j < ComDataArr.length; j++ )
			{
				LABELS[j] = Math.round((ComDataArr[j][5]/totalnum)*1000)/10 + "%";
				
			}//trace(LABELS[6]+"------"+Math.round((ComDataArr[6][5]/totalnum)*1000)/10);
			_tool = new ToolTips();
            _tool.visible = false;
			this.addChild(_tool);
			pieSimple();			//最经常使用方式
			//pie3DSimple();        //3D
		}
		
		/**
		 * 清除界面
		 */
		private function clearInterface():void {
			while (this.numChildren) {
				this.removeChildAt(0);
			}
		}
		/**
		 * 最经常使用方式
		 * 二维饼图
		 */
		private function pieSimple():void {
			var tf:TextFormat = new TextFormat("宋体", 12, 0x0000FF, true);
			var pieSimple:PieGraph = new PieGraph();
			pieSimple.itemRenderer = PieItem;
			pieSimple.labels = LABELS;
			pieSimple.data = DATA;
			pieSimple.setStyles({labelTextFormat:tf,
			labelLineLength: 0.05});
			pieSimple.radius = 100;
			addChildAt(pieSimple,0);
			pieSimple.x = 170;
			pieSimple.y = 160;
			pieSimple.showLabelLine = true;
			pieSimple.showLabel = true;
			
			
			//原色
			//pieSimple.setStyle("colors", COLORS);
			
			//使用区域块渐变
			var colors:Array = [];
			for(var i:int = 0, iLen:int = COLORS.length; i < iLen; i++){
				//默认渐变
				var gradientStyle:GradientStyle = new GradientStyle([COLORS[i]]);
				//自定义渐变
				//gradientStyle.colors = [COLORS[i],0xffffff];
				gradientStyle.type = "radial";
				colors.push(gradientStyle);
			}
			pieSimple.setStyle("colors", colors);
		    this.addEventListener(MouseEvent.CLICK, KK);
			pieSimple.addEventListener(ItemEvent.ITEM_OVER, onPieOver);
			pieSimple.addEventListener(ItemEvent.ITEM_OUT, onPieOut);
			pieSimple.addEventListener(ItemEvent.ITEM_CLICK, onPieClick);
		}
		private function KK(e:Event):void {
			trace("&&&&&&&&&::"+mouseX+"--"+mouseY);
			}
		/**
		 * 最经常使用方式
		 * 三维饼图
		 */
		//private function pie3DSimple():void {
			//var pieSimple:PieGraph = new PieGraph();
			//pieSimple.itemRenderer = PieItem3D;
			//pieSimple.labels = LABELS;
			//pieSimple.setStyle("colors", COLORS);
			//pieSimple.data = DATA;
			//addChild(pieSimple);
			//pieSimple.x = 200;
			//pieSimple.y = 300;
			//
			//pieSimple.addEventListener(ItemEvent.ITEM_OVER, onPieEvent);
			//pieSimple.addEventListener(ItemEvent.ITEM_OUT, onPieEvent);
			//pieSimple.addEventListener(ItemEvent.ITEM_CLICK, onPieEvent);
		//}
		
		/**
		 * 事件处理
		 * PieItem鼠标事件
		 */
		private function onPieOver(evt:ItemEvent = null):void {
			index= evt.index;
			//trace("item index:" + index);
			var pie:PieGraph = evt.target as PieGraph;
			pie.emphasizeItem(index);
			this.addEventListener(Event.ENTER_FRAME, changetool);
		}
		private function onPieOut(evt:ItemEvent = null):void {
			this.removeEventListener(Event.ENTER_FRAME, changetool);
			index= evt.index;
			trace("item index:" + index);
			var pie:PieGraph = evt.target as PieGraph;
			pie.normalizeItem(index);
			_tool.visible = false;
		}	
		private function onPieClick(evt:ItemEvent = null):void {
			index= evt.index;
			//trace("item index:" + index);
			var pie:PieGraph = evt.target as PieGraph;
		    //trace("CLICK......mouse:"+mouseX+"--"+mouseY);
		    pie.normalizeAllItems();
		}	
		private function changetool(e:Event):void {
			_tool.visible = true;
			_tool.setContent(ComDataArr, index, mouseX+20, mouseY+20);
			//trace("------");			
		}
	}
}

