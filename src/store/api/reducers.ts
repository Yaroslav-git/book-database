import {IApiState, IApiData} from "../interfaces";

const initialState: IApiState = {
    provider: async (data: IApiData) => {
            let response = await fetch(
                '//api url',
                {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify(data)
                }
            );

            let responseObj = await response.json();

            if ( responseObj.status === 'error' )
                throw new Error(responseObj.message);
            else
                return responseObj;
    }
};

export const apiReducer = (state = initialState, action: string) => state;

