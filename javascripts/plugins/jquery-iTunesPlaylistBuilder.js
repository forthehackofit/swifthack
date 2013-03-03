;(function ( $, window, document, undefined ) {

    var pluginName = "iTunesPlaylist",
        defaults = {
            propertyName: "value"
        };

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            // code goes here
            
            if(!this.options.url) {
            	return false;
            }
             var _url = this.options.url,
             	 _el = this.element;

             $.ajax({
				 url: _url,
				 dataType: "xml",
				 success: function(feed) {
				  var html = "";	
				  $(feed).find("entry").each( function(i, e) {
				  	 console.log(e);
				  	 var soundFile = $(e).find('link[rel$=enclosure]').attr("href");
				     html += "<div><h3>";
				     html += $(e).find('title').text();
				     html += "</h3>";
				     html += "<audio controls><source src='"+soundFile+"'></audio>";
				     html += "</div>";
				  });
				  $(_el).html(html);
				 },
				 error: function(error) {
				 	console.log(error);
				 }
			});
        },

        parseFeed: function(el, options) {
            // some logic
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
