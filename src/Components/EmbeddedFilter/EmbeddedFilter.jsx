import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { omitBy, isEmpty } from 'lodash'

import './EmbeddedFilter.scss'

export default class EmbeddedFilter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filterFields: props.filter
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const name = target.name

    let filterFields = Object.assign(this.state.filterFields, { [name]: target.value })
    filterFields = omitBy(filterFields, isEmpty)

    this.setState(
      {
        filterFields
      },
      () => {
        if (this.props.onFilterChange) {
          this.props.onFilterChange(this.state.filterFields)
        }
      }
    )
  }

  render() {
    const { columns } = this.props
    const { filterFields } = this.state
    return (
      <div className="yart-tfilter">
        {columns.map(elem => {
          return (
            <div key={elem.__id} className={`yart-filter-cell ${elem.responsive}`} style={elem.style}>
              {elem.filterable ? (
                <span>
                  <input type="text" name={elem.fieldName} id="" value={filterFields[elem.fieldName]} onChange={this.handleInputChange} />
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
    )
  }
}

EmbeddedFilter.propTypes = {
  filter: PropTypes.object,
  columns: PropTypes.array,
  onFilterChange: PropTypes.func
}

EmbeddedFilter.defaultProps = {
  columns: [],
  filter: {}
}
