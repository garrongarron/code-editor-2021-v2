import eventBus from "../basic/EventBus.js"

class Textarea {
    constructor(){
        this.node = null
    }
    start(node) {
        this.node = node
        this.node.addEventListener('keyup', this.keyup)
        eventBus.subscribe('click.on.container.node', this.clickOnContainerNode)
    }
    stop() {
        this.node.removeEventListener('keyup', this.keyup)
        eventBus.unSubscribe('click.on.container.node', this.clickOnContainerNode)
    }
    keyup = (e) => {
        eventBus.dispatch('textarea.keyup', e.target.value)
    }
    clickOnContainerNode = (text) => {
        this.node.value = text
    }
}

const textarea = new Textarea()

export default textarea