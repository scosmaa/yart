import { orderBy, filter } from 'lodash'

export default class ClientTableProvider {
  constructor(data) {
    Object.assign(this, { ...data })
    this.originalData = this._makeInternalId(this.originalData)
    this.filterAndSort(this.filterFields)
  }

  async getData() {
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

    this.filteredData = orderBy(this.filteredData, [this.sortField], [this.sortDirection])
  }

  getFilter() {
    return this.filterFields
  }

  filterAndSort(filterObj) {
    // Filter
    this.filteredData = this.originalData

    if (filterObj && Object.keys(filterObj).length > 0) {
      this.filteredData = filter(this.originalData, elem => {
        let result = false
        Object.keys(filterObj).map(key => {
          if (filterObj[key] === '' || filterObj[key] === null) {
            return
          }
          if (('' + elem[key]).toLowerCase().includes(('' + filterObj[key]).toLowerCase())) {
            result = true
          }
        })
        return result
      })
    }
    debugger
    // Sort
    this.filteredData = orderBy(this.filteredData, [this.sortField], [this.sortDirection])

    return this
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
