email_validation_flag = false;
function email_ajax_validate(url, email) {
            //let flag = true;
            $.ajax({
                url: url,
                cache: false,
                type: "POST",
                data: {"email": email},
                success: function (data) {
                    if(data.msg !== 'ok') {
                        alert(data.msg);
                        email_validation_flag  = false;
                    }
                    else email_validation_flag = true;
                },
                beforeSend: function (xhr, settings) {
                    if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                        // Only send the token to relative URLs i.e. locally.
                        xhr.setRequestHeader("X-CSRFToken", Cookies.get('csrftoken'));
                    }
                }
            });
            //return flag
        }