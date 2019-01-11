
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {orderBy} from 'lodash'

import './Table.scss'

export default class Table extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         originalData: this._makeInternalId(props.data),
         data: this._makeInternalId(props.data),
         columns: this._makeInternalId(props.columns),
         sortField: props.sortField,
         sortDirection: props.sortDirection,
      }
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
        const {data, columns} = this.state

        return (
        <div className="yart">
            {this._createHeader(columns)}
            {this._createBody(data, columns)}
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
            this.sortBy(columnDef)
        }
    }

    sortBy(columnDef) {
        let {sortField, sortDirection} = this.state
        if (sortField === columnDef.fieldName) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
        } else {
            sortField = columnDef.fieldName
            sortDirection = 'desc'
        }
        this.setState({
            data: orderBy(this.state.originalData, [sortField], [sortDirection]),
            sortField,
            sortDirection
        })
    }

}

Table.propTypes = {
    originalData: PropTypes.array,
    data: PropTypes.array,
    columns: PropTypes.array,
    sortField: PropTypes.string,
    sortDirection: PropTypes.string
}

Table.defaultProps = {
    originalData: [],
    data: [],
    columns: [],
    sortField: null,
    sortDirection: null
  };