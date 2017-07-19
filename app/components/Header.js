import React from 'react';
import Logo from './Logo';

const Header = () => (
    <div className="soft-quad">
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
            </div>
                <button className="oui-button oui-button--highlight oui-button--disabled">Add Short Link...</button>
            </div>
        </header>
    </div>
);

export default Header;
