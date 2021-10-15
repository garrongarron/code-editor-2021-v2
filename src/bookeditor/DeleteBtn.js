import eventBus from "../basic/EventBus.js";
import core from "./Core.js";
import editorForm from "./EditorForm.js";

class DeleteBtn {
    eventHandler = (e) => {
        let index = core.getIndexOf(e.currentTarget)
        //delete from dom
        e.currentTarget.remove()
        //delete from database
        eventBus.dispatch('database.delete.element', index)
        e.stopPropagation()
        e.preventDefault()
        //to delete once at a time
        this.clean()
    }
    readyToDelete() {
        let collection = core.container.children
        Array.from(collection).forEach(el => {
            el.addEventListener('click', this.eventHandler)
        });
    }

    clean = () => {
        let collection = core.container.children
        Array.from(collection).forEach(el => {
            el.removeEventListener('click', this.eventHandler)
        });
        editorForm.node.querySelector('.deleteBtn').classList.remove('red')
    }
}

const deleteBtn = new DeleteBtn()

export default deleteBtn