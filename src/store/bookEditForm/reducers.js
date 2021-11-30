import {
    GET_BOOK_REQUEST, GET_BOOK_SUCCESS, GET_BOOK_FAIL, CLEAR_BOOK_DATA,
    CREATE_BOOK_REQUEST, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAIL,
    UPDATE_BOOK_REQUEST, UPDATE_BOOK_SUCCESS, UPDATE_BOOK_FAIL,
    REMOVE_BOOK_REQUEST, REMOVE_BOOK_SUCCESS, REMOVE_BOOK_FAIL
} from './actions';

const initialState = {
    bookData: {
        id: undefined,
        titleOrig: '',
        titleRus: '',
        authorNameOrig: '',
        authorNameRus: '',
        publicationYear: '',
        coverImageLink: '',
        annotation: '',
        comment: '',
        readStatus: '',
        assessment: ''
    },
    action: {
        type: '',
        status: '',
        message: ''
    }

};

export const bookEditFormReducer = (state = initialState, action) => {

    switch (action.type){

        case GET_BOOK_REQUEST:
            return {
                ...state,
                action: {
                    type: 'get_book',
                    status: 'pending',
                    message: ''
                }
            };
        case GET_BOOK_SUCCESS:
            return {
                ...state,
                bookData: {
                    ...action.payload
                },
                action: {
                    type: 'get_book',
                    status: 'success',
                    message: ''
                },

            };
        case GET_BOOK_FAIL:
            return {
                ...state,
                action: {
                    type: 'get_book',
                    status: 'error',
                    message: action.payload
                }
            };

        case CLEAR_BOOK_DATA:
            return {
                bookData: {},
                action: {
                    type: 'clear_book_data',
                    status: 'success',
                    message: ''
                }
            };

        case CREATE_BOOK_REQUEST:
            return {
                ...state,
                action: {
                    type: 'create_book',
                    status: 'pending',
                    message: ''
                }
            };
        case CREATE_BOOK_SUCCESS:
            return {
                ...state,
                bookData: {
                    ...state.bookData,
                    ...action.payload
                },
                action: {
                    type: 'create_book',
                    status: 'success',
                    message: ''
                }
            };
        case CREATE_BOOK_FAIL:
            return {
                ...state,
                action: {
                    type: 'create_book',
                    status: 'error',
                    message: action.payload
                }
            };

        case UPDATE_BOOK_REQUEST:
            return {
                ...state,
                action: {
                    type: 'update_book',
                    status: 'pending',
                    message: ''
                }
            };
        case UPDATE_BOOK_SUCCESS:
            return {
                ...state,
                bookData: {
                    ...state.bookData,
                    ...action.payload
                },
                action: {
                    type: 'update_book',
                    status: 'success',
                    message: ''
                }
            };
        case UPDATE_BOOK_FAIL:
            return {
                ...state,
                action: {
                    type: 'update_book',
                    status: 'error',
                    message: action.payload
                }
            };

        case REMOVE_BOOK_REQUEST:
            return {
                ...state,
                action: {
                    type: 'remove_book',
                    status: 'pending',
                    message: ''
                }
            };
        case REMOVE_BOOK_SUCCESS:
            return {
                ...state,
                bookData: {},
                action: {
                    type: 'remove_book',
                    status: 'success',
                    message: ''
                }
            };
        case REMOVE_BOOK_FAIL:
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