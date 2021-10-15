import eventBus from "./EventBus.js";

class ImportFile {
    constructor(){
        this.callback = null;
    }
    start(){
        eventBus.subscribe('upload.content.json',this.uploadContentJson)
    }
    stop(){
        eventBus.unSubscribe('upload.content.json',this.uploadContentJson)
    }
    uploadContentJson = (params)=>{
        this.upload(params.e)
        this.setCallback(params.callback)
    }
    setCallback(callback){
        this.callback = callback
    }
    upload(e) {
        var file = e.target.files[0];
        var textType = 'application/json';
        if (file.type.match(textType)) {
            var reader = new FileReader();
            reader.onload = (e) => {
                console.log('dddddddddddddddddd', this);
                if(this.callback) this.callback(reader.result)
            }
            reader.readAsText(file);//nedded
        } else {
            console.error('error', e)
        }
    }
}

const importFile = new ImportFile();

export default importFile;