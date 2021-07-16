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
    }

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
    }

    signIn = (login, password, sessionId) => {

        let bodyData = {
            action: 'authentication',
            login: login,
            password: password,
            sessionId: sessionId
        };

        fetch(  this.state.backendUrl,
                {
                    method: 'POST',
                    mode: 'cors',
                    credentials: "include",
                    body: JSON.stringify(bodyData)
                }
            )
            .then(response => response.json())
            .then(response => {

                if ( response['status'] === 'success' ) {
                    this.setState({
                        loggedIn: true,
                        userName: response.data.userName,
                        activeView: '',
                        authenticationError: '',
                        sessionId: response.data.sessionId
                    });
                    window.localStorage.setItem('sessionId', response.data.sessionId);
                }

                if ( response['status'] === 'error' ) {
                    this.setState({
                        loggedIn: false,
                        activeView: 'authentication',
                        authenticationError: (response.message === 'authentication required' ? '' : response.message)
                    });
                }
            });
    };

    signOut = () => {
        let bodyData = {
            action: 'sign_out',
            sessionId: this.state.sessionId
        };

        fetch(  this.state.backendUrl,
            {
                method: 'POST',
                mode: 'cors',
                credentials: "include",
                body: JSON.stringify(bodyData)
            }
        )
            .then(response => response.json())
            .then(response => {

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

                if ( response.status === 'error' ) {
                    alert(response.message);
                }
            });
    }

    handleViewChange = (view) => {

        this.setState({
            activeView: view
        });
    }

    enableAuthPage = (error) => {
        this.setState({
            loggedIn: false,
            activeView: 'authentication',
            authenticationError: error
        });
    }

    enableEditBookForm = (bookId) => {
      this.setState({
            editedBookId: bookId,
            activeView: 'edit'
        });
    }


    render() {

        let mainContent = '';
        switch(this.state.activeView){
            case '':
                mainContent = <img src={logo} height="768" alt="react logo"/>;
                break;
            case 'list':
                mainContent =   <BookList
                                    removeHandler={this.removeBookFromList}
                                    editHandler={this.enableEditBookForm}
                                    sessionId={this.state.sessionId}
                                    backendUrl={this.state.backendUrl}
                                    authRequestHandler={this.enableAuthPage}
                                />;
                break;
            case 'add':
                mainContent =   <BookEditForm
                                    action='create book'
                                    sessionId={this.state.sessionId}
                                    backendUrl={this.state.backendUrl}
                                    authRequestHandler={this.enableAuthPage}
                                />;
                break;
            case 'edit':
                mainContent =   <BookEditForm
                                    action='edit book'
                                    bookId={this.state.editedBookId}
                                    sessionId={this.state.sessionId}
                                    backendUrl={this.state.backendUrl}
                                    authRequestHandler={this.enableAuthPage}
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
