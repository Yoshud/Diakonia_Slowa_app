class Tag{
    constructor(){
        this.name = "";
        this.pk = -1;
        this.row_ref=null;
    }
}


class Added_tags{
    constructor(table_ref){
        this.table_ref = table_ref
    }
    add(table_ref, tag, pk) {
    }

}

class To_add_Tags{
    constructor(table_ref, tags){

    }
}

class Tag_class {
    constructor(tags, table_ref) {
        this.tags = new To_add_Tags(to_add_table_ref, tags);
        this.added_tags = new Added_tag(added_table_ref);
    }
    write_table(){

    }
    add_tag(pk){
        // let iter = this.tags.pk.indexOf(parseInt(pk));
        // this.added_tags.add(this.table_ref, this.tags.tag[iter], pk);
        // this.tags.pk.splice(iter, 1);
        // this.tags.tag.splice(iter, 1);
    }
    delete_tag(it){
        // this.added_tags.tag.splice(it, 1);
        // this.added_tags.pk.splice(it, 1);
        // this.added_tags.it.splice(it, 1);
        // this.it--;
    }
}