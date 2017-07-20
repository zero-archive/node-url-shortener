import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import ShortLinksTable from '../../components/ShortLinksTable';
import PaginationView from '../../components/PaginationView';
import SearchIcon from '../../components/icons/SearchIcon';

const Main = (props) => {
    const { links, onEdit, handleClick } = props;

    return (
      <div>
          <Header handleClick={ () => { return handleClick; } } />
            <div className="soft-double">
              <div className="soft-double--sides flex push-double--top">
                <h2 className="flex flex--1">Short Links</h2>
                <div className="flex flex--1 flex-align--start flex-justified--end">
                  <div className="lego-input-icon display--inline-block">
                    <input type="text" className="oui-text-input soft-triple--sides width--200" placeholder="Search" />
                    <SearchIcon />
                  </div>
                </div>
              </div>
              <ShortLinksTable links={links} onEdit={onEdit}/>
              <PaginationView items={links} onChangePage={ () => { return handleClick; } } />
            </div>
        </div>
    );
};

Main.propTypes = {
    links: PropTypes.array,
    onEdit: PropTypes.func,
    handleClick: PropTypes.func
};

export default Main;
