import {BookEditActionTypes, IBookEditAction} from '../interfaces';
import {IBookForm} from '../../component/interfaces'

const initialState: IBookForm = {
    book: {
        id: null,
        titleOrig: '',
        titleRus: '',
        authorNameOrig: '',
        authorNameRus: '',
        publicationYear: null,
        coverImageLink: '',
        annotation: '',
        comment: '',
        readStatus: '',
        assessment: null
    },
    action: {
        type: '',
        status: '',
        message: ''
    }

};

export const bookEditFormReducer = (state: IBookForm = initialState, action: IBookEditAction) => {

    switch (action.type){

        case BookEditActionTypes.GET_BOOK_REQUEST:
            return {
                book: state.book,
                action: {
                    type: 'get_book',
                    status: 'pending',
                    message: ''
                }
            };
        case BookEditActionTypes.GET_BOOK_SUCCESS:
            return {
                book: {
                    ...action.payload
                },
                action: {
                    type: 'get_book',
                    status: 'success',
                    message: ''
                },

            };
        case BookEditActionTypes.GET_BOOK_FAIL:
            return {
                book: state.book,
                action: {
                    type: 'get_book',
                    status: 'error',
                    message: action.payload
                }
            };

        case BookEditActionTypes.CLEAR_BOOK_DATA:
            return {
                book: {},
                action: {
                    type: 'clear_book_data',
                    status: 'success',
                    message: ''
                }
            };

        case BookEditActionTypes.CREATE_BOOK_REQUEST:
            return {
                book: state.book,
                action: {
                    type: 'create_book',
                    status: 'pending',
                    message: ''
                }
            };
        case BookEditActionTypes.CREATE_BOOK_SUCCESS:
            return {
                book: {
                    ...state.book,
                    ...action.payload
                },
                action: {
                    type: 'create_book',
                    status: 'success',
                    message: ''
                }
            };
        case BookEditActionTypes.CREATE_BOOK_FAIL:
            return {
                book: state.book,
                action: {
                    type: 'create_book',
                    status: 'error',
                    message: action.payload
                }
            };

        case BookEditActionTypes.UPDATE_BOOK_REQUEST:
            return {
                book: state.book,
                action: {
                    type: 'update_book',
                    status: 'pending',
                    message: ''
                }
            };
        case BookEditActionTypes.UPDATE_BOOK_SUCCESS:
            return {
                book: {
                    ...state.book,
                    ...action.payload
                },
                action: {
                    type: 'update_book',
                    status: 'success',
                    message: ''
                }
            };
        case BookEditActionTypes.UPDATE_BOOK_FAIL:
            return {
                book: state.book,
                action: {
                    type: 'update_book',
                    status: 'error',
                    message: action.payload
                }
            };

        case BookEditActionTypes.REMOVE_BOOK_REQUEST:
            return {
                book: state.book,
                action: {
                    type: 'remove_book',
                    status: 'pending',
                    message: ''
                }
            };
        case BookEditActionTypes.REMOVE_BOOK_SUCCESS:
            return {
                book: {},
                action: {
                    type: 'remove_book',
                    status: 'success',
                    message: ''
                }
            };
        case BookEditActionTypes.REMOVE_BOOK_FAIL:
            return {
                book: state.book,
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