

function write_main_page_product( table_ID, data ) {
    table_ref = document.getElementById(table_ID)
    var newRow = table_ref.insertRow(0);

  // Insert a cell in the row at index 0
  var newCell = newRow.insertCell(0);

  // Append a text node to the cell
  var newText = document.createTextNode('New top row');
  newCell.appendChild(newText);
}


