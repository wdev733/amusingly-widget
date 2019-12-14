// var host = "http://localhost";
// var api_host = "http://192.168.1.30:3061/public";

var host = "http://amusingly-widget-sync-api.s3-website.us-east-2.amazonaws.com";
var api_host = "http://3.19.58.151:3061";

(function() {
  // Localize jQuery variable
  var jQuery;

  /******** Load jQuery if not present *********/
  if (window.jQuery === undefined || window.jQuery.fn.jquery !== "1.4.2") {
    var script_tag = document.createElement("script");
    script_tag.setAttribute("type", "text/javascript");
    script_tag.setAttribute(
      "src",
      "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"
    );
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function() {
        // For old versions of IE
        if (this.readyState == "complete" || this.readyState == "loaded") {
          scriptLoadHandler();
        }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (
      document.getElementsByTagName("head")[0] || document.documentElement
    ).appendChild(script_tag);
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
      var sync_css = document.createElement("link");
      sync_css.setAttribute("rel", "stylesheet");
      sync_css.setAttribute("type", "text/css");
      sync_css.setAttribute("href", host + "/css/sync.api.css");
      // Try to find the head, otherwise default to the documentElement
      (
        document.getElementsByTagName("head")[0] || document.documentElement
      ).appendChild(sync_css);

      /******* Load JS *******/

      /******* Load HTML *******/
      var jsonp_url =
        api_host +
        "/api/wsync/block?key=" +
        jQuery("#amusing-widget-container").attr("data-key") +
        "&callback=?";

      jQuery.getJSON(jsonp_url, function(data) {
        jQuery("#amusing-widget-container").html(data.html);
      });
    });
  }
})(); // We call our anonymous function immediately
