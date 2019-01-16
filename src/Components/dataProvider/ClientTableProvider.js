import { timingSafeEqual } from 'crypto'

export default class ClientTableProvider {
    constructor(data) {
        Object.assign(this, { ...data })
        this.originalData = this._makeInternalId(this.originalData)
        this.filteredData = this.originalData
    }

    getData() {
        debugger
        const pageNumber = this.currentPage - 1 // because pages logically start with 1, but technically with 0
        return this.filteredData.slice(pageNumber * this.pageSize, (pageNumber + 1) * this.pageSize)
    }

    count() {
        return this.filteredData.length
    }

    getPageSize() {
        return this.pageSize
    }

    getSelectedPage() {
        return this.currentPage
    }

    changePage(index) {
        this.currentPage = index
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
