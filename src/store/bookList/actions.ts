import {Dispatch} from 'redux'
import {RootState} from '../reducers'
import {IApiBook, IBookListAction, BookListActionTypes} from '../interfaces'

export const getBookList = () => {

    return async (dispatch: Dispatch<IBookListAction>, getState: () => RootState) => {
        const state: RootState = getState();

        dispatch( {type: BookListActionTypes.GET_BOOK_LIST_REQUEST} );
        try {
            let response: Array<IApiBook> = await state.api.provider('read', 'users/'+state.user.userId+'/books');

            if ( response ) {
                dispatch({
                    type: BookListActionTypes.GET_BOOK_LIST_SUCCESS,
                    payload: response
                });
            }
            else {
                dispatch({
                    type: BookListActionTypes.GET_BOOK_LIST_FAIL,
                    payload: 'get user books error'
                });
            }
        } catch (error: any) {
            dispatch({
                type: BookListActionTypes.GET_BOOK_LIST_FAIL,
                payload: error.message
            });
        }
    };
};

export const removeBook = (bookId: number) => {

    return async (dispatch: Dispatch<IBookListAction>, getState: () => RootState) => {
        const state: RootState = getState();

        dispatch( {type: BookListActionTypes.REMOVE_LIST_BOOK_REQUEST} );

        try {
            let response: string = await state.api.provider('delete', 'users/'+state.user.userId+'/books/'+bookId);
            if ( response ) {
                dispatch({
                    type: BookListActionTypes.REMOVE_LIST_BOOK_SUCCESS,
                    payload: bookId
                });
            }
            else {
                dispatch({
                    type: BookListActionTypes.REMOVE_LIST_BOOK_FAIL,
                    payload: 'delete book error'
                });
            }
        } catch (error: any) {
            dispatch({
                type: BookListActionTypes.REMOVE_LIST_BOOK_FAIL,
                payload: error.message
            });
        }
    };
};

export const clearActionData = (): IBookListAction => {
    return {
        type: BookListActionTypes.CLEAR_ACTION_DATA
    }
};