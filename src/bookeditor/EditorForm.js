import Component from "../../../js/Component.js";
import eventBus from "../basic/EventBus.js";
import deleteBtn from "./DeleteBtn.js";

class EditorForm extends Component {
    addEventListener() { return ['click', 'change'] }
    duplicateBtn() {
        eventBus.dispatch('duplicate.btn', null)
    }
    deleteBtn(e) {
        e.target.classList.toggle('red')
        if (e.target.classList.contains('red')) {
            deleteBtn.readyToDelete()
        } else {
            deleteBtn.clean()
        }
    }
    formatting(e){
        eventBus.dispatch('update.node.tag', e.target.classList[0])
    }
    lineNumber = (e) => {
        eventBus.dispatch('update.node.line.number', e.target.value)
    }
    template() {
        return `
        <div class="lateral-forms">
            <textarea></textarea>
            <div class="btnContainer">
                <button class="duplicateBtn" click="duplicateBtn">Duplicate</button>
                <button class="deleteBtn" click="deleteBtn">Delete</button>
            </div>
            <div class="typesContainer">
                <button class="h1" click="formatting">h1</button>
                <button class="h2" click="formatting">h2</button>
                <button class="p" click="formatting">p</button>
                <button class="html" click="formatting">html</button>
                <button class="css" click="formatting">css</button>
                <button class="javascript" click="formatting">js</button>
            </div>
            <div class="linenumberContainer">
                <button class="i">ImgUp</button>
                <input type="file" accept="image/png, image/jpeg" style="display:none">
                <button class="i">-</button>
                <button class="i">-</button>
                <input class="lineNumber" type="number" placeholder="Line number" click="lineNumber" change="lineNumber">
                <button class="lineNumberBtn">1-| On</button>
                <button class="lineNumberBtn">1-| Off</button>
            </div>
            <div class="actionsContainer">
                <button class="up">Upload Json</button>
                <input type="file" accept="application/JSON" style="display:none">
                <button class="down">Download Json</button>
                <button class="export">Download HTML</button>
                <button class="hide-show">hide-show</button>
            </div>
            <div class="database-section">
                <button class="search-btn">Search</button>
                <button class="save-btn">Save</button>
            </div>
        </div>
        `
    }
}
let editorForm = new EditorForm();

export default editorForm;