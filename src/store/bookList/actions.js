export const GET_BOOK_LIST_REQUEST = 'GET_BOOK_LIST_REQUEST';
export const GET_BOOK_LIST_SUCCESS = 'GET_BOOK_LIST_SUCCESS';
export const GET_BOOK_LIST_FAIL = 'GET_BOOK_LIST_FAIL';
export const REMOVE_LIST_BOOK_REQUEST = 'REMOVE_LIST_BOOK_REQUEST';
export const REMOVE_LIST_BOOK_SUCCESS = 'REMOVE_LIST_BOOK_SUCCESS';
export const REMOVE_LIST_BOOK_FAIL = 'REMOVE_LIST_BOOK_FAIL';

export const getBookList = () => {

    return (dispatch, getState) => {
        const state = getState();
        let requestData = {
            action: 'get_book_list',
            sessionId: state.user.sessionId
        };

        dispatch( {type: GET_BOOK_LIST_REQUEST} );

        state.api.provider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    dispatch({
                        type: GET_BOOK_LIST_SUCCESS,
                        payload: response.data
                    });
                }
                else {
                    dispatch({
                        type: GET_BOOK_LIST_FAIL,
                        payload: response.status === 'error' ? response.message : ''
                    });
                }
            },
            error => {
                dispatch({
                    type: GET_BOOK_LIST_FAIL,
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

        dispatch( {type: REMOVE_LIST_BOOK_REQUEST} );

        state.api.provider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    dispatch({
                        type: REMOVE_LIST_BOOK_SUCCESS,
                        payload: bookId
                    });
                }
                else {
                    dispatch({
                        type: REMOVE_LIST_BOOK_FAIL,
                        payload: response.status === 'error' ? response.message : ''
                    });
                }
            },
            error => {
                dispatch({
                    type: REMOVE_LIST_BOOK_FAIL,
                    payload: error.message
                });
            }
        );
    };
};