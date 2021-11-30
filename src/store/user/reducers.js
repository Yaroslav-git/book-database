import {LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAIL,
    VALIDATE_SESSION_REQUEST, VALIDATE_SESSION_SUCCESS, VALIDATE_SESSION_FAIL,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAIL} from './actions';

const initialState = {
    loggedIn: false,
    userName: '',
    sessionId: '',
    action: {
        type: '',
        status: '',
        message: ''
    }
};

export const userReducer = (state = initialState, action) => {

    switch (action.type){

        case LOG_IN_REQUEST:
            return {
                ...state,
                action: {
                    type: 'log_in',
                    status: 'pending',
                    message: ''
                }
            };
        case LOG_IN_SUCCESS:
            return {
                loggedIn: true,
                userName: action.payload.userName,
                sessionId: action.payload.sessionId,
                action: {
                    type: 'log_in',
                    status: 'success',
                    message: ''
                }
            };
        case LOG_IN_FAIL:
            return {
                ...state,
                loggedIn: false,
                userName: '',
                sessionId: '',
                action: {
                    type: 'log_in',
                    status: 'error',
                    message: action.payload
                }
            };

        case VALIDATE_SESSION_REQUEST:
            return {
                ...state,
                action: {
                    type: 'validate_session',
                    status: 'pending',
                    message: ''
                }
            };
        case VALIDATE_SESSION_SUCCESS:
            return {
                loggedIn: true,
                userName: action.payload.userName,
                sessionId: action.payload.sessionId,
                action: {
                    type: 'validate_session',
                    status: 'success',
                    message: ''
                }
            };
        case VALIDATE_SESSION_FAIL:
            return {
                ...state,
                loggedIn: false,
                userName: '',
                sessionId: '',
                action: {
                    type: 'validate_session',
                    status: 'error',
                    message: action.payload
                }
            };

        case LOG_OUT_REQUEST:
            return {
                ...state,
                action: {
                    type: 'log_out',
                    status: 'pending',
                    message: ''
                }
            };
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                loggedIn: false,
                userName: '',
                sessionId: '',
                action: {
                    type: 'log_out',
                    status: 'success',
                    message: ''
                }
            };
        case LOG_OUT_FAIL:
            return {
                ...state,
                action: {
                    type: 'log_out',
                    status: 'error',
                    message: action.payload
                }
            };

        default:
            return state;
    }
};