
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
            cell.setAttribute("onchange", "update_sum ("+data.pk[it]+","+data.price[it]+")");
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

            cell = newRow.insertCell();
            Cellstyle(cell);
            cell.style.textAlign = "center";
            cell.innerHTML = "<input type='button' value='Dodaj'>";
            cell.setAttribute("onclick", "add_product_by_id_to_busket ("+data.pk[it]+")");
        }
    }
}
function add_product_by_id_to_busket(id){
    console.log(id)
}
function update_sum(id, price){
    var how_many = $("#number_"+id ).val();
    if($("#number_"+id ).val().trim().length === 0){
        $("#number_"+id ).val(0);}
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

