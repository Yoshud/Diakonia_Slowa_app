class basket_class {

    constructor() {
        this.diction = {
            "product_name": [],
            "id": [],
            "quantity": [],
            "price": [],
        }
    }

    storage_set_item(nazwa) {
        sessionStorage.setItem(nazwa, JSON.stringify(this.diction[nazwa]));
    }

    storage_get_item(nazwa) {

        let tmp = sessionStorage.getItem(nazwa);
        if (tmp !== null) {
            console.log(tmp);
            let el = $.parseJSON(tmp);
            console.log("set_item, ", nazwa ,el);
            if (nazwa === "quantity" || nazwa==="id") {
                for (let it in el) {
                    el[it] = parseInt(el[it]);
                }
            }

            this.diction[nazwa] = el;
            //console.log(this.diction[nazwa]);
        }
        else this.reset();

    }

    save_to_storage() {
        this.storage_set_item("product_name");
        this.storage_set_item("id");
        this.storage_set_item("quantity");
        this.storage_set_item("price");
    }

    load_from_storage() {
        this.storage_get_item("product_name");
        this.storage_get_item("id");
        this.storage_get_item("quantity");
        this.storage_get_item("price");
    }

    add_product(product_name, id, quantity, price) {
        this.diction["product_name"].push(product_name);
        this.diction["id"].push(id);
        this.diction["quantity"].push(quantity);
        this.diction["price"].push(price);
    }

    reset() {
        this.diction["product_name"] = [];
        this.diction["id"] = [];
        this.diction["quantity"] = [];
        this.diction["price"] = [];
    }

    fun() {
        console.log(this.diction["id"]);
    }
}

let basket;
if (basket === undefined) {
    basket = new basket_class();
    //console.log(basket);
}
$(document).ready(function () {

    basket.load_from_storage();
    write_busket_table("busket_table", basket.diction);
});

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
