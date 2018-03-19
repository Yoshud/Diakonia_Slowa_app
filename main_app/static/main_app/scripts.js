$(document).ready(function(){
    $.ajax({
	url: configuration['main_app']['ajax'],
	cache: false,
	type: "POST",
	data: {"key": "value"},
	success: function(data){
	},
	beforeSend: function(xhr, settings) {
         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
             // Only send the token to relative URLs i.e. locally.
             xhr.setRequestHeader("X-CSRFToken", Cookies.get('csrftoken'));
         }
     }
    });
});


