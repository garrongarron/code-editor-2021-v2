import cache from "../basic/Cache.js";
import exportFile from "../basic/Export.js";
import importFile from "../basic/Import.js";
import container from "./Container.js";
import core from "./Core.js";
import database from "./Database.js";
import dataProvider from "./DataProvider.js";
import domController from "./DomController.js";
import editorForm from "./EditorForm.js";
import nodeBuilder from "./NodeBuilder.js";
import textarea from "./TextArea.js";

class Bootstrap {
    constructor() { }
    tick() {
        dataProvider.start()
    }
    start() {
        if(!editorForm.node) editorForm.querySelector('body')
        else document.body.appendChild(editorForm.node)
        if(!container.node) container.querySelector('body')
        else document.body.appendChild(container.node)
        textarea.start(editorForm.node.querySelector('textarea'))
        core.start(container.node)
        domController.start()
        nodeBuilder.start(core)
        database.start()
        exportFile.start()
        importFile.start()
        this.tick()
    }
    stop() { 
        textarea.stop()
        domController.stop()
        nodeBuilder.stop()
        exportFile.stop()
        importFile.stop()
        cache.appendChild(editorForm.node)
        cache.appendChild(container.node)
    }
}

const bootstrap = new Bootstrap()

export default bootstrap