class busket_class {

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

let busket = new busket_class();

function add_product_by_id_to_busket(id, product_name, price, number_tag = "number_") {

    let number_ref = $("#" + number_tag + id);
    let quantity = number_ref.val();
    console.log(id, product_name, number_ref.val(), price * quantity);
    busket.fun();
    if(quantity > 0) {
        busket.add_product(product_name, id, quantity, price);
        write_busket_table("busket_table", busket.diction, price * quantity)
    }
}

function write_busket_table(table_ID, data, sum) {
    table_ref = document.getElementById(table_ID);
    t_delete(table_ref, 1, table_ref.rows.length);
    for (it in data["product_name"]) {
        let newRow = table_ref.insertRow();
        newcell(data["product_name"][it], newRow);
        newcell(data["quantity"][it], newRow);


        let cell = newcell((data["quantity"][it]*data["price"][it])+"zł", newRow);
        Cellstyle(cell);
        cell.setAttribute("id", "sum_" + data["id"][it]);

        cell = newRow.insertCell();
        Cellstyle(cell);
        cell.style.textAlign = "center";
        cell.innerHTML = "<input type='button' value='Edytuj'>";

    }
}