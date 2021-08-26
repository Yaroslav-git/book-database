import React from 'react';
import './css/App.css';
import Header from './Component/Header';
import Footer from './Component/Footer';
import BookEditForm from './Component/BookEditFormContainer';
import BookList from './Component/BookList';
import Authentication from './Component/Authentication';
import logo from './Component/logo.svg'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            userName: '',
            sessionId: '',
            backendUrl: 'http://dev.services2.infotell.ru/bookDB/index.php',
            activeView: '',
            editedBookId: -1,
            authenticationError: ''
        }
    };

    componentDidMount() {

        if ( !this.state.loggedIn ) {

            if ( 'sessionId' in window.localStorage ) {
                this.signIn('','',window.localStorage.getItem('sessionId'));
            }
            else {
                this.setState({
                    activeView: 'authentication'
                });
            }
        }
    };

    handleViewChange = (view) => {

        this.setState({
            activeView: view
        });
    };

    enableAuthPage = (error) => {
        this.setState({
            loggedIn: false,
            activeView: 'authentication',
            authenticationError: error
        });
    };

    enableEditBookForm = (bookId) => {
        this.setState({
            editedBookId: bookId,
            activeView: 'edit'
        });
    };

    backendProvider = (data) => {

        if ( data.sessionId === undefined )
            data.sessionId = this.state.sessionId;

        return new Promise( (resolve, reject) => {
            fetch(
                this.state.backendUrl,
                {
                    method: 'POST',
                    mode: 'cors',
                    credentials: "include",
                    body: JSON.stringify(data)
                }
            )   .then(
                response => response.json(),
                error => reject( new Error('fail' + (data.action ? ' ['+data.action+']' : '') +': ' + error.message) )
            )
                .then(
                    responseObj => {
                        if ( responseObj.status === 'error' ) {
                            if ( responseObj.message === 'authentication required' )
                                this.enableAuthPage('');
                            reject(new Error('fail' + (data.action ? ' [' + data.action + ']' : '') + ': ' + responseObj.message));
                        }
                        else
                            resolve( responseObj );
                    }
                );
        });

    };

    signIn = (login, password, sessionId) => {

        let requestData = {
            action: 'authentication',
            login: login,
            password: password,
            sessionId: sessionId
        };

        this.backendProvider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    this.setState({
                        loggedIn: true,
                        userName: response.data.userName,
                        activeView: '',
                        authenticationError: '',
                        sessionId: response.data.sessionId
                    });
                    window.localStorage.setItem('sessionId', response.data.sessionId);
                }
            },
            error => {
                this.setState({
                    loggedIn: false,
                    activeView: 'authentication',
                    authenticationError: (error.message.includes('authentication required') ? '' : error.message)
                });
            }
        );
    };

    signOut = () => {

        let requestData = {
            action: 'sign_out',
        };

        this.backendProvider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    this.setState({
                        loggedIn: false,
                        userName: '',
                        activeView: 'authentication',
                        authenticationError: '',
                        sessionId: ''
                    });
                    window.localStorage.removeItem('sessionId');
                }
            },
            error => {
                alert(error.message);
            }
        );
    };


    render() {

        let mainContent = '';
        switch(this.state.activeView){
            case '':
                mainContent = <img src={logo} height="768" alt="react logo"/>;
                break;
            case 'list':
                mainContent =   <BookList
                                    editHandler={this.enableEditBookForm}
                                    backendProvider={this.backendProvider}
                                />;
                break;
            case 'add':
                mainContent =   <BookEditForm
                                    action='create book'
                                    backendProvider={this.backendProvider}
                                />;
                break;
            case 'edit':
                mainContent =   <BookEditForm
                                    action='edit book'
                                    bookId={this.state.editedBookId}
                                    backendProvider={this.backendProvider}
                                />;
                break;
            case 'authentication':
                mainContent =   <Authentication
                    submitHandler={this.signIn}
                    errorMessage={this.state.authenticationError}
                />;
                break;
            default:
                mainContent = null;
        }

        return (
            <div className="App">
                <Header
                    activeView={this.state.activeView}
                    handleChange={this.handleViewChange}
                    signOut={this.signOut}
                    userName={this.state.userName}
                />
                <main role="main">
                    {mainContent}
                </main>
                <Footer/>
            </div>
        )
    }
}

export default App;
