// import PropTypes from 'prop-types';
import React from 'react';
// import { connect } from 'react-redux';
import Header from '../components/Header';

const Main = () => {
    let input;

    return (
    <div>
        <Header />
        <div className="soft-double">
            <div className="soft-double--sides flex push-double--top">
                <h2 className="flex flex--1">Short Links</h2>
                <div className="flex flex--1 flex-align--start flex-justified--end">

                <div className="lego-input-icon display--inline-block">
                    <input type="text" className="oui-text-input soft-triple--sides width--200" placeholder="Search" />
                    <svg className="lego-icon lego-input-icon__left lego-input-icon__muted">
                    </svg>
                </div>

                </div>
            </div>
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
                <tr>
                <td>2017adeptkickoff</td>
                <td>Keith N.</td>
                <td className="oui-numerical">3</td>
                <td><a href="">https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit</a></td>
                <td><button className="oui-button oui-button--tiny float--right">Edit...</button></td>
                </tr>
                <tr>
                <td className="max-width--200 truncate">2017adeptkickoffbutwithanevenlongerslugjustbecause</td>
                <td className="max-width--200 truncate">Anotherpersonyo B.</td>
                <td className="oui-numerical">6,665,555</td>
                <td className="max-width--200 truncate">
                    <a href="">https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit</a></td>
                <td><button className="oui-button oui-button--tiny float--right">Edit...</button></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    );
};

// Main.propTypes = {
//     filter: PropTypes.string,
//     onFilter: PropTypes.func
// };

// const mapStateToProps = (state) => {
//     return {
//         filter: state.filter
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onFilter: filterText => dispatch(filterTable(filterText))
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Main);

export default Main;

