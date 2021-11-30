/**
 * Компонент для вывода навигационной панели.
 * Навигация реализована через react-router-dom
 */
import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import '../css/Header.css';
import {connect} from 'react-redux';
import {logOut} from '../store/user/actions';

const Header = (props) => {

    /**
     * флаг exitButtonVisible нужен для отображения/скрытия кнопки "Выйти"
     * из выпадающего списка без использования JQuery в bootstrap
     */
    let [exitButtonVisible, setExitButtonVisible] = useState(false);
    let [exitRequest, setExitRequest] = useState(false);
    let {pathname} = useLocation();

    useEffect(() => {
        if ( props.errorMessage && exitRequest )
            alert(props.errorMessage);
    }, [props.errorMessage]);

    const toggleExitButtonVisibility = () => {
        setExitButtonVisible(prevState => !prevState);
    };

    /**
     * Обработка изменений статусов запрошенных действий
     */
    useEffect(() => {
        if (props.action.type === 'log_out') {
            if ( props.action.status === 'error' ) {
                console.log(props.action.message);
                alert('Ошибка при завершении сессии');
            }
        }
    }, [props.action.type, props.action.status, props.action.message]);

    /**
     * Обработка нажатия на кнопку "Выйти" - запрос (к бэкэнду) на прекращение текущей сессии пользователя.
     * При успешном выходе статус входа пользователя (в store) меняется на отрицательный.
     * Идентификатор сессии удаляется из store и из localStorage
     */
    const handleExitButtonClick = () => {
        toggleExitButtonVisibility();
        setExitRequest(true);
        props.logOut();
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
                                props.loggedIn ?
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
                            props.loggedIn &&
                            <div className="btn-group user-btn-gr">
                                <button type="button" className="btn user-name">{props.userName}</button>
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
};

export default connect(state => state.user, {logOut})(Header);
//export default Header;