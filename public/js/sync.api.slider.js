// var host = "http://192.168.1.30";
// var api_host = "http://192.168.1.30:3061";

var host = "http://amusingly-widget-sync-api.s3-website.us-east-2.amazonaws.com";
var api_host = "http://3.19.58.151:3061";

(function() {

// Localize jQuery variable
var jQuery;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.9.1') {
	
	var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src", "https://www.amusingly.com/user/js/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else {
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

    jQuery(document).ready(function(jQuery) { 

			/******* Load CSS *******/
		var sync_css = document.createElement('link');
		sync_css.setAttribute("rel","stylesheet");
		sync_css.setAttribute("type","text/css");
		sync_css.setAttribute("href", host + "/css/sync.api.slider.css");
		// Try to find the head, otherwise default to the documentElement
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(sync_css);
		
		var owl_css = document.createElement('link');
		owl_css.setAttribute("rel","stylesheet");
		owl_css.setAttribute("type","text/css");
		owl_css.setAttribute("href", host + "/css/owl.carousel.css");
		// Try to find the head, otherwise default to the documentElement
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(owl_css);
		
		/******* Load JS *******/

		/******* Load HTML *******/
		var jsonp_url = api_host + "/api/wsync/slider?key="+ jQuery('#am-slider-widget-container').attr("data-key") +"&callback=?";
		
    jQuery.getJSON(jsonp_url, function(data) {
			jQuery('#am-slider-widget-container').html(data.html);
			var am_slider = jQuery("#am-slider");

			am_slider.owlCarousel({
				autoPlay: 3000,
				items : 5,
				pagination: false,
				navigation:true,
				autoPlay:false,
				responsive :true,
				responsiveRefreshRate: 50,
				rewindNav : false,
				mouseDrag : true,
				touchDrag : true,
				navigationText : ["prev","next"],
				itemsDesktop : [1199,4],
				itemsDesktopSmall : [979,3]
			});
			//var wd = "80%";
			var wd = "1000px";
			if(jQuery(window).width() < 1001) wd = "95%";
			jQuery(".inline").colorbox({
				inline:true, width:wd, rel:'am-group', current:false, fastIframe: false, preloading :true, 
				onLoad:function(){ 
					jQuery(".am-popuop-wrapper #am_p_image").attr("src",'');
					jQuery(".am-popuop-wrapper #am_p_caption").html(am_img_data[jQuery(this).attr("data-id")].caption);
					if(am_img_data[jQuery(this).attr("data-id")].video != "")
					{
						jQuery(".am-popuop-wrapper #am_p_image").hide();
						jQuery(".am-popuop-wrapper #am_p_video").show();
						jQuery(".am-popuop-wrapper #am_p_video").attr("src", am_img_data[jQuery(this).attr("data-id")].video);
						
					}
					else
					{
						jQuery(".am-popuop-wrapper #am_p_video").hide();
						jQuery(".am-popuop-wrapper #am_p_image").show();
						var tesdt = jQuery(this).find("img").attr("src");
						tesdt = tesdt.replace('Compraseimage_thumb_image','Compraseimage');
						jQuery(".am-popuop-wrapper #am_p_image").attr("src", tesdt);
					}
					
					//var imgsrc = jQuery(".am-popuop-wrapper #am_p_image").attr('src');
					//jQuery(".am-popuop-wrapper #am_p_image").attr('src',imgsrc.replace('Compraseimage_thumb_image','Compraseimage'));
					
					jQuery(".am-popuop-wrapper #am_p_buynow").attr("href", am_img_data[jQuery(this).attr("data-id")].href);
					jQuery(".pop_product_list").empty();
					if(am_img_data[jQuery(this).attr("data-id")].link1_url && am_img_data[jQuery(this).attr("data-id")].link1_title && am_img_data[jQuery(this).attr("data-id")].link1_image)
					{
						var url1 = am_img_data[jQuery(this).attr("data-id")].link1_url 
						if((url1.substr(0,7) != 'http://') && (url1.substr(0,8) != 'https://')){
						    url1 = 'http://' + url1;
						}
						
						jQuery(".pop_product_list").append("<div class='pop_product'><a href=" + url1 + "><img src=" + am_img_data[jQuery(this).attr("data-id")].link1_image + "><span class='pro_title_popup' style='color:" + am_img_data[jQuery(this).attr("data-id")].txtcolor + "'> "+ am_img_data[jQuery(this).attr("data-id")].link1_title +"</span></a></div>");
					}
					
					if(am_img_data[jQuery(this).attr("data-id")].link2_url && am_img_data[jQuery(this).attr("data-id")].link2_title && am_img_data[jQuery(this).attr("data-id")].link2_image)
					{
						var url2 = am_img_data[jQuery(this).attr("data-id")].link2_url
						if((url2.substr(0,7) != 'http://') && (url2.substr(0,8) != 'https://')){
						    url2 = 'http://' + url2;
						}
						jQuery(".pop_product_list").append("<div class='pop_product'><a href=" + url2 + "><img src=" + am_img_data[jQuery(this).attr("data-id")].link2_image + "><span class='pro_title_popup' style='color:" + am_img_data[jQuery(this).attr("data-id")].txtcolor + "'> "+ am_img_data[jQuery(this).attr("data-id")].link2_title +"</span></a></div>");
					}
					
					if(am_img_data[jQuery(this).attr("data-id")].link3_url && am_img_data[jQuery(this).attr("data-id")].link3_title && am_img_data[jQuery(this).attr("data-id")].link3_image)
					{
						var url3 = am_img_data[jQuery(this).attr("data-id")].link3_url
						if((url3.substr(0,7) != 'http://') && (url3.substr(0,8) != 'https://')){
						    url3 = 'http://' + url3;
						}
						jQuery(".pop_product_list").append("<div class='pop_product'><a href=" + url3 + "><img src=" + am_img_data[jQuery(this).attr("data-id")].link3_image + "><span class='pro_title_popup' style='color:" + am_img_data[jQuery(this).attr("data-id")].txtcolor + "'> "+ am_img_data[jQuery(this).attr("data-id")].link3_title +"</span></a></div>");
					}
					
					if(am_img_data[jQuery(this).attr("data-id")].link4_url && am_img_data[jQuery(this).attr("data-id")].link4_title && am_img_data[jQuery(this).attr("data-id")].link4_image)
					{
						var url4 = am_img_data[jQuery(this).attr("data-id")].link4_url
						if((url4.substr(0,7) != 'http://') && (url4.substr(0,8) != 'https://')){
						    url4 = 'http://' + url4;
						}
						jQuery(".pop_product_list").append("<div class='pop_product'><a href=" + url4 + "><img src=" + am_img_data[jQuery(this).attr("data-id")].link4_image + "><span class='pro_title_popup' style='color:" + am_img_data[jQuery(this).attr("data-id")].txtcolor + "'> "+ am_img_data[jQuery(this).attr("data-id")].link4_title +"</span></a></div>");
					}
					
					if(am_img_data[jQuery(this).attr("data-id")].link5_url && am_img_data[jQuery(this).attr("data-id")].link5_title && am_img_data[jQuery(this).attr("data-id")].link5_image)
					{
						var url5 = am_img_data[jQuery(this).attr("data-id")].link5_url
						if((url5.substr(0,7) != 'http://') && (url5.substr(0,8) != 'https://')){
						    url5 = 'http://' + url5;
						}
						jQuery(".pop_product_list").append("<div class='pop_product'><a href=" + url5 + "><img src=" + am_img_data[jQuery(this).attr("data-id")].link5_image + "><span class='pro_title_popup' style='color:" + am_img_data[jQuery(this).attr("data-id")].txtcolor + "'> "+ am_img_data[jQuery(this).attr("data-id")].link5_title +"</span></a></div>");
					}
					
					if(am_img_data[jQuery(this).attr("data-id")].link6_url && am_img_data[jQuery(this).attr("data-id")].link6_title && am_img_data[jQuery(this).attr("data-id")].link6_image)
					{
						var url6 = am_img_data[jQuery(this).attr("data-id")].link6_url
						if((url6.substr(0,7) != 'http://') && (url6.substr(0,8) != 'https://')){
						    url6 = 'http://' + url6;
						}
						jQuery(".pop_product_list").append("<div class='pop_product'><a href=" + url6 + "><img src=" + am_img_data[jQuery(this).attr("data-id")].link6_image + "><span class='pro_title_popup' style='color:" + am_img_data[jQuery(this).attr("data-id")].txtcolor + "'> "+ am_img_data[jQuery(this).attr("data-id")].link6_title +"</span></a></div>");
					}
					
					//alert(jQuery(this).find("img").attr("alt"));
					var fbshare = 'http://www.facebook.com/sharer/sharer.php?u=' + jQuery(this).find("img").attr("alt") + '?image=' + jQuery(this).find("img").attr("src");
					jQuery(".am-popuop-wrapper .sharing-fb").attr("href", fbshare);
					
					
					var tshare = 'https://twitter.com/share?url=' + jQuery(this).find("img").attr("alt");
					jQuery(".am-popuop-wrapper .sharing-tw").attr("href", tshare);
					
					
					jQuery(".pro_title_popup").css("color", jQuery(".sifre_text_color").val());
					
					
					jQuery(".am-popuop-wrapper .author-handlename").attr("href", jQuery(this).find("img").attr("alt"));
					
					var myVar = jQuery(".am-sharing").find('.urlkey').val();
					
					var url = 'https://www.pinterest.com/pin/create/button/?url=https://www.instagram.com/' + myVar + '&media=' + jQuery(this).find("img").attr("src");
					//alert(url);
					jQuery(".sharing-pi").attr("href", url)
				},
				onClosed:function(){ 
					jQuery(window).resize();
					jQuery(".am-left .am-featured-photo video").each(function () { this.pause() });
				}
			});
        });
        jQuery("#cboxNext,#cboxPrevious").click(function() {
        	jQuery(".am-left .am-featured-photo video").each(function () { this.pause() });
        });
    });
}

})(); // We call our anonymous function immediately
