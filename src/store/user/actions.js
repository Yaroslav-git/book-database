export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';
export const VALIDATE_SESSION_REQUEST = 'VALIDATE_SESSION_REQUEST';
export const VALIDATE_SESSION_SUCCESS = 'VALIDATE_SESSION_SUCCESS';
export const VALIDATE_SESSION_FAIL = 'VALIDATE_SESSION_FAIL';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAIL = 'LOG_OUT_FAIL';

export const logIn = (authData) => {

    return (dispatch, getState) => {
        const state = getState();
        let requestData = {
            action: 'authentication',
            login: authData.login,
            password: authData.password
        };

        dispatch( {type: LOG_IN_REQUEST} );

        state.api.provider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    window.localStorage.setItem('sessionId', response.data.sessionId);

                    dispatch({
                        type: LOG_IN_SUCCESS,
                        payload: {
                            userName: response.data.userName,
                            sessionId: response.data.sessionId
                        }
                    });
                }
                else {
                    dispatch({
                        type: LOG_IN_FAIL,
                        payload: response.status === 'error' ? response.message : ''
                    });
                }
            },
            error => {
                dispatch({
                    type: LOG_IN_FAIL,
                    payload: error.message
                });
            }
        );
    };
};

export const validateSession = () => {

    return (dispatch, getState) => {
        const state = getState();
        let requestData = {
            action: 'authentication',
            sessionId: state.user.sessionId
        };

        dispatch( {type: VALIDATE_SESSION_REQUEST} );

        if ( !state.user.sessionId ) {
            dispatch({
                type: VALIDATE_SESSION_FAIL,
                payload: 'sessionId is not defined'
            });
            return;
        }

        state.api.provider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    dispatch({
                        type: VALIDATE_SESSION_SUCCESS,
                        payload: {
                            userName: response.data.userName,
                            sessionId: response.data.sessionId
                        }
                    });
                }
                else {
                    dispatch({
                        type: VALIDATE_SESSION_FAIL,
                        payload: response.status === 'error' ? response.message : ''
                    });
                }
            },
            error => {
                dispatch({
                    type: VALIDATE_SESSION_FAIL,
                    payload: error.message
                });
            }
        );
    };
};

export const logOut = () => {

    return (dispatch, getState) => {
        const state = getState();
        let requestData = {
            action: 'sign_out',
            sessionId: state.user.sessionId
        };

        dispatch( {type: LOG_OUT_REQUEST} );

        if ( !state.user.sessionId ) {
            dispatch({
                type: LOG_OUT_FAIL,
                payload: 'sessionId is not defined'
            });
        }

        state.api.provider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    window.localStorage.removeItem('sessionId');
                    dispatch({
                        type: LOG_OUT_SUCCESS,
                        payload: ''
                    });
                }
                else {
                    dispatch({
                        type: LOG_OUT_FAIL,
                        payload: response.status === 'error' ? response.message : ''
                    });
                }
            },
            error => {
                dispatch({
                    type: LOG_OUT_FAIL,
                    payload: error.message
                });
            }
        );
    };
};