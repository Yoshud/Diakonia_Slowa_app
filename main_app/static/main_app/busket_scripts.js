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
        write_busket_table("busket_table", basket.diction);
    }
    basket_sum();
});

document.getElementById("basket_clear_button").addEventListener('click', function () {
    basket.reset();
    write_order_page_product_table();
    write_empty_basket_table();
    document.getElementById("search_value_order").focus();
});

//*********************************Właściwe funkcje*****************************

function basket_sum() {
    let ref = document.getElementById("basket_sum_field");
    ref.innerText = "Suma koszyka: " + basket.sum() + "zł";
}


///funkcja dodaje produkt do koszyka uruchomiana przy kliknięciu przycisku
function add_product_by_id_to_busket(id, product_name, price, number_tag = "number_") {

    basket.load_from_storage();
    let number_ref = $("#" + number_tag + id);
    let quantity = number_ref.val();
    console.log(id, product_name, quantity, price * quantity);

    basket.fun();
    if (quantity > 0) {
        console.log(basket.diction["id"], id, basket.diction["id"].indexOf(parseInt(id)));
        if (basket.diction["id"].indexOf(parseInt(id)) === -1) {
            basket.add_product(product_name, parseInt(id), quantity, price);
            $("#search_value_order").focus();
            write_busket_table("busket_table", basket.diction);
            update_order_page_product_table(id);
        }
    }
    basket.save_to_storage();
}

//********************************Funkcje rysujące tabelki, odpowiednio koszyka i produktów*****************************

///Rysuje tabelke koszyka
function write_busket_table(table_ID = "busket_table", data = basket.diction) {
    let table_ref = document.getElementById(table_ID);
    t_delete(table_ref, 1, table_ref.rows.length);
    for (it in data["product_name"]) {
        let newRow = table_ref.insertRow();
        newcell(data["product_name"][it], newRow);
        let quantity_cell_ref = newcell(data["quantity"][it], newRow);


        let cell = newcell((data["quantity"][it] * data["price"][it]) + "zł", newRow);
        cell.setAttribute("id", "basket_sum_" + data["id"][it]);

        cell = newRow.insertCell();
        basket_el_edit_button(cell, data["id"][it], data["quantity"][it], quantity_cell_ref);
    }
    basket_sum();
}

function quantity_input(id, max, tag, value = 0, min = 0) {
    let quantity_input = document.createElement("INPUT");
    quantity_input.setAttribute("type", "number");
    quantity_input.setAttribute("id", tag + id);
    quantity_input.setAttribute("value", value);
    quantity_input.setAttribute("min", min);
    quantity_input.setAttribute("max", max);
    quantity_input.style.width = "100%";
    quantity_input.style.height = "100%";
    quantity_input.style.padding = 0;
    quantity_input.style.border = 0;
    return quantity_input
}

function basket_el_edit_button(cell, id, quantity, quantity_cell_ref) {
    cell.style.textAlign = "center";
    let input = document.createElement("INPUT");
    input.setAttribute("type", "button");
    input.setAttribute("value", "Edytuj");
    input.setAttribute("id", "basket_el_edit_button_" + id);

    //funkcja reagująca na kliknięcie edycji, dodaje pole zmiany ilosci
    input.addEventListener('click', function edit() {
        input.setAttribute('value', "Akceptuj");
        input.removeEventListener('click', edit);
        quantity_cell_ref.innerHTML = "";
        quantity_cell_ref.appendChild(quantity_input(id, data_obj.get_quantity_by_id(id), "basket_number_", quantity));

        quantity_cell_ref.addEventListener('change', function () {
            update_sum(id, data_obj.get_price_by_id(id), data_obj.get_quantity_by_id(id), "basket_number_", "basket_sum_");
        });

        console.log(id, quantity);
        //Funkcja dzialająca po zaakceptowaniu wpisuje wartosc do koszyka i rysuje od nowa tabelke
        input.addEventListener('click', function accept() {
            basket.set_product_quantity_get_by_id(id, $("#basket_number_"+id).val());
            write_busket_table("busket_table", basket.diction);
            input.removeEventListener('click', accept);
        });

    });
    cell.appendChild(input);
}

function write_empty_basket_table(table_ID = "busket_table") {
    let table_ref = document.getElementById(table_ID);
    t_delete(table_ref, 1, table_ref.rows.length);
    let cell;
    let newRow = table_ref.insertRow();
    cell = newRow.insertCell();
    let text = document.createTextNode("Koszyk jest aktualnie pusty");
    cell.style.borderStyle = "hidden";
    cell.style.textAlign = "right";
    cell.appendChild(text);

    basket_sum();
}

function update_order_page_product_table(id = -1, table_ID = "product_table") { //dla id -1 czyści dla wszystkch w koszyku TESTOWANE TYLKO DLA USTALOENGO ID
    let data = data_obj.data;
    let counter = 0;
    for (let it in data.pk) {
        console.log(it);
        if (id === -1) {
            if ((basket.diction["id"].indexOf(data.pk[it])) !== -1) {
                console.log(it);
                let table_ref = document.getElementById(table_ID);
                table_ref.deleteRow(parseInt(it) + 1);
            }
        }
        else {
            if ((basket.diction["id"].indexOf(data.pk[it])) !== -1) {
                counter++;
                console.log("counter:", counter);
            }
            if (data.pk[it] === parseInt(id)) {
                let table_ref = document.getElementById(table_ID);
                table_ref.deleteRow(parseInt(it) - counter + 2);
            }
        }
    }
}

///Rysuje tabelkę zamówinia
function write_order_page_product_table(table_ID = "product_table") {
    console.log(data_obj);
    let data = data_obj.data;
    console.log(data);
    if (data !== undefined) {
        let table_ref = document.getElementById(table_ID);
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
                    newRow.setAttribute("onclick", "document.getElementById(\"number_" + data.pk[it] + "\").focus();");
                    newcell(data.product_name[it], newRow);
                    newcell(data.quantity[it], newRow);
                    newcell(data.price[it] + " zł", newRow);

                    let cell = newRow.insertCell();
                    cell.setAttribute("onchange", "update_sum (" + data.pk[it] + "," + data.price[it] + "," + data.quantity[it] + ")");
                    //Cellstyle(cell);

                    cell.appendChild(quantity_input(data.pk[it], data.quantity[it], "number_"));

                    cell = newRow.insertCell();
                    //Cellstyle(cell);
                    cell.setAttribute("id", "sum_" + data.pk[it]);
                    cell.innerHTML = "0zł";

                    console.log(data.pk[it]);
                    cell = newRow.insertCell();
                    //Cellstyle(cell);
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
