import { orderBy } from 'lodash'

export default class ClientTableProvider {
    constructor(data) {
        Object.assign(this, { ...data })
        this.originalData = this._makeInternalId(this.originalData)
        this.filteredData = this.originalData
    }

    getData() {
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
        return this
    }

    sortBy(fieldName) {
        if (this.sortField === fieldName) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
        } else {
            this.sortField = fieldName
            this.sortDirection = 'asc'
        }

        this.filteredData = orderBy(this.originalData, [this.sortField], [this.sortDirection])
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
