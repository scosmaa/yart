import React, { Component } from 'react'
import { get } from 'lodash'
export default class CellRenderer extends Component {
  render() {
    const { type, elem, columnDef } = this.props
    switch (type) {
      case 'checkbox':
        return <input type="checkbox" value={elem[columnDef.fieldName]} checked={elem[columnDef.fieldName]} />
      default:
        return <span>{get(elem, columnDef.fieldName, columnDef.emptyValue || '')}</span>
    }
  }
}
