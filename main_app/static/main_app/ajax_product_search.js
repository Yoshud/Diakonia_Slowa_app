function ajax_post(url, search_val, success_fun) {
            console.log(search_val);
            $.ajax({
                url: url,
                cache: false,
                type: "POST",
                data: {"search_value": search_val},
                success: success_fun,
                beforeSend: function (xhr, settings) {
                    if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                        // Only send the token to relative URLs i.e. locally.
                        xhr.setRequestHeader("X-CSRFToken", Cookies.get('csrftoken'));
                    }
                }
            });
        }
