/**
 * Компонент для редактирования книги - создания новой или изменения существующей.
 * В данном компоненте реализуется логика, в компоненте BookEditFormComponent - рендер формы редактирования.
 */
import React, {useState, useEffect, useContext} from 'react';
import {useParams, useLocation, useHistory} from 'react-router-dom';
import {BookDBContext} from '../bookDataBaseContext';
import BookEditFormComponent from './BookEditFormComponent';

const BookEditForm = () => {

    let history = useHistory();
    let {bookId: paramsBookId} = useParams();
    let {pathname} = useLocation();
    let {backendProvider} = useContext(BookDBContext);
    let [bookData, setBookData] = useState({});

    /**
     * Если через url передан идентификатор книги (bookId),
     * то через запрос к бэкэнду происходит получение данных книги.
     */
    useEffect(() => {
        if (paramsBookId !== undefined) {
            getBook(paramsBookId);
        }
        else
            setBookData({});
    }, [paramsBookId]);

    /**
     * Получение параметров книги через запрос к бэкэнду
     * @param id
     */
    const getBook = (id) => {

        let requestData = {
            action: 'get_book',
            bookId: id
        };

        backendProvider(requestData).then(
            response => {
                if (response.status === 'success') {
                    setBookData(prevState => ({
                        ...prevState,
                        ...response.data
                    }) );
                }
            },
            error => {
                alert("Ошибка: "+error.message);
            }
        );
    };

    /**
     * Создание новой книги (через запрос к бэкэнду) на основе переданных полей из формы.
     * При успешном создании книги - переход на страницу сосписком книг.
     * @param book
     */
    const createNewBook = (book) => {

        let requestData = {
            action: 'add_book',
            book: book
        };

        backendProvider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    alert("Книга успешно добавлена");
                    history.push('/list');
                }
            },
            error => {
                alert("Ошибка: "+error.message);
            }
        );
    };

    /**
     * Изменение (обновление) данных уже существующей книги через запрос к бэкэнду
     * @param book
     */
    const updateBook = (book) => {

        let requestData = {
            action: 'update_book',
            bookId: book.id,
            book: book
        };

        backendProvider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    alert("Книга успешно изменена");
                }
            },
            error => {
                alert("Ошибка: "+error.message);
            }
        );
    };

    /**
     * Обработчик события отправки полей формы.
     * В зависимости от текущего url инициируется создание новой книги ('/add')
     * или обновление данных уже существующей (/edit/:bookId)
     * @param bookProps
     */
    const editBook = (bookProps) => {

        if ( bookProps.readStatus === '' )
            bookProps.readStatus = 'toRead';

        let actualBookData = {
            ...bookData,
            ...bookProps
        };

        setBookData(actualBookData);

        if ( pathname === '/add')
            createNewBook(actualBookData);
        else if ( pathname.includes('/edit') )
            updateBook(actualBookData);

    };


    if ( pathname.includes('/edit') && bookData.id === undefined ) {
        return (
            <div className="container">
                <div className="alert alert-info" role="alert">
                    пожалуйста, подождите. данные книги загружаются...
                </div>
            </div>
        );
    }

    return(
        <BookEditFormComponent
            book={bookData}
            submitHandler={editBook}
        />
    );

};

export default BookEditForm;