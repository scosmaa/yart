export default class ClientSettingsProvider {
    constructor(data) {
        Object.assign(this, { ...data })
        this.settings.columns = this._makeInternalId(this.settings.columns)
    }

    async getSettings() {
        return this.settings
    }

    _makeInternalId(array) {
        return array.map((elem, id) => {
            return {
                ...elem,
                __id: id
            }
        })
    }
}
