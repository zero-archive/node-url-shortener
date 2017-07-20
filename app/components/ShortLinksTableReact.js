import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'optimizely-oui';

const ShortLinksTable = ({links, onEdit}) => {
    const tableRows = links.map((link, i) => {
        return (
                <Table.TR key={i}>
                    <Table.TD> { link.name } </Table.TD>
                    <Table.TD> { link.createdBy } </Table.TD>
                    <Table.TD> { link.useCount } </Table.TD>
                    <Table.TD> { link.url } </Table.TD>
                    <Table.TD> <button className="oui-button oui-button--tiny float--right"
                        onClick={ () => { return onEdit(link.id); } }>Edit...</button> </Table.TD>
                </Table.TR>
        );
    });
    return (
        <Table
            density="tight"
            style="rule"
            tableLayoutAlgorithm="auto"
        >
            <Table.THead>
                <Table.TR>
                    <Table.TH  width="20%"> Short Link </Table.TH>
                    <Table.TH> Created By </Table.TH>
                    <Table.TH> Use Count </Table.TH>
                    <Table.TH> URL </Table.TH>
                    <Table.TD></Table.TD>
                </Table.TR>
            </Table.THead>
            <Table.TBody>
                { tableRows }
            </Table.TBody>
        </Table>);
};

ShortLinksTable.propTypes = {
    links: PropTypes.array,
    onEdit: PropTypes.func,
    handleClick: PropTypes.func
};

export default ShortLinksTable;

