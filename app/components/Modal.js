import React from 'react';

const Modal = () => (
    <div class="flex--dead-center height--1-1">
        <div class="lego-dialog">
            <div class="lego-dialog__header">
                <div class="lego-dialog__title">Edit Short Link</div>
            </div>
            <div class="lego-dialog__body">
                <fieldset class="push-double--bottom">
                    <label class="oui-label">URL</label>
                    <input type="text" class="oui-text-input" placeholder="Paste URL to create short link" />
                </fieldset>
                <fieldset class="push-double--bottom">        
                    <label class="oui-label">Short Link</label>
                    <div class="flex flex-align--center">
                    <span class="push-half--right muted">http://www.link.optimizely.com/</span>
                    <input type="text" class="oui-text-input" placeholder="keep-it/short" />
                    </div>
                </fieldset>
            </div>
            <div class="lego-dialog__footer oui-button-row--right">
                <button class="oui-button oui-button--plain">Cancel</button>
                <button class="oui-button oui-button--highlight">Create Short Link</button>
            </div>
            <div class="lego-dialog__close">
                <svg class="lego-icon">
                    <path d="M3.712 16a3.079 3.079 0 0 1-2.192-.908l-.612-.612a3.102 3.102 0 0 1 0-4.382L4.89 6.115c1.173-1.172 3.213-1.172 4.383 0l.613.613a.5.5 0 0 1-.707.707l-.614-.613c-.793-.793-2.176-.793-2.969 0l-3.982 3.982a2.102 2.102 0 0 0 0 2.968l.612.612c.792.792 2.176.794 2.97 0l2.757-2.756a.5.5 0 0 1 .707.707l-2.757 2.756A3.071 3.071 0 0 1 3.712 16z"></path><path d="M8.919 10.793a3.07 3.07 0 0 1-2.19-.908.5.5 0 0 1 .707-.707c.793.793 2.175.793 2.968 0l3.981-3.981c.396-.397.615-.925.615-1.485s-.219-1.088-.615-1.484l-.612-.613a2.102 2.102 0 0 0-2.968 0L8.048 4.371a.5.5 0 0 1-.707-.707L10.098.907a3.104 3.104 0 0 1 4.382 0l.612.613c.586.585.908 1.364.908 2.192 0 .827-.322 1.605-.908 2.191L11.11 9.885a3.078 3.078 0 0 1-2.191.908z"></path>
                    <path d="M6.21 12.417A6.216 6.216 0 0 1 0 6.209 6.216 6.216 0 0 1 6.21 0a6.214 6.214 0 0 1 6.206 6.209 6.214 6.214 0 0 1-6.206 6.208zM6.21 1C3.337 1 1 3.337 1 6.209s2.337 5.208 5.21 5.208c2.87 0 5.206-2.336 5.206-5.208S9.08 1 6.21 1z"></path><path d="M15.5 16a.502.502 0 0 1-.354-.146l-5.25-5.25a.5.5 0 0 1 .707-.707l5.25 5.25A.5.5 0 0 1 15.5 16z"></path>
                </svg>
            </div>
        </div>
    </div>
)

export default Modal;