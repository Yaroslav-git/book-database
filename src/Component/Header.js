import React from 'react';
import '../css/Header.css'

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            exitButtonVisible: false,
        }
    }

    toggleExitButtonVisibility = () => {
        this.setState( prSt => {
            return {
                exitButtonVisible: !prSt.exitButtonVisible,
            }
        });
    }

    handleExitButtonClick = () => {
        this.toggleExitButtonVisibility();
        this.props.signOut();
    }


    render() {

        let navItemList =
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className={"nav-item "+(this.props.activeView === '' ? 'active' : '')}>
                        <a className="nav-link" href="#" onClick={() => this.props.handleChange('')}>Главная</a>
                    </li>
                    <li className={"nav-item "+(this.props.activeView === "add" ? 'active' : '')}>
                        <a className="nav-link" href="#" onClick={() => this.props.handleChange('add')}>Добавление</a>
                    </li>
                    <li className={"nav-item "+(this.props.activeView === "list" ? 'active' : '')}>
                        <a className="nav-link" href="#" onClick={() => this.props.handleChange('list')}>Список</a>
                    </li>

                </ul>
                <div className="btn-group user-btn-gr">
                    <button type="button" className="btn user-name">{this.props.userName}</button>
                    <button type="button" className={"btn dropdown-toggle dropdown-toggle-split "
                            +(this.state.exitButtonVisible ? 'dropdown-toggle-up' : '')} onClick={this.toggleExitButtonVisibility}
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <div className={"dropdown-menu "+(this.state.exitButtonVisible ? 'dropdown-menu-open' : 'dropdown-menu-closed')}>
                        <a className="dropdown-item" href="#" onClick={this.handleExitButtonClick}>Выйти</a>
                    </div>
                </div>
            </div>;

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="#">BookDataBase</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                                            data-target="#navbarCollapse"
                                            aria-controls="navbarCollapse" aria-expanded="false"
                                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {this.props.activeView !== 'authentication' && navItemList}
                </nav>
            </header>
        );
    }
}

export default Header;