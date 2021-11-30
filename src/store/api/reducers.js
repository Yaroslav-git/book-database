const initialState = {
    provider: (data) => {
        return new Promise( (resolve, reject) => {
            fetch(
                'http://dev.services2.infotell.ru/bookDB/index.php',
                {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify(data)
                }
            ).then(
                response => response.json(),
                error => reject( new Error(error.message) )
            ).then(
                responseObj => {
                    if ( responseObj.status === 'error' ) {
                        reject(new Error(responseObj.message));
                        //setTimeout( () => {reject(new Error(responseObj.message))}, 1000) ;
                    }
                    else
                        resolve( responseObj );
                        //setTimeout( () => {resolve( responseObj )}, 1000) ;
                }
            );
        });
    }

};

export const apiReducer = (state = initialState, action) => state;