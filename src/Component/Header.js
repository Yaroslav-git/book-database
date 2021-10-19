/**
 * Компонент для вывода навигационной панели.
 * Навигация реализована через react-router-dom
 */
import React, {useState, useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';
import '../css/Header.css';
import {BookDBContext} from '../bookDataBaseContext';

const Header = () => {

    /**
     * флаг exitButtonVisible нужен для отображения/скрытия кнопки "Выйти"
     * из выпадающего списка без использования JQuery в bootstrap
     */
    let [exitButtonVisible, setExitButtonVisible] = useState(false);
    let {pathname} = useLocation();

    /**
     * Параметры пользователя и методы для их изменения из контекста приложения.
     */
    let {
        loggedIn,
        setLoggedIn,
        userName,
        setUserName,
        setSessionId,
        backendProvider
    } = useContext(BookDBContext);

    const toggleExitButtonVisibility = () => {
        setExitButtonVisible(prevState => !prevState);
    };

    /**
     * Обработка нажатия на кнопку "Выйти" - запрос (к бэкэнду) на прекращение текущей сессии пользователя.
     * При успешном выходе статус входа пользователя (переменная состояния loggedIn из контекста приложения)
     * меняется на отрицательный. Идентификатор сессии удаляется из контекста и из localStorage
     */
    const handleExitButtonClick = () => {
        toggleExitButtonVisibility();

        backendProvider( {action: 'sign_out'} ).then(
            response => {
                if ( response.status === 'success' ) {
                    setLoggedIn(false);
                    setSessionId('');
                    setUserName('');
                    window.localStorage.removeItem('sessionId');
                }
            },
            error => {
                alert(error.message);
            }
        );
    };

    return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <span className="navbar-brand" href="#">BookDataBase</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarCollapse"
                            aria-controls="navbarCollapse" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className={'nav-item' + (pathname === '/' ? ' active' : '')}>
                                <Link className="nav-link" to="/">Главная</Link>
                            </li>
                            {
                                loggedIn ?
                                    <>
                                        <li className={'nav-item' + (pathname === '/add' ? ' active' : '')}>
                                            <Link className="nav-link" to="/add">Добавление</Link>
                                        </li>
                                        <li className={'nav-item' + (pathname === '/list' ? ' active' : '')}>
                                            <Link className="nav-link" to="/list">Список</Link>
                                        </li>
                                    </>
                                    :
                                    <li className={'nav-item' + (pathname === '/logIn' ? ' active' : '')}>
                                        <Link className="nav-link" to="/logIn">Войти</Link>
                                    </li>

                            }
                        </ul>
                        {
                            loggedIn &&
                            <div className="btn-group user-btn-gr">
                                <button type="button" className="btn user-name">{userName}</button>
                                <button type="button" className={"btn dropdown-toggle dropdown-toggle-split "
                                +(exitButtonVisible ? 'dropdown-toggle-up' : '')} onClick={toggleExitButtonVisibility}
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                    <span className="sr-only">Toggle Dropdown</span>
                                </button>
                                <div className={"dropdown-menu "+(exitButtonVisible ? 'dropdown-menu-open' : 'dropdown-menu-closed')}>
                                    <Link className="dropdown-item" to="/" onClick={handleExitButtonClick}>Выйти</Link>
                                </div>
                            </div>
                        }
                    </div>
                </nav>
            </header>
    );
}

export default Header;