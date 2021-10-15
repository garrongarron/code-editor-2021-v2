import eventBus from "../basic/EventBus.js";
import container from "./Container.js";
import core from "./Core.js";
import database from "./Database.js";
import loader from "./Loader.js";
import textarea from "./TextArea.js";

class DomController {
    constructor() { }
    start() {
        eventBus.subscribe('dom.render.page', this.domRenderPage)
        eventBus.subscribe('textarea.keyup', this.textareaKeyup)
        eventBus.subscribe('duplicate.btn', this.duplicateBtn)
        eventBus.subscribe('request.dom.duplicate.node', this.requestDomDuplicateNode)
        eventBus.subscribe('update.node.tag', this.updateNodeTag)
        eventBus.subscribe('update.node.line.number', this.updateNodeLineNumber)
    }
    updateNodeLineNumber = (lineNumber) => {
        eventBus.dispatch('database.update.line.number', {
            index: core.getIndex(),
            lineNumber
        })
    }
    updateNodeTag = (tag) => {
        eventBus.dispatch('database.update.tag', {
            index: core.getIndex(),
            tag
        })
    }
    requestDomDuplicateNode = (params) => {
        let clone = core.currentNode().cloneNode(true)
        core.insertAfter(clone, core.currentNode())
        core.setClickOnNode(clone, params.data.text)
    }
    duplicateBtn = () => {
        let text = textarea.node.value
        text = (text == '') ? 'Dummy Text' : text
        if (core.getIndex() == null) {
            eventBus.dispatch('create.first', {
                index: 0, data: { tag: 'h1', text }
            })
            core.setIndex(0)
            //por que no hay database????
        } else {
            eventBus.dispatch('database.duplicate', core.getIndex())
            let index = core.getIndex()
            core.setIndex(++index)
        }
    }
    textareaKeyup = (text) => {
        if (core.getIndex() == null) return
        eventBus.dispatch('request.database.update', { index: core.getIndex(), text })
    }

    domRenderPage = (data) => {
        container.node.innerText = ''
        core.index = 0 //to process
        loader.load(data)
        localStorage.setItem('data', JSON.stringify(data));
        core.setIndex(0)//to point current node
        textarea.node.value = data[0].text
        database.loadData(data)
    }
    stop() {
        eventBus.unSubscribe('dom.render.page', this.domRenderPage)
    }
}

const domController = new DomController()

export default domController