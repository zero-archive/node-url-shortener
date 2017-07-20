import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

class PaginationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        const items = this.props.items;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        const current = currentPage || 1;
        // default page size is 10
        const pageS = pageSize || 10;
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage = 0;
        let endPage = 0;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (current <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (current + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = current - 5;
                endPage = current + 4;
            }
        }

        // calculate start and end item indexes
        const startIndex = (current - 1) * pageS;
        const endIndex = Math.min(startIndex + pageS - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        const pages = _.range(startPage, endPage + 1);
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: current,
            pageSize: pageS,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        const pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
        return (
            <ol className="lego-nav lego-View flex-justified--start push-quad--left">
                <li className={pager.currentPage === 1 ? 'disabled' : 'lego-pagination__first'}>
                    <a onClick={() => this.setPage(1)}>First</a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : 'lego-pagination__prev'}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'lego-pagination__current' : ''}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : 'lego-pagination__next'}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : 'lego-pagination__last'}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
            </ol>
        );
    }
}

PaginationView.propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func,
    initialPage: PropTypes.number
};

PaginationView.defaultProps = {
    initialPage: 1
};

export default PaginationView;


