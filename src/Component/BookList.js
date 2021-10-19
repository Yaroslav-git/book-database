/**
 * Компонент для получения, обновления и вывода списка книг пользователя.
 * Книги представлены в виде карточек (Card) - компонент BookCard.
 */
import React, {useState, useEffect, useContext} from 'react';
import {BookDBContext} from '../bookDataBaseContext';

import BookCard from './BookCard'


const BookList = () => {

    let [userBookList, setUserBookList] = useState();
    let {backendProvider} = useContext(BookDBContext);

    useEffect(() => {
        getBookList();
    }, []);

    /**
     * Получение (через запрос к бэкэнду) списка книг текущего пользователя.
     * Полученный список преобразуется в массив компонентов BookListItem
     */
    const getBookList = () => {

        let requestData = {
            action: 'get_book_list'
        };

        backendProvider(requestData).then(
            response => {
                if (response.status === 'success') {
                    let list = response.data.map(item =>
                            <div key={item.id} className="col-sm-6 col-md-4 col-lg-4">
                                <BookCard data={item} removeHandler={removeBook} />
                            </div>
                        );
                    setUserBookList(list);
                }
            },
            error => {
                alert("Ошибка: "+error.message);
            }
        );
    };

    /**
     * Удаление книги пользователя (через запрос к бэкэнду).
     * При успешном удалении обновляется список книг
     * @param bookId
     */
    const removeBook = (bookId) => {

        let requestData = {
            action: 'remove_book',
            bookId: bookId
        };

        backendProvider(requestData).then(
            response => {
                if (response.status === 'success') {
                    alert("Книга удалена");
                    getBookList();
                }
            },
            error => {
                alert("Ошибка: "+error.message);
            }
        );
    };

    return (
        <div className="album py-5 bg-light">
            <div className="container-fluid">
                <div className="row">
                    {
                        userBookList ?
                        (userBookList.length > 0 ? userBookList : 'Список книг пуст')
                        : 'Список книг загружается...'
                    }
                </div>
            </div>
        </div>
    );

};

export default BookList;