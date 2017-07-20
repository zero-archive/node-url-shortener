import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
// import * as types from '../actions/types';

const dummyData = [
    {
        id: '001',
        createdBy: 'Keith N',
        useCount: 3,
        name: '2017adeptkickoff',
        url: 'https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit'
    },
    {
        id: '002',
        createdBy: 'Dae-Ho C',
        useCount: 666,
        name: '2017adeptkickoffbutwithanevenlongerslugjustbecause',
        url: 'https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit'
    },
    {
        id: '003',
        createdBy: 'Jay L',
        useCount: 777,
        name: 'OKR busting',
        url: 'https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit'
    },    {
        id: '004',
        createdBy: 'Keith N',
        useCount: 3,
        name: '2017adeptkickoff',
        url: 'https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit'
    },
    {
        id: '005',
        createdBy: 'Dae-Ho C',
        useCount: 666,
        name: '2017adeptkickoffbutwithanevenlongerslugjustbecause',
        url: 'https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit'
    },
    {
        id: '006',
        createdBy: 'Jay L',
        useCount: 777,
        name: 'OKR busting',
        url: 'https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit'
    },    {
        id: '007',
        createdBy: 'Keith N',
        useCount: 3,
        name: '2017adeptkickoff',
        url: 'https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit'
    },
    {
        id: '008',
        createdBy: 'Dae-Ho C',
        useCount: 666,
        name: '2017adeptkickoffbutwithanevenlongerslugjustbecause',
        url: 'https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit'
    },
    {
        id: '009',
        createdBy: 'Jay L',
        useCount: 777,
        name: 'OKR busting',
        url: 'https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit'
    },    {
        id: '010',
        createdBy: 'Keith N',
        useCount: 3,
        name: '2017adeptkickoff',
        url: 'https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit'
    },
    {
        id: '011',
        createdBy: 'Dae-Ho C',
        useCount: 666,
        name: '2017adeptkickoffbutwithanevenlongerslugjustbecause',
        url: 'https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit'
    },
    {
        id: '012',
        createdBy: 'Jay L',
        useCount: 777,
        name: 'OKR busting',
        url: 'https://docs.google.com/presentation/d/1npOyIson3Uoz2irgWEKRh-JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRhJjMCI9jccYiyCd_r6suG4/edit/presentation/d/1npOyIson3Uoz2irgWEKRh?=JjMCI9jccYiyCd_r6suG4/edit'
    }
];

const links = (state = dummyData, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    links,
    routing
});

export default rootReducer;
