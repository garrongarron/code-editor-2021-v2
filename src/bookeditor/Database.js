import eventBus from "../basic/EventBus.js"

class Database {
    constructor() {
        this.database = []
        this.afterSet = null
    }
    loadData(database) {
        this.database = database
    }
    databaseImageLoaded = (blob) => {
        this.database[request.index].text = blob
        this.database[request.index].tag = 'img'
        this.save()
        eventBus.dispatch('request.dom.update.node', {
            index: request.index,
            data: this.database[request.index]
        })
    }
    requestDatabaseUpdate = (request) => {
        this.database[request.index].text = request.text
        this.save()
        eventBus.dispatch('request.dom.update.node', {
            index: request.index,
            data: this.database[request.index]
        })
    }
    databaseDuplicate = (index) => {
        let params = this.duplicate(index)
        eventBus.dispatch('request.dom.duplicate.node', params)
    }
    createFirst = (params) => {
        this.set(params.index, params.data)
    }
    dataloaded = (data) => {
        this.setDatabase(data)
    }
    databaseUpdateTag = (params) => {
        this.database[params.index].tag = params.tag
        this.save()
        eventBus.dispatch('request.dom.update.node', {
            index: params.index,
            data: this.database[params.index]
        })
    }
    databaseSetImg = (params) => {
        this.database[params.index].tag = params.tag
        this.database[params.index].text = params.text
        this.database[params.index].blob = params.blob
        this.save()
        eventBus.dispatch('request.dom.update.node', {
            index: params.index,
            data: this.database[params.index]
        })
    }
    databaseUpdateLineNumber = (params) => {
        this.database[params.index].lineNumber = params.lineNumber
        this.save()
        eventBus.dispatch('request.dom.update.node', {
            index: params.index,
            data: this.database[params.index]
        })
    }
    databaseDeleteElement = (index) => {
        this.delete(index)
    }
    start() {
        eventBus.subscribe('database.image.loaded', this.databaseImageLoaded)
        eventBus.subscribe('request.database.update', this.requestDatabaseUpdate)
        eventBus.subscribe('database.duplicate', this.databaseDuplicate)
        eventBus.subscribe('create.first', this.createFirst)
        eventBus.subscribe('data.loaded', this.dataloaded)
        eventBus.subscribe('database.update.tag', this.databaseUpdateTag)
        eventBus.subscribe('database.set.img', this.databaseSetImg)
        eventBus.subscribe('database.update.line.number', this.databaseUpdateLineNumber)
        eventBus.subscribe('database.delete.element', this.databaseDeleteElement)
    }
    stop() {
        eventBus.unSubscribe('database.image.loaded', this.databaseImageLoaded)
        eventBus.unSubscribe('request.database.update', this.requestDatabaseUpdate)
        eventBus.unSubscribe('database.duplicate', this.databaseDuplicate)
        eventBus.unSubscribe('create.first', this.createFirst)
        eventBus.unSubscribe('data.loaded', this.dataloaded)
        eventBus.unSubscribe('database.update.tag', this.databaseUpdateTag)
        eventBus.unSubscribe('database.set.img', this.databaseSetImg)
        eventBus.unSubscribe('database.update.line.number', this.databaseUpdateLineNumber)
        eventBus.unSubscribe('database.delete.element', this.databaseDeleteElement)
    }

    duplicate(index) {
        let data = Object.assign({}, this.get(index))
        database.insert(index, data)
        return { index, data }
    }
    insert(index, data) {
        let emptyIndex = index + 1
        this.database.splice(emptyIndex, 0, data);
        this.save()
    }
    get(index) {
        return this.database[index]
    }
    set(index, data) {
        this.database[index] = data
        this.save()
    }
    setDatabase(database) {
        this.database = database
    }
    delete(index) {
        this.database = this.database.filter((node, i) => {
            return index != i
        })
        this.save()
    }
    save() {
        let data = JSON.stringify(this.database)
        localStorage.setItem('data', data)
    }
}

const database = new Database()

export default database
