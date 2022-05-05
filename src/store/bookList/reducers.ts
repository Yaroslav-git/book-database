import {BookListActionTypes, IBookListAction} from '../interfaces';
import {IBookList} from "../../component/interfaces";

const initialState: IBookList = {
    list: [],
    action: {
        type: '',
        status: '',
        message: ''
    }
};

export const bookListReducer = (state: IBookList = initialState, action: IBookListAction): IBookList => {

    switch (action.type){

        case BookListActionTypes.GET_BOOK_LIST_REQUEST:
            return {
                list: state.list,
                action: {
                    type: 'get_book_list',
                    status: 'pending',
                    message: ''
                }
            };
        case BookListActionTypes.GET_BOOK_LIST_SUCCESS:
            return {
                list: [...action.payload],
                action: {
                    type: 'get_book_list',
                    status: 'success',
                    message: ''
                }
            };
        case BookListActionTypes.GET_BOOK_LIST_FAIL:
            return {
                list: state.list,
                action: {
                    type: 'get_book_list',
                    status: 'error',
                    message: action.payload
                }
            };

        case BookListActionTypes.REMOVE_LIST_BOOK_REQUEST:
            return {
                list: state.list,
                action: {
                    type: 'remove_book',
                    status: 'pending',
                    message: ''
                }
            };
        case BookListActionTypes.REMOVE_LIST_BOOK_SUCCESS:
            let newList = state.list.filter(book => (book.id !== action.payload));
            return {
                list: newList,
                action: {
                    type: 'remove_book',
                    status: 'success',
                    message: ''
                }
            };
        case BookListActionTypes.REMOVE_LIST_BOOK_FAIL:
            return {
                list: state.list,
                action: {
                    type: 'remove_book',
                    status: 'error',
                    message: action.payload
                }
            };

        case BookListActionTypes.CLEAR_ACTION_DATA:
            return {
                list: state.list,
                action: {
                    type: 'clear_action_data',
                    status: 'success',
                    message: ''
                }
            };

        default:
            return state;
    }
};