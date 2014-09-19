/**
 * constructor
 * @param {Object} cfg
 */
SWFObject = function(json){
	this.cfg = json;
	this.swfId = json.fid;
	this.asObjects = {};
	this.onLoadInit = function(){};
	
	SWFObject.instances[this.swfId] = this;
};

/**
 * load swf
 */
SWFObject.prototype.load = function(){
	Utils.f(this.cfg);
};

/**
 * get an as object
 * @param {Object} json
 */
SWFObject.prototype.getASObject = function(json){
	return this.asObjects[json.asoId];
};

/**
 * register an as object
 * @param {Object} json {asoId:""}
 */
SWFObject.prototype.registerASObject = function(json){
	var asoId = json.asoId;
	var swfId = this.swfId;
	return this.asObjects[asoId] = new ASObject({asoId:asoId,swfId:swfId});
};

/**
 * get an as object's property
 * @param {Object} json {asoId,property}
 */
SWFObject.prototype.getASObjectProperty = function(json){
	if (this.swf == null) {
		this.swf = Utils.g(this.swfId);
	}
	return this.swf.getASObjectProperty(json);
};

/**
 * set an as object's property
 * @param {Object} json {asoId,property,value}
 */
SWFObject.prototype.setASObjectProperty = function(json){
	if(this.swf==null)this.swf=Utils.g(this.swfId);
	this.swf.setASObjectProperty(json);
};

/**
 * call an as object's method
 * @param {Object} json {asoId,method,params}
 */
SWFObject.prototype.callASObjectMethod = function(json){
	if(this.swf==null)this.swf=Utils.g(this.swfId);
	return this.swf.callASObjectMethod(json);
};

//static members
/**
 * save all SWFObject instances in class
 */
SWFObject.instances = {};

/**
 * get a swf object
 * @param {Object} json
 */
SWFObject.getSWFObject = function(json){
	return SWFObject.instances[json.swfId];
};

/**
 * for flash. dispatch event for an as object of a swf object
 * @param {Object} json
 */
SWFObject.dispatchASObjectEvent = function(json){
	var swfId = json.swfId;
	var asoId = json.asoId;
	var type = json.type;
	var data = json.data;
	
	var swfObject = SWFObject.getSWFObject({swfId:swfId});
	var targetObject = (asoId==undefined)?swfObject:swfObject.getASObject({asoId:asoId});
	var callback = "on" + type.substr(0, 1).toUpperCase() + type.substr(1);
	if(targetObject[callback]!=null)
		targetObject[callback](data);
};

/**
 * for flash. register an as object to a swf object
 * @param {Object} json {swfId,asoId}
 */
SWFObject.registerASObject = function(json){
	var swfId = json.swfId;
	var asoId = json.asoId;
	
	var swfObject = SWFObject.getSWFObject(json);
	swfObject.registerASObject(json);
};

/**
 * constructor
 * @param {Object} json
 */
ASObject = function(json){
	this.swfId = json.swfId;
	this.asoId = json.asoId;
	this.swfObject = SWFObject.getSWFObject(json);
	
	if(ASObject.instances[this.swfId]==null){
		ASObject.instances[this.swfId] = {};
	}
	ASObject.instances[this.swfId][this.asoId] = this;
};

/**
 * get property
 * @param {Object} property
 */
ASObject.prototype.get = function(property){
	return this.swfObject.getASObjectProperty({asoId:this.asoId,property:property});
};

/**
 * set property
 * @param {Object} property
 * @param {Object} value
 */
ASObject.prototype.set = function(property,value){
	this.swfObject.setASObjectProperty({asoId:this.asoId,property:property,value:value});
};

/**
 * call method
 * @param {Object} method
 * @param {Object} parameters
 */
ASObject.prototype.call = function(method,parameters){
	return this.swfObject.callASObjectMethod({asoId:this.asoId,method:method,parameters:parameters});
};

//static members
/**
 * save all SWFObject instances in class
 */
ASObject.instances = {};

Utils = {
	g: function(id){
		return document.getElementById(id);
	},
	f: function(json){
		var embedTpl = '<embed id="#{fid}" name="#{fid}" src="#{movie}" flashVars="#{flashVars}" width="#{width}" height="#{height}" align="#{align}" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" wmode="#{wmode}" scale="#{scale}" salign="#{salign}" />';
		var objectTpl = '<object id="#{fid}" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="#{width}" height="#{height}" align="#{align}"><param name="movie" value="#{movie}" /><param name="flashVars" value="#{flashVars}" /><param name="wmode" value="#{wmode}" /><param name="scale" value="#{scale}" /><param name="salign" value="#{salign}" /></object>';
		this.g(json.cid).innerHTML = this.fm(this.b.isIE ? objectTpl : embedTpl, json);
	},
	fm: function(str, json){
		if(arguments.length){
			if(typeof(json) == "object")
				str = str.replace(/#\{([^\{\}]+)\}/g, function(a, key){
					var v = json[key];
					if(typeof v == 'function')v = v(key);
					return typeof(v) == 'undefined' ? "" : v;
				});
			else if(typeof(json) != "undefined")
				for(var i = arguments.length - 2; i > -1; i --)str = str.replace(new RegExp("#\\{" + i + "\\}","g"), arguments[i + 1]);
		};
		return str;
	},
	b: {
		isIE: /msie/i.test(navigator.userAgent),
		isFF: /firefox/i.test(navigator.userAgent),
		isMaxthon: (function(){var result=false; try{result=external.max_version}catch(e){} return result;})()
	},
	mo:function(){
		var result = {};
		var l = arguments.length;
		for (var i=0; i<l; i++) {
			var obj = arguments[i];
			for (var n in obj) {
				if (result[n] != null) { continue; }
				result[n] = arguments[i][n];
			}
		}
		return result;
	}
};