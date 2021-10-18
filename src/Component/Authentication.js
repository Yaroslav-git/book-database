import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Authentication = (props) => {

    let [authData, setAuthData] = useState({login: '', password: ''});
    let history = useHistory();
    /**
     * loginError и passwordError - флаги нличия ошибки в значении полей "логин" и "пароль".
     * При рендере к полю с ошибкой добавляется класс is-invalid
     * authError - ошибка аутентификации, возвращаемая из бэкэнда
     */
    let [loginError, setLoginError] = useState(false);
    let [passwordError, setPasswordError] = useState(false);
    let [authError, setAuthError] = useState('');

    /**
     * Обработчик изменения содержимого полей "логин" и "пароль".
     * Если после изменения значение поля - пустая строка, то это признак некорректного заполнения.
     *
     * @param event
     */
    const handleChange = (event) => {
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
    const handleSubmit = (event) => {
        event.preventDefault();

        setLoginError(authData.login === '');
        setPasswordError(authData.password === '');

        if ( (authData.login === '') || (authData.password === '') )
            return;

        let requestData = {
            action: 'authentication',
            login: authData.login,
            password: authData.password
        };

        props.backendProvider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    setAuthError('');
                    props.setUserName(response.data.userName);
                    props.setSessionId(response.data.sessionId);
                    props.setLoggedIn(true);
                    window.localStorage.setItem('sessionId', response.data.sessionId);
                    history.push('/');
                }
            },
            error => {
                props.setLoggedIn(false);
                setAuthError(error.message);
            }
        );
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
                    authError !== '' &&
                    <div className="row">
                        <div className="col-md-4 col-lg-4 offset-md-4 offset-lg-4">
                            <div className="alert alert-danger" role="alert"> {authError} </div>
                        </div>
                    </div>
                }
            </div>
    );
}

export default Authentication