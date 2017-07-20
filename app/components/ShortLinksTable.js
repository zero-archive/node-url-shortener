import React from 'react';
import PropTypes from 'prop-types';

const ShortLinksTable = ({links, onEdit}) => (
    <table className="oui-table oui-table--rule oui-table--loose">
        <thead>
            <tr>
            <th className="width--200">Short Link</th>
            <th>Created By</th>
            <th>Use Count</th>
            <th>URL</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
        { links.map((link, i) => {
            return (
                <tr key={i}>
                <td className="max-width--200 force-break">{ link.name }</td>
                <td className="max-width--200 truncate">{ link.createdBy }</td>
                <td className="oui-numerical">{ link.useCount }</td>
                <td className="max-width--200 truncate">
                    <a href={ link.url }>{ link.url }</a>
                </td>
                <td>
                    <button className="oui-button oui-button--tiny float--right"
                            onClick={ () => { return onEdit(link.id); } }>Edit...</button>
                </td>
                </tr>
            );
        }) }
        </tbody>
    </table>
);

ShortLinksTable.propTypes = {
    links: PropTypes.array,
    onEdit: PropTypes.func,
    handleClick: PropTypes.func
};

export default ShortLinksTable;
