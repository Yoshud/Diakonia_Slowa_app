

function write_main_page_product( table_ID, data ) {
    table_ref = document.getElementById(table_ID)
    var length_before_deleting = table_ref.rows.length;
    var it = 0;
    for (let i in table_ref.rows)
    {
        it++;
        if(table_ref.rows.length>3) {
            console.log("usuwane: ",length_before_deleting - it - 1, table_ref.rows.length, it+3) ;

        }
    }
   t_delete(table_ref, 1, length_before_deleting);
    function t_delete(table_ref, begin, end)
    {
        for(var it = begin; it < end; it++ )
        {
            table_ref.deleteRow(begin);
        }
    }


    console.log("write: ", data.product_name);
    function Cellstyle(newCell)
    {
        newCell.style.borderTopStyle = "solid";
        newCell.style.borderLeftStyle = "solid";
        newCell.style.borderWidth = "thin";
    }
    function newcell(text, Row)
    {
        var newCell = Row.insertCell();
        Cellstyle(newCell);
        var newText = document.createTextNode(text);
        newCell.appendChild(newText)
    }
  for (it in data.product_name)
  {
      console.log("size: ", table_ref.rows);
      var newRow = table_ref.insertRow();
      newcell(data.product_name[it], newRow);
      newcell(data.quantity[it], newRow);
      newcell(data.price[it] + " zł", newRow);
  }
}


