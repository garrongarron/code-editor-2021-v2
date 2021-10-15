import eventBus from "../basic/EventBus.js"
import build from "./Builder.js"

class NodeBuilder {
    constructor() {
        this.tagList = ['h1', 'h2', 'p']
        this.styleList = ['html', 'javascript', 'css']
        this.core = null
    }
    start(core) {
        this.core = core
        eventBus.subscribe('dom.add.new.node', this.domAddNewNode)
        eventBus.subscribe('request.dom.update.node', this.update)
    }
    stop() {
        eventBus.unSubscribe('dom.add.new.node', this.domAddNewNode)
    }

    domAddNewNode = (data) => {
        this.create(data)
    }
    update = (params) => {
        let data = params.data
        let node
        let currentNode = this.core.container.children[params.index]
        if (this.tagList.includes(data.tag)) {
            node = build(data.tag, data.text)
            this.core.insertAfter(node, currentNode)
            currentNode.remove()
        }
        if (data.tag == 'img') {
            let imgContainer = build('div')
            imgContainer.classList.add('image-container')
            node = build(data.tag, null, null, imgContainer)
            node.setAttribute('src', data.blob)
            node.setAttribute('title', 'Ilustration')
            this.core.insertAfter(imgContainer, currentNode)
            currentNode.remove()
            node = imgContainer
        }

        if (this.styleList.includes(data.tag)) {
            node = build('pre', null, 'language-' + data.tag)
            if (data.lineNumber !== '' && Number.isInteger(data.lineNumber * 1)) {
                node.classList.add('line-numbers')
                node.setAttribute('data-start', data.lineNumber)
            } else {
                if (typeof data.lineNumber != undefined) delete data.lineNumber
            }
            build('code', data.text, null, node)
            this.core.insertAfter(node, currentNode)
            Prism.highlightAll();
            currentNode.remove()
        }
        this.core.setIndex(params.index)
        this.core.setClickOnNode(node, data.text)
    }
    create(data) {
        let node = null
        if (this.tagList.includes(data.tag)) {
            node = build(data.tag, data.text, null, this.core.container)
        }
        if (data.tag == 'img') {
            let imgContainer = build('div', null, null, this.core.container)
            imgContainer.classList.add('image-container')
            node = build(data.tag, null, null, imgContainer)
            node.setAttribute('src', data.blob)
            node.setAttribute('title', 'Ilustration')
            node = imgContainer
        }

        if (this.styleList.includes(data.tag)) {
            node = build('pre', null, 'language-' + data.tag, this.core.container)
            build('code', data.text, null, node)
            if (data.lineNumber !== '' && Number.isInteger(data.lineNumber * 1)) {
                node.classList.add('line-numbers')
                node.setAttribute('data-start', data.lineNumber)
            } else {
                if (typeof data.lineNumber != undefined) delete data.lineNumber
            }
            // Prism.highlightElement(node);
        }
        this.core.setClickOnNode(node, data.text)
    }
}

const nodeBuilder = new NodeBuilder()

export default nodeBuilder