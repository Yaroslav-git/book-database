/**
 * Компонент, который управляет навигацией в приложении, определяет, какие разделы приложения доступны пользователю
 * и проверяет статус пользователя при создании.
 */
import React, {useEffect} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import './css/App.css';
import Header from './component/Header';
import Footer from './component/Footer';
import BookEditForm from './component/BookEditFormContainer';
import BookList from './component/BookList';
import Authentication from './component/Authentication';
import HomePage from './component/HomePage';
import {validateSession} from './store/user/actions';
import {IUser} from './component/interfaces'
import {RootState} from './store/reducers'

interface IAppProps extends IUser {
    validateSession: () => void
}

const App: React.FC<IAppProps> = (props) => {

    let history = useHistory();

    /**
     * Если статус входа пользователя отрицательный, но в localStorage есть идентификатор пользовательской сессии,
     * проверяется актуальность этой сессии. Если идентификатора сессии нет - переход на страницу аутентификации.
     */
    useEffect(() => {
        if ( !props.loggedIn ) {
            props.validateSession();
            //history.push('/logIn');
        }
    }, []);

    /**
     * Обработка изменений статусов запрошенных действий
     */
    useEffect(() => {
        if ( props.action.type === 'validate_session' ) {
            if ( props.action.status === 'error' ) {
                console.log(props.action.message);
                if ( props.action.message !== 'authentication required' )
                    alert('Ошибка при валидации пользовательской сессии');
                else
                    history.push('/logIn');
            }
        }
    }, [props.action.type, props.action.status, props.action.message]);

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
                        { props.loggedIn && <BookList /> }
                    </Route>

                    <Route path="/add" >
                        { props.loggedIn && <BookEditForm /> }
                    </Route>

                    <Route path="/edit/:bookId" >
                        { props.loggedIn && <BookEditForm /> }
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

export default connect((state: RootState) => state.user, {validateSession})(App);

//export default App;
