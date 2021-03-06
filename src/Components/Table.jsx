import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TablePaginator from './TablePaginator/TablePaginator'
import CellRenderer from './CellRenderer/CellRenderer'
import EmbeddedFilter from './EmbeddedFilter/EmbeddedFilter'

import './Table.scss'

import ClientTableProvider from './dataProvider/ClientTableProvider'
import ClientSettingsProvider from './dataProvider/ClientSettingsProvider'

export default class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      settings: null
    }

    this._changePage = this._changePage.bind(this)
    this._onFilterChange = this._onFilterChange.bind(this)
  }

  async componentWillMount() {
    this.settingsProvider = new ClientSettingsProvider({
      settings: this.props.settings
    })

    const settings = await this.settingsProvider.getSettings()

    this.dataProvider = new ClientTableProvider({
      originalData: this.props.data,
      sortField: settings.sortField,
      sortDirection: settings.sortDirection,
      pageSize: settings.pageSize,
      currentPage: settings.currentPage,
      filterFields: settings.filterFields
    })

    this.setState({
      data: await this.dataProvider.getData(),
      settings: settings
    })
  }

  _createHeader(columns) {
    return (
      <div className="yart-thead">
        {columns.map(elem => {
          return (
            <div key={elem.__id} className={`yart-th ${elem.responsive}`} style={elem.style}>
              <span className={`${elem.sortable ? 'yart-sortable' : ''}`} onClick={evt => this._onThClick(evt, elem)}>
                {elem.headerContent}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  _createBody(data, columns) {
    return (
      <div className="yart-tbody">
        {data.map((elem, index) => {
          return (
            <div key={elem.__id} className={`yart-row ${index % 2 === 0 ? 'yart-even' : 'yart-odd'}`}>
              {columns.map(column => {
                console.log(data, [column.fieldName])
                return (
                  <div key={column.__id} className={`yart-td ${column.responsive}`} style={column.style}>
                    <CellRenderer type={column.type} elem={elem} columnDef={column} />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { data, settings } = this.state
    if (!data || !settings) {
      return null
    }
    return (
      <div className="yart">
        {this._createHeader(settings.columns)}
        <EmbeddedFilter columns={settings.columns} filter={this.dataProvider.getFilter()} onFilterChange={this._onFilterChange} />
        {this._createBody(data, settings.columns)}
        <TablePaginator
          totalItems={this.dataProvider.count()}
          pageSize={this.dataProvider.getPageSize()}
          selectedPage={this.dataProvider.getSelectedPage()}
          onChangePage={index => this._changePage(index)}
        />
      </div>
    )
  }

  async _onThClick(evt, columnDef) {
    if (columnDef.sortable) {
      this.dataProvider.sortBy(columnDef.fieldName)
      this.setState({
        data: await this.dataProvider.getData()
      })
    }
  }

  async _changePage(pageNumber) {
    const pageData = await this.dataProvider.changePage(pageNumber).getData()
    this.setState({
      data: pageData
    })
  }

  async _onFilterChange(filterFields) {
    debugger
    const pageData = await this.dataProvider.filterAndSort(filterFields).getData()
    this.setState({
      data: pageData
    })
  }
}

Table.propTypes = {
  originalData: PropTypes.array,
  data: PropTypes.array,
  settings: PropTypes.object,
  sortField: PropTypes.string,
  sortDirection: PropTypes.string,
  pageSize: PropTypes.number,
  curentPage: PropTypes.number
}

Table.defaultProps = {
  originalData: [],
  data: [],
  settings: null,
  sortField: null,
  sortDirection: null,
  pageSize: 4,
  currentPage: 1
}
