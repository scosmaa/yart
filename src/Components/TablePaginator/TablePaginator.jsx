import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleDoubleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

import './TablePaginator.scss'

export default class TablePaginator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPage: props.selectedPage
        }

        this.goToLastPage = this.goToLastPage.bind(this)
        this.goToFirstPage = this.goToFirstPage.bind(this)
        this.incPage = this.incPage.bind(this)
        this.decPage = this.decPage.bind(this)
    }

    render() {
        return <div className="mw-table-paginator">{this.renderPagesNumber()}</div>
    }

    renderPagesNumber() {
        const numberOfPages = Math.ceil(this.props.totalItems / this.props.pageSize)

        const result = [
            <span key="faAngleDoubleLeft" className="page-arrow" onClick={this.goToFirstPage}>
                <FontAwesomeIcon icon={faAngleDoubleLeft} onClick={this.goToFirstPage} />
            </span>,
            <span key="faAngleLeft" className="page-arrow" onClick={this.decPage}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </span>
        ]
        if (this.state.selectedPage <= 5) {
            const maxNumber = numberOfPages < 9 ? numberOfPages : 9
            for (let index = 1; index < maxNumber + 1; index++) {
                result.push(
                    <span
                        key={index}
                        className={'page-selector ' + (this.state.selectedPage === index ? 'selected' : '')}
                        onClick={() => this.setNewPage(index)}
                    >
                        {index}
                    </span>
                )
            }
        } else {
            const maxNumber = this.state.selectedPage + 4 < numberOfPages ? this.state.selectedPage + 4 : numberOfPages
            for (let index = this.state.selectedPage - 4; index < maxNumber + 1; index++) {
                result.push(
                    <span
                        key={index}
                        className={'page-selector ' + (this.state.selectedPage === index ? 'selected' : '')}
                        onClick={() => this.setNewPage(index)}
                    >
                        {index}
                    </span>
                )
            }
        }

        result.push(
            <span key="faAngleRight" className="page-arrow" onClick={this.incPage}>
                <FontAwesomeIcon icon={faAngleRight} />
            </span>
        )
        result.push(
            <span key="faAngleDoubleRight" className="page-arrow" onClick={this.goToLastPage}>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
            </span>
        )
        return result
    }

    setNewPage(index) {
        this.setState({
            selectedPage: index
        })
        if (this.props.onChangePage) {
            this.props.onChangePage(index)
        }
    }

    goToFirstPage() {
        this.setNewPage(1)
    }

    incPage() {
        const numberOfPages = Math.ceil(this.props.totalItems / this.props.pageSize) + 1
        if (this.state.selectedPage < numberOfPages - 1) {
            this.setNewPage(this.state.selectedPage + 1)
        }
    }

    decPage() {
        if (this.state.selectedPage > 1) {
            this.setNewPage(this.state.selectedPage - 1)
        }
    }

    goToLastPage() {
        const numberOfPages = Math.ceil(this.props.totalItems / this.props.pageSize)
        this.setNewPage(numberOfPages)
    }
}
