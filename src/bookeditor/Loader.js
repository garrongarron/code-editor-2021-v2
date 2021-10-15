import eventBus from "../basic/EventBus.js";

class Loader{
    constructor(){}
    load(data){
        data.forEach(params => {
            eventBus.dispatch('dom.add.new.node', params)
        });
    }
    start(){}
    stop(){}
}

const loader = new Loader()

export default loader