package
{
  import  flash.events.*;
  import  flash.net.*;
  public class CommodityData
  {
    
	//服务器传来的数据格式顺序【id,商品名字，日期，点击次数，展现量，点击率，消费费用】
	//public var ComDayArr:Array;                //产品每天的情况信息【time,clicks,clickratio,opens,expenditure】
	//private var ssXml:XML;
	//public var Sxml:XML;
	//private var Pitchx:Number;                 //x轴要分割的节点数
	//private var Pitchy:Number=5;                //y轴要分割的节点数
	public function CommodityData()
	{
		//readData()
	}  
	public  function parseXMLcd(_xml:XML):Array
	{
	  var Sxml:XML=_xml;
	  var Pitchx:Number=Sxml.children().length();
       var  ComDayArr=new Array();
	   for(var i:int=0;i<Pitchx;i++)
	   {
		  ComDayArr[i]=new Array();
	      ComDayArr[i][0]=Sxml.cell[i].@name;
	      ComDayArr[i][1]=Sxml.cell[i].@clicks;
	      ComDayArr[i][2]=Sxml.cell[i].@clickratio;
	      ComDayArr[i][3]=Sxml.cell[i].@opens;
	      ComDayArr[i][4] = Sxml.cell[i].@expenditure;
		  ComDayArr[i][5] = Sxml.cell[i].@rata;
	   }
		return ComDayArr;
	}
  }
}