// **************************************zmienne globalne*********************************************
let basket;
if (basket === undefined) {
    basket = new basket_class();
    //console.log(basket);
}
// data jest zadeklarowana i zdefiniowana w pliku order_ext

//******************************funkcje ustawiające zmienne przy uruchomieniu pliku***************************
$(document).ready(function () {

    basket.load_from_storage();
    write_busket_table("busket_table", basket.diction);
});

//*********************************Właściwe funkcje*****************************

///funkcja dodaje produkt do koszyka uruchomiana przy kliknięciu przycisku
function add_product_by_id_to_busket(id, product_name, price, number_tag = "number_") {
    //localStorage.clear();
    basket.load_from_storage();
    let number_ref = $("#" + number_tag + id);
    let quantity = number_ref.val();
    console.log(id, product_name, quantity, price * quantity);

    //basket.reset();

    // basket.reset();
    //basket.load_from_storage();
    basket.fun();
    if (quantity > 0) {
        console.log(basket.diction["id"], id, basket.diction["id"].indexOf(parseInt(id)));
        if (basket.diction["id"].indexOf(parseInt(id)) === -1) {
            basket.add_product(product_name, parseInt(id), quantity, price);
            write_busket_table("busket_table", basket.diction);
            write_order_page_product();
        }
    }
    basket.save_to_storage();
}

//********************************Funkcje rysujące tabelki, odpowiednio koszyka i produktów*****************************

///Rysuje tabelke koszyka
function write_busket_table(table_ID, data) {
    table_ref = document.getElementById(table_ID);
    t_delete(table_ref, 1, table_ref.rows.length);
    for (it in data["product_name"]) {
        let newRow = table_ref.insertRow();
        newcell(data["product_name"][it], newRow);
        newcell(data["quantity"][it], newRow);


        let cell = newcell((data["quantity"][it] * data["price"][it]) + "zł", newRow);
        Cellstyle(cell);
        cell.setAttribute("id", "sum_" + data["id"][it]);

        cell = newRow.insertCell();
        Cellstyle(cell);
        cell.style.textAlign = "center";
        cell.innerHTML = "<input type='button' value='Edytuj'>";

    }
}

///Rysuje tabelkę zamówinia
function write_order_page_product(table_ID = "product_table") {
    console.log(data_obj);
    let data = data_obj.data;
    if (data !== undefined) {
        table_ref = document.getElementById(table_ID);
        t_delete(table_ref, 1, table_ref.rows.length);
        if ((data.product_name.length < 1)) {
            if (flag === true) {
                alert("Brak produktu o takiej nazwie");
                flag = false;
            }
        }
        else {
            flag = true;
            for (it in data.product_name) {
                if ((basket.diction["id"].indexOf(data.pk[it])) === -1) {
                    //console.log(basket.diction["id"].indexOf(data.pk[it]), basket.diction["id"], data.pk[it]);
                    let newRow = table_ref.insertRow();
                    newcell(data.product_name[it], newRow);
                    newcell(data.quantity[it], newRow);
                    let cell = newcell(data.price[it] + " zł", newRow);

                    cell = newRow.insertCell();
                    cell.setAttribute("onchange", "update_sum (" + data.pk[it] + "," + data.price[it] + "," + data.quantity[it] + ")");

                    Cellstyle(cell);
                    let input = document.createElement("INPUT");
                    input.setAttribute("type", "number");
                    input.setAttribute("id", "number_" + data.pk[it]);
                    input.setAttribute("value", 0);
                    input.setAttribute("min", 0);
                    input.setAttribute("max", data.quantity[it]);
                    input.setAttribute("required", "");
                    input.style.width = "100%";
                    input.style.height = "100%";
                    input.style.padding = 0;
                    input.style.border = 0;
                    cell.appendChild(input);

                    cell = newRow.insertCell();
                    Cellstyle(cell);
                    cell.setAttribute("id", "sum_" + data.pk[it]);
                    cell.innerHTML = "0zł";

                    cell = newRow.insertCell();
                    Cellstyle(cell);
                    cell.style.textAlign = "center";
                    cell.innerHTML = "<input type='button' value='Dodaj'>";
                    cell.dataset.pk = data.pk[it];
                    cell.dataset.product_name = data.product_name[it];
                    cell.dataset.price = data.price[it];
                    cell.addEventListener('click', function () {
                        add_product_by_id_to_busket(this.dataset.pk, this.dataset.product_name, this.dataset.price);
                    });
                }
            }
        }
    }
}
