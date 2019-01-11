
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {orderBy} from 'lodash'
import TablePaginator from './TablePaginator/TablePaginator'
import './Table.scss'

export default class Table extends Component {
    constructor(props) {
      super(props)
        let data = this._makeInternalId(props.data)

      this.state = {
        originalData: this._makeInternalId(props.data),
        data: data,
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
        debugger
        if(props.pageSize > 0) {
            data = this.paginate(data, props.pageSize, props.currentPage)
        }

        this.state.data = data
      }

      this._changePage = this._changePage.bind(this)
    }

    paginate (array, page_size, page_number) {
        --page_number; // because pages logically start with 1, but technically with 0
        return array.slice(page_number * page_size, (page_number + 1) * page_size);
      }
    
      _changePage(data, pageSize, pageNumber) {
          debugger
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
        const {data, columns, pageSize, currentPage, originalData} = this.state

        return (
        <div className="yart">
            {this._createHeader(columns)}
            {this._createBody(data, columns)}
            <TablePaginator totalItems={originalData.length} pageSize={pageSize} selectedPage={currentPage} onChangePage={(index) => this._changePage(originalData, pageSize, index)}></TablePaginator>
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
    pageSize: 1,
    currentPage: 1
  };