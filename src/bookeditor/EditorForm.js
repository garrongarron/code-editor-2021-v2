import Component from "../../../js/Component.js";
import eventBus from "../basic/EventBus.js";
import core from "./Core.js";
import database from "./Database.js";
import dataProvider from "./DataProvider.js";
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
    formatting(e) {
        eventBus.dispatch('update.node.tag', e.target.classList[0])
    }
    lineNumber = (e) => {
        eventBus.dispatch('update.node.line.number', e.target.value)
    }
    exportData() {
        eventBus.dispatch('export.content.data', database.database)
    }
    exportHTML() {
        eventBus.dispatch('export.content.html', null)
    }
    upload(e) {
        console.log(e.target.parentNode.querySelector('input'));
        e.target.parentNode.querySelector('input').click();
    }
    inputToUpload(e) {
        eventBus.dispatch('upload.content.json', e)
    }
    uploadImg(e) {
        console.log(e.target.parentNode.querySelector('input'));
        e.target.parentNode.querySelector('input').click();
    }
    inputToUploadImg(e) {
        eventBus.dispatch('image.loader.start',e )
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
                <button class="i" click="uploadImg">ImgUp</button>
                <input type="file" accept="image/png, image/jpeg" style="display:none" change="inputToUploadImg">
                <button class="i">-</button>
                <button class="i">-</button>
                <input class="lineNumber" type="number" placeholder="Line number" click="lineNumber" change="lineNumber">
                <button class="lineNumberBtn">1-| On</button>
                <button class="lineNumberBtn">1-| Off</button>
            </div>
            <div class="actionsContainer">
                <button class="up" click="upload">Upload Json</button>
                <input type="file" accept="application/JSON" style="display:none" change="inputToUpload">
                <button class="down" click="exportData">Download Json</button>
                <button class="export" click="exportHTML">Download HTML</button>
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