(function(){
	var jQuery;
	//load jquery in the page if it doesn't exist
	//after jquery loaded or confirmed to exist, execute rest of plugin
	if (window.jQuery === undefined) {
	    var script_tag = document.createElement('script');
	    script_tag.setAttribute("type","text/javascript");
	    script_tag.setAttribute("src",
	        "http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
	    if (script_tag.readyState) {
	      script_tag.onreadystatechange = function () { // For old versions of IE
	          if (this.readyState == 'complete' || this.readyState == 'loaded') {
	              scriptLoadHandler();
	          }
	      };
	    } else { // Other browsers
	      script_tag.onload = scriptLoadHandler;
	    }
	    // Try to find the head, otherwise default to the documentElement
	    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
	} else {
	    // The jQuery version on the window is the one we want to use
	    jQuery = window.jQuery;
	    main();
	}

	/******** Called once jQuery has loaded ******/
	function scriptLoadHandler() {
	    // Restore $ and window.jQuery to their previous values and store the
	    // new jQuery in our local jQuery variable
	    jQuery = window.jQuery.noConflict(true);
	    // Call our main function
	    main(); 
	}

	/******** Our main function ********/
	function main() { 
	    jQuery(document).ready(function($) { 
	       var css_link = $("<link>", { 
			    rel: "stylesheet", 
			    type: "text/css", 
			    href: "/sharePlugin/sharePlugin.css" 
			});
	       var font_awesome_link = $('<link>', {
	       		rel: 'stylesheet',
	       		type: 'text/css',
	       		href: '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
	       });
			css_link.appendTo('head');
			font_awesome_link.appendTo('head');
			$('body').append("<div id='social-share'></div>");
			var pageUrl = window.location.href
			$("#social-share").append('<div id="twitter-custom-share" class="custom-social-icon"><i class="fa fa-twitter"></i></div>');
			$("#social-share").append("<div id='fb-custom-share' class='custom-social-icon'><i class='fa fa-facebook'></i></div>");
			$('#fb-custom-share').on('click', function(){
				var url = 'http://www.facebook.com/share.php?u=' + window.location.href;
				window.open(url,'','width=600,height=400')
			});			
			$('#twitter-custom-share').on('click', function(){
				var url = 'https://twitter.com/intent/tweet?original_referer=' + window.location.href + '&text=' + $('title').text() + '&tw_p=tweetbutton&url=' + window.location.href;
				window.open(url,'','width=600,height=400')
			})


			$('.custom-social-icon').on('mouseenter', function(){
				$(this).animate({
				    left: "+=10",
				    fontSize: '30px'
				  }, 400, function() {
				    // Animation complete.
				  });
			});

			$('.custom-social-icon').on('mouseleave', function(){
				$(this).animate({
				    left: "-=10",
				    fontSize: '20px'
				  }, 400, function() {
				    // Animation complete.
				  });
			});
	    });
	}

})();