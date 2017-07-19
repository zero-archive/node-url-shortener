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
                <svg className="lego-icon lego-input-icon__left lego-input-icon__muted"><path d="M3.712 16a3.079 3.079 0 0 1-2.192-.908l-.612-.612a3.102 3.102 0 0 1 0-4.382L4.89 6.115c1.173-1.172 3.213-1.172 4.383 0l.613.613a.5.5 0 0 1-.707.707l-.614-.613c-.793-.793-2.176-.793-2.969 0l-3.982 3.982a2.102 2.102 0 0 0 0 2.968l.612.612c.792.792 2.176.794 2.97 0l2.757-2.756a.5.5 0 0 1 .707.707l-2.757 2.756A3.071 3.071 0 0 1 3.712 16z"></path><path d="M8.919 10.793a3.07 3.07 0 0 1-2.19-.908.5.5 0 0 1 .707-.707c.793.793 2.175.793 2.968 0l3.981-3.981c.396-.397.615-.925.615-1.485s-.219-1.088-.615-1.484l-.612-.613a2.102 2.102 0 0 0-2.968 0L8.048 4.371a.5.5 0 0 1-.707-.707L10.098.907a3.104 3.104 0 0 1 4.382 0l.612.613c.586.585.908 1.364.908 2.192 0 .827-.322 1.605-.908 2.191L11.11 9.885a3.078 3.078 0 0 1-2.191.908z"></path></svg>
            </div>
                <button className="oui-button oui-button--highlight oui-button--disabled">Add Short Link...</button>
            </div>
        </header>
    </div>
);

export default Header;
