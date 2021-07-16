import React from 'react'

class Authentication extends React.Component {
    constructor(){
        super();
        this.state = {
            login: '',
            password: '',
            inputLoginError: false,
            inputPasswordError: false,
        };
    }

    handleChange = (event) => {
        let {name, value} = event.target;

        this.setState(prevState => {
            return {
                [name]: value,
                inputLoginError: (name === 'login' ? value === '' : prevState.inputLoginError),
                inputPasswordError: (name === 'password' ? value === '' : prevState.inputPasswordError),
            };
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
                inputLoginError: (this.state.login === ''),
                inputPasswordError: (this.state.password === '')
            },
            () => {
                if ( !this.state.inputLoginError && !this.state.inputPasswordError )
                    this.props.submitHandler(this.state.login, this.state.password);
            });
    }

    render() {

        let errorAlert = '';

        if ( this.props.errorMessage !== '' )
            errorAlert =
                <div className="row">
                    <div className="col-md-4 col-lg-4 offset-md-4 offset-lg-4">
                        <div className="alert alert-danger" role="alert"> {this.props.errorMessage} </div>
                    </div>
                </div>;

        return (
            <div className="container-fluid authentication-control">
                <div className="row">
                    <div className="col-md-4 col-lg-2 offset-md-4 offset-lg-5">

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Login
                                    <input type="text"
                                           name="login"
                                           className={"form-control "+(this.state.inputLoginError ? 'alert-danger' : '')}
                                           id="inputLogin"
                                           value={this.state.login}
                                           onChange={this.handleChange}
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Password
                                    <input type="password"
                                           name="password"
                                           className={"form-control "+(this.state.inputPasswordError ? 'alert-danger' : '')}
                                           id="inputPassword"
                                           value={this.state.password}
                                           onChange={this.handleChange}
                                    />
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Sign In</button>
                        </form>
                    </div>
                </div>
                <br/>
                {errorAlert}
            </div>
        );
    }
}

export default Authentication