
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {orderBy} from 'lodash'
import TablePaginator from './TablePaginator/TablePaginator'
import './Table.scss'

import ClientTableProvider from './dataProvider/ClientTableProvider'

export default class Table extends Component {
    constructor(props) {
      super(props)
        
       this.dataProvider = new ClientTableProvider({
          originalData: this._makeInternalId(props.data),
          sortField: props.sortField,
          sortDirection: props.sortDirection,
          pageSize: props.pageSize,
          currentPage: props.currentPage
        })

        let data = this.dataProvider.getData()

      this.state = {
        data: this.dataProvider.get,
        columns: this._makeInternalId(props.columns),
        sortField: props.sortField,
        sortDirection: props.sortDirection,
        pageSize: props.pageSize,
        currentPage: props.currentPage
     }

     if (props.pageSize !== -1 || props.sortField) {
        if (props.sortField) {
            data = this.sortBy(props.sortField).data
        }
        this.state.data = data
      }

      this._changePage = this._changePage.bind(this)
    }

    
    
      _changePage(data, pageSize, pageNumber) {
        this.dataProvider.cha()
          const newPage = this.paginate(data, pageSize, pageNumber)
          this.setState({
              data: newPage,
              curentPage: pageNumber
          })
      }

    _makeInternalId(columns) {
        return columns.map((elem, id) => {return {
            ...elem,
            __id: id
        }})
    }

    _createHeader(columns) {
        console.log(columns)
        return <div className="yart-thead">
            {columns.map(elem => {
                return <div className="yart-th" style={elem.style} onClick={(evt) => this._onThClick(evt, elem)}>{elem.headerContent}</div>
            }
            )}
        </div>
    }

    _createBody(data,columns) {
        return <div className="yart-tbody">
            {data.map(elem => {
                return <div key={elem.__id} className="yart-row">
                {columns.map(column => {
                    console.log(data, [column.fieldName])
                    return <div className="yart-td" style={column.style}>{this._renderContent(column.type, elem[column.fieldName])}</div>
                })}
                </div>
            }
            )}
        </div>
    }

    render() {
        const {data, columns, pageSize, currentPage } = this.state
      debugger
        return (
        <div className="yart">
            {this._createHeader(columns)}
            {this._createBody(this.dataProvider.getData(), columns)}
            <TablePaginator 
              totalItems={this.dataProvider.count()} 
              pageSize={this.dataProvider.getPageSize()} 
              selectedPage={this.dataProvider.getSelectedPage()}
              onChangePage={(index) => this._changePage(index)}></TablePaginator>
        </div>
        )
    }

    _renderContent(type, value) {
        switch (type) {
            case 'checkbox':
                return <input type="checkbox" value={value} checked={value}></input>        
            default:
                return <span>{value}</span>
        }
    }

    _onThClick(evt, columnDef) {
        if(columnDef.sortable) {
            const data = this.sortBy(columnDef)
            this.setState({
                ...data
            })
        }
    }

    sortBy(columnDef) {
        const fieldName = typeof columnDef === 'string' ? columnDef : columnDef.fieldName
        let {sortField, sortDirection} = this.state
        if (sortField === fieldName) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
        } else {
            sortField = fieldName
            sortDirection = 'asc'
        }

        return {
            data: orderBy(this.state.originalData, [sortField], [sortDirection]),
            sortField,
            sortDirection
        }
    }

}

Table.propTypes = {
    originalData: PropTypes.array,
    data: PropTypes.array,
    columns: PropTypes.array,
    sortField: PropTypes.string,
    sortDirection: PropTypes.string,
    pageSize: PropTypes.number,
    curentPage: PropTypes.number
}

Table.defaultProps = {
    originalData: [],
    data: [],
    columns: [],
    sortField: null,
    sortDirection: null,
    pageSize: 4,
    currentPage: 1
  };