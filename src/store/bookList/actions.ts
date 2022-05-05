import {Dispatch} from 'redux'
import {RootState} from '../reducers'
import {IApiResponse, IError, IBookListAction, BookListActionTypes} from '../interfaces'

export const getBookList = () => {

    return (dispatch: Dispatch<IBookListAction>, getState: () => RootState) => {
        const state: RootState = getState();
        let requestData = {
            action: 'get_book_list',
            sessionId: state.user.sessionId
        };

        dispatch( {type: BookListActionTypes.GET_BOOK_LIST_REQUEST} );

        state.api.provider(requestData).then(
            (response: IApiResponse) => {
                if ( response.status === 'success' ) {
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
            },
            (error: IError) => {
                dispatch({
                    type: BookListActionTypes.GET_BOOK_LIST_FAIL,
                    payload: error.message
                });
            }
        );
    };
};

export const removeBook = (bookId: number) => {

    return (dispatch: Dispatch<IBookListAction>, getState: () => RootState) => {
        const state: RootState = getState();
        let requestData = {
            action: 'remove_book',
            bookId: bookId,
            sessionId: state.user.sessionId
        };

        dispatch( {type: BookListActionTypes.REMOVE_LIST_BOOK_REQUEST} );

        state.api.provider(requestData).then(
            (response: IApiResponse) => {
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
            },
            (error: IError) => {
                dispatch({
                    type: BookListActionTypes.REMOVE_LIST_BOOK_FAIL,
                    payload: error.message
                });
            }
        );
    };
};

export const clearActionData = (): IBookListAction => {
    return {
        type: BookListActionTypes.CLEAR_ACTION_DATA
    }
};