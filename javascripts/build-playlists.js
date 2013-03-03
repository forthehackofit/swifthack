thisPaylist = [];
/*
 * {
        mp3:'mix/1.mp3',
        oga:'mix/1.ogg',
        title:'Love The Way You Lie',
        artist:'Eminem',
        rating:4,
        buy:'#',
        price:'0.99',
        duration:'0:30',
        cover:'mix/1.jpg'
    }
 */
function buildPlaylist (url) {
	if(!url) {
		return false;
	}
	$.ajax({
		 url: url,
		 dataType: "xml",
		 success: function(feed) {
		 	// $(feed).find("entry").each( function(i, xml) {
		 		// console.log(xmlToJson(xml));
		 	// });	
		 	var _p = xmlToJson(feed),
		 		_e = _p.feed["entry"];
		 		
		 		console.log(_e);
		 		
		 		$.each(_e, function(i, o) {
		 			item = {};
		 			item.title  = o["im:name"]["#text"];
		 			item.mp3    = o["link"][1]["@attributes"]["href"];
		 			item.m4a    = o["link"][1]["@attributes"]["href"];
		 			item.artist = o["im:artist"]["#text"];	
		 			item.cover  = o["im:image"][2]["#text"];
		 			item.price  = o["im:price"]["#text"];
		 			thisPaylist.push(item);
		 		});
		 		
		 		//var dep = "jPlayer:{supplied:'mp3',swfPath:'plugins/jquery-jplayer'}";
		 			
	 			//thisPaylist.supplied ='mp3';
	 			//thisPaylist.swfPath  = 'plugins/jquery-jplayer';
	 			
	 			//console.log(thisPaylist);
	 			
		 		$("#playlist").ttwMusicPlayer(thisPaylist, {
		 			currencySymbol:'$',
			        buyText:'BUY',
			        tracksToShow:5,
			        autoPlay:false
		 		}, {supplied: "mp3", swfPath: "plugins/jquery-jplayer"});
		 }
	});		 
}

function xmlToJson (xml) {
		  
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
    obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      //console.log(nodeName);
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}
