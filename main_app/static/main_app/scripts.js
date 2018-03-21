
function write_main_page_product(table_ID, data) {
    table_ref = document.getElementById(table_ID);
    console.log("write: ", data.product_name);
    t_delete(table_ref, 1, table_ref.rows.length);
    if (data.product_name.length < 1 && flag) {
        alert("Brak produktu o takiej nazwie");
        flag = false;
    }
    else {
        for (it in data.product_name) {
            flag = true;
            var newRow = table_ref.insertRow();
            newcell(data.product_name[it], newRow);
            newcell(data.quantity[it], newRow);
            newcell(data.price[it] + " zł", newRow);
        }
    }
    console.log("size: ", table_ref.rows);
}

function write_order_page_product(table_ID, data) {
    table_ref = document.getElementById(table_ID);
    t_delete(table_ref, 1, table_ref.rows.length);
    if (data.product_name.length < 1 && flag) {
        alert("Brak produktu o takiej nazwie");
        flag = false;
    }
    else {
        for (it in data.product_name) {
            flag = true;
            var newRow = table_ref.insertRow();
            newcell(data.product_name[it], newRow);
            newcell(data.quantity[it], newRow);
            var cell = newcell(data.price[it] + " zł", newRow);

            cell = newRow.insertCell();
            cell.setAttribute("onchange", "update_sum ("+data.pk[it]+","+data.price[it]+","+ data.quantity[it] +")");

            Cellstyle(cell);
            var input = document.createElement("INPUT");
            input.setAttribute("type", "number");
            input.setAttribute("id", "number_"+data.pk[it]);
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
            cell.setAttribute("id", "sum_"+ data.pk[it]);
            cell.innerHTML = "0zł";

            cell = newRow.insertCell();
            Cellstyle(cell);
            cell.style.textAlign = "center";
            cell.innerHTML = "<input type='button' value='Dodaj'>";
            cell.setAttribute("onclick", "add_product_by_id_to_busket (" + data.pk[it]+ ','+ "\""+data.product_name[it]+ "\"" + ")");
        }
    }
}
function validate_number_count(number_tag, id, max_quantity){
    var number_ref = $("#"+number_tag +id);
    var how_many = number_ref.val();

    if(number_ref.val().trim().length === 0){
        number_ref.val(0);}
        if(how_many > max_quantity) {
            number_ref.val(max_quantity);
            alert("Przkroczono ilość na magazynie. Ustawiona zostaje maksymalna dostępna ilość")
        }
}
function update_sum(id, price, max_quantity){
    validate_number_count("number_", id, max_quantity);
    var how_many = $("#number_"+id ).val();
    console.log(how_many);
    var cell_ref = document.getElementById("sum_"+id);
    cell_ref.innerText = how_many * price+ "zł";
}
function t_delete(table_ref, begin, end) {
    for (var it = begin; it < end; it++) {
        table_ref.deleteRow(begin);
    }
}

function Cellstyle(newCell) {
    newCell.style.borderTopStyle = "solid";
    newCell.style.borderLeftStyle = "solid";
    newCell.style.borderWidth = "thin";
    newCell.style.paddingLeft = "5px";
}

function newcell(text, Row) {
    var newCell = Row.insertCell();
    Cellstyle(newCell);
    var newText = document.createTextNode(text);
    newCell.appendChild(newText)
    return newCell
}

