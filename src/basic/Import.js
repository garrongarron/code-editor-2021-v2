import eventBus from "./EventBus.js";

class ImportFile {
    start() {
        eventBus.subscribe('upload.content.json', this.upload)
    }
    stop() {
        eventBus.unSubscribe('upload.content.json', this.upload)
    }
    upload(e) {
        var file = e.target.files[0];
        var textType = 'application/json';
        if (file.type.match(textType)) {
            var reader = new FileReader();
            reader.onload = (e) => {
                eventBus.dispatch('core.data.loaded', reader.result)
            }
            reader.readAsText(file);//nedded
        } else {
            console.error('error', e)
        }
    }
}

const importFile = new ImportFile();

export default importFile;