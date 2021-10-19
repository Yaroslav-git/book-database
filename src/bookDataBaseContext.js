/**
 * Контекст приложения.
 * Хранит данные пользователя, его состояние (logged in / logged out) и идентификатор сессии.
 * Предоставляет функции для изменения этих параметров и функцию взаимодействия с бэкэндом.
 */
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const BookDBContext = React.createContext();

const BookDBContextProvider = (props) => {

    const BACKENDURL = 'http://dev.services2.infotell.ru/bookDB/index.php';
    let history = useHistory();
    let [loggedIn, setLoggedIn] = useState(false);
    let [userName, setUserName] = useState('');
    let [sessionId, setSessionId] = useState('');

    /**
     * Функция для отправки запросов к бэкэнду,
     * через которую осуществляется всё взаимодействие с базой данных на сервере - аутентификация пользователя,
     * завершение пользовательских сессий, получение списка книг пользователя,
     * создание, изменение и удаление книг пользователя.
     *
     * При получении в ответе на любой запрос ошибки со статусом "authentication required",
     * происходит перенаправление на страницу аутентификации.
     *
     * @param data
     * @returns {Promise}
     */
    const backendProvider = (data) => {

        if ( data.sessionId === undefined )
            data.sessionId = sessionId;

        return new Promise( (resolve, reject) => {
            fetch(
                BACKENDURL,
                {
                    method: 'POST',
                    mode: 'cors',
                    credentials: "include",
                    body: JSON.stringify(data)
                }
            ).then(
                response => response.json(),
                error => reject( new Error(error.message) )
            ).then(
                responseObj => {
                    if ( responseObj.status === 'error' ) {
                        if ( responseObj.message === 'authentication required' ) {
                            setLoggedIn(false);
                            history.push('/logIn');
                        }
                        reject(new Error(responseObj.message));
                    }
                    else
                        resolve( responseObj );
                        //setTimeout( () => {resolve( responseObj )}, 1000) ;
                }
            );
        });
    };

    return (
        <BookDBContext.Provider value={{
            loggedIn,
            setLoggedIn,
            userName,
            setUserName,
            sessionId,
            setSessionId,
            backendProvider
        }}>
            {props.children}
        </BookDBContext.Provider>
    )

};

export {BookDBContextProvider, BookDBContext}