import eventBus from "./EventBus.js";

class ImageLoader {
    constructor() { }
    start() {
        eventBus.subscribe('image.loader.start', this.upload)
    }
    upload = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            // eventBus.dispatch('duplicate.btn', null)
            eventBus.dispatch('core.image.loaded', reader.result)
        }
        reader.readAsDataURL(file);//needed
    }
    stop() {
        eventBus.unSubscribe('image.loader.start', this.upload)
    }
}

const imageLoader = new ImageLoader()

export default imageLoader