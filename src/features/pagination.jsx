import React, { Component } from 'react';
import _ from 'lodash';

import './pagination.css';

class Pagination extends Component {
    state = { 
     }
    render() { 
        const {itemsCount, pageSize, currentPage, onPageChange} = this.props;

        /* itemsCount ==> 3dd kol el nas
            pageSize ==> fel saf7a feha kam row
        */

        const pagesCount = Math.ceil(itemsCount / pageSize);
        if (pagesCount === 1) return null;

        const pages = _.range(1, pagesCount + 1);

        return ( 
            <div>
                <nav>
                    <ul className="pagination justify-content-center myPagination">
                        {pages.map(page => 
                            <li className={(currentPage === page ? "page-item active" : "page-item")} key={page}>
                                <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
         );
    }

    
}
 
export default Pagination;