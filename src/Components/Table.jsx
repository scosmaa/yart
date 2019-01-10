
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Table.scss'

export default class Table extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         data: props.data,
         columns: this._makeInternalId(props.columns)
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
        return <div className="yart-header">
            {columns.map(elem => <div>{elem.headerContent}</div>)}
        </div>
    }
    render() {
        const {data, columns} = this.state

        return (
        <div className="yart">
            {this._createHeader(columns)}
        </div>
        )
    }
}

Table.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array
}

Table.defaultProps = {
    data: [],
    columns: []
  };