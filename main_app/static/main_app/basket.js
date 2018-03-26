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

    static clear_storage() {
        sessionStorage.removeItem("product_name");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("quantity");
        sessionStorage.removeItem("price");
    }

    to_json_dict() {
        let jsondict = {
            "product_name": {},
            "id": {},
            "quantity": {},
            "price": {},
        };
        for (it in this.diction["id"]) {
            jsondict["product_name"][it] = this.diction["product_name"][it];
        }

    }

    storage_get_item(nazwa) {
        let tmp = sessionStorage.getItem(nazwa);
        //console.log(tmp);
        if (tmp !== null) {
            //console.log(tmp);
            let el = $.parseJSON(tmp);
            //console.log("set_item, ", nazwa, el);
            if (nazwa === "quantity" || nazwa === "id") {
                for (let it in el) {
                    el[it] = parseInt(el[it]);
                }
            }
            this.diction[nazwa] = el;
            //console.log(this.diction[nazwa]);
            return 1;
        }
        else {
            this.reset();
            return 0;
        }
    }

    field_to_string(nazwa) {
        let str = "";
        if (this.diction[nazwa].length <= 0)
            return "";
        else if (this.diction[nazwa].length === 1)
            return this.diction[nazwa][0];
        else {
            for (let it in this.diction[nazwa]) {
                if (parseInt(it) !== (this.diction[nazwa].length - 1))
                    str += this.diction[nazwa][it] + ",";
                else
                    str += this.diction[nazwa][it];
            }
            return str;
        }
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
        if (this.storage_get_item("price") === 1) //sprawdzamy tylko 1 zakładając (nadużycie) że gdy on się wczyta to inne również, gdyby tak nie było oznacza to błąd aplikacji co powinno być poinformowane dodatkowym względem 0 i 1 statusem
            return 1; //nastapilo wczytanie
        else return 0; //nie nastapilo wczytanie
        //return -1 bedzie informowac o błędzie

    }

    sum() {
        let sum = 0;
        for (let it in this.diction["price"]) {
            sum += this.diction["price"][it] * this.diction["quantity"][it];
            //console.log(this.diction["price"], this.diction["quantity"])
        }
        return sum;
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