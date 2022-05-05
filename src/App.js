/**
 * Главный компонент приложения.
 * Хранит состояние пользователя (logged in / logged out). Обеспечивает взаимодействие с бэкэндом.
 */
import React, {useState, useEffect} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom'
import './css/App.css';
import Header from './Component/Header';
import Footer from './Component/Footer';
import BookEditForm from './Component/BookEditFormContainer';
import BookList from './Component/BookList';
import Authentication from './Component/Authentication';
import HomePage from './Component/HomePage'

const App = () => {

    const BACKENDURL = '//api url//';
    let history = useHistory();
    let [loggedIn, setLoggedIn] = useState(false);
    let [userName, setUserName] = useState('');
    let [sessionId, setSessionId] = useState('');

    /**
     * Если статус входа пользователя отрицательный, но в localStorage есть идентификатор пользовательской сессии,
     * проверяется актуальность этой сессии. Если идентификатора сессии нет - переход на страницу аутентификации.
     */
    useEffect(() => {
        if ( !loggedIn ) {
            if ( 'sessionId' in window.localStorage ) {
                validateSession(window.localStorage.getItem('sessionId'));
            }
            else {
                history.push('/logIn');
            }
        }
    }, []);

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

    /**
     * Проверка актуальности пользовательской сессии.
     * Если сессия активна, статус входа пользователя (переменная состояния loggedIn) меняется на положительный.
     *
     * @param sessionId
     */
    const validateSession = (sessionId) => {

        let requestData = {
            action: 'authentication',
            sessionId: sessionId
        };

        backendProvider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    setUserName(response.data.userName);
                    setSessionId(response.data.sessionId);
                    setLoggedIn(true);
                    window.localStorage.setItem('sessionId', response.data.sessionId);
                }
            },
            error => {
                setLoggedIn(false);
                console.log(error.message);
            }
        );
    };

    /**
     * Выводя компонентов с использованием Switch из react-router-dom.
     * Компонент со списком книг пользователя (BookList) и компонент создания/редактирования книги (BookEditForm)
     * доступны только для аутенцифицированных пользователей.
     */
    return (

        <div className="App">
            <Header
                loggedIn={loggedIn}
                userName={userName}
                backendProvider={backendProvider}
                setSessionId={setSessionId}
                setLoggedIn={setLoggedIn}
            />

            <main role="main">
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>

                            <Route path="/list">
                                { loggedIn && <BookList backendProvider={backendProvider} /> }
                            </Route>

                            <Route path="/add" >
                                { loggedIn && <BookEditForm backendProvider={backendProvider} /> }
                            </Route>

                            <Route path="/edit/:bookId" >
                                { loggedIn && <BookEditForm backendProvider={backendProvider} /> }
                            </Route>


                    <Route path="/logIn" >
                        <Authentication
                            backendProvider={backendProvider}
                            setUserName={setUserName}
                            setSessionId={setSessionId}
                            setLoggedIn={setLoggedIn}
                        />
                    </Route>

                </Switch>
            </main>

            <Footer/>
        </div>
    )
}

export default App;
