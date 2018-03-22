class basket_class {

    constructor() {
        this.diction = {
            "product_name": [],
            "id": [],
            "quantity": [],
            "price": [],
        }
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


let basket = new basket_class();

function add_product_by_id_to_busket(id, product_name, price, table_ID, data, number_tag = "number_") {

    let number_ref = $("#" + number_tag + id);
    let quantity = number_ref.val();
    console.log(id, product_name, number_ref.val(), price * quantity);
    basket.fun();
    if (quantity > 0) {
        if(basket.diction["id"].indexOf(parseInt(id)) === -1) {
            basket.add_product(product_name, parseInt(id), quantity, price);
            write_busket_table("busket_table", basket.diction, price * quantity);
            write_order_page_product();
        }
    }
}

function write_busket_table(table_ID, data, sum) {
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
        if (data.product_name.length < 1 && flag) {
            alert("Brak produktu o takiej nazwie");
            flag = false;
        }
        else {
            flag = true;
            let id_it = 0;
            for (it in data.product_name) {
                if ((basket.diction["id"].indexOf(data.pk[it])) === -1) {
                    console.log(basket.diction["id"].indexOf(data.pk[it]), basket.diction["id"], data.pk[it]);
                    //  if (restricted_id.indexOf(data.pk[it]) == -1) {
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
                    cell.dataset.table_ID = table_ID;
                    console.log(data);
                    cell.addEventListener('click', function () {
                        console.log(this.dataset.data);
                        add_product_by_id_to_busket(this.dataset.pk, this.dataset.product_name, this.dataset.price, this.dataset.tableID, this.dataset.data);
                    });
                }
            }
        }
    }
}
