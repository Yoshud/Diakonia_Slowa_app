// **************************************zmienne globalne*********************************************
let basket;
if (basket === undefined) {
    basket = new basket_class();
    //console.log(basket);
}
// data jest zadeklarowana i zdefiniowana w pliku order_ext

//******************************funkcje ustawiające zmienne i rusujące tabelki przy uruchomieniu pliku***************************
$(document).ready(function () {
    if (basket.load_from_storage() === 1) {
    }
    basket_sum();
});

function basket_sum() {
    let ref = document.getElementById("basket_sum_field");
    ref.innerText = "Kwota do zapłaty: " + basket.sum() + "zł";
}