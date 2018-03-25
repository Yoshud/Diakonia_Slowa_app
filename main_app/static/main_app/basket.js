///klasa stanowiąca interfejs do słownika koszyka i powiązanych z nim itemów z sessionStorage
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