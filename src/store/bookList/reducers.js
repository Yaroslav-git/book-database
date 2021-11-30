import {
    GET_BOOK_LIST_REQUEST, GET_BOOK_LIST_SUCCESS, GET_BOOK_LIST_FAIL,
    REMOVE_LIST_BOOK_REQUEST, REMOVE_LIST_BOOK_SUCCESS, REMOVE_LIST_BOOK_FAIL } from './actions';

const initialState = {
    list: [],
    action: {
        type: '',
        status: '',
        message: ''
    }
};

export const bookListReducer = (state = initialState, action) => {

    switch (action.type){

        case GET_BOOK_LIST_REQUEST:
            return {
                ...state,
                action: {
                    type: 'get_book_list',
                    status: 'pending',
                    message: ''
                }
            };
        case GET_BOOK_LIST_SUCCESS:
            return {
                list: [...action.payload],
                action: {
                    type: 'get_book_list',
                    status: 'success',
                    message: ''
                }
            };
        case GET_BOOK_LIST_FAIL:
            return {
                ...state,
                action: {
                    type: 'get_book_list',
                    status: 'error',
                    message: action.payload
                }
            };

        case REMOVE_LIST_BOOK_REQUEST:
            return {
                ...state,
                action: {
                    type: 'remove_book',
                    status: 'pending',
                    message: ''
                }
            };
        case REMOVE_LIST_BOOK_SUCCESS:
            let newList = state.list.filter(book => (book.id !== action.payload));
            return {
                list: newList,
                action: {
                    type: 'remove_book',
                    status: 'success',
                    message: ''
                }
            };
        case REMOVE_LIST_BOOK_FAIL:
            return {
                ...state,
                action: {
                    type: 'remove_book',
                    status: 'error',
                    message: action.payload
                }
            };

        default:
            return state;
    }
};