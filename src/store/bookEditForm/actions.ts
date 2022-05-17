import {Dispatch} from 'redux'
import {IApiResponse, IError, BookEditActionTypes, IBookEditAction} from '../interfaces'
import {RootState} from '../reducers'
import {IBook} from '../../component/interfaces'
import {async} from "q";

export const getBook = (bookId: number) => {

    return async (dispatch: Dispatch<IBookEditAction>, getState: () => RootState) => {
        const state: RootState = getState();
        let requestData = {
            action: 'get_book',
            bookId: bookId,
            sessionId: state.user.sessionId
        };

        dispatch( {type: BookEditActionTypes.GET_BOOK_REQUEST} );

        try {
            let response: IApiResponse = await state.api.provider(requestData);

            if ( response.status === 'success' ) {
                dispatch({
                    type: BookEditActionTypes.GET_BOOK_SUCCESS,
                    payload: response.data
                });
            }
            else {
                dispatch({
                    type: BookEditActionTypes.GET_BOOK_FAIL,
                    payload: response.status === 'error' ? response.message : ''
                });
            }
        } catch(error: any) {
            dispatch({
                type: BookEditActionTypes.GET_BOOK_FAIL,
                payload: error.message
            });
        }
    };
};

export const clearBookData = () => {
    return {
        type: BookEditActionTypes.CLEAR_BOOK_DATA
    }
};

export const createBook = (bookData: IBook) => {

    return async (dispatch: Dispatch<IBookEditAction>, getState: () => RootState) => {
        const state: RootState = getState();
        let requestData = {
            action: 'add_book',
            book: bookData,
            sessionId: state.user.sessionId
        };

        dispatch( {type: BookEditActionTypes.CREATE_BOOK_REQUEST} );

        try {
            let response: IApiResponse = await state.api.provider(requestData);

            if ( response.status === 'success' ) {
                dispatch({
                    type: BookEditActionTypes.CREATE_BOOK_SUCCESS,
                    payload: {
                        id: response.data.bookId
                    }
                });
            }
            else {
                dispatch({
                    type: BookEditActionTypes.CREATE_BOOK_FAIL,
                    payload: response.status === 'error' ? response.message : ''
                });
            }
        } catch (error: any) {
            dispatch({
                type: BookEditActionTypes.CREATE_BOOK_FAIL,
                payload: error.message
            });
        }
    };
};

export const updateBook = (bookData: IBook) => {

    return async (dispatch: Dispatch<IBookEditAction>, getState: () => RootState) => {
        const state: RootState = getState();
        let requestData = {
            action: 'update_book',
            book: bookData,
            bookId: bookData.id,
            sessionId: state.user.sessionId
        };

        dispatch( {type: BookEditActionTypes.UPDATE_BOOK_REQUEST} );

        try {
            let response: IApiResponse = await state.api.provider(requestData);

            if ( response.status === 'success' ) {
                dispatch({
                    type: BookEditActionTypes.UPDATE_BOOK_SUCCESS,
                    payload: bookData
                });
            }
            else {
                dispatch({
                    type: BookEditActionTypes.UPDATE_BOOK_FAIL,
                    payload: response.status === 'error' ? response.message : ''
                });
            }
        } catch (error: any) {
            dispatch({
                type: BookEditActionTypes.UPDATE_BOOK_FAIL,
                payload: error.message
            });
        }
    };
};

export const removeBook = (bookId: number) => {

    return async (dispatch: Dispatch<IBookEditAction>, getState: () => RootState) => {
        const state: RootState = getState();
        let requestData = {
            action: 'remove_book',
            bookId: bookId,
            sessionId: state.user.sessionId
        };

        dispatch( {type: BookEditActionTypes.REMOVE_BOOK_REQUEST} );

        try {
            let response: IApiResponse = await state.api.provider(requestData);

            if ( response.status === 'success' ) {
                dispatch({
                    type: BookEditActionTypes.REMOVE_BOOK_SUCCESS
                });
            }
            else {
                dispatch({
                    type: BookEditActionTypes.REMOVE_BOOK_FAIL,
                    payload: response.status === 'error' ? response.message : ''
                });
            }
        } catch (error: any) {
            dispatch({
                type: BookEditActionTypes.REMOVE_BOOK_FAIL,
                payload: error.message
            });
        }
    };
};