  class Data_class {
            constructor() {
            }

            set(data) {
                this.data = data;
            }

            get_quantity_by_id(id) {
                console.log("get_quanity", this.data["pk"], id);
                let index = this.data["pk"].indexOf(id);
                console.log(index);
                if (index >= 0)
                    return (parseInt(this.data["quantity"][index]));
                else
                    return -1;
            }

            get_price_by_id(id) {
                let index = this.data["pk"].indexOf(id);
                if (index >= 0)
                    return (this.data["price"][index]);
                else
                    return -1;
            }
        }
