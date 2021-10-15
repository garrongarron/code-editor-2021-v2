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