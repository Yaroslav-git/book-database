import {Dispatch} from 'redux'
import {RootState} from '../reducers'
import {IAuthData} from '../../component/interfaces'
import {IApiResponse, IUserAction, UserActionTypes} from '../interfaces'

export const logIn = (authData: IAuthData) => {

    return async (dispatch: Dispatch<IUserAction>, getState: () => RootState) => {
        const state: RootState = getState();
        let requestData = {
            action: 'authentication',
            login: authData.login,
            password: authData.password
        };

        dispatch( {type: UserActionTypes.LOG_IN_REQUEST} );

        try {
            let response: IApiResponse = await state.api.provider(requestData);

            if ( response.status === 'success' ) {
                window.localStorage.setItem('sessionId', response.data.sessionId);

                dispatch({
                    type: UserActionTypes.LOG_IN_SUCCESS,
                    payload: {
                        userName: response.data.userName,
                        sessionId: response.data.sessionId
                    }
                });
            }
            else {
                dispatch({
                    type: UserActionTypes.LOG_IN_FAIL,
                    payload: response.status === 'error' ? response.message : ''
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
        let requestData = {
            action: 'authentication',
            sessionId: state.user.sessionId
        };

        dispatch( {type: UserActionTypes.VALIDATE_SESSION_REQUEST} );

        if ( !state.user.sessionId ) {
            dispatch({
                type: UserActionTypes.VALIDATE_SESSION_FAIL,
                payload: 'sessionId is not defined'
            });
            return;
        }

        try {
            let response: IApiResponse = await state.api.provider(requestData);

            if ( response.status === 'success' ) {
                dispatch({
                    type: UserActionTypes.VALIDATE_SESSION_SUCCESS,
                    payload: {
                        userName: response.data.userName,
                        sessionId: response.data.sessionId
                    }
                });
            }
            else {
                dispatch({
                    type: UserActionTypes.VALIDATE_SESSION_FAIL,
                    payload: response.status === 'error' ? response.message : ''
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
        let requestData = {
            action: 'sign_out',
            sessionId: state.user.sessionId
        };

        dispatch( {type: UserActionTypes.LOG_OUT_REQUEST} );

        if ( !state.user.sessionId ) {
            dispatch({
                type: UserActionTypes.LOG_OUT_FAIL,
                payload: 'sessionId is not defined'
            });
        }

        try {
            let response: IApiResponse = await state.api.provider(requestData);

            if ( response.status === 'success' ) {
                window.localStorage.removeItem('sessionId');
                dispatch({
                    type: UserActionTypes.LOG_OUT_SUCCESS,
                    payload: ''
                });
            }
            else {
                dispatch({
                    type: UserActionTypes.LOG_OUT_FAIL,
                    payload: response.status === 'error' ? response.message : ''
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