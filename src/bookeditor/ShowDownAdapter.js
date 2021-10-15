class ShowDownAdapter{
    constructor(){
        this.converter = new Showdown.converter();
    }
    convert(nodeElement, innerHTML){
        var html = this.converter.makeHtml(innerHTML);
        nodeElement.innerHTML = html
    }
}

const showDownAdapter = new ShowDownAdapter()

export default showDownAdapter