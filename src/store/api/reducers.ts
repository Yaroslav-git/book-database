import {IApiState} from "../interfaces";

const initialState: IApiState = {
    provider: async (requestType: string, path: string, requestData?: any) => {

        let method, headers;
        let backendApiAddress = 'http://localhost:5000/';

        switch (requestType) {
            case 'create':
                method = 'POST';
                headers = {'Content-Type': 'application/json;charset=utf-8'};
                break;
            case 'read':
                method = 'GET';
                break;
            case 'update':
                method = 'PUT';
                headers = {'Content-Type': 'application/json;charset=utf-8'};
                break;
            case 'delete':
                method = 'DELETE';
                break;
            default:
                throw new Error('unexpected request type');
        }

        let url = backendApiAddress + path;

        let response = await fetch(
            url,
            {
                method: method,
                headers: headers,
                credentials: 'include',
                body: (requestData ? JSON.stringify(requestData) : null)
            }
        );

        if ( !response.ok ) {
            let errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return await response.json();
    }
};

export const apiReducer = (state = initialState, action: string) => state;

