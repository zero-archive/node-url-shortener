import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'optimizely-oui';

import Logo from './Logo';
import LinkIcon from './icons/LinkIcon';

const Header = (props) => (
    <header className="background--faint flex soft-quad">
        <div className="flex flex--1 flex-align--center">
            <span className="push--right push-half--top">
                <Logo />
            </span>
            <h3 className="flush caps">Go Better</h3>
        </div>
        <div className="flex flex--1 flex-align--center">
        <div className="flex flex--1 lego-input-icon display--inline-block push--right">
            <input type="text" className="oui-text-input soft-triple--sides" placeholder="Paste URL to create short link" />
            <LinkIcon />
        </div>
            <Button onClick={props.handleClick} style="highlight">Add Short Link...</Button>
        </div>
    </header>
);

Header.propTypes = {
    handleClick: PropTypes.func
};

export default Header;
