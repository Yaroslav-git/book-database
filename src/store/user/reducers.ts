import {UserActionTypes, IUserAction} from '../interfaces';
import {IUser} from '../../component/interfaces'

const initialState: IUser = {
    loggedIn: false,
    userId: null,
    userLogin: '',
    userName: '',
    //sessionId: '',
    action: {
        type: '',
        status: '',
        message: ''
    }
};

export const userReducer = (state: IUser = initialState, action: IUserAction): IUser => {

    switch (action.type){

        case UserActionTypes.LOG_IN_REQUEST:
            return {
                ...state,
                action: {
                    type: 'log_in',
                    status: 'pending',
                    message: ''
                }
            };
        case UserActionTypes.LOG_IN_SUCCESS:
            return {
                loggedIn: true,
                userId: action.payload.userId,
                userLogin: action.payload.userLogin,
                userName: action.payload.userName,
                //sessionId: action.payload.sessionId,
                action: {
                    type: 'log_in',
                    status: 'success',
                    message: ''
                }
            };
        case UserActionTypes.LOG_IN_FAIL:
            return {
                ...state,
                loggedIn: false,
                userId: null,
                userLogin: '',
                userName: '',
                //sessionId: '',
                action: {
                    type: 'log_in',
                    status: 'error',
                    message: action.payload
                }
            };

        case UserActionTypes.VALIDATE_SESSION_REQUEST:
            return {
                ...state,
                action: {
                    type: 'validate_session',
                    status: 'pending',
                    message: ''
                }
            };
        case UserActionTypes.VALIDATE_SESSION_SUCCESS:
            return {
                loggedIn: true,
                userId: action.payload.userId,
                userLogin: action.payload.userLogin,
                userName: action.payload.userName,
                //sessionId: action.payload.sessionId,
                action: {
                    type: 'validate_session',
                    status: 'success',
                    message: ''
                }
            };
        case UserActionTypes.VALIDATE_SESSION_FAIL:
            return {
                ...state,
                loggedIn: false,
                userId: null,
                userLogin: '',
                userName: '',
                //sessionId: '',
                action: {
                    type: 'validate_session',
                    status: 'error',
                    message: action.payload
                }
            };

        case UserActionTypes.LOG_OUT_REQUEST:
            return {
                ...state,
                action: {
                    type: 'log_out',
                    status: 'pending',
                    message: ''
                }
            };
        case UserActionTypes.LOG_OUT_SUCCESS:
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
        case UserActionTypes.LOG_OUT_FAIL:
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