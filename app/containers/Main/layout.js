import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';

const Main = (props) => {
    const { onEdit } = props;
    let input;

    return (
      <div>
        <Header onClick={ () => console.log('whaaaaaattttt') }/>
        <div className="soft-double">
          <div className="soft-double--sides flex push-double--top">
            <h2 className="flex flex--1">Short Links</h2>
            <div className="flex flex--1 flex-align--start flex-justified--end">
              <div className="lego-input-icon display--inline-block">
                <input type="text" className="oui-text-input soft-triple--sides width--200" placeholder="Search"/>
                <svg className="lego-icon lego-input-icon__left lego-input-icon__muted">
                  <path d="M6.21 12.417A6.216 6.216 0 0 1 0 6.209 6.216 6.216 0 0 1 6.21 0a6.214 6.214 0 0 1 6.206 6.209 6.214 6.214 0 0 1-6.206 6.208zM6.21 1C3.337 1 1 3.337 1 6.209s2.337 5.208 5.21 5.208c2.87 0 5.206-2.336 5.206-5.208S9.08 1 6.21 1z"></path><path d="M15.5 16a.502.502 0 0 1-.354-.146l-5.25-5.25a.5.5 0 0 1 .707-.707l5.25 5.25A.5.5 0 0 1 15.5 16z"></path>
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
              <td className="max-width--200 force-break">2017adeptkickoff</td>
              <td className="max-width--200 truncate">Keith N.</td>
              <td className="oui-numerical">3</td>
              <td className="max-width--200 truncate">
                <a href="">https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit</a>
              </td>
              <td>
                <button className="oui-button oui-button--tiny float--right" onClick={ () => { return onEdit(123); } }>Edit...</button>
              </td>
            </tr>
            <tr>
              <td className="max-width--200 force-break">2017adeptkickoffbutwithanevenlongerslugjustbecause</td>
              <td className="max-width--200 truncate">Anotherpersonyo B.</td>
              <td className="oui-numerical">6,665,555</td>
              <td className="max-width--200 truncate">
                <a href="">https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit</a>
              </td>
              <td>
                <button className="oui-button oui-button--tiny float--right">Edit...</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <ol className="lego-nav lego-pagination flex-justified--start push-quad--left">
          <li className="lego-pagination__first"><a href="#">First</a></li>
          <li className="lego-pagination__prev"><a href="#">Previous</a></li>
          <li><a href="/page/1">1</a></li>
          <li><a href="/page/2">2</a></li>
          <li className="lego-pagination__current"><a href="/page/3">3</a></li>
          <li><a href="/page/4">4</a></li>
          <li><a href="/page/5">5</a></li>
          <li className="lego-pagination__next"><a href="/page/next">Next</a></li>
          <li className="lego-pagination__last"><a href="/page/last">Last</a></li>
        </ol>
      </div>
    );
};

Main.propTypes = {
    onEdit: PropTypes.func
};

export default Main;