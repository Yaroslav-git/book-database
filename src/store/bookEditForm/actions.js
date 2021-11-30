export const GET_BOOK_REQUEST = 'GET_BOOK_REQUEST';
export const GET_BOOK_SUCCESS = 'GET_BOOK_SUCCESS';
export const GET_BOOK_FAIL = 'GET_BOOK_FAIL';
export const CLEAR_BOOK_DATA = 'CLEAR_BOOK_DATA';
export const CREATE_BOOK_REQUEST = 'CREATE_BOOK_REQUEST';
export const CREATE_BOOK_SUCCESS = 'CREATE_BOOK_SUCCESS';
export const CREATE_BOOK_FAIL = 'CREATE_BOOK_FAIL';
export const UPDATE_BOOK_REQUEST = 'UPDATE_BOOK_REQUEST';
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS';
export const UPDATE_BOOK_FAIL = 'UPDATE_BOOK_FAIL';
export const REMOVE_BOOK_REQUEST = 'REMOVE_BOOK_REQUEST';
export const REMOVE_BOOK_SUCCESS = 'REMOVE_BOOK_SUCCESS';
export const REMOVE_BOOK_FAIL = 'REMOVE_BOOK_FAIL';


export const getBook = (bookId) => {

    return (dispatch, getState) => {
        const state = getState();
        let requestData = {
            action: 'get_book',
            bookId: bookId,
            sessionId: state.user.sessionId
        };

        dispatch( {type: GET_BOOK_REQUEST} );

        state.api.provider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    dispatch({
                        type: GET_BOOK_SUCCESS,
                        payload: response.data
                    });
                }
                else {
                    dispatch({
                        type: GET_BOOK_FAIL,
                        payload: response.status === 'error' ? response.message : ''
                    });
                }
            },
            error => {
                dispatch({
                    type: GET_BOOK_FAIL,
                    payload: error.message
                });
            }
        );
    };
};

export const clearBookData = () => {
    return {
        type: CLEAR_BOOK_DATA
    }
};

export const createBook = (bookData) => {

    return (dispatch, getState) => {
        const state = getState();
        let requestData = {
            action: 'add_book',
            book: bookData,
            sessionId: state.user.sessionId
        };

        dispatch( {type: CREATE_BOOK_REQUEST} );

        state.api.provider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    dispatch({
                        type: CREATE_BOOK_SUCCESS,
                        payload: {
                            id: response.data.bookId
                        }
                    });
                }
                else {
                    dispatch({
                        type: CREATE_BOOK_FAIL,
                        payload: response.status === 'error' ? response.message : ''
                    });
                }
            },
            error => {
                dispatch({
                    type: CREATE_BOOK_FAIL,
                    payload: error.message
                });
            }
        );
    };
};

export const updateBook = (bookData) => {

    return (dispatch, getState) => {
        const state = getState();
        let requestData = {
            action: 'update_book',
            book: bookData,
            bookId: bookData.id,
            sessionId: state.user.sessionId
        };

        dispatch( {type: UPDATE_BOOK_REQUEST} );

        state.api.provider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    dispatch({
                        type: UPDATE_BOOK_SUCCESS,
                        payload: bookData
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_BOOK_FAIL,
                        payload: response.status === 'error' ? response.message : ''
                    });
                }
            },
            error => {
                dispatch({
                    type: UPDATE_BOOK_FAIL,
                    payload: error.message
                });
            }
        );
    };
};

export const removeBook = (bookId) => {

    return (dispatch, getState) => {
        const state = getState();
        let requestData = {
            action: 'remove_book',
            bookId: bookId,
            sessionId: state.user.sessionId
        };

        dispatch( {type: REMOVE_BOOK_REQUEST} );

        state.api.provider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    dispatch({
                        type: REMOVE_BOOK_SUCCESS
                    });
                }
                else {
                    dispatch({
                        type: REMOVE_BOOK_FAIL,
                        payload: response.status === 'error' ? response.message : ''
                    });
                }
            },
            error => {
                dispatch({
                    type: REMOVE_BOOK_FAIL,
                    payload: error.message
                });
            }
        );
    };
};