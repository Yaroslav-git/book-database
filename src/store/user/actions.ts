import {Dispatch} from 'redux'
import {RootState} from '../reducers'
import {IAuthData} from '../../component/interfaces'
import {IApiUser, IApiSession, IUserAction, UserActionTypes} from '../interfaces'

export const logIn = (authData: IAuthData) => {

    return async (dispatch: Dispatch<IUserAction>, getState: () => RootState) => {
        const state: RootState = getState();
        let requestData = {
            username: authData.login,
            password: authData.password
        };

        dispatch( {type: UserActionTypes.LOG_IN_REQUEST} );

        try {
            let response: IApiUser = await state.api.provider('create', 'auth/login', requestData);

            if ( response['id'] && response['name'] ) {

                dispatch({
                    type: UserActionTypes.LOG_IN_SUCCESS,
                    payload: {
                        userId:     response['id'],
                        userLogin:  response['login'],
                        userName:   response['name'],
                    }
                });
            }
            else {
                dispatch({
                    type: UserActionTypes.LOG_IN_FAIL,
                    payload: 'received user data incorrect'
                });
            }

        } catch (error: any) {
            dispatch({
                type: UserActionTypes.LOG_IN_FAIL,
                payload: error.message
            });
        }
    };
};

export const validateSession = () => {

    return async (dispatch: Dispatch<IUserAction>, getState: () => RootState) => {
        const state: RootState = getState();

        dispatch( {type: UserActionTypes.VALIDATE_SESSION_REQUEST} );

        try {
            let response: IApiSession = await state.api.provider('read', 'auth/session');

            if ( response['isValid'] ) {
                dispatch({
                    type: UserActionTypes.VALIDATE_SESSION_SUCCESS,
                    payload: {
                        userId:     response['userId'],
                        userLogin:  response['userLogin'],
                        userName:   response['userName'],
                    }
                });
            }
            else {
                dispatch({
                    type: UserActionTypes.VALIDATE_SESSION_FAIL,
                    payload: ''
                });
            }

        } catch (error: any) {
            dispatch({
                type: UserActionTypes.VALIDATE_SESSION_FAIL,
                payload: error.message
            });
        }
    };
};

export const logOut = () => {

    return async (dispatch: Dispatch<IUserAction>, getState: () => RootState) => {
        const state: RootState = getState();

        dispatch( {type: UserActionTypes.LOG_OUT_REQUEST} );

        try {
            let response: string = await state.api.provider('create', 'auth/logout');

            if ( response ) {

                dispatch({
                    type: UserActionTypes.LOG_OUT_SUCCESS,
                    payload: ''
                });
            }
            else {
                dispatch({
                    type: UserActionTypes.LOG_OUT_FAIL,
                    payload: 'logout error'
                });
            }

        } catch (error: any) {
            dispatch({
                type: UserActionTypes.LOG_OUT_FAIL,
                payload: error.message
            });
        }

    };
};