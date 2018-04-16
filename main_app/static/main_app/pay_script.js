// **************************************zmienne globalne do komunikacji*********************************************


// **************************************zmienne globalne dla tego pliku*********************************************
let basket;
if (basket === undefined) {
    basket = new basket_class();
    //console.log(basket);
}

//******************************funkcje ustawiające zmienne***************************
$(document).ready(function () {
    if (basket.load_from_storage() === 1) {
        console.log(basket.diction);
    }
    basket_sum();
});
function basket_sum() {
    let ref = document.getElementById("basket_sum_field");
    ref.innerText = "Kwota do zapłaty: " + basket.sum() + "zł";
}

//*******************************Wysyłanie danych do backend***************************
function post_basket_with_possible_redirect(url, client_id = -1, url_redirect = "-1") {
    console.log(client_id);
    console.log(basket.diction);
    if(basket.field_to_string("id")!=="" && client_id!==-2) {  //wysłanie tylko gdy koszyk nie pusty
        $.ajax({
            url: url,
            cache: false,
            type: "POST",
            data: {
                "id": basket.field_to_string("id"),
                "product_name": basket.field_to_string("product_name"),
                "quantity": basket.field_to_string("quantity"),
                "price": basket.field_to_string("price"),
                "client_id": client_id
            },
            success: function (data) {
                console.log(data);
                if(url_redirect !=='-1')
                    window.location.replace(url_redirect);
            },

            beforeSend: function (xhr, settings) {
                if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                    // Only send the token to relative URLs i.e. locally.
                    xhr.setRequestHeader("X-CSRFToken", Cookies.get('csrftoken'));
                }
            }
        });
    }
}