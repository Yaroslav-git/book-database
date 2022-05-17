import {Dispatch} from 'redux'
import {RootState} from '../reducers'
import {IApiResponse, IBookListAction, BookListActionTypes} from '../interfaces'

export const getBookList = () => {

    return async (dispatch: Dispatch<IBookListAction>, getState: () => RootState) => {
        const state: RootState = getState();
        let requestData = {
            action: 'get_book_list',
            sessionId: state.user.sessionId
        };

        dispatch( {type: BookListActionTypes.GET_BOOK_LIST_REQUEST} );
        try {
            let response: IApiResponse = await state.api.provider(requestData);

            if (response.status === 'success') {
                dispatch({
                    type: BookListActionTypes.GET_BOOK_LIST_SUCCESS,
                    payload: response.data
                });
            }
            else {
                dispatch({
                    type: BookListActionTypes.GET_BOOK_LIST_FAIL,
                    payload: response.status === 'error' ? response.message : ''
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
        let requestData = {
            action: 'remove_book',
            bookId: bookId,
            sessionId: state.user.sessionId
        };

        dispatch( {type: BookListActionTypes.REMOVE_LIST_BOOK_REQUEST} );

        try {
            let response: IApiResponse = await state.api.provider(requestData);
            if ( response.status === 'success' ) {
                dispatch({
                    type: BookListActionTypes.REMOVE_LIST_BOOK_SUCCESS,
                    payload: bookId
                });
            }
            else {
                dispatch({
                    type: BookListActionTypes.REMOVE_LIST_BOOK_FAIL,
                    payload: response.status === 'error' ? response.message : ''
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