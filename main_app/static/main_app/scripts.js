function write_main_page_product(table_ID, data) {
    let table_ref = document.getElementById(table_ID);
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
            let pk = data.pk[it];
            newRow.addEventListener('click', function () {
                console.log(pk, url_to_single_product_view(pk));
                window.open(url_to_single_product_view(pk))
            });
            newcell(data.product_name[it], newRow);
            newcell(data.quantity[it], newRow);
            newcell(data.price[it] + " zł", newRow);
        }
        empty_row(table_ref);
    }
    console.log("size: ", table_ref.rows);
}

function empty_row(table_ref, height = "120px") {
    let newRow = table_ref.insertRow();
    newRow.style.borderStyle = "hidden";
    let cell = newRow.insertCell();
    cell.style.borderStyle = "hidden";
    newRow.style.height = height;
}

function validate_number_count(number_tag, id, max_quantity) {
    let number_ref = $("#" + number_tag + id);
    let how_many = parseInt(number_ref.val());
    let max_quantity_tmp = parseInt(max_quantity);
    console.log(number_ref, max_quantity_tmp);

    if (number_ref.val().trim().length === 0) {
        number_ref.val(0);
    }
    if (how_many > max_quantity_tmp) {
        number_ref.val(max_quantity_tmp);
        alert("Przkroczono ilość na magazynie. Ustawiona zostaje maksymalna dostępna ilość")
    }
    else if (how_many < 0) {
        number_ref.val(0);
    }
    else {
        number_ref.val(parseInt(number_ref.val()));
    }

}

function add_to_string_at_position(str, str_added, position) {
    if (position > str.length)
        position = str.length;
    return str.slice(0, position + 1) + str_added + str.slice(position + 1)
}

function float_to_string_with_decimal_places_without_comma(value, decimal_places) {
    value = parseFloat(value) * Math.pow(10, parseInt(decimal_places));
    return Math.round(value).toString();
}

function float_string_decimal_places(value, decimal_places = 2) {
    value = parseFloat(value);
    if (Math.abs(value) > 1.0) {
        console.log(value);
        let value_str = float_to_string_with_decimal_places_without_comma(value, decimal_places);
        return add_to_string_at_position(value_str, '.', value_str.length - (decimal_places + 1));
    }
    else if (Math.round(value*1000.0) === 0) return "0";
    else {
        return "0." + float_to_string_with_decimal_places_without_comma(value, decimal_places);
    }
}

function update_sum(id, price, max_quantity, number_tag = "number_", sum_tag = "sum_") {
    validate_number_count(number_tag, id, max_quantity);
    let how_many = $("#" + number_tag + id).val();
    console.log(how_many);
    let cell_ref = document.getElementById(sum_tag + id);
    cell_ref.innerText = float_string_decimal_places(how_many * price) + "zł";
    console.log(float_string_decimal_places(how_many * price) + "zł")
}

function t_delete(table_ref, begin = 1, end = table_ref.rows.length) {
    for (let it = begin; it < end; it++) {
        table_ref.deleteRow(begin);
    }
}

function newcell(text, Row) {
    let newCell = Row.insertCell();
    // Cellstyle(newCell);
    let newText = document.createTextNode(text);
    newCell.appendChild(newText);
    return newCell
}

function add_style(element, diction) {
    console.log(element, diction);
    //element.style.color = "red";
    for (let [name, value] of Object.entries(diction)) {
        element.style[name] = value;
    }
}
