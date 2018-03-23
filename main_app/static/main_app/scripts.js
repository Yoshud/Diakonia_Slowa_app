
function write_main_page_product(table_ID, data) {
    table_ref = document.getElementById(table_ID);
    console.log("write: ", data.product_name);
    t_delete(table_ref, 1, table_ref.rows.length);
    if ((data.product_name.length < 1)) {
            if (flag === true) {
                alert("Brak produktu o takiej nazwie");
                flag = false;
            }
        }
    else {
        for (it in data.product_name) {
            flag = true;
            let newRow = table_ref.insertRow();
            newcell(data.product_name[it], newRow);
            newcell(data.quantity[it], newRow);
            newcell(data.price[it] + " zł", newRow);
        }
    }
    console.log("size: ", table_ref.rows);
}

function validate_number_count(number_tag, id, max_quantity){
    let number_ref = $("#"+number_tag +id);
    let how_many = number_ref.val();

    if(number_ref.val().trim().length === 0){
        number_ref.val(0);}
        if(how_many > max_quantity) {
            number_ref.val(max_quantity);
            alert("Przkroczono ilość na magazynie. Ustawiona zostaje maksymalna dostępna ilość")
        }
        else if(how_many < 0) {
            number_ref.val(0);
        }
        else
        {
            number_ref.val(parseInt(number_ref.val()));
        }

}

function update_sum(id, price, max_quantity, number_tag = "number_", sum_tag = "sum_"){
    validate_number_count(number_tag, id, max_quantity);
    let how_many = $("#"+number_tag+id ).val();
    console.log(how_many);
    let cell_ref = document.getElementById(sum_tag+id);
    cell_ref.innerText = how_many * price+ "zł";
}
function t_delete(table_ref, begin, end) {
    for (let it = begin; it < end; it++) {
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
    let newCell = Row.insertCell();
    Cellstyle(newCell);
    let newText = document.createTextNode(text);
    newCell.appendChild(newText);
    return newCell
}

