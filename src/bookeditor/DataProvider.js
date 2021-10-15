import eventBus from "../basic/EventBus.js"

class DataProvider {
    constructor() { }
    start() {
        let data = JSON.parse(localStorage.getItem('data') || "[{\"tag\":\"h1\",\"text\":\"Dummy Text\"}]")//, \"tag\":\"html\"
        eventBus.dispatch('dom.render.page', data)
    }
    stop() { }
}

const dataProvider = new DataProvider()

export default dataProvider