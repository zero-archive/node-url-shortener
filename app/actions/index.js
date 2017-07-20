import * as types from './types';

export function editDialog(linkId) {
    return {
        type: types.EDIT,
        linkId
    };
}
