import eventBus from "../basic/EventBus.js"
import dataProvider from "./DataProvider.js"

class Core{
    constructor(){
        this.index = null
        this.container = null
    }
    start(container){
        this.container = container
        eventBus.subscribe('core.data.loaded', this.loadData)
    }
    loadData = (data) => {
        localStorage.setItem('data', data);
        this.container.innerHTML = ''
        dataProvider.start()
    }
    stop(){
        eventBus.unSubscribe('core.data.loaded', this.loadData)
    }
    getIndex(){
        return this.index
    }
    getIndexOf(node) {
        let index = Array.from(this.container.children).indexOf(node)
        return index
    }
    setIndex(index){
        if(this.index!=null) this.currentNode().classList.remove('node-selected')
        this.index = index
        this.currentNode().classList.add('node-selected')
    }
    currentNode() {
        return this.container.children[this.index]
    }
    setClickOnNode(node, text) {
        node.addEventListener('click', () => {
            this.setIndex(this.getIndexOf(node))
            eventBus.dispatch('click.on.container.node', text)
        })
    }
    //tool
    insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }
}

const core = new Core()

export default core