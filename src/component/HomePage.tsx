import React from 'react';
import logo from './logo.svg'

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <h1>Книжная База Данных</h1>
            <img src={logo} height="768" alt="react logo"/>
        </div>
    )
};

export default HomePage