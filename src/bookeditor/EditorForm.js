import Component from "../../../js/Component.js";
import eventBus from "../basic/EventBus.js";

class EditorForm extends Component {
    // setState() { return { n: JSON.parse(localStorage.getItem('n')) || 0 } }
    // setChildComponent() { return [Header]; }
    addEventListener() { return ['click'] }
    // doSomething(e) {
    //     console.log('Event: ' + e )
    //     this.state.n++
    //     localStorage.setItem('n', JSON.stringify(this.state.n));
    //     this.setNewState(this.state)
    // }
    duplicateBtn() {
        eventBus.dispatch('duplicate.btn', null)
    }
    template() {
        return `
        <div class="lateral-forms">
            <textarea></textarea>
            <div class="btnContainer">
                <button class="duplicateBtn" click="duplicateBtn">Duplicate</button>
                <button class="deleteBtn">Delete</button>
            </div>
            <div class="typesContainer">
                <button class="h1">h1</button>
                <button class="h2">h2</button>
                <button class="p">p</button>
                <button class="html">html</button>
                <button class="css">css</button>
                <button class="javascript">js</button>
            </div>
            <div class="linenumberContainer">
                <button class="i">ImgUp</button>
                <input type="file" accept="image/png, image/jpeg" style="display:none">
                <button class="i">-</button>
                <button class="i">-</button>
                <input class="lineNumber" type="number" placeholder="Line number">
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