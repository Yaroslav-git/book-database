/**
 * Компонент, реализующий аутентификацию пользователей.
 */
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '../store/user/actions';
import {IUser, IAuthData} from './interfaces';
import {RootState} from '../store/reducers'

interface IAuthProps extends IUser {
    logIn: (auth: IAuthData) => void
}

const Authentication: React.FC<IAuthProps> = (props) => {

    let [authData, setAuthData] = useState<IAuthData>({login: '', password: ''});
    let history = useHistory();
    /**
     * loginError и passwordError - флаги нличия ошибки в значении полей "логин" и "пароль".
     * При рендере к полю с ошибкой добавляется класс is-invalid
     * authError - ошибка аутентификации, возвращаемая из бэкэнда
     */
    let [loginError, setLoginError] = useState<boolean>(false);
    let [passwordError, setPasswordError] = useState<boolean>(false);

    useEffect(() => {
        if ( props.loggedIn )
            history.push('/');
    }, [props.loggedIn]);

    /**
     * Обработчик изменения содержимого полей "логин" и "пароль".
     * Если после изменения значение поля - пустая строка, то это признак некорректного заполнения.
     *
     * @param event
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let {name, value} = event.target;

        setAuthData( prevAuthData => ({
            ...prevAuthData,
            [name]: value
        }) );

        if (name === 'login')
            setLoginError(value === '');

        if (name === 'password')
            setPasswordError(value === '')
    };


    /**
     * Обработчик отправки данных формы в бэкэнд (запроса на вход).
     * При успешном входе происходит перенаправление на главную страницу
     *
     * @param event
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoginError(authData.login === '');
        setPasswordError(authData.password === '');

        if ( (authData.login === '') || (authData.password === '') )
            return;

        props.logIn(authData);
    };

    return (
            <div className="container-fluid authentication-control">
                <div className="row">
                    <div className="col-md-4 col-lg-2 offset-md-4 offset-lg-5">

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Login
                                    <input type="text"
                                           name="login"
                                           className={"form-control "+(loginError ? 'is-invalid' : '')}
                                           id="inputLogin"
                                           value={authData.login}
                                           onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Password
                                    <input type="password"
                                           name="password"
                                           className={"form-control "+(passwordError ? 'is-invalid' : '')}
                                           id="inputPassword"
                                           value={authData.password}
                                           onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Sign In</button>
                        </form>
                    </div>
                </div>
                <br/>
                {
                    (props.action.message !== '' && props.action.message !== 'authentication required') &&
                    <div className="row">
                        <div className="col-md-4 col-lg-4 offset-md-4 offset-lg-4">
                            <div className="alert alert-danger" role="alert"> {props.action.message} </div>
                        </div>
                    </div>
                }
            </div>
    );
};

export default connect((state: RootState) => state.user, {logIn})(Authentication);