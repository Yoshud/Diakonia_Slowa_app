
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
}

