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
	      ComDayArr[i][0]=Sxml.cell[i].@time;
	      ComDayArr[i][1]=Sxml.cell[i].@clicks;
	      ComDayArr[i][2]=Sxml.cell[i].@clickratio;
	      ComDayArr[i][3]=Sxml.cell[i].@opens;
	      ComDayArr[i][4] = Sxml.cell[i].@expenditure;
		  ComDayArr[i][5] = Sxml.@type;
		  trace(Sxml.@type+"*********");
	   }
		return ComDayArr;
	}
	//Y轴要显示的数据放在数组第二位，对数据重新排序，
	public  function cellData(_arr:Array,n:int):Array
	{
		var arr:Array=new Array();
		for(var i:int=0;i<_arr.length;i++)
	   {
		  arr[i]=new Array();
	      arr[i][0]=_arr[i][0];
		  if(n==1){ 
		      arr[i][1]=_arr[i][n];
			  arr[i][2]=_arr[i][2];
			  arr[i][3]=_arr[i][3];
			  arr[i][4]=_arr[i][4];
			  }
		 else if(n==2){
			  arr[i][1]=_arr[i][n];
			  arr[i][2]=_arr[i][1];
			  arr[i][3]=_arr[i][3];
			  arr[i][4]=_arr[i][4];
			  }
	     else if(n==3){
			  arr[i][1]=_arr[i][n];
			  arr[i][2]=_arr[i][2];
			  arr[i][3]=_arr[i][1];
			  arr[i][4]=_arr[i][4];
			  }
		 else if(n==4){
			  arr[i][1]=_arr[i][n];
			  arr[i][2]=_arr[i][2];
			  arr[i][3]=_arr[i][3];
			  arr[i][4]=_arr[i][1];
			  }
		 else arr=null;
	   }
		return arr;
	}
	//x轴要分多少份
	/**
	 * 
	 * @param	_xml
	 * @return
	 */
	/**
	 * 
	 */
	public  function pitchx(_xml:XML):int
	{
	   //Sxml=_xml;
	    var  _Pitchx:int=_xml.children().length();
		return _Pitchx;
	}
	//Y轴要分多少份
	public  function pitchy(_xml:XML):int
	{
	   return 5;
	}
	//Y轴的最大值。
	public  function _maxY(arr:Array):Number
	{
	   var Nmax:Number;                  //y轴最大值
	   var Nmin:Number;			
	   var ComDayA:Array = new Array();
	   for (var k:int = 0; k < arr.length; k++ )
	   {
		   ComDayA[k] = Number(arr[k][1]);
	   }
	   var Pitchx = ComDayA.length;
	   for(var i:int=0;i<Pitchx;i++)
	   {
		   for (var j:int = i + 1; j < Pitchx ; j++ )
		   {
			   if(ComDayA[i]<ComDayA[j])
			   {
				 Nmin = ComDayA[i];
				 ComDayA[i] = ComDayA[j];
				 ComDayA[j] = Nmin;
			   }
		   }
		}
		Nmax = ComDayA[0];
		return Nmax;
	}
	//public function _maxX():Number
	//{
	//    return _maxY
	//}
	//把数据换算成坐标
	public  function  parseXMLXY(arr:Array,maxY:Number,maxX:Number,Ylen:Number,Xlen:Number,pitchy:int,pitchx:int):Array
	{
		var _scaleY:Number=Ylen/maxY;
		var _scaleX:Number=Xlen/maxX;
		var ARR:Array=arr;
		for(var i:int=0;i<ARR.length;i++)
		{
		   ARR[i].Y=Number(ARR[i][1])*_scaleY;
		   ARR[i].X=maxY*(Xlen/Ylen)/pitchx*(i+1);
		}
		return ARR;
	}
  }
}