class Tag {
    constructor(name, pk, row_ref) {
        this.name = name;
        this.pk = pk;
        this.row_ref = row_ref;
    }

    write() {
        let cell = newcell(this.name, this.row_ref);
        cell.style.textAlign = "center";
    }
}

class Added_tags {
    constructor(table_ref) {
        this.table_ref = table_ref;
        add_style(table_ref, {
            "border-bottom-style": "solid",
            "border-bottom-width": "medium",
            "height": "20px"
        });
        this.tags = [];

    }

    to_search_val() {
        return this.tags.reduce(function (before, tag) {
            return before + " " + tag.name;
        }, "");
    }
    product_search(){
        str_from_tag_system = this.to_search_val();
        post();
    }
    add(tag, pk) {
        let row_ref = this.table_ref.insertRow();
        let new_tag = new Tag(tag, pk, row_ref);
        this.tags.append(new_tag);
        row_ref.addEventListener('click', function () {
            console.log(new_tag.pk)
        })
    }

    static create_text_and_style_for_delete_cell(cell) {
        let text = document.createTextNode("X");
        add_style(cell, {
            "color": "red",
            "width": "40%",
            "textAlign": "center"
        });
        return text;
    }

    static create_text_delete_cell(row_ref) {
        let cell = row_ref.insertCell();
        cell.appendChild(Added_tags.create_text_and_style_for_delete_cell(cell));
        return cell;
    }

    create_delete_cell(row_ref, tag) {
        let self = this;
        Added_tags.create_text_delete_cell(row_ref).addEventListener('click', function () {
            self.delete_from_added(tag)
        })
    }

    add_tag(tag) {
        let row_ref = this.table_ref.insertRow();
        tag.row_ref = row_ref;
        this.tags.push(tag);
        tag.write();
        this.create_delete_cell(row_ref, tag);
        console.log("to_search", this.to_search_val());
        this.product_search();
    }

    delete_from_added(tag) {
        this.table_ref.deleteRow(tag.row_ref.rowIndex);
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.to_add_tags_ref.add_tag(tag);
        this.product_search();
    }

    Tags_obj_register(to_add_tags_ref) {
        this.to_add_tags_ref = to_add_tags_ref;
    }

}

class To_add_Tags {
    constructor(table_ref, tags, added_tags_ref) {
        this.added_tags_ref = added_tags_ref;
        this.added_tags_ref.Tags_obj_register(this); //zarejestrowanie do nasłuchu na eventy
        this.tags = [];
        for (let it in tags.pk)
            this.tags.push(new Tag(tags.tag[it], tags.pk[it], null));
        this.table_ref = table_ref;
        this.write_table();
    }

    static string_icontains(tag, search) {
        if (search === '')
            return true;
        else {
            tag = tag.name.toLowerCase();
            search = search.toLowerCase();
            return tag.indexOf(search) >= 0;
        }
    }

    add_tag(tag) {
        this.tags.push(tag);
        this.write_row(tag);
    }

    write_row(tag) {
        console.log(tag, this.table_ref);
        let row_ref = this.table_ref.insertRow();
        console.log(row_ref);
        tag.row_ref = row_ref;
        tag.write();
        let self = this;
        row_ref.addEventListener('click', function () {
            console.log(tag.pk);
            self.move_to_added(tag);
        })
    }

    write_table(search = '') {
        t_delete(this.table_ref,0);
        // let sought_tags = this.tags.filter(function (tag) {
        //     return To_add_Tags.string_icontains(tag, search);
        // });
        // for (let it in sought_tags)
        //     this.write_row(sought_tags[it]);
        let self = this;
        this.tags.filter(function (tag) {
            return To_add_Tags.string_icontains(tag, search);
        }).map(function (tag) {
            self.write_row(tag);
        });
    }

    move_to_added(tag) {

        this.table_ref.deleteRow(tag.row_ref.rowIndex);
        this.tags.splice(this.tags.indexOf(tag), 1);
        console.log(this.table_ref, tag.row_ref, this.tags, this.tags.indexOf(tag));
        this.added_tags_ref.add_tag(tag);
    }
}

//To_add_tags i Added_tags komunikują się z pomocą wzorca projektowego observer
class Tag_class {
    constructor(tags, to_add_table_ref, added_table_ref, search_field_jquery_ref) {
        this.added_tags = new Added_tags(added_table_ref);
        this.tags = new To_add_Tags(to_add_table_ref, tags, this.added_tags);

        let self = this;
        search_field_jquery_ref.on('input', function () {
            self.tags.write_table(this.value);
        });
    }
}