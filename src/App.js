/**
 * Компонент, который проверяет статус пользователя, управляет навигацией в приложении
 * и определяет, какие разделы приложения доступны пользователю.
 */
import React, {useContext, useEffect} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';
import {BookDBContext} from './bookDataBaseContext';
import './css/App.css';
import Header from './Component/Header';
import Footer from './Component/Footer';
import BookEditForm from './Component/BookEditFormContainer';
import BookList from './Component/BookList';
import Authentication from './Component/Authentication';
import HomePage from './Component/HomePage';

const App = () => {

    /**
     * Параметры пользователя и методы для их изменения из контекста приложения.
     */
    let {
        loggedIn,
        setLoggedIn,
        setUserName,
        setSessionId,
        backendProvider
    } = useContext(BookDBContext);

    let history = useHistory();

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
     * Проверка актуальности пользовательской сессии.
     * Если сессия активна, статус входа пользователя (переменная состояния из контекста loggedIn) меняется на положительный.
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
            <Header />

            <main role="main">
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>

                    <Route path="/list">
                        { loggedIn && <BookList /> }
                    </Route>

                    <Route path="/add" >
                        { loggedIn && <BookEditForm /> }
                    </Route>

                    <Route path="/edit/:bookId" >
                        { loggedIn && <BookEditForm /> }
                    </Route>

                    <Route path="/logIn" >
                        <Authentication />
                    </Route>
                </Switch>
            </main>

            <Footer/>
        </div>
    )
};

export default App;
