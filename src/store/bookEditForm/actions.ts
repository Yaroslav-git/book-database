import {Dispatch} from 'redux'
import {IApiBook, IApiBookCreate, BookEditActionTypes, IBookEditAction} from '../interfaces'
import {RootState} from '../reducers'
import {IBook} from '../../component/interfaces'

export const getBook = (bookId: number) => {

    return async (dispatch: Dispatch<IBookEditAction>, getState: () => RootState) => {
        const state: RootState = getState();

        dispatch( {type: BookEditActionTypes.GET_BOOK_REQUEST} );

        try {
            let response: IApiBook = await state.api.provider('read', 'users/'+state.user.userId+'/books/'+bookId);

            if ( response ) {
                dispatch({
                    type: BookEditActionTypes.GET_BOOK_SUCCESS,
                    payload: response
                });
            }
            else {
                dispatch({
                    type: BookEditActionTypes.GET_BOOK_FAIL,
                    payload: 'get user book error'
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

        dispatch( {type: BookEditActionTypes.CREATE_BOOK_REQUEST} );

        try {
            let response: IApiBookCreate = await state.api.provider('create', 'users/'+state.user.userId+'/books/', bookData);

            if ( response.bookId ) {
                dispatch({
                    type: BookEditActionTypes.CREATE_BOOK_SUCCESS,
                    payload: {
                        id: response.bookId
                    }
                });
            }
            else {
                dispatch({
                    type: BookEditActionTypes.CREATE_BOOK_FAIL,
                    payload: 'create book error'
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

        dispatch( {type: BookEditActionTypes.UPDATE_BOOK_REQUEST} );

        try {
            let response: string = await state.api.provider('update', 'users/'+state.user.userId+'/books/'+bookData.id, bookData);

            if ( response === 'book updated' ) {
                dispatch({
                    type: BookEditActionTypes.UPDATE_BOOK_SUCCESS,
                    payload: bookData
                });
            }
            else {
                dispatch({
                    type: BookEditActionTypes.UPDATE_BOOK_FAIL,
                    payload: 'update book error'
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

        dispatch( {type: BookEditActionTypes.REMOVE_BOOK_REQUEST} );

        try {
            let response: string = await state.api.provider('delete', 'users/'+state.user.userId+'/books/'+bookId);

            if ( response === 'book deleted' ) {
                dispatch({
                    type: BookEditActionTypes.REMOVE_BOOK_SUCCESS
                });
            }
            else {
                dispatch({
                    type: BookEditActionTypes.REMOVE_BOOK_FAIL,
                    payload: 'delete book error'
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