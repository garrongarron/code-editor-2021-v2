import cache from "./Cache.js";
import eventBus from "./EventBus.js";

class ExportFile {
    start() {
        eventBus.subscribe('export.content.html', this.downloadHTML)
        eventBus.subscribe('export.content.data', this.download)
    }
    stop() {
        eventBus.unSubscribe('export.content.html', this.downloadHTML)
        eventBus.unSubscribe('export.content.data', this.download)
    }
    download(data) {
        console.log('exportData', data);
        let fileContent = data ? JSON.stringify(data) : localStorage.getItem('data') || '[]';
        var fileName = prompt("File name", "Demo");
        if (fileName != null) {
            const blob = new Blob([fileContent], { type: 'application/json' });
            const a = document.createElement('a');
            a.setAttribute('download', fileName);
            a.setAttribute('href', window.URL.createObjectURL(blob));
            a.click();
        }
    }
    hideEditor() {
        if (!document.querySelector('.lateral-forms')) return;
        let editor = document.querySelector('.lateral-forms')
        cache.appendChild(editor)
        return editor
    }
    restoreEditor(editor = null) {
        if (!editor) return;
        document.body.appendChild(editor)
    }

    downloadHTML = (selector = null) => {
        let editor = this.hideEditor()
        let title = document.title
        var fileName = prompt("File name", "index");

        if (fileName != null) {
            document.title = fileName
            let dataScript = document.createElement('span')
            document.body.appendChild(dataScript)
            //Restoring
            let data = localStorage.getItem('data')
            dataScript.textContent = 'let data = `' + data + '`'
            dataScript.style.display = `none`

            //prepare to download
            let fileContent = '<!DOCTYPE html>' + document.querySelector((selector) ? selector : 'html').outerHTML;
            document.head.querySelector('title').innerText = fileName
            const blob = new Blob([fileContent], { type: 'text/html' });
            const a = document.createElement('a');
            a.setAttribute('download', fileName);
            a.setAttribute('href', window.URL.createObjectURL(blob));
            a.click();

            dataScript.remove()
            document.title = title
            this.restoreEditor(editor)
        }
    }
}
const exportFile = new ExportFile();
export default exportFile;